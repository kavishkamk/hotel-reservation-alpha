import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { currentUserMiddleware, errorMiddleware, unhandledRouteMiddleware } from "@alpha-lib/shared-lib";
import cookieSession from "cookie-session";
import { paymentsRouter } from "./routes/room-payments-routes";
import path from "path";
import rateLimit from 'express-rate-limit';

const app = express();

app.set("trust proxy", true);
app.set("trust proxy", "127.0.0.1");

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     res.setHeader("Access-Control-Allow-Headers", "*")
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
//     next();
// });

const allowedOrigins = ['http://localhost:3000', "https://golden-aurora-hotel.vercel.app", "https://golden-aurora-admin.vercel.app", "*"];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options));

// set rate limit
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100
});

app.use(limiter);

app.use(json());

app.use(cookieSession({
    signed: false,
    secure: true
}));

// decode and set the current user result to response
app.use(currentUserMiddleware);

app.use("/api/payments/upload/images", express.static(path.join(__dirname, "upload", "images")));

app.use("/api/payments/room-type", paymentsRouter);

app.use(unhandledRouteMiddleware);

app.use(errorMiddleware);

export { app };