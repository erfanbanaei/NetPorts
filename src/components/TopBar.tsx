"use client";

import { CONTRIBUTE_URLS } from "@/lib/constants";
import type { Lang } from "@/types";
import Link from "next/link"; // ایمپورت Link
import type { Translations } from "@/lib/translations";

interface Props {
  isDark: boolean;
  lang: Lang;
  t: Translations;
  onToggleDark: () => void;
  onToggleLang: () => void;
}

export default function TopBar({
  isDark,
  lang,
  t,
  onToggleDark,
  onToggleLang,
}: Props) {
  return (
    <header
      className={`border-b ${
        isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between">
        {/* لوگو */}
        <Link href="/" className="text-2xl font-black tracking-tight"> {/* لوگو لینک به خانه */}
          <span
            className={`bg-gradient-to-r bg-clip-text text-transparent ${
              isDark
                ? "from-blue-400 via-cyan-400 to-purple-400"
                : "from-blue-600 via-indigo-600 to-purple-600"
            }`}
          >
            NetPorts
          </span>
        </Link>

        {/* دکمه‌ها */}
        <div className="flex items-center gap-2">
          {/* دکمه ابزارها (جدید) */}
          <Link
            href="/tools"
            className={`px-3 py-2 rounded-xl text-sm font-bold border items-center gap-1.5 transition-all active:scale-95 hidden sm:flex ${
              isDark
                ? "bg-slate-800 text-cyan-400 border-slate-700 hover:bg-slate-700"
                : "bg-white text-cyan-600 border-gray-300 hover:bg-cyan-50"
            }`}
          >
            🧰 {lang === "fa" ? "ابزارها" : "Tools"}
          </Link>

          {/* مشارکت */}
          <a
            href={CONTRIBUTE_URLS[lang]}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden sm:flex px-3 py-2 rounded-xl text-sm font-bold border items-center gap-1.5 transition-all active:scale-95 ${
              isDark
                ? "bg-slate-800 text-emerald-400 border-slate-700 hover:bg-slate-700"
                : "bg-white text-emerald-600 border-gray-300 hover:bg-emerald-50"
            }`}
          >
            {t.contribute}
          </a>

          {/* دکمه تغییر زبان */}
          <button
            onClick={onToggleLang}
            className={`px-3 py-2 rounded-xl text-sm font-bold border transition-all active:scale-95 ${
              isDark
                ? "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {lang === "fa" ? "🇬🇧 EN" : "🇮🇷 FA"}
          </button>

          {/* دکمه تغییر تم */}
          <button
            onClick={onToggleDark}
            className={`px-3 py-2 rounded-xl text-sm font-bold border transition-all active:scale-95 ${
              isDark
                ? "bg-slate-800 text-yellow-400 border-slate-700 hover:bg-slate-700"
                : "bg-white text-slate-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}