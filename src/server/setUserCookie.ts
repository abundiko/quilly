import { sign } from "jsonwebtoken";
import { MAX_COOKIE_AGE } from "@/utils/constants";
import { cookies } from "next/headers";
export default function setUserCookie(value: string) {
  const secret = process.env.JWT_SECRET || "";
  const token = sign({ _uid: value }, secret, {
    expiresIn: MAX_COOKIE_AGE
  });
  cookies().set("_uid", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: MAX_COOKIE_AGE
  });
}
