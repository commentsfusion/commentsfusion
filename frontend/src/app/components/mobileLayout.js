"use client";
import { useState } from 'react';
import MobileSidebar from './mobileSidenav';
import Image from 'next/image';
import "../../../styles/globals.css";

export default function MobileLayout({ children }) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const toggleMobileDrawer = () => {
    setIsMobileDrawerOpen(!isMobileDrawerOpen);
  };

  const closeMobileDrawer = () => {
    setIsMobileDrawerOpen(false);
  };

  return (
    <div
      className="
        flex flex-col h-screen text-white
        bg-[linear-gradient(to_bottom,_#000000_30%,_#33C6F4_100%)]
        bg-cover bg-center max-h-screen
        overflow-y-auto
        p-4
        space-y-4
      "
    >
      {/* Mobile Header */}
      <header className="w-full flex-shrink-0">
        <div className="flex items-center justify-between p-4">
          {/* Drawer/Menu Icon */}
          <button
            onClick={toggleMobileDrawer}
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Logo/Title */}
          <div className="flex items-center">
            <span className="text-lg font-semibold">Comment's</span>
            <span className="text-lg font-semibold text-[#33C6F4]">Fusion</span>
          </div>

          {/* Profile Icon */}
          <button className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-[#33C6F4] rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">A</span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeMobileDrawer}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`
          fixed left-0 top-0 h-full w-80 bg-black/80 backdrop-blur-md
          transform transition-transform duration-300 ease-in-out z-50
          ${isMobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <div className="flex items-center">
            <span className="text-lg font-semibold">Comment's</span>
            <span className="text-lg font-semibold text-[#33C6F4]">Fusion</span>
          </div>
          <button
            onClick={closeMobileDrawer}
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Drawer Content - Sidebar */}
        <div className="h-full overflow-y-auto">
          <MobileSidebar />
        </div>
      </div>

      {/* Mobile Content */}
      <div className="flex flex-1 relative min-h-0">
        <main className="flex-1 p-6 overflow-auto bg-transparent">
          {children}
        </main>
      </div>
      
      {/* Mobile Chatbot Button */}
      <button className="fixed bottom-2 right-4 text-white p-3 rounded-full transition-colors animate-bounce">
        <Image
          src="/images/chatBotIcon.svg"
          alt="Chatbot Icon"
          width={80}
          height={80}
        />
      </button>
    </div>
  );
}