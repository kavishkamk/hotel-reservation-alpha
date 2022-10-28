import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

import { app } from "./app";

const port = 4000;

const start = () => {

    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    };

    // connect to the testing database
    mongoose.connect(`mongodb+srv://alpha:${process.env.MONGO_PASSWORD}@alpha-db.j2hgeoj.mongodb.net/?retryWrites=true&w=majority`)
        .then(() => {
            console.log("Succesfully connected to the Database");
            app.listen(port, () => {
                console.log("Server start on port: " + port);
            });
        })
        .catch(err => {
            console.log("DB connection Failed. Could not connect to the database: " + err);
        });
};

start();