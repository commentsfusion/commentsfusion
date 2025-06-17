"use client";
import React from "react";
import { motion } from "framer-motion";

function Msgbox() {
  const msgData = [
    {
      title: "Engage with Others",
      discription:
        "Engage with posts from fellow members everyone gives and gets in equal measure.",
    },
    {
      title: "Boost Your Reach",
      discription:
        "With consistent, spaced-out engagement, your content stays in circulation longer increasing exposure to your first degree connections and ideal prospects.",
    },
    {
      title: "Expand Your Audience",
      discription:
        "The more people engage, the further your posts go helping you get discovered by new, relevant networks.",
    },
    {
      title: "Share Your Post",
      discription:
        "Submit your LinkedIn post during scheduled hours, and it will be assigned to 15 community members for authentic, diverse engagement.",
    },
  ];
  return (
    <div>
      <h1 className="text-5xl font-bold text-center pt-35 ">How it Works ? </h1>

      <div className="flex justify-center gap-x-24 flex-wrap mt-6">
        {msgData.map((item, index) => (
          <div
            key={index}
            className=" flex mt-9 hover:scale-104  transition-transform duration-300 ease-in-out"
          >
            <div className="w-[395px] h-[220px] bg-[linear-gradient(to_top_left,_#4194A7_20%,_#33C6F4_100%)] rounded-3xl px-4 py-3 border-2  ">
              <h1 className="text-[25px] font-bold">{item.title}</h1>
              <p className="text-[15px] mt-5">{item.discription}</p>
            </div>
            <div className=" mt-49 ml-[-19px] w-10 h-11 bg-[#4194A7] rounded-bl-[35px]  rounded-b-[15px] border-2 border-t-2 border-t-[#4194A7] rotate-[-48deg] "></div>
          </div>
        ))}
      </div>
      <motion.div whileTap={{ scale: 0.95 }}>
        <button className="w-[330px] h-[38px] italic bg-[linear-gradient(to_right,#33C6F4,#1E738E)] flex justify-center items-center  text-[16px] rounded-[10px] mt-20 cursor-pointer mx-auto font-semibold	hover:scale-104  transition-transform duration-300 ease-in-out">
          Boost your LinkedIn reach
        </button>
      </motion.div>
    </div>
  );
}

export default Msgbox;
