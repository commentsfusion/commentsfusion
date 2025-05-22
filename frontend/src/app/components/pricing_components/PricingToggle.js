'use client';
import { useState } from 'react';

const PricingToggle = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="w-full flex justify-start mb-6 mt-4"> {/* Changed container */}
      <div className="flex items-center gap-2 bg-gray-800 p-1 rounded-full">
        <button
          className={`px-6 py-2 rounded-full text-sm ${
            !isYearly ? 'bg-sky-500 text-white' : 'bg-transparent text-gray-300'
          }`}
          onClick={() => setIsYearly(false)}
        >
          Monthly
        </button>
        <button
          className={`px-6 py-2 rounded-full text-sm ${
            isYearly ? 'bg-sky-500 text-white' : 'bg-transparent text-gray-300'
          }`}
          onClick={() => setIsYearly(true)}
        >
          Yearly
        </button>
      </div>
    </div>
  );
};

export default PricingToggle;