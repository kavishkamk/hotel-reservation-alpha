import { ArrivalStatus, ReservationStatus } from "@alpha-lib/shared-lib";
import { Document, model, Model, Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

import { RoomTypeDoc } from "./RoomType";

// this is a interface that describe
// need to create order
interface IOrder {
    userId: string;
    roomType: RoomTypeDoc;
    numberOfRooms: number;
    roomPrice: number;
    totalPrice: number;
    status: ReservationStatus;
    expiresAt: Date;
    numberOfPersons: number;
    fromDate: Date;
    toDate: Date;
    userEmail?: string;
};

// this is the interface that describe
// that are order document has
interface OrderDoc extends Document {
    userId: string;
    roomType: RoomTypeDoc;
    numberOfRooms: number;
    roomPrice: number;
    totalPrice: number;
    status: ReservationStatus;
    expiresAt: Date;
    numberOfPersons: number;
    fromDate: Date;
    toDate: Date;
    version: number;
    checkIn?: Date;
    checkOut?: Date;
    arrivalStatus: ArrivalStatus;
    userEmail?: string;
};

// a interface that describe the properties
// order model has
interface OrderModel extends Model<OrderDoc> {
    build: (attrs: IOrder) => OrderDoc;
};

const orderSchema = new Schema({
    userId: {
        type: String,
        require: [true, "user Id required"],
    },
    numberOfRooms: {
        type: Number,
        required: [true, "number of rooms required"],
        min: [0, "number of rooms should be > 0"]
    },
    numberOfPersons: {
        type: Number,
        required: [true, "number of persons required"],
        min: [0, "number of persons should be > 0"]
    },
    roomPrice: {
        type: Number,
        required: [true, "room price required"],
        min: [0, "room price should be > 0"]
    },
    totalPrice: {
        type: Number,
        required: [true, "total price required"],
        min: [0, "total price should be > 0"]
    },
    status: {
        type: String,
        require: [true, "status required"],
        enum: Object.values(ReservationStatus),
        default: ReservationStatus.Created
    },
    expiresAt: {
        type: Schema.Types.Date
    },
    fromDate: {
        type: Date,
        require: [true, "from date required"],
    },
    toDate: {
        type: Date,
        require: [true, "to date required"],
    },
    roomType: {
        type: Schema.Types.ObjectId,
        ref: 'RoomType'
    },
    checkIn: {
        type: Date,
    },
    checkOut: {
        type: Date,
    },
    arrivalStatus: {
        type: String,
        enum: Object.values(ArrivalStatus),
        default: ArrivalStatus.Pending
    },
    userEmail: {
        type: String
    }
}, {
    toJSON: {
        getters: true,
        transform(doc, ret, options) {
            delete ret._id
        },
    }
});

orderSchema.set("versionKey", "version");

orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: IOrder) => {
    return new Order(attrs);
};

const Order = model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order, ReservationStatus };