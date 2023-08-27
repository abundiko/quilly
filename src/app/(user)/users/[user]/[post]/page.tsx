"use client";

import { AnimatedPageOpacity } from "@/components/AnimatedPage";
import PostReader, { PostReaderProps } from "@/components/home/PostReader";
import { PostDocument } from "@/server/mongoose/schemas/postSchema";
import { getPostData } from "@/server/postActions/getPosts";
import { formatUrlAsPostTitle } from "@/utils/formatUrl";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PostPage = () => {
  const [postData, setPostData] = useState<PostDocument | null>(null);
  const { post } = useParams();
  const postTitle = formatUrlAsPostTitle(post as string);
  const router = useRouter();

  useEffect(
    () => {
      (async () => {
        let fetched = false;
        while (!fetched) {
          try {
            const postDoc = await getPostData(postTitle);

            if (postDoc) {
              if (postDoc == "error") continue;
              fetched = true;
              setPostData(postDoc);
            } else router.back();
          } catch (e) {
            continue;
          }
        }
      })();
    },
    [postTitle, router]
  );

  return (
    <AnimatedPageOpacity>
      <div className="flex">
        <div className="w-full md:w-10/12 relative">
          {postData && <PostReader {...postData as PostReaderProps} />}
        </div>
        <div className="hidden md:block w-2/12 app-borders border-l p-3" />
      </div>
    </AnimatedPageOpacity>
  );
};

export default PostPage;
