import { NextFunction, Request, Response } from "express";

const currentUser = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ ok: "OK" });
};

const signin = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ ok: "OK" });
};

const signup = (req: Request, res: Response, next: NextFunction) => {

    res.status(200).send({ ok: "OK" });
};

const signout = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ ok: "OK" });
};

export { currentUser, signin, signout, signup };