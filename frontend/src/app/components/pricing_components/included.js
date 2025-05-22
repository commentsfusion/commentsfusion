'use client';
import Image from 'next/image';

const IncludedSection = () => {
  return (
    <section className="w-full py-16 px-0">
      <h2 className="text-5xl font-bold text-white text-center mb-10">What's included</h2>

      <div className="w-full rounded-2xl bg-[#101820] flex flex-col md:flex-row items-center justify-start p-8 gap-8 shadow-lg">

        {/* Left Icon */}
        <div className="flex-shrink-0 pl-6 md:pl-16">
          <Image src="/images/chatBotIcon.svg" alt="Free Plan Icon" width={120} height={100} />
        </div>

        {/* Plans */}
        <div className="flex flex-row w-full justify-around pr-6 md:pr-16 gap-4 md:gap-6">
          {[
            { name: 'Free', price: '$0', note: 'no credit card required' },
            { name: 'Starter', price: '$7.99', note: 'no credit card required' },
            { name: 'Premium', price: '$22', note: 'no credit card required' },
            { name: 'Agency', price: '$73', note: 'no credit card required' },
          ].map((plan) => (
            <div key={plan.name} className="flex flex-col items-center flex-1">
              <p className="text-white text-lg font-semibold mb-1">{plan.name}</p>
              <p className="text-white text-2xl font-bold mb-1">
                {plan.price} <span className="text-base font-normal">/ month</span>
              </p>
              <button className="bg-[#0db2e5] text-white font-semibold px-6 py-2 rounded-full mb-1 mt-2 hover:bg-[#0aa1cc] transition">
                Start now
              </button>
              <p className="text-gray-300 text-xs">{plan.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IncludedSection;
