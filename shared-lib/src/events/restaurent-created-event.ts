import { Subjects } from "./Subjects";

export interface RestaurentCreatedEvent {
    subject: Subjects.RestaurentCreated,
    data: {
        id: string;
        restaurentType: string;
        numberOfTables: number;
        maxGuest: number;
        version: number;
    };
};