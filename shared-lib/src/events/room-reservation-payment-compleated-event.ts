import { Subjects } from "./Subjects";


export interface RoomReservationPaymentCompleatedEvent {
    subject: Subjects.RoomTypeReservationPaymentCompleated;
    data: {
        id: string;
        version: number;
        ticket: {
            id: string;
        };
    };
};