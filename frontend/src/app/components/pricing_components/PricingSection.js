'use client';

import React, { useState } from "react";
import PricingCard from "./PricingCard";
import PricingToggle from "./PricingToggle";

const yearlyPlans = [
  {
    title: "Starter",
    price: "$9.45",
    features: [
      "Unlimited comments",
      "5 custom tones",
      "40 prospects monitoring",
      "Daily & real-time monitoring update",
      "Social signals - updated daily",
      "Priority support (24 hours)",
      "Advanced AI model (GPT-4o)"
    ]
  },
  {
    title: "Premium",
    price: "$22",
    highlight: true,
    features: [
      "Unlimited comments",
      "10 custom tones",
      "160 prospects monitoring",
      "Daily & real-time monitoring update",
      "Social signals - updated daily",
      "Priority support (24 hours)",
      "Advanced AI models (GPT-4o, GPT-4, GPT-4.5)"
    ]
  },
  {
    title: "Agency",
    price: "$62",
    features: [
      "Unlimited comments",
      "Unlimited custom tones",
      "2,000 prospects monitoring",
      "Daily & real-time monitoring update",
      "Social signals - updated twice daily",
      "Priority support (24 hours)",
      "Early access to Beta features",
      "Advanced AI models (Google Gemini, GPT-4o, GPT-4, GPT-4.5)"
    ]
  }
];

const monthlyPlans = [
  {
    title: "Starter",
    price: "$11.90",
    features: [
      "Unlimited comments",
      "5 custom tones",
      "40 prospects monitoring",
      "Daily & real-time monitoring update",
      "Social signals - updated daily",
      "Priority support (24 hours)",
      "Advanced AI model (GPT-4o)"
    ]
  },
  {
    title: "Premium",
    price: "$25",
    highlight: true,
    features: [
      "Unlimited comments",
      "10 custom tones",
      "160 prospects monitoring",
      "Daily & real-time monitoring update",
      "Social signals - updated daily",
      "Priority support (24 hours)",
      "Advanced AI models (GPT-4o, GPT-4, GPT-4.5)"
    ]
  },
  {
    title: "Agency",
    price: "$75",
    features: [
      "Unlimited comments",
      "Unlimited custom tones",
      "2,000 prospects monitoring",
      "Daily & real-time monitoring update",
      "Social signals - updated twice daily",
      "Priority support (24 hours)",
      "Early access to Beta features",
      "Advanced AI models (Google Gemini, GPT-4o, GPT-4, GPT-4.5)"
    ]
  }
];

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(true);
  const plans = isYearly ? yearlyPlans : monthlyPlans;

  return (
    <div className="px-4 sm:px-0 md:px-1 lg:px-5 xl:px-35 2xl:px-20">

      {/* Only one toggle below, remove any extra toggle from parent or page layout if present */}
      <PricingToggle isYearly={isYearly} setIsYearly={setIsYearly} />
      {/* <div className="grid md:grid-cols-3 gap-10"> */}
      <div className="grid grid-cols-3 gap-9 max-lg:gap-4 max-md:gap-2">
        {plans.map((plan, idx) => (
          <PricingCard key={plan.title} {...plan} isYearly={isYearly} />
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
