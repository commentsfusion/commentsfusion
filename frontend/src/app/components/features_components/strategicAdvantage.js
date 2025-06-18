"use client";
import { motion } from "framer-motion";
import React from "react";

function StrategicAdvantage() {
  const messagesData = [
    {
      img: "images/features/messageIcon.svg",
      text: "20 high-quality comments",
    },
    {
      img: "images/features/messageIconBox2.svg",
      text: "250 views 3,000 engaged eyes",
    },
  ];

  return (
    <>
      <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
      <div className="w-[100%]  mt-20 rounded-t-[200px] bg-[#000000CC] p-15">
        <h1 className="text-5xl text-center font-bold">
          Your strategic advantage
        </h1>
        <p className="text-[20px] text-center mt-8">
          Numbers that just make sense for your clients
        </p>

        <div className="flex justify-center gap-12 mt-10">
          {messagesData.map((item, index) => (
            <div className="flex gap-8" key={index}>
              <div className=" flex mt-9 ">
                <div className="w-[290px] h-[160px] bg-[linear-gradient(to_top_left,_#4194A7_20%,_#33C6F4_100%)] rounded-3xl px-8 py-3 border-2  ">
                  <div className="flex justify-center mt-4">
                    <img src={item.img} className="w-7" />
                  </div>
                  <p className="text-[22px] font-semibold text-center mt-2">
                    {item.text}
                  </p>
                </div>
                <div className=" mt-34 ml-[-15px] w-9 h-11 bg-[#4194A7] rounded-bl-[35px]  rounded-b-[15px] border-2 border-t-2 border-t-[#4194A7] rotate-[-50deg] "></div>
              </div>
              {index === 0 && (
                <div className="flex flex-col mt-4 text-white  justify-center items-center">
                  <h1 className="font-bold text-2xl">7 Days</h1>
                  <img src="images/features/7dayArrrow.svg" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center w-[50%] mx-auto mt-10">
          How you use it is entirely your call. Offer it as a loyalty perk to
          impress your clients, or bundle it as a premium add-on to grow your
          revenue. Either way, you’re the strategic pro delivering solutions
          before your clients even know they need them.
        </div>
          <h1 className="text-[20px] text-center font-bold mt-5">
          More visibility and revenue = satisfied clients = stronger retention.
        </h1>
          <h1 className="text-[20px] text-center  mt-8">
         Behind every win, there’s you the one making it possible.
        </h1>
      </div>
      </motion.div>
    </>
  );
}

export default StrategicAdvantage;
