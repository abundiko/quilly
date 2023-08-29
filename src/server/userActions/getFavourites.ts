"use server";

import UserModel from "../mongoose/schemas/userSchema";

export async function countUsersWithFavourite(
  _id: string
): Promise<number | null> {
  try {
    const query = { favourites: { $in: [_id] } };

    const count = await UserModel.countDocuments(query);

    return count;
  } catch (err) {
    console.error(err);
    return null;
  }
}
