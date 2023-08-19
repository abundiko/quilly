"use client"
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";

const IntroSection = () => {
  const bgSection = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({offset: ["start 90%", "start start"], target: bgSection});
  const opacityTransform = useTransform(scrollYProgress, [0, 1], [0, 0.2]);
  return (
    <>
      <motion.section
      style={{
        opacity: opacityTransform
      }}
       className="fixed top-0 left-0 h-screen w-full bg-[url(/img/test.jpg)] bg-cover blur-md z-[0]" />
    <section ref={bgSection} className="py-10 ">
      {
        introData.map((item, i) => {
          return <div key={i} className="app-container md:pb-20 items-center justify-center">
        <div className="w-full md:w-6/12 relative h-64 md:h-[50vh] p-4 md:-right-12">
          <div className="relative h-full w-full">
            <Image
              src="/img/hero.jpg"
              layout="fill"
              alt="Hand writing"
              className="rounded-md app-shadow shadow-lg object-cover"
            />
          </div>
        </div>
        <div className="w-11/12 md:w-6/12 h-[50vh] p-4 md:-left-12 relative -top-20 md:top-12">
          <div className="p-4 rounded-lg shadow-lg h-full flex items-center border app-borders content-center flex-wrap app-shadows backdrop-blur-sm app-theme app-bg-opacity">
              {item.title.map(title=>
            <h1 key={title} className="font-bold text-3xl md:text-4xl w-full ">
              {title}
            </h1>
              )}
          <p className="text-md opacity-80 mt-3">{item.subTitle} </p>
          </div>
        </div>
      </div>
        })
      }
      
    </section>
    </>
  );
};

export default IntroSection;

const introData = [
  {
    title: ["Be You!","Express You!"],
    subTitle: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quae
            consequatur doloremque voluptatum nobis odit harum quod expedita
            libero dolor fuga, `
  },
  {
    title: ["Be You!","Express You!"],
    subTitle: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quae
            consequatur doloremque voluptatum nobis odit harum quod expedita
            libero dolor fuga, `
  },
  {
    title: ["Be You!","Express You!"],
    subTitle: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quae
            consequatur doloremque voluptatum nobis odit harum quod expedita
            libero dolor fuga, `
  },
];