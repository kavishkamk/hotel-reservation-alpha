import { ArrivalStatus, CommonError, ErrorTypes, ReservationStatus } from "@alpha-lib/shared-lib";
import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

import { RoomType, RoomTypeDoc } from "../models/RoomType";
import { Order } from "../models/Order";
import { OrderTracker } from "../models/OrderTracker";
import { RoomTypeReservationCreatedPublisher } from "../events/publishers/room-type-reservation-created-publisher";
import { natsWrapper } from "../nats-wrapper";
import { getDatesBetween } from "../resources/date-handle";
import { RoomTypeReservationCancelledPublisher } from "../events/publishers/room-type-reservation-cancelled-publisher";

const EXPIRATION_WINDOW_SECOND = 60 * 60;

const createRoomBooking = async (req: Request, res: Response, next: NextFunction) => {

    let booking;

    if (req.currentUser!.isAdmin) {
        return next(new CommonError(401, ErrorTypes.NOT_AUTHERIZED, "Don't have access to use this route"));
    };

    try {
        booking = await roomBookingLogic(req, req.currentUser!.id, req.currentUser!.email);
    } catch (err) {
        return next(err);
    };

    res.status(201).json({ booking });
};

const createBookingForClient = async (req: Request, res: Response, next: NextFunction) => {

    const { clientId, email } = req.body;

    let booking;

    try {
        booking = await roomBookingLogic(req, clientId, email);
    } catch (err) {
        return next(err);
    };
    res.status(201).json({ booking });

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

const checkRoomAvailability = async (req: Request, res: Response, next: NextFunction) => {

    const { numberOfRooms, numberOfPersons, fromDate, toDate } = req.body;

    // check toDate grater than fromDate
    if (fromDate > toDate) {
        return next(new CommonError(400, ErrorTypes.INPUT_VALIDATION_ERROR, "dipacher date should not before than arrival date"));
    };

    let roomTypeList;

    try {
        roomTypeList = await RoomType.find().exec();
    } catch (err) {
        return next(err);
    };

    let fromDay = new Date(fromDate);
    let toDay = new Date(toDate);
    // check number of rooms availble

    // get the all dates request for booking
    const dateArray = getDatesBetween(fromDay, toDay);

    let freeList;

    try {
        freeList = await filterFreeList(roomTypeList, numberOfRooms, numberOfPersons, dateArray);
    } catch (err) {
        return next(err);
    };

    res.status(200).json({ freeRoomList: freeList });

};

const roomBookingLogic = async (req: Request, client: string, email: string) => {

    const { roomTypeId, numberOfRooms, numberOfPersons, fromDate, toDate } = req.body;

    let roomTypeObj;

    // check room type available
    try {
        roomTypeObj = await RoomType.findById(roomTypeId);
    } catch (err) {
        throw new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Order Createin fail. Please try again later");
    };

    if (!roomTypeObj) {
        throw new CommonError(404, ErrorTypes.NOT_FOUND, "Room type not found");
    };

    // check toDate grater than fromDate
    if (fromDate > toDate) {
        throw new CommonError(400, ErrorTypes.INPUT_VALIDATION_ERROR, "dipacher date should not before than arrival date");
    };

    // check gust number match for number of rooms
    if (numberOfPersons > roomTypeObj.maxGuest * numberOfRooms) {
        throw new CommonError(400, ErrorTypes.INPUT_VALIDATION_ERROR, "Maximum number for the "
            + numberOfRooms + " of the " + roomTypeObj.roomType + " is " + roomTypeObj.maxGuest * numberOfRooms);
    };

    let fromDay = new Date(fromDate);
    let toDay = new Date(toDate);
    // check number of rooms availble

    // get the all dates request for booking
    const dateArray = getDatesBetween(fromDay, toDay);

    // check each day availability
    let available = await checkAvailabilityOfGivenRoom(dateArray, roomTypeId, roomTypeObj, numberOfRooms);

    // check rooms are available
    if (!available) {
        throw new CommonError(400, ErrorTypes.NOT_FOUND, "Rooms are not available");
    }

    let recorde;
    // find the record and set records
    try {
        for (let i = 0; i < dateArray.length; i++) {
            recorde = await OrderTracker.findOne({ day: dateArray[i], roomTypeId }).exec();
            // if not found create record
            if (!recorde) {

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

            await recorde.save();
        }
    } catch (err) {
        throw new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Reservation fail. Plase try again later");
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
        totalPrice: roomTypeObj.price * numberOfRooms * dateArray.length,
        status: ReservationStatus.Created,
        expiresAt: expiration,
        fromDate,
        toDate,
        userEmail: email
    });

    try {
        booking = await booking.save();
    } catch (err) {
        throw new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Reservation Fail. Plase try again later");
    };

    // publish ticket created event
    await new RoomTypeReservationCreatedPublisher(natsWrapper.client).publish({
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

    const result = booking.toObject();

    return { ...result, nights: dateArray.length };

};

const cancelRoomReservation = async (req: Request, res: Response, next: NextFunction) => {

    const orderId = req.params.orderId;

    let reservation = await Order.findById(orderId).populate("roomType");

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

    await new RoomTypeReservationCancelledPublisher(natsWrapper.client).publish({
        id: reservation.id,
        version: reservation.version,
        ticket: {
            id: reservation.roomType.id
        }
    });

    // get the all dates request for booking
    const dateArray = getDatesBetween(reservation.fromDate, reservation.toDate);

    let recorde;
    // find the record and set records
    try {
        for (let i = 0; i < dateArray.length; i++) {
            recorde = await OrderTracker.findOne({ day: dateArray[i], roomTypeId: reservation.roomType.id }).exec();
            // if not found create record
            if (recorde) {
                const previous = recorde.numberOfPendingRooms;
                recorde.set({
                    numberOfPendingRooms: previous - reservation.numberOfRooms
                })
                await recorde.save();
            };

        }
    } catch (err) {
        throw new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Reservation fail. Plase try again later");
    };

    res.status(200).json({ request: "success" });

};

const getPendingRoomReservationOfCurrentUser = async (req: Request, res: Response, next: NextFunction) => {

    let reservationList;

    try {
        reservationList = await Order.find({ userId: req.currentUser!.id, status: ReservationStatus.Created }).exec();
    } catch (err) {
        return next(err);
    }

    res.status(200).json({ reservationList });

};

const getConfirmAvaitingRoomReservationOfCurrentUser = async (req: Request, res: Response, next: NextFunction) => {

    let reservationList;

    try {
        reservationList = await Order.find({ userId: req.currentUser!.id, status: ReservationStatus.AwaitingPayment }).exec();
    } catch (err) {
        return next(err);
    }

    res.status(200).json({ reservationList });

};

const getConfirmedRoomReservationOfCurrentUser = async (req: Request, res: Response, next: NextFunction) => {

    let reservationList;

    try {
        reservationList = await Order.find({ userId: req.currentUser!.id, status: ReservationStatus.Complete }).exec();
    } catch (err) {
        return next(err);
    }

    res.status(200).json({ reservationList });

};

const getCancelledRoomReservationOfCurrentUser = async (req: Request, res: Response, next: NextFunction) => {

    let reservationList;

    try {
        reservationList = await Order.find({ userId: req.currentUser!.id, status: ReservationStatus.Cancelled }).exec();
    } catch (err) {
        return next(err);
    }

    res.status(200).json({ reservationList });

};

const getPendingRoomReservation = async (req: Request, res: Response, next: NextFunction) => {

    let reservationList;

    try {
        reservationList = await Order.find({ status: ReservationStatus.Created }).populate("roomType").exec();
    } catch (err) {
        return next(err);
    }

    res.status(200).json({ reservationList });

};

const getConfirmAvaitingRoomReservation = async (req: Request, res: Response, next: NextFunction) => {

    let reservationList;

    try {
        reservationList = await Order.find({ status: ReservationStatus.AwaitingPayment }).exec();
    } catch (err) {
        return next(err);
    }

    res.status(200).json({ reservationList });

};

const getConfirmedRoomReservation = async (req: Request, res: Response, next: NextFunction) => {

    let reservationList;

    try {
        reservationList = await Order.find({ status: ReservationStatus.Complete }).exec();
    } catch (err) {
        return next(err);
    }

    res.status(200).json({ reservationList });

};

const getCancelledRoomReservation = async (req: Request, res: Response, next: NextFunction) => {

    let reservationList;

    try {
        reservationList = await Order.find({ status: ReservationStatus.Cancelled }).exec();
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

    order = await Order.findByIdAndUpdate(orderId, {
        arrivalStatus: ArrivalStatus.CheckIn,
        checkIn: new Date()
    });

    order?.set({
        arrivalStatus: ArrivalStatus.CheckIn
    })

    res.status(200).send({ order });
};

const checkOut = async (req: Request, res: Response, next: NextFunction) => {

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

    if (order.arrivalStatus !== ArrivalStatus.CheckIn) {
        return next(new CommonError(400, ErrorTypes.BAD_REQUEST, "not checked in to checkout"));
    };

    order = await Order.findByIdAndUpdate(orderId, {
        arrivalStatus: ArrivalStatus.CheckOut,
        checkIn: new Date()
    });

    order?.set({
        arrivalStatus: ArrivalStatus.CheckOut
    });

    res.status(200).send({ order });
};

const getCheckInCurrentUser = async (req: Request, res: Response, next: NextFunction) => {

    if (req.currentUser?.isAdmin) {
        return next(new CommonError(401, ErrorTypes.NOT_AUTHERIZED, "You don't have access. This is clinet route"));
    }

    let order;

    try {
        order = await Order.find({ userId: req.currentUser!.id, arrivalStatus: ArrivalStatus.CheckIn }).exec();
    } catch (err) {
        return next(err);
    };

    res.status(200).json({ order });

};

const getCheckOutCurrentUser = async (req: Request, res: Response, next: NextFunction) => {

    if (req.currentUser?.isAdmin) {
        return next(new CommonError(401, ErrorTypes.NOT_AUTHERIZED, "You don't have access. This is clinet route"));
    }

    let order;

    try {
        order = await Order.find({ userId: req.currentUser!.id, arrivalStatus: ArrivalStatus.CheckOut }).exec();
    } catch (err) {
        return next(err);
    };

    res.status(200).json({ order });

};

const getCheckInByUserId = async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.userId;

    let order;

    try {
        order = await Order.find({ userId, arrivalStatus: ArrivalStatus.CheckIn }).exec();
    } catch (err) {
        return next(err);
    };

    res.status(200).json({ order });

};

const getCheckOutByUserId = async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.userId;

    let order;

    try {
        order = await Order.find({ userId, arrivalStatus: ArrivalStatus.CheckOut }).exec();
    } catch (err) {
        return next(err);
    };

    res.status(200).json({ order });

};

const getConfirmedRoomReservationByUserId = async (req: Request, res: Response, next: NextFunction) => {

    let reservationList;

    try {
        reservationList = await Order.find({ status: ReservationStatus.Complete, userId: req.params.userId, arrivalStatus: ArrivalStatus.Pending }).exec();
    } catch (err) {
        return next(err);
    };

    res.status(200).json({ reservationList });

};

const getPendingRoomReservationByUserId = async (req: Request, res: Response, next: NextFunction) => {

    let reservationList;

    try {
        reservationList = await Order.find({ status: ReservationStatus.Created, userId: req.params.userId }).exec();
    } catch (err) {
        return next(err);
    }

    res.status(200).json({ reservationList });

};


const filterFreeList = async (roomTypeList: (RoomTypeDoc & { _id: Types.ObjectId; })[],
    numberOfRooms: number, numberOfPersons: number, dateArray: Date[]) => {
    const freeList = await Promise.all(roomTypeList.map(async roomTypeTemp => {
        // check gust number match for number of rooms
        if (numberOfPersons > roomTypeTemp.maxGuest * numberOfRooms) {
            return false;
        }

        // check each day availability
        let available = await checkAvailabilityOfGivenRoom(dateArray, roomTypeTemp.id, roomTypeTemp, numberOfRooms);

        return available ? roomTypeTemp : false;

    }));

    return freeList.filter(x => x);
};


const checkAvailabilityOfGivenRoom = async (dateArray: Date[], roomTypeId: string,
    roomTypeObj: RoomTypeDoc & { _id: Types.ObjectId; }, numberOfRooms: number) => {

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

                if (numberOfRooms > availableRooms) {
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
    createRoomBooking,
    getBookings,
    createBookingForClient,
    checkRoomAvailability,
    cancelRoomReservation,
    getPendingRoomReservationOfCurrentUser,
    getConfirmAvaitingRoomReservationOfCurrentUser,
    getConfirmedRoomReservationOfCurrentUser,
    getCancelledRoomReservationOfCurrentUser,
    getPendingRoomReservation,
    getConfirmAvaitingRoomReservation,
    getCancelledRoomReservation,
    getConfirmedRoomReservation,
    checkIn,
    checkOut,
    getCheckInCurrentUser,
    getCheckOutCurrentUser,
    getCheckInByUserId,
    getCheckOutByUserId,
    getConfirmedRoomReservationByUserId,
    getPendingRoomReservationByUserId
};