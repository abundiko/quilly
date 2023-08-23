"use server";

import { cookies } from "next/headers";

export default async function logout(): Promise<boolean> {
  cookies().delete("_uid");
  return true;
}
