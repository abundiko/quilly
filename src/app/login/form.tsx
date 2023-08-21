import { submitLogin } from "@/server/actions/login";
import Link from "next/link";
import { useState } from "react";
import { loginSchema } from "@/schemas/userSchema";
import { z } from "zod";
import AppInputField, { AppFormMessage } from "@/components/AppInputField";
import AppLoader from "@/components/AppLoader";
import { FormMessage } from "@/types/formTypes";

interface LoginFormErrors {
  email?: string[];
  password?: string[];
  [key: string]: string[] | undefined;
}

const loginFormData = [
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

export type LoginData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [formValues, setFormValues] = useState<LoginData>({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<FormMessage>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormData) => {
    setIsLoading(true);
    try {
      const validValues = loginSchema.parse(formValues);
      setErrors({});
      const res = await submitLogin(validValues);
      setMessage(res);
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
        <h1 className="font-bold text-3xl">Login</h1>
        <Link href="/signup" className="rounded-3xl app-btn-bordered py-1">
          Sign Up
        </Link>
      </div>
      <h2 className="  opacity-80 text-md my-6">Sign in to view and create.</h2>
      <AppFormMessage message={message} />
      {loginFormData.map(item =>
        <AppInputField
          key={item.placeholder}
          name={item.name}
          type={item.type}
          placeholder={item.placeholder}
          onChange={handleChange}
          error={(errors as LoginFormErrors)[item.name]}
        />
      )}
      <button
        disabled={isLoading}
        className="app-btn w-full mb-5 disabled:pointer-events-none disabled:opacity-50"
        name="login-submit"
        type="submit"
      >
        {isLoading ? <AppLoader /> : "LogIn"}
      </button>
    </form>
  );
};

export default LoginForm;
