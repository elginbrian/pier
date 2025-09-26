"use client";

import Image from "next/image";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import WhyChooseUs from "../components/WhyChooseUs";
import StepsSection from "../components/StepsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />

      <main className="w-full m-0 p-0">
        <Hero />
        <AboutSection />
        <WhyChooseUs />
        <StepsSection />
        <TestimonialsSection />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
