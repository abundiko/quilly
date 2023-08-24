"use server"

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "../mongoose/init";
import UserModel, { UserDocument } from "../mongoose/schemas/userSchema";

export default async function getUser(
  _id: string|null = null
): Promise<UserDocument | string> {
  await connectDB();
  if(!_id){
     const cookiesStore = cookies();
  const token = cookiesStore.get("_uid");
  const secret = process.env.JWT_SECRET || "";
  if (!token) return "here 1";
  jwt.verify(token.value, secret, async (error, decoded) => {
    if (error) {
      console.error("Failed to verify the token:", error);
      return "here 2";
    } else {
      const uid = (decoded as any)?._uid;
      const userData:UserDocument|null = await UserModel.findById(uid);
      console.log(userData);

      if (userData){
        return userData;
      } else
      return "here 3";
    }

  });
  return "here 3.5"
  }else{
  const userDoc: UserDocument | null = await UserModel.findById(_id);
  return userDoc != null ? userDoc : "here 4";
  }
}
