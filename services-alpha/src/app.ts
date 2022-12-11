import express from "express";
import { json } from "body-parser";
import { errorMiddleware, unhandledRouteMiddleware } from "@alpha-lib/shared-lib";

import { roomRoutes } from "./routes/room-routes";

const app = express();

app.use(json());

app.use("/api/services/rooms", roomRoutes);

app.use(unhandledRouteMiddleware);

app.use(errorMiddleware);

export { app };