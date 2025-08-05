"use client";

import Layout from "../components/layout";
import MobileLayout from "../components/mobileLayout";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const tones = [
  {
    title: "Enlightenment",
    description:
      "The above is a LinkedIn post, and I would like to comment on it to engage with the author. The author is a senior executive at a large enterprise. I have never met and spoken with the author before, so our engagement must be professional and casual. Please don't be rude.",
  },
  {
    title: "Insights",
    description:
      "The above is a LinkedIn post, and I would like to comment on it to engage with the author. The author is a senior executive at a large enterprise. I have messaged and emailed the author, so the engagement can be reasonably casual but must remain professional.",
  },
  {
    title: "Self Intro",
    description:
      "The above is a LinkedIn post, and I would like to comment on it to engage with the author. The author is a senior executive at a large enterprise. I have messaged and emailed the author before, so the engagement can be reasonably casual but must remain professional.",
  },
  {
    title: "Convert into DM",
    description:
      "The above is a LinkedIn post, and I would like to comment on it to engage with the author. The author is a senior executive at a large enterprise. I have never met and spoken with the author before, so our engagement must be professional and casual. Please don't be rude.",
  },
];

export default function CustomizeAI() {
  const [screenType, setScreenType] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setScreenType("desktop");
      else if (width >= 768) setScreenType("tablet");
      else setScreenType("mobile");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ToneCard = ({ tone, index }) => (
    <motion.div
      key={index}
      whileTap={{ scale: screenType === "mobile" ? 0.95 : 1 }}
      className={`
        ${screenType === "mobile" 
          ? "bg-[#000000CC] opacity-85 border-blue-300 rounded-[14px] hover:scale-104 transition-transform duration-300 ease-in-out cursor-pointer overflow-hidden shadow-lg backdrop-blur-md" 
          : screenType === "tablet"
          ? "bg-black/90 border-[#1B9DBF] rounded-xl shadow-md backdrop-blur-md"
          : "bg-black/60 backdrop-blur-md border-white/20 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        } 
        flex flex-col border p-3 lg:p-6 lg:space-y-4 space-y-2
      `}
    >
      <div className="flex items-center space-x-2 mb-2 lg:mb-0">
        <Image
          src="/images/customise_AI/toneIcon.svg"
          alt="Tone Icon"
          width={screenType === "desktop" ? 20 : screenType === "tablet" ? 16 : 18}
          height={screenType === "desktop" ? 20 : screenType === "tablet" ? 16 : 18}
        />
        <h3 className={`
          ${screenType === "desktop" ? "text-xl" : "text-[14px]"} 
          font-semibold lg:font-semibold text-white
          ${screenType === "mobile" ? "font-bold truncate" : ""}
        `}>
          {tone.title}
        </h3>
      </div>

      <div className={`
        ${screenType === "mobile" 
          ? "w-full bg-[#33C6F470] p-2 rounded-[10px] overflow-hidden flex-1" 
          : "bg-[#33C6F470]/60 rounded-lg p-4 lg:p-4 md:p-2 overflow-hidden"
        }
      `}>
        <p className={`
          ${screenType === "desktop" 
            ? "text-slate-100 text-sm break-words line-clamp-5" 
            : screenType === "tablet"
            ? "text-white text-xs"
            : "text-[12.5px] text-white break-words line-clamp-4"
          }
        `}>
          {tone.description}
        </p>
      </div>
    </motion.div>
  );

  const AddToneCard = () => (
    <div className={`
      ${screenType === "tablet" 
        ? "col-span-2 flex justify-center h-40" 
        : "flex flex-col items-center justify-center"
      }
    `}>
      <div className={`
        ${screenType === "tablet"
          ? "flex flex-col items-center justify-center bg-black/90 border border-[#1B9DBF] rounded-xl p-3 shadow-md backdrop-blur-md w-[80%] max-w-xs"
          : "flex flex-col items-center justify-center bg-black/60 backdrop-blur-md border border-white/20 rounded-xl lg:rounded-xl shadow-lg p-4 lg:p-6 cursor-pointer hover:shadow-xl transition-shadow space-y-2"
        }
        ${screenType === "mobile" ? "rounded-[14px]" : ""}
      `}>
        <Image
          src="/images/customise_AI/addToneIcon.svg"
          alt="Add Tone Icon"
          width={screenType === "desktop" ? 40 : screenType === "tablet" ? 28 : 32}
          height={screenType === "desktop" ? 40 : screenType === "tablet" ? 26 : 32}
        />
        <span className={`
          ${screenType === "desktop" ? "text-lg" : "text-sm"} 
          font-medium text-white
        `}>
          Add tone
        </span>
      </div>
    </div>
  );

  const content = (
    <div className={`
      ${screenType === "desktop" ? "h-full p-6" : screenType === "tablet" ? "min-h-screen bg-gradient-to-b from-black via-[#00252C] to-[#33C6F4] p-2 text-white font-sans" : "p-1 space-y-2"}
      relative
    `}>
      <Head>
        <title>Customize AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={`flex items-center justify-between ${screenType === "desktop" ? "mb-6" : "mb-6"}`}>
        <div className={`flex items-center ${screenType === "desktop" ? "space-x-4" : screenType === "tablet" ? "space-x-4" : "space-x-1"}`}>
          <Image
            src="/images/customise_AI/customiseAIIcon.svg"
            alt="Customize AI Icon"
            width={screenType === "desktop" ? 30 : 24}
            height={screenType === "desktop" ? 30 : 24}
          />
          <h1 className={`
            ${screenType === "desktop" ? "text-4xl" : "text-2xl"} 
            font-semibold lg:font-semibold text-white
            ${screenType === "tablet" ? "font-bold" : ""}
          `}>
            Customize AI
          </h1>
        </div>

        {screenType !== "mobile" && (
          <button
            className={`
              ${screenType === "desktop" 
                ? "inline-flex items-center justify-center space-x-2 bg-[#33C6F4] text-white w-[130px] h-[42px] rounded-[10px] font-medium text-base shadow-[0_2px_5px_5px_#33C6F4]"
                : "bg-[#33C6F4] px-3 py-1 text-sm rounded-md flex items-center space-x-2 shadow-[0_2px_5px_3px_#33C6F4]"
              }
            `}
          >
            <Image
              src="/images/customise_AI/plusIcon.svg"
              alt="Add Tone Icon"
              width={screenType === "desktop" ? 16 : 8}
              height={screenType === "desktop" ? 16 : 8}
            />
            <span>Add tone</span>
          </button>
        )}
      </div>

      <p className={`
        ${screenType === "desktop" 
          ? "text-slate-300 mb-8" 
          : screenType === "tablet"
          ? "text-sm text-slate-300 mb-6"
          : "mt-4 text-slate-300 text-sm mb-4"
        }
      `}>
        {screenType === "tablet" 
          ? "Create and manage AI-generated tones to enhance your LinkedIn interactions."
          : "Generate customized AI-driven tones to elevate your LinkedIn communications."
        }
      </p>

      <div className={`
        ${screenType === "desktop" 
          ? "grid grid-cols-3 gap-6" 
          : screenType === "tablet"
          ? "grid grid-cols-2 gap-6"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-1"
        }
      `}>
        {tones.map((tone, index) => (
          <ToneCard key={index} tone={tone} index={index} />
        ))}
        
        <AddToneCard />
      </div>
    </div>
  );

  if (screenType === "desktop" ) return <Layout>{content}</Layout>;
  return <MobileLayout>{content}</MobileLayout>;
}