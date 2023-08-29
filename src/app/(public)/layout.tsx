import Header from "@/components/Header";
import { LayoutProps } from "../(auth)/signup/layout";
import Footer from "@/components/Footer";

export default function PublicLayout({children}:LayoutProps){
  return <>
    <Header />
    
      {children}
  
        <Footer />
    </>
}