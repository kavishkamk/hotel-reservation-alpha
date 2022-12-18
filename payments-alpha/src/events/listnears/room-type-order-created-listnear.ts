import { Listener, ReservationStatus, RoomTypeReservationCreatedEvent, Subjects } from "@alpha-lib/shared-lib";
import { Message } from "node-nats-streaming";
import { RoomTypeOrder } from "../../models/RoomTypeOrder";

import { QueueGroupName } from "./queue-group-name";

export class RoomTypeOrderCreatedListnear extends Listener<RoomTypeReservationCreatedEvent> {
    subject: Subjects.RoomTypeReservationCreated = Subjects.RoomTypeReservationCreated;
    queueGroupName = QueueGroupName;

    async onMessage(data: RoomTypeReservationCreatedEvent['data'], msg: Message) {
        const roomTypeOrder = RoomTypeOrder.build({
            id: data.id,
            totalPrice: data.roomType.price,
            status: data.status,
            userId: data.userId,
            version: data.version
        });

        try {
            await roomTypeOrder.save();
            msg.ack();
        } catch (err) {
            console.log("somthing wrong with payment reserved event");
        };
    };
};