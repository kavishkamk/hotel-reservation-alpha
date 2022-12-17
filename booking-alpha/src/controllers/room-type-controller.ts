import { CommonError, ErrorTypes } from "@alpha-lib/shared-lib";
import { NextFunction, Request, Response } from "express";
import { RoomType } from "../models/RoomType";

const getRoomTypes = async (req: Request, res: Response, next: NextFunction) => {
    let roomTypeSet;

    try {
        roomTypeSet = await RoomType.find().exec();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
    };

    res.status(200).json({ roomType: roomTypeSet });
};

export { getRoomTypes };