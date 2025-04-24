// app/components/HeroSection.js
"use client";

import Navbar from "./components/Navbar";
import HeroText from "./components/HeroText";
import Reviews from "./components/Reviews";
import DecorativeBirds from "./components/DecorativeBirds";
import FeaturesSection from "./components/FeaturesSection";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <section className="min-h-screen flex flex-col justify-center items-center text-white bg-gradient-to-b from-[#0f0f3e] to-[#070720] relative overflow-hidden">
        <HeroText />
        <DecorativeBirds />
        <Reviews />
      </section>
      <FeaturesSection />

    </main>
  );
}
