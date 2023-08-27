"use server";

import { CreatePostProps } from "@/app/(user)/create/layout";
import { FormMessage } from "@/types/formTypes";
import { connectDB } from "../mongoose/init";
import PostModel, { PostDocument } from "../mongoose/schemas/postSchema";

export default async function newPost(
  formData: CreatePostProps
): Promise<FormMessage> {
  for (let i = 0; i < 3; i++) {
    try {
      await connectDB();

      const postDoc = new PostModel({
        title: formData.title!,
        subtitle: formData.subtitle!,
        body: formData.body!,
        img: formData.img!,
        tags: formData.tags!,
        author: formData.author!,
        impressions: {
          likes: [],
          comments: [],
          views: []
        }
      });
      const newPost: PostDocument = await postDoc.save();
      if (newPost) return ["success", "Post Created"];
      return ["error", "failed to create post"];
    } catch (e) {
      if (i == 2) return ["error", "connection failed"];
    }
  }
  return ["error", "an error occurred"];
}
