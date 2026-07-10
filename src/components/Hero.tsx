"use client";

import type { Lang } from "@/types";
import type { Translations } from "@/lib/translations";
import { protocolsData } from "@/lib/protocols";

interface Props {
  isDark: boolean;
  lang: Lang;
  isRTL: boolean;
  t: Translations;
  allTransportCounts: Record<string, number>;
  onBrowse: () => void;
  onSearch: () => void;
}

export default function Hero({
  isDark,
  lang,
  isRTL,
  t,
  allTransportCounts,
  onBrowse,
  onSearch,
}: Props) {
  return (
    <section
      className={`anim-hero relative overflow-hidden py-16 sm:py-24 ${
        isDark
          ? "bg-gradient-to-b from-slate-900 to-slate-950"
          : "bg-gradient-to-b from-blue-50 to-white"
      }`}
    >
      {/* دایره‌های تزئینی */}
      <div
        className={`absolute -top-32 ${isRTL ? "-left-32" : "-right-32"} w-96 h-96 rounded-full blur-3xl opacity-10 ${
          isDark ? "bg-blue-500" : "bg-blue-400"
        }`}
      />
      <div
        className={`absolute -bottom-20 ${isRTL ? "-right-20" : "-left-20"} w-72 h-72 rounded-full blur-3xl opacity-10 ${
          isDark ? "bg-purple-500" : "bg-indigo-400"
        }`}
      />

      <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 relative z-10 text-center">
        {/* badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
          style={{
            background: isDark
              ? "rgba(59,130,246,.1)"
              : "rgba(59,130,246,.08)",
            borderColor: isDark
              ? "rgba(59,130,246,.3)"
              : "rgba(59,130,246,.2)",
            color: isDark ? "#93c5fd" : "#2563eb",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" />
          {lang === "fa"
            ? `${protocolsData.length}+ پروتکل شبکه`
            : `${protocolsData.length}+ network protocols`}
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
          <span
            className={`bg-gradient-to-r bg-clip-text text-transparent ${
              isDark
                ? "from-blue-400 via-cyan-300 to-purple-400"
                : "from-blue-600 via-indigo-600 to-purple-600"
            }`}
          >
            {t.heroTitle}
          </span>
        </h2>

        <p
          className={`text-lg sm:text-xl mb-10 max-w-2xl mx-auto ${
            isDark ? "text-slate-400" : "text-gray-500"
          }`}
        >
          {t.heroSub}
        </p>

        {/* CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onBrowse}
            className="px-6 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:scale-95"
          >
            {t.heroCta} →
          </button>
          <button
            onClick={onSearch}
            className={`px-6 py-3 rounded-2xl font-bold text-sm border transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 ${
              isDark
                ? "bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {t.heroSearch}
            <kbd
              className={`text-xs px-1.5 py-0.5 rounded border font-mono ${
                isDark
                  ? "border-slate-600 text-slate-500"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              ⌘K
            </kbd>
          </button>
        </div>

        {/* آمار */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {(["TCP", "UDP", "TCP/UDP"] as const).map((tp) => (
            <div key={tp} className="text-center">
              <div
                className={`text-2xl font-black ${
                  tp === "TCP"
                    ? "text-emerald-400"
                    : tp === "UDP"
                      ? "text-amber-400"
                      : "text-violet-400"
                }`}
              >
                {allTransportCounts[tp] ?? 0}
              </div>
              <div
                className={`text-xs mt-0.5 ${
                  isDark ? "text-slate-500" : "text-gray-400"
                }`}
              >
                {tp}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}