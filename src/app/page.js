// app/components/HeroSection.js
"use client";

import Navbar from "./components/Navbar";
import Logo from "./components/Logo";
import HeroText from "./components/HeroText";
import Reviews from "./components/Reviews";
import DecorativeBirds from "./components/DecorativeBirds";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-white bg-gradient-to-b from-[#0f0f3e] to-[#070720] p-6 relative overflow-hidden">
      <Logo />
      <Navbar />
      <HeroText />
      <DecorativeBirds />
      <Reviews />
    </section>
  );
}
