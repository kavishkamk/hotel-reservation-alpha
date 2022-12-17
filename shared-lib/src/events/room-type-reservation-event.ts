import { Subjects } from "./Subjects";
import { ReservationStatus } from "./types/order-status";

export interface RoomTypeReservationCreatedEvent {
    subject: Subjects.RoomTypeReservationCreated;
    data: {
        id: string;
        status: ReservationStatus;
        userId: string;
        version: number;
        expiresAt: string;
        roomType: {
            id: string;
            price: number;
        };
    };
};