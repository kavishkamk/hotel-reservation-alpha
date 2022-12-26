import { requestValidationMiddleware, requireAuthMiddleware, requireAdminAccess } from "@alpha-lib/shared-lib";
import { Router } from "express";
import { body } from "express-validator";

import { createRoom, deleteRoomType, getRoomById, getRooms, getRoomsWithGivenTags } from "../controllers/room-controller";

const router = Router();

router.get(
    "/",
    getRooms
);

router.get(
    "/:roomId",
    getRoomById
);

router.patch(
    "/filter",
    [
        body("tags")
            .isArray({ min: 1 })
            .withMessage("Should have at least 1 tag"),
        body("tags.*")
            .not()
            .isArray()
            .not()
            .isEmpty()
            .withMessage("tags should not be null"),
    ],
    requestValidationMiddleware,
    getRoomsWithGivenTags
);

// after this route, to proferm operation user should log in to the system
router.use(requireAuthMiddleware);

// after this route, to preform operation admin access required
router.use(requireAdminAccess);

router.post(
    "/",
    [
        body("roomType")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Room Type required"),
        body("numberOfRooms")
            .trim()
            .isInt({ gt: 0 })
            .withMessage("NumberOfRooms required"),
        body("description")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Description required"),
        body("imageURL")
            .trim()
            .isURL()
            .withMessage("Valid url required"),
        body("price")
            .trim()
            .isFloat({ gt: 0 })
            .withMessage("Price should be grater than 0"),
        body("stars")
            .trim()
            .isInt({ gt: 0, max: 5 })
            .withMessage("stars should be 1 - 5"),
        body("amenities")
            .isArray({ min: 1 })
            .withMessage("Should have at least 1 amenities"),
        body("amenities.*")
            .not()
            .isArray()
            .not()
            .isEmpty()
            .withMessage("amenities should not be null"),
        body("tags")
            .isArray({ min: 1 })
            .withMessage("Should have at least 1 tag"),
        body("tags.*")
            .not()
            .isArray()
            .not()
            .isEmpty()
            .withMessage("tags should not be null"),
        body("maxGuest")
            .trim()
            .isInt({ gt: 0 })
            .withMessage("Number of Maximum Gurst required and should be grater than 0")
    ],
    requestValidationMiddleware,
    createRoom
);

router.delete(
    "/:roomTypeId",
    deleteRoomType
);

export { router as roomRoutes };