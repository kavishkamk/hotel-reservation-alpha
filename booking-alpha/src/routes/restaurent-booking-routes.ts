import { requestValidationMiddleware, requireAdminAccess, requireAuthMiddleware } from "@alpha-lib/shared-lib";
import { Router } from "express";
import { body } from "express-validator";
import { cancelRestaurentReservation, checkIn, checkRestaurentAvailability, createRestaurentBooking, createRestaurentBookingForClient, getCancelledTableReservation, getCancelledTableReservationOfCurrentUser, getConfirmedTableReservation, getConfirmedTableReservationOfCurrentUser, getRestaurentBookings } from "../controllers/restaurent-booking-controller";

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
            .withMessage("from Date required")
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
        body("meal")
            .not()
            .isEmpty()
            .withMessage("meal required"),
    ],
    requestValidationMiddleware,
    createRestaurentBooking
);

router.patch(
    "/cancel/:orderId",
    cancelRestaurentReservation
);

router.get(
    "/confirmed/current-user",
    getConfirmedTableReservationOfCurrentUser
);

router.get(
    "/cancelled/current-user",
    getCancelledTableReservationOfCurrentUser
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
        body("clientId")
            .not()
            .isEmpty()
            .withMessage("client id required"),
        body("email")
            .trim()
            .normalizeEmail()
            .isEmail()
            .withMessage("valid email required"),
        body("meal")
            .not()
            .isEmpty()
            .withMessage("meal required"),
    ],
    requestValidationMiddleware,
    createRestaurentBookingForClient
);

router.get(
    "/confirmed",
    getConfirmedTableReservation
);

router.get(
    "/cancelled",
    getCancelledTableReservation
);

router.patch(
    "/checkIn/:orderId",
    checkIn
);


export { router as restaurentBookingRouter };