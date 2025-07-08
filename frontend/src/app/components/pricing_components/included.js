'use client';
import Image from 'next/image';

const IncludedSection = () => {
  return (
    <section className="w-full py-16 px-0 -mb-15">
      <h2 className="text-5xl max-lg:text-4xl max-md:text-3xl font-bold text-white text-center mb-10">What's included</h2>

      <div className="w-full rounded-2xl bg-[#101820] flex flex-row items-center justify-start p-8 gap-8 max-lg:gap-4 max-md:gap-1 max-lg:p-3  max-md:p-2.5 shadow-lg">

        {/* Left Icon */}
        <div className="flex-shrink-0 pl-7 max-lg:pl-0  mt-4 max-md:mt-2">
          <Image src="/images/chatBotIcon.svg" alt="Free Plan Icon" width={120} height={100} className='max-lg:w-[100px] max-md:h-[80px] '/>
        </div>

        {/* Plans */}
        <div className="flex flex-row w-full justify-around pl-6 max-lg:pl-2 max-md:pl-0 max-lg:gap-0 gap-16 mr-[-10px]">
          {[
            { name: 'Free', price: '$0', note: 'no credit card required' },
            { name: 'Starter', price: '$7.99', note: 'no credit card required' },
            { name: 'Premium', price: '$22', note: 'no credit card required' },
            { name: 'Agency', price: '$73', note: 'no credit card required' },
          ].map((plan) => (
            <div key={plan.name} className="flex flex-col items-center flex-1">
              <p className="text-white text-lg max-lg:text-[16px] max-md:text-[14px] font-semibold mb-1 max-lg:mb-0">{plan.name}</p>
              <p className="text-white text-2xl font-bold mb-1 max-lg:mb-0 max-lg:text-xl max-md:text-[17px]">
                {plan.price} <span className="text-base font-normal max-lg:text-[15px] max-md:text-[13px] ">/ month</span>
              </p>
              <button className="bg-[#0db2e5] text-white max-lg:text-[14px] max-md:text-[12px] font-semibold px-6 py-2 max-lg:py-1 max-lg:px-4 max-md:px-3 rounded-full mb-1 mt-2 max-md:mt-1 hover:bg-[#0aa1cc] transition">
                Start now
              </button>
              <p className="text-gray-300 text-xs max-lg:text-[11px] max-md:text-[10px]">{plan.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IncludedSection;
