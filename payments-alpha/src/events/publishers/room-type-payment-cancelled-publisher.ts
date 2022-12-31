import { publisher, RoomPaymentCancelledEvent, Subjects } from "@alpha-lib/shared-lib";

export class RoomTypePaymentCancelledPublisher extends publisher<RoomPaymentCancelledEvent> {
    subject: Subjects.RoomTypePaymentCancelled = Subjects.RoomTypePaymentCancelled;
};