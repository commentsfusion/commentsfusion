"use client";

import { motion } from "framer-motion";

export default function OneClickSmartCommenting() {
  return (
    <section className="bg-[#070720] text-white py-20 px-6">
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
            One-Click Smart Commenting
          </h2>
          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            Engage instantly with AI-powered comments on LinkedIn! 
            The Smart Comment button generates personalized, relevant responses in just one click.
          </p>
          <ul className="text-gray-300 space-y-4 mb-8 pl-4">
            <li className="flex items-start">
              <span className="text-cyan-400 mr-3 mt-1">●</span>
              <span>Effortless Engagement – No more typing, just click & comment</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-3 mt-1">●</span>
              <span>AI-Personalized Responses – Match your tone & brand voice</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-3 mt-1">●</span>
              <span>Boost Visibility – Stay active without the manual effort</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-3 mt-1">●</span>
              <span>Smart Networking – Connect with industry leaders & prospects</span>
            </li>
          </ul>
          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            Click, Comment, Convert! Let AI do the work while you focus on what matters.
          </p>

          {/* Button */}
          <motion.a
            href="#"
            className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            Download Free Chrome Extension
          </motion.a>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2"
        >
          <div className="rounded-3xl overflow-hidden shadow-xl border border-white/10 bg-white/5 p-2">
            <img 
              src="/images/landing-page/oneClick-smartCommenting.gif" 
              alt="One Click Smart Commenting Demo" 
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
