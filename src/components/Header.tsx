import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  const themeContext = React.useContext(ThemeContext);
  return (
    <header className="h-16 bg-inherit flex items-center justify-between px-8 md:px-10 lg:px-20 fixed w-full app-shadows shadow-lg app-theme z-30">
      <div className="w-fit h-fit flex items-center">
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/img/logo-dark.png"
            height={40}
            width={40}
            alt="Quilly Logo"
            className="dark:hidden dim:hidden"
          />
          <Image
            src="/img/logo-light.png"
            height={32}
            width={32}
            alt="Quilly Logo"
            className="hidden dark:inline-block dim:inline-block"
          />
          <span className="font-[500] text-2xl text-primary-dark dark:text-primary-light dim:text-primary-light underline underline-offset-4 ">
            Quilly
          </span>
        </Link>
        <div className="px-10">
          <div className="rounded-md w-[2px] h-7 bg-[#00000055] dark:bg-[#ffffff22] dim:bg-[#ffffff55]" />
        </div>
        <nav className="h-fit flex">
          {navLinks.map(item =>
            <Link
              key={Object.keys(item)[0]}
              href={Object.values(item)[0]}
              className="app-navlink"
            >
              {Object.keys(item)[0]}
            </Link>
          )}
        </nav>
      </div>
      <div>
        <Link href="/login" className="app-btn rounded-3xl">
          Login
        </Link>
        <button onClick={() => themeContext.setTheme("")}>light</button>
        <button onClick={() => themeContext.setTheme("dim")}>dim</button>
        <button onClick={() => themeContext.setTheme("dark")}>dark</button>
      </div>
    </header>
  );
};

export default Header;

const navLinks = [
  {
    Home: "/"
  },
  {
    About: "/about"
  },
  {
    Contact: "/contact"
  },
  {
    "Terms of Service": "/terms-of-service"
  }
];
