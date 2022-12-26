import { publisher, RoomReservationPaymentAwaitingEvent, Subjects } from "@alpha-lib/shared-lib";

export class RoomTypeReservationPaymentAwaitingPublisher extends publisher<RoomReservationPaymentAwaitingEvent> {
    subject: Subjects.RoomTypeReservationPaymentAwaiting = Subjects.RoomTypeReservationPaymentAwaiting;
};