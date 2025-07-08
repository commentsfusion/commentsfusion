"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

function NewfeaturesSection() {
  const features = [
    {
      title: "Instant Engagement",
      description:
        "Capture attention and spark conversation effortlessly with AI-powered, contact-aware comments that drive meaningful interactions and boost visibility in real time.",
      icon: "images/landing-page/clientAcquisition1.svg",
    },
    {
      title: "All languages supported",
      description:
        "Expand your reach with AI-driven, multilingual comments that engage and convert audiences worldwide. Communicate effectively, no matter the language!",
      icon: "images/landing-page/clientAcquisition2.svg",
    },
    {
      title: "Secure & Reliable",
      description:
        "Your data and interactions are fully protected with advanced encryption, ensuring a safe and seamless experience while maximizing client engagement.",
      icon: "images/landing-page/clientAcquisition3.svg",
    },
    {
      title: "Personalized tone",
      description:
        "Engage with your audience using AI-crafted comments that match your online voice, ensuring authentic and meaningful interactions that drive conversions.",
      icon: "images/landing-page/clientAcquisition4.svg",
    },
  ];

  return (
    <>
      <div>
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
        <h2 className="text-center text-5xl font-bold mb-4 max-lg:text-4xl max-md:text-3xl">
          Powerful Features to Supercharge Your <br />
          <span className="text-[#33C6F4]">Client Acquisition</span>
        </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-x-30 mt-10 max-lg:gap-x-0 max-lg:mt-30">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 120 
              }}
            
            
    className={`w-96 max-lg:w-87 bg-[#000000] h-75 max-lg:h-67 max-md:w-68 max-md:h-55  mt-20 max-lg:mt-0 rounded-[30px] shadow-[0_0_10px_#33C6F4,_10px_0_10px_#33C6F4,_-10px_0_10px_#33C6F4,_0_10px_10px_#33C6F4,_0_-10px_10px_#33C6F4] flex flex-col items-center py-11 px-7 max-lg:px-4 max-lg:py-6 max-md:px-3 hover:scale-104  transition-transform duration-300 ease-in-out
    ${index === 0 ? "max-lg:mr-[-15px]" : ""}
    ${index === 1 ? "max-lg:mt-50 max-lg:ml-[-15px] max-md:mt-46" : ""}
    ${index === 2 ? "max-lg:mt-[-60px] max-lg:mr-[-15px] max-md:mt-[-40px]" : ""}
    ${index === 3 ? "max-lg:mt-37 max-lg:ml-[-15px]" : ""}
  `}
            >
              <Image
                src={item.icon}
                width={45}
                height={30}
                alt="Client Acquisition"
                className="w-11 max-md:w-9"
              />
              <h1 className="text-center text-2xl max-lg:text-[21px] mt-7 max-md:mt-4">{item.title}</h1>
              <p className="text-center text-[14px] max-lg:text-[13px] max-md:text-[12px] mt-5 max-md:mt-3">{item.description}</p>
            
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

export default NewfeaturesSection;
