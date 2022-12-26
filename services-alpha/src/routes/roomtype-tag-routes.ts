import { requestValidationMiddleware, requireAdminAccess, requireAuthMiddleware } from "@alpha-lib/shared-lib";
import { Router } from "express";
import { body, validationResult } from "express-validator";

import { createTag, deleteTag, getTags, updateTag } from "../controllers/roomtype-tag-controllers";

const router = Router();

router.get(
    "/",
    getTags
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
    createTag
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
    updateTag
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
    deleteTag
);

export { router as roomTypeTagRouter };