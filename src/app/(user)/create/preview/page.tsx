"use client";

import "../../../editor.css";
import { AnimatedPageOpacity } from "@/components/AnimatedPage";
import React, { useContext, useEffect } from "react";
import { CreatePostContext } from "../layout";
import { useRouter } from "next/navigation";
import AppLoader from "@/components/AppLoader";
import { FaChevronRight } from "react-icons/fa";

const CreatePagePreview = () => {
  const postContext = useContext(CreatePostContext);
  const router = useRouter();


  if (!postContext.data.title || !postContext.data.body || !postContext.data.tags) return router.back();

  return (
    <AnimatedPageOpacity>
      <h1 className="page-title flex justify-between items-center">
        <span>Preview</span>
        <button
          className="app-btn py-1 px-2 rounded-3xl disabled:pointer-events-none disabled:opacity-50 text-sm"
          name="signup-interests-submit"
          type="submit"
        >
          {/* disabled={selectedInterests.length < 3 ? true : isLoading} */}
          {false
            ? <AppLoader />
            : <div className="flex items-center gap-2">
                <span>next</span>
                <FaChevronRight />
              </div>}
        </button>
      </h1>
      <div className="editor p-4">
        <HTMLText html=
        {postContext.data.body}
         />
      </div>
    </AnimatedPageOpacity>
  );
};

export default CreatePagePreview;


export function HTMLText({ html }:{html?:string}) {
  return <div dangerouslySetInnerHTML={{ __html: html??"" }} />;
}