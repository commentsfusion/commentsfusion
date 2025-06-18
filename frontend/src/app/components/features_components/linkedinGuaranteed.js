"use client";
import React from "react";
import { motion } from "framer-motion";
function Linkedin_Guaranteed() {
  return (
    <>
     <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >   
      <div>
      
        <h1 className="text-5xl font-bold text-center pt-32 ">
          Watch Your LinkedIn Soar
           </h1>
         <h1 className="text-[#33C6F4] text-5xl font-bold text-center pt-2 "> Measurable Growth, Guaranteed</h1>
       
        <div className="  w-[70%] mx-auto  ">
          <h2 className="text-[21px] mt-13  text-center   ">
            Get real conversations going on every LinkedIn post with 18 genuine
            comments and likes that actually matter. We’ll handle the strategy
            and all the behind the scenes work, so you can stay focused on
            building what you’re great at.
          </h2>
        </div>
        <button className="w-[30%] h-[38px]  bg-[linear-gradient(to_left,#33C6F4,#1E738E)] flex justify-center items-center italic  text-[19px] rounded-[10px] mt-14 cursor-pointer mx-auto font-semibold	hover:scale-104  transition-transform duration-300 ease-in-out">
          Join our LinkedIn
          <img
            src="/images/LinkedIn_EngagementStrategy/linkedin2.svg"
            alt=""
            className="w-5.5 h-5.5  ml-5"
          ></img>
        </button>
        <div className="  w-[71%] mx-auto  ">
          <h2 className="text-[21px] mt-11  text-center   ">
            Plans that fit your needs just $40/month for individuals, or
            $220/month for teams with unlimited clients.
          </h2>
        </div>

        <h1 className="text-5xl font-bold text-center mt-44 ">
        Boost visibility, drive engagement, and unlock
        </h1>

        <h1 className="text-[#33C6F4] text-5xl font-bold text-center pt-2 "> new opportunities on LinkedIn</h1>
      </div>
        </motion.div>
    </>
  );
}

export default Linkedin_Guaranteed;
