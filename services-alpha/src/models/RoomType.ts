import { Document, Model, Schema, model } from "mongoose";

import { TagDoc } from "./Tag";

// interfact that describe the attributes
// required to create room type
interface RoomTypeAttrs {
    name: string;
    numberOfRooms: number;
    description: string;
    imageURL: string;
    price: number;
    start: number;
    amenities: string[];
    tags: TagDoc[]
};

// interface that describe properties
// Room Type document has
interface RoomTypeDoc extends Document {
    name: string;
    numberOfRooms: number;
    description: string;
    imageURL: string;
    price: number;
    start: number;
    amenities: string[];
    tags: TagDoc[],
    version: number
};

// interface that describe properties
// Room Model has
interface RoomTypeModel extends Model<RoomTypeDoc> {
    build: (attrs: RoomTypeAttrs) => RoomTypeDoc;
};

// create schema
const roomTypeSchema = new Schema({
    name: { type: String, required: [true, "name Required"] },
    numberOfRooms: {
        type: Number,
        required: [true, "numberOfRooms Required"],
        min: [0, "number of rooms should be > 0"]
    },
    description: {
        type: String,
        required: [true, "description reqiured"]
    },
    imageURI: {
        type: String,
        required: [true, "image url required"]
    },
    price: {
        type: Number,
        required: [true, "price requried"],
        min: [0, "price should be > 0"]
    },
    start: {
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
            type: Schema.Types.ObjectId,
            ref: "Tag",
            required: [true, "tag required"]
        }
    ]
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