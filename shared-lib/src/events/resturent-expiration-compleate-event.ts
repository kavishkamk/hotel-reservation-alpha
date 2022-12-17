import { Subjects } from "./Subjects";

export interface ResturentExpirationCompleateEvent {
    subject: Subjects.ExpirationCompleate;
    data: {
        orderId: string;
    }
};