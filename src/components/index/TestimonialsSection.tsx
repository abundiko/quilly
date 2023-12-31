"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform
} from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaQuoteRight, FaQuoteLeft } from "react-icons/fa";

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const transformedValue = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const transformedValue2 = useTransform(scrollYProgress, [0, 1], [-50, 400]);

  const [currentIndex, setCurrentIndex] = useState<number>(2);
  const [filteredArray, setFilteredArray] = useState<
    { img: string; title: string; index: number }[]
  >(testimonialsData.filter((item, i) => i != 2));

  useEffect(
    () => {
      setFilteredArray(testimonialsData.filter((item, i) => i != currentIndex));
    },
    [currentIndex]
  );
  const animationVariants = {
    initial: { translateY: 50, opacity: 0 },
    animate: { translateY: 0, opacity: 1 },
    exit: { translateY: -50, opacity: 0 }
  };
  return (
    <section ref={sectionRef} className="app-theme relative">
      <div className="absolute h-full w-full top-0 left-0 overflow-hidden">
        <motion.div
          style={{ translateY: transformedValue2 }}
          className="absolute -right-60 bottom-[30vh] opacity-10 h-96 w-96 aspect-square bg-primary-light bg-opacity-40 dim:bg-opacity-40 dark:bg-opacity-40 rounded-full"
        />
        <motion.div
          style={{ top: transformedValue }}
          className="absolute left-20 opacity-10"
        >
          <FaQuoteLeft className="text-7xl" />
        </motion.div>
      </div>
      <section className="py-16 relative bg-[#00000011] dim:bg-[#00000033] dark:bg-[#ffffff11]">
        <div className="app-container">
          <div className="w-full text-center">
            <h1 className="font-bold text-3xl md:text-5xl">What Users Say</h1>
            <p className="opacity-80 text-lg my-4">
              <span className="app-primary-text font-[600]">Quilly </span>stands
              out as the premier destination for consuming and crafting
              exceptional written content.
            </p>
            <div className="w-full flex items-center justify-center mt-3">
              <TestimonialsCircleImage
                key={0}
                src={filteredArray[0].img}
                alt={filteredArray[0].title}
                action={() => setCurrentIndex(filteredArray[0].index)}
                className="hidden md:block"
              />
              <TestimonialsCircleImage
                key={1}
                src={filteredArray[1].img}
                alt={filteredArray[1].title}
                action={() => setCurrentIndex(filteredArray[1].index)}
                big
                className=" hidden md:block"
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialsData[currentIndex].img}
                  variants={animationVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-11/12 md:w-8/12 lg:w-[24em] app-theme-opposite p-6 md:p-8 border app-borders shadow-lg app-shadows rounded-3xl flex flex-col items-center justify-center"
                >
                  <Image
                    loading="lazy"
                    src={`/img/${testimonialsData[currentIndex].img}`}
                    height={100}
                    width={100}
                    alt={testimonialsData[currentIndex].title}
                    className="shadow-md aspect-square app-shadows object-cover rounded-full"
                  />
                  <p className="my-5 font-[600] text-xl">
                    {testimonialsData[currentIndex].title}
                  </p>
                  <p className="relative opacity-80 text-md">
                    <FaQuoteLeft
                      size={20}
                      className="absolute -top-3 -left-3 opacity-40"
                    />
                    {testimonialsData[currentIndex].subTitle}
                    <FaQuoteRight
                      size={20}
                      className="absolute -bottom-3 -right-3 opacity-40"
                    />
                  </p>
                </motion.div>
              </AnimatePresence>
              <TestimonialsCircleImage
                key={2}
                src={filteredArray[2].img}
                alt={filteredArray[2].title}
                action={() => setCurrentIndex(filteredArray[2].index)}
                big
                className=" hidden md:block"
              />
              <TestimonialsCircleImage
                key={3}
                src={filteredArray[3].img}
                alt={filteredArray[3].title}
                action={() => setCurrentIndex(filteredArray[3].index)}
                className="hidden md:block"
              />
            </div>
            <div className="md:hidden w-full flex justify-center py-2 mt-3">
              {filteredArray.map((item, i) =>
                <TestimonialsCircleImage
                  key={i}
                  src={filteredArray[i].img}
                  alt={filteredArray[i].title}
                  action={() => setCurrentIndex(filteredArray[i].index)}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default TestimonialsSection;

const TestimonialsCircleImage = ({
  src,
  alt,
  action,
  className,
  big
}: {
  src: string;
  alt: string;
  className?: string;
  action: () => void;
  big?: boolean;
}) => {
  return (
    <Image
      loading="lazy"
      onClick={action}
      src={`/img/${src}`}
      height={big ? 100 : 60}
      width={big ? 100 : 60}
      alt={alt}
      className={`shadow-md aspect-square app-shadows object-cover rounded-full mx-3 cursor-pointer p-1 hover:p-0 app-theme-opposite ${className}`}
    />
  );
};

const testimonialsData = [
  {
    img: "test.avif",
    title: "Maria Santos",
    subTitle: `Quilly has been an incredible platform for me to connect with like-minded individuals from around the world. The diverse range of perspectives and engaging discussions have broadened my horizons. Highly recommended!`,
    index: 0
  },
  {
    img: "hero.avif",
    title: "Hiroshi Tanaka",
    subTitle: `As a passionate blogger, Quilly has provided me with an ideal space to share my thoughts and ideas. The supportive community and user-friendly interface make it easy to express myself and connect with fellow bloggers. Thumbs up!`,
    index: 1
  },
  {
    img: "latest.avif",
    title: "Sophie Dupont",
    subTitle: `Quilly is my go-to platform for staying up-to-date with the latest trends and insights across various topics. The informative articles and engaging content keep me inspired and motivated. A must-visit for any curious mind!`,
    index: 2
  },
  {
    img: "creative.avif",
    title: "Luca Rossi",
    subTitle: `Being a creative enthusiast, Quilly has been a treasure trove of inspiration. The vibrant community and diverse range of artistic expressions have fueled my imagination and pushed the boundaries of my creativity. Truly exceptional!`,
    index: 3
  },
  {
    img: "community.avif",
    title: "Sakura Yamamoto",
    subTitle: `Quilly has brought people together from all walks of life, fostering a sense of unity and understanding. The supportive community and thought-provoking discussions have made me feel right at home. Joining Quilly was one of the best decisions I've made!`,
    index: 4
  }
];
