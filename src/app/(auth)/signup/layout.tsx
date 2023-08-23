"use client";

import AnimatedPage from "@/components/AnimatedPage";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import { SignupData } from "./page";

export type LayoutProps = {
  children: React.ReactNode;
};

type SignupContextProps = {
  setData: Dispatch<SetStateAction<SignupData | null>>;
  data: SignupData | null;
};

export const SignupContext = createContext<SignupContextProps>({
  data: null,
  setData: () => null
});

const SignupLayout = ({ children }: Props) => {
  const [data, setData] = useState<SignupData | null>(null);
  return (
    <AnimatedPage>
      <SignupContext.Provider value={{ data, setData }}>
        <main className="h-screen relative w-full">
          <div className="w-full h-full flex items-center flex-row-reverse">
            <div className="w-0 md:w-6/12 overflow-hidden h-full bg-[url(/img/test.jpg)] bg-cover bg-left-bottom opacity-50" />
            <div className="md:w-6/12 w-full flex items-center justify-center">
              {children}
            </div>
          </div>
        </main>
      </SignupContext.Provider>
    </AnimatedPage>
  );
};

export default SignupLayout;
