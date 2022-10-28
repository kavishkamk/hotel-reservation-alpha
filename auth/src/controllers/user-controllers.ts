import { CommonError, UserPayload } from "@alpha-lib/shared-lib";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { User } from "../models/User";
import { PasswordHandle } from "../services/PasswordHandle";

// check the user signin or not
// if signin return the current user details else null
const currentUser = (req: Request, res: Response, next: NextFunction) => {

    res.status(200).send({ currentUser: req.currentUser || null });

};

// sign in
const signin = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    let exsistingUser;

    // find user
    try {
        exsistingUser = await User.findOne({ email }).exec();
    } catch (err) {
        return next(new CommonError(500, "Sign In fail. Please try again later "));
    };

    // check user already exist
    if (!exsistingUser) {
        return next(new CommonError(401, "Sign In fail. Invalid Email or Password"));
    };

    // compare password
    const isValidPassword = await PasswordHandle.compare(exsistingUser.password, password);

    if (!isValidPassword) {
        return next(new CommonError(401, "Sign In fail. Invalid Email or Password"));
    };

    // generate JWT key
    const userJWT = jwt.sign({
        id: exsistingUser.id,
        email: exsistingUser.email,
        active: exsistingUser.activeStatus
    } as UserPayload, process.env.JWT_KEY!);

    // set jwt in session
    req.session = {
        jwt: userJWT
    }

    res.status(200)
        .send({
            userId: exsistingUser.id,
            email: exsistingUser.email,
            firstName: exsistingUser.firstName,
            lastName: exsistingUser.lastName
        });
};

// signup
const signup = async (req: Request, res: Response, next: NextFunction) => {

    const { firstName, lastName, email, password } = req.body;

    let existingUser;

    // check exsisting email
    try {
        existingUser = await User.findOne({ email }).exec();
    } catch (err) {
        return next(new CommonError(500, "Signup Fail, Please try again later..."))
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
        id: user.id,
        email: user.email,
        active: user.activeStatus,
    } as UserPayload, process.env.JWT_KEY!);

    // set jwt in session
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

    req.session = null;

    res.status(201).send({});
};

export { currentUser, signin, signout, signup };