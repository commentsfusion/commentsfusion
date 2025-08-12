import Image from "next/image";
import { useState } from "react";

export default function ChatbotWindow({ onClose }) {
  const [showCredentials, setShowCredentials] = useState(false);

  return (
    <div className="fixed bottom-24 right-6 w-96 bg-white shadow-2xl rounded-xl overflow-hidden z-50">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-cyan-700 to-cyan-400 p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-3">
          <Image
            src="/images/chatBotIcon.svg"
            alt="Bot Icon"
            width={40}
            height={40}
          />
          <h2 className="text-lg font-semibold">Hello,</h2>
        </div>
        <button onClick={onClose} className="text-xl">−</button>
      </div>

      {/* BODY */}
      <div className="bg-gradient-to-r from-cyan-700 to-cyan-400 p-4 text-white">
        <p className="text-sm">
          Welcome to our live chat!{" "}
          <a href="#" className="underline">Log in</a>
          <br />
          if you have an account, or{" "}
          <button
            onClick={() => setShowCredentials(!showCredentials)}
            className="underline"
          >
            provide your details ▼
          </button>
        </p>

        {showCredentials && (
          <div className="mt-4">
            <label className="block text-sm">
              Name <span className="text-white/70 text-xs">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name here"
              className="w-full mt-1 mb-3 px-3 py-2 rounded-full bg-black/20 text-white outline-none"
            />

            <label className="block text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email here"
              className="w-full mt-1 px-3 py-2 rounded-full bg-black/20 text-white outline-none"
            />
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="border-t p-3">
        <input
          type="text"
          placeholder="What can we help you with?"
          className="w-full outline-none text-sm"
        />
      </div>
    </div>
  );
}
