"use client";

import "../../../editor.css";
import Image from "next/image";
import { AnimatedPageOpacity } from "@/components/AnimatedPage";
import React, { useContext } from "react";
import { CreatePostContext } from "../layout";
import { useRouter } from "next/navigation";
import AppLoader from "@/components/AppLoader";
import { FaCheckCircle } from "react-icons/fa";
import HTMLText from "@/components/home/HtmlText";
import ProfilePhotoModal from "@/components/modals/ProfilePhotoModal";
import { formatImage } from "@/utils/imageHelpers";

const CreatePagePreview = () => {
  const postContext = useContext(CreatePostContext);
  const router = useRouter();

  if (
    !postContext.data.title ||
    !postContext.data.body ||
    !postContext.data.img ||
    !postContext.data.tags
  )
    return router.back();

  const { data } = postContext;

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
                <FaCheckCircle />
                <span>Post</span>
              </div>}
        </button>
      </h1>
      <section>
<div className="h-52 relative w-full">
          <Image
                src={data?.img!}
            layout="fill"
            alt="Profile Photo"
            className="w-full h-full absolute top-0 left-0 object-cover"
          />
          <div className="relative bg-gradient-to-t from-light dim:from-dim dark:from-dark to-transparent h-full w-full flex justify-center items-center py-5 px-6 md:px-10 gap-2 md:gap-5">
            <div className="w-10/12">
              <h1 className="font-bold text-2xl md:text-3xl mt-6 mb-2">
                {data.title}
              </h1>
              <h2 className="font-[600] text-sm opacity-80">{data.subtitle}</h2>
            </div>
          </div>
        </div>

      <div className="editor p-4">
        <HTMLText html={postContext.data.body} />
      </div>
      </section>
    </AnimatedPageOpacity>
  );
};

export default CreatePagePreview;
