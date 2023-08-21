"use server";

import { LoginData } from "@/app/login/form";
import { FormMessage } from "@/types/formTypes";

export async function test() {
  "use server";
  console.log("hello");
}

export async function submitLogin(formData: LoginData): Promise<FormMessage> {
  "use server";
  console.log("form data:", formData);
  await Promise.resolve(setTimeout(() => {}, 3000));

  return ["success", formData.toString()];
}
