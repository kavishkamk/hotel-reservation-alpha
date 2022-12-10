/*
    this is a user model
        build => User.build method used to create user
*/

import { Schema, model, Model, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

import { PasswordHandle } from "../services/PasswordHandle";

// an interface that describe the properties
// that are required to create user
interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    address: string;
    profileURL?: string;
    password: string;
    activeStatus: Boolean;
    nicNumber: string;
    isAdmin?: Boolean;
};

// an interface that describe the properties
// that UserModel has
interface UserModel extends Model<UserDoc> {
    build(attrs: IUser): UserDoc;
};

// an interface that describe the properties
// that are user document has
interface UserDoc extends Document {
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    address: string;
    profileURL?: string;
    password: string;
    activeStatus: Boolean;
    otpCode?: Number;
    nicNumber: string;
    isAdmin: Boolean;
};

const userSchema = new Schema<UserDoc, UserModel>({
    firstName: { type: String, required: [true, "First Name required"] },
    lastName: { type: String, required: [true, "Last Name required"] },
    email: { type: String, required: [true, "Email required"], unique: true },
    contactNumber: { type: String, required: [true, "Contact number required"] },
    address: { type: String, required: [true, "Address required"] },
    profileURL: { type: String },
    password: { type: String, required: [true, "Password required"] },
    activeStatus: { type: Boolean, required: [true, "Account activation should be set"], default: false },
    otpCode: { type: Number },
    nicNumber: { type: String, required: [true, "NIC required"] },
    isAdmin: { type: Boolean, default: false }
});

// set email as unique
userSchema.plugin(uniqueValidator);

// pre middleware for password hashing
userSchema.pre("save", async function (done) {
    if (this.isModified("password")) {
        const hashedPassword = await PasswordHandle.toHash(this.get("password"));
        this.set("password", hashedPassword);
    };
    done();
});

// create a user
userSchema.statics.build = (attrs: IUser): IUser => {
    return new User(attrs);
};

const User = model<UserDoc, UserModel>("User", userSchema);

export { User };