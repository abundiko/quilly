"use client";

import { AnimatedPageOpacity } from "@/components/AnimatedPage";
import AppInputField from "@/components/AppInputField";
import { useContext, useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import {CreatePostContext} from "./layout";
import AppLoader from "@/components/AppLoader";
import { createPostSchema } from "@/schemas/postSchema";
import { z } from "zod";
import { useRouter } from "next/navigation";

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
    const postContext = useContext(CreatePostContext);
    const router = useRouter();

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
      setIsLoading(true);

      try {
        const validValues = createPostSchema.parse(formValues);
        setErrors({});

        postContext.setData({...postContext.data,...validValues});
        router.push('/create/body');
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrors(error.flatten().fieldErrors);
          console.log(errors);
        }
      }
      setIsLoading(false);
    }
    
  return <AnimatedPageOpacity>
      <h1 className="page-title">Create Post</h1>
      <div className="p-4">
        <form action={handleSubmit}
            onSubmit={e => setIsLoading(true)} className=" p-3 md:w-10/12 mx-auto">
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
