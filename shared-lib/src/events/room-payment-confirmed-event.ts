import { Subjects } from "./Subjects";

export interface RoomPaymentConfirmedEvent {
    subject: Subjects.RoomTypePaymentConfirmed;
    data: {
        paymentId: string;
        orderId: string;
    }
};