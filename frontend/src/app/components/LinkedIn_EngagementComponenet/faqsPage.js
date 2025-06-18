"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { allData, allData2, questionHeading, btnText } from "./faqsData";

export default function FaqsPage({ currentPage }) {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const visiblePages = ["LinkedIn_EngagementStrategy",];

  const faqDataToUse =
    currentPage === "LinkedIn_EngagementStrategy"
      ? allData
      : currentPage === "features"
      ? allData2
      : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full flex flex-col items-center pt-24 gap-6">
        <div className="w-[60%] bg-[#000000] opacity-80 rounded-[10px] py-10 pb-16 px-8 text-white">
          <h1 className="text-center text-3xl font-bold text-white mb-4">
            FAQ’s
          </h1>

          {faqDataToUse.map((item) => (
            <div key={item.id}>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(item.id)}
              >
                <h2 className="text-lg">{item.title}</h2>
                <img
                  className={`w-6 h-6 transform transition-transform duration-300 ${
                    openId === item.id ? "rotate-180" : ""
                  }`}
                  src="/images/LinkedIn_EngagementStrategy/downArrow.svg"
                  alt="Toggle"
                />
              </div>

              <hr className="my-3 border-gray-400" />

              {openId === item.id && (
                <div>
                  <h2 className="mt-3 transition-opacity duration-300 mb-7 pr-15">
                    {item.Description}
                  </h2>
                  <hr className="my-3 border-gray-400" />
                </div>
              )}
            </div>
          ))}

          {visiblePages.includes(currentPage) && (
            <>
              <h1 className="text-center text-3xl font-semibold italic text-white mt-15">
                {questionHeading}
              </h1>
              <button className="w-[370px] h-[35px] bg-[linear-gradient(to_bottom,#33C6F4,#1E738E)] flex justify-center items-center text-[14px] rounded-[10px] mt-4 cursor-pointer mx-auto font-semibold hover:scale-104  transition-transform duration-300 ease-in-out">
                {btnText}
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
