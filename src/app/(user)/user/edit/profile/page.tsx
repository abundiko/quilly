"use client";

import { AnimatedPageOpacity } from "@/components/AnimatedPage";
import AppInputField, { AppFormMessage, AppInputFieldProps } from "@/components/AppInputField";
import AppLoader from "@/components/AppLoader";
import UserContext from "@/context/UserContext";
import { editProfileSchema } from "@/schemas/userSchema";
import updateProfileData from "@/server/userActions/editProfile";
import { FormMessage } from "@/types/formTypes";
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
const EditUserProfilePage = () => {
  const userContext = useContext(UserContext);
  const [formFieldsWithValue, setFormFieldsWithValue] = useState(formFields);

  useEffect(() => {
    let newFields: object[] = [];
    for (const key in formFields) {
      newFields.push({
        ...formFields[key],
        value: userContext.data ? userContext.data[formFields[key].name] : ""
      });
    }

    setFormFieldsWithValue(newFields as AppInputFieldProps[]);
  }, [userContext.data]);

  const [formValues, setFormValues] = useState<EditProfileData>({
    username: userContext.data?.username??"",
    full_name: userContext.data?.full_name??"",
    bio: userContext.data?.bio??""
  });
  const [errors, setErrors] = useState<EditProfileErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<FormMessage>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value.trim() });
  };

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      const validValues = editProfileSchema.parse(formValues);
      setErrors({});
      const res = await updateProfileData(validValues, validValues.username!==userContext.data?.username);
      if (res && res[0] === "success") {
        setMessage(["success","Profile Info Updated!"]);
        userContext.setData(JSON.parse(res[1]));
      } else {
        setMessage(res);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors);
        console.log(errors);
      }
    }
    setIsLoading(false);
  }

  return (
    <AnimatedPageOpacity>
      <main className="border-r app-borders">
        <h1 className="page-title">Update Profile</h1>
        <div className="p-4">
          <form  onSubmit={(e)=>setIsLoading(true)} action={handleSubmit} className=" p-3 md:w-8/12 mx-auto">
            <AppFormMessage message={message} />
            {formFieldsWithValue.map(item =>
              <AppInputField
                key={item.name}
                {...item}
                onChange={handleChange}
                error={errors[item.name]}
              />
            )}
            <button
              disabled={isLoading}
              className="app-btn w-full mb-5"
              name="login-submit"
              type="submit"
            >
              {isLoading ? <AppLoader /> : "Update"}
            </button>
          </form>
        </div>
      </main>
    </AnimatedPageOpacity>
  );
};

export default EditUserProfilePage;
