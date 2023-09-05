"use client"
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useRef, useState } from "react";

const IntroSection = () => {
  const [bgImage, setBgImage] = useState<string>(introData[0].img);

  const bgSection = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({offset: ["start 90%", "start start"], target: bgSection});
  const opacityTransform = useTransform(scrollYProgress, [0, 1], [0, 0.4]);
  return (
    <>
      <motion.section
      style={{
        opacity: opacityTransform,
        backgroundImage: `url(/img/${bgImage})`,
      }}
       className="fixed top-0 left-0 h-screen w-full bg-cover blur-md z-[0]" />
    <section ref={bgSection} className="py-10 ">
      {
        introData.map((item, i) => {
          return <div key={i} className="app-container md:pb-20 items-center justify-center">
        <div className="w-full md:w-6/12 relative h-64 md:h-[50vh] p-4 md:-right-12">
          <motion.div
          onViewportEnter={(e)=>{
            if(e?.boundingClientRect.bottom && e?.boundingClientRect.bottom < 50 && i != introData.length - 1)
              setBgImage(introData[i + 1].img);
            else
            setBgImage(item.img)
          }}
          onViewportLeave={(e)=>{
            if(i === 1 && e?.boundingClientRect.bottom && e?.boundingClientRect.bottom > 50)
              setBgImage(introData[0].img);
          }}
           className="relative h-full w-full">
            <Image
          loading="lazy"
              src={"/img/"+item.img}
              layout="fill"
              alt="Quilly, socio-blogging. best blog site"
              className="rounded-md app-shadow shadow-lg object-cover"
            />
          </motion.div>
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
    title: ["Unleash Your Creativity!",],
    img: "creative.avif",
    subTitle: `Welcome to our blog site, where creativity knows no bounds. Explore a treasure trove of thought-provoking articles, insightful tutorials, and inspiring stories that will ignite your imagination`
  },
  {
    title: ["Join A Flawless Community",],
    img: "community.avif",
    subTitle:`We believe in the power of community. Join a vibrant network of like-minded individuals who share their thoughts, experiences, and ideas through engaging discussions and interactive features.`
  },
  {
    title: ["Expertise at Your Fingertips"],
    img: "latest.avif",
    subTitle: `In a sea of blogs, ours stands out for its unparalleled expertise. We pride ourselves on curating content crafted by industry experts, seasoned professionals, and passionate enthusiasts.`
  },
];