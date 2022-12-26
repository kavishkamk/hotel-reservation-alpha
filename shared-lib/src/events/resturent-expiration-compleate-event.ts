import { Subjects } from "./Subjects";

export interface ResturentExpirationCompleateEvent {
    subject: Subjects.RestaurentExpirationCompleate;
    data: {
        orderId: string;
    }
};