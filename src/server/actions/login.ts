"use server";

import { LoginData } from "@/app/(auth)/login/form";
import { FormMessage } from "@/types/formTypes";
import { login } from "../mongoose/auth";

export async function submitLogin(formData: LoginData): Promise<FormMessage> {
  "use server";
  await login(formData);
  return ["success", formData.toString()];
}
