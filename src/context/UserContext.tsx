"use client";

import { LayoutProps } from "@/app/(auth)/signup/layout";
import { UserDocument } from "@/server/mongoose/schemas/userSchema";
import React, { createContext, useState } from "react";

export type UserContextProps = {
  data: UserDocument | null;
  setData: any;
};

const UserContext = createContext<UserContextProps>({
  data: null,
  setData: () => null
});
export const UserContextProvider = ({ children }: LayoutProps) => {
  const [data, setData] = useState<UserDocument | null>(null);
  return (
    <UserContext.Provider value={{ data, setData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
