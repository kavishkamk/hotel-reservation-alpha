import { Router } from "express";
import { body } from "express-validator";
import { requestValidationMiddleware, currentUserMiddleware } from "@alpha-lib/shared-lib";

import { signin, signout, signup, currentUser } from "../controllers/user-controllers";

const router = Router();

router.get("/currentuser", currentUserMiddleware, currentUser);

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
            .withMessage("Password should be at leadt 8 characters")
    ],
    requestValidationMiddleware,
    signup
);

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

router.post("/signout", signout);

export { router as userRouter };