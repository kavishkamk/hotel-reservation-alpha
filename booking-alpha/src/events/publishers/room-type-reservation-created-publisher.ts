import { publisher, RoomTypeReservationCreatedEvent, Subjects } from "@alpha-lib/shared-lib";

export class RoomTypeReservationCreatedPublisher extends publisher<RoomTypeReservationCreatedEvent> {
    subject: Subjects.RoomTypeReservationCreated = Subjects.RoomTypeReservationCreated;
};