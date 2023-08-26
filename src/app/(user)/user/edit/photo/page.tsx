"use client";

import { AnimatedPageOpacity } from "@/components/AnimatedPage";
import AppInputField, {
  AppFormMessage,
  AppInputFieldProps
} from "@/components/AppInputField";
import AppLoader from "@/components/AppLoader";
import UserContext from "@/context/UserContext";
import { editProfileSchema } from "@/schemas/userSchema";
import updateProfileData from "@/server/userActions/editProfile";
import uploadProfilePhoto from "@/server/userActions/uploadProfilePhoto";
import { FormMessage } from "@/types/formTypes";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { z } from "zod";

const formFields = [
  {
    name: "username",
    type: "text",
    placeholder: "Change Username"
  },
  {
    name: "full_name",
    type: "text",
    placeholder: "Change Full Name"
  },
  {
    name: "bio",
    type: "text",
    placeholder: "Update Bio and about",
    textarea: true
  }
];
interface EditProfileErrors {
  username?: string[];
  full_name?: string[];
  bio?: string[];
  [key: string]: string[] | undefined;
}

export type EditProfileData = {
  username: string;
  full_name: string;
  bio: string;
};
const EditUserPhotoPage = () => {
  const userContext = useContext(UserContext);
  const [image, setImage] = useState<string | null>(null);
  const [createObjectURL, setCreateObjectURL] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<FormMessage>(null);

  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event: any) => {
    const body = new FormData();
    // body.append("file", image);
    // const response = await fetch("/api/file", { method: "POST", body });
  };

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      await uploadProfilePhoto(formData)
      // const validValues = editProfileSchema.parse(formValues);
      // setErrors({});
      // const res = await updateProfileData(validValues);
      // if (res && res[0] === "success") {
      //   setMessage(["success","Profile Info Updated!"]);
      //   userContext.setData(JSON.parse(res[1]));
      // } else {
      //   setMessage(res);
      // }
    } catch (error) {}
    setIsLoading(false);
  }

  return <AnimatedPageOpacity>
      <main className="border-r app-borders">
        <h1 className="page-title">Change Photo</h1>
        <div className="p-4">
          <form onSubmit={e => setIsLoading(true)} action={handleSubmit} className=" p-3 md:w-8/12 mx-auto flex flex-col items-center">
            <AppFormMessage message={message} />
            <label htmlFor="file" className="block w-8/12 md:w-6/12 aspect-square rounded-full overflow-hidden shadow-md app-shadows border app-borders">
            <img src={createObjectURL??"/img/user.png"} className="w-full h-full" />
            </label>
            <h4 className="font-[600] opacity-80 my-5 text-sm">tap to Select Photo</h4>
            <input type="file" name="file" id="file" className="hidden" onChange={uploadToClient} />
            <button disabled={isLoading} className="app-btn w-full mb-5" name="login-submit" type="submit">
              {isLoading ? <AppLoader /> : "Update"}
            </button>
          </form>
        </div>
      </main>
    </AnimatedPageOpacity>;
};

export default EditUserPhotoPage;
