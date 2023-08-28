"use server";

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
      body: comment,
      createdAt: new Date().toString(),
      author: uid!
    };
    const postDoc = await PostModel.findById(_id);
    if (postDoc) {
      const postData = postDoc as PostDocument;
      if (postData.impressions.comments.includes(commentData))
        return "duplicate";

      postData.impressions.comments.push(commentData);

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
