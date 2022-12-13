import { NextFunction, Request, Response } from "express";
import fs from "fs";

import { CustomError } from "../errors/custom-error";
import { ErrorTypes } from "../errors/error-types";
import { ResponseErrorFormat } from "../errors/response-error-format";

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {

    if (req.file) {
        fs.unlink(req.file.path, (error) => {
            console.log(error);
        });
    }

    if (res.headersSent) {
        return next(error);
    }

    let errorResponse: ResponseErrorFormat;

    if (error instanceof CustomError) {
        errorResponse = { errors: error.serializeErrors(), errorType: error.errorType }
        return res.status(error.statusCode).json(errorResponse);
    }

    errorResponse = { errors: [{ message: error.message || "Something went wrong" }], errorType: ErrorTypes.INTERNAL_SERVER_ERROR };
    res.status(500).json(errorResponse);
};

export { errorMiddleware };