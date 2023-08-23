import { cookies } from "next/headers";

export default async function isLoggedIn(): Promise<boolean> {
  const cookiesStore = cookies();
  const token = cookiesStore.get("_uid");
  if (token) return true;
  else return false;
}
