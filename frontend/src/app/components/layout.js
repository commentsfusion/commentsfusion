import Sidebar from "./sidenav";
import Topbar from "./topBar";
import Image from "next/image";
import { useState } from "react";
import "../../../styles/globals.css";
import ChatbotWindow from "../components/chatbotWindow";

export default function Layout({ children }) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

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
      <header className="w-full">
        <Topbar />
      </header>

      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto bg-transparent">
          {children}
        </main>

        {/* Chatbot Window */}
        {isChatbotOpen && (
          <ChatbotWindow onClose={() => setIsChatbotOpen(false)} />
        )}

        {!isChatbotOpen && (
          <button
            className="fixed bottom-2 right-4 text-white p-3 rounded-full transition-colors animate-bounce z-50"
            onClick={() => setIsChatbotOpen(true)}
          >
            <Image
              src="/images/chatBotIcon.svg"
              alt="Chatbot Icon"
              width={80}
              height={80}
            />
          </button>
        )}
      </div>
    </div>
  );
}
