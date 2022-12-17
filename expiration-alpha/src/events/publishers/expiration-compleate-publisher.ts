import { ExpirationCompleateEvent, publisher, Subjects } from "@alpha-lib/shared-lib";

export class ExpirationCompletePublisher extends publisher<ExpirationCompleateEvent> {
    subject: Subjects.ExpirationCompleate = Subjects.ExpirationCompleate;
};