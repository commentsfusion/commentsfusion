'use client';
import React from 'react';

const StrategicCommentingSection = () => {
  const plans = [
    {
      name: 'Free',
      comments: true,
      models: 'GPT 4-o mini',
      tones: '3',
      charLimit: '200',
    },
    {
      name: 'Starter',
      comments: true,
      models: 'GPT 4-o',
      tones: '5',
      charLimit: 'Unlimited',
    },
    {
      name: 'Premium',
      comments: true,
      models: 'GPT 4-o\nGPT 3.5-mini\nGPT-4.5',
      tones: '10',
      charLimit: 'Unlimited',
    },
    {
      name: 'Agency',
      comments: true,
      models: 'Google Gemini\nGPT 4-o\nGPT 3.5-mini\nGPT-4.5',
      tones: 'Unlimited',
      charLimit: 'Unlimited',
    },
  ];

  const prospectsFeatures = [
    { label: 'Number of prospects', key: 'prospects' },
    { label: 'Lists creation', key: 'lists' },
    { label: 'Automated update', key: 'update' },
    { label: 'Email notification', key: 'email' },
    { label: 'Real-time update request', key: 'realtime' },
    { label: 'Bulk import', key: 'bulk' },
  ];

  const prospectsPlans = [
    {
      name: 'Free',
      prospects: '10',
      lists: '3',
      update: 'Weekly',
      email: 'Weekly',
      realtime: false,
      bulk: false,
    },
    {
      name: 'Starter',
      prospects: '40',
      lists: '7',
      update: 'Daily',
      email: 'Daily',
      realtime: true,
      bulk: false,
    },
    {
      name: 'Premium',
      prospects: '160',
      lists: '32',
      update: 'Twice a day',
      email: 'Daily',
      realtime: true,
      bulk: true,
    },
    {
      name: 'Agency',
      prospects: '2,000',
      lists: 'Unlimited',
      update: 'Twice a day',
      email: 'Daily',
      realtime: true,
      bulk: true,
    },
  ];

  const renderCheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-white bg-[#0DB2E5] rounded-full p-0.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  const renderCrossIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-white bg-gray-400 rounded-full p-0.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );

  return (
    <section className="w-full max-w-none px-0 md:px-0 lg:px-0 py-10">
      {/* Strategic Commenting Section */}
      <div className="mb-16">
        <div className="bg-white text-black text-2xl max-lg:text-xl max-md:text-lg font-semibold px-6 py-2 max-lg:px-4 max-lg:py-1.5 max-md:py-1 rounded-[12px] mb-0 shadow-sm">
          Strategic Commenting
        </div>
        <div className="overflow-hidden">
          <div className="grid grid-cols-[250px_repeat(4,minmax(100px,1fr))] text-white text-sm font-semibold"></div>
          <div className="text-white text-sm mt-5 ">
            {/* Row: Unlimited GenAI comments */}
            <div className="grid grid-cols-[250px_repeat(4,minmax(100px,1fr))] max-lg:grid-cols-[200px_repeat(4,minmax(100px,1fr))] max-md:grid-cols-[190px_repeat(4,minmax(100px,1fr))]">
              <div className="p-4 border-r border-white/50 bg-transparent max-lg:text-[13px] max-md:text-[12.5px]">Unlimited GenAI comments</div>
              {plans.map((plan, idx) => (
                <div key={idx} className={`p-4 flex justify-center items-center  text-center ${idx !== plans.length - 1 ? 'border-r border-white/50' : ''}`}>
                  {plan.comments ? renderCheckIcon() : renderCrossIcon()}
                </div>
              ))}
            </div>
            {/* Row: GenAI models */}
            <div className="grid grid-cols-[250px_repeat(4,minmax(100px,1fr))] max-lg:grid-cols-[200px_repeat(4,minmax(100px,1fr))] max-md:grid-cols-[190px_repeat(4,minmax(100px,1fr))]">
              <div className="p-4 border-r border-white/50 bg-transparent max-lg:text-[13px]">GenAI models</div>
              {plans.map((plan, idx) => (
                <div key={idx} className={`p-4 whitespace-pre-line text-center text-xs max-md:text-[11px]  text-white/90 ${idx !== plans.length - 1 ? 'border-r border-white/50' : ''}`}>{plan.models}</div>
              ))}
            </div>
            {/* Row: Custom tones */}
            <div className="grid grid-cols-[250px_repeat(4,minmax(100px,1fr))] max-lg:grid-cols-[200px_repeat(4,minmax(100px,1fr))] max-md:grid-cols-[190px_repeat(4,minmax(100px,1fr))]">
              <div className="p-4 border-r border-white/50 bg-transparent max-lg:text-[13px]">Custom tones</div>
              {plans.map((plan, idx) => (
                <div key={idx} className={`p-4 text-center text-white/90 text-xs max-md:text-[11px] ${idx !== plans.length - 1 ? 'border-r border-white/50' : ''}`}>{plan.tones}</div>
              ))}
            </div>
            {/* Row: Character Limit */}
            <div className="grid  grid-cols-[250px_repeat(4,minmax(100px,1fr))] max-lg:grid-cols-[200px_repeat(4,minmax(100px,1fr))] max-md:grid-cols-[190px_repeat(4,minmax(100px,1fr))]">
              <div className="p-4 border-r border-white/50 bg-transparent max-lg:text-[13px]">Custom tones character limit</div>
              {plans.map((plan, idx) => (
                <div key={idx} className={`p-4 text-center text-white/90 text-xs max-md:text-[11px] ${idx !== plans.length - 1 ? 'border-r border-white/50' : ''}`}>{plan.charLimit}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Prospects Monitoring Section */}
      <div className="mb-16">
        <div className="bg-white text-black text-2xl font-semibold px-6 py-2   rounded-[12px] mb-0 shadow-sm max-lg:text-xl max-md:text-lg max-lg:py-1.5 max-md:py-1 max-lg:px-4">
          Prospects Monitoring
        </div>
        <div className="overflow-hidden">
          {/* <div className="grid grid-cols-[250px_repeat(4,minmax(100px,1fr))] max-lg:grid-cols-[200px_repeat(4,minmax(100px,1fr))] max-md:grid-cols-[190px_repeat(4,minmax(100px,1fr))] text-white text-sm font-semibold"></div> */}
          <div className="text-white text-sm mt-5">
            {prospectsFeatures.map((feature, idx) => (
              <div key={idx} className="grid grid-cols-[250px_repeat(4,minmax(100px,1fr))] max-lg:grid-cols-[200px_repeat(4,minmax(100px,1fr))] max-md:grid-cols-[190px_repeat(4,minmax(100px,1fr))]">
                <div className="p-4 border-r border-white/50 bg-transparent max-lg:text-[13px] max-md:text-[12.5px]">{feature.label}</div>
                {prospectsPlans.map((plan, pidx) => (
                  <div key={pidx} className={`p-4 text-center text-white/90 flex justify-center items-center text-xs max-md:text-[11px] ${pidx !== prospectsPlans.length - 1 ? 'border-r border-white/50' : ''}`}>
                    {typeof plan[feature.key] === 'boolean'
                      ? plan[feature.key]
                        ? renderCheckIcon()
                        : renderCrossIcon()
                      : plan[feature.key]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategicCommentingSection;
