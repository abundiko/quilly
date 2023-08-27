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
    (async()=>{
      try {
        const res = await fetch("/api/upload-post", {
      body:data.formData,
      method:"POST"
    });
    let formMessage = (await res.json()) as FormMessage;
    if(formMessage && formMessage[0] === 'success'){
      const img = formMessage[1];
      const postResult = await newPost({...data,img});
      if(postResult && postResult[0] === 'success') router.replace('/user')
      
      setMessage(postResult)
    }else
    setMessage(formMessage)
    
      } catch (e) {
        console.error("ERROR",e);
        
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
