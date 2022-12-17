import { Listener, RoomTypeReservationCreatedEvent, Subjects } from "@alpha-lib/shared-lib";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";

import { QueueGroupName } from "./queue-group-name";

export class RoomTypeReservationCreatedListner extends Listener<RoomTypeReservationCreatedEvent> {
    subject: Subjects.RoomTypeReservationCreated = Subjects.RoomTypeReservationCreated;
    queueGroupName = QueueGroupName;

    async onMessage(data: RoomTypeReservationCreatedEvent['data'], msg: Message) {

        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
        console.log("Waiting for " + delay + "ms to process this job");
        await expirationQueue.add({
            orderId: data.id
        }, {
            delay
        });

        msg.ack();

    };
};