import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .max(50, "Post title must be 3-50 letters")
    .min(3, "Post title must be 3-50 letters"),
  subtitle: z
    .string()
    .max(50, "subtitle must be 3-50 letters")
    .min(3, "subtitle must be 3-50 letters")
});
