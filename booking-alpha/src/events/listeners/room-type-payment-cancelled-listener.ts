import { Listener, Subjects, RoomPaymentCreatedEvent, CommonError, ErrorTypes, ReservationStatus, RoomPaymentCancelledEvent } from "@alpha-lib/shared-lib";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/Order";
import { OrderTracker } from "../../models/OrderTracker";
import { natsWrapper } from "../../nats-wrapper";
import { getDatesBetween } from "../../resources/date-handle";
import { RoomTypeReservationCancelledPublisher } from "../publishers/room-type-reservation-cancelled-publisher";
import { RoomTypeReservationPaymentAwaitingPublisher } from "../publishers/room-type-reservation-payment-awaiting-publisher";

import { QueueGroupName } from "./queue-group-name";

export class RoomTypePaymentCancelledListener extends Listener<RoomPaymentCancelledEvent> {
    subject: Subjects.RoomTypePaymentCancelled = Subjects.RoomTypePaymentCancelled;
    queueGroupName = QueueGroupName;

    async onMessage(data: RoomPaymentCancelledEvent['data'], msg: Message) {

        const { orderId } = data;

        let reservation = await Order.findById(orderId).populate("roomType");

        if (!reservation) {
            console.log("Reservation not found for expiration(form booking  service) - something wrong");
            msg.ack();
            return;
        };

        if (reservation.status === ReservationStatus.Complete) {
            return msg.ack();
        };

        if (reservation.status === ReservationStatus.Cancelled) {
            return msg.ack();
        };

        reservation.set({
            status: ReservationStatus.Cancelled
        });

        try {
            reservation = await reservation.save();
        } catch (err) {
            console.log("RoomReservation Event Expiration fail when saving");
            return;
        }

        await new RoomTypeReservationCancelledPublisher(natsWrapper.client).publish({
            id: reservation.id,
            version: reservation.version,
            ticket: {
                id: reservation.roomType.id
            }
        });

        msg.ack();

        // get the all dates request for booking
        const dateArray = getDatesBetween(reservation.fromDate, reservation.toDate);

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