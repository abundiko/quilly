"use client";

import AnimatedPage from "@/components/AnimatedPage";
import HeroSection from "@/components/index/HeroSection";
import { Helmet } from "react-helmet";
import { test } from "@/utils/server-actions";

export default function Home() {
  return (
    <AnimatedPage>
      <Helmet>
        <title>Quilly | Home Page</title>
      </Helmet>
      <main className="">
        <HeroSection />
      </main>
    </AnimatedPage>
  );
}
