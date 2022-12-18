import { RoomExpirationCompleateEvent, publisher, Subjects } from "@alpha-lib/shared-lib";

export class RoomExpirationCompletePublisher extends publisher<RoomExpirationCompleateEvent> {
    subject: Subjects.RoomExpirationCompleate = Subjects.RoomExpirationCompleate;
};