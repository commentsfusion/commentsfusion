"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
  // First Row - Left
  {
    img: "/images/landing-page/1.png",
    style: "left-[12%] top-[-5%] max-lg:top-[8%]",
    textAlign: "text-left",
  },
  // Arrow to Right
  {
    img: "/images/landing-page/right-Arrow.png",
    style: "left-[45%] top-[-1%] max-lg:top-[9%]",
    isArrow: true,
  },
  // First Row - Right
  {
    img: "/images/landing-page/2.png",
    style: "left-[65%] top-[-5%] max-lg:top-[8%]",
    textAlign: "text-right",
  },
  // Second Row - Right
  {
    img: "/images/landing-page/3.png",
    style: "left-[25%] top-[21%] max-lg:top-[28%]",
    textAlign: "text-right",
  },
  // Arrow to Left
  {
    img: "/images/landing-page/left-Arrow.png",
    style: "left-[49%] top-[25%] max-lg:top-[29%]",
    isArrow: true,
  },
  // Second Row - Left
  {
    img: "/images/landing-page/4.png",
    style: "left-[65%] top-[23%] max-lg:top-[29%]",
    textAlign: "text-left",
  },
  // Third Row - Left
  {
    img: "/images/landing-page/5.png",
    style: "left-[25%] top-[48%] max-lg:top-[49%]" ,
    textAlign: "text-left",
  },
  // Arrow to Right
  {
    img: "/images/landing-page/right-Arrow.png",
    style: "left-[50%] top-[50%]",
    isArrow: true,
  },
  // Third Row - Right
  {
    img: "/images/landing-page/6.png",
    style: "left-[65%] top-[47%] max-lg:top-[48%]",
    textAlign: "text-right",
  },
   // Arrow to Left
  {
    img: "/images/landing-page/left-Arrow.png",
    style: "left-[68%] top-[76%] ",
    isArrow: true,
  },
  // Final Centered Step
  {
    img: "/images/landing-page/7.png",
    style: "left-[35%] top-[70%] max-lg:top-[67%]",
    textAlign: "text-center",
  },
];

export default function LeadConversionFlow() {
  return (
    <section className="py-20 text-white">
      <div className="container mx-auto px-4 flex flex-col items-center">
        
 <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
         <h2 className="text-center text-5xl font-bold mb-30 mt-10 max-lg:text-4xl max-md:text-3xl max-lg:mb-0">
         Freelancer Struggling to <br />
          <span className="text-[#33C6F4]">Turn Cold Leads into Clients</span>
        </h2>
        </motion.div>

        
        
        
        <div className="text-center mb-12 max-lg:mt-[-50px]"></div>
        <div className="relative w-full max-w-5xl mx-auto min-h-[1000px] md:min-h-[1200px] flex justify-center">
          <Image
            src="/images/landing-page/Clip-path-group.svg"
            alt="Lead Flow Path"
            fill
            className="object-contain pointer-events-none select-none"
            style={{ zIndex: 0 }}
            priority
          />

          {steps.map((step, idx) =>
            step.isArrow ? (
              <div
                key={idx}
                className={`absolute ${step.style} z-10`}
                style={{ width: "7%", height: "10%" }}
              >
                <Image
                  src={step.img}
                  alt={step.isArrow ? "Arrow" : step.label || "Lead Step"}
                  fill
                  className="object-contain"
                  draggable={false}
                  priority
                />
              </div>
            ) : (
              <motion.div
                key={idx}
                className={`absolute ${step.style} z-20 flex flex-col items-center`}
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  width: idx === 9 ? "20%" : "20%",
                  minHeight: idx === 9 ? "220px" : "180px",
                  height: "auto",
                }}
              >
                <div className="relative w-full aspect-[4/5]">
                  <Image
                    src={step.img}
                    alt={step.label || "Lead Step"}
                    fill
                    className="object-contain rounded-xl"
                    draggable={false}
                    priority
                  />
                </div>
                {step.label && (
                  <div
                    className={`mt-3 text-base md:text-lg font-semibold whitespace-pre-line ${step.textAlign} max-w-[200px]`}
                  >
                    {step.label}
                  </div>
                )}
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}