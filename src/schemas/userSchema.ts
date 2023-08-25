import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string()
});

export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password should have at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]+$/,
      "Include uppercase, number, and character"
    ),
  full_name: z
    .string()
    .min(3, "full name too short")
    .max(25, "full name too long"),
  username: z
    .string()
    .min(3, "user name too short")
    .max(20, "user name too long")
    .regex(/^[A-Za-z0-9_]+$/, "invalid username, use A-Z, 0-9 or _")
});

export const editProfileSchema = z.object({
  bio: z.string(),
  full_name: z
    .string()
    .min(3, "full name too short")
    .max(25, "full name too long"),
  username: z
    .string()
    .min(3, "user name too short")
    .max(20, "user name too long")
    .regex(/^[A-Za-z0-9_]+$/, "invalid username, use A-Z, 0-9 or _")
});

export const editPasswordSchema = z.object({
  current_password: z.string(),
  new_password: z
    .string()
    .min(8, "Password should have at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]+$/,
      "Include uppercase, number, and character"
    ),
  confirm_password: z.string()
});
