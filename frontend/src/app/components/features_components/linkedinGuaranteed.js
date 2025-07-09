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
      
        <h1 className="text-5xl font-bold text-center pt-32 max-lg:pt-26  max-lg:text-4xl max-md:text-3xl ">
          Watch Your LinkedIn Soar
           </h1>
         <h1 className="text-[#33C6F4] text-5xl max-lg:text-4xl max-md:text-3xl font-bold text-center pt-2 "> Measurable Growth, Guaranteed</h1>
       
        <div className="  w-[70%] mx-auto  max-lg:w-[80%]"> 
          <h2 className="text-[21px] mt-15 max-lg:mt-8  text-center  max-lg:text-[17px] max-md:text-[14px] ">
            Get real conversations going on every LinkedIn post with 18 genuine
            comments and likes that actually matter. We’ll handle the strategy
            and all the behind the scenes work, so you can stay focused on
            building what you’re great at.
          </h2>
        </div>
        <button className="w-[370px] h-[38px] max-lg:h-[35px] max-lg:w-[300px] max-md:w-[260px] bg-[linear-gradient(to_left,#33C6F4,#1E738E)] flex justify-center items-center italic  text-[19px] max-lg:text-[16px] max-md:text-[15px] rounded-[10px] mt-12 max-lg:mt-8  cursor-pointer mx-auto font-semibold	hover:scale-104  transition-transform duration-300 ease-in-out">
          Join our LinkedIn
          <img
            src="images/features/LinkdinLogo.svg"
            alt=""
            className="w-6 h-6  max-md:w-5 max-md:h-5 ml-5"
          ></img>
        </button>
        <div className="  w-[60%] max-lg:w-[70%] mx-auto   ">
          <h2 className="text-[21px] mt-11 max-lg:mt-7  text-center max-lg:text-[17px] max-md:text-[14px]   ">
            Plans that fit your needs just $40/month for individuals, or
            $220/month for teams with unlimited clients.
          </h2>
        </div>
<div className="  w-[80%] mx-auto  max-lg:w-[100%]"> 
        <h1 className=" text-5xl max-lg:text-4xl max-md:text-3xl font-bold text-center mt-[17%] max-lg:mt-[12%]"> 
        Boost visibility, drive engagement, and unlock
        </h1>

        <h1 className="text-[#33C6F4] text-5xl max-lg:text-4xl max-md:text-3xl font-bold text-center pt-2 "> new opportunities on LinkedIn</h1>
      </div>
      </div>
        </motion.div>
    </>
  );
}

export default Linkedin_Guaranteed;
