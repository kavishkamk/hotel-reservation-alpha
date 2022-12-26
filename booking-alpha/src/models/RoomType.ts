import { Document, model, Model, Schema } from "mongoose";

import { Order, ReservationStatus } from "./Order";

// an interface that describe the properties
// want to create Room Type
interface RoomTypeAttrs {
    id: string;
    roomType: string;
    numberOfRooms: number;
    price: number;
    maxGuest: number;
    version: number;
};

// an interface that describe the propertice
// room type document has
interface RoomTypeDoc extends Document {
    id: string;
    roomType: string;
    numberOfRooms: number;
    price: number;
    maxGuest: number;
    version: number;
    isReserved(): Promise<boolean>;
};

// an interface that describe the propertice
// room type modle has
interface RoomTypeModel extends Model<RoomTypeDoc> {
    build(attrs: RoomTypeAttrs): RoomTypeDoc;
    findByEvent(event: { id: string, version: number }): Promise<RoomTypeDoc | null>;
};

// schema of the room type 
const roomTypeSchema = new Schema({
    roomType: {
        type: String,
        require: [true, "title required"]
    },
    price: {
        type: Number,
        require: [true, "price required"],
        min: [0, "price should be > 0"]
    },
    numberOfRooms: {
        type: Number,
        require: [true, "number of rooms required"],
        min: [0, "number of rooms should be > 0"]
    },
    maxGuest: {
        type: Number,
        require: [true, "max gurest required"],
        min: [0, "max gurest should be > 0"]
    }
}, {
    toJSON: {
        getters: true,
        transform(doc, ret, options) {
            delete ret._id
        },
    }
});

roomTypeSchema.set("versionKey", "version");

roomTypeSchema.pre("save", function (done) {
    // @ts-ignores
    this.$where = {
        version: this.get("version") - 1
    };

    done();
});

roomTypeSchema.statics.build = (event: { id: string, version: number }) => {
    return RoomType.findOne({
        _id: event.id,
        version: event.version - 1
    });
};

// set statics method to build
roomTypeSchema.statics.build = (attrs: RoomTypeAttrs) => {
    return new RoomType({
        _id: attrs.id,
        roomType: attrs.roomType,
        numberOfRooms: attrs.numberOfRooms,
        price: attrs.price,
        maxGuest: attrs.maxGuest
    });
};

// find the room type is reserved or not
roomTypeSchema.methods.isReserved = async function () {
    const existingOrder = await Order.findOne({
        ticket: this,
        status: {
            $in: [
                ReservationStatus.Created,
                ReservationStatus.AwaitingPayment,
                ReservationStatus.Complete
            ]
        }
    });

    return !!existingOrder;
};

const RoomType = model<RoomTypeDoc, RoomTypeModel>("RoomType", roomTypeSchema);

export { RoomType, RoomTypeDoc };
