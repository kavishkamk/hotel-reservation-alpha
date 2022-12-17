import express from "express";
import { json } from "body-parser";
import { currentUserMiddleware, errorMiddleware, unhandledRouteMiddleware } from "@alpha-lib/shared-lib";
import cookieSession from "cookie-session";

import { roomBookingRouter } from "./routes/room-booking-routes";
import { roomTypeRouter } from "./routes/room-type-routes";

const app = express();

app.use(json());

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