/*
    this middleware used to check the validationResult of the express validator
    this middleware should use after set the validation body
*/

import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import { RequestValidationError } from "../errors/request-validation-errors";

const requestValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new RequestValidationError(422, errors.array()));
    }

    next();
};

export { requestValidationMiddleware };