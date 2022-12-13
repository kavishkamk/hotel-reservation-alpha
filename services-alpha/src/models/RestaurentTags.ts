import { Document, model, Model, Schema } from "mongoose";

// this is interface that describe the properties
// want to create a Tag
interface RestaurentTagAttrs {
    tagName: string;
};

// this is interface that describe the properties
// Tag document has
interface RestaurentTagDoc extends Document {
    tagName: string;
    version: number;
};

// this is interface that descrive the properties
// Tag model has
interface RestaurentTagModel extends Model<RestaurentTagDoc> {
    build: (attrs: RestaurentTagAttrs) => RestaurentTagDoc;
};

// create tag schema
const restaurentTagSchema = new Schema({
    tagName: {
        type: String,
        required: [true, "tag name required"]
    }
}, {
    toJSON: {
        getters: true,
        transform(doc, ret, options) {
            delete ret._id
        },
    }
});

// change version key name
restaurentTagSchema.set("versionKey", "version");

// ticket build method
restaurentTagSchema.statics.build = (attrs: RestaurentTagAttrs) => {
    return new RestaurentTag(attrs);
};

// create ticket model
const RestaurentTag = model<RestaurentTagDoc, RestaurentTagModel>("Restaurenttag", restaurentTagSchema);

export { RestaurentTag, RestaurentTagDoc };