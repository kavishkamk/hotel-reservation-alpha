import { requestValidationMiddleware, requireAuthMiddleware } from "@alpha-lib/shared-lib";
import { Router } from "express";
import { body } from "express-validator";
import { createRoomBooking, getBookings } from "../controllers/room-booking-controller";

const router = Router();

router.use(requireAuthMiddleware);

router.get(
    "/",
    getBookings
);

router.post(
    "/",
    [
        body("roomTypeId")
            .not()
            .isEmpty()
            .withMessage("room type id required"),
        body("numberOfRooms")
            .isInt({ gt: 0 })
            .withMessage("number of rooms should be grater than 0"),
        body("numberOfPersons")
            .isInt({ gt: 0 })
            .withMessage("Number of rooms should be grater than 0"),
        body("fromDate")
            .isDate()
            .withMessage("from Date required"),
        body("toDate")
            .isDate()
            .withMessage("to Date required")
    ],
    requestValidationMiddleware,
    createRoomBooking
);

export { router as roomBookingRouter };