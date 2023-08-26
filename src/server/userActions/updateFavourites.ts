"use server";

import { connectDB } from "../mongoose/init";
import { getUserSessionId } from "../auth/isLoggedIn";
import UserModel, { UserDocument } from "../mongoose/schemas/userSchema";

export default async function updateFavourites(
  uid: string,
  add: boolean = true
): Promise<boolean> {
  await connectDB();

  for (let tries = 0; tries < 3; tries++) {
    try {
      const _id = await getUserSessionId();
      if (!_id) {
        return false;
      }

      const oldDoc = await UserModel.findById(_id);
      if (oldDoc) {
        const oldFavourites: string[] = (oldDoc as UserDocument).favourites;
        if (add) {
          if (!oldFavourites.includes(uid)) oldFavourites.push(uid);
        } else {
          if (oldFavourites.includes(uid))
            oldFavourites.splice(oldFavourites.indexOf(uid), 1);
        }
        const userDoc = await UserModel.findByIdAndUpdate(
          _id,
          { favourites: oldFavourites },
          { new: true }
        );
        if (userDoc) {
          return true;
        }
      }
    } catch (e) {
      if (tries === 2) {
        return false;
      }
    }
  }

  return false;
}
