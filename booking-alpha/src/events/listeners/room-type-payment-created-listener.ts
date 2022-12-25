import { Listener, Subjects, RoomPaymentCreatedEvent, CommonError, ErrorTypes, ReservationStatus } from "@alpha-lib/shared-lib";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/Order";
import { natsWrapper } from "../../nats-wrapper";
import { RoomTypeReservationPaymentAwaitingPublisher } from "../publishers/room-type-reservation-payment-awaiting-publisher";

import { QueueGroupName } from "./queue-group-name";

export class RoomTypePaymentCreated extends Listener<RoomPaymentCreatedEvent> {
    subject: Subjects.RoomTypePaymentCreated = Subjects.RoomTypePaymentCreated;
    queueGroupName = QueueGroupName;

    async onMessage(data: RoomPaymentCreatedEvent['data'], msg: Message) {

        const { orderId } = data;

        let order;

        try {
            order = await Order.findById(orderId).exec();
        } catch (err) {
            throw new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Failed to create order");
        };

        if (!order) {
            console.log("Something wrong. Order not found");
            return;
        };

        order.set({
            status: ReservationStatus.AwaitingPayment
        });

        try {
            order = await order.save();
            msg.ack();
        } catch (err) {

        };

        new RoomTypeReservationPaymentAwaitingPublisher(natsWrapper.client).publish({
            id: order.id,
            version: order.version,
            ticket: {
                id: order.roomType.id
            }
        });
    };
};