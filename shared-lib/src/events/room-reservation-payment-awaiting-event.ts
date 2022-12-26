import { Subjects } from "./Subjects";


export interface RoomReservationPaymentAwaitingEvent {
    subject: Subjects.RoomTypeReservationPaymentAwaiting;
    data: {
        id: string;
        version: number;
        ticket: {
            id: string;
        };
    };
};