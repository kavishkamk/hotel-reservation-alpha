import { NextFunction, Request, Response } from "express";

const createPayment = (req: Request, res: Response, next: NextFunction) => {
    res.json({ ok: "ok" });
};

export { createPayment };