"use client";

import Layout from "../components/layout";
import Head from "next/head";
import React from "react";
import Image from "next/image";

const tones = [
  {
    title: "Enlightenment",
    description:
      "The above is a LinkedIn post, and I would like to comment on it to engage with the author. The author is a senior executive at a large enterprise. I have never met and spoken with the author before, so our engagement must be professional and casual. Please don’t be rude.",
  },
  {
    title: "Insights",
    description:
      "The above is a LinkedIn post, and I would like to comment on it to engage with the author. The author is a senior executive at a large enterprise. I have messaged and emailed the author, so the engagement can be reasonably casual but must remain professional.",
  },
  {
    title: "Self Intro",
    description:
      "The above is a LinkedIn post, and I would like to comment on it to engage with the author. The author is a senior executive at a large enterprise. I have messaged and emailed the author before, so the engagement can be reasonably casual but must remain professional.",
  },
  {
    title: "Convert into DM",
    description:
      "The above is a LinkedIn post, and I would like to comment on it to engage with the author. The author is a senior executive at a large enterprise. I have never met and spoken with the author before, so our engagement must be professional and casual. Please don’t be rude.",
  },
];

export default function CustomizeAI() {
  return (
    <Layout>
      <Head>
        <title>Customize AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="h-full p-4 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Image
              src="/images/customise_AI/customiseAIIcon.svg"
              alt="Customize AI Icon"
              width={30}
              height={30}
            />
            <h1 className="text-4xl font-semibold text-white">Customize AI</h1>
          </div>
          <button
            style={{ boxShadow: "0 2px 5px 5px #33C6F4" }}
            className="inline-flex items-center justify-center space-x-2 bg-[#33C6F4] text-white w-[120px] h-[40px] rounded-[10px] font-medium text-base"
          >
            <Image
              src="/images/customise_AI/plusIcon.svg"
              alt="Add Tone Icon"
              width={16}
              height={16}
            />
            <span>Add tone</span>
          </button>
        </div>

        <p className="text-slate-300 mb-6">
          Generate customized AI-driven tones to elevate your LinkedIn
          communications.
        </p>

        <div className="grid grid-cols-3 gap-6">
          {tones.map((tone) => (
            <div
              key={tone.title}
              className="flex flex-col bg-black/60 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6 space-y-4 hover:shadow-xl transition-shadow"
            >
              <h3 className="flex items-center space-x-2 text-xl font-semibold text-white">
                <Image
                  src="/images/customise_AI/toneIcon.svg"
                  alt="Tone Icon"
                  width={20}
                  height={20}
                />
                <span>{tone.title}</span>
              </h3>

              <div className="bg-[#33C6F470]/44 rounded-lg p-4">
                <p className="text-slate-100 text-sm">{tone.description}</p>
              </div>
            </div>
          ))}

          {/* Add tone card */}
          <div className="flex flex-col items-center justify-center bg-black/60 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow space-y-2">
            <Image
              src="/images/customise_AI/addToneIcon.svg"
              alt="Add Tone Icon"
              width={40}
              height={40}
            />
            <span className="text-lg font-medium">Add tone</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
