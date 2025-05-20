import React from "react";
import PricingCard from "./PricingCard";

const PricingSection = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <PricingCard
        title="Starter"
        price="$11.90"
        features={[
          "Unlimited comments",
          "5 custom tones",
          "40 prospects monitoring",
          "Daily & real-time monitoring update",
          "Social signals - updated daily",
          "Priority support (24 hours)",
          "Advanced AI model (GPT-4.0)"
        ]}
      />
      <PricingCard
        title="Premium"
        price="$25"
        highlight
        features={[
          "Unlimited comments",
          "10 custom tones",
          "160 prospects monitoring",
          "Daily & real-time monitoring update",
          "Social signals - updated daily",
          "Priority support (24 hours)",
          "Advanced AI models (GPT-4.0, GPT-4.5)"
        ]}
      />
      <PricingCard
        title="Agency"
        price="$75"
        features={[
          "Unlimited comments",
          "Unlimited custom tones",
          "2,000 prospects monitoring",
          "Daily & real-time monitoring update",
          "Social signals - updated twice daily",
          "Priority support (24 hours)",
          "Early access to Beta features",
          "Advanced AI models (Google Gemini, GPT-4.0, GPT-4.5)"
        ]}
      />
    </div>
  );
};

export default PricingSection;
