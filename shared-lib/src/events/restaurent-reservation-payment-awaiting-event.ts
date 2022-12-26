import { Subjects } from "./Subjects";


export interface RestaurentReservationPaymentAwaitingEvent {
    subject: Subjects.RestaurentReservationPaymentAwaiting;
    data: {
        id: string;
        version: number;
        ticket: {
            id: string;
        };
    };
};