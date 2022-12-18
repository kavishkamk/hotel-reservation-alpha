import { requestValidationMiddleware, requireAdminAccess, requireAuthMiddleware } from "@alpha-lib/shared-lib";
import { Router } from "express";
import { body } from "express-validator";

import { createRestaurentTag, deleteRestaurentTag, getRestaurentTags, updateRestaurentTag } from "../controllers/restaurent-tag-controller";

const router = Router();

router.get(
    "/",
    getRestaurentTags
);

// after this route, to proferm operation user should log in to the system
router.use(requireAuthMiddleware);

// after this route, to preform operation admin access required
router.use(requireAdminAccess);

router.post(
    "/",
    [
        body("tagName")
            .not()
            .isEmpty()
            .trim()
            .withMessage("Tag Name Required")
    ],
    requestValidationMiddleware,
    createRestaurentTag
);

router.patch(
    "/",
    [
        body("id")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Id required"),
        body("tagName")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Tag Name required")
    ],
    requestValidationMiddleware,
    updateRestaurentTag
);

router.delete(
    "/",
    [
        body("id")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Id required"),
    ],
    requestValidationMiddleware,
    deleteRestaurentTag
);

export { router as restaurentTagRouter };