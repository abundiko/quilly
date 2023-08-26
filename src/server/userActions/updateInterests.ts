"use server";

import { FormMessage } from "@/types/formTypes";
import { connectDB } from "../mongoose/init";
import { getUserSessionId } from "../auth/isLoggedIn";
import UserModel, { UserDocument } from "../mongoose/schemas/userSchema";

export default async function updateInterests(
  interests: string[]
): Promise<FormMessage> {
  await connectDB();

  for (let tries = 0; tries < 3; tries++) {
    try {
      const _id = await getUserSessionId();
      if (!_id) {
        return ["error", "No Login user"];
      }

      const userDoc = await UserModel.findByIdAndUpdate(
        _id,
        { interests },
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
