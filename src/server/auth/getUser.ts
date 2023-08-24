"use server"

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "../mongoose/init";
import UserModel, { UserDocument } from "../mongoose/schemas/userSchema";

/**
 * Retrieves a user document from the database.
 *
 * @param {string | null} _id - The ID of the user document to retrieve. Defaults to null.
 * @return {Promise<UserDocument | null>} The retrieved user document, or null if not found.
 */
export default async function getUser(
  _id: string | null = null
): Promise<UserDocument | null> {
  await connectDB();
  if (!_id) {
    const token = cookies().get("_uid");
    const secret = process.env.JWT_SECRET || "";
    if (!token) return null;
    try {
      const decoded = jwt.verify(token.value, secret) as any;
      const uid = decoded?._uid;
      const userData = await UserModel.findById(uid);
      // console.log(userData);
      if (userData) {
        return {...userData.toObject(), _id:userData._id.toString()} as UserDocument;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Failed to verify the token:", error);
      return null;
    }
  } else {
    const userDoc: UserDocument | null = await UserModel.findById(_id);
    return userDoc ?? null;
  }
}
