import { Document, model, Model, Schema } from "mongoose";

import { RestaurentTypeDoc } from "./RestaurentType";

interface RestaurentOrderTrackerAttrs {
    day: Date;
    restaurentTypeId: RestaurentTypeDoc;
    numberOfReservedTables: number;
};

interface RestaurentOrderTrackerDoc extends Document {
    day: Date;
    restaurentTypeId: RestaurentTypeDoc;
    numberOfReservedTables: number;
};

interface RestaurentOrderTrackerModel extends Model<RestaurentOrderTrackerDoc> {
    build(attrs: RestaurentOrderTrackerAttrs): RestaurentOrderTrackerDoc;
};

// schema of the order tracker
const restaurentOrderTrackerSchema = new Schema({
    restaurentTypeId: {
        type: Schema.Types.ObjectId,
        ref: "RestaurentType",
        require: [true, "title required"]
    },
    numberOfReservedTables: {
        type: Number,
        require: [true, "number of reserved tables required"],
        min: [0, "number of  reserved tables should be > 0"]
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

restaurentOrderTrackerSchema.set("versionKey", "version");

// set statics method to build
restaurentOrderTrackerSchema.statics.build = (attrs: RestaurentOrderTrackerAttrs) => {
    return new RestaurentOrderTracker(attrs);
};

const RestaurentOrderTracker = model<RestaurentOrderTrackerDoc, RestaurentOrderTrackerModel>("RestaurentOrderTrackerDoc", restaurentOrderTrackerSchema);

export { RestaurentOrderTracker, RestaurentOrderTrackerDoc };
