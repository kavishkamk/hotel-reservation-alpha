import { CommonError, ErrorTypes, ReservationStatus } from "@alpha-lib/shared-lib";
import { NextFunction, Request, Response } from "express";
import { RestaurentOrder } from "../models/RestaurentOrder";
import { RestaurentOrderTracker } from "../models/RestaurentOrderTracker";

import { RestaurentType } from "../models/RestaurentType";

const createRestaurentBooking = async (req: Request, res: Response, next: NextFunction) => {

    if (req.currentUser!.isAdmin) {
        return next(new CommonError(401, ErrorTypes.NOT_AUTHERIZED, "Don't have access to use this route"));
    };

    const booking = await restaurentBookingLogic(req, req.currentUser!.id, next);

    res.json({ booking });

};

const createRestaurentBookingForClient = async (req: Request, res: Response, next: NextFunction) => {

    const { clientId } = req.body;

    const booking = await restaurentBookingLogic(req, clientId, next);

    res.json({ booking });

};

const getRestaurentBookings = async (req: Request, res: Response, next: NextFunction) => {

    let bookings;

    try {
        bookings = await RestaurentOrder.find().populate("restaurentType").exec();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Operation Fail, Plase try again later"));
    };

    res.status(200).json({ bookings });

}

const restaurentBookingLogic = async (req: Request, client: string, next: NextFunction) => {

    const { restaurentTypeId, numberOfTables, numberOfPersons, fromDate, toDate } = req.body;

    let reservationTypeObj;

    // check room type available
    try {
        reservationTypeObj = await RestaurentType.findById(restaurentTypeId).exec();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Order Createin fail. Please try again later"));
    };

    if (!reservationTypeObj) {
        return next(new CommonError(404, ErrorTypes.NOT_FOUND, "Table type not found"));
    };

    // check toDate grater than fromDate
    if (fromDate > toDate) {
        return next(new CommonError(400, ErrorTypes.INPUT_VALIDATION_ERROR, "dipacher date should not before than arrival date"));
    };

    // check gust number match for number of tables
    if (numberOfPersons > reservationTypeObj.maxGuest * numberOfTables) {
        return next(new CommonError(400, ErrorTypes.INPUT_VALIDATION_ERROR, "Maximum number for the "
            + numberOfTables + " of the " + reservationTypeObj.restaurentType + " is " + reservationTypeObj.maxGuest * numberOfTables));
    };

    let day = new Date(fromDate);
    let fromDay = new Date(fromDate);
    let toDay = new Date(toDate);

    // check number of tables availble

    // get the all dates request for booking
    const dateArray = [];
    let tempDate = fromDay;
    while (toDay >= tempDate) {
        dateArray.push(tempDate);
        tempDate = new Date(tempDate);
        tempDate.setDate(tempDate.getDate() + 1);
    };

    // check each day availability
    let available = true;
    try {
        for (let i = 0; i < dateArray.length; i++) {
            let reservedRecord = await RestaurentOrderTracker.findOne({ day: dateArray[i], restaurentTypeId }).exec();
            // if no record available restaurent is available
            if (reservedRecord) {
                available = available && true;
                // we have to check the restaurents
                // get available restaurent in given day, given type
                const availableRestaurents = reservationTypeObj.numberOfTables - reservedRecord.numberOfReservedTables;
                console.log("available number of tables " + availableRestaurents);
                if (numberOfTables > availableRestaurents) {
                    available = available && false;
                    break;
                }
            }
        }
        console.log(">>>>>>>>>>>>>>>>>>>>>" + available)
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Reservation fail. Plase try again later"))
    };

    // check tables are available
    if (!available) {
        return next(new CommonError(400, ErrorTypes.NOT_FOUND, "Tables are not available"));
    };

    let recorde;
    // find the record and set records

    try {
        for (let i = 0; i < dateArray.length; i++) {
            recorde = await RestaurentOrderTracker.findOne({ day: dateArray[i], restaurentTypeId }).exec();
            // if not found create record
            if (!recorde) {
                console.log("not found")
                recorde = RestaurentOrderTracker.build({
                    day: dateArray[i],
                    restaurentTypeId: reservationTypeObj,
                    numberOfReservedTables: numberOfTables
                });
            } else {
                const previous = recorde.numberOfReservedTables;
                recorde.set({
                    numberOfReservedTables: previous + numberOfTables
                })
            };
            console.log("--" + recorde);
            await recorde.save();
        }
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Reservation fail. Plase try again later"));
    };

    // create a booking
    let booking = RestaurentOrder.build({
        userId: req.currentUser!.id,
        restaurentType: reservationTypeObj,
        numberOfTables,
        numberOfPersons,
        status: ReservationStatus.Created,
        fromDate,
        toDate
    });

    console.log(new Date(booking.toDate.getFullYear(), booking.toDate.getMonth(), booking.toDate.getDate()));

    try {
        booking = await booking.save();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Reservation Fail. Plase try again later"));
    };

    return booking;

};

export {
    createRestaurentBooking,
    getRestaurentBookings,
    createRestaurentBookingForClient
};