import { Subjects } from "./Subjects";

export interface ExpirationCompleateEvent {
    subject: Subjects.ExpirationCompleate;
    data: {
        orderId: string;
    }
};