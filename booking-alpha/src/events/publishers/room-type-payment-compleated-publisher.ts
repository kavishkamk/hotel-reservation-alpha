import { publisher, RoomPaymentConfirmedEvent, RoomReservationPaymentAwaitingEvent, RoomReservationPaymentCompleatedEvent, Subjects } from "@alpha-lib/shared-lib";

export class RoomTypeReservationPaymentCompleatedPublisher extends publisher<RoomReservationPaymentCompleatedEvent> {
    subject: Subjects.RoomTypeReservationPaymentCompleated = Subjects.RoomTypeReservationPaymentCompleated;
};