"use client";

import AnimatedPage from "@/components/AnimatedPage";
import HeroSection from "@/components/index/HeroSection";
import { Helmet } from "react-helmet";
import IntroSection from "@/components/index/IntroSection";
import OnboardingSection from "@/components/index/OnboardingSection";
import TestimonialsSection from "@/components/index/TestimonialsSection";
import WhyChooseUs from "@/components/index/WhyChooseUs";
import Footer from "@/components/Footer";

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
        <WhyChooseUs />
        <Footer />
      </main>
    </AnimatedPage>
  );
}
