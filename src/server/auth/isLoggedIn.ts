"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectDB } from "../mongoose/init";
import UserModel from "../mongoose/schemas/userSchema";

/**
 * Checks if a user is logged in.
 *
 * @return {Promise<boolean>} - A promise that resolves to a boolean indicating if the user is logged in or not.
 */
export default async function isLoggedIn(): Promise<boolean> {
  const cookiesStore = cookies();
  const token = cookiesStore.get("_uid");
  const secret = process.env.JWT_SECRET || "";

  if (!token) {
    return false;
  }

  try {
    const decoded: any = await jwt.verify(token.value, secret);
    const uid = decoded?._uid;

    console.log("Original value:", uid);

    await connectDB();
    const userData = await UserModel.findById(uid);

    return !!userData;
  } catch (error) {
    console.error("Failed to verify the token:", error);
    return false;
  }
}


export async function getUserSessionId() : Promise<string|null> {
  const cookiesStore = cookies();
  const token = cookiesStore.get("_uid");
  const secret = process.env.JWT_SECRET || "";

  if (!token) {
    return null;
  }

  try {
    const decoded: any = await jwt.verify(token.value, secret);
    const uid = decoded?._uid;
    return uid.toString();
  }catch(e){
    return null
  }
}