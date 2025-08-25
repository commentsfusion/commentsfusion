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
      <div className="w-full max-w-md bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Install Comments Fusion Extension</h1>
          <p className="text-white/80 text-sm">
            Add our Chrome extension to connect with LinkedIn and access all features
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-6 flex items-center justify-center">
            <Image 
              src="/images/customise_AI/faq-bot.svg" 
              alt="Chrome Extension"
              width={80}
              height={80}
            />
          </div>
          
          <div className="w-full mb-6 space-y-2 text-center">
            <p className="text-sm text-white/80">
              1. Install our Chrome extension
            </p>
            <p className="text-sm text-white/80">
              2. Use it to connect your LinkedIn account
            </p>
          </div>
          
          <div className="flex flex-col gap-3 w-full">
            <button 
              onClick={() => {
                // Replace with your actual Chrome Web Store extension URL
                window.open("https://chromewebstore.google.com/detail/oionfjkjcpfenmbeldmfdhcdfghohakn?utm_source=item-share-cb", "_blank");
                
                // Use setTimeout to ensure the navigation happens after the new tab is opened
                setTimeout(() => {
                  // Redirect to main dashboard after opening extension page
                  window.location.href = "/main_dashboard";
                }, 100);
              }}
              className="w-full px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-center"
            >
              Get Extension
            </button>
            {/* <button 
              onClick={handleGoToDashboard}
              className="w-full px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 border border-white/20 text-center"
            >
              Skip for Now
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );

  if (screenType === "desktop") return <Layout>{content}</Layout>;
  if (screenType === "tablet") return <MobileLayout>{content}</MobileLayout>;
  return <MobileLayout>{content}</MobileLayout>;
}
