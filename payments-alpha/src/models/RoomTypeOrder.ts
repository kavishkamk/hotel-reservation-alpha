import { ReservationStatus } from "@alpha-lib/shared-lib";
import { Model, Schema, model, Document } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// this is a interface that describe
// need to create order
interface IRoomTypeOrder {
    id: string;
    version: number;
    userId: string;
    totalPrice: number;
    status: ReservationStatus;
};

interface RoomTypeOrderDoc extends Document {
    status: ReservationStatus;
    version: number;
    userId: string;
    totalPrice: number;
};

interface RoomTypeOrderModel extends Model<RoomTypeOrderDoc> {
    build(attrs: IRoomTypeOrder): RoomTypeOrderDoc;
};

const roomTypeOrderSchema = new Schema({
    userId: {
        type: String,
        require: [true, "User Id required"]
    },
    status: {
        type: String,
        require: [true, "Order Status required"]
    },
    totalPrice: {
        type: Number,
        require: [true, "Price required"]
    }
}, {
    toJSON: {
        getters: true,
        transform(doc, ret, options) {
            delete ret._id
        },
    }
});

roomTypeOrderSchema.set("versionKey", "version");

roomTypeOrderSchema.plugin(updateIfCurrentPlugin);

roomTypeOrderSchema.statics.build = (attrs: IRoomTypeOrder) => {
    return new RoomTypeOrder({
        _id: attrs.id,
        totalPrice: attrs.totalPrice,
        version: attrs.version,
        status: attrs.status,
        userId: attrs.userId
    });
};

const RoomTypeOrder = model<RoomTypeOrderDoc, RoomTypeOrderModel>("RoomTypeOrder", roomTypeOrderSchema);

export { RoomTypeOrder };