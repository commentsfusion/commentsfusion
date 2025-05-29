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
  isYearly = false // new prop for yearly/monthly toggle
}) => {
  return (
    <div className={`flex flex-col p-8 rounded-3xl border-2 ${
      highlight 
        ? 'border-sky-400 bg-[#33C6F4] z-20 shadow-xl transform -translate-y-10' 
        : 'border-sky-500 bg-black'
    } relative space-y-10 transition-all duration-300 h-full w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto min-h-[650px] ${cardClass}`}>
      
      {/* Title Section */}
      <div className="mb-4">
        <h2 className={`text-3xl font-bold mb-2 tracking-wide ${
          title.toLowerCase() === 'premium' ? 'text-white' : 'text-[#33C6F4]'
        } ${titleClass}`}>
          {title.toUpperCase()}
        </h2>
        <div className="flex items-baseline gap-2">
          <span className={`text-4xl font-bold ${
            title.toLowerCase() === 'premium' ? 'text-white' : 'text-[#33C6F4]'
          } ${priceClass}`}>
            {price}
          </span>
          <span className={`text-4xl font-bold ${
            title.toLowerCase() === 'premium' ? 'text-white' : 'text-[#33C6F4]'
          }`}>
            /
          </span>
          {isYearly ? (
            <span className={`text-lg ${periodClass} ${
              title.toLowerCase() === 'premium' ? 'text-white' : 'text-[#33C6F4]'
            } font-bold`}>
              yearly
            </span>
          ) : (
            <span className={`text-lg ${periodClass} ${
              title.toLowerCase() === 'premium' ? 'text-white' : 'text-[#33C6F4]'
            } font-bold`}>
              monthly
            </span>
          )}
        </div>
      </div>

      {/* CTA Section */} 
      <div className="space-y-2">
        <button className={`w-full py-4 rounded-full text-lg font-bold flex items-center justify-center gap-2 transition-colors h-[48px] ${title.toLowerCase() === 'premium' ? 'bg-[#232728] text-white' : 'bg-sky-400 text-white'} ${buttonClass}`} style={{minHeight: '48px', fontSize: '20px'}}>
          <span className={ctaTextClass}>Start for free</span>
          <span className="text-xl">→</span>
        </button>
        {title !== 'AGENCY' && (
          <p className={`text-sm text-center ${noteClass}`}>
            No credit card required
          </p>
        )}
      </div>

      {/* Features List */}
      <ul className={`space-y-4 ${title.toLowerCase() === 'premium' ? 'text-black' : 'text-white'}`}>
        {features.map((feature, idx) => (
          <li key={idx} className={`flex items-start text-lg ${featureClass}`}>
            <span className={`mr-3 mt-1 ${bulletClass}`}>•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;