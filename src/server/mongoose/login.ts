import { LoginData } from "@/app/login/form";
import UserModel, { UserDocument } from "./schemas/userSchema";
import mongoose, { Connection } from "mongoose";

export default async function login(userData: LoginData): Promise<boolean> {
  // const userExists: UserDocument | null = await UserModel.findOne({});

  // console.log(userExists);

  const newUser = await UserModel.create({
    full_name: "John Doe",
    createdAt: new Date(),
    username: "johndoe",
    email: "johndoe@example.com",
    password: "password123"
  });
  console.log(newUser);

  // const newUser: UserDocument = new UserModel(userData);
  // const result = await newUser.save();
  return true ? true : false;
}

// async function newUser(userData) {
//   mongoose.connection.useDb("co-win");
//   const userExists = await UserModel.findOne({ phone: userData.phone });
//   if (userExists && userExists._doc._id) {
//     const result = await userExists.updateOne({ ...userData });
//     return result ? true : false;
//   }
//   const newUser = new UserModel(userData);
//   const result = await newUser.save();
//   return result ? true : false;
// }
