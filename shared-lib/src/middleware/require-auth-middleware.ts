/*
    this middleware used to check user has logged in or not
    * before this middleware it's required to use "currentUserMiddleware"
*/

import { CommonError } from "../errors/common-error";
import { NextFunction, Request, Response } from "express";

const requireAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        return next(new CommonError(401, "Unautherized access"));
    }

    next();
};

export { requireAuthMiddleware };