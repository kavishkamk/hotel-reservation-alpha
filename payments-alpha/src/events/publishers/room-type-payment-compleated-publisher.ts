import { publisher, RoomPaymentConfirmedEvent, Subjects } from "@alpha-lib/shared-lib";

export class RoomTypePaymentConfirmedPublisher extends publisher<RoomPaymentConfirmedEvent> {
    subject: Subjects.RoomTypePaymentConfirmed = Subjects.RoomTypePaymentConfirmed;
};