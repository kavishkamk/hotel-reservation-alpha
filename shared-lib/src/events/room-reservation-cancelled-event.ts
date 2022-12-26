import { Subjects } from "./Subjects";


export interface RoomReservationCancelledEvent {
    subject: Subjects.RoomTypeReservationCancelled;
    data: {
        id: string;
        version: number;
        ticket: {
            id: string;
        };
    };
};