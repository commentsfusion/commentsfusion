"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-md border-b border-white/10"
    >
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
        <div className="flex items-center gap-8">
          {['Home', 'Features', 'Pricing', 'About us', 'Contact us'].map((item, idx) => (
            <Link 
              key={idx} 
              href="#" 
              className="text-white/90 hover:text-cyan-400 transition-colors text-sm font-medium"
            >
              {item}
            </Link>
          ))}
          <button className="bg-cyan-400 text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-cyan-300 transition-colors">
            Sign Up
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
