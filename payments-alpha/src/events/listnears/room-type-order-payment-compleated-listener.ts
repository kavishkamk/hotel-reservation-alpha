import { Listener, ReservationStatus, RoomReservationCancelledEvent, RoomReservationPaymentAwaitingEvent, RoomReservationPaymentCompleatedEvent, Subjects } from "@alpha-lib/shared-lib";
import { Message } from "node-nats-streaming";
import { RoomTypeOrder } from "../../models/RoomTypeOrder";

import { QueueGroupName } from "./queue-group-name";

export class RoomTypeOrderPaymentCompleatedListnear extends Listener<RoomReservationPaymentCompleatedEvent> {
    subject: Subjects.RoomTypeReservationPaymentCompleated = Subjects.RoomTypeReservationPaymentCompleated;
    queueGroupName = QueueGroupName;

    async onMessage(data: RoomReservationPaymentCompleatedEvent['data'], msg: Message) {

        const order = await RoomTypeOrder.findOne({
            _id: data.id,
            varsion: data.version - 1
        });

        if (!order) {
            console.log("payment service reject order payment event");
            return;
        }

        order.set({ status: ReservationStatus.Complete });

        try {
            await order.save();
            msg.ack();
        } catch (err) {
            console.log("somthing wrong with payment reserved event");
        };
    };
};