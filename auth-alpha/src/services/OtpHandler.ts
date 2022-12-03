// this is used to send OTP to the client

import { CommonError, ErrorTypes } from "@alpha-lib/shared-lib";
import { User } from "../models/User";

import { EmailHandler } from "./EmailHandler";

const sendOTP = async (clientEmail: string) => {

    const otpCode = Math.floor(Math.random() * 1000000);

    const subject = "Verification Email";
    const body = `This is the OTP code for verify your account. OTP CODE : ${otpCode} .Please don't share with this anyone`;
    const htmlBody = `<p>This is the OTP code for verify your account. <br/>
                       <b> OTP CODE : ${otpCode} </b> <br />
                    Please don't share this with anyone</p>`;

    try {
        await EmailHandler.sendEmail(clientEmail, subject, body, htmlBody);
    } catch (err) {
        throw new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "error occured during verification code sending");
    };

    return otpCode;

};

const saveOTP = async (clientEmail: string, otpCode: number) => {

    let user;

    // find user useing email
    try {
        user = await User.findOne({ email: clientEmail }).exec();
    } catch (err) {
        throw new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Activation Fail, Plase try again later");
    };

    // check user is available
    if (!user) {
        throw new CommonError(404, ErrorTypes.NOT_FOUND, "Somthing wrong, user not found");
    };

    user.set({
        otpCode
    });

    try {
        await user.save();
    } catch (err) {
        throw new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Something wrong. Please try again later");
    };

};

const verifyOTP = async (clientEmail: string, otpCode: number) => {

    let user;

    // find user useing email
    try {
        user = await User.findOne({ email: clientEmail }).exec();
    } catch (err) {
        throw new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Activation Fail, Plase try again later");
    };

    // check user is available
    if (!user) {
        throw new CommonError(404, ErrorTypes.NOT_FOUND, "Somthing wrong, user not found");
    };

    if (user && !user.otpCode) {
        throw new CommonError(404, ErrorTypes.NOT_FOUND, "Activation Fail, Plase send a activation request");
    };

    if (user.otpCode == otpCode) {
        user.set({
            otpCode: undefined,
            activeStatus: true
        });

        try {
            user = await user.save();
        } catch (err) {
            throw new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Something wrong. Please try again later");
        };
    } else {
        throw new CommonError(422, ErrorTypes.NOT_AUTHERIZED, "Wrong OTP Code");
    };

    return user;
};

export { sendOTP, verifyOTP, saveOTP };