import mongoose from "mongoose";
import { natsWrapper } from "./nats-wrapper";

import { app } from "./app";
import { RoomTypeCreatedListner } from "./events/listeners/room-type-created-listener";

const port = 4000;

const start = () => {

    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    };

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must befined");
    };

    if (!process.env.NATS_CLIENT_ID) {
        throw new Error("NATS_CLIENT_ID must be defined");
    };

    if (!process.env.NATS_URL) {
        throw new Error("NATS_URL must be defined");
    };

    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error("NATS_CLUSTER_ID must be defined");
    };

    // connect to the nats-streaming-server
    natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL)
        .then(() => {
            // gracefull shout down
            natsWrapper.client.on("close", () => {
                console.log("NATS connection closed");
                process.exit();
            });

            new RoomTypeCreatedListner(natsWrapper.client).listen();

            process.on("SIGTERM", () => natsWrapper.client.close());
            process.on("SIGINT", () => natsWrapper.client.close());

            mongoose.connect(process.env.MONGO_URI!)
                .then(() => {
                    app.listen(port, () => {
                        console.log("Succesfully connected to the Database");
                        console.log("Booking Services start on port : " + port);
                    });
                })
                .catch(err => {
                    console.log("DB connection Failed. Could not connect to the database: " + err)
                });

        })
        .catch((err) => {
            console.error("Could not connect to the NATS Streaming Server : " + err);
        });

};

start();