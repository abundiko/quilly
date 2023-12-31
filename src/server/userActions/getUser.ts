"use server"

import { connectDB } from "../mongoose/init";
import UserModel, { UserDocument } from "../mongoose/schemas/userSchema";
import { getUserSessionId } from "../auth/isLoggedIn";

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
    try {
      const uid = await getUserSessionId();
      if(!uid) return null;
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
    const userDoc = await UserModel.findById(_id);
    return ({
              ...userDoc.toObject(),
              _id: userDoc._id.toString()
            } as UserDocument) ?? null;
  }
}

export async function getUserByUsername(
  username: string
): Promise<UserDocument | null> {
  for (let i = 0; i < 3; i++) {
    try {
      await connectDB();
    const userDoc = await UserModel.findOne({username});
    return ({
              ...userDoc.toObject(),
              _id: userDoc._id.toString()
            } as UserDocument) ?? null
    } catch (e) {
      if(i == 2) return null;
    }
  }
  return null;
}
