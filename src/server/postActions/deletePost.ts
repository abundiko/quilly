"use server";
import { connectDB } from "../mongoose/init";
import PostModel from "../mongoose/schemas/postSchema";
import { UserDocument } from "../mongoose/schemas/userSchema";
import getUser from "../userActions/getUser";

export default async function deletePost(img: string): Promise<boolean> {
  "use server";

  for (let i = 0; i < 3; i++) {
    try {
      const { _id: author } = (await getUser()) as UserDocument;
      if (!author) throw new Error("");
      await connectDB();

      const postDoc = await PostModel.findOneAndDelete({ author, img: img });

      if (postDoc) return true;
      return false;
    } catch (e) {
      if (i == 2) return false;
    }
  }
  return false;
}
