"use client";

import Layout from "../components/layout";
import React from "react";
import Image from "next/image";

export default function Activity() {
  return (
    <Layout>
      <div className="h-full p-4 relative">
        {/* Top Bar */}
        <div
          className="flex flex-wrap items-center gap-4 bg-black/70 backdrop-blur-sm
          border border-white/20
          rounded-2xl p-4 rounded-md mb-4"
        >
          {/* All Accounts Dropdown */}
          <div>
            <select className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500">
              <option>All accounts</option>
              <option>Account A</option>
              <option>Account B</option>
            </select>
          </div>

          {/* All Statuses Dropdown */}
          <div>
            <select className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500">
              <option>All statuses</option>
              <option>Status A</option>
              <option>Status B</option>
            </select>
          </div>

          {/* Date Range Inputs (e.g., 04/03/2025 to 04/28/2025) */}
          <div className="flex items-center gap-2">
            <input
              type="date"
              defaultValue="2025-04-03"
              className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
            <span className="text-gray-500">-</span>
            <input
              type="date"
              defaultValue="2025-04-28"
              className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Export Comments Button */}
          <button
            type="button"
            className="ml-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Export Comments
          </button>
        </div>
        {/* End Top Bar */}

        {/* Main content area */}
        <div>{/* Your page content goes here */}</div>
      </div>
    </Layout>
  );
}
