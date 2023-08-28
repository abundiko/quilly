"use client";

import PostCard from "@/components/PostCard";
import { SidebarButton } from "@/components/home/Sidebar";
import UserContext from "@/context/UserContext";
import { PostDocument } from "@/server/mongoose/schemas/postSchema";
import { searchPosts } from "@/server/postActions/getPosts";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const SearchKeywordScreen = () => {
  const userContext = useContext(UserContext);
  let { keyword: query } = useParams();
  const [tab, setTab] = useState<"all" | "posts" | "people">("all");
  const [posts, setPosts] = useState<PostDocument[]|null>(null)
  const { get: getParams, } = useSearchParams();

  useEffect(
    () => {
      const tabParam = getParams("tab") ?? "all";
      setTab(tabParam as "all" | "posts" | "people");
    },
    [getParams]
    );
    
    query = decodeURIComponent(query.toString()).split("&tab=")[0];
    useEffect(()=>{
    (async()=>{
      let fetched = false;
      while(!fetched){
        try {
          const postDoc = await searchPosts(query as string,{
            filter:userContext.data?.interests ?? []
          });
          if(postDoc){
            fetched = true;
            setPosts(postDoc);
          } 
        } catch (e) {
          continue;
        }
      }
    })();
  },[query])

  return (
    <div className="p-2">
      <div className="flex gap-2">
        {["All", "Posts", "People"].map(item =>
          <SidebarButton
            key={item}
            text={item}
            url={`/search/${encodeURIComponent(query.toString())}?tab=${item.toLowerCase()}`}
            isActive={tab === item.toLowerCase()}
          />
        )}
      </div>
      <div className="md:w-10/12">
        {posts && posts.length > 0 ? posts.map((item, i) => <PostCard {...item} key={i} />) : 
        <div className="flex flex-col items-center justify-center py-40 opacity-40 gap-2">
          <FaInfoCircle className="text-7xl" />
          <h1 className="text-2xl">No results found</h1>
          </div>}
      </div>
    </div>
  );
};

export default SearchKeywordScreen;
