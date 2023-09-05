"use client";
import { ThemeContext, themes } from "@/context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AppDropdown, { AppDropdownProps } from "./AppDropdown";
import isLoggedIn from "@/server/auth/isLoggedIn";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const themeContext = React.useContext(ThemeContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoggedIn(await isLoggedIn());
      } catch (e) {}
    })();
  }, []);

  return (
    <>
    <header className="h-16 bg-inherit flex items-center justify-between px-8 md:px-10 lg:px-20 fixed w-full app-shadows shadow-lg app-theme z-30">
      <div className="w-fit h-fit flex items-center">
        <Link href="/" className="inline-flex items-center">
          <Image
          loading="lazy"
            src="/img/logo-dark.png"
            height={40}
            width={40}
            alt="Quilly Logo"
            className="dark:hidden dim:hidden"
          />
          <Image       
             loading="lazy"
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
        <div className="px-10 hidden md:block">
          <div className="rounded-md w-[2px] h-7 bg-[#00000055] dark:bg-[#ffffff22] dim:bg-[#ffffff55]" />
        </div>
        <nav className="h-fit hidden md:flex">
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
      <button aria-label="toggle mobile nav"  onClick={()=>setShowMobileNav(true)} className="app-icon-button md:hidden">
          <FaBars />
        </button>
      <div className="hidden md:block">
        {loggedIn
          ? <Link href="/home" className="app-btn rounded-3xl">
              Home
            </Link>
          : <Link href="/login" className="app-btn rounded-3xl">
              Login
            </Link>}
        <AppDropdown
          title={
            <button className="app-btn py-1 inline-block ms-3 rounded-3xl">
              Theme
            </button>
          }
          items={themes}
          onUpdate={e => themeContext.setTheme(e)}
        />
      </div>
    </header>
    <AnimatePresence>
          {
            showMobileNav &&
            <motion.aside className="w-full h-screen fixed top-0 left-0 z-[35]">
      <div  onClick={()=>setShowMobileNav(false)} className="absolute h-full w-full top-0 left-0 bg-[#00000022] backdrop-blur-sm" />
      <motion.div {...animations} className="absolute bottom-0 w-full h-[50vh] min-h-max rounded-t-lg app-theme shadow-md app-shadows border app-borders">
        <h6 className="page-title py-1 ps-2 pe-2 text-md font-[600] opacity-80 flex items-center justify-between">
          <span>Menu</span>
          <button  onClick={()=>setShowMobileNav(false)} className="app-icon-button">
          <FaTimes className="scale-75" />
        </button>
          </h6>
        <div className="p-2">
          {navLinks.map(item =>
            <Link
              key={Object.keys(item)[0]}
              href={Object.values(item)[0]}
              className="app-navlink block py-2"
            >
              {Object.keys(item)[0]}
            </Link>
          )}
        </div>
         <div className="flex gap-3 p-2 pb-4">
        {loggedIn
          ? <Link href="/home" className="app-btn rounded-3xl w-full text-center">
              Home
            </Link>
          : <Link href="/login" className="app-btn rounded-3xl w-full text-center">
              Login
            </Link>}
        <AppDropdown
          title={
            <button className="app-btn py-1 inline-block w-full rounded-3xl">
              Theme
            </button>
          }
          items={themes}
          onUpdate={e => themeContext.setTheme(e)}
        />
      </div>
      </motion.div>
    </motion.aside>
          }
    </AnimatePresence>
    
    </>
  );
};

export default Header;

export const navLinks = [
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

const animations = {
  initial: {
    opacity: 0,
    translateY: "100%"
  },
  animate: {
    opacity: 1,
    translateY: "0%"
  },
  exit: {
    opacity: 0,
    translateY: "100%"
  }
}