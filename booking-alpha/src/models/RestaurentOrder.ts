import { ArrivalStatus, ReservationStatus } from "@alpha-lib/shared-lib";
import { Document, model, Model, Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

import { RestaurentTypeDoc } from "./RestaurentType";

// this is a interface that describe
// need to create order
interface IRestaurentOrder {
    userId: string;
    restaurentType: RestaurentTypeDoc;
    numberOfTables: number;
    status: ReservationStatus;
    numberOfPersons: number;
    fromDate: Date;
    toDate: Date;
    userEmail?: string;
    meal?: string;
};

// this is the interface that describe
// that are order document has
interface RestaurentOrderDoc extends Document {
    userId: string;
    restaurentType: RestaurentTypeDoc;
    numberOfTables: number;
    status: ReservationStatus;
    numberOfPersons: number;
    fromDate: Date;
    toDate: Date;
    version: number;
    checkIn?: Date;
    checkOut?: Date;
    arrivalStatus: ArrivalStatus;
    userEmail?: string;
    meal?: string;
};

// a interface that describe the properties
// order model has
interface RestaurentOrderModel extends Model<RestaurentOrderDoc> {
    build: (attrs: IRestaurentOrder) => RestaurentOrderDoc;
};

const restaurentOrderSchema = new Schema({
    userId: {
        type: String,
        require: [true, "user Id required"],
    },
    numberOfTables: {
        type: Number,
        required: [true, "number of tables required"],
        min: [0, "number of tables should be > 0"]
    },
    numberOfPersons: {
        type: Number,
        required: [true, "number of persons required"],
        min: [0, "number of persons should be > 0"]
    },
    status: {
        type: String,
        require: [true, "status required"],
        enum: Object.values(ReservationStatus),
        default: ReservationStatus.Created
    },
    fromDate: {
        type: Date,
        require: [true, "from date required"],
    },
    toDate: {
        type: Date,
        require: [true, "to date required"],
    },
    restaurentType: {
        type: Schema.Types.ObjectId,
        ref: 'RestaurentType'
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
    },
    meal: {
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

restaurentOrderSchema.set("versionKey", "version");

restaurentOrderSchema.plugin(updateIfCurrentPlugin);

restaurentOrderSchema.statics.build = (attrs: IRestaurentOrder) => {
    return new RestaurentOrder(attrs);
};

const RestaurentOrder = model<RestaurentOrderDoc, RestaurentOrderModel>("RestaurentOrder", restaurentOrderSchema);

export { RestaurentOrder, ReservationStatus };