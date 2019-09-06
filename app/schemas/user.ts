import { Document, Schema, Model, model } from "mongoose";
import { IUser } from "../interfaces/user";
import mongooseUniqueValidator = require("mongoose-unique-validator");


export interface IUserModel extends IUser, Document {
    fullName(): string;
}

export var UserSchema: Schema = new Schema({
    email: String,
    password: String,
});

// UserSchema.pre("save", function (next) {
//     let now = new Date();
//     if (!this.createdAt) {
//         this.createdAt = now;
//     }
//     next();
// });

UserSchema.plugin(mongooseUniqueValidator)

UserSchema.methods.fullName = function (): string {
    return (this.firstName.trim() + " " + this.lastName.trim());
};

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);
