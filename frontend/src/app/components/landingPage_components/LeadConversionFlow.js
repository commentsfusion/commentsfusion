"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LeadConversionFlow() {
return (
    <section className="py-20 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Freelancer Struggling to <br/>
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent " > Turn Cold Leads into Clients</span>
          </h2>
        </motion.div>

        <motion.div 
          className="relative w-full max-w-4xl mx-auto h-[1300px]"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Image
            src="/images/landing-page/lead.svg"
            alt="Lead Conversion Flow"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
 
      </div>
    </section>
  );
}
