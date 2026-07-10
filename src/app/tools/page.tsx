"use client";

import type { Lang } from "@/types";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState } from "react";

export default function ToolsPage() {
  const [isDark] = useLocalStorage<boolean>("netports:dark", true);
  const [lang] = useLocalStorage<Lang>("netports:lang", "fa");
  const isRTL = lang === "fa";

  const t = {
    title: lang === "fa" ? "🧰 ابزارهای شبکه" : "🧰 Network Tools",
    subtitle: lang === "fa"
      ? "مجموعه‌ای از ابزارهای مفید برای متخصصین شبکه"
      : "A collection of useful tools for network professionals",
    back: lang === "fa" ? "بازگشت به صفحه اصلی" : "Back to Home",
    tools: [
      {
        name: lang === "fa" ? "ماشین حساب زیرشبکه" : "Subnet Calculator",
        desc: lang === "fa" ? "محاسبه Network, Broadcast, Range IP" : "Calculate Network, Broadcast, IP Range",
        icon: "🌐",
        href: "/tools/subnet-calculator",
      },
      {
        name: lang === "fa" ? "مبدل IP" : "IP Converter",
        desc: lang === "fa" ? "تبدیل Decimal ↔ Binary, IPv4 ↔ Integer" : "Convert Decimal ↔ Binary, IPv4 ↔ Integer",
        icon: "🔢",
        href: "/tools/ip-converter",
      },
      {
        name: lang === "fa" ? "DNS Lookup" : "DNS Lookup",
        desc: lang === "fa" ? "دریافت A, MX, NS Records" : "Get A, MX, NS Records",
        icon: "🌍",
        href: "/tools/dns-lookup",
      },
      {
        name: lang === "fa" ? "Whois Lookup" : "Whois Lookup",
        desc: lang === "fa" ? "اطلاعات owner، registrar، expiration" : "Owner, registrar, expiration info",
        icon: "🧾",
        href: "/tools/whois",
      },
    ],
  };

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className={`min-h-screen transition-colors ${isDark ? "bg-slate-950 text-slate-100" : "bg-white text-slate-800"}`}>
      <div className="max-w-screen-xl mx-auto px-4 py-12 sm:px-6">
        {/* Header */}
        <div className="mb-10">
          <Link href="/" className={`inline-flex items-center gap-2 text-sm font-semibold mb-4 opacity-70 hover:opacity-100 ${isDark ? "text-blue-400" : "text-blue-600"}`}>
            <span>{isRTL ? "→" : "←"}</span> {t.back}
          </Link>
          <h1 className="text-4xl font-black mb-2">{t.title}</h1>
          <p className={`text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>{t.subtitle}</p>
        </div>

        {/* Grid ابزارها */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className={`group rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-lg ${
                isDark
                  ? "bg-slate-800/50 border-slate-700 hover:border-blue-500/50"
                  : "bg-white border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="text-4xl mb-4">{tool.icon}</div>
              <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                {tool.name}
              </h3>
              <p className={`text-sm ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                {tool.desc}
              </p>
              <div className={`mt-4 text-xs font-bold ${isDark ? "text-blue-400" : "text-blue-600"} opacity-0 group-hover:opacity-100 transition-opacity`}>
                {lang === "fa" ? "مشاهده ابزار →" : "Open tool →"}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}