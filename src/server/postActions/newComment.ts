"use server";

import { randomUUID } from "crypto";
import { connectDB } from "../mongoose/init";
import PostModel, {
  PostDocument,
  SingleCommentProps
} from "../mongoose/schemas/postSchema";
import getUser from "../userActions/getUser";

export default async function newComment(
  _id: string,
  comment: string
): Promise<SingleCommentProps[] | null | "duplicate"> {
  try {
    await connectDB();
    const user = await getUser();
    if (!user) return null;
    const { _id: uid } = user;
    const commentData: SingleCommentProps = {
      _id: randomUUID(),
      body: comment,
      createdAt: new Date().toString(),
      author: uid!
    };
    const postDoc = await PostModel.findById(_id);
    if (postDoc) {
      const postData = postDoc as PostDocument;
      const exists = postData.impressions.comments.filter(
        item => item.body == commentData.body
      );
      if (exists.length >= 1) return "duplicate";

      postData.impressions.comments.unshift(commentData);

      const newDoc = await PostModel.findByIdAndUpdate(
        _id,
        { impressions: postData.impressions },
        { new: true }
      );
      if (newDoc) {
        return postData.impressions.comments;
      } else return null;
    } else return null;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function deleteComment(
  _id: string,
  comment: SingleCommentProps
): Promise<SingleCommentProps[] | null> {
  try {
    await connectDB();
    const user = await getUser();
    if (!user) return null;
    const postDoc = await PostModel.findById(_id);
    if (postDoc) {
      const postData = postDoc as PostDocument;
      const filtered = postData.impressions.comments.filter(
        item => item._id != comment._id
      );
      postData.impressions.comments = filtered;
      const newDoc = await PostModel.findByIdAndUpdate(
        _id,
        { impressions: postData.impressions },
        { new: true }
      );
      if (newDoc) {
        return postData.impressions.comments;
      } else return null;
    } else return null;
  } catch (e) {
    console.log(e);
    return null;
  }
}
