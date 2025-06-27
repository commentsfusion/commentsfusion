"use client"
import React from "react";
import { motion } from "framer-motion";

function Multi_userPlan() {
  return (
    <div>
      <h1 className="text-5xl font-bold text-center pt-35 ">
        Multi-User Plan{" "}
      </h1>
      <h2 className="text-[23px] mt-3 font-bold text-center">
        Designed for agencies, communities, and business networks
      </h2>
      <div className="flex justify-evenly mt-8 gap-34">
        <img src="images/features/downleftArrow.svg" className="w-10 h-10" />
        <img src="images/features/downrightArrow.svg" className="w-10 h-10" />
      </div>


      <div className="flex justify-center gap-34 mt-7">

      <div className="relative w-60 h-60  ">
        <img
          src="images/features/hexagon.svg"
          className="w-full h-full"
          alt="hexagon"
        />
        <div className="absolute inset-0 flex items-center text-center text-[15px] justify-center mt-1 text-white font-semibold">
          Get unlimited client
          <br />
          access to our LinkedIn
          <br />
          Engagement Community
          <br />
          for just $200/month no
          <br />
          manual work, just
          <br />
          proven results.
        </div>
      </div>

      <img src="/images/features/eqauls.svg" className="w-13 "/>


       <div className="relative w-60 h-60  ">
        <img
          src="images/features/hexagon.svg"
          className="w-full h-full"
          alt="hexagon"
        />
        <div className="absolute inset-0 flex items-center  text-[15px] text-center justify-center mt-1 text-white font-semibold">
          This isn’t limited to
          <br />
         LinkedIn coaches or
          <br />
          lead gen agencies it’s a
          <br />
          powerful value add for
          <br />
          any business, in
          <br />
          any industry.
        </div>
      </div>

      </div>
      <motion.div whileTap={{ scale: 0.95 }}>
        <button className="w-[380px] h-[38px] italic bg-[linear-gradient(to_right,#33C6F4,#1E738E)] flex justify-center items-center  text-[16px] rounded-[10px] mt-10 cursor-pointer mx-auto font-semibold	hover:scale-104  transition-transform duration-300 ease-in-out">
         Explore Team Plans
        </button>
      </motion.div>

    </div>
  );
}

export default Multi_userPlan;
//  <div className="relative w-40 h-40 mx-auto">
//   <img src="images/features/hexagon.svg" className="w-full h-full" alt="hexagon" />
//   <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
//     Your Text
//   </div>
// </div>
