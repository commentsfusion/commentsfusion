"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/30 to-black/10 backdrop-blur-md border-b border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.2),0_0_12px_rgba(255,255,255,0.3),0_0_4px_rgba(255,255,255,0.4)]"
    >
      {/* Standardized container width and alignment for consistency */}
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/" className="flex items-center">
          <Image 
            src="/images/logo/logo.svg" 
            alt="Comment's Fusion Logo" 
            width={140} 
            height={40}
            className="h-14 w-auto"
          />
        </Link>
        <div className="hidden md:flex items-center space-x-12">
          {['Home', 'Features', 'Pricing', 'About us', 'Contact us'].map((item, idx) => (
            <Link 
              key={idx} 
              href="#" 
              className="text-white hover:text-cyan-400 transition-colors text-base font-medium"
            >
              {item}
            </Link>
          ))}
          <button className="bg-cyan-400 text-black px-6 py-2 rounded-full text-base font-semibold hover:bg-cyan-300 transition-colors shadow-[0_0_15px_0_rgba(34,211,238,0.4)]">
            Sign Up
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
