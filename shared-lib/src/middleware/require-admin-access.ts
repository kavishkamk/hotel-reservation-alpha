import { NextFunction, Request, Response } from "express";

import { CommonError } from "../errors/common-error";
import { ErrorTypes } from "../errors/error-types";

const requireAdminAccess = (req: Request, res: Response, next: NextFunction) => {

    if (!(req.currentUser?.isAdmin)) {
        return next(new CommonError(404, ErrorTypes.NOT_AUTHERIZED, "Unautherized access"));
    };

    next();

};

export { requireAdminAccess };