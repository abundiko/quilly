import Header from "@/components/Header";
import { LayoutProps } from "../(auth)/signup/layout";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export default function PublicLayout({children}:LayoutProps){
  return <>
    <Header />
    
      {children}
  
        <Footer />
    </>
}

export const metadata: Metadata = {
  title: "Quilly | Home",
  icons:[
    "/img/icon.png"
  ],
  keywords:["quilly","blogs","social blog","blogging","writing","quill","best blog site"],
  description: "Home of professionally crafted contents",
  openGraph: {
    title: "Quilly | Home",
    description: "Home of professionally crafted contents",
    siteName: "Quilly",
    images: [
      {
        url: "https://quilly-blog.vercel.app/img/hero-snapshot.png",
        width: 400,
        height: 250,
        alt: "Quilly Landing Page"
      }
    ],
  },
  twitter:{
    title: "Quilly | Home",
    description: "Home of professionally crafted contents",
    site:"Quilly",
    images: [
      {
        url: "https://quilly-blog.vercel.app/img/hero-snapshot.png",
        width: 400,
        height: 250,
        alt: "Quilly Landing Page"
      }
    ],
  }
};