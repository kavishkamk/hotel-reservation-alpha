import { CommonError, ErrorTypes, ReservationStatus } from "@alpha-lib/shared-lib";
import { NextFunction, Request, Response } from "express";
import { RoomTypePaymentCancelledPublisher } from "../events/publishers/room-type-payment-cancelled-publisher";
import { RoomTypePaymentConfirmedPublisher } from "../events/publishers/room-type-payment-compleated-publisher";
import { RoomTypePaymentCreatedPublisher } from "../events/publishers/room-type-payment-created-publisher";
import { RoomTypeOrder } from "../models/RoomTypeOrder";
import { RoomTypePayment } from "../models/RoomTypePayments";
import { natsWrapper } from "../nats-wrapper";

const createPayment = async (req: Request, res: Response, next: NextFunction) => {

    const { orderId } = req.body;

    if (!(req.file?.path)) {
        return next(new CommonError(400, ErrorTypes.BAD_REQUEST, "Paymet slip required"));
    };

    let order;

    try {
        order = await RoomTypeOrder.findById(orderId).exec();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Internal server error. Plase try again later"));
    };

    if (!order) {
        return next(new CommonError(404, ErrorTypes.NOT_FOUND, "Order not found"));
    };

    if (order.status == ReservationStatus.Cancelled) {
        return next(new CommonError(400, ErrorTypes.BAD_REQUEST, "Order already cancelled"));
    };

    if (order.status == ReservationStatus.AwaitingPayment) {
        return next(new CommonError(400, ErrorTypes.BAD_REQUEST, "Already uploaded the payment slip"));
    };

    if (order.status == ReservationStatus.Complete) {
        return next(new CommonError(400, ErrorTypes.BAD_REQUEST, "Already Payment compleated"));
    };

    if (req.currentUser!.id != order.userId) {
        return next(new CommonError(401, ErrorTypes.NOT_AUTHERIZED, "You don't have permision to make payment"));
    };

    let payment = RoomTypePayment.build({
        orderId,
        slipUrl: req.file?.path || "no link",
        isConfirmed: false
    });

    try {
        payment = await payment.save();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Failed to create payment"));
    };

    new RoomTypePaymentCreatedPublisher(natsWrapper.client).publish({
        paymentId: payment.id,
        orderId
    });

    res.status(201).json({ payment });
};

const getAllCurretUserOrders = async (req: Request, res: Response, next: NextFunction) => {

    let roomOrders;

    try {
        roomOrders = await RoomTypeOrder.find({ userId: req.currentUser!.id }).exec();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Somthing wrong. Plase try again later"));
    };

    res.status(200).json({ roomOrders });

};

const confirmPayment = async (req: Request, res: Response, next: NextFunction) => {

    const { orderId } = req.body;

    let order;

    try {
        order = await RoomTypeOrder.findById(orderId).exec();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Internal server error. Plase try again later"));
    };

    if (!order) {
        return next(new CommonError(404, ErrorTypes.NOT_FOUND, "Order not found"));
    };

    if (order.status == ReservationStatus.Cancelled) {
        return next(new CommonError(400, ErrorTypes.BAD_REQUEST, "Order already cancelled"));
    };

    if (order.status == ReservationStatus.Created) {
        return next(new CommonError(400, ErrorTypes.BAD_REQUEST, "Not uploaded paymetn slip"));
    };

    if (order.status == ReservationStatus.Complete) {
        return next(new CommonError(400, ErrorTypes.BAD_REQUEST, "Already Payment compleated"));
    };

    let payment;

    try {
        payment = await RoomTypePayment.findOne({ orderId }).exec();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INPUT_VALIDATION_ERROR, "Somthing wrong. Plase try again later"));
    };

    if (!payment) {
        return next(new CommonError(404, ErrorTypes.NOT_FOUND, "Payment not found"));
    };

    payment.set({
        isConfirmed: true
    });

    try {
        payment = await payment.save();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INPUT_VALIDATION_ERROR, "Somthing wrong. Plase try again later"));
    };

    new RoomTypePaymentConfirmedPublisher(natsWrapper.client).publish({
        paymentId: payment.id,
        orderId
    });

    res.status(200).json({ order, payment });

};

const cancelPayment = async (req: Request, res: Response, next: NextFunction) => {

    const { orderId } = req.body;

    let order;

    try {
        order = await RoomTypeOrder.findById(orderId).exec();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Internal server error. Plase try again later"));
    };

    if (!order) {
        return next(new CommonError(404, ErrorTypes.NOT_FOUND, "Order not found"));
    };

    if (order.status == ReservationStatus.Cancelled) {
        return next(new CommonError(400, ErrorTypes.BAD_REQUEST, "Order already cancelled"));
    };

    if (order.status == ReservationStatus.Created) {
        return next(new CommonError(400, ErrorTypes.BAD_REQUEST, "Not uploaded paymetn slip"));
    };

    if (order.status == ReservationStatus.Complete) {
        return next(new CommonError(400, ErrorTypes.BAD_REQUEST, "Already Payment compleated"));
    };

    let payment;

    try {
        payment = await RoomTypePayment.findOne({ orderId }).exec();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INPUT_VALIDATION_ERROR, "Somthing wrong. Plase try again later"));
    };

    if (!payment) {
        return next(new CommonError(404, ErrorTypes.NOT_FOUND, "Payment not found"));
    };

    payment.set({
        isConfirmed: false
    });

    try {
        payment = await payment.save();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INPUT_VALIDATION_ERROR, "Somthing wrong. Plase try again later"));
    };

    new RoomTypePaymentCancelledPublisher(natsWrapper.client).publish({
        paymentId: payment.id,
        orderId
    });

    res.status(200).json({ order, payment });

};

const setOrderAsPaid = async (req: Request, res: Response, next: NextFunction) => {

    const orderId = req.params.orderId;

    let order;

    try {
        order = await RoomTypeOrder.findById(orderId).exec();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Internal server error. Plase try again later"));
    };

    if (!order) {
        return next(new CommonError(404, ErrorTypes.NOT_FOUND, "Order not found"));
    };

    if (order.status == ReservationStatus.Cancelled) {
        return next(new CommonError(400, ErrorTypes.BAD_REQUEST, "Order already cancelled"));
    };

    if (order.status == ReservationStatus.Complete) {
        return next(new CommonError(400, ErrorTypes.BAD_REQUEST, "Already Payment compleated"));
    };

    let payment;

    try {
        payment = await RoomTypePayment.findOne({ orderId }).exec();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INPUT_VALIDATION_ERROR, "Somthing wrong. Plase try again later"));
    };

    if (!payment) {
        payment = RoomTypePayment.build({
            orderId,
            slipUrl: req.file?.path || "no link",
            isConfirmed: false
        });
    };

    payment.set({
        isConfirmed: true
    });

    try {
        await payment.save();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INPUT_VALIDATION_ERROR, "Somthing wrong. Plase try again later"));
    };

    new RoomTypePaymentConfirmedPublisher(natsWrapper.client).publish({
        paymentId: payment.id,
        orderId
    });

    res.status(200).json({ order });

};

const getPayment = async (req: Request, res: Response, next: NextFunction) => {

    const orderId = req.params.orderId;

    let roomPayments;

    try {
        roomPayments = await RoomTypePayment.findOne({ orderId }).exec();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Somthing wrong. Plase try again later"));
    };

    if (!roomPayments) {
        return next(new CommonError(404, ErrorTypes.NOT_FOUND, "Not found payment"));
    }

    res.status(200).json({ roomPayments });

};


export {
    createPayment,
    getAllCurretUserOrders,
    confirmPayment,
    setOrderAsPaid,
    getPayment,
    cancelPayment
};