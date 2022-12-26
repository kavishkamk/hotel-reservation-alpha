import { CommonError, ErrorTypes, ReservationStatus } from "@alpha-lib/shared-lib";
import { NextFunction, Request, Response } from "express";

import { RoomType } from "../models/RoomType";
import { Order } from "../models/Order";
import { OrderTracker } from "../models/OrderTracker";
import { RoomTypeReservationCreatedPublisher } from "../events/publishers/room-type-reservation-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const EXPIRATION_WINDOW_SECOND = 2 * 60;

const createRoomBooking = async (req: Request, res: Response, next: NextFunction) => {

    if (req.currentUser!.isAdmin) {
        return next(new CommonError(401, ErrorTypes.NOT_AUTHERIZED, "Don't have access to use this route"));
    };

    const booking = await roomBookingLogic(req, req.currentUser!.id, next);

    res.json({ booking });
};

const createBookingForClient = async (req: Request, res: Response, next: NextFunction) => {

    const { clientId } = req.body;

    const booking = await roomBookingLogic(req, clientId, next);

    res.json({ booking });

};

const getBookings = async (req: Request, res: Response, next: NextFunction) => {

    let bookings;

    try {
        bookings = await Order.find().populate("roomType").exec();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Operation Fail, Plase try again later"));
    };

    res.status(200).json({ bookings });

};

const roomBookingLogic = async (req: Request, client: string, next: NextFunction) => {

    const { roomTypeId, numberOfRooms, numberOfPersons, fromDate, toDate } = req.body;

    console.log(new Date(fromDate), new Date(toDate));
    let roomTypeObj;

    // check room type available
    try {
        roomTypeObj = await RoomType.findById(roomTypeId);
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Order Createin fail. Please try again later"));
    };

    if (!roomTypeObj) {
        return next(new CommonError(404, ErrorTypes.NOT_FOUND, "Room type not found"));
    };

    // check toDate grater than fromDate
    if (fromDate > toDate) {
        return next(new CommonError(400, ErrorTypes.INPUT_VALIDATION_ERROR, "dipacher date should not before than arrival date"));
    };

    // check gust number match for number of rooms
    if (numberOfPersons > roomTypeObj.maxGuest * numberOfRooms) {
        return next(new CommonError(400, ErrorTypes.INPUT_VALIDATION_ERROR, "Maximum number for the "
            + numberOfRooms + " of the " + roomTypeObj.roomType + " is " + roomTypeObj.maxGuest * numberOfRooms));
    };

    let day = new Date(fromDate);
    let fromDay = new Date(fromDate);
    let toDay = new Date(toDate);
    // check number of rooms availble

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
            let reservedRecord = await OrderTracker.findOne({ day: dateArray[i], roomTypeId }).exec();
            // if no record available room is available
            if (reservedRecord) {
                available = available && true;
                // we have to check the rooms
                // get available room in given day, given type
                const availableRooms = roomTypeObj.numberOfRooms - reservedRecord.numberOfPendingRooms + reservedRecord.numberOfAwaitingPayments + reservedRecord.numberOfReservedRooms;
                console.log("available number of rooms " + availableRooms);
                if (numberOfRooms > availableRooms) {
                    available = available && false;
                    break;
                }
            }
        }
        console.log(">>>>>>>>>>>>>>>>>>>>>" + available)
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Reservation fail. Plase try again later"))
    };

    // check rooms are available
    if (!available) {
        return next(new CommonError(400, ErrorTypes.NOT_FOUND, "Rooms are not available"));
    }




    let recorde;
    // find the record and set records
    try {
        for (let i = 0; i < dateArray.length; i++) {
            recorde = await OrderTracker.findOne({ day: dateArray[i], roomTypeId }).exec();
            // if not found create record
            if (!recorde) {
                console.log("not found")
                recorde = OrderTracker.build({
                    day: dateArray[i],
                    roomTypeId: roomTypeObj,
                    numberOfPendingRooms: numberOfRooms,
                    numberOfAwaitingPayments: 0,
                    numberOfReservedRooms: 0
                });
            } else {
                const previous = recorde.numberOfPendingRooms;
                recorde.set({
                    numberOfPendingRooms: previous + numberOfRooms
                })
            };
            console.log("--" + recorde);
            await recorde.save();
        }
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Reservation fail. Plase try again later"));
    };

    // calculate expiration time
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECOND);

    // create a booking
    let booking = Order.build({
        userId: client,
        roomType: roomTypeObj,
        numberOfRooms,
        numberOfPersons,
        roomPrice: roomTypeObj.price,
        totalPrice: roomTypeObj.price * numberOfRooms,
        status: ReservationStatus.Created,
        expiresAt: expiration,
        fromDate,
        toDate
    });

    console.log(new Date(booking.toDate.getFullYear(), booking.toDate.getMonth(), booking.toDate.getDate()));

    try {
        booking = await booking.save();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Reservation Fail. Plase try again later"));
    };

    // publish ticket created event
    new RoomTypeReservationCreatedPublisher(natsWrapper.client).publish({
        id: booking.id,
        status: booking.status,
        userId: booking.userId,
        version: booking.version,
        expiresAt: booking.expiresAt.toISOString(),
        roomType: {
            id: booking.roomType.id,
            price: booking.totalPrice
        }
    });

    return booking;

};

export {
    createRoomBooking,
    getBookings,
    createBookingForClient
};