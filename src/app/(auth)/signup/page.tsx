"use client";

import { submitSignup } from "@/server/auth/signup";
import Link from "next/link";
import { useContext, useState } from "react";
import { signupSchema } from "@/schemas/userSchema";
import { z } from "zod";
import AppInputField, { AppFormMessage } from "@/components/AppInputField";
import AppLoader from "@/components/AppLoader";
import { FormMessage } from "@/types/formTypes";
import { SignupContext } from "./layout";
import { useRouter } from "next/navigation";

interface SignupFormErrors {
  email?: string[];
  password?: string[];
  username?: string[];
  full_name?: string[];
  [key: string]: string[] | undefined;
}

const SignupFormData = [
  {
    name: "full_name",
    type: "text",
    placeholder: "Enter Full Name Here"
  },
  {
    name: "username",
    type: "text",
    placeholder: "Enter Username Here"
  },
  {
    name: "email",
    type: "email",
    placeholder: "Enter Email Here"
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter Password Here"
  }
];

export type SignupData = {
  email: string;
  password: string;
  username: string;
  full_name: string;
};

const SignupForm = () => {
  const [formValues, setFormValues] = useState<SignupData>({
    email: "",
    password: "",
    full_name: "",
    username: ""
  });
  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<FormMessage>(null);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const signupContext = useContext(SignupContext);
  const handleSubmit = (e: FormData) => {
    "use client";
    setIsLoading(true);
    setMessage(null);
    try {
      const validValues = signupSchema.parse(formValues);
      setErrors({});
      (async () => {
        const res = await submitSignup(validValues);
        if (res && res[0] === "success") {
          console.log(1);
          signupContext.setData(validValues);
          router.push("/signup/interests");
        } else setMessage(res);
      })();
      setIsLoading(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors);
        console.log(errors);
        setIsLoading(false);
      }
    }
  };
  return (
    <form
      action={handleSubmit}
      className="app-theme app-shadows app-borders border rounded-lg p-4 w-10/12 lg:w-8/12 shadow-2xl bg-inherit"
    >
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl">Sign Up</h1>
        <Link href="/login" className="rounded-3xl app-btn-bordered py-1">
          Login
        </Link>
      </div>
      <h2 className="  opacity-80 text-md my-6">
        Create a <span className="app-text-success">free</span> Quilly Account
      </h2>
      <AppFormMessage message={message} />
      {SignupFormData.map(item =>
        <AppInputField
          key={item.placeholder}
          name={item.name}
          type={item.type}
          placeholder={item.placeholder}
          onChange={handleChange}
          error={(errors as SignupFormErrors)[item.name]}
        />
      )}
      <button
        disabled={isLoading}
        className="app-btn w-full mb-5 disabled:pointer-events-none disabled:opacity-50"
        name="signup-submit"
        type="submit"
      >
        {isLoading ? <AppLoader /> : "Submit"}
      </button>
    </form>
  );
};

export default SignupForm;
