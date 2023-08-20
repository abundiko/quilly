import React from "react";
import Image from "next/image";
import { navLinks } from "./Header";
import Link from "next/link";

const Footer = () => {
  return (
    <>
    <footer className="pt-20 pb-10 relative bg-[url(/img/hero.jpg)] bg-cover text-light overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-dark opacity-90 backdrop-blur-md" />
      <div className="h-40 w-40 app-theme absolute -right-20 -top-20 rounded-full" />
      <div className="app-container relative">
        <div className="w-full md:w-40 me-5 mb-10 md:m-0">
          <Link href="/" className="w-full relative flex flex-col items-center">
            <Image
              src="/img/logo-light.png"
              height={100}
              width={100}
              alt="Quilly Logo"
              className="block"
            />
            <h6 className="font-bold text-3xl text-primary-light">Quilly</h6>
          </Link>
        </div>
        <div className="w-full md:w-fit flex text-center md:text-start">
          {footerLinks.map((item, i1) =>
            <div key={i1} className="w-6/12 md:w-52">
              {item.map(child =>
                <div className="mb-2" key={Object.keys(child)[0]}>
                  <Link
                    href={Object.values(child)[0]}
                    className="font-[500] text-lg hover:underline inline-block me-3 underline-offset-4 opacity-80 hover:!text-primary-light"
                  >
                    {Object.keys(child)[0]}
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
    <div className="bg-text-dark text-light relative py-3 px-[5vw]">
      <p className="opacity-70">Copyright &copy; Quilly 2023, all rights reserved.</p>
    </div>
    </>
  );
};

export default Footer;

const footerLinks = [navLinks, navLinks];
