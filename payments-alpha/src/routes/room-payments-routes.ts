import { requireAuthMiddleware, fileUpload, requestValidationMiddleware, requireAdminAccess } from "@alpha-lib/shared-lib";
import { Router } from "express";
import { body } from "express-validator";
import { cancelPayment, confirmPayment, createPayment, getAllCurretUserOrders, getPayment, setOrderAsPaid } from "../controllers/room-payment-controller";

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

router.get(
    "/payment/:orderId",
    getPayment
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
);

router.patch(
    "/payment-cancel",
    [
        body("orderId")
            .trim()
            .not()
            .isEmail()
            .withMessage("Order Id required")
    ],
    requestValidationMiddleware,
    cancelPayment
)

export { router as paymentsRouter };