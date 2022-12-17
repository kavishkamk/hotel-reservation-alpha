import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { currentUserMiddleware, errorMiddleware, unhandledRouteMiddleware } from "@alpha-lib/shared-lib";
import cookieSession from "cookie-session";

import { roomBookingRouter } from "./routes/room-booking-routes";
import { roomTypeRouter } from "./routes/room-type-routes";

const app = express();

app.set("trust proxy", true);

const allowedOrigins = ['http://localhost:3000', "*"];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options))

app.use(json());

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     res.setHeader("Access-Control-Allow-Headers", "*")
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
//     next();
// });

app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test"
}));

// decode and set the current user result to response
app.use(currentUserMiddleware);

app.use("/api/booking/room-types", roomTypeRouter);
app.use("/api/booking/room-booking", roomBookingRouter);

app.use(unhandledRouteMiddleware);

app.use(errorMiddleware);

export { app };