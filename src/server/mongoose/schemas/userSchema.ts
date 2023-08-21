import mongoose, { Schema, model, Document } from "mongoose";

export type UserDocument = Document & {
  full_name: string;
  createdAt: Date;
  username: string;
  email: string;
  password: string;
};

let UserModel = mongoose.Model<UserDocument>;

if (mongoose.models.User) {
  UserModel = mongoose.models.User;
} else {
  const userSchema = new mongoose.Schema({ full_name: { type: String, required: true, maxlength: 50 }, createdAt: { type: Date, default: Date.now }, username: { type: String, required: true }, email: { type: String, required: true }, password: { type: String, required: true } }, { collection: "users" });
  UserModel = mongoose.connection.useDb('quilly').model("User", userSchema, "users");
}

export default UserModel;
