"use server";

import { connectDB } from "../mongoose/init";
import PostModel, { PostDocument } from "../mongoose/schemas/postSchema";
import UserModel, { UserDocument } from "../mongoose/schemas/userSchema";

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

export async function viewPost(
  _id: string,
  uid: string
): Promise<string[] | null> {
  try {
    await connectDB();
    const postDoc = await PostModel.findById(_id);
    if (postDoc) {
      const postData = postDoc as PostDocument;
      if (!postData.impressions.views.includes(uid))
        postData.impressions.views.push(uid);
      //
      const postAuthor = UserModel.findById(postData.author);
      if (postAuthor) {
        const oldReaders = ((postAuthor as unknown) as UserDocument)
          .monthly_readers;
        const monthly_readers = (oldReaders ?? 0) + 1;
        const res = UserModel.findByIdAndUpdate(
          postData.author,
          {
            monthly_readers
          },
          { new: true }
        );
        console.log(res);
      }

      //
      const newDoc = await PostModel.findByIdAndUpdate(
        _id,
        { impressions: postData.impressions },
        { new: true }
      );
      if (newDoc) {
        return postData.impressions.views;
      } else return null;
    } else return null;
  } catch (e) {
    console.log(e);
    return null;
  }
}
