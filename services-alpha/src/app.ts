import express from "express";
import { json } from "body-parser";
import { currentUserMiddleware, errorMiddleware, unhandledRouteMiddleware } from "@alpha-lib/shared-lib";
import cookieSession from "cookie-session";

import { roomRoutes } from "./routes/room-routes";
import { tagRouter } from "./routes/tag-routes";

const app = express();

app.use(json());

app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test"
}));

// decode and set the current user result to response
app.use(currentUserMiddleware);

app.use("/api/services/rooms", roomRoutes);
app.use("/api/services/tags", tagRouter);

app.use(unhandledRouteMiddleware);

app.use(errorMiddleware);

export { app };