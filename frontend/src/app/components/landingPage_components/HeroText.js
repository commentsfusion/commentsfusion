import { motion } from "framer-motion";

export default function HeroText() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-center max-w-2xl z-10 mt-40 mx-auto px-4 sm:px-0"
    >
      <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
        Automate 200+ Comments & Turn
        <span className="text-purple-400"> Engagement to Revenue !</span>
      </h1>
      <p className="mt-6 text-lg text-gray-300">
        Never miss a client! Automate comments, Capture leads,<br />Grow with AI.
      </p>

      <button className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-md flex items-center justify-center gap-2 mx-auto my-6">
        <img
          src="/images/landing-page/chrome.svg"
          alt="Chrome Icon"
          className="w-5 h-5 inline-block align-middle"
        />
        Download Free Chrome Extension
      </button>

      <p className="mt-3 text-sm text-gray-400">No credit card required</p>
    </motion.div>
  );
}
