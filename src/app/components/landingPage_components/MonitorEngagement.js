import Image from "next/image";

export default function MonitorEngagement() {
  return (
    <section className="bg-gradient-to-b from-[#070720] to-[#1a1a40] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        {/* Heading */}
        <h2 className="text-white text-3xl md:text-4xl font-bold text-center">
          Monitor Engagement & <span className="text-cyan-400">Prospects</span>
        </h2>

        {/* Text */}
        <p className="text-gray-300 text-lg leading-relaxed text-center max-w-3xl">
          Stay ahead by tracking and aggregating all your LinkedIn interactions in one place. Leverage AI-powered insights to analyze engagement, track AI-generated comments, and receive real-time notifications when someone interacts with your posts. Gain actionable analytics on likes, replies, and overall performance to refine your strategy and boost visibility. With secure data handling and AI-driven suggestions, you can optimize your engagement approach, build meaningful connections.
        </p>

        {/* Image with hover animation only */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-cyan-400 p-2 transition-transform duration-500 hover:scale-105 hover:-translate-y-1">
          <Image
            src="/images/landing-page/dashboard.png"
            alt="Monitor Engagement"
            width={900}
            height={900}
            className="w-full h-auto object-contain rounded-xl"
          />
        </div>

        {/* Button */}
        <a
          href="#"
          className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:scale-105 transition-transform mt-10"
        >
          Download Free Chrome Extension
        </a>
      </div>
    </section>
  );
}
