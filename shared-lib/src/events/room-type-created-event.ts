import { Subjects } from "./Subjects";

export interface RoomTypeCreatedEvent {
    subject: Subjects.RoomTypeCreated,
    data: {
        id: string;
        roomType: string;
        numberOfRooms: number;
        price: number;
        maxGuest: number;
        version: number;
    };
}