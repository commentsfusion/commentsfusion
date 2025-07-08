import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <div className="relative text-white py-24 px-4 max-lg:px-0 rounded-b-3xl overflow-hidden mt-20">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-5xl font-bold max-lg:text-4xl max-md:text-3xl">
          Discover your <span className="text-sky-400 italic">ideal plan</span>
        </h1>
        <p className="text-[20px] max-lg:text-[16.5px] max-md:text-[15px] mt-12">
          Try it for 30 days experience the difference with no commitment.
        </p>
      </div>

      <div className="mt-10 w-[100%] bg-black rounded-3xl  py-6 px-6 max-lg:py-4 max-lg:px-4 max-md:py-3 max-md:px-3 flex items-center justify-between gap-4 max-lg:gap-5 max-md:gap-4">
        {/* Left: Install Button */}
        <div className="flex-shrink-0 ">
          <button className="bg-sky-500 text-white font-bold text-lg max-lg:text-[14px] max-md:text-[12px] px-8 py-3 max-lg:px-6 max-lg:py-2 max-md:px-3 max-md:py-1.5  rounded-full leading-tight shadow-md">
            Install
            <span className="block text-xs max-lg:text-[11px] max-md:text-[9px] font-normal">Free Plan $0 →</span>
          </button>
        </div>

        {/* Right: Centered and Right-aligned Description */}
        <div className="text-white text-[20px] max-lg:text-[15px] max-md:text-[13.5px] text-center flex-1">
          <p className="leading-relaxed">
            <span className="block">
              Enjoy unlimited comments, 2 personalized tones, monitoring for 20 prospects,
            </span>
            <span className="block">
              and weekly updates on their activity.
            </span>
          </p>
        </div>
      </div>

      {/* Sticky Bouncing Bot Image */}
      <div className="fixed bottom-4 right-4 w-[150px] h-[150px]  z-50 animate-bounce">
        <Image
          src="/images/chatBotIcon.svg"
          alt="Chatbot Icon"
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default Header;
