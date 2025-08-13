"use client";

import { useEffect, useState } from "react";
import Layout from "../components/layout";
import MobileLayout from "../components/mobileLayout";
import Image from "next/image";
import { fetchComments } from "../utils/api";

function useDebounce(value, delay = 400) {
  const [deb, setDeb] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDeb(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return deb;
}
export default function Activity() {
  const [screenType, setScreenType] = useState("desktop");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [status, setStatus] = useState("");
  const [account, setAccount] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [search, setSearch] = useState("");
  const debSearch = useDebounce(search, 450);

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const headers = ["Sn #", "Post", "Comment", "Status", "Shared on"];

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setScreenType("desktop");
      else if (width >= 768) setScreenType("tablet");
      else setScreenType("mobile");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentPage = Number(page) || 1;

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchComments({
          page: currentPage,
          limit,
          status,
          account: receiverProfileId,
          from,
          to,
          sort: "-createdAt",
          signal: controller.signal
        });

        console.log("Results", result);

        const docs = result?.data || result?.docs || result?.items || [];
        const totalCount =
          result?.total ??
          result?.totalDocs ??
          result?.count ??
          result?.totalItems ??
          docs.length;
        const pages =
          result?.totalPages ??
          result?.pages ??
          Math.max(1, Math.ceil(totalCount / limit));

        setData(docs);
        setTotal(totalCount);
        setTotalPages(pages);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err?.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [page, limit, status, account, from, to, debSearch]);

  const exportCSV = () => {
    if (!data.length) return;
    const rows = data.map((c) => ({
      id: c._id,
      commenter: c.commenter,
      receiverName: c.receiverProfile?.name || c.receiverProfile?._id || "",
      commentText: c.commentText || "",
      post: c.post || "",
      status: c.status || "",
      createdAt: c.createdAt || "",
    }));
    const header = Object.keys(rows[0]);
    const csv = [
      header.join(","),
      ...rows.map((r) =>
        header.map((h) => JSON.stringify(r[h] ?? "")).join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `comments_page${page}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (iso) => {
    if (!iso) return "-";
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  const renderDesktop = () => (
    <div className="h-full p-4 flex flex-col space-y-4">
      <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-xl px-2 py-3 mb-2 w-full space-y-3 lg:space-y-0 lg:flex lg:flex-wrap lg:items-center lg:gap-4 lg:rounded-2xl lg:px-3 lg:py-4">
        {/* Row 1: All Accounts + All Statuses */}
        {/* Accounts */}
        <select
          value={account}
          onChange={(e) => {
            setAccount(e.target.value);
            setPage(1);
          }}
          className="w-48 bg-[#33C6F4]/60 text-white text-sm rounded px-4 py-2"
        >
          <option value="">All Accounts</option>
          {/* populate these options from accounts list if you have it */}
          <option value="682dc22c2c0acfe3c5013eb0">682dc22c…</option>
        </select>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="w-48 bg-[#33C6F4]/60 text-white text-sm rounded px-4 py-2"
        >
          <option value="">All statuses</option>
          <option value="online">online</option>
          <option value="offline">offline</option>
        </select>

        {/* Row 2: Date Range */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          <input
            type="date"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setPage(1);
            }}
            className="flex-1 min-w-[45%] text-sm bg-[#33C6F4]/60 px-4 py-2 rounded text-white focus:outline-none focus:ring focus:ring-[#33C6F470]/44"
          />
          <span className="text-white/50">—</span>
          <input
            type="date"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setPage(1);
            }}
            className="flex-1 min-w-[45%] text-sm bg-[#33C6F4]/60 px-4 py-2 rounded text-white focus:outline-none focus:ring focus:ring-[#33C6F470]/44"
          />
        </div>

        <div className=" sm:w-auto pt-1 flex justify-center sm:justify-end">
          <button
            onClick={exportCSV}
            className="inline-flex items-center bg-white text-black text-sm py-2 px-5 rounded-2xl hover:bg-gray-100 transition-colors space-x-2"
          >
            <Image
              src="/images/activity/exportIcon.svg"
              alt="Export"
              width={18}
              height={18}
            />
            <span>Export Comments</span>
          </button>
        </div>
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
              {data.map((c, idx) => (
                <tr
                  key={c._id}
                  className="hover:bg-white/5 border-b border-[#33C6F4] last:border-b-0"
                >
                  <td className="px-4 py-3 align-top border-r border-[#33C6F4]">
                    {(page - 1) * limit + idx + 1}
                  </td>
                  <td className="px-4 py-3 flex items-start space-x-3 border-r border-[#33C6F4]">
                    <Image
                      src="/images/topbar/userIcon.svg"
                      alt={c.receiverProfile?.name || "User"}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="text-sm">
                      <p className="font-medium">
                        {c.receiverProfile?.name || "Unknown"}
                      </p>
                      <p className="text-xs text-gray-300 leading-snug">
                        {c.receiverProfile?.tag_line || ""}
                      </p>
                      <p className="mt-2 text-xs text-gray-300 leading-relaxed">
                        {c.post || ""}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm leading-relaxed border-r border-[#33C6F4]">
                    {c.commentText || c.comment || ""}
                  </td>
                  <td className="px-4 py-3 border-r border-[#33C6F4]">
                    <span className="inline-block bg-[#33C6F4] text-white text-xs px-2 py-1 rounded-full">
                      {c.status || "-"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300 whitespace-nowrap">
                    {formatDate(c.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={headers.length}
                  className="border-t border-[#33C6F4] p-0"
                />
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 p-4">
          <button
            onClick={() => setPage((p) => Math.max(1, Number(p) - 1))}
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30"
            disabled={page <= 1}
          >
            &larr;
          </button>

          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-300 px-2">
              Page {page} / {totalPages}
            </div>
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, Number(p) + 1))}
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30"
            disabled={page >= totalPages}
          >
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );

  const renderMobile = () => (
    <div className="flex flex-col space-y-2 px-2 py-3 text-sm text-white font-sans w-full">
      <div className="w-full flex flex-col gap-2 bg-black/60 backdrop-blur-md border border-white/20 rounded-lg p-3">
        <div className="flex gap-2">
          {["All Accounts", "All statuses"].map((label, idx) => (
            <div key={idx} className="relative w-1/2">
              <select className="w-full bg-[#33C6F4]/70 text-white rounded px-2 py-1 pr-8 text-xs focus:outline-none">
                <option>{label}</option>
                <option>{label} A</option>
                <option>{label} B</option>
              </select>
            </div>
          ))}
        </div>

        <div className="flex gap-1 items-center">
          <input
            type="date"
            defaultValue="2025-04-03"
            className="w-full bg-[#33C6F4]/70 text-white text-xs px-1 py-1 rounded focus:outline-none"
          />
          <span className="text-white/50 text-xs">-</span>
          <input
            type="date"
            defaultValue="2025-04-28"
            className="w-full bg-[#33C6F4]/70 text-white text-xs px-1 py-1 rounded focus:outline-none"
          />
        </div>
        <div className="px-6 pt-1 flex justify-center">
          <button className="inline-flex items-center justify-center bg-white text-black py-2 px-3 text-xs rounded-lg hover:bg-gray-200 space-x-2">
            <Image
              src="/images/activity/exportIcon.svg"
              alt="Export"
              width={16}
              height={16}
            />
            <span>Export Comments</span>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full bg-black/60 backdrop-blur-md border border-white/20 rounded-md overflow-hidden">
        <table className="min-w-full text-white text-[11px]">
          <thead className="bg-[#33C6F4]/40 text-left">
            <tr>
              <th className="px-2 py-2 border-r border-[#33C6F4] w-10">Sn #</th>
              <th className="px-2 py-2 border-r border-[#33C6F4]">Post</th>
              <th className="px-2 py-2">Comment</th>
            </tr>
          </thead>
          <tbody>
            {data.map((c, idx) => (
              <tr
                key={c._id}
                className="border-t border-[#33C6F4] hover:bg-white/5"
              >
                <td className="px-2 py-2 border-r border-[#33C6F4] align-top">
                  {(page - 1) * limit + idx + 1}
                </td>
                <td className="px-2 py-2 border-r border-[#33C6F4]">
                  <div className="flex flex-col">
                    <span className="font-semibold text-[11.5px]">
                      {c.receiverProfile?.name || "Unknown"}
                    </span>
                    <span className="text-gray-300 text-[10px]">
                      {c.receiverProfile?.tag_line || ""}
                    </span>
                    <p className="mt-1 text-[10px] text-gray-300">
                      {c.post || ""}
                    </p>
                  </div>
                </td>
                <td className="px-2 py-2 text-[10px] text-gray-200">
                  {c.commentText || c.comment || ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination + Export Button */}
      <div className="w-full flex flex-col items-center justify-center mt-2 space-y-2">
        {/* Pagination */}
        <div className="flex justify-center gap-2">
          <button className="px-2 py-1 bg-white/20 rounded hover:bg-white/30 text-xs">
            &larr;
          </button>
          <button className="w-6 h-6 bg-white/20 rounded-full text-xs text-white">
            1
          </button>
          <button className="w-6 h-6 bg-white/20 rounded-full text-xs text-white">
            2
          </button>
          <button className="px-2 py-1 bg-white/20 rounded hover:bg-white/30 text-xs">
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );

  // Final Render
  if (screenType === "desktop") return <Layout>{renderDesktop()}</Layout>;
  if (screenType === "tablet")
    return <MobileLayout>{renderDesktop()}</MobileLayout>;
  return <MobileLayout>{renderMobile()}</MobileLayout>;
}
