import React from 'react';

const Header = () => {
  return (
    <div className="text-center text-white space-y-4 mb-10 mt-30">
      <h1 className="text-3xl font-extrabold">Discover your <span className="text-sky-500 italic">ideal plan</span></h1>
      <p>Try it for 30 days experience the difference with no commitment.</p>
      <div className="mt-4">
        <button className="bg-sky-500 text-white font-semibold px-6 py-2 rounded-full">Install Free Plan $0 →</button>
        <p className="mt-2 text-sm text-gray-300">
          Enjoy unlimited comments, 2 personalized tones, monitoring for 20 prospects, and weekly updates on their activity.
        </p>
      </div>
    </div>
  );
};

export default Header;
