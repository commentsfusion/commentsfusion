"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/30 to-black/10 backdrop-blur-md border-b border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.2),0_0_12px_rgba(255,255,255,0.3),0_0_4px_rgba(255,255,255,0.4)]"
    >
      <nav className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo/logo.svg"
            alt="Comment's Fusion Logo"
            width={140}
            height={40}
            className="h-14 w-auto"
          />
        </Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-12">
          {["Home", "Features", "Pricing", "About us", "Contact us"].map((item, idx) => (
            <Link
              key={idx}
              // href={item === "Pricing" ? "/pricing" : item === "Features" ? "/features" : item === "Home" ? "/" : "#"}
              href={ item === "Pricing" ? "/pricing" : item === "Features" ? "/features" : item === "About us"  ? "/about-us" : item === "Contact us" ? "/contact-us" : "/"}
              className="text-white hover:text-cyan-400 transition-colors text-base font-medium"
            >
              {item}
            </Link>
          ))}
          <button className="bg-cyan-400 text-black px-6 py-2 rounded-full text-base font-semibold hover:bg-cyan-300 transition-colors shadow-[0_0_15px_0_rgba(34,211,238,0.4)]">
            Sign Up
          </button>
        </div>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none"
          aria-label="Open menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </nav>
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg px-6 py-4 flex flex-col space-y-4">
          {["Home", "Features", "Pricing", "About us", "Contact us"].map((item, idx) => (
            <Link
              key={idx}
              // href={item === "Pricing" ? "/pricing" :  item === "Features" ? "/features" : item === "Home" ? "/" : "#"}
              href={item === "Pricing" ? "/pricing" : item === "Features" ? "/features" : item === "About us" ? "/about-us"  : item === "Contact us"  ? "/contact-us" : "/" }
              className="text-white hover:text-cyan-400 transition-colors text-base font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </Link>
          ))}
          <button className="bg-cyan-400 text-black px-6 py-2 rounded-full text-base font-semibold hover:bg-cyan-300 transition-colors shadow-[0_0_15px_0_rgba(34,211,238,0.4)]">
            Sign Up
          </button>
        </div>
      )}
    </motion.header>
  );
}
