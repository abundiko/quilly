"use client";

import AnimatedPage from "@/components/AnimatedPage";
import AppHead from "@/components/AppHead";
import HeroSection from "@/components/index/HeroSection";
import IntroSection from "@/components/index/IntroSection";
import OnboardingSection from "@/components/index/OnboardingSection";
import TestimonialsSection from "@/components/index/TestimonialsSection";
import WhyChooseUs from "@/components/index/WhyChooseUs";

export default function Home() {
  return (
    <AnimatedPage>
      <AppHead />
      <main className="">
        <HeroSection />
        <IntroSection />
        <OnboardingSection />
        <TestimonialsSection />
        <WhyChooseUs />
      </main>
    </AnimatedPage>
  );
}
