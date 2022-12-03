/*
    this middleware used to check the user has valid jwt token
    if user has valid token set the req.currentUser with payload
*/

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// this is interface defined the properties
// that are required to jwt payload
interface UserPayload {
    id: string;
    email: string;
    isAdmin?: Boolean;
};

// to set the currentUser as a Express Request properties
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
};

// check the jwt set on cookie and if cookie has jwt verify and set the data to the request
const currentUserMiddleware = (req: Request, res: Response, next: NextFunction) => {

    if (!req.session?.jwt) {
        return next();
    }

    try {
        var decoded = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = decoded;
    } catch (err) { };

    next();

};

export { currentUserMiddleware, UserPayload };