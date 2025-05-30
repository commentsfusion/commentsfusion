import Image from "next/image";

export default function MonitorEngagement() {
  return (
    <section className="text-white py-12 sm:py-20 px-2 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 sm:gap-12">
        {/* Heading */}
        <h2 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold text-center">
          Monitor Engagement & <span className="text-white">Prospects</span>
        </h2>

        {/* Text */}
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed text-center max-w-3xl">
          Stay ahead by tracking and aggregating all your LinkedIn interactions in one place. Leverage AI-powered insights to analyze engagement, track AI-generated comments, and receive real-time notifications when someone interacts with your posts. Gain actionable analytics on likes, replies, and overall performance to refine your strategy and boost visibility. With secure data handling and AI-driven suggestions, you can optimize your engagement approach, build meaningful connections.
        </p>

        {/* Image with hover animation only */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-cyan-400 p-2 sm:p-4 transition-transform duration-500 hover:scale-105 hover:-translate-y-1 max-w-full sm:max-w-6xl mx-auto w-full">
          <Image
            src="/images/landing-page/dashboard.png"
            alt="Monitor Engagement Dashboard - Track and analyze your LinkedIn interactions and engagement in one place."
            width={1000}
            height={667}
            className="w-full h-auto object-contain rounded-xl"
            priority
          />
        </div>

        {/* Button */}
        <button className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-4 py-3 sm:px-6 rounded-full transition duration-300 shadow-md flex items-center justify-center gap-2 mx-auto my-6 w-full sm:w-auto">
          <img
            src="/images/landing-page/chrome.svg"
            alt="Chrome Icon - Download the free Chrome extension for enhanced LinkedIn engagement tracking."
            className="w-5 h-5 inline-block align-middle"
          />
          Download Free Chrome Extension
        </button>
      </div>
    </section>
  );
}
