import { Listener, RoomTypeCreatedEvent, Subjects } from "@alpha-lib/shared-lib";
import { Message } from "node-nats-streaming";
import { RoomType } from "../../models/RoomType";

import { QueueGroupName } from "./queue-group-name";

export class RoomTypeCreatedListner extends Listener<RoomTypeCreatedEvent> {
    subject: Subjects.RoomTypeCreated = Subjects.RoomTypeCreated;
    queueGroupName = QueueGroupName;

    async onMessage(data: RoomTypeCreatedEvent['data'], msg: Message) {

        const { id, roomType, price, numberOfRooms, maxGuest, version } = data;

        const roomTypeObj = RoomType.build({
            id,
            roomType,
            price,
            numberOfRooms,
            maxGuest,
            version
        });

        try {
            await roomTypeObj.save();
            msg.ack();
        } catch (err) {

        };
    };
};