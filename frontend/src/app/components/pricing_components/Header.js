import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <div className="relative text-white py-24 px-4 rounded-b-3xl overflow-hidden mt-20">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Discover your <span className="text-sky-400 italic">ideal plan</span>
        </h1>
        <p className="text-2xl mt-12">Try it for 30 days experience the difference with no commitment.</p>
      </div>
      <div className="mt-10 w-full bg-black rounded-3xl px-6 py-6 flex items-center justify-between gap-4">
        {/* Left: Install Button */}
        <div className="flex-shrink-0">
          <button className="bg-sky-500 text-white font-bold text-lg px-8 py-3 rounded-full leading-tight shadow-md">
            Install
            <span className="block text-xs font-normal">Free Plan $0 →</span>
          </button>
        </div>

        {/* Right: Centered and Right-aligned Description */}
        <div className="text-white text-2xl text-center flex-1">
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

      <div className="absolute -bottom-4 right-8 w-27 h-28">
        <Image
          src="/images/chatBotIcon.svg"
          alt="Demo"
          width={128}
          height={128}
          className="rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default Header;
