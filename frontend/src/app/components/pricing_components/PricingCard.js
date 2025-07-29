import React from "react";

const PricingCard = ({
  title,
  price,
  features,
  highlight,
  cardClass = "",
  titleClass = "",
  priceClass = "",
  periodClass = "",
  featureClass = "",
  bulletClass = "",
  buttonClass = "",
  ctaTextClass = "",
  noteClass = "",
  isYearly = false,
}) => {
  return (
    <div
      className={`flex flex-col p-8 max-lg:p-5 max-md:p-4.5 rounded-3xl border-2 
${highlight ? "border-sky-400 bg-[#33C6F4] z-20 shadow-xl lg:-translate-y-10 md:-translate-y-10" : "border-sky-500 bg-black"}
        relative space-y-10 transition-all duration-300 
        w-full max-w-xs md:max-w-sm lg:max-w-md 
        mx-auto min-h-[600px] max-lg:min-h-[560px] max-md:min-h-[520px] 
        ${cardClass}`}
    >
      <div className="mb-4 max-lg:mb-2 max-md:mb-1">
        <h2
          className={`text-3xl max-lg:text-2xl max-md:text-[18px] font-bold mb-2 max-lg:mb-0 tracking-wide ${
            title.toLowerCase() === "premium" ? "text-white" : "text-[#33C6F4]"
          } ${titleClass}`}
        >
          {title.toUpperCase()}
        </h2>

        <div className="flex items-baseline gap-2">
          <span
            className={`text-4xl max-lg:text-3xl max-md:text-xl font-bold ${
              title.toLowerCase() === "premium" ? "text-white" : "text-[#33C6F4]"
            } ${priceClass}`}
          >
            {price}
          </span>
          <span
            className={`text-4xl max-lg:text-3xl max-md:text-xl font-bold ${
              title.toLowerCase() === "premium" ? "text-white" : "text-[#33C6F4]"
            }`}
          >
            /
          </span>
          <span
            className={`text-lg font-bold ${periodClass} ${
              title.toLowerCase() === "premium" ? "text-white" : "text-[#33C6F4]"
            }`}
          >
            {isYearly ? "yearly" : "monthly"}
          </span>
        </div>
      </div>

      <div className="space-y-2 max-lg:space-y-1 max-md:space-y-1.5">
        <button
          className={`w-full py-2 max-lg:py-1.5 max-md:py-1 rounded-full text-lg font-bold flex items-center justify-center gap-2 transition-colors 
            ${
              title.toLowerCase() === "premium"
                ? "bg-[#232728] text-white"
                : "bg-sky-400 text-white"
            } ${buttonClass}`}
        >
          <span
            className={`${ctaTextClass} text-[18px] max-lg:text-[15px] max-md:text-[13px]`}
          >
            Start for free
          </span>
          <span className="text-xl">→</span>
        </button>

        {title !== "AGENCY" && (
          <p
            className={`text-sm text-center max-lg:text-[13px] max-md:text-[11px] ${noteClass}`}
          >
            No credit card required
          </p>
        )}
      </div>

      <ul
        className={`space-y-4 max-lg:space-y-3 max-md:space-y-2 ${
          title.toLowerCase() === "premium" ? "text-black" : "text-white"
        }`}
      >
        {features.map((feature, idx) => (
          <li
            key={idx}
            className={`flex items-start text-[14.5px] max-lg:text-[13px] max-md:text-[12px] ${featureClass}`}
          >
            <span className={`mr-3 mt-1 ${bulletClass}`}>•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;
