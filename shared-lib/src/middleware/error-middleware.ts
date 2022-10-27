import { NextFunction, Request, Response } from "express";

import { CustomError } from "../errors/custom-error";

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {

    if (res.headersSent) {
        return next(error);
    }

    if (error instanceof CustomError) {
        return res.status(error.statusCode).send({ errors: error.serializeErrors() });
    }

    return res.status(500).send({ errors: [{ message: error.message || "Something went wrong" }] });
};

export { errorMiddleware };