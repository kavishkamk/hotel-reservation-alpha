import { requestValidationMiddleware } from "@alpha-lib/shared-lib";
import { Router } from "express";
import { body } from "express-validator";


import { createRoom, deleteRoomType, getRooms } from "../controllers/room-controller";

const router = Router();

router.get(
    "/",
    getRooms
);

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