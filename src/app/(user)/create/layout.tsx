"use client";

import { createContext, useState } from "react";
import { LayoutProps } from "@/app/(auth)/signup/layout";

export type CreatePostProps = {
  title?: string;
  subtitle?: string;
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
  return (
    <CreatePostContext.Provider value={{ data, setData }}>
      {children}
    </CreatePostContext.Provider>
  );
};

export default Page;
