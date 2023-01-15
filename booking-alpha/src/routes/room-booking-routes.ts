import { requestValidationMiddleware, requireAdminAccess, requireAuthMiddleware } from "@alpha-lib/shared-lib";
import { Router } from "express";
import { body } from "express-validator";
import { getTodaysTotalPayments, getTodaysTotalReservation } from "../controllers/restaurent-booking-controller";
import { cancelRoomReservation, checkIn, checkOut, checkRoomAvailability, createBookingForClient, createRoomBooking, getBookings, getCancelledRoomReservation, getCancelledRoomReservationOfCurrentUser, getCheckInByUserId, getCheckInCurrentUser, getCheckOutByUserId, getCheckOutCurrentUser, getConfirmAvaitingRoomReservation, getConfirmAvaitingRoomReservationOfCurrentUser, getConfirmedRoomReservation, getConfirmedRoomReservationOfCurrentUser, getPendingRoomReservation, getPendingRoomReservationByUserId, getPendingRoomReservationOfCurrentUser } from "../controllers/room-booking-controller";

const router = Router();

router.patch(
    "/check-availability",
    [
        body("numberOfRooms")
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
    checkRoomAvailability
);

router.use(requireAuthMiddleware);

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
            .withMessage("Number of persons should be grater than 0"),
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

router.patch(
    "/cancel/:orderId",
    cancelRoomReservation
);

router.get(
    "/pending-reservation/current-user",
    getPendingRoomReservationOfCurrentUser
);

router.get(
    "/awaiting-confirm-reservation/current-user",
    getConfirmAvaitingRoomReservationOfCurrentUser
);

router.get(
    "/confirmed/current-user",
    getConfirmedRoomReservationOfCurrentUser
);

router.get(
    "/cancelled/current-user",
    getCancelledRoomReservationOfCurrentUser
);

router.get(
    "/check-in/current-user",
    getCheckInCurrentUser
);

router.get(
    "/check-out/current-user",
    getCheckOutCurrentUser
);

router.use(requireAdminAccess);

router.get(
    "/",
    getBookings
);

router.post(
    "/create-booking",
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
        body("email")
            .trim()
            .normalizeEmail()
            .isEmail()
            .withMessage("valid email required"),
    ],
    requestValidationMiddleware,
    createBookingForClient
);

router.get(
    "/pending-reservation",
    getPendingRoomReservation
);

router.get(
    "/awaiting-confirm-reservation",
    getConfirmAvaitingRoomReservation
);

router.get(
    "/confirmed",
    getConfirmedRoomReservation
);

router.get(
    "/cancelled",
    getCancelledRoomReservation
);

router.patch(
    "/checkIn/:orderId",
    checkIn
);

router.patch(
    "/checkOut/:orderId",
    checkOut
);

router.get(
    "/check-in/:userId",
    getCheckInByUserId
);

router.get(
    "/check-out/:userId",
    getCheckOutByUserId
);

router.get(
    "/totle-reservation-count",
    getTodaysTotalReservation
);

router.get(
    "/total-paied-reservation",
    getTodaysTotalPayments
)

router.get(
    "/confirmed/user/:userId",
    getConfirmedRoomReservation
);

router.get(
    "/pending-reservation/user/:userId",
    getPendingRoomReservationByUserId
);

export { router as roomBookingRouter };