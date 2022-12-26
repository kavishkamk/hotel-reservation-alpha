import { CommonError, ErrorTypes } from "@alpha-lib/shared-lib";
import { NextFunction, Request, Response } from "express";

import { RestaurentType } from "../models/RestaurentType";

const getRestaurentTypes = async (req: Request, res: Response, next: NextFunction) => {
    let restaurentTypeSet;

    try {
        restaurentTypeSet = await RestaurentType.find().exec();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
    };

    res.status(200).json({ roomType: restaurentTypeSet });
};

export { getRestaurentTypes };