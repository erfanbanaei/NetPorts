"use client";

import type { Translations } from "@/lib/translations";

interface Props {
  show: boolean;
  isDark: boolean;
  isRTL: boolean;
  t: Translations;
  onScrollTop: () => void;
  onSearch: () => void;
}

export default function FloatingButtons({
  show,
  isDark,
  isRTL,
  t,
  onScrollTop,
  onSearch,
}: Props) {
  if (!show) return null;

  return (
    <>
      {/* بالا رفتن */}
      <button
        onClick={onScrollTop}
        className={`fixed bottom-8 ${isRTL ? "left-8" : "right-8"} z-40 p-3.5 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border ${
          isDark
            ? "bg-blue-600 text-white border-blue-500 shadow-blue-500/30 hover:bg-blue-500"
            : "bg-blue-500 text-white border-blue-400 shadow-blue-500/30 hover:bg-blue-600"
        }`}
        title={t.scrollTop}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>

      {/* جستجو */}
      <button
        onClick={onSearch}
        className={`fixed bottom-8 ${isRTL ? "right-8" : "left-8"} z-40 p-3.5 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border ${
          isDark
            ? "bg-slate-800 text-blue-400 border-slate-700 shadow-slate-900/50 hover:bg-slate-700"
            : "bg-white text-blue-600 border-gray-200 shadow-gray-200/80 hover:bg-gray-50"
        }`}
        title={t.heroSearch}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </>
  );
}