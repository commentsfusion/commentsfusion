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
      <div className="w-[100%]  mt-20 rounded-t-[200px] max-lg:rounded-t-[140px] max-md:rounded-t-[110px] bg-[#000000CC] p-15 max-lg:p-10 max-lg:pt-11 max-md:pt-9">
        <h1 className="text-5xl text-center font-bold max-lg:text-4xl max-md:text-3xl">
          Your strategic advantage
        </h1>
        <p className="text-[20px] text-center mt-8 max-lg:mt-2.5 max-lg:text-[18px] max-md:text-[15px]">
          Numbers that just make sense for your clients
        </p>

        <div className="flex justify-center gap-12 mt-10 max-lg:mt-0">
          {messagesData.map((item, index) => (
            <div className="flex gap-8" key={index}>
              <div className=" flex mt-9 ">
                <div className="w-[290px] h-[160px] max-lg:w-[260px] max-lg:h-[145px] max-md:w-[210px] max-md:h-[125px]  bg-[linear-gradient(to_top_left,_#4194A7_20%,_#33C6F4_100%)] rounded-3xl px-8 py-3 border-2  ">
                  <div className="flex justify-center mt-4 max-lg:mt-3 max-md:mt-2">
                    <img src={item.img} className="w-7 max-lg:w-6 max-md:w-5" />
                  </div>
                  <p className="text-[22px] font-semibold text-center mt-2  max-lg:text-[18px] max-md:text-[16px] ">
                    {item.text}
                  </p>
                </div>
                <div className=" mt-34 ml-[-15px] max-md:ml-[-14px] w-9 h-11 max-lg:w-8 max-lg:mt-31 max-md:mt-26 max-lg:h-9 bg-[#4194A7] rounded-bl-[35px]  rounded-b-[15px] border-2 border-t-2 border-t-[#4194A7] rotate-[-50deg] max-md:rotate-[-52deg] "></div>
              </div>
              {index === 0 && (
                <div className="flex flex-col max-lg:w-17 max-md:w-15 mt-4 text-white  justify-center items-center">
                  <h1 className="font-bold text-2xl max-lg:text-xl max-md:text-lg">7 Days</h1>
                  <img src="images/features/7dayArrrow.svg" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex  justify-center mt-10 max-lg:mt-7 max-md:mt-4">
          <h1 className="w-[60%] text-center max-lg:text-[14px] max-md:text-[13px] max-lg:w-[87%] max-md:w-[92%]">
          How you use it is entirely your call. Offer it as a loyalty perk to
          impress your clients, or bundle it as a premium add-on to grow your
          revenue. Either way, you’re the strategic pro delivering solutions
          before your clients even know they need them.
          </h1>
        </div>
          <h1 className="text-[20px] text-center font-bold mt-5 max-lg:mt-3 max-md:mt-2 max-lg:text-[16px] max-md:text-[14px]">
          More visibility and revenue = satisfied clients = stronger retention.
        </h1>
          <h1 className="text-[20px] text-center  mt-8 max-lg:mt-5 max-md:mt-4 max-lg:text-[16px] max-md:text-[14px]">
         Behind every win, there’s you the one making it possible.
        </h1>
      </div>
      </motion.div>
    </>
  );
}

export default StrategicAdvantage;
