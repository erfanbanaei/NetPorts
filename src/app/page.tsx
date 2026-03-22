"use client";

import { Protocol, getFullName, protocolsData } from "../../lib/protocols";
import React, { useCallback, useMemo, useState } from "react";

const scrollbarStyles = `
  .category-scroll {
    scrollbar-width: thin;
    scrollbar-color: rgba(99, 102, 241, 0.5) transparent;
  }
  .category-scroll::-webkit-scrollbar { height: 4px; border-radius: 999px; }
  .category-scroll::-webkit-scrollbar-track { border-radius: 999px; margin: 0 8px; }
  .category-scroll.dark-scroll::-webkit-scrollbar-track { background: rgba(30,41,59,0.5); }
  .category-scroll.light-scroll::-webkit-scrollbar-track { background: rgba(226,232,240,0.6); }
  .category-scroll::-webkit-scrollbar-thumb { background: linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4); border-radius: 999px; }
  .category-scroll::-webkit-scrollbar-thumb:hover { background: linear-gradient(90deg,#818cf8,#a78bfa,#22d3ee); }

  .table-row-hover { transition: background 0.15s; }
  .sort-btn { transition: all 0.15s; }
`;

const translations = {
  fa: {
    title: "مرجع جامع پورت‌های شبکه",
    subtitle: "تمام پروتکل‌ها و پورت‌های مهم شبکه",
    searchPlaceholder: "جستجو بر اساس نام، پورت یا توضیحات...",
    all: "همه",
    lightMode: "☀️ حالت روشن",
    darkMode: "🌙 حالت تاریک",
    noResult: "نتیجه‌ای یافت نشد",
    noResultSub: "عبارت جستجو یا دسته‌بندی را تغییر دهید",
    port: "پورت",
    transport: "پروتکل انتقال",
    totalProtocols: "پروتکل",
    totalShowing: "نمایش",
    of: "از",
    madeWith: "ساخته شده با ❤️ توسط",
    creatorName: "عرفان بنائی",
    scrollTop: "بالا",
    copySuccess: "کپی شد!",
    clickToCopy: "کلیک برای کپی پورت",
    cardView: "کارت",
    tableView: "جدول",
    colPort: "پورت",
    colName: "نام",
    colFullName: "نام کامل",
    colCategory: "دسته‌بندی",
    colTransport: "نوع",
    colDescription: "توضیحات",
    filterActive: "فیلتر فعال",
    contribute: "افزودن پروتکل",
    contributeTooltip: "پروتکل جدید پیشنهاد بده از طریق GitHub",
  },
  en: {
    title: "Network Ports Reference",
    subtitle: "All important network protocols and ports",
    searchPlaceholder: "Search by name, port or description...",
    all: "All",
    lightMode: "☀️ Light Mode",
    darkMode: "🌙 Dark Mode",
    noResult: "No results found",
    noResultSub: "Try changing your search or category filter",
    port: "Port",
    transport: "Protocol",
    totalProtocols: "protocols",
    totalShowing: "Showing",
    of: "of",
    madeWith: "Made with ❤️ by",
    creatorName: "Erfan Banaei",
    scrollTop: "Top",
    copySuccess: "Copied!",
    clickToCopy: "Click to copy port",
    cardView: "Cards",
    tableView: "Table",
    colPort: "Port",
    colName: "Name",
    colFullName: "Full Name",
    colCategory: "Category",
    colTransport: "Type",
    colDescription: "Description",
    filterActive: "Filter active",
    contribute: "Add Protocol",
    contributeTooltip: "Suggest a new protocol via GitHub",
  },
};

const categoryIcons: Record<string, string> = {
  "انتقال فایل": "📁", "File Transfer": "📁",
  "وب": "🌐", "Web": "🌐",
  "ایمیل": "📧", "Email": "📧",
  "امنیت": "🔒", "Security": "🔒",
  "دسترسی از راه دور": "🖥️", "Remote Access": "🖥️",
  "سرویس‌های شبکه": "🔗", "Network Services": "🔗",
  "مدیریت شبکه": "📊", "Network Management": "📊",
  "دایرکتوری": "📂", "Directory": "📂",
  "پایگاه داده": "🗄️", "Database": "🗄️",
  "صف پیام": "📨", "Message Queue": "📨",
  "رسانه و ارتباطات": "🎬", "Media & Communication": "🎬",
  "اشتراک‌گذاری": "🔄", "Sharing": "🔄",
  "پراکسی": "🛡️", "Proxy": "🛡️",
  "کانتینر و DevOps": "🐳", "Container & DevOps": "🐳",
  "مانیتورینگ": "📈", "Monitoring": "📈",
  "بازی و چندرسانه‌ای": "🎮", "Gaming & Multimedia": "🎮",
  "وب‌سرور و API": "⚡", "Web Server & API": "⚡",
  "چاپ": "🖨️", "Printing": "🖨️",
  "ذخیره‌سازی": "💾", "Storage": "💾",
  "CI/CD و ابزارهای توسعه": "🔧", "CI/CD & Dev Tools": "🔧",
  "ارتباطات تیمی": "💬", "Team Communication": "💬",
  "مجازی‌سازی": "🖥️", "Virtualization": "🖥️",
};

type TransportFilter = "all" | "TCP" | "UDP" | "TCP/UDP";
type SortKey = "port" | "name" | "category";
type SortDir = "asc" | "desc";
type ViewMode = "card" | "table";

function getTransportColor(transport: string, isDark: boolean, active = false): string {
  const base = {
    TCP: isDark
      ? "bg-emerald-900/40 text-emerald-300 border-emerald-700"
      : "bg-emerald-50 text-emerald-700 border-emerald-200",
    UDP: isDark
      ? "bg-amber-900/40 text-amber-300 border-amber-700"
      : "bg-amber-50 text-amber-700 border-amber-200",
    "TCP/UDP": isDark
      ? "bg-violet-900/40 text-violet-300 border-violet-700"
      : "bg-violet-50 text-violet-700 border-violet-200",
  } as Record<string, string>;
  return base[transport] ?? (isDark ? "bg-slate-800 text-slate-400 border-slate-700" : "bg-gray-100 text-gray-600 border-gray-200");
}

// ─── کارت پروتکل ───
function ProtocolCard({ protocol, isDarkMode, lang, t }: {
  protocol: Protocol; isDarkMode: boolean; lang: "fa" | "en"; t: typeof translations.fa;
}) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(protocol.port.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [protocol.port]);
  const catKey = lang === "fa" ? protocol.category.fa : protocol.category.en;

  return (
    <div
      className={`group relative p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-800 to-slate-800/80 border-slate-700/60 hover:border-blue-500/70 hover:shadow-blue-500/10"
          : "bg-white border-gray-200 hover:border-blue-400 hover:shadow-blue-100"
      }`}
      style={{ minHeight: "260px" }}
    >
      <div className="flex items-center justify-between mb-3 relative z-10">
        <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${getTransportColor(protocol.transport, isDarkMode)}`}>
          {protocol.transport}
        </span>
        <span className="text-lg" title={catKey}>{categoryIcons[catKey] || "📦"}</span>
      </div>
      <h3 className={`text-lg font-extrabold mb-1 tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
        {protocol.name}
      </h3>
      <p className={`text-[11px] font-mono mb-2 leading-relaxed ${isDarkMode ? "text-slate-500" : "text-gray-400"}`}>
        {getFullName(protocol.abbreviation)}
      </p>
      <p className={`text-sm leading-relaxed flex-grow ${isDarkMode ? "text-slate-300" : "text-gray-600"}`} dir={lang === "fa" ? "rtl" : "ltr"}>
        {lang === "fa" ? protocol.description.fa : protocol.description.en}
      </p>
      <button
        onClick={handleCopy}
        title={t.clickToCopy}
        className={`w-full mt-4 rounded-xl flex items-center justify-center gap-2 py-3.5 font-black text-xl tracking-widest cursor-pointer transition-all duration-200 active:scale-95 ${
          isDarkMode
            ? "bg-slate-900/80 border border-slate-700 text-blue-400 hover:bg-slate-900 hover:border-blue-500/50"
            : "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-600 hover:from-blue-100 hover:to-indigo-100"
        } ${copied ? (isDarkMode ? "!border-green-500 !text-green-400" : "!border-green-500 !text-green-600") : ""}`}
      >
        {copied ? (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-bold">{t.copySuccess}</span>
          </>
        ) : (
          <><span>{t.port}</span><span className="text-2xl">{protocol.port}</span></>
        )}
      </button>
    </div>
  );
}

// ─── نمای جدول ───
function TableView({ protocols, isDarkMode, lang, t, isRTL }: {
  protocols: Protocol[]; isDarkMode: boolean; lang: "fa" | "en"; t: typeof translations.fa; isRTL: boolean;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("port");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [copiedPort, setCopiedPort] = useState<number | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const sorted = useMemo(() => {
    return [...protocols].sort((a, b) => {
      let va: string | number, vb: string | number;
      if (sortKey === "port") { va = a.port; vb = b.port; }
      else if (sortKey === "name") { va = a.name.toLowerCase(); vb = b.name.toLowerCase(); }
      else { va = (lang === "fa" ? a.category.fa : a.category.en).toLowerCase(); vb = (lang === "fa" ? b.category.fa : b.category.en).toLowerCase(); }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [protocols, sortKey, sortDir, lang]);

  const handleCopy = (port: number) => {
    navigator.clipboard.writeText(port.toString());
    setCopiedPort(port);
    setTimeout(() => setCopiedPort(null), 1500);
  };

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="inline-flex flex-col ml-1 opacity-60">
      <svg className={`w-2.5 h-2.5 -mb-0.5 ${sortKey === col && sortDir === "asc" ? "opacity-100 text-blue-400" : ""}`} viewBox="0 0 10 6" fill="currentColor">
        <path d="M5 0L10 6H0z"/>
      </svg>
      <svg className={`w-2.5 h-2.5 ${sortKey === col && sortDir === "desc" ? "opacity-100 text-blue-400" : ""}`} viewBox="0 0 10 6" fill="currentColor">
        <path d="M5 6L0 0H10z"/>
      </svg>
    </span>
  );

  const thClass = `px-4 py-3 text-xs font-bold uppercase tracking-wider select-none cursor-pointer whitespace-nowrap ${
    isDarkMode ? "text-slate-400 hover:text-slate-200" : "text-gray-500 hover:text-gray-800"
  }`;

  return (
    <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? "border-slate-700/60" : "border-gray-200"}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className={isDarkMode ? "bg-slate-800/80" : "bg-gray-50"}>
            <tr>
              <th className={thClass} onClick={() => handleSort("port")}>
                {t.colPort}<SortIcon col="port" />
              </th>
              <th className={thClass} onClick={() => handleSort("name")}>
                {t.colName}<SortIcon col="name" />
              </th>
              <th className={`${thClass} hidden md:table-cell`}>
                {t.colFullName}
              </th>
              <th className={`${thClass} hidden lg:table-cell`} onClick={() => handleSort("category")}>
                {t.colCategory}<SortIcon col="category" />
              </th>
              <th className={thClass}>{t.colTransport}</th>
              <th className={`${thClass} hidden xl:table-cell`}>{t.colDescription}</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode ? "divide-slate-700/50" : "divide-gray-100"}`}>
            {sorted.map((p, i) => {
              const catKey = lang === "fa" ? p.category.fa : p.category.en;
              const isCopied = copiedPort === p.port;
              return (
                <tr
                  key={`${p.name}-${p.port}`}
                  className={`table-row-hover ${
                    isDarkMode
                      ? i % 2 === 0 ? "bg-slate-800/30 hover:bg-slate-700/40" : "bg-slate-800/10 hover:bg-slate-700/40"
                      : i % 2 === 0 ? "bg-white hover:bg-blue-50/40" : "bg-gray-50/50 hover:bg-blue-50/40"
                  }`}
                >
                  {/* پورت */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleCopy(p.port)}
                      title={t.clickToCopy}
                      className={`font-black text-base tabular-nums rounded-lg px-2.5 py-1 transition-all duration-200 active:scale-95 ${
                        isCopied
                          ? isDarkMode ? "bg-green-900/40 text-green-400 border border-green-600" : "bg-green-50 text-green-600 border border-green-300"
                          : isDarkMode ? "bg-slate-900/60 text-blue-400 border border-slate-700 hover:border-blue-500/50" : "bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100"
                      }`}
                    >
                      {isCopied ? "✓" : p.port}
                    </button>
                  </td>
                  {/* نام */}
                  <td className="px-4 py-3">
                    <span className={`font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{p.name}</span>
                  </td>
                  {/* نام کامل */}
                  <td className={`px-4 py-3 hidden md:table-cell font-mono text-xs ${isDarkMode ? "text-slate-500" : "text-gray-400"}`}>
                    {getFullName(p.abbreviation)}
                  </td>
                  {/* دسته‌بندی */}
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-lg ${
                      isDarkMode ? "bg-slate-700/60 text-slate-300" : "bg-gray-100 text-gray-600"
                    }`}>
                      <span>{categoryIcons[catKey] || "📦"}</span>
                      {catKey}
                    </span>
                  </td>
                  {/* transport */}
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getTransportColor(p.transport, isDarkMode)}`}>
                      {p.transport}
                    </span>
                  </td>
                  {/* توضیحات */}
                  <td className={`px-4 py-3 hidden xl:table-cell text-xs max-w-xs ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}
                    dir={lang === "fa" ? "rtl" : "ltr"}>
                    {lang === "fa" ? p.description.fa : p.description.en}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── helper: خواندن از localStorage با مقدار پیش‌فرض ───
function readLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v !== null ? (JSON.parse(v) as T) : fallback;
  } catch { return fallback; }
}

// ─── کامپوننت اصلی ───
export default function ProtocolGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [transportFilter, setTransportFilter] = useState<TransportFilter>("all");

  // تنظیماتی که پرسیست میشن — مقدار اولیه از localStorage خونده میشه
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => readLS("netports:dark", true));
  const [lang, setLang] = useState<"fa" | "en">(() => readLS("netports:lang", "fa"));
  const [viewMode, setViewMode] = useState<ViewMode>(() => readLS("netports:view", "card"));

  const [showScrollTop, setShowScrollTop] = useState(false);

  // ذخیره در localStorage هر بار که تغییر کردن
  React.useEffect(() => { localStorage.setItem("netports:dark", JSON.stringify(isDarkMode)); }, [isDarkMode]);
  React.useEffect(() => { localStorage.setItem("netports:lang", JSON.stringify(lang)); }, [lang]);
  React.useEffect(() => { localStorage.setItem("netports:view", JSON.stringify(viewMode)); }, [viewMode]);

  const t = translations[lang];
  const isRTL = lang === "fa";

  React.useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(protocolsData.map(p => lang === "fa" ? p.category.fa : p.category.en));
    return [t.all, ...Array.from(unique)];
  }, [lang, t.all]);

  const filteredProtocols = useMemo(() => {
    return protocolsData.filter(protocol => {
      const search = searchTerm.toLowerCase();
      const matchSearch =
        protocol.name.toLowerCase().includes(search) ||
        protocol.port.toString().includes(search) ||
        protocol.abbreviation.toLowerCase().includes(search) ||
        protocol.description.fa.includes(searchTerm) ||
        protocol.description.en.toLowerCase().includes(search) ||
        getFullName(protocol.abbreviation).toLowerCase().includes(search);

      const catName = lang === "fa" ? protocol.category.fa : protocol.category.en;
      const matchCategory = selectedCategory === "all" || selectedCategory === t.all || catName === selectedCategory;

      const matchTransport = transportFilter === "all" || protocol.transport === transportFilter;

      return matchSearch && matchCategory && matchTransport;
    });
  }, [searchTerm, selectedCategory, lang, t.all, transportFilter]);

  const transportCounts = useMemo(() => {
    return filteredProtocols.reduce((acc, p) => {
      acc[p.transport] = (acc[p.transport] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [filteredProtocols]);

  // تعداد کل هر transport (برای نمایش در badge)
  const allTransportCounts = useMemo(() => {
    return protocolsData.reduce((acc, p) => {
      acc[p.transport] = (acc[p.transport] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, []);

  const handleTransportClick = (tp: TransportFilter) => {
    setTransportFilter(prev => prev === tp ? "all" : tp);
  };

  return (
    <>
      <style>{scrollbarStyles}</style>
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className={`min-h-screen flex flex-col transition-colors duration-500 ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100"
            : "bg-gradient-to-br from-gray-50 via-white to-blue-50/30 text-slate-800"
        }`}
      >
        {/* ═══════════ HEADER ═══════════ */}
        <header className={`sticky top-0 z-30 backdrop-blur-xl border-b transition-colors duration-300 ${isDarkMode ? "bg-slate-900/80 border-slate-800" : "bg-white/80 border-gray-200"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* ردیف بالا */}
            <div className="py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-start">
                <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <span className={`bg-gradient-to-r bg-clip-text text-transparent ${isDarkMode ? "from-blue-400 via-cyan-400 to-purple-400" : "from-blue-600 via-indigo-600 to-purple-600"}`}>
                    {t.title}
                  </span>
                </h1>
                <p className={`text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>{t.subtitle}</p>
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                {/* toggle کارت/جدول */}
                <div className={`flex rounded-xl border overflow-hidden ${isDarkMode ? "border-slate-700 bg-slate-800" : "border-gray-300 bg-white"}`}>
                  <button
                    onClick={() => setViewMode("card")}
                    className={`px-3.5 py-2 text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${
                      viewMode === "card"
                        ? isDarkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
                        : isDarkMode ? "text-slate-400 hover:text-slate-200" : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    {t.cardView}
                  </button>
                  <button
                    onClick={() => setViewMode("table")}
                    className={`px-3.5 py-2 text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${
                      viewMode === "table"
                        ? isDarkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
                        : isDarkMode ? "text-slate-400 hover:text-slate-200" : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M10 3v18" />
                    </svg>
                    {t.tableView}
                  </button>
                </div>

                <a
                  href={`https://github.com/erfanbanaei/network-ports-reference/issues/new?template=add_protocol.yml&title=%5BNew+Protocol%5D+`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={t.contributeTooltip}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border flex items-center gap-2 ${
                    isDarkMode
                      ? "bg-slate-800 text-emerald-400 border-slate-700 hover:bg-slate-700 hover:border-emerald-600/50"
                      : "bg-white text-emerald-600 border-gray-300 hover:bg-emerald-50 hover:border-emerald-300"
                  }`}
                >
                  {/* GitHub icon */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  {t.contribute}
                </a>

                <button
                  onClick={() => { setLang(lang === "fa" ? "en" : "fa"); setSelectedCategory("all"); }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border ${isDarkMode ? "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                >
                  {lang === "fa" ? "🇬🇧 English" : "🇮🇷 فارسی"}
                </button>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border ${isDarkMode ? "bg-slate-800 text-yellow-400 border-slate-700 hover:bg-slate-700" : "bg-white text-slate-700 border-gray-300 hover:bg-gray-50"}`}
                >
                  {isDarkMode ? t.lightMode : t.darkMode}
                </button>
              </div>
            </div>

            {/* جستجو */}
            <div className="pb-3">
              <div className="relative">
                <div className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 pointer-events-none`}>
                  <svg className={`w-5 h-5 ${isDarkMode ? "text-slate-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className={`w-full py-3.5 rounded-xl border text-sm transition-all duration-200 focus:ring-2 focus:outline-none ${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"} ${isDarkMode ? "bg-slate-800/60 border-slate-700 text-slate-100 placeholder-slate-500 focus:ring-blue-500/40 focus:border-blue-500/40" : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500/30 focus:border-blue-400"}`}
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm("")} className={`absolute ${isRTL ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? "text-slate-500 hover:text-slate-300" : "text-gray-400 hover:text-gray-600"}`}>✕</button>
                )}
              </div>
            </div>

            {/* دسته‌بندی‌ها */}
            <div className="pb-2">
              <div className={`h-px w-full mb-3 rounded-full ${isDarkMode ? "bg-gradient-to-r from-transparent via-slate-700 to-transparent" : "bg-gradient-to-r from-transparent via-gray-200 to-transparent"}`} />
              <div className={`overflow-x-auto pb-3 category-scroll ${isDarkMode ? "dark-scroll" : "light-scroll"}`}>
                <div className="flex gap-2 min-w-max">
                  {categories.map(category => {
                    const isActive = category === t.all ? selectedCategory === "all" || selectedCategory === t.all : selectedCategory === category;
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category === t.all ? "all" : category)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap border ${
                          isActive
                            ? isDarkMode ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500 shadow-lg shadow-blue-500/20" : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-500 shadow-lg shadow-blue-500/25"
                            : isDarkMode ? "bg-slate-800/60 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-slate-200" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        {categoryIcons[category] && <span className={isRTL ? "ml-1.5" : "mr-1.5"}>{categoryIcons[category]}</span>}
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ═══════════ STATS BAR با فیلتر کلیکی ═══════════ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-1 w-full">
          <div className={`rounded-2xl border px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 ${isDarkMode ? "bg-slate-800/50 border-slate-700/50" : "bg-white border-gray-200 shadow-sm"}`}>
            {/* سمت چپ */}
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${isDarkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-50 text-blue-600"}`}>🔌</div>
              <span className={`text-sm ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
                {t.totalShowing}{" "}
                <span className={`font-bold text-base ${isDarkMode ? "text-white" : "text-gray-900"}`}>{filteredProtocols.length}</span>
                {" "}{t.of}{" "}
                <span className={`font-semibold ${isDarkMode ? "text-slate-300" : "text-gray-700"}`}>{protocolsData.length}</span>
                {" "}{t.totalProtocols}
              </span>
              {/* نشانگر فیلتر فعال */}
              {transportFilter !== "all" && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? "bg-blue-900/50 text-blue-300 border border-blue-700" : "bg-blue-50 text-blue-600 border border-blue-200"}`}>
                  {t.filterActive}: {transportFilter}
                </span>
              )}
            </div>

            {/* badge های قابل کلیک */}
            <div className="flex items-center gap-2">
              {(["TCP", "UDP", "TCP/UDP"] as const).map(tp => {
                const colorMap: Record<"TCP" | "UDP" | "TCP/UDP", { active: string; dot: string; inactive: string }> = {
                  TCP: { active: isDarkMode ? "bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/20" : "bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/20", dot: "bg-emerald-500", inactive: isDarkMode ? "bg-emerald-900/30 border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/50" : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100" },
                  UDP: { active: isDarkMode ? "bg-amber-600 text-white border-amber-500 shadow-amber-500/20" : "bg-amber-500 text-white border-amber-400 shadow-amber-500/20", dot: "bg-amber-500", inactive: isDarkMode ? "bg-amber-900/30 border-amber-800/60 text-amber-300 hover:bg-amber-900/50" : "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100" },
                  "TCP/UDP": { active: isDarkMode ? "bg-violet-600 text-white border-violet-500 shadow-violet-500/20" : "bg-violet-500 text-white border-violet-400 shadow-violet-500/20", dot: "bg-violet-500", inactive: isDarkMode ? "bg-violet-900/30 border-violet-800/60 text-violet-300 hover:bg-violet-900/50" : "bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100" },
                };
                const colors = colorMap[tp];
                const isActive = transportFilter === tp;
                return (
                  <button
                    key={tp}
                    onClick={() => handleTransportClick(tp)}
                    title={isActive ? "کلیک برای حذف فیلتر" : `فیلتر ${tp}`}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer active:scale-95 ${isActive ? `${colors.active} shadow-lg` : colors.inactive}`}
                  >
                    {isActive
                      ? <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12"/></svg>
                      : <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} inline-block`} />
                    }
                    {tp}
                    <span className={`font-bold tabular-nums ${isActive ? "opacity-80" : ""}`}>
                      {allTransportCounts[tp] ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ═══════════ MAIN CONTENT ═══════════ */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
          {filteredProtocols.length > 0 ? (
            viewMode === "card" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-stretch">
                {filteredProtocols.map(protocol => (
                  <ProtocolCard
                    key={`${protocol.name}-${protocol.port}`}
                    protocol={protocol}
                    isDarkMode={isDarkMode}
                    lang={lang}
                    t={t}
                  />
                ))}
              </div>
            ) : (
              <TableView
                protocols={filteredProtocols}
                isDarkMode={isDarkMode}
                lang={lang}
                t={t}
                isRTL={isRTL}
              />
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="text-6xl">🔍</div>
              <p className={`text-xl font-bold ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>{t.noResult}</p>
              <p className={`text-sm ${isDarkMode ? "text-slate-600" : "text-gray-400"}`}>{t.noResultSub}</p>
            </div>
          )}
        </main>

        {/* ═══════════ FOOTER ═══════════ */}
        <footer className={`text-center py-10 text-sm border-t ${isDarkMode ? "text-slate-500 border-slate-800" : "text-gray-500 border-gray-200"}`}>
          {t.madeWith}{" "}
          <a href="https://erfanbanaei.ir" target="_blank" rel="noopener noreferrer"
            className={`font-bold transition-colors ${isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"} hover:underline`}>
            {t.creatorName}
          </a>
        </footer>

        {/* ═══════════ SCROLL TO TOP ═══════════ */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`fixed bottom-8 z-40 p-3.5 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border ${isRTL ? "left-8" : "right-8"} ${isDarkMode ? "bg-blue-600 text-white border-blue-500 shadow-blue-500/30 hover:bg-blue-500" : "bg-blue-500 text-white border-blue-400 shadow-blue-500/30 hover:bg-blue-600"}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}
      </div>
    </>
  );
}