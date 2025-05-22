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
    <section className="py-16 px-4 relative py-16 ">
      <div className="w-full max-w-none">
        {/* Section Label - Full width, large, bold, rounded, shadow, as in image */}
        <div className="w-full bg-[#E6E6E6] text-black text-2xl font-semibold px-8 py-3 rounded-t-2xl mb-0 shadow-sm" style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
          Strategic Commenting
        </div>
        {/* Glass-like container with vertical lines and full-width header, now full width */}
        <div className="w-full rounded-b-2xl bg-gradient-to-b from-[#16222A] to-[#2980B9] border border-white/10 overflow-hidden shadow-xl mt-0">
          {/* Header Row with background and vertical lines */}
          <div className="grid grid-cols-[200px_repeat(4,minmax(100px,1fr))] text-white text-sm font-semibold">
            <div className="p-4 bg-[#1B2B36] border-r border-white/10 rounded-tl-2xl">Features</div>
            {plans.map((plan, idx) => (
              <div key={idx} className={`p-4 text-center bg-[#1B2B36] ${idx !== plans.length - 1 ? 'border-r border-white/10' : ''} ${idx === plans.length - 1 ? 'rounded-tr-2xl' : ''}`}>{plan.name}</div>
            ))}
          </div>
          {/* Feature Rows with vertical lines, no horizontal lines */}
          <div className="text-white text-sm">
            {/* Row: Unlimited GenAI comments */}
            <div className="grid grid-cols-[200px_repeat(4,minmax(100px,1fr))]">
              <div className="p-4 border-r border-white/10">Unlimited GenAI comments</div>
              {plans.map((plan, idx) => (
                <div key={idx} className={`p-4 flex justify-center items-center ${idx !== plans.length - 1 ? 'border-r border-white/10' : ''}`}>{plan.comments ? renderCheckIcon() : null}</div>
              ))}
            </div>
            {/* Row: GenAI models */}
            <div className="grid grid-cols-[200px_repeat(4,minmax(100px,1fr))]">
              <div className="p-4 border-r border-white/10">GenAI models</div>
              {plans.map((plan, idx) => (
                <div key={idx} className={`p-4 whitespace-pre-line text-center text-xs text-white/90 ${idx !== plans.length - 1 ? 'border-r border-white/10' : ''}`}>{plan.models}</div>
              ))}
            </div>
            {/* Row: Custom tones */}
            <div className="grid grid-cols-[200px_repeat(4,minmax(100px,1fr))]">
              <div className="p-4 border-r border-white/10">Custom tones</div>
              {plans.map((plan, idx) => (
                <div key={idx} className={`p-4 text-center text-white/90 ${idx !== plans.length - 1 ? 'border-r border-white/10' : ''}`}>{plan.tones}</div>
              ))}
            </div>
            {/* Row: Character Limit */}
            <div className="grid grid-cols-[200px_repeat(4,minmax(100px,1fr))]">
              <div className="p-4 border-r border-white/10">Custom tones character limit</div>
              {plans.map((plan, idx) => (
                <div key={idx} className={`p-4 text-center text-white/90 ${idx !== plans.length - 1 ? 'border-r border-white/10' : ''}`}>{plan.charLimit}</div>
              ))}
            </div>
          </div>
        </div>
        {/* Prospects Monitoring Section */}
        <div className="h-10" />
        {/* Section Label - Full width, large, bold, rounded, shadow, as in image */}
        <div className="w-full bg-[#E6E6E6] text-black text-2xl font-semibold px-8 py-3 rounded-t-2xl mb-0 shadow-sm" style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
          Prospects Monitoring
        </div>
        <div className="w-full rounded-b-2xl bg-gradient-to-b from-[#16222A] to-[#2980B9] border border-white/10 overflow-hidden shadow-xl mt-0">
          <div className="grid grid-cols-[200px_repeat(4,minmax(100px,1fr))] text-white text-sm font-semibold">
            <div className="p-4 bg-[#1B2B36] border-r border-white/10 rounded-tl-2xl">Features</div>
            {prospectsPlans.map((plan, idx) => (
              <div key={idx} className={`p-4 text-center bg-[#1B2B36] ${idx !== prospectsPlans.length - 1 ? 'border-r border-white/10' : ''} ${idx === prospectsPlans.length - 1 ? 'rounded-tr-2xl' : ''}`}>{plan.name}</div>
            ))}
          </div>
          <div className="text-white text-sm">
            {prospectsFeatures.map((feature, idx) => (
              <div key={idx} className={`grid grid-cols-[200px_repeat(4,minmax(100px,1fr))]`}>
                <div className="p-4 border-r border-white/10">{feature.label}</div>
                {prospectsPlans.map((plan, pidx) => (
                  <div key={pidx} className={`p-4 text-center text-white/90 flex justify-center items-center ${pidx !== prospectsPlans.length - 1 ? 'border-r border-white/10' : ''}`}>
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
