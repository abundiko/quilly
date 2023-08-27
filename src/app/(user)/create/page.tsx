"use client";

import { AnimatedPageOpacity } from "@/components/AnimatedPage";
import AppInputField, { AppFormMessage } from "@/components/AppInputField";
import { useContext, useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import {CreatePostContext} from "./layout";
import AppLoader from "@/components/AppLoader";
import { createPostSchema } from "@/schemas/postSchema";
import { z } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormMessage } from "@/types/formTypes";

const formFields = [
  {
    name: "title",
    type: "text",
    placeholder: "Post Title. eg: How To do something...",
    textarea:true,
  },
  {
    name: "subtitle",
    type: "text",
    placeholder: "Post Subitle. eg: In this post you will learn to...",
    textarea:true,
  },
];

interface CreatePostErrors {
  title?: string[];
  subtitle?: string[];
  [key: string]: string[] | undefined;
}

const CreatePage = () => {
  
  const [createObjectURL, setCreateObjectURL] = useState<string | null>(null);
    const postContext = useContext(CreatePostContext);
    const router = useRouter();
  const [message, setMessage] = useState<FormMessage>(null);

    const [formValues, setFormValues] = useState({
      title: postContext.data.title??"",
      subtitle: postContext.data.subtitle??"",
    });

    

    const [errors, setErrors] = useState<CreatePostErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value.trim() });
    };

    async function handleSubmit(formData: FormData) {
      setMessage(null);
      setIsLoading(true);
      const img = formData.get('file');
      if(!img || (img as File).name == ""){
        setMessage(["error","Select an image file"]);
        setIsLoading(false);
        return;
      }

      try {
        const validValues = createPostSchema.parse(formValues);
        setErrors({});

        postContext.setData({...postContext.data,...validValues,formData});
        router.push('/create/body');
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrors(error.flatten().fieldErrors);
          console.log(errors);
        }
      }
      setIsLoading(false);
    }

      const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      const img = URL.createObjectURL(i)
      setCreateObjectURL(img);
      postContext.setData({...postContext.data,img})
    }
  };

    
  return <AnimatedPageOpacity>
      <h1 className="page-title">Create Post</h1>
      <div className="p-4">
        <form action={handleSubmit}
            onSubmit={e => setIsLoading(true)} className=" p-3 md:w-10/12 mx-auto">
              <AppFormMessage message={message} />
              <label htmlFor="file">
                <div className="cursor-pointer relative block w-full aspect-[2.3/1] rounded-lg mb-4 overflow-hidden shadow-md app-shadows border app-borders">
            <Image layout="fill" alt="Post Picture" 
            src={createObjectURL ?? "/img/select-image.png"}
             className={`w-full h-full bg-slate-800 scale-105 ${createObjectURL ? 'object-cover' : 'object-contain'}`} />
            </div>
              </label>
              <input type="file" onChange={uploadToClient} hidden className="hidden" id="file" name="file" />
          {formFields.map(item =>
            <AppInputField
              key={item.name}
              {...item}
              onChange={handleChange}
              error={errors[item.name]}
              value={postContext.data[item.name as "title"|"subtitle"]??""}
            />
          )}
          <button disabled={isLoading} className="app-btn w-full mb-5 flex items-center gap-1 justify-center" name="login-submit" type="submit">
            {
              isLoading ? <AppLoader /> : <><span>Next</span>
            <FaChevronRight /></>
            }
          </button>
        </form>
      </div>
    </AnimatedPageOpacity>;
};

export default CreatePage;
