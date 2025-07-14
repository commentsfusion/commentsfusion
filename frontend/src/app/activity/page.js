"use client";

import { useEffect, useState } from "react";
import Layout from "../components/layout";
import MobileLayout from "../components/mobileLayout";
import Image from "next/image";

const rows = [
  {
    id: "01",
    avatar: "/images/user1.jpg",
    name: "Balie Parker",
    tagline: "Stripping the boring out of B2B marketing | Co-Fou...",
    post:
      "Everyone tries to go viral. So they chase whatever trend is blowing up that week. " +
      "New format? Jump on it. Funny audio? Use it. Meme? Slap your logo on it. " +
      "It feels like marketing… but most of the time, it’s just noise.",
    comment:
      'Pepsi® is back with a fresh take on its "Thirsty For More" platform, fronted by none other than David Beckham. ' +
      "This new global campaign is about one simple universal message: 'If you love it, it’s never a waste.'",
    status: "Online",
    date: "28 April, 2025",
  },
  {
    id: "02",
    avatar: "/images/user2.jpg",
    name: "Brandon William",
    tagline: "Helping brands craft impactful Video-First Adverti...",
    post:
      "So, here’s what the best videos have in common. " +
      "No, it’s not a drone shot. Or a moody slow-motion cover. Or that music track we’ve all heard in a million explainer vids. " +
      "It’s strategy. After a couple of weeks of digging into what really makes video work, here’s the final word (for now) on the 5 Factors That Frame Great Video Content: Frequency, Consistency builds memory.",
    comment:
      'Pepsi® is back with a fresh take on its "Thirsty For More" platform, fronted by none other than David Beckham. ' +
      "This new global campaign is about one simple universal message: 'If you love it, it’s never a waste.'",
    status: "Online",
    date: "28 April 2025",
  },
];

const headers = ["Sn #", "Post", "Comment", "Status", "Shared on"];

export default function Activity() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const renderContent = () => (
    <div className="h-full p-4 flex flex-col space-y-4">
      {/* Top Filters */}
      <div className="flex flex-nowrap whitespace-nowrap items-center gap-4 bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-4 mb-2 overflow-x-auto">
        {/* Dropdowns */}
        {["All Accounts", "All statuses"].map((label, idx) => (
          <div key={idx} className="relative inline-block">
            <select className="appearance-none bg-[#33C6F4]/64 text-white rounded px-6 py-2 pr-10 focus:outline-none focus:ring focus:ring-[#33C6F470]/44">
              <option>{label}</option>
              <option>{label} A</option>
              <option>{label} B</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <Image
                src="/images/activity/dropdownIcon.svg"
                alt=""
                width={16}
                height={16}
              />
            </div>
          </div>
        ))}
<br />
        {/* Date Range */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            defaultValue="2025-04-03"
            className="appearance-none pl-10 pr-4 py-2 bg-[#33C6F4]/64 rounded text-white focus:outline-none focus:ring focus:ring-[#33C6F470]/44"
          />
          <span className="text-white/50">—</span>
          <input
            type="date"
            defaultValue="2025-04-28"
            className="appearance-none pl-10 pr-4 py-2 bg-[#33C6F4]/64 rounded text-white focus:outline-none focus:ring focus:ring-[#33C6F470]/44"
          />
        </div>

        {/* Export Button */}
        <button className="ml-auto inline-flex items-center
         bg-white text-black py-3 px-6 rounded-4xl 
         hover:bg-gray-100 transition-colors space-x-2">
          <Image
            src="/images/activity/exportIcon.svg"
            alt="Export"
            width={20}
            height={20}
          />
          <span>Export Comments</span>
        </button>
      </div>

      {/* Data Table */}
      <div className="flex-1 bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="min-w-full table-fixed text-white border-collapse border-spacing-0">
            <thead>
              <tr>
                {headers.map((h, i) => (
                  <th
                    key={h}
                    className={`px-4 py-3 text-left border-t border-b border-[#33C6F4] ${
                      i < headers.length - 1 ? "border-r border-[#33C6F4]" : ""
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-white/5 border-b border-[#33C6F4] last:border-b-0"
                >
                  <td className="px-4 py-3 align-top border-r border-[#33C6F4]">
                    {item.id}
                  </td>
                  <td className="px-4 py-3 flex items-start space-x-3 border-r border-[#33C6F4]">
                    <Image
                      src="/images/topbar/userIcon.svg"
                      alt={item.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="text-sm">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-300 leading-snug">
                        {item.tagline}
                      </p>
                      <p className="mt-2 text-xs text-gray-300 leading-relaxed">
                        {item.post}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm leading-relaxed border-r border-[#33C6F4]">
                    {item.comment}
                  </td>
                  <td className="px-4 py-3 border-r border-[#33C6F4]">
                    <span className="inline-block bg-[#33C6F4] text-white text-xs px-2 py-1 rounded-full">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300 whitespace-nowrap">
                    {item.date}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={headers.length} className="border-t border-[#33C6F4] p-0" />
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 p-4">
          <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30">
            &larr;
          </button>
          <button className="w-8 h-8 bg-white/20 text-white rounded-full">1</button>
          <button className="w-8 h-8 bg-white/20 text-white rounded-full">2</button>
          <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30">
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );

  // Conditional Layout Render
  return isDesktop ? <Layout>{renderContent()}</Layout> : <MobileLayout>{renderContent()}</MobileLayout>;
}
