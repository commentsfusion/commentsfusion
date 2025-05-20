'use client';
import { useState } from 'react';

const PricingToggle = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="flex items-center gap-2 mb-6">
      <button
        className={`px-4 py-1 rounded-full ${!isYearly ? 'bg-sky-500 text-white' : 'bg-gray-800 text-white'}`}
        onClick={() => setIsYearly(false)}
      >
        Monthly
      </button>
      <button
        className={`px-4 py-1 rounded-full ${isYearly ? 'bg-sky-500 text-white' : 'bg-gray-800 text-white'}`}
        onClick={() => setIsYearly(true)}
      >
        Yearly
      </button>
    </div>
  );
};

export default PricingToggle;
