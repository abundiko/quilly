"use server";

import { connectDB } from "../mongoose/init";
import PostModel, { PostDocument } from "../mongoose/schemas/postSchema";

export async function likePost(
  _id: string,
  uid: string,
  like: boolean = true
): Promise<string[] | null> {
  try {
    await connectDB();
    const postDoc = await PostModel.findById(_id);
    if (postDoc) {
      const postData = postDoc as PostDocument;
      if (like) {
        if (!postData.impressions.likes.includes(uid))
          postData.impressions.likes.push(uid);
      } else {
        const index = postData.impressions.likes.indexOf(uid);
        postData.impressions.likes.splice(index, 1);
      }
      const newDoc = await PostModel.findByIdAndUpdate(
        _id,
        { impressions: postData.impressions },
        { new: true }
      );
      if (newDoc) return postData.impressions.likes;
    }
    return null;
  } catch (e) {
    return null;
  }
}
