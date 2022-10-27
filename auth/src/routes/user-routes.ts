import { Router } from "express";
import { body } from "express-validator";

import { signin, signout, signup, currentUser } from "../controllers/user-controllers";

const router = Router();

router.get("/currentuser", currentUser);

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
    signin
);

router.post("/signout", signout);

export { router as userRouter };