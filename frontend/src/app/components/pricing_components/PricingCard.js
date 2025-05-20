import React from "react";

const PricingCard = ({ title, price, features, highlight }) => {
  return (
    <div className={`flex flex-col p-6 rounded-2xl shadow-md border ${highlight ? 'bg-sky-500 text-white' : 'bg-black text-white border-gray-700'}`}>
      <h3 className="text-lg font-bold uppercase">{title}</h3>
      <p className="text-2xl font-extrabold my-2">
        {price} <span className="text-base font-medium">/ month</span>
      </p>
      <button className={`mt-2 mb-4 py-2 px-4 rounded-full font-semibold ${highlight ? 'bg-white text-black' : 'bg-sky-500 text-white'}`}>
        Start for free →
      </button>
      <ul className="space-y-2 text-sm">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <span className="mr-2">✓</span>{feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;
