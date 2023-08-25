"use client";

import PostCard from "@/components/PostCard";
import { SidebarButton } from "@/components/home/Sidebar";
import { dummyPosts } from "@/data/dummyPosts";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchKeywordScreen = () => {
  let { keyword: query } = useParams();
  const [tab, setTab] = useState<"all" | "posts" | "people">("all");
  const { get: getParams, } = useSearchParams();

  useEffect(
    () => {
      const tabParam = getParams("tab") ?? "all";
      setTab(tabParam as "all" | "posts" | "people");
      
    },
    [getParams]
  );

  query = decodeURIComponent(query.toString()).split("&tab=")[0];
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
        {dummyPosts.map((item, i) => <PostCard {...item} key={i} />)}
      </div>
    </div>
  );
};

export default SearchKeywordScreen;
