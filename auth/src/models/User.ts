/*
    this is a user model
        build => User.build method used to create user
*/

import { Schema, model, Model } from "mongoose";

// an interface that describe the properties
// that are required to create user
interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

// an interface that describe the properties
// that UserModel has
interface UserModel extends Model<UserDoc> {
    build(attrs: IUser): UserDoc;
};

// an interface that describe the properties
// that are user document has
interface UserDoc {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const userSchema = new Schema({
    firstName: { type: String, required: [true, "First Name required"] },
    lastName: { type: String, required: [true, "Last Name required"] },
    email: { type: String, required: [true, "Email required"] },
    password: { type: String, required: [true, "Password required"] }
});

// create a user
userSchema.statics.build = (attrs: IUser) => {
    return new User(attrs);
}

const User = model<UserDoc, UserModel>("User", userSchema);

export { User };