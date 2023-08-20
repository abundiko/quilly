"use client";

import AnimatedPage from "@/components/AnimatedPage";
import HeroSection from "@/components/index/HeroSection";
import { Helmet } from "react-helmet";
import { test } from "@/utils/server-actions";
import IntroSection from "@/components/index/IntroSection";
import OnboardingSection from "@/components/index/OnboardingSection";
import TestimonialsSection from "@/components/index/TestimonialsSection";

export default function Home() {
  return (
    <AnimatedPage>
      <Helmet>
        <title>Quilly | Home Page</title>
      </Helmet>
      <main className="">
        <HeroSection />
        <IntroSection />
        <OnboardingSection />
        <TestimonialsSection />
      </main>
    </AnimatedPage>
  );
}
