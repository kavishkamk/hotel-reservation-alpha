import { publisher, RestaurentCreatedEvent, Subjects } from "@alpha-lib/shared-lib";

export class RestaurentCreatedPublisher extends publisher<RestaurentCreatedEvent> {
    subject: Subjects.RestaurentCreated = Subjects.RestaurentCreated;
};