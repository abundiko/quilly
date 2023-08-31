"use server";

import UserModel, { UserDocument } from "../mongoose/schemas/userSchema";

export default async function getUsers(): Promise<UserDocument[] | null> {
  try {
    const users = await UserModel.find();

    if (users) {
      return users.map(item => {
        return { ...item.toObject(), _id: item._id.toString() } as UserDocument;
      });
    }
    return null;
  } catch (e) {
    return null;
  }
}
