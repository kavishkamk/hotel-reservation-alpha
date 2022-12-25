import { Subjects } from "./Subjects";

export interface RoomPaymentCreatedEvent {
    subject: Subjects.RoomTypePaymentCreated;
    data: {
        paymentId: string;
        orderId: string;
    }
}