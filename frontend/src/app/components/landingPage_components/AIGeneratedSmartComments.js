"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AIGeneratedSmartComments() {
  return (
    <section className="text-white py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* Left Side - Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left w-full lg:w-1/2"
        >
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
            <span className="text-cyan-400 text-4xl">➞</span>
            AI-Generated Smart Comments
          </h2>
          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            Turn conversations into opportunities with AI-powered, personal comments on LinkedIn!
          </p>
          <ul className="text-gray-300 space-y-4 mb-8 pl-4">
            <li className="flex items-start">
              <span className="text-cyan-400 mr-3 mt-1">●</span>
              <span>Effortless Engagement - Instantly generated relevant responses</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-3 mt-1">●</span>
              <span>Customizable Tones - Match your brand voice (Professional, Witty, Friendly, etc.)</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-3 mt-1">●</span>
              <span>Boost Visibility - Increase reach & credibility with meaningful interactions</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-3 mt-1">●</span>
              <span>Drive Conversations - Build relationships and convert prospects seamlessly</span>
            </li>
          </ul>
          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            Click, Comment, Convert! Let AI handle engagement while you focus on growth.
          </p>

          {/* Button */}
          <button className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-md flex items-center justify-center gap-2">
            <img
              src="/images/landing-page/chrome.svg"
              alt="Chrome Icon"
              className="w-5 h-5 inline-block align-middle"
            />
            Download Free Chrome Extension
          </button>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 flex justify-center"
        >
          <div className="rounded-xl overflow-hidden shadow-md border border-cyan-400 p-2 max-w-[460px]">
            <Image
              src="/images/landing-page/AI-generatedSmartComments.gif"
              alt="AI Generated Smart Comments Demo"
              width={320}
              height={240}
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>
        </motion.div>


      </div>
    </section>
  );
}
