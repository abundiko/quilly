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

export const metadata = {
  title: "Quilly | Home",
  desctiption: "Home of professionally crafted contents",
  openGraph: {
    title: "Quilly | Home",
    description: "Home of professionally crafted contents",
    images: [
      {
        url: "/img/hero-snapshot.png",
        width: 800,
        height: 600,
        alt: "Quilly Logo"
      }
    ],
    site_name: "Quilly"
  }
};