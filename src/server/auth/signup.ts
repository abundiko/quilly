"use server";

import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import bcrypt from "bcrypt";

import { cookies } from "next/headers";
import { FormMessage } from "@/types/formTypes";
import { SignupData } from "@/app/(auth)/signup/page";
import { connectDB } from "../mongoose/init";
import UserModel, { UserDocument } from "../mongoose/schemas/userSchema";
import emailExists from "./emailExists";
import usernameIsTaken from "./usernameIsTaken";
import { MAX_COOKIE_AGE } from "@/utils/constants";

export async function submitSignup(formData: SignupData): Promise<FormMessage> {
  "use server";
  let tries = 0;
  while (tries < 3) {
    try {
      if (await emailExists(formData.email))
        return ["error", "email already registered"];
      else if (await usernameIsTaken(formData.username))
        return [
          "error",
          `"${formData.username}" is taken. try another username`
        ];
      else {
        return ["success", "/signup/interests"];
      }
    } catch (e) {
      tries += 1;
      if (tries == 2) return ["error", "an error occurred. Try again"];
    }
  }
  return ["error", "an error occurred. Try again"];
}

export async function submitSignupInterests(
  formData: SignupData & { interests: string[] }
): Promise<FormMessage> {
  "use server";
  let tries = 0;
  while (tries < 3) {
    try {
      await connectDB();
      //encrypt the password
      const hashedPassword = await bcrypt.hash(formData.password, 10);

      const userDoc = new UserModel({
        ...formData,
        password: hashedPassword,
        favourites: []
      });
      const newUser: UserDocument = await userDoc.save();

      if (newUser) {
        const secret = process.env.JWT_SECRET || "";
        console.log(newUser._id!.toString(), newUser.toString());

        const token = sign({ _uid: newUser._id!.toString() }, secret, {
          expiresIn: MAX_COOKIE_AGE
        });
        await cookies().set("_uid", token, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: MAX_COOKIE_AGE
        });
        return ["success", "account created"];
      } else return ["error", "unable to create account"];
    } catch (e) {
      console.log("Err:", e);

      tries += 1;
      if (tries == 3) return ["error", "an error occurred, try again"];
    }
  }

  return ["error", "an error occurred, try again"];
}
