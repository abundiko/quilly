"use client";

import "../../../editor.css";
import Image from "next/image";
import { AnimatedPageOpacity } from "@/components/AnimatedPage";
import React, { useContext, useState } from "react";
import { CreatePostContext } from "../layout";
import { useRouter } from "next/navigation";
import AppLoader from "@/components/AppLoader";
import { FaCheckCircle } from "react-icons/fa";
import HTMLText from "@/components/home/HtmlText";
import { FormMessage } from "@/types/formTypes";
import { AppFormMessage } from "@/components/AppInputField";
import newPost from "@/server/postActions/newPost";
import PostReader, { PostReaderProps } from "@/components/home/PostReader";

const CreatePagePreview = () => {
  const postContext = useContext(CreatePostContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<FormMessage>(null);

  if (
    !postContext.data.title ||
    !postContext.data.body ||
    !postContext.data.img ||
    !postContext.data.tags
  )
    return router.back();
  const { data } = postContext;

  function uploadPost() {
    setIsLoading(true);
    (async () => {
      try {
        const res = await fetch("/api/upload-post", {
          body: data.formData,
          method: "POST"
        });
        let formMessage = (await res.json()) as FormMessage;
        if (formMessage && formMessage[0] === "success") {
          const img = formMessage[1];
          const postResult = await newPost({ ...data, img });
          if (postResult && postResult[0] === "success")
            router.replace("/user");
          setMessage(postResult);
        } else setMessage(formMessage);
      } catch (e) {
        console.error("ERROR", e);
      }
      setIsLoading(false);
    })();
  }

  return (
    <AnimatedPageOpacity>
      <h1 className="page-title flex justify-between items-center">
        <span>Preview</span>
        <button
          className="app-btn py-1 px-2 rounded-3xl disabled:pointer-events-none disabled:opacity-50 text-sm"
          name="signup-interests-submit"
          type="submit"
          onClick={uploadPost}
          disabled={isLoading}
        >
          {isLoading
            ? <AppLoader />
            : <div className="flex items-center gap-2">
                <FaCheckCircle />
                <span>Post</span>
              </div>}
        </button>
      </h1>
      <AppFormMessage message={message} />
      <PostReader {...data as PostReaderProps} />
    </AnimatedPageOpacity>
  );
};

export default CreatePagePreview;
