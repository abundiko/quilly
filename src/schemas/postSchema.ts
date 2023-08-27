import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .max(30, "Post title must be 10-30 letters")
    .min(10, "Post title must be 10-30 letters"),
  subtitle: z
    .string()
    .max(120, "subtitle must be 50-120 letters")
    .min(50, "subtitle must be 50-120 letters")
});
