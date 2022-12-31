import { requireAuthMiddleware, fileUpload, requestValidationMiddleware, requireAdminAccess } from "@alpha-lib/shared-lib";
import { Router } from "express";
import { body } from "express-validator";
import { confirmPayment, createPayment, getAllCurretUserOrders, setOrderAsPaid } from "../controllers/room-payment-controller";

const router = Router();

router.use(requireAuthMiddleware);

router.post(
    "/",
    fileUpload.single("paymentSlip"),
    [
        body("orderId")
            .trim()
            .not()
            .isEmail()
            .withMessage("Order Id required")
    ],
    requestValidationMiddleware,
    createPayment
);

router.get(
    "/current-user-orders",
    getAllCurretUserOrders
);


router.use(requireAdminAccess);

router.post(
    "/payment-confirm",
    [
        body("orderId")
            .trim()
            .not()
            .isEmail()
            .withMessage("Order Id required")
    ],
    requestValidationMiddleware,
    confirmPayment
);

router.patch(
    "/set-to-paid/:orderId",
    setOrderAsPaid
)

export { router as paymentsRouter };