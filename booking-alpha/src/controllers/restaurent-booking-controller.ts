import { ArrivalStatus, CommonError, ErrorTypes, ReservationStatus } from "@alpha-lib/shared-lib";
import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { Order } from "../models/Order";
import { RestaurentOrder } from "../models/RestaurentOrder";
import { RestaurentOrderTracker } from "../models/RestaurentOrderTracker";

import { RestaurentType, RestaurentTypeDoc } from "../models/RestaurentType";
import { getDatesBetween } from "../resources/date-handle";

const createRestaurentBooking = async (req: Request, res: Response, next: NextFunction) => {

    if (req.currentUser!.isAdmin) {
        return next(new CommonError(401, ErrorTypes.NOT_AUTHERIZED, "Don't have access to use this route"));
    };

    let booking;

    try {
        booking = await restaurentBookingLogic(req, req.currentUser!.id, req.currentUser!.email);
    } catch (err) {
        return next(err);
    };

    res.json({ booking });

};

const createRestaurentBookingForClient = async (req: Request, res: Response, next: NextFunction) => {

    const { clientId, email } = req.body;

    let booking;

    try {
        booking = await restaurentBookingLogic(req, clientId, email);
    } catch (err) {
        return next(err);
    };

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

const restaurentBookingLogic = async (req: Request, client: string, email: string) => {

    const { restaurentTypeId, numberOfTables, numberOfPersons, fromDate, meal } = req.body;

    let reservationTypeObj;

    // check room type available
    try {
        reservationTypeObj = await RestaurentType.findById(restaurentTypeId).exec();
    } catch (err) {
        throw new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Order Createin fail. Please try again later");
    };

    if (!reservationTypeObj) {
        throw new CommonError(404, ErrorTypes.NOT_FOUND, "Table type not found");
    };

    // // check toDate grater than fromDate
    // if (fromDate > toDate) {
    //     throw new CommonError(400, ErrorTypes.INPUT_VALIDATION_ERROR, "dipacher date should not before than arrival date");
    // };

    // check gust number match for number of tables
    if (numberOfPersons > reservationTypeObj.maxGuest * numberOfTables) {
        throw new CommonError(400, ErrorTypes.INPUT_VALIDATION_ERROR, "Maximum number for the "
            + numberOfTables + " of the " + reservationTypeObj.restaurentType + " is " + reservationTypeObj.maxGuest * numberOfTables);
    };

    let day = new Date(fromDate);
    let fromDay = new Date(fromDate);
    let toDay = new Date(fromDate);

    // check number of tables availble

    // get the all dates request for booking
    const dateArray = getDatesBetween(fromDay, toDay);

    // check each day availability
    let available = await checkAvailabilityOfGivenRestaurent(dateArray, restaurentTypeId, reservationTypeObj, numberOfTables);

    // check tables are available
    if (!available) {
        throw new CommonError(400, ErrorTypes.NOT_FOUND, "Tables are not available");
    };

    let recorde;
    // find the record and set records

    try {
        for (let i = 0; i < dateArray.length; i++) {
            recorde = await RestaurentOrderTracker.findOne({ day: dateArray[i], restaurentTypeId }).exec();
            // if not found create record
            if (!recorde) {

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

            await recorde.save();
        }
    } catch (err) {
        throw new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Reservation fail. Plase try again later");
    };

    // create a booking
    let booking = RestaurentOrder.build({
        userId: client,
        restaurentType: reservationTypeObj,
        numberOfTables,
        numberOfPersons,
        status: ReservationStatus.Created,
        fromDate,
        toDate: fromDate,
        userEmail: email,
        meal
    });

    try {
        booking = await booking.save();
    } catch (err) {
        throw new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Reservation Fail. Plase try again later");
    };

    return booking;

};

const checkRestaurentAvailability = async (req: Request, res: Response, next: NextFunction) => {

    const { numberOfTables, numberOfPersons, fromDate } = req.body;

    // // check toDate grater than fromDate
    // if (fromDate > toDate) {
    //     return next(new CommonError(400, ErrorTypes.INPUT_VALIDATION_ERROR, "dipacher date should not before than arrival date"));
    // };

    let restaurentTypeList;

    try {
        restaurentTypeList = await RestaurentType.find().exec();
    } catch (err) {
        return next(err);
    };

    let fromDay = new Date(fromDate);
    let toDay = new Date(fromDate);
    // check number of rooms availble

    // get the all dates request for booking
    const dateArray = getDatesBetween(fromDay, toDay);

    const freeList = await filterFreeRestaurentList(restaurentTypeList, numberOfTables, numberOfPersons, dateArray);

    res.status(200).json({ freeRestaurentList: freeList });

};

const cancelRestaurentReservation = async (req: Request, res: Response, next: NextFunction) => {

    const orderId = req.params.orderId;

    let reservation = await RestaurentOrder.findById(orderId).populate("restaurentType");

    if (!reservation) {
        return next(new CommonError(404, ErrorTypes.NOT_FOUND, "Reservation not found"));
    };

    if (!(reservation.userId == req.currentUser!.id || req.currentUser?.isAdmin)) {
        return next(new CommonError(401, ErrorTypes.NOT_AUTHERIZED, "you don't have permision to cancel reservation"));
    };

    if (reservation.status === ReservationStatus.Cancelled) {
        return next(new CommonError(400, ErrorTypes.BAD_REQUEST, "Reservation already cancelled"));
    };

    reservation.set({
        status: ReservationStatus.Cancelled
    });

    try {
        reservation = await reservation.save();
    } catch (err) {
        return next(err);
    };

    // get the all dates request for booking
    const dateArray = getDatesBetween(reservation.fromDate, reservation.toDate);

    let recorde;
    // find the record and set records
    try {
        for (let i = 0; i < dateArray.length; i++) {
            recorde = await RestaurentOrderTracker.findOne({ day: dateArray[i], roomTypeId: reservation.restaurentType.id }).exec();
            // if not found create record
            if (recorde) {
                const previous = recorde.numberOfReservedTables;
                recorde.set({
                    numberOfReservedTables: previous - reservation.numberOfTables
                })
                await recorde.save();
            };

        }
    } catch (err) {
        throw new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Reservation fail. Plase try again later");
    };

    res.status(200).json({ request: "success" });

};

const getConfirmedTableReservationOfCurrentUser = async (req: Request, res: Response, next: NextFunction) => {

    let reservationList;

    try {
        reservationList = await RestaurentOrder.find({ userId: req.currentUser!.id, status: ReservationStatus.Created }).populate("restaurentType").exec();
    } catch (err) {
        return next(err);
    }

    res.status(200).json({ reservationList });

};

const getCancelledTableReservationOfCurrentUser = async (req: Request, res: Response, next: NextFunction) => {

    let reservationList;

    try {
        reservationList = await RestaurentOrder.find({ userId: req.currentUser!.id, status: ReservationStatus.Cancelled }).populate("restaurentType").exec();
    } catch (err) {
        return next(err);
    }

    res.status(200).json({ reservationList });

};

const getConfirmedTableReservation = async (req: Request, res: Response, next: NextFunction) => {

    let reservationList;

    try {
        reservationList = await RestaurentOrder.find({ status: ReservationStatus.Created }).populate("restaurentType").exec();
    } catch (err) {
        return next(err);
    }

    res.status(200).json({ reservationList });

};

const getCancelledTableReservation = async (req: Request, res: Response, next: NextFunction) => {

    let reservationList;

    try {
        reservationList = await RestaurentOrder.find({ status: ReservationStatus.Cancelled }).populate("restaurentType").exec();
    } catch (err) {
        return next(err);
    }

    res.status(200).json({ reservationList });

};

const checkIn = async (req: Request, res: Response, next: NextFunction) => {

    const orderId = req.params.orderId;

    let order;

    try {
        order = await Order.findById(orderId).exec();
    } catch (err) {
        return next(err);
    };

    if (!order) {
        return next(new CommonError(404, ErrorTypes.NOT_FOUND, "Order not found"));
    };

    if (order.status !== ReservationStatus.Complete) {
        return next(new CommonError(400, ErrorTypes.BAD_REQUEST, "This Reservation is still not compleated"));
    };

    order = await RestaurentOrder.findByIdAndUpdate(orderId, {
        arrivalStatus: ArrivalStatus.CheckIn,
        checkIn: new Date()
    });

    res.status(200).send({ order });
};

const getTodaysTotalReservation = async (req: Request, res: Response, next: NextFunction) => {

    let count;

    try {
        count = await Order.countDocuments({ status: { $in: [ReservationStatus.AwaitingPayment, ReservationStatus.Created] } });
    } catch (err) {
        return next(err);
    };

    res.status(200).json({ count });

};

const getTodaysTotalPayments = async (req: Request, res: Response, next: NextFunction) => {

    let count;

    try {
        count = await Order.countDocuments({ status: ReservationStatus.Complete });
    } catch (err) {
        return next(err);
    };

    res.status(200).json({ count });

};

const filterFreeRestaurentList = async (restaurentTypeList: (RestaurentTypeDoc & { _id: Types.ObjectId; })[],
    numberOfTables: number, numberOfPersons: number, dateArray: Date[]) => {

    const freeList = await Promise.all(restaurentTypeList.map(async tableTypeTemp => {
        if (numberOfPersons > tableTypeTemp.maxGuest * numberOfPersons) {
            return false;
        }

        let available = await checkAvailabilityOfGivenRestaurent(dateArray, tableTypeTemp.id, tableTypeTemp, numberOfTables);

        return available ? tableTypeTemp : false;
    }))

    return freeList.filter(x => x);

};

const checkAvailabilityOfGivenRestaurent = async (dateArray: Date[], restaurentTypeId: string, reservationTypeObj: RestaurentTypeDoc & { _id: Types.ObjectId; },
    numberOfTables: number) => {
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
                if (numberOfTables > availableRestaurents) {
                    available = available && false;
                    break;
                }
            }
        }
    } catch (err) {
        throw new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Reservation fail. Plase try again later");
    };

    return available;
};

export {
    createRestaurentBooking,
    getRestaurentBookings,
    createRestaurentBookingForClient,
    checkRestaurentAvailability,
    cancelRestaurentReservation,
    getCancelledTableReservationOfCurrentUser,
    getConfirmedTableReservationOfCurrentUser,
    getCancelledTableReservation,
    getConfirmedTableReservation,
    checkIn,
    getTodaysTotalReservation,
    getTodaysTotalPayments
};