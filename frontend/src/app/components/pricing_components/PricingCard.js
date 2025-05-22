import React from "react";

const PricingCard = ({ title, price, features, highlight }) => {
  return (
    <div className={`flex flex-col p-8 rounded-3xl border-2 ${
      highlight 
        ? 'border-sky-400 bg-sky-600 z-20 shadow-xl transform -translate-y-10' 
        : 'border-sky-500 bg-black'
    } text-white relative space-y-6 transition-all duration-300 h-full`}>
      
      {/* Title Section */}
      <div className="mb-4">
        <h2 className="text-3xl font-bold mb-2">
          {title}
        </h2>
        <div className="flex items-baseline gap-2">
          <span className={`text-4xl font-bold ${highlight ? 'text-sky-300' : 'text-sky-400'}`}>
            {price}
          </span>
          <span className="text-gray-400 text-lg">/ month</span>
        </div>
      </div>

      {/* CTA Section */}
      <div className="space-y-2">
        <button className={`w-full py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 ${
          highlight 
            ? 'bg-sky-400 hover:bg-sky-300 text-gray-900' 
            : 'bg-sky-500 hover:bg-sky-400 text-white'
        } transition-colors`}>
          Start for free
          <span className="text-xl">→</span>
        </button>
        {title !== 'AGENCY' && (
          <p className="text-gray-400 text-sm text-center">
            No credit card required
          </p>
        )}
      </div>

      {/* Features List */}
      <ul className="space-y-4">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start text-lg">
            <span className={`mr-3 mt-1 ${highlight ? 'text-sky-300' : 'text-sky-400'}`}>✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;