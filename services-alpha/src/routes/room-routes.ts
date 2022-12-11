import { Router } from "express";
import { createRoom } from "../controllers/room-controller";

const router = Router();

router.use("/", createRoom);

export { router as roomRoutes };