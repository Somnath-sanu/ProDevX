"use client";

import { FeaturesSection } from "@/features/home/components/features-section";
import { FaqSection } from "@/features/home/components/faq-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { Footer } from "@/features/home/components/footer";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <FaqSection />
      <Footer />
    </div>
  );
}
