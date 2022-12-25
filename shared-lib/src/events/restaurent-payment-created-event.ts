import { Subjects } from "./Subjects";

export interface ReservationPaymentCreatedEvent {
    subject: Subjects.RestaurentPaymentCreated;
    data: {
        paymentId: string;
        orderId: string;
    }
}