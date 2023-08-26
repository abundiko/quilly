"use server";

import { EditProfileData } from "@/app/(user)/user/edit/profile/page";
import { FormMessage } from "@/types/formTypes";
import { connectDB } from "../mongoose/init";
import UserModel, { UserDocument } from "../mongoose/schemas/userSchema";
import { getUserSessionId } from "../auth/isLoggedIn";
import usernameIsTaken from "../auth/usernameIsTaken";

export default async function updateProfileData(
  userData: EditProfileData
): Promise<FormMessage> {
  await connectDB();

  for (let tries = 0; tries < 3; tries++) {
    try {
      const _id = await getUserSessionId();
      if (!_id) {
        return ["error", "No Login user"];
      } else if (await usernameIsTaken(userData.username))
        return [
          "error",
          `"${userData.username}" is taken. try another username`
        ];

      const userDoc = await UserModel.findByIdAndUpdate(
        _id,
        { ...userData },
        { new: true }
      );
      if (userDoc) {
        return [
          "success",
          JSON.stringify(
            {
              ...userDoc.toObject(),
              _id: userDoc._id.toString()
            } as UserDocument
          )
        ];
      }
    } catch (e) {
      if (tries === 2) {
        return ["error", "Network timeout"];
      }
    }
  }

  return ["error", "An error occurred"];
}
