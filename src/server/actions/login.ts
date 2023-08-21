"use server";

import { LoginData } from "@/app/login/form";
import { FormMessage } from "@/types/formTypes";
import { connectDB } from "../mongoose/init";
import login from "../mongoose/login";

export async function submitLogin(formData: LoginData): Promise<FormMessage> {
  "use server";
  console.log("form data:", formData);
  await Promise.resolve(setTimeout(() => {}, 3000));
  await connectDB();
  await login(formData);
  return ["success", formData.toString()];
}
