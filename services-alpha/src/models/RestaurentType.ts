import { Document, Model, Schema, model, Types } from "mongoose";

import { RestaurentTagDoc } from "./RestaurentTags";

// interfact that describe the attributes
// required to create Restaurent type
interface RestaurentTypeAttrs {
    restaurentType: string;
    numberOfTables: number;
    description: string;
    imageURL: string;
    stars: number;
    tags: RestaurentTagDoc[];
    maxGuest: number;
};

// interface that describe properties
// Restaurent Type document has
interface RestaurentTypeDoc extends Document {
    restaurentType: string;
    numberOfTables: number;
    description: string;
    imageURL: string;
    stars: number;
    tags: RestaurentTagDoc[];
    version: number;
    maxGuest: number;
};

// interface that describe properties
// Restaurent Model has
interface RestaurentTypeModel extends Model<RestaurentTypeDoc> {
    build: (attrs: RestaurentTypeAttrs) => RestaurentTypeDoc;
};

// create schema
const restaurentTypeSchema = new Schema({
    restaurentType: { type: String, required: [true, "name Required"] },
    numberOfTables: {
        type: Number,
        required: [true, "numberOfTables Required"],
        min: [0, "number of rooms should be > 0"]
    },
    description: {
        type: String,
        required: [true, "description reqiured"]
    },
    imageURL: {
        type: String,
        required: [true, "image url required"]
    },
    stars: {
        type: Number,
        required: [true, "number of start required"],
        min: [0, "number of stars > 0"]
    },
    tags: [
        {
            type: Types.ObjectId,
            ref: "Restaurenttag",
            required: [true, "tag required"]
        }
    ],
    maxGuest: {
        type: Number,
        required: [true, "max Guest required"],
        min: [0, "Number of max guest should be grater than 0"]
    }
}, {
    toJSON: {
        getters: true,
        transform(doc, ret, options) {
            delete ret._id
        },
    }
});

// change version name
restaurentTypeSchema.set("versionKey", "version");

// build Restaurent type
restaurentTypeSchema.statics.build = (restaurentAttrs: RestaurentTypeAttrs) => {
    return new RestaurentType(restaurentAttrs);
};

const RestaurentType = model<RestaurentTypeDoc, RestaurentTypeModel>("RestaurentType", restaurentTypeSchema);

export { RestaurentType };