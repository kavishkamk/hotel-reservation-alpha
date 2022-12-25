import { Subjects } from "./Subjects";


export interface RestaurentReservationPaymentCompleatedEvent {
    subject: Subjects.RestaurentReservationPaymentCompleated;
    data: {
        id: string;
        version: number;
        ticket: {
            id: string;
        };
    };
};