"use client";

import Layout from "../components/layout";
import dynamic from "next/dynamic";
import Image from "next/image";

const FollowersChart = dynamic(
  () => import("../components/charts/FollowersChart"),
  { ssr: false }
);
const ConnectionsChart = dynamic(
  () => import("../components/charts/ConnectionsChart"),
  { ssr: false }
);
const CommentsDotPlot = dynamic(
  () => import("../components/charts/CommentsDotPlot"),
  { ssr: false }
);

export default function Home() {
  // Example metrics (replace with real data or props)
  const followersCount = "1.4K";
  const connectionsCount = "900";
  const commentsCount = "35";

  return (
    <Layout>
      <div className="h-full p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-min gap-6">

          {/* Followers */}
          <div className="flex flex-col bg-black/60 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/main_dashboard/followersIcon.svg"
                  alt="Followers"
                  width={24}
                  height={24}
                />
                <span className="text-lg font-medium">Followers</span>
              </div>
              <span className="text-lg">{followersCount}</span>
            </div>
            <div className="flex-1 h-48 flex items-center justify-center">
              <FollowersChart />
            </div>
          </div>

          {/* Connections */}
          <div className="flex flex-col bg-black/60 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/main_dashboard/connectionsIcon.svg"
                  alt="Connections"
                  width={24}
                  height={24}
                />
                <span className="text-lg font-medium">Connections</span>
              </div>
              <span className="text-lg">{connectionsCount}</span>
            </div>
            <div className="flex-1 h-48 flex items-center justify-center">
              <ConnectionsChart />
            </div>
          </div>

          {/* Comments */}
          <div className="flex flex-col bg-black/60 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/main_dashboard/commentsIcon.svg"
                  alt="Comments"
                  width={24}
                  height={24}
                />
                <span className="text-lg font-medium">Comments</span>
              </div>
              <span className="text-lg">{commentsCount}</span>
            </div>
            <div className="flex-1 h-48 flex items-center justify-center">
              <CommentsDotPlot />
            </div>
          </div>

          {/* Bottom: Performance Tracker spanning all 3 columns */}
          <div
            className="
              col-span-3 flex flex-col
              bg-black/60 backdrop-blur-md
              border border-white/20
              rounded-2xl
              p-6
            "
          >
            <div className="flex flex-col items-center gap-0">
              <span className="text-xl font-semibold text-center">
                Comments Fusion Performance Tracker
              </span>
              <span className="text-sm text-center">
                Optimize your outreach by tracking which targets drive the most
                engagement.
              </span>
            </div>

            <div className="grid grid-cols-5 gap-4 mt-5 mb-2 px-4 text-sm font-medium">
              <span>No:</span>
              <span>Name:</span>
              <span>Comments count:</span>
              <span>Impressions:</span>
              <span>Latest comment date:</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {[
                { name: "Balie Parker", followers: "1.3K" },
                { name: "Brandon William", followers: "2.6K" },
                { name: "Crista Munchkins", followers: "5K" },
              ].map((user, i) => (
                <div
                  key={i}
                  className="grid grid-cols-5 gap-4 items-center px-4 border-t border-white/20 py-2"
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex items-center space-x-3">
                    <img
                      src={`/images/topbar/userIcon.svg`}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="text-sm">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-gray-300">
                        {user.followers} followers
                      </p>
                    </div>
                  </div>
                  <span>0</span>
                  <span>0</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4 mt-4">
              <button className="p-2 bg-white/20 rounded-lg">&larr;</button>
              <button className="w-8 h-8 bg-white/20 rounded-lg">1</button>
              <button className="w-8 h-8 bg-white/20 rounded-lg">2</button>
              <button className="p-2 bg-white/20 rounded-lg">&rarr;</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
