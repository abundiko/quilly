"use server";

import bcrypt from "bcrypt";
import { LoginData } from "@/app/(auth)/login/form";
import { connectDB } from "../mongoose/init";
import UserModel, { UserDocument } from "../mongoose/schemas/userSchema";
import { FormMessage } from "@/types/formTypes";
import setUserCookie from "../setUserCookie";

export default async function login(userData: LoginData): Promise<FormMessage> {
  await connectDB();
  let tries = 0;
  while (tries < 3) {
    try {
      const userExists: UserDocument | null = await UserModel.findOne({
        email: userData.email
      });
      if (userExists) {
        const hashedPassword = userExists.password;
        if (await bcrypt.compare(userData.password, hashedPassword)) {
          setUserCookie(userExists._id!.toString());
          return ["success", "/home"];
        }
        return ["error", "Incorrect login details"];
      }
      return ["error", "Incorrect login details"];
    } catch (e) {
      tries += 1;
      if (tries == 3) return ["error", "Login failed"];
    }
  }
  return ["error", "Incorrect login details"];
}
