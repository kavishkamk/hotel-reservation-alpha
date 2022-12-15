import { requireAuthMiddleware } from "@alpha-lib/shared-lib";
import { Router } from "express";
import { createRoomBooking } from "../controllers/room-booking-controller";

const router = Router();

router.use(requireAuthMiddleware);

router.post("/", createRoomBooking);

export { router as roomBookingRouter };