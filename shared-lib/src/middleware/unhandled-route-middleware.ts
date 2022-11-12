/*
    this is for handled unhandled routes
    this middleware return a 404 not found error for unhandled routes
*/


import { NextFunction, Request, Response } from "express";

import { CommonError } from "../errors/common-error";
import { ErrorTypes } from "../errors/error-types";

const unhandledRouteMiddleware = (req: Request, res: Response, next: NextFunction) => {
    return next(new CommonError(404, ErrorTypes.NOT_FOUND, "Could not found this route"));
};

export { unhandledRouteMiddleware };