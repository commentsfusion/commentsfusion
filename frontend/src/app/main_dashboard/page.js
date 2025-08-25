"use client";

import Layout from "../components/layout";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useEffect } from "react";
import MobileLayout from "../components/mobileLayout";
import { getDashboardMetrics, getDashboardTargets } from "../utils/api";

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
  const filters = [
    { label: "7d", value: "7d" },
    { label: "15d", value: "15d" },
    { label: "30d", value: "30d" },
  ];
  const [selectedFilter, setSelectedFilter] = useState(filters[1].value);
  const [screenType, setScreenType] = useState("desktop");
  const [targets, setTargets] = useState([]);
  const [targetsPage, setTargetsPage] = useState(1);
  const [targetsLimit] = useState(10);
  const [targetsTotalPages, setTargetsTotalPages] = useState(1);
  const [targetsLoading, setTargetsLoading] = useState(false);
  const [targetsError, setTargetsError] = useState(null);

  const [metrics, setMetrics] = useState({
    followersCount: 0,
    followersSeries: [],
    connectionsCount: 0,
    connectionsSeries: [],
    totalComments: 0,
    commentsSeries: [],
  });

  useEffect(() => {
    getDashboardMetrics(selectedFilter)
      .then(setMetrics)
      .catch((err) => console.error("Dashboard load error:", err));
  }, [selectedFilter]);

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    async function loadTargets() {
      setTargetsLoading(true);
      setTargetsError(null);
      try {
        const res = await getDashboardTargets(selectedFilter, {
          page: targetsPage,
          limit: targetsLimit,
          signal: controller.signal,
        });
        if (!mounted) return;
        setTargets(res.data || []);
        setTargetsTotalPages(res.totalPages || 1);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Failed to load targets:", err);
        if (mounted) {
          setTargets([]);
          setTargetsError(err.message || "Failed to load targets");
        }
      } finally {
        if (mounted) setTargetsLoading(false);
      }
    }

    loadTargets();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [selectedFilter, targetsPage, targetsLimit]);

  useEffect(() => {
    setTargetsPage(1);
  }, [selectedFilter]);

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

  // handlers
  const goPrev = () => setTargetsPage((p) => Math.max(1, p - 1));
  const goNext = () =>
    setTargetsPage((p) => Math.min(targetsTotalPages || 1, p + 1));
  const goToPage = (n) => {
    const page = Math.max(1, Math.min(targetsTotalPages || 1, Number(n) || 1));
    setTargetsPage(page);
  };

  // create a small page-range helper (windowed)
  function getPageRange(current, total, maxButtons = 5) {
    if (!total) return [];
    if (total <= maxButtons)
      return Array.from({ length: total }, (_, i) => i + 1);

    const half = Math.floor(maxButtons / 2);
    let start = Math.max(1, current - half);
    let end = Math.min(total, start + maxButtons - 1);

    // shift if we ended at total
    if (end - start + 1 < maxButtons) {
      start = Math.max(1, end - maxButtons + 1);
    }

    const range = [];
    if (start > 1) range.push(1);
    if (start > 2) range.push("..."); // gap

    for (let i = start; i <= end; i++) range.push(i);

    if (end < total - 1) range.push("...");
    if (end < total) range.push(total);

    return range;
  }

  function niceNumber(n) {
    if (n == null) return "0";
    if (n < 1000) return String(n);
    if (n < 1_000_000) return (n / 1000).toFixed(n < 10000 ? 1 : 0) + "K";
    return (n / 1_000_000).toFixed(1) + "M";
  }

  const content = (
    <div className="h-full lg:p-1">
      <div className="flex justify-end space-x-2 mb-4">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setSelectedFilter(f.value)}
            className={`px-3 py-1 rounded-lg border border-white/20 transition-colors duration-200 ${
              selectedFilter === f.value
                ? "bg-white/30"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div
        className={`${
          screenType === "mobile" ? "block" : "hidden"
        } space-y-4 px-2 pb-6`}
      >
        {[
          {
            icon: "/images/main_dashboard/followersIcon.svg",
            title: "Followers",
            count: metrics.followersCount,
            chart: <FollowersChart data={metrics.followersSeries ?? []} />,
          },
          {
            icon: "/images/main_dashboard/connectionsIcon.svg",
            title: "Connections",
            count: metrics.connectionsCount,
            chart: <ConnectionsChart data={metrics.connectionsSeries ?? []} />,
          },
          {
            icon: "/images/main_dashboard/commentsIcon.svg",
            title: "Comments",
            count: metrics.totalComments,
            chart: <CommentsDotPlot data={metrics.commentsSeries ?? []} />,
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="w-full bg-black/60 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-4 mb-10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Image
                  src={item.icon}
                  alt={`${item.title} Icon`}
                  width={20}
                  height={20}
                />
                <span className="text-base font-medium">{item.title}</span>
              </div>
              <span className="text-base">{item.count}</span>
            </div>
            <div className="relative w-full h-48">{item.chart}</div>
          </div>
        ))}

        <hr />

        <div className="w-full bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-4">
          <div className="text-center mb-3">
            <p className="text-lg font-semibold">Performance Tracker</p>
            <p className="text-xs text-white/70">
              Optimize your outreach by tracking which targets drive the most
              engagement.
            </p>
          </div>
          <div className="space-y-3">
            {targetsLoading ? (
              <div className="text-sm text-gray-400">Loading...</div>
            ) : targets.length === 0 ? (
              <div className="text-sm text-gray-400">
                No targets found for this period.
              </div>
            ) : (
              targets.map((user, i) => (
                <div
                  key={i}
                  className="border border-white/10 rounded-xl px-4 py-3 bg-black/30"
                >
                  <div className="flex items-center justify-between mb-2 text-xs text-white/60">
                    <span>No: {String(i + 1).padStart(2, "0")}</span>
                    {/*<span>Latest: —</span>*/}
                  </div>
                  <div className="flex items-center space-x-3 mb-1">
                    <Image
                      src="/images/topbar/userIcon.svg"
                      alt={user.name}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-white/70">
                        {niceNumber(user.followers)} followers
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-white/80">
                    <span>Comments: {user.commentsCount ?? 0}</span>
                    <span>
                      Latest Comment Date:{" "}
                      {user.latestComment
                        ? new Date(user.latestComment).toLocaleDateString()
                        : "-"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex justify-center gap-3 mt-5">
            <button
              onClick={goPrev}
              disabled={targetsPage <= 1 || targetsLoading}
              aria-disabled={targetsPage <= 1 || targetsLoading}
              className={`p-2 rounded-lg text-sm ${
                targetsPage <= 1 || targetsLoading
                  ? "bg-white/10 text-white/40 cursor-not-allowed"
                  : "bg-white/20 hover:bg-white/30"
              }`}
            >
              &larr;
            </button>
            <button className="w-8 h-8 bg-white/20 rounded-lg text-sm">
              1
            </button>
            <button className="w-8 h-8 bg-white/20 rounded-lg text-sm">
              2
            </button>
            <button
              onClick={goNext}
              disabled={
                targetsPage >= (targetsTotalPages || 1) || targetsLoading
              }
              aria-disabled={
                targetsPage >= (targetsTotalPages || 1) || targetsLoading
              }
              className={`p-2 rounded-lg text-sm ${
                targetsPage >= (targetsTotalPages || 1) || targetsLoading
                  ? "bg-white/10 text-white/40 cursor-not-allowed"
                  : "bg-white/20 hover:bg-white/30"
              }`}
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${
          screenType === "mobile" ? "hidden" : "grid"
        } grid-cols-3 auto-rows-min gap-6`}
      >
        {[
          {
            icon: "/images/main_dashboard/followersIcon.svg",
            title: "Followers",
            count: metrics.followersCount,
            chart: <FollowersChart data={metrics.followersSeries ?? []} />,
          },
          {
            icon: "/images/main_dashboard/connectionsIcon.svg",
            title: "Connections",
            count: metrics.connectionsCount,
            chart: <ConnectionsChart data={metrics.connectionsSeries ?? []} />,
          },
          {
            icon: "/images/main_dashboard/commentsIcon.svg",
            title: "Comments",
            count: metrics.totalComments,
            chart: <CommentsDotPlot data={metrics.commentsSeries ?? []} />,
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="w-full flex flex-col bg-black/60 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Image
                  src={item.icon}
                  alt={`${item.title} Icon`}
                  width={24}
                  height={24}
                />
                <span className="text-lg font-medium">{item.title}</span>
              </div>
              <span className="text-lg">{item.count}</span>
            </div>
            <div className="relative w-full h-48">{item.chart}</div>
          </div>
        ))}

        <div className="col-span-3 flex flex-col bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex flex-col items-center gap-0">
            <span className="text-xl font-semibold text-center">
              Comments Fusion Performance Tracker
            </span>
            <span className="text-sm text-center">
              Optimize your outreach by tracking which targets drive the most
              engagement.
            </span>
          </div>

          {/* Header — center labels */}
          <div className="grid grid-cols-5 gap-4 mt-5 mb-2 px-4 text-sm font-medium">
            <span>No:</span>
            <span>Name:</span>
            <span>Comments count:</span>
            <span>Impressions:</span>
            <span>Latest comment date:</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            {targetsLoading ? (
              <div className="text-sm text-gray-400 text-center">
                Loading...
              </div>
            ) : targets.length === 0 ? (
              <div className="text-sm text-gray-400 text-center">
                No targets found for this period.
              </div>
            ) : (
              targets.map((user, i) => (
                <div
                  key={user.profileId || i}
                  className="grid grid-cols-5 gap-4 items-center px-4 border-t border-white/20 py-3"
                >
                  {/* 1) No. — centered */}
                  <div className="flex items-center justify-start">
                    <span className="text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* 2) Name — avatar + text centered */}
                  <div className="flex items-center justify-start space-x-3">
                    <Image
                      src="/images/topbar/userIcon.svg"
                      alt={`${user.name} Icon`}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="text-sm text-left">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-gray-300">
                        {niceNumber(user.followers)} followers
                      </p>
                    </div>
                  </div>

                  {/* 3) Comments count — centered */}
                  <div className="flex items-center justify-center">
                    <span className="text-sm">{user.commentsCount ?? 0}</span>
                  </div>

                  {/* 4) Impressions — centered */}
                  <div className="flex items-center justify-center">
                    <span className="text-sm">{user.impressions ?? "NA"}</span>
                  </div>

                  {/* 5) Latest comment date — centered */}
                  <div className="flex items-center justify-center">
                    <span className="text-sm">
                      {user.latestComment
                        ? new Date(user.latestComment).toLocaleDateString()
                        : "-"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop/table pagination (windowed numeric buttons) */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              onClick={goPrev}
              disabled={targetsPage <= 1 || targetsLoading}
              className={`p-2 rounded-lg ${
                targetsPage <= 1 || targetsLoading
                  ? "bg-white/10 text-white/40 cursor-not-allowed"
                  : "bg-white/20 hover:bg-white/30"
              }`}
            >
              &larr;
            </button>

            <div className="flex items-center gap-2">
              {getPageRange(targetsPage, targetsTotalPages, 7).map((p, idx) =>
                p === "..." ? (
                  <span
                    key={`gap-${idx}`}
                    className="px-2 text-sm text-gray-400"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    disabled={targetsLoading}
                    className={`w-8 h-8 rounded-lg text-sm ${
                      p === targetsPage
                        ? "bg-white/60 text-black"
                        : "bg-white/20 hover:bg-white/30"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}
            </div>

            <button
              onClick={goNext}
              disabled={
                targetsPage >= (targetsTotalPages || 1) || targetsLoading
              }
              className={`p-2 rounded-lg ${
                targetsPage >= (targetsTotalPages || 1) || targetsLoading
                  ? "bg-white/10 text-white/40 cursor-not-allowed"
                  : "bg-white/20 hover:bg-white/30"
              }`}
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (screenType === "desktop") return <Layout>{content}</Layout>;
  if (screenType === "tablet") return <MobileLayout>{content}</MobileLayout>;
  return <MobileLayout>{content}</MobileLayout>;
}
