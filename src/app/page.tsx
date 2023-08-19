"use client";

import AnimatedPage from "@/components/AnimatedPage";
import HeroSection from "@/components/index/HeroSection";
import { Helmet } from "react-helmet";
import { test } from "@/utils/server-actions";
import IntroSection from "@/components/index/IntroSection";

export default function Home() {
  return (
    <AnimatedPage>
      <Helmet>
        <title>Quilly | Home Page</title>
      </Helmet>
      <main className="">
        <HeroSection />
        <IntroSection />
      </main>
    </AnimatedPage>
  );
}
