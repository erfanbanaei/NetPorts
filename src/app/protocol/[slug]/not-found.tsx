"use client";

import type { Lang } from "@/types";
import Link from "next/link";
import { translations } from "@/lib/translations";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function NotFound() {
  const [isDark] = useLocalStorage<boolean>("netports:dark", true);
  const [lang] = useLocalStorage<Lang>("netports:lang", "fa");

  const t = translations[lang];
  const isRTL = lang === "fa";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className={`min-h-screen flex items-center justify-center px-4 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100"
          : "bg-gradient-to-br from-gray-50 via-white to-blue-50/30 text-slate-800"
      }`}
    >
      <div className="text-center">
        <div className="text-8xl mb-6">🔍</div>
        <h1
          className={`text-3xl font-black mb-4 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {t.notFound}
        </h1>
        <p
          className={`text-lg mb-8 ${
            isDark ? "text-slate-400" : "text-gray-500"
          }`}
        >
          {t.notFoundDesc}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:scale-95"
        >
          <svg
            className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t.goHome}
        </Link>
      </div>
    </div>
  );
}