import { Router } from "express";
import { body, oneOf } from "express-validator";
import { requestValidationMiddleware, currentUserMiddleware, requireAuthMiddleware, fileUpload, requireAdminAccess } from "@alpha-lib/shared-lib";

import { signin, signout, signup, currentUser, requestAccoutActivationOTP, accountActivation, editUserDetails, createClient, getClientByEmail, getNumberOfUsers } from "../controllers/user-controllers";

const MIN_PASSWORD_LENGHT = 8;

const router = Router();

// get current user
router.get(
    "/currentuser",
    currentUserMiddleware,
    currentUser
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
    "/requestotp",
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

// get the JWT token data
router.use(currentUserMiddleware);

// sign up
router.post(
    "/signup",
    fileUpload.single("profilePic"),
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
            .isLength({ min: MIN_PASSWORD_LENGHT })
            .withMessage(`Password should be at leadt ${MIN_PASSWORD_LENGHT} characters`),
        body("address")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Address is required"),
        body("contactNumber")
            .trim()
            .not()
            .isEmpty(),
        body("nicNumber")
            .trim()
            .isLength({ min: 9 })
            .withMessage("NIC number required")
    ],
    requestValidationMiddleware,
    signup
);

// after this middle ware only authenicated uses can access
router.use(requireAuthMiddleware);

// edit profile details
router.patch("/editprofile",
    fileUpload.single("profilePic"),
    [
        oneOf(
            [
                body("email")
                    .not()
                    .isEmpty()
                    .normalizeEmail()
                    .isEmail()
                    .withMessage("Email should be valid"),
                body("email")
                    .trim()
                    .isEmpty()
                    .withMessage("Email should be valid")
            ]
        )
    ],
    requestValidationMiddleware,
    editUserDetails
);

// admin access required for after this middle ware
router.use(requireAdminAccess);

// sign up
router.post(
    "/add-user",
    fileUpload.single("profilePic"),
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
            .isLength({ min: MIN_PASSWORD_LENGHT })
            .withMessage(`Password should be at leadt ${MIN_PASSWORD_LENGHT} characters`),
        body("address")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Address is required"),
        body("contactNumber")
            .trim()
            .not()
            .isEmpty(),
        body("nicNumber")
            .trim()
            .isLength({ min: 9 })
            .withMessage("NIC number required")
    ],
    requestValidationMiddleware,
    createClient
);

router.get(
    "/email/:userEmail",
    getClientByEmail
);

router.get(
    "/user-count",
    getNumberOfUsers
);

export { router as userRouter };