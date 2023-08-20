import Image from "next/image";
import React, { useState } from "react";
import { FaQuoteRight, FaQuoteLeft } from "react-icons/fa";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(2);
  return (
    <section className="app-theme relative">
      <section className="py-16 bg-[#00000011] dim:bg-[#00000033] dark:bg-[#ffffff11]">
        <div className="app-container">
          <div className="w-full text-center">
            <h1 className="font-bold text-3xl md:text-5xl">What Users Say</h1>
            <p className="opacity-80 text-lg my-4">
              <span className="app-primary-text font-[600]">Quilly </span>stands
              out as the premier destination for consuming and crafting
              exceptional written content.
            </p>
            <div className="w-full flex items-center justify-center">
              <Image
                src="/img/test.jpg"
                height={60}
                width={60}
                alt="user name"
                className="shadow-md aspect-square app-shadows object-cover rounded-full mx-2 cursor-pointer p-1 hover:p-0 app-theme-opposite"
              />
              <Image
                src="/img/test.jpg"
                height={60}
                width={60}
                alt="user name"
                className="shadow-md aspect-square app-shadows object-cover rounded-full mx-2 cursor-pointer hover:scale-90"
              />
              <div className="w-11/12 md:w-8/12 lg:w-[24em] app-theme-opposite p-5 md:p-8 border app-borders shadow-lg app-shadows rounded-3xl flex flex-col items-center justify-center">
                <Image
                  src="/img/test.jpg"
                  height={100}
                  width={100}
                  alt="user name"
                  className="shadow-md aspect-square app-shadows object-cover rounded-full"
                />
                <h4 className="my-5 font-[600] text-xl">John Doe</h4>
                <p className="relative opacity-80 text-md">
                  <FaQuoteLeft
                    size={20}
                    className="absolute -top-3 -left-3 opacity-40"
                  />

                  <FaQuoteRight
                    size={20}
                    className="absolute -bottom-3 -right-3 opacity-40"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default TestimonialsSection;

const testimonialsData = [
  {
    img: "test.jpg",
    title: "John Doe",
    subTitle: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis
                  aliquid sequi esse dolor praesentium, iure expedita porro
                  similique perferendis maiores non velit, illum quod omnis!
                  Aperiam dignissimos reprehenderit fugit a.`
  },
  {
    img: "test.jpg",
    title: "John Doe",
    subTitle: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis
                  aliquid sequi esse dolor praesentium, iure expedita porro
                  similique perferendis maiores non velit, illum quod omnis!
                  Aperiam dignissimos reprehenderit fugit a.`
  },
  {
    img: "test.jpg",
    title: "John Doe",
    subTitle: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis
                  aliquid sequi esse dolor praesentium, iure expedita porro
                  similique perferendis maiores non velit, illum quod omnis!
                  Aperiam dignissimos reprehenderit fugit a.`
  },
  {
    img: "test.jpg",
    title: "John Doe",
    subTitle: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis
                  aliquid sequi esse dolor praesentium, iure expedita porro
                  similique perferendis maiores non velit, illum quod omnis!
                  Aperiam dignissimos reprehenderit fugit a.`
  },
  {
    img: "test.jpg",
    title: "John Doe",
    subTitle: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis
                  aliquid sequi esse dolor praesentium, iure expedita porro
                  similique perferendis maiores non velit, illum quod omnis!
                  Aperiam dignissimos reprehenderit fugit a.`
  }
];
