import React from "react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="h-screen relative z-[1] app-theme">
      <div className="absolute h-full w-full opacity-20 md:hidden bg-[url(/img/hero.avif)] bg-cover" />
      <div className="w-full h-full flex items-center relative">
        <div className="w-full md:w-8/12 lg:w-6/12 px-10 sm:px-14 lg:px-[5vw]">
          <h1 className="font-[700] text-5xl mb-4 lg:text-6xl leading-[1em]">
            Inking Thoughts
          </h1>

          <h1 className="font-[700] text-5xl mb-4 lg:text-6xl leading-[1em]">
            Sharing Stories
          </h1>

          <h1 className="font-[700] text-5xl mb-4 lg:text-6xl leading-[1em]">
            Inspiring Minds
          </h1>
          <p className="opacity-80 my-4">
            Dive into a world of words, where quills meet screens. Quilly is
            your creative space for storytelling, inspiration, and connection.
          </p>
          <div className="flex gap-2">
            <Link href="/signup" className="app-btn rounded-3xl">
              Get Started
            </Link>
            <Link href="/login" className="app-btn-bordered rounded-3xl">
              Login
            </Link>
          </div>
        </div>
        <div className="w-0 md:w-4/12 lg:w-6/12 h-full relative">
          <Image
            loading="lazy"
            src="/img/hero.avif"
            alt="a writer's hand"
            className="w-full h-full object-cover object-left-bottom"
            layout="fill"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
