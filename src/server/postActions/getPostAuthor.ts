"use server";

import { connectDB } from "../mongoose/init";
import UserModel, { UserDocument } from "../mongoose/schemas/userSchema";

export type PostAuthor = { img: string; username: string };

export default async function getPostAuthor(
  _id: string
): Promise<PostAuthor | null> {
  try {
    await connectDB();
    const userDoc = await UserModel.findById(_id);
    if (userDoc) {
      const { username, img } = userDoc as UserDocument;
      return { username, img };
    } else return null;
  } catch (e) {
    return null;
  }
}
