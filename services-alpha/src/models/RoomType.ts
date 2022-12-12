import { Document, Model, Schema, model, Types } from "mongoose";

import { TagDoc } from "./RoomTypeTag";

// interfact that describe the attributes
// required to create room type
interface RoomTypeAttrs {
    roomType: string;
    numberOfRooms: number;
    description: string;
    imageURL: string;
    price: number;
    stars: number;
    amenities: string[];
    tags: TagDoc[];
    maxGuest: number;
};

// interface that describe properties
// Room Type document has
interface RoomTypeDoc extends Document {
    roomType: string;
    numberOfRooms: number;
    description: string;
    imageURL: string;
    price: number;
    stars: number;
    amenities: string[];
    tags: TagDoc[];
    version: number;
    maxGuest: number;
};

// interface that describe properties
// Room Model has
interface RoomTypeModel extends Model<RoomTypeDoc> {
    build: (attrs: RoomTypeAttrs) => RoomTypeDoc;
};

// create schema
const roomTypeSchema = new Schema({
    roomType: { type: String, required: [true, "name Required"] },
    numberOfRooms: {
        type: Number,
        required: [true, "numberOfRooms Required"],
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
    price: {
        type: Number,
        required: [true, "price requried"],
        min: [0, "price should be > 0"]
    },
    stars: {
        type: Number,
        required: [true, "number of start required"],
        min: [0, "number of stars > 0"]
    },
    amenities: [
        {
            type: String,
            required: [true, "amenities required"]
        }
    ],
    tags: [
        {
            type: Types.ObjectId,
            ref: "Tag",
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
roomTypeSchema.set("versionKey", "version");

// build room type
roomTypeSchema.statics.build = (roomAttrs: RoomTypeAttrs) => {
    return new RoomType(roomAttrs);
};

const RoomType = model<RoomTypeDoc, RoomTypeModel>("RoomType", roomTypeSchema);

export { RoomType };