import { Subjects } from "./Subjects";

export interface RoomExpirationCompleateEvent {
    subject: Subjects.RoomExpirationCompleate;
    data: {
        orderId: string;
    }
};