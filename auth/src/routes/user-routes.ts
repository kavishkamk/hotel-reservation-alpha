import { Router } from "express";
import { body } from "express-validator";
import { requestValidationMiddleware, currentUserMiddleware } from "@alpha-lib/shared-lib";

import { signin, signout, signup, currentUser, requestAccoutActivationOTP, accountActivation } from "../controllers/user-controllers";

const router = Router();

// get current user
router.get(
    "/currentuser",
    currentUserMiddleware,
    currentUser
);

// sign up
router.post(
    "/signup",
    [
        body("firstName")
            .not()
            .isEmpty()
            .trim()
            .withMessage("First Name Required"),
        body("lastName")
            .not()
            .isEmpty()
            .trim()
            .withMessage("Last Name Required"),
        body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Email must be valid"),
        body("password")
            .trim()
            .isLength({ min: 8 })
            .withMessage("Password should be at leadt 8 characters"),
        body("address")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Address is required"),
        body("contactNumber")
            .trim()
            .not()
            .isEmpty()
    ],
    requestValidationMiddleware,
    signup
);

// sign in
router.post(
    "/signin",
    [
        body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Email must be valid"),
        body("password")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Password required")
    ],
    requestValidationMiddleware,
    signin
);

// requst account activation otp
router.patch(
    "/requestactivation",
    [
        body("email")
            .trim()
            .normalizeEmail()
            .isEmail()
            .withMessage("Email Should be valid")
    ],
    requestValidationMiddleware,
    requestAccoutActivationOTP
);

// request to activate account
router.patch(
    "/activate",
    [
        body("email")
            .trim()
            .normalizeEmail()
            .isEmail()
            .withMessage("Email Should be valid"),
        body("otpCode")
            .trim()
            .isLength({ min: 5 })
            .withMessage("OTP code required")

    ],
    requestValidationMiddleware,
    accountActivation
);

router.post("/signout", signout);

export { router as userRouter };