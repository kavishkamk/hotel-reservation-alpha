import { CommonError, ErrorTypes, Listener, ReservationStatus, RoomExpirationCompleateEvent, Subjects } from "@alpha-lib/shared-lib";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/Order";
import { OrderTracker } from "../../models/OrderTracker";

import { QueueGroupName } from "./queue-group-name";

export class RoomExpirationCompleateListner extends Listener<RoomExpirationCompleateEvent> {
    subject: Subjects.RoomExpirationCompleate = Subjects.RoomExpirationCompleate;
    queueGroupName = QueueGroupName;

    async onMessage(data: RoomExpirationCompleateEvent['data'], msg: Message) {
        const reservation = await Order.findById(data.orderId).populate("roomType");

        if (!reservation) {
            console.log("Reservation not found for expiration(form booking  service) - something wrong");
            msg.ack();
            return;
        };

        if (reservation.status === ReservationStatus.Complete) {
            return msg.ack();
        };

        reservation.set({
            status: ReservationStatus.Cancelled
        });

        try {
            await reservation.save();
        } catch (err) {
            console.log("RoomReservation Event Expiration fail when saving");
            return;
        }

        msg.ack();

        // get the all dates request for booking
        const dateArray = [];
        let tempDate = reservation.fromDate;
        while (reservation.toDate >= tempDate) {
            dateArray.push(tempDate);
            tempDate = new Date(tempDate);
            tempDate.setDate(tempDate.getDate() + 1);
        };

        let recorde;
        // find the record and set records
        try {
            for (let i = 0; i < dateArray.length; i++) {
                recorde = await OrderTracker.findOne({ day: dateArray[i], roomTypeId: reservation.roomType.id }).exec();
                // if not found create record
                if (recorde) {
                    const previous = recorde.numberOfPendingRooms;
                    recorde.set({
                        numberOfPendingRooms: previous - reservation.numberOfRooms
                    })
                    await recorde.save();
                };

            }
        } catch (err) {
            throw new CommonError(500, ErrorTypes.INTERNAL_SERVER_ERROR, "Reservation fail. Plase try again later");
        };

    };
};