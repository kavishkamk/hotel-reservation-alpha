import express from "express";
import { json } from "body-parser";
import { unhandledRouteMiddleware, errorMiddleware } from "@alpha-lib/shared-lib";
import cookieSession from "cookie-session";
import path from "path";

import { userRouter } from "./routes/user-routes";

const app = express();

app.set("trust proxy", true);

app.use(json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Headers", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});

app.use(cookieSession({
    signed: false,
    secure: true
}));

app.use("/api/users/upload/images", express.static(path.join(__dirname, "upload", "images")));

// user router
app.use("/api/users", userRouter);

// unhandled router
app.use(unhandledRouteMiddleware);

// error middleware
app.use(errorMiddleware);

export { app };