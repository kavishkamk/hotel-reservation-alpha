import { requireAuthMiddleware, fileUpload } from "@alpha-lib/shared-lib";
import { Router } from "express";
import { createPayment } from "../controllers/payment-controller";

const router = Router();

router.use(requireAuthMiddleware);

router.post(
    "/",
    fileUpload.single("paymentSlip"),
    createPayment);

export { router as paymentsRouter };