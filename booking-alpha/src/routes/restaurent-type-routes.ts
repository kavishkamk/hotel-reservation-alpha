import { Router } from "express";
import { getRestaurentTypes } from "../controllers/restaurent-type-controller";

const router = Router();

router.get("/", getRestaurentTypes);

export { router as restaurentTypeRouter };