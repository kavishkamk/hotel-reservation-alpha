import { RoomTypeReservationCreatedListner } from "./events/listeners/room-type-reservation-listener";
import { natsWrapper } from "./nats-wrapper";

const start = () => {

    if (!process.env.NATS_CLIENT_ID) {
        throw new Error("NATS_CLIENT_ID must be defined");
    };

    if (!process.env.NATS_URL) {
        throw new Error("JNATS_URL must be defined");
    };

    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error("NATS_CLUSTER_ID must be defined");
    };

    if (!process.env.REDIS_HOST) {
        throw new Error("REDIST_HOST must be defined");
    };

    // connect to the nats-streaming-server
    natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL)
        .then(() => {
            // gracefull shout down
            natsWrapper.client.on("close", () => {
                console.log("NATS connection closed");
                process.exit();
            });

            process.on("SIGTERM", () => natsWrapper.client.close());
            process.on("SIGINT", () => natsWrapper.client.close());

            new RoomTypeReservationCreatedListner(natsWrapper.client).listen();

        })
        .catch((err) => {
            console.error("Could not connect to the NATS Streaming Server : " + err);
        });

};

start();