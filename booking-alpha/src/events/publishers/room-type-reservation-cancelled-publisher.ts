import { publisher, RoomReservationCancelledEvent, Subjects } from "@alpha-lib/shared-lib";

export class RoomTypeReservationCancelledPublisher extends publisher<RoomReservationCancelledEvent> {
    subject: Subjects.RoomTypeReservationCancelled = Subjects.RoomTypeReservationCancelled;
};