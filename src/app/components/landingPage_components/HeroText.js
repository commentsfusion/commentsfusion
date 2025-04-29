import { motion } from "framer-motion";

export default function HeroText() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1 }}
      className="text-center max-w-2xl z-10"
    >
      <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
      Automate 200+ Comments & Turn 
        <span className="text-purple-400"> Engagement to Revenue !</span>
      </h1>
      <p className="mt-6 text-lg text-gray-300">
        Never miss a client! Automate comments, Capture leads,<br />Grow with AI.
      </p>

      <button className="mt-8 bg-cyan-400 text-black px-6 py-2 rounded-full font-medium shadow-lg hover:scale-105 transition-transform">
        🚀 Download Free Chrome Extension
      </button>

      <p className="mt-3 text-sm text-gray-400">No credit card required</p>
    </motion.div>
  );
}
