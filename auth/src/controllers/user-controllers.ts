import { CommonError, UserPayload, ErrorTypes } from "@alpha-lib/shared-lib";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { User } from "../models/User";
import { sendOTP, verifyOTP } from "../services/OtpHandler";
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
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Sign In fail. Please try again later "));
    };

    // check user already exist
    if (!exsistingUser) {
        return next(new CommonError(401, ErrorTypes.NOT_AUTHERIZED, "Sign In fail. Invalid Email or Password"));
    };

    // check the given account not activated
    if (exsistingUser && !exsistingUser.activeStatus) {
        return next(new CommonError(401, ErrorTypes.NOT_ACTIVATED_ACCOUNT, "Acount is not activated"));
    };

    // compare password
    const isValidPassword = await PasswordHandle.compare(exsistingUser.password, password);

    if (!isValidPassword) {
        return next(new CommonError(401, ErrorTypes.NOT_AUTHERIZED, "Sign In fail. Invalid Email or Password"));
    };

    // generate JWT key
    const userJWT = jwt.sign({
        id: exsistingUser.id,
        email: exsistingUser.email
    } as UserPayload, process.env.JWT_KEY!);

    // set jwt in session
    req.session = {
        jwt: userJWT
    }

    res.status(200)
        .json({
            userId: exsistingUser.id,
            email: exsistingUser.email,
            firstName: exsistingUser.firstName,
            lastName: exsistingUser.lastName,
            address: exsistingUser.address,
            contactNumber: exsistingUser.contactNumber,
            profileURL: exsistingUser.profileURL,
            activeStatus: exsistingUser.activeStatus
        });
};

// signup
const signup = async (req: Request, res: Response, next: NextFunction) => {

    const { firstName, lastName, email, password, address, contactNumber } = req.body;

    let existingUser;

    // check exsisting email
    try {
        existingUser = await User.findOne({ email }).exec();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Signup Fail, Please try again later..."))
    };

    // check the given account not activated
    if (existingUser && !existingUser.activeStatus) {
        return next(new CommonError(401, ErrorTypes.NOT_ACTIVATED_ACCOUNT, "Acount is not activated"));
    };

    // check alrady have a account
    if (existingUser) {
        return next(new CommonError(422, ErrorTypes.EXISTING_USER, "Signup Fail, User Alrady Exist, Please use another email"));
    };

    // create user
    let user = User.build({
        firstName,
        lastName,
        email,
        password,
        address,
        contactNumber,
        profileURL: "",
        activeStatus: false
    });

    try {
        user = await user.save();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Signup Failed, Please try again later"));
    };

    res.status(201)
        .json({
            user: {
                userId: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                contactNumber: user.contactNumber,
                profileURL: user.profileURL,
                activeStatus: user.activeStatus
            }
        });
};

// activate user accout using given email
const requestAccoutActivationOTP = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    let user;

    // find user useing email
    try {
        user = await User.findOne({ email }).exec();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Activation Fail, Plase try again later"));
    };

    // check user already exist
    if (!user) {
        return next(new CommonError(404, ErrorTypes.NOT_FOUND, "Account Not Found"));
    };

    // check if user account alredy activated
    if (user && user.activeStatus) {
        return next(new CommonError(422, ErrorTypes.ALREADY_ACTIVATED_ACCOUNT, "Account Already Activated"));
    };

    try {
        await sendOTP(user.email);
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Faild to send OTP code"));
    };

    res.status(200)
        .json({
            message: "Send OTP Success. Plase check your mail box"
        });
};

// activate account
const accountActivation = async (req: Request, res: Response, next: NextFunction) => {

    const { email, otpCode } = req.body;

    let user;

    try {
        user = await verifyOTP(email, otpCode);
    } catch (err) {
        return next(err);
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
        .json({
            userId: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            contactNumber: user.contactNumber,
            profileURL: user.profileURL,
            activeStatus: user.activeStatus
        });
};

const signout = (req: Request, res: Response, next: NextFunction) => {

    req.session = null;

    res.status(201).send({});
};

export {
    currentUser,
    signin,
    signout,
    signup,
    requestAccoutActivationOTP,
    accountActivation
};