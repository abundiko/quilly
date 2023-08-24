"use server";

import { EditProfileData } from "@/app/(user)/user/edit/profile/page";
import { FormMessage } from "@/types/formTypes";
import { connectDB } from "../mongoose/init";
import UserModel, { UserDocument } from "../mongoose/schemas/userSchema";
import { getUserSessionId } from "./isLoggedIn";

export default async function updateProfileData(
  userData: EditProfileData
): Promise<FormMessage> {
  await connectDB();

  for (let tries = 0; tries < 3; tries++) {
    try {
      const _id = await getUserSessionId();
      if (!_id) {
        return ["error", "No Login user"];
      }

      const userDoc: UserDocument | null = await UserModel.findByIdAndUpdate(
        _id,
        { ...userData },
        { new: true }
      );
      if (userDoc) {
        return ["success", JSON.stringify(userDoc)];
      }
    } catch (e) {
      if (tries === 2) {
        return ["error", "Network timeout"];
      }
    }
  }

  return ["error", "An error occurred"];
}
