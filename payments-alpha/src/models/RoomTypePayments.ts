import { Document, model, Model, Schema } from "mongoose";

interface RoomTypePaymentsAttrs {
    orderId: string;
    slipUrl?: string;
    isConfirmed: boolean;
};

interface RoomTypePaymentDoc extends Document {
    orderId: string;
    slipUrl?: string;
    isConfirmed: boolean;
};

interface RoomTypePaymentModel extends Model<RoomTypePaymentModel> {
    build(attrs: RoomTypePaymentsAttrs): RoomTypePaymentDoc;
};

const roomTypePaymentSchema = new Schema({
    orderId: {
        type: String,
        require: [true, "order Id required"]
    },
    slipUrl: {
        type: String
    },
    isConfirmed: {
        type: Boolean,
        require: ["payment confirmation required"],
        default: false
    }
}, {
    toJSON: {
        getters: true,
        transform(doc, ret, options) {
            delete ret._id
        },
    }
});

roomTypePaymentSchema.statics.build = (payment: RoomTypePaymentsAttrs) => {
    return new RoomTypePayment(payment);
};

const RoomTypePayment = model<RoomTypePaymentDoc, RoomTypePaymentModel>("RoomTypePayment", roomTypePaymentSchema);

export { RoomTypePayment, RoomTypePaymentDoc };