"use client";

import { AnimatedPageOpacity } from "@/components/AnimatedPage";
import Comments from "@/components/home/Comments";
import PostReader, { PostReaderProps } from "@/components/home/PostReader";
import UserContext from "@/context/UserContext";
import { Impression, PostDocument } from "@/server/mongoose/schemas/postSchema";
import { getPostData } from "@/server/postActions/getPosts";
import { likePost, viewPost } from "@/server/postActions/postImpressions";
import formatNumbers from "@/utils/formatNumbers";
import { formatUrlAsPostTitle } from "@/utils/formatUrl";
import { AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaCommentAlt, FaEye,  FaThumbsUp, FaTimes } from "react-icons/fa";

const PostPage = () => {
  const [postData, setPostData] = useState<PostDocument | null>(null);
  const [showComments, setShowComments] = useState(false);
  const { post } = useParams();
  const postTitle = formatUrlAsPostTitle(post as string);
  const router = useRouter();
  const userContext = useContext(UserContext);

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
      let timeOut = setTimeout(async () => {
        try {
          const res = await viewPost(postData?._id as string, userContext.data?._id as string);
        if(res){
          const impressions:Impression = {...postData!.impressions,views:res}
          setPostData({...postData,impressions} as PostDocument);
          clearTimeout(timeOut);
        }
        
      } catch (e) {}
      }, 1000 * 12); // must stay for 12 seconds before view counts
      return () => clearTimeout(timeOut);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [postTitle, router]
  );

  function _like(like:boolean) {
    (async()=>{
      try {
        const res = await likePost(postData?._id as string, userContext.data?._id as string,like);
        if(res){
          const impressions:Impression = {...postData!.impressions,likes:res}
          setPostData({...postData,impressions} as PostDocument)
        }
        
      } catch (e) {}
    })();
  }

  const isLiked = postData?.impressions.likes.includes(userContext.data?._id as string)

  return (
    <AnimatedPageOpacity>
      <div className="flex sm:relative">
        {postData && <PostReader {...postData as PostReaderProps} />}

        <div className="w-full sm:w-fit justify-around sm:justify-center rounded-lg app-theme app-borders border-4 app-shadows px-5 py-3 flex sm:gap-4 md:gap-6 fixed bottom-0 sm:bottom-4 sm:shadow-xl left-0 sm:left-[60%] md:left-1/2 sm:-translate-x-1/2">
          <div className="flex w-max px-3 rounded-md hover:light-bg py-2 items-center gap-1 opacity-80">
            <FaEye />
            <span>{formatNumbers(postData?.impressions.views.length ?? 0)} view{(postData?.impressions.views.length ?? 0) == 1 ? "" : "s"}</span>
          </div>
          <button onClick={()=>_like(!isLiked)} className={`flex w-max px-3 rounded-md hover:light-bg py-2 items-center gap-1 opacity-80 app-bg-opacity2 ${isLiked && " bg-blue-400"}`}>
            <FaThumbsUp />
            <span>{formatNumbers(postData?.impressions.likes.length ?? 0)} like{(postData?.impressions.likes.length ?? 0) == 1 ? "" : "s"}</span>
          </button>
          <button onClick={()=>setShowComments(!showComments)} className={`flex w-max px-3 rounded-md hover:light-bg py-2 items-center gap-1 opacity-80 app-bg-opacity2 ${showComments && " bg-purple-600"}`}>
            <FaCommentAlt />
            <span>{formatNumbers(postData?.impressions.comments.length ?? 0)} comment{(postData?.impressions.comments.length ?? 0) == 1 ? "" : "s"}</span>
          </button>
        </div>

<AnimatePresence>
        {showComments && 
        <Comments
        onUpdate={(comments)=>{
          const impressions:Impression = {...postData!.impressions,comments}
          setPostData({...postData,impressions} as PostDocument);
        }}
        postId={postData?._id as string}
        comments={postData?.impressions.comments ?? []}
        close={()=>setShowComments(!showComments)}
         />}
        </AnimatePresence>
      </div>
    </AnimatedPageOpacity>
  );
};

export default PostPage;

