import { Subjects } from "./Subjects";

export interface RoomExpirationCompleateEvent {
    subject: Subjects.ExpirationCompleate;
    data: {
        orderId: string;
    }
};