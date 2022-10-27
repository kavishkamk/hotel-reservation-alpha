/*
    this is for handled unhandled routes
    this middleware return a 404 not found error for unhandled routes
*/


import { NextFunction, Request, Response } from "express";

import { CommonError } from "../errors/common-error";

const unhandledRouteMiddleware = (req: Request, res: Response, next: NextFunction) => {
    return next(new CommonError(404, "Could not found this route"));
};

export { unhandledRouteMiddleware };