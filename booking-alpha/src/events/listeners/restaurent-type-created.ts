import { Listener, RestaurentCreatedEvent, Subjects } from "@alpha-lib/shared-lib";
import { Message } from "node-nats-streaming";

import { RestaurentType } from "../../models/RestaurentType";
import { QueueGroupName } from "./queue-group-name";

export class RestaurentTypeCreatedListener extends Listener<RestaurentCreatedEvent> {
    subject: Subjects.RestaurentCreated = Subjects.RestaurentCreated;
    queueGroupName = QueueGroupName;

    async onMessage(data: RestaurentCreatedEvent["data"], msg: Message) {

        const { id, restaurentType, numberOfTables, maxGuest, version } = data;

        const restaurentObj = RestaurentType.build({
            id,
            maxGuest,
            restaurentType,
            numberOfTables,
            version
        });

        try {
            await restaurentObj.save();
            msg.ack();
        } catch (err) {

        }

    };
};