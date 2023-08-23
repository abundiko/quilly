"use server";

import { connectDB } from "../mongoose/init";
import UserModel, { UserDocument } from "../mongoose/schemas/userSchema";

export default async function emailExists(email: string): Promise<boolean> {
  if (!await connectDB()) throw new Error("connection failed!");
  const user = (await UserModel.findOne({ email })) as UserDocument | null;
  return user ? true : false;
}
