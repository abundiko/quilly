"use client";

import { AnimatedPageOpacity } from "@/components/AnimatedPage";
import  {AppFormMessage,} from "@/components/AppInputField";
import AppLoader from "@/components/AppLoader";
import UserContext from "@/context/UserContext";
import { FormMessage } from "@/types/formTypes";
import { useContext, useState } from "react";

const EditUserPhotoPage = () => {
  const userContext = useContext(UserContext);
  const [image, setImage] = useState<string | null>(null);
  const [createObjectURL, setCreateObjectURL] = useState<string | null>(userContext.data?.img ?? null);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<FormMessage>(null);

  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };


  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/user-upload-photo", {
      body:formData,
      method:"POST"
    });
    const formMessage = (await res.json()) as FormMessage;
 
      if (formMessage && formMessage[0] === "success") {
        setMessage(["success","Profile Photo Updated!"]);
        userContext.setData(JSON.parse(formMessage[1]));
      } else {
        setMessage(formMessage);
      }
    } catch (error) {}
    setIsLoading(false);
  }

  const realImg = (createObjectURL==null ?  "/img/user.png" : createObjectURL.trim() == '' ? "/img/user.png" : createObjectURL)

  return <AnimatedPageOpacity>
      <main className="border-r app-borders">
        <h1 className="page-title">Change Photo</h1>
        <div className="p-4">
          <form onSubmit={e => setIsLoading(true)} encType='' action={handleSubmit} className=" p-3 md:w-8/12 mx-auto flex flex-col items-center">
            <AppFormMessage message={message} />
            <label htmlFor="file" className="block w-8/12 md:w-6/12 aspect-square rounded-full overflow-hidden shadow-md app-shadows border app-borders">
            <img src={realImg} className="w-full h-full" />
            </label>
            <h4 className="font-[600] opacity-80 my-5 text-sm">tap to Select Photo</h4>
            <input type="file" name="file" id="file" className="hidden"  onChange={uploadToClient}/>
            <input type="text" name="test" id="test" value="test" className="hidden" />
            <button disabled={isLoading} className="app-btn w-full mb-5" name="login-submit" type="submit">
              {isLoading ? <AppLoader /> : "Update"}
            </button>
          </form>
        </div>
      </main>
    </AnimatedPageOpacity>;
};

export default EditUserPhotoPage;
