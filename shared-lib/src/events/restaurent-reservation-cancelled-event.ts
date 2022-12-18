import { Subjects } from "./Subjects";


export interface RestaurentReservationCancelledEvent {
    subject: Subjects.RestaurentReservationCancelled;
    data: {
        id: string;
        version: number;
        ticket: {
            id: string;
        };
    };
};