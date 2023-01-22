// import * as dotenv from 'dotenv';
// dotenv.config();
import mongoose from "mongoose";

import { app } from "./app";

const port = 4000;

const start = () => {

    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    };

    // if (!process.env.MONGO_PASSWORD) {
    //     throw new Error("MONGO URL must be defined");
    // };

    if (!process.env.HOST_EMAIL) {
        throw new Error("Host email should be defined");
    };

    if (!process.env.EMAIL_APP_PASSWORD) {
        throw new Error("Host email app password should be defined");
    };

    if (!process.env.MONGO_URI) {
        throw new Error("MongoDB url should be defined");
    };

    //connect to the testing database 
    // mongoose.connect(`mongodb+srv://alpha:jqvfzQGm4C6lXafM@alpha-db.j2hgeoj.mongodb.net/?retryWrites=true&w=majority`)
    //     .then(() => {
    //         console.log("Succesfully connected to the Database");
    //         app.listen(port, () => {
    //             console.log("Server start on port: " + port);
    //         });
    //     })
    //     .catch(err => {
    //         console.log("DB connection Failed. Could not connect to the database: " + err);
    //     });

    mongoose.connect(process.env.MONGO_URI)
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