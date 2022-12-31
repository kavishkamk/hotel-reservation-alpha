import { Subjects } from "./Subjects";

export interface RoomPaymentCancelledEvent {
    subject: Subjects.RoomTypePaymentCancelled;
    data: {
        paymentId: string;
        orderId: string;
    }
};