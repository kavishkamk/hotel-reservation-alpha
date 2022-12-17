import { Router } from "express";
import { getRoomTypes } from "../controllers/room-type-controller";

const router = Router();

router.get("/", getRoomTypes);

export { router as roomTypeRouter };