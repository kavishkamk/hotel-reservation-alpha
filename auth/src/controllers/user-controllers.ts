import { CommonError } from "@alpha-lib/shared-lib";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { User } from "../models/User";

const currentUser = (req: Request, res: Response, next: NextFunction) => {

    res.status(200).send({ ok: "OK" });
};

const signin = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ ok: "OK" });
};

const signup = async (req: Request, res: Response, next: NextFunction) => {

    const { firstName, lastName, email, password } = req.body;

    let existingUser;

    // check exsisting email
    try {
        existingUser = await User.findOne({ email }).exec();
    } catch (err) {
        return next(new CommonError(500, "Signin Fail, Please try again later..."))
    }

    if (existingUser) {
        return next(new CommonError(422, "Signup Fail, User Alrady Exist, Please use another email"));
    }

    // create user
    let user = User.build({
        firstName,
        lastName,
        email,
        password,
        activeStatus: false
    });

    try {
        user = await user.save();
    } catch (err) {
        return next(new CommonError(500, "Signup Failed, Please try again later"));
    };

    // generate JWT key
    const userJWT = jwt.sign({
        email: user.email,
        active: user.activeStatus
    }, process.env.JWT_KEY!);

    req.session = {
        jwt: userJWT
    }

    res.status(200)
        .send({
            userId: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        });
};

const signout = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ ok: "OK" });
};

export { currentUser, signin, signout, signup };