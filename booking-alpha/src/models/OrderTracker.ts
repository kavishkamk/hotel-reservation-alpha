import { Document, model, Model, Schema, StartOfWeek } from "mongoose";

import { RoomTypeDoc } from "./RoomType";

interface OrderTrackerAttrs {
    day: Date;
    roomTypeId: RoomTypeDoc;
    numberOfReservedRooms: number;
    numberOfPendingRooms: number;
    numberOfAwaitingPayments: number;
};

interface OrderTrackerDoc extends Document {
    day: Date;
    roomTypeId: RoomTypeDoc;
    numberOfReservedRooms: number;
    numberOfPendingRooms: number;
    numberOfAwaitingPayments: number;
};

interface OrderTrackerModel extends Model<OrderTrackerDoc> {
    build(attrs: OrderTrackerAttrs): OrderTrackerDoc;
};

// schema of the order tracker
const orderTrackerSchema = new Schema({
    roomTypeId: {
        type: Schema.Types.ObjectId,
        ref: "RoomType",
        require: [true, "title required"]
    },
    numberOfReservedRooms: {
        type: Number,
        require: [true, "number of reserved rooms required"],
        min: [0, "number of  reserved rooms should be > 0"]
    },
    numberOfPendingRooms: {
        type: Number,
        require: [true, "number of pending rooms required"],
        min: [0, "number of pending rooms should be > 0"]
    },
    numberOfAwaitingPayments: {
        type: Number,
        require: [true, "number of awaiting rooms required"],
        min: [0, "number of awaiting rooms should be > 0"]
    },
    day: {
        type: Date,
        require: [true, "day required"],
    }
}, {
    toJSON: {
        getters: true,
        transform(doc, ret, options) {
            delete ret._id
        },
    }
});

orderTrackerSchema.set("versionKey", "version");

// set statics method to build
orderTrackerSchema.statics.build = (attrs: OrderTrackerAttrs) => {
    return new OrderTracker(attrs);
};

const OrderTracker = model<OrderTrackerDoc, OrderTrackerModel>("OrderTrackerDoc", orderTrackerSchema);

export { OrderTracker, OrderTrackerDoc };
