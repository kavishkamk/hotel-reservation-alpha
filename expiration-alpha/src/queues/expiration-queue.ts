import Queue from "bull";
import { RoomExpirationCompletePublisher } from "../events/publishers/room-reservation-expiration-compleate-publisher";
import { natsWrapper } from "../nats-wrapper";

interface Payload {
    orderId: string;
};

const expirationQueue = new Queue<Payload>("order:expiration", {
    redis: {
        host: process.env.REDIS_HOST
    }
});

expirationQueue.process(async (job) => {
    console.log("waiting for publish")
    new RoomExpirationCompletePublisher(natsWrapper.client)
        .publish({
            orderId: job.data.orderId
        });
});

export { expirationQueue };