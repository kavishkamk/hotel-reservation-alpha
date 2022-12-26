import { Subjects } from "./Subjects";

export interface ReservationPaymentConfirmedEvent {
    subject: Subjects.RestaurentPaymentConfirmed;
    data: {
        paymentId: string;
        orderId: string;
    }
}