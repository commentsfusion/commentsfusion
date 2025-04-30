// components/ThreeSteps.js
import Image from "next/image";
import { motion } from "framer-motion";

export default function ThreeSteps() {
  return (
      <section className="bg-[#070720] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl text-sky-400 font-bold mb-2"
          >
            3 Simple Steps To Create
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold"
          >
            Highly Engaging Comments
          </motion.h2>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h4 className="text-xl font-semibold text-white mb-4">
              <span className="mr-2 text-sky-400">➞</span>
              AI-Powered Smart Commenting for LinkedIn
            </h4>

            <p className="text-gray-300 text-lg mb-6">
              Boost your engagement effortlessly with the Smart Comment button!
              Let AI generate personalized, relevant comments in just one click.
            </p>

            <ul className="space-y-4 text-base text-gray-300 mb-8">
              <li>🔹 <strong>Instant Engagement</strong> – A smart comment button under every post</li>
              <li>🔹 <strong>Customizable Tones</strong> – Choose from enlightenment, insight, self intro and convert to DM</li>
              <li>🔹 <strong>Automated Outreach</strong> – Engage with 50+ posts daily while staying authentic</li>
              <li>🔹 <strong>Targeted Interactions</strong> – Connect with industry leaders & prospects instantly</li>
            </ul>

            <p className="text-lg mb-4">Click, Comment, Convert! Let AI handle engagement while you focus on closing deals.</p>

            <button className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-md">
              🚀 Download Free Chrome Extension
            </button>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <div className="rounded-2xl overflow-hidden shadow-lg border border-cyan-400 p-2">
              <Image
                src="/images/landing-page/smart-commenting.gif" 
                alt="Smart Commenting Demo"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>
  );
}
