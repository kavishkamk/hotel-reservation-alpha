import { CommonError, UserPayload, ErrorTypes, fileUpload } from "@alpha-lib/shared-lib";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { User } from "../models/User";
import { sendOTP, verifyOTP, saveOTP } from "../services/OtpHandler";
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
        email: exsistingUser.email,
        isAdmin: exsistingUser.isAdmin
    } as UserPayload, process.env.JWT_KEY!);

    // set jwt in session
    req.session = {
        jwt: userJWT
    }

    res.status(200)
        .json({
            user: {
                userId: exsistingUser.id,
                email: exsistingUser.email,
                firstName: exsistingUser.firstName,
                lastName: exsistingUser.lastName,
                address: exsistingUser.address,
                contactNumber: exsistingUser.contactNumber,
                profileURL: exsistingUser.profileURL,
                activeStatus: exsistingUser.activeStatus,
                nicNumber: exsistingUser.nicNumber,
                isAdmin: exsistingUser.isAdmin,
                jwt: userJWT
            }
        });
};

// signup
const signup = async (req: Request, res: Response, next: NextFunction) => {

    const { firstName, lastName, email, password, address, contactNumber, nicNumber, isAdmin } = req.body;

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
        profileURL: req.file?.path || "upload/images/unknownPerson.jpg",
        activeStatus: false,
        nicNumber
    });

    if (isAdmin) {
        if (req.currentUser?.isAdmin) {
            user.set({ isAdmin: isAdmin });
        } else {
            return next(new CommonError(401, ErrorTypes.NOT_AUTHERIZED, "Not autherized to create admin"));
        }
    };


    try {
        user = await user.save();
    } catch (err) {
        console.log(err);
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
                activeStatus: user.activeStatus,
                nicNumber: user.nicNumber,
                isAdmin: user.isAdmin
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

    let otpCode;

    try {
        otpCode = await sendOTP(user.email);
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Faild to send OTP code"));
    };

    try {
        await saveOTP(user.email, otpCode);
    } catch (err) {
        return next(err);
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
        isAdmin: user.isAdmin
    } as UserPayload, process.env.JWT_KEY!);

    // set jwt in session
    req.session = {
        jwt: userJWT
    }

    res.status(200)
        .json({
            user: {
                userId: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                contactNumber: user.contactNumber,
                profileURL: user.profileURL,
                activeStatus: user.activeStatus,
                nicNumber: user.nicNumber,
                isAdmin: user.isAdmin,
                jwt: userJWT
            }
        });
};

// edit profile details
// to use this JWT token should be available. othewise throw a error
const editUserDetails = async (req: Request, res: Response, next: NextFunction) => {

    const { firstName, lastName, email, password, newPassword, address, contactNumber, nicNumber } = req.body;

    let existingUser;

    // check user is available
    try {
        existingUser = await User.findById(req.currentUser!.id).exec();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Profile update Fail, Plase try again later"));
    };

    if (!existingUser) {
        return next(new CommonError(404, ErrorTypes.NOT_FOUND, "Profile Update Fail, Not Autherized"));
    };

    // check if password is set is it correct
    if (!!password) {
        const isValid = await PasswordHandle.compare(existingUser.password, password);

        if (!isValid) {
            return next(new CommonError(401, ErrorTypes.NOT_AUTHERIZED, "Profile Update Fail, Wrong Passowrd"));
        };

        try {
            if (!!newPassword && newPassword.length < 8) {
                return next(new CommonError(422, ErrorTypes.INPUT_VALIDATION_ERROR, "Password Should be at least 8 characters"));
            };
        } catch (err) {
            return next(new CommonError(422, ErrorTypes.INPUT_VALIDATION_ERROR, "Password Should be at least 8 characters"));
        };


        !!newPassword && existingUser.set({
            password: newPassword
        });
    };

    // change email if available and send otp for new email
    if (!!email) {
        try {
            const otpCode = await sendOTP(email);

            existingUser.set({
                email,
                otpCode,
                activeStatus: false
            });
        } catch (err) {
            console.log(err);
            return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "OTP code sending fail. Please try again later"));
        };
    };

    // change other properties

    !!firstName && existingUser.set({
        firstName
    });

    !!lastName && existingUser.set({
        lastName
    });

    !!address && existingUser.set({
        address
    });

    !!contactNumber && existingUser.set({
        contactNumber
    });

    !!req.file?.path && existingUser.set({
        profileURL: req.file!.path
    });

    !!nicNumber && existingUser.set({
        nicNumber
    });

    try {
        existingUser = await existingUser.save();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Profile Update fail, Please try again later."));
    };

    res.status(200)
        .json({
            user: {
                userId: existingUser.id,
                email: existingUser.email,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                address: existingUser.address,
                contactNumber: existingUser.contactNumber,
                profileURL: existingUser.profileURL,
                activeStatus: existingUser.activeStatus,
                nicNumber: existingUser.nicNumber,
                isAdmin: existingUser.isAdmin
            }
        });
};

const signout = async (req: Request, res: Response, next: NextFunction) => {

    req.session = null;

    res.status(201).send({});
};

const createClient = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password, address, contactNumber, nicNumber } = req.body;

    let existingUser;

    // check exsisting email
    try {
        existingUser = await User.findOne({ email }).exec();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Signup Fail, Please try again later..."))
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
        profileURL: req.file?.path || "upload/images/unknownPerson.jpg",
        activeStatus: true,
        nicNumber,
        isAdmin: false
    });

    try {
        user = await user.save();
    } catch (err) {
        return next(new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Create user Failed, Please try again later"));
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
                activeStatus: user.activeStatus,
                nicNumber: user.nicNumber
            }
        });
};

const getClientByEmail = async (req: Request, res: Response, next: NextFunction) => {

    const userEmail = req.params.userEmail;

    let user;

    try {
        user = await User.findOne({ email: userEmail }).exec();
    } catch (err) {
        return next(err);
    };

    if (!user) {
        return next(new CommonError(404, ErrorTypes.NOT_FOUND, "User Account Not found"));
    };

    res.status(200)
        .json({
            user: {
                userId: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                contactNumber: user.contactNumber,
                profileURL: user.profileURL,
                activeStatus: user.activeStatus,
                nicNumber: user.nicNumber,
                isAdmin: user.isAdmin
            }
        });

};

const getNumberOfUsers = async (req: Request, res: Response, next: NextFunction) => {

    let count;

    try {
        count = await User.countDocuments({ isAdmin: false, activeStatus: true });
    } catch (err) {
        return next(err);
    };

    res.status(200).json({ count });

};

export {
    currentUser,
    signin,
    signout,
    signup,
    requestAccoutActivationOTP,
    accountActivation,
    editUserDetails,
    createClient,
    getClientByEmail,
    getNumberOfUsers
};