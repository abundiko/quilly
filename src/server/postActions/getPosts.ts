"use server";

import PostModel, { PostDocument } from "../mongoose/schemas/postSchema";

export async function getPosts(): Promise<PostDocument[] | null> {
  try {
    const posts = await PostModel.find()
      .sort({ createdAt: -1 }) // Sort in descending order based on the 'createdAt' field
      .limit(10);

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

export async function searchPosts(
  keywords: string,
  {
    filter = [],
    limit = 20,
    skip = 0
  }: {
    filter?: string[];
    limit?: number;
    skip?: number;
  }
) {
  try {
    const keywordRegex = new RegExp(keywords, "i"); // Case-insensitive regex for keyword matching

    const query = {
      $or: [
        { title: { $regex: keywordRegex } },
        { subtitle: { $regex: keywordRegex } },
        { tags: { $elemMatch: { $regex: keywordRegex } } }
      ]
    };

    if (filter.length > 0) {
      if ((query as any).tags) (query as any).tags = { $in: filter };
    }

    const posts = await PostModel.find(query)
      .sort({ createdAt: -1 }) // Sort in descending order based on the 'createdAt' field
      .limit(limit)
      .skip(skip);

    if (posts) {
      return posts.map(item => {
        return { ...item.toObject(), _id: item._id.toString() } as PostDocument;
      });
    } else return [];
    // Process the matching documents here
  } catch (err) {
    return null;
  }
}

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
