"use client";

import { AnimatedPageOpacity } from "@/components/AnimatedPage";
import AppInputField from "@/components/AppInputField";
import { editProfileSchema } from "@/schemas/userSchema";
import { FormMessage } from "@/types/formTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  email?: string[];
  password?: string[];
  [key: string]: string[] | undefined;
}

export type EditProfileData = {
  username: string;
  full_name: string;
  bio: string;
};
const EditUserProfilePage = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<EditProfileData>({
    username: "",
    full_name: "",
    bio: ""
  });
  const [errors, setErrors] = useState<EditProfileErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<FormMessage>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      const validValues = editProfileSchema.parse(formValues);
      setErrors({});
      const res = await "submitLogin(validValues)";
      if (res && res[0] === "success") {
        router.replace("/home");
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
        <h1 className="page-title">Edit Profile</h1>
        <div className="p-4">
          <form
            action={handleSubmit}
            className="border app-borders rounded-lg p-3"
          >
            {formFields.map(item =>
              <AppInputField
                key={item.name}
                {...item}
                onChange={handleChange}
              />
            )}
          </form>
        </div>
      </main>
    </AnimatedPageOpacity>
  );
};

export default EditUserProfilePage;
