"use client";

import PostCard from "@/components/PostCard";
import { SidebarButton } from "@/components/home/Sidebar";
import { dummyPosts } from "@/data/dummyPosts";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchKeywordScreen = () => {
  let { keyword: query } = useParams();
  const [tab, setTab] = useState<"all" | "posts" | "people">("all");
  const { get: getParams } = useSearchParams();
  const tabSearchParam = getParams("tab");

  useEffect(
    () => {
      const tabParam = getParams("tab") ?? "all";
      setTab(tabParam as "all" | "posts" | "people");
    },
    [getParams, tabSearchParam]
  );

  query = decodeURIComponent(query.toString()).split("&tab=")[0];
  return (
    <div className="p-2">
      <div className="flex">
        {["All", "Posts", "People"].map(item =>
          <SidebarButton
            key={item}
            text={item}
            url={`/search/${query}&tab=${item}`}
            isActive={tab === item.toLowerCase()}
          />
        )}
      </div>
      <h4 className="font-[600] mb-3 text-md opacity-80">
        Results for: {query}
      </h4>
      <div className="md:w-10/12">
        {dummyPosts.map((item, i) => <PostCard {...item} key={i} />)}
      </div>
    </div>
  );
};

export default SearchKeywordScreen;
