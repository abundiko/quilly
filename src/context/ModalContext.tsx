"use client"

import { LayoutProps } from "@/app/(auth)/signup/layout";
import { AnimatePresence } from "framer-motion";
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

export type ModalProps = {
  setModal:Dispatch<SetStateAction<ReactNode>>|any;
}

export const ModalContext = createContext<ModalProps>({setModal:null})

export default function ModalContextProvider({children}:LayoutProps) {
  const [modal, setModal] = useState<React.ReactNode|null>(null);
  
  return <>
  <ModalContext.Provider value={{setModal}}>
    {modal!=null && modal}
    {children}
  </ModalContext.Provider>
  </>
}
