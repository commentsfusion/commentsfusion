import Image from "next/image";
import { motion } from "framer-motion";

export default function Reviews() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="absolute bottom-10 flex items-center gap-6 p-4 bg-black/5 rounded-3xl border border-white/5 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.1)]"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
 
      </motion.div>
      <p className="text-white/90 font-medium text-sm">Reviews About us</p>
      <div className="flex gap-4">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-[#1a1a1a]/40 px-30 py-2 rounded-full flex items-center gap-2 text-white/90 backdrop-blur-sm border border-white/5 text-sm hover:bg-[#1a1a1a]/60 transition-colors"
        >
          Chrome Store <br />
          ⭐⭐⭐⭐⭐ 5.0
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="bg-[#1a1a1a]/40 px-30 py-2 rounded-full flex items-center gap-2 text-white/90 backdrop-blur-sm border border-white/5 text-sm hover:bg-[#1a1a1a]/60 transition-colors"
        >
          Trustpilot <br />
          ⭐⭐⭐⭐⭐
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="bg-[#1a1a1a]/40 px-30 py-2 rounded-full flex items-center gap-2 text-white/90 backdrop-blur-sm border border-white/5 text-sm hover:bg-[#1a1a1a]/60 transition-colors"
        >
          Clutch <br />
          ⭐⭐⭐⭐
        </motion.div>
      </div>
    </motion.div>
  );
}
