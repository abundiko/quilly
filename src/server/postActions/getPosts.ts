"use server";

// a function that
// takes uid:id of a user
// queries the post collection in mongoose and returns all document containing that user id as the value of author key
// return the documents as a list of PostDocuments
// returns an empty array if error or null

import PostModel, { PostDocument } from "../mongoose/schemas/postSchema";

export default async function getUserPosts(
  uid: string
): Promise<PostDocument[] | null> {
  try {
    const posts = await PostModel.find({ author: uid });
    if (posts) {
      return posts.map(item => {
        return { ...item.toObject(), _id: item._id.toString() } as PostDocument;
      });
    }
    return null;
  } catch (e) {
    return null;
  }
}

export async function getPostData(
  title: string
): Promise<PostDocument | null | "error"> {
  try {
    const post = await PostModel.findOne({ title });
    if (post) {
      return { ...post.toObject(), _id: post._id.toString() } as PostDocument;
    } else return null;
  } catch (e) {
    return "error";
  }
}
