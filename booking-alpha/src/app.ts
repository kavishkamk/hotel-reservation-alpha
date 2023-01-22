import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { currentUserMiddleware, errorMiddleware, unhandledRouteMiddleware } from "@alpha-lib/shared-lib";
import cookieSession from "cookie-session";
import rateLimit from 'express-rate-limit';

import { roomBookingRouter } from "./routes/room-booking-routes";
import { roomTypeRouter } from "./routes/room-type-routes";
import { restaurentTypeRouter } from "./routes/restaurent-type-routes";
import { restaurentBookingRouter } from "./routes/restaurent-booking-routes";

const app = express();

app.set("trust proxy", true);

const allowedOrigins = ['http://localhost:3000', "https://golden-aurora-hotel.vercel.app", "https://golden-aurora-admin.vercel.app", "*"];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options))

// set request rate limit
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 200
});

app.use(limiter);

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
    secure: true
}));

// decode and set the current user result to response
app.use(currentUserMiddleware);

app.use("/api/booking/room-types", roomTypeRouter);
app.use("/api/booking/room-booking", roomBookingRouter);
app.use("/api/booking/restaurent-types", restaurentTypeRouter);
app.use("/api/booking/restaurent-booking", restaurentBookingRouter);

app.use(unhandledRouteMiddleware);

app.use(errorMiddleware);

export { app };