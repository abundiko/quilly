"use client";

import { AnimatedPageOpacity } from "@/components/AnimatedPage";
import AppInputField, {
  AppFormMessage,
  AppInputFieldProps
} from "@/components/AppInputField";
import AppLoader from "@/components/AppLoader";
import UserContext from "@/context/UserContext";
import { editPasswordSchema } from "@/schemas/userSchema";
import changePassword from "@/server/userActions/changePassword";
import { FormMessage } from "@/types/formTypes";
import { useContext, useEffect, useState } from "react";
import { z } from "zod";

const formFields = [
  {
    name: "password",
    type: "password",
    placeholder: "Current Password"
  },
  {
    name: "new_password",
    type: "password",
    placeholder: "New Password"
  },
  {
    name: "confirm_password",
    type: "password",
    placeholder: "Confirm New Password"
  }
];
interface EditPasswordErrors {
  password?: string[];
  new_password?: string[];
  confirm_password?: string[];
  [key: string]: string[] | undefined;
}

export type EditPasswordData = {
  password: string;
  new_password: string;
  confirm_password: string;
};
const EditPasswordPage = () => {
  const userContext = useContext(UserContext);

  const [formValues, setFormValues] = useState<EditPasswordData>({
    password: "",
    new_password: "",
    confirm_password: ""
  });
  const [errors, setErrors] = useState<EditPasswordErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<FormMessage>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);

    try {
      const validValues = editPasswordSchema.parse(formValues);
      setErrors({});

      const res = await changePassword(validValues);
      if (res && res[0] === "success") {
        setMessage(["success", "Password Changed Successfully!"]);
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
        <h1 className="page-title">Change Password</h1>
        <div className="p-4">
          <form
            onSubmit={e => setIsLoading(true)}
            action={handleSubmit}
            className=" p-3 md:w-8/12 mx-auto"
          >
            <AppFormMessage message={message} />
            {formFields.map(item =>
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

export default EditPasswordPage;
