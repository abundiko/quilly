import Header from "@/components/Header";
import { LayoutProps } from "../(auth)/signup/layout";

export default function PublicLayout({children}:LayoutProps){
  return <>
    <Header />
    
      {children}
  
    </>
}