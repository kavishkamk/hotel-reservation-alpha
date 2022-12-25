import { publisher, RoomPaymentCreatedEvent, Subjects } from "@alpha-lib/shared-lib";

export class RoomTypePaymentCreatedPublisher extends publisher<RoomPaymentCreatedEvent> {
    subject: Subjects.RoomTypePaymentCreated = Subjects.RoomTypePaymentCreated;
};