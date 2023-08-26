"use server";

import { FormMessage } from "@/types/formTypes";
import { connectDB } from "../mongoose/init";
import bcrypt from "bcrypt";
import UserModel, { UserDocument } from "../mongoose/schemas/userSchema";
import { getUserSessionId } from "../auth/isLoggedIn";
import { EditPasswordData } from "@/app/(user)/user/edit/password/page";

export default async function changePassword(
  formData: EditPasswordData
): Promise<FormMessage> {
  await connectDB();

  for (let tries = 0; tries < 3; tries++) {
    try {
      const _id = await getUserSessionId();
      if (!_id) {
        return ["error", "No Login user"];
      } else if (formData.new_password !== formData.confirm_password)
        return ["error", `New and Confirm Passwords don't match`];
      else {
        let userDoc = await UserModel.findById(_id);
        if (userDoc) {
          const dbHashedPassword = userDoc.password;
          if (await bcrypt.compare(formData.password, dbHashedPassword)) {
            const newHashedPassword = await bcrypt.hash(
              formData.new_password,
              10
            );
            userDoc = await UserModel.findByIdAndUpdate(_id, {
              password: newHashedPassword
            });
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
            } else return ["error", "Unable to change password"];
          } else return ["error", "Current Password is incorrect"];
        } else return ["error", "Invalid User"];
      }
    } catch (e) {
      if (tries === 2) {
        return ["error", "Network timeout"];
      }
    }
  }

  return ["error", "An error occurred"];
}
