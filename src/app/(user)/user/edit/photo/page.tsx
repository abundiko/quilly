"use client";

import { AnimatedPageOpacity } from "@/components/AnimatedPage";
import  {AppFormMessage,} from "@/components/AppInputField";
import AppLoader from "@/components/AppLoader";
import UserContext from "@/context/UserContext";
import { FormMessage } from "@/types/formTypes";
import { formatImage } from "@/utils/imageHelpers";
import Image from "next/image";
import { useContext, useState } from "react";
import { FaImage } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";

const EditUserPhotoPage = () => {
  const userContext = useContext(UserContext);
  const [remove, setRemove] = useState(false);
  const [createObjectURL, setCreateObjectURL] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<FormMessage>(null);

  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };


  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      if(remove) formData.append('remove',"true")
      const res = await fetch("/api/user-upload-photo", {
      body:formData,
      method:"POST"
    });
    const formMessage = (await res.json()) as FormMessage;
 
      if (formMessage && formMessage[0] === "success") {
        if(remove) setMessage(["success","Profile Photo Removed!"]);
      else setMessage(["success","Profile Photo Updated!"]);
      
      userContext.setData(JSON.parse(formMessage[1]));
      } else {
        setMessage(formMessage);
      }
    } catch (error) {}
    setIsLoading(false);
  }

  return <AnimatedPageOpacity>
      <main className="border-r app-borders">
        <h1 className="page-title">Change Photo</h1>
        <div className="p-4">
          <form onSubmit={e => setIsLoading(true)} action={handleSubmit} className=" p-3 md:w-8/12 mx-auto flex flex-col items-center">
            <AppFormMessage message={message} />
            <div className="relative block w-8/12 md:w-6/12 aspect-square rounded-full overflow-hidden shadow-md app-shadows border app-borders">
            <Image layout="fill" alt="your profile Photo" src={createObjectURL ?? formatImage(userContext.data?.img ?? "")} className="w-full h-full" />
            </div>
            <div className="flex gap-4 my-5 justify-center items-cente">
              <label htmlFor="file">
                <h4 className="app-btn-bordered border-none flex items-center gap-1"><FaImage /><span>Select</span></h4>
              </label>
                <button onClick={()=>{setCreateObjectURL(null);setRemove(true)}} className="app-btn-bordered border-none flex items-center gap-1"><IoTrashBin /><span>Remove</span></button>
            </div>
            <input type="file" hidden name="file" id="file" className="hidden"  onChange={uploadToClient}/>
            <button disabled={isLoading} className="app-btn w-full mb-5" name="login-submit" type="submit">
              {isLoading ? <AppLoader /> : "Update"}
            </button>
          </form>
        </div>
      </main>
    </AnimatedPageOpacity>;
};

export default EditUserPhotoPage;
