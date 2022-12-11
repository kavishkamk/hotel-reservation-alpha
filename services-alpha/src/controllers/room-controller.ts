import { NextFunction, Request, Response } from "express";

const createRoom = (req: Request, res: Response, next: NextFunction) => {
    res.send({ ok: "ok" });
};

export { createRoom };