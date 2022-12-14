import { publisher, RoomTypeCreatedEvent, Subjects } from "@alpha-lib/shared-lib";

export class RoomTypeCreatedPublisher extends publisher<RoomTypeCreatedEvent> {
    subject: Subjects.RoomTypeCreated = Subjects.RoomTypeCreated;
};