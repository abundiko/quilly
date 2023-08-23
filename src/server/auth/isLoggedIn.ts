"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectDB } from "../mongoose/init";
import UserModel from "../mongoose/schemas/userSchema";

export default async function isLoggedIn(): Promise<boolean> {
  const cookiesStore = cookies();
  const token = cookiesStore.get("_uid");
  const secret = process.env.JWT_SECRET || "";
  if (!token) return false;
  await jwt.verify(token.value, secret, async (error, decoded) => {
    if (error) {
      console.error("Failed to verify the token:", error);
      return false;
    } else {
      const uid = (decoded as any)?._uid;
      console.log("Original value:", uid);
      await connectDB();
      const userData = await UserModel.findById(uid);
      if (userData) return true;
      cookies().delete("_uid");
      return false;
    }
  });
  return true;
}
