import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { json } from "body-parser";
import { unhandledRouteMiddleware, errorMiddleware } from "@alpha-lib/shared-lib";
import cookieSession from "cookie-session";
import path from "path";
import rateLimit from 'express-rate-limit';

import { userRouter } from "./routes/user-routes";

const app = express();

app.set("trust proxy", true);
// app.set("trust proxy", "127.0.0.1");

const allowedOrigins = ['http://localhost:3000', "https://golden-aurora-hotel.vercel.app", "https://golden-aurora-admin.vercel.app", "*"];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options))

app.use(cookieSession({
    signed: false,
    secure: true
}));

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20
});

app.use(limiter);

// app.use(cors);

app.use(json());

// app.use((req: Request, res: Response, next: NextFunction) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//     // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     res.setHeader("Access-Control-Allow-Methods", "*");
//     next();
// });

app.use("/api/users/upload/images", express.static(path.join(__dirname, "upload", "images")));

// user router
app.use("/api/users", userRouter);

// unhandled router
app.use(unhandledRouteMiddleware);

// error middleware
app.use(errorMiddleware);

export { app };