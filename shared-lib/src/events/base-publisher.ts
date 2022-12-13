import { Stan } from "node-nats-streaming";

import { Subjects } from "./Subjects";

interface Event {
    subject: Subjects;
    data: any;
};

export abstract class publisher<T extends Event> {

    abstract subject: T["subject"];

    constructor(protected client: Stan) { }

    publish(data: T["data"]) {
        return new Promise<void>((resolve, reject) => {
            this.client.publish(
                this.subject,
                JSON.stringify(data),
                (err, guide) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        console.log("published message with guide " + guide);
                        resolve();
                    };
                }
            );
        });
    };

}