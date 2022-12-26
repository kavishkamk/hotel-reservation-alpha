import { Document, model, Model, Schema } from "mongoose";

import { RestaurentOrder, ReservationStatus } from "./RestaurentOrder";

// an interface that describe the properties
// want to create Restaurent Type
interface RestaurentTypeAttrs {
    id: string;
    restaurentType: string;
    numberOfTables: number;
    maxGuest: number;
    version: number;
};

// an interface that describe the propertice
// restaurent type document has
interface RestaurentTypeDoc extends Document {
    id: string;
    restaurentType: string;
    numberOfTables: number;
    maxGuest: number;
    version: number;
    isReserved(): Promise<boolean>;
};

// an interface that describe the propertice
// restaurent type modle has
interface RestaurentTypeModel extends Model<RestaurentTypeDoc> {
    build(attrs: RestaurentTypeAttrs): RestaurentTypeDoc;
    findByEvent(event: { id: string, version: number }): Promise<RestaurentTypeDoc | null>;
};

// schema of the room type 
const restaurentTypeSchema = new Schema({
    restaurentType: {
        type: String,
        require: [true, "type required"]
    },
    numberOfTables: {
        type: Number,
        require: [true, "number of tables required"],
        min: [0, "number of tables should be > 0"]
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

restaurentTypeSchema.set("versionKey", "version");

restaurentTypeSchema.pre("save", function (done) {
    // @ts-ignores
    this.$where = {
        version: this.get("version") - 1
    };

    done();
});

restaurentTypeSchema.statics.build = (event: { id: string, version: number }) => {
    return RestaurentType.findOne({
        _id: event.id,
        version: event.version - 1
    });
};

// set statics method to build
restaurentTypeSchema.statics.build = (attrs: RestaurentTypeAttrs) => {
    return new RestaurentType({
        _id: attrs.id,
        restaurentType: attrs.restaurentType,
        numberOfTables: attrs.numberOfTables,
        maxGuest: attrs.maxGuest
    });
};

// find the restaurent type is reserved or not
restaurentTypeSchema.methods.isReserved = async function () {
    const existingOrder = await RestaurentOrder.findOne({
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

const RestaurentType = model<RestaurentTypeDoc, RestaurentTypeModel>("RestaurentType", restaurentTypeSchema);

export { RestaurentType, RestaurentTypeDoc };
