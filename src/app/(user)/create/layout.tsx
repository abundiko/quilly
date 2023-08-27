"use client";

import { createContext, useEffect, useState } from "react";
import { LayoutProps } from "@/app/(auth)/signup/layout";

export type CreatePostProps = {
  title?: string;
  subtitle?: string;
  formData?: FormData;
  body?: string;
  tags?: string[];
  author?: string;
};

export type CreatePostContextProps = {
  data: CreatePostProps;
  setData: any;
};

export const CreatePostContext = createContext<CreatePostContextProps>({
  data: {},
  setData: () => null
});

const Page = ({ children }: LayoutProps) => {
  const [data, setData] = useState<CreatePostProps>({});
  useEffect(
    () => {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault();
        if (data.title || data.subtitle)
          return (event.returnValue = "Exit Page and lose your progress?");
      };

      const handleUnload = () => {
        setData({});
      };

      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("unload", handleUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        window.removeEventListener("unload", handleUnload);
      };
    },
    [data]
  );
  return (
    <CreatePostContext.Provider value={{ data, setData }}>
      {children}
    </CreatePostContext.Provider>
  );
};

export default Page;
