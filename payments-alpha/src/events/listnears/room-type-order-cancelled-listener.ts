import { Listener, ReservationStatus, RoomReservationCancelledEvent, RoomTypeReservationCreatedEvent, Subjects } from "@alpha-lib/shared-lib";
import { Message } from "node-nats-streaming";
import { RoomTypeOrder } from "../../models/RoomTypeOrder";

import { QueueGroupName } from "./queue-group-name";

export class RoomTypeOrderCancelledListnear extends Listener<RoomReservationCancelledEvent> {
    subject: Subjects.RoomTypeReservationCancelled = Subjects.RoomTypeReservationCancelled;
    queueGroupName = QueueGroupName;

    async onMessage(data: RoomReservationCancelledEvent['data'], msg: Message) {

        const order = await RoomTypeOrder.findOne({
            _id: data.id,
            varsion: data.version - 1
        });

        if (!order) {
            console.log("payment service reject order cancelled event");
            return;
        }

        order.set({ status: ReservationStatus.Cancelled });

        try {
            await order.save();
            msg.ack();
        } catch (err) {
            console.log("somthing wrong with payment reserved event");
        };
    };
};