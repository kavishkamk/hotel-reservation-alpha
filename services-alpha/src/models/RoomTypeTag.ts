import { Document, model, Model, Schema } from "mongoose";

// this is interface that describe the properties
// want to create a Tag
interface TagAttrs {
    tagName: string;
};

// this is interface that describe the properties
// Tag document has
interface TagDoc extends Document {
    tagName: string;
    version: number;
};

// this is interface that descrive the properties
// Tag model has
interface TagModel extends Model<TagDoc> {
    build: (attrs: TagAttrs) => TagDoc;
};

// create tag schema
const tagSchema = new Schema({
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
tagSchema.set("versionKey", "version");

// // manage version number
// tagSchema.pre("save", function (done) {
//     this.$where = {
//         version: this.get("version") - 1
//     };
//     done();
// });

// ticket build method
tagSchema.statics.build = (attrs: TagAttrs) => {
    return new Tag(attrs);
};

// create ticket model
const Tag = model<TagDoc, TagModel>("Tag", tagSchema);

export { Tag, TagDoc };