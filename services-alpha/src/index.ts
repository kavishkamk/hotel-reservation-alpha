import mongoose from "mongoose";
import { app } from "./app";

const port = 4000;

const start = () => {

    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    };

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must befined");
    };

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            app.listen(port, () => {
                console.log("Succesfully connected to the Database");
                console.log("Services start on port : " + port);
            });
        })
        .catch(err => {
            console.log("DB connection Failed. Could not connect to the database: " + err)
        });

};

start();