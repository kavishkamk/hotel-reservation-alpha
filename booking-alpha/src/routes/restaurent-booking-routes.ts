import { requestValidationMiddleware, requireAdminAccess, requireAuthMiddleware } from "@alpha-lib/shared-lib";
import { Router } from "express";
import { body } from "express-validator";
import { checkRestaurentAvailability, createRestaurentBooking, createRestaurentBookingForClient, getRestaurentBookings } from "../controllers/restaurent-booking-controller";

const router = Router();

router.patch(
    "/check-availability",
    [
        body("numberOfTables")
            .isInt({ gt: 0 })
            .withMessage("number of rooms should be grater than 0"),
        body("numberOfPersons")
            .isInt({ gt: 0 })
            .withMessage("Number of persons should be grater than 0"),
        body("fromDate")
            .isDate()
            .withMessage("from Date required"),
        body("toDate")
            .isDate()
            .withMessage("to Date required")
    ],
    requestValidationMiddleware,
    checkRestaurentAvailability
);

router.use(requireAuthMiddleware);

router.post(
    "/",
    [
        body("restaurentTypeId")
            .not()
            .isEmpty()
            .withMessage("restaurent type id required"),
        body("numberOfTables")
            .isInt({ gt: 0 })
            .withMessage("number of tables should be grater than 0"),
        body("numberOfPersons")
            .isInt({ gt: 0 })
            .withMessage("Number of persons should be grater than 0"),
        body("fromDate")
            .isDate()
            .withMessage("from Date required"),
        body("toDate")
            .isDate()
            .withMessage("to Date required")
    ],
    requestValidationMiddleware,
    createRestaurentBooking
);

router.use(requireAdminAccess);

router.get(
    "/",
    getRestaurentBookings
);

router.post(
    "/create-booking",
    [
        body("restaurentTypeId")
            .not()
            .isEmpty()
            .withMessage("restaurent type id required"),
        body("numberOfTables")
            .isInt({ gt: 0 })
            .withMessage("number of tables should be grater than 0"),
        body("numberOfPersons")
            .isInt({ gt: 0 })
            .withMessage("Number of persons should be grater than 0"),
        body("fromDate")
            .isDate()
            .withMessage("from Date required"),
        body("toDate")
            .isDate()
            .withMessage("to Date required"),
        body("clientId")
            .not()
            .isEmpty()
            .withMessage("client id required"),
    ],
    requestValidationMiddleware,
    createRestaurentBookingForClient
);


export { router as restaurentBookingRouter };