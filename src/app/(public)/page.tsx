"use client";

import AnimatedPage from "@/components/AnimatedPage";
import HeroSection from "@/components/index/HeroSection";
import IntroSection from "@/components/index/IntroSection";
import OnboardingSection from "@/components/index/OnboardingSection";
import TestimonialsSection from "@/components/index/TestimonialsSection";
import WhyChooseUs from "@/components/index/WhyChooseUs";

export const metadata = {
  title: "Quilly | Home",
  desctiption: "Home of professionally crafted contents",
  openGraph: {
    title: "Quilly | Home",
    description: "Home of professionally crafted contents",
    images: [
      {
        url: "/img/hero-snapshot.png",
        width: 800,
        height: 600,
        alt: "Quilly Logo"
      }
    ],
    site_name: "Quilly"
  }
};

export default function Home() {
  return (
    <AnimatedPage>
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
