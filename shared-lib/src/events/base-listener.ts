import { Message, Stan } from "node-nats-streaming";

import { Subjects } from "./Subjects";

interface Event {
    subject: Subjects;
    data: any;
};

export abstract class Listener<T extends Event> {

    abstract queueGroupName: string;
    abstract subject: T["subject"];
    abstract onMessage(data: T['data'], msg: Message): void;
    protected ackWait = 5 * 1000;

    constructor(protected client: Stan) { };

    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDeliverAllAvailable()
            .setDurableName(this.queueGroupName);
    };

    listen() {
        const subscription = this.client.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOptions()
        );

        subscription.on("message", (msg: Message) => {
            console.log(
                `Message Reserved : ${this.subject} / ${this.queueGroupName}`
            );

            const parsedData = this.parseMessage(msg);

            this.onMessage(parsedData, msg);
        });
    };

    parseMessage(msg: Message) {
        const data = msg.getData();

        return typeof data === "string"
            ? JSON.parse(data)
            : JSON.parse(data.toString("utf8"));
    };
}