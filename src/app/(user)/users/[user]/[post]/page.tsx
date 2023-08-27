"use client";

import { AnimatedPageOpacity } from "@/components/AnimatedPage";
import PostReader, { PostReaderProps } from "@/components/home/PostReader";
import { PostDocument } from "@/server/mongoose/schemas/postSchema";
import { getPostData } from "@/server/postActions/getPosts";
import { formatUrlAsPostTitle } from "@/utils/formatUrl";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCommentAlt, FaEye, FaThumbsUp } from "react-icons/fa";

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
      let timeOut = setTimeout(async () => {}, 1000 * 10);
      return () => clearTimeout(timeOut);
    },
    [postTitle, router]
  );

  return (
    <AnimatedPageOpacity>
      <div className="flex sm:relative">
        {postData && <PostReader {...postData as PostReaderProps} />}

        <div className="w-full sm:w-fit justify-around sm:justify-center rounded-lg border app-theme app-borders app-shadows px-5 py-3 flex sm:gap-4 md:gap-6 fixed bottom-4 shadow-xl left-1/2 -translate-x-1/2">
          <div className="flex w-fit items-center gap-1 opacity-80">
            <FaEye />
            <span>12 views</span>
          </div>
          <button className="flex w-fit items-center gap-1 opacity-80">
            <FaThumbsUp />
            <span>12 likes</span>
          </button>
          <button className="flex w-fit items-center gap-1 opacity-80">
            <FaCommentAlt />
            <span>12 comments</span>
          </button>
        </div>
      </div>
    </AnimatedPageOpacity>
  );
};

export default PostPage;
