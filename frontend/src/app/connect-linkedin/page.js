"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import Layout from "../components/layout";
import MobileLayout from "../components/mobileLayout";

export default function ConnectLinkedIn() {
  const router = useRouter();
  const [screenType, setScreenType] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenType("mobile");
      else if (width < 1024) setScreenType("tablet");
      else setScreenType("desktop");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleGoToDashboard = () => {
    // Clear the LinkedIn connection flag when user proceeds to dashboard
    localStorage.removeItem("needsLinkedInConnection");
    router.push("/main_dashboard");
  };

  const content = (
    <div className="h-full w-full flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Connect Your LinkedIn Account</h1>
          <p className="text-white/80 text-lg mb-2">
            Get the most out of Comments Fusion by connecting your LinkedIn account
          </p>
          <p className="text-white/60">
            Track your followers, connections, and optimize your social media engagement
          </p>
        </div>

        <div className="flex flex-col items-center mb-10">
          <div className="relative w-64 h-64 mb-6">
            <Image 
              src="/images/linkedin_connection.svg" 
              alt="LinkedIn Connection"
              width={256}
              height={256}
              className="object-contain"
              onError={(e) => {
                e.target.src = "/images/topbar/userIcon.svg";
                e.target.style.opacity = 0.7;
              }}
            />
          </div>
          
          <div className="w-full max-w-md bg-black/40 border border-white/10 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">How to Connect:</h2>
            <ol className="list-decimal list-inside space-y-4 text-white/80">
              <li className="pl-2">Install the Comments Fusion browser extension</li>
              <li className="pl-2">Open the extension and click &quot;Connect LinkedIn&quot;</li>
              <li className="pl-2">Log in to LinkedIn with your account credentials</li>
              <li className="pl-2">Return to Comments Fusion to access all features</li>
            </ol>
          </div>
          
          <div className="text-center p-4 bg-emerald-900/30 border border-emerald-500/30 rounded-lg mb-6">
            <p className="text-emerald-400 font-medium">
              Connecting your LinkedIn account enables tracking of follower and connection metrics
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <button 
              onClick={handleGoToDashboard}
              className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white/90 border border-white/20 flex-1"
            >
              Continue to Dashboard
            </button>
            <a 
              href="https://chrome.google.com/webstore/detail/comments-fusion-extension/your-extension-id"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium flex-1 text-center"
            >
              Get Extension
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  if (screenType === "desktop") return <Layout>{content}</Layout>;
  if (screenType === "tablet") return <MobileLayout>{content}</MobileLayout>;
  return <MobileLayout>{content}</MobileLayout>;
}
