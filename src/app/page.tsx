"use client";

import { Protocol, getFullName, protocolsData } from "../../lib/protocols";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* ═══════════════════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════════════════ */
const scrollbarStyles = `
.category-scroll {
  scrollbar-width: thin;
  scrollbar-color: #3b82f6 transparent;
  padding-bottom: 10px;
}
.category-scroll::-webkit-scrollbar { height: 5px; border-radius: 999px; }
.category-scroll::-webkit-scrollbar-track { border-radius: 999px; margin: 0 8px; background: transparent; }
.category-scroll.dark-scroll::-webkit-scrollbar-track { background: rgba(30,41,59,0.6); }
.category-scroll.light-scroll::-webkit-scrollbar-track { background: rgba(219,234,254,0.7); }
.category-scroll::-webkit-scrollbar-thumb { background: linear-gradient(90deg,#2563eb,#3b82f6,#60a5fa); border-radius: 999px; }
.category-scroll::-webkit-scrollbar-thumb:hover { background: linear-gradient(90deg,#1d4ed8,#2563eb,#3b82f6); }
.table-row-hover { transition: background 0.15s; }
@keyframes fadeInUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes scaleIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
.anim-card { animation: fadeInUp 0.35s ease both; }
.anim-hero { animation: fadeIn 0.6s ease both; }
.anim-card:nth-child(1){animation-delay:.03s}.anim-card:nth-child(2){animation-delay:.06s}
.anim-card:nth-child(3){animation-delay:.09s}.anim-card:nth-child(4){animation-delay:.12s}
.anim-card:nth-child(5){animation-delay:.15s}.anim-card:nth-child(6){animation-delay:.18s}
.anim-card:nth-child(7){animation-delay:.21s}.anim-card:nth-child(8){animation-delay:.24s}
.search-modal-backdrop { animation: fadeIn 0.18s ease both; }
.search-modal-box { animation: scaleIn 0.2s ease both; }
`;

/* ═══════════════════════════════════════════════════════
   TRANSLATIONS
   ═══════════════════════════════════════════════════════ */
const translations = {
  fa: {
    title: "مرجع جامع پورت‌های شبکه",
    searchPlaceholder: "جستجو بر اساس نام، پورت یا توضیحات...",
    all: "همه",
    noResult: "نتیجه‌ای یافت نشد",
    noResultSub: "عبارت جستجو یا دسته‌بندی را تغییر دهید",
    port: "پورت",
    totalProtocols: "پروتکل",
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
    heroTitle: "مرجع جامع پورت‌های شبکه",
    heroSub: "بیش از ۲۰۰ پروتکل شبکه — سریع جستجو کن، فیلتر کن، کپی کن",
    heroSearch: "جستجو در پروتکل‌ها...",
    heroCta: "مشاهده همه پروتکل‌ها",
  },
  en: {
    title: "Network Ports Reference",
    searchPlaceholder: "Search by name, port or description...",
    all: "All",
    noResult: "No results found",
    noResultSub: "Try changing your search or category filter",
    port: "Port",
    totalProtocols: "protocols",
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
    heroTitle: "Network Ports Reference",
    heroSub: "200+ network protocols — search fast, filter, copy",
    heroSearch: "Search protocols...",
    heroCta: "Browse all protocols",
  },
};

/* ═══════════════════════════════════════════════════════
   CONSTANTS & TYPES
   ═══════════════════════════════════════════════════════ */
const categoryIcons: Record<string, string> = {
  "انتقال فایل": "📁",
  "File Transfer": "📁",
  وب: "🌐",
  Web: "🌐",
  ایمیل: "📧",
  Email: "📧",
  امنیت: "🔒",
  Security: "🔒",
  "دسترسی از راه دور": "🖥️",
  "Remote Access": "🖥️",
  "سرویس‌های شبکه": "🔗",
  "Network Services": "🔗",
  "مدیریت شبکه": "📊",
  "Network Management": "📊",
  دایرکتوری: "📂",
  Directory: "📂",
  "پایگاه داده": "🗄️",
  Database: "🗄️",
  "صف پیام": "📨",
  "Message Queue": "📨",
  "رسانه و ارتباطات": "🎬",
  "Media & Communication": "🎬",
  "اشتراک‌گذاری": "🔄",
  Sharing: "🔄",
  پراکسی: "🛡️",
  Proxy: "🛡️",
  "کانتینر و DevOps": "🐳",
  "Container & DevOps": "🐳",
  مانیتورینگ: "📈",
  Monitoring: "📈",
  "بازی و چندرسانه‌ای": "🎮",
  "Gaming & Multimedia": "🎮",
  "وب‌سرور و API": "⚡",
  "Web Server & API": "⚡",
  چاپ: "🖨️",
  Printing: "🖨️",
  "ذخیره‌سازی": "💾",
  Storage: "💾",
  "CI/CD و ابزارهای توسعه": "🔧",
  "CI/CD & Dev Tools": "🔧",
  "ارتباطات تیمی": "💬",
  "Team Communication": "💬",
  "مجازی‌سازی": "🖥️",
  Virtualization: "🖥️",
};

type TransportFilter = "all" | "TCP" | "UDP" | "TCP/UDP";
type SortKey = "port" | "name" | "category";
type SortDir = "asc" | "desc";
type ViewMode = "card" | "table";
type T = typeof translations.fa;

// ── ثابت‌ها — URL تمپلیت بر اساس زبان ──
const CONTRIBUTE_URLS = {
  fa: "https://github.com/erfanbanaei/network-ports-reference/issues/new?template=add_protocol_fa.yml",
  en: "https://github.com/erfanbanaei/network-ports-reference/issues/new?template=add_protocol_en.yml",
} as const;

/* ═══════════════════════════════════════════════════════
   UTILITIES
   ═══════════════════════════════════════════════════════ */
function readLS<V>(key: string, fallback: V): V {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v !== null ? (JSON.parse(v) as V) : fallback;
  } catch {
    return fallback;
  }
}

function getTransportColor(transport: string, isDark: boolean): string {
  const map: Record<string, string> = {
    TCP: isDark
      ? "bg-emerald-900/40 text-emerald-300 border-emerald-700"
      : "bg-emerald-50 text-emerald-700 border-emerald-200",
    UDP: isDark
      ? "bg-amber-900/40 text-amber-300 border-amber-700"
      : "bg-amber-50 text-amber-700 border-amber-200",
    "TCP/UDP": isDark
      ? "bg-violet-900/40 text-violet-300 border-violet-700"
      : "bg-violet-50 text-violet-700 border-violet-200",
  };
  return (
    map[transport] ??
    (isDark
      ? "bg-slate-800 text-slate-400 border-slate-700"
      : "bg-gray-100 text-gray-600 border-gray-200")
  );
}

function getTpColors(isDark: boolean) {
  return {
    TCP: {
      active: isDark
        ? "bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/20"
        : "bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/20",
      dot: "bg-emerald-500",
      inactive: isDark
        ? "bg-emerald-900/30 border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/50"
        : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100",
    },
    UDP: {
      active: isDark
        ? "bg-amber-600 text-white border-amber-500 shadow-amber-500/20"
        : "bg-amber-500 text-white border-amber-400 shadow-amber-500/20",
      dot: "bg-amber-500",
      inactive: isDark
        ? "bg-amber-900/30 border-amber-800/60 text-amber-300 hover:bg-amber-900/50"
        : "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100",
    },
    "TCP/UDP": {
      active: isDark
        ? "bg-violet-600 text-white border-violet-500 shadow-violet-500/20"
        : "bg-violet-500 text-white border-violet-400 shadow-violet-500/20",
      dot: "bg-violet-500",
      inactive: isDark
        ? "bg-violet-900/30 border-violet-800/60 text-violet-300 hover:bg-violet-900/50"
        : "bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100",
    },
  } as const;
}

/* ═══════════════════════════════════════════════════════
   SUB‑COMPONENTS
   ═══════════════════════════════════════════════════════ */

/** حذف attribute مزاحم hydration */
export function HydrationFix() {
  useEffect(() => {
    const rm = () => {
      if (document.body.hasAttribute("cz-shortcut-listen"))
        document.body.removeAttribute("cz-shortcut-listen");
    };
    rm();
    const obs = new MutationObserver((muts) =>
      muts.forEach(
        (m) =>
          m.type === "attributes" &&
          m.attributeName === "cz-shortcut-listen" &&
          rm()
      )
    );
    obs.observe(document.body, {
      attributes: true,
      attributeFilter: ["cz-shortcut-listen"],
    });
    return () => obs.disconnect();
  }, []);
  return null;
}

/* ─── Search Modal ─── */
function SearchModal({
  isOpen,
  onClose,
  lang,
  isDark,
  isRTL,
  t,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  lang: "fa" | "en";
  isDark: boolean;
  isRTL: boolean;
  t: T;
  onSelect: (name: string) => void;
}) {
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => ref.current?.focus(), 60);
    }
  }, [isOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const s = query.toLowerCase();
    return protocolsData
      .filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.port.toString().includes(s) ||
          p.abbreviation.toLowerCase().includes(s) ||
          getFullName(p.abbreviation).toLowerCase().includes(s)
      )
      .slice(0, 8);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      className="search-modal-backdrop fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4"
      style={{ background: "rgba(0,0,0,.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`search-modal-box w-full max-w-xl rounded-2xl border overflow-hidden shadow-2xl ${isDark ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"}`}
      >
        {/* input */}
        <div className="relative flex items-center">
          <svg
            className={`absolute ${isRTL ? "right-4" : "left-4"} w-5 h-5 ${isDark ? "text-slate-500" : "text-gray-400"}`}
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
          <input
            ref={ref}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.heroSearch}
            dir={isRTL ? "rtl" : "ltr"}
            className={`w-full py-4 text-base border-0 outline-none bg-transparent ${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"} ${isDark ? "text-white placeholder-slate-500" : "text-gray-900 placeholder-gray-400"}`}
          />
          <button
            onClick={onClose}
            className={`absolute ${isRTL ? "left-3" : "right-3"} text-xs px-2 py-1 rounded border ${isDark ? "border-slate-700 text-slate-500 hover:text-slate-300" : "border-gray-200 text-gray-400 hover:text-gray-600"}`}
          >
            ESC
          </button>
        </div>

        {/* results */}
        {results.length > 0 && (
          <div
            className={`border-t ${isDark ? "border-slate-700/60" : "border-gray-100"}`}
          >
            {results.map((p) => {
              const catKey = lang === "fa" ? p.category.fa : p.category.en;
              return (
                <button
                  key={`${p.port}-${p.name}`}
                  onClick={() => {
                    onSelect(p.name);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left ${isDark ? "hover:bg-slate-800" : "hover:bg-gray-50"}`}
                >
                  <span
                    className={`font-black tabular-nums text-sm min-w-[50px] ${isDark ? "text-blue-400" : "text-blue-600"}`}
                  >
                    {p.port}
                  </span>
                  <span
                    className={`font-semibold text-sm flex-1 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    {p.name}
                  </span>
                  <span
                    className={`text-xs ${isDark ? "text-slate-500" : "text-gray-400"}`}
                  >
                    {categoryIcons[catKey] || "📦"} {catKey}
                  </span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded border ${getTransportColor(p.transport, isDark)}`}
                  >
                    {p.transport}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* empty */}
        {query.trim() !== "" && results.length === 0 && (
          <div
            className={`border-t py-8 text-center text-sm ${isDark ? "border-slate-700/60 text-slate-500" : "border-gray-100 text-gray-400"}`}
          >
            {t.noResult}
          </div>
        )}

        {/* hint */}
        {query.trim() === "" && (
          <div
            className={`border-t px-4 py-2.5 flex justify-between text-xs ${isDark ? "border-slate-700/60 text-slate-600" : "border-gray-100 text-gray-400"}`}
          >
            <span>↵ {lang === "fa" ? "انتخاب" : "select"}</span>
            <span>ESC {lang === "fa" ? "بستن" : "close"}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Protocol Card ─── */
function ProtocolCard({
  protocol,
  isDark,
  lang,
  t,
  className = "",
}: {
  protocol: Protocol;
  isDark: boolean;
  lang: "fa" | "en";
  t: T;
  className?: string;
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
      className={`group relative p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col overflow-hidden ${className} ${
        isDark
          ? "bg-gradient-to-br from-slate-800 to-slate-800/80 border-slate-700/60 hover:border-blue-500/70 hover:shadow-blue-500/10"
          : "bg-white border-gray-200 hover:border-blue-400 hover:shadow-blue-100"
      }`}
      style={{ minHeight: 260 }}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-xs px-2.5 py-1 rounded-full border font-medium ${getTransportColor(protocol.transport, isDark)}`}
        >
          {protocol.transport}
        </span>
        <span className="text-lg" title={catKey}>
          {categoryIcons[catKey] || "📦"}
        </span>
      </div>

      <h3
        className={`text-lg font-extrabold mb-1 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
      >
        {protocol.name}
      </h3>
      <p
        className={`text-[11px] font-mono mb-2 leading-relaxed ${isDark ? "text-slate-500" : "text-gray-400"}`}
      >
        {getFullName(protocol.abbreviation)}
      </p>
      <p
        className={`text-sm leading-relaxed flex-grow ${isDark ? "text-slate-300" : "text-gray-600"}`}
        dir={lang === "fa" ? "rtl" : "ltr"}
      >
        {lang === "fa" ? protocol.description.fa : protocol.description.en}
      </p>

      <button
        onClick={handleCopy}
        title={t.clickToCopy}
        className={`w-full mt-4 rounded-xl flex items-center justify-center gap-2 py-3.5 font-black text-xl tracking-widest cursor-pointer transition-all duration-200 active:scale-95 ${
          isDark
            ? "bg-slate-900/80 border border-slate-700 text-blue-400 hover:bg-slate-900 hover:border-blue-500/50"
            : "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-600 hover:from-blue-100 hover:to-indigo-100"
        } ${copied ? (isDark ? "!border-green-500 !text-green-400" : "!border-green-500 !text-green-600") : ""}`}
      >
        {copied ? (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm font-bold">{t.copySuccess}</span>
          </>
        ) : (
          <>
            <span>{t.port}</span>
            <span className="text-2xl">{protocol.port}</span>
          </>
        )}
      </button>
    </div>
  );
}

/* ─── Table View ─── */
function TableView({
  protocols,
  isDark,
  lang,
  t,
  isRTL,
}: {
  protocols: Protocol[];
  isDark: boolean;
  lang: "fa" | "en";
  t: T;
  isRTL: boolean;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("port");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [copiedPort, setCopiedPort] = useState<number | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = useMemo(() => {
    return [...protocols].sort((a, b) => {
      let va: string | number, vb: string | number;
      if (sortKey === "port") {
        va = a.port;
        vb = b.port;
      } else if (sortKey === "name") {
        va = a.name.toLowerCase();
        vb = b.name.toLowerCase();
      } else {
        va = (lang === "fa" ? a.category.fa : a.category.en).toLowerCase();
        vb = (lang === "fa" ? b.category.fa : b.category.en).toLowerCase();
      }
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
      <svg
        className={`w-2.5 h-2.5 -mb-0.5 ${sortKey === col && sortDir === "asc" ? "opacity-100 text-blue-400" : ""}`}
        viewBox="0 0 10 6"
        fill="currentColor"
      >
        <path d="M5 0L10 6H0z" />
      </svg>
      <svg
        className={`w-2.5 h-2.5 ${sortKey === col && sortDir === "desc" ? "opacity-100 text-blue-400" : ""}`}
        viewBox="0 0 10 6"
        fill="currentColor"
      >
        <path d="M5 6L0 0H10z" />
      </svg>
    </span>
  );

  const th = `px-4 py-3 text-xs font-bold uppercase tracking-wider select-none cursor-pointer whitespace-nowrap ${isDark ? "text-slate-400 hover:text-slate-200" : "text-gray-500 hover:text-gray-800"}`;

  return (
    <div
      className={`rounded-2xl border overflow-hidden ${isDark ? "border-slate-700/60" : "border-gray-200"}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className={isDark ? "bg-slate-800/80" : "bg-gray-50"}>
            <tr>
              <th className={th} onClick={() => handleSort("port")}>
                {t.colPort}
                <SortIcon col="port" />
              </th>
              <th className={th} onClick={() => handleSort("name")}>
                {t.colName}
                <SortIcon col="name" />
              </th>
              <th className={`${th} hidden md:table-cell`}>{t.colFullName}</th>
              <th
                className={`${th} hidden lg:table-cell`}
                onClick={() => handleSort("category")}
              >
                {t.colCategory}
                <SortIcon col="category" />
              </th>
              <th className={th}>{t.colTransport}</th>
              <th className={`${th} hidden xl:table-cell`}>
                {t.colDescription}
              </th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${isDark ? "divide-slate-700/50" : "divide-gray-100"}`}
          >
            {sorted.map((p, i) => {
              const catKey = lang === "fa" ? p.category.fa : p.category.en;
              const isCopied = copiedPort === p.port;
              return (
                <tr
                  key={`${p.name}-${p.port}`}
                  className={`table-row-hover ${
                    isDark
                      ? i % 2 === 0
                        ? "bg-slate-800/30 hover:bg-slate-700/40"
                        : "bg-slate-800/10 hover:bg-slate-700/40"
                      : i % 2 === 0
                        ? "bg-white hover:bg-blue-50/40"
                        : "bg-gray-50/50 hover:bg-blue-50/40"
                  }`}
                >
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleCopy(p.port)}
                      title={t.clickToCopy}
                      className={`font-black text-base tabular-nums rounded-lg px-2.5 py-1 transition-all duration-200 active:scale-95 ${
                        isCopied
                          ? isDark
                            ? "bg-green-900/40 text-green-400 border border-green-600"
                            : "bg-green-50 text-green-600 border border-green-300"
                          : isDark
                            ? "bg-slate-900/60 text-blue-400 border border-slate-700 hover:border-blue-500/50"
                            : "bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100"
                      }`}
                    >
                      {isCopied ? "✓" : p.port}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      {p.name}
                    </span>
                  </td>
                  <td
                    className={`px-4 py-3 hidden md:table-cell font-mono text-xs ${isDark ? "text-slate-500" : "text-gray-400"}`}
                  >
                    {getFullName(p.abbreviation)}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span
                      className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-lg ${isDark ? "bg-slate-700/60 text-slate-300" : "bg-gray-100 text-gray-600"}`}
                    >
                      <span>{categoryIcons[catKey] || "📦"}</span>
                      {catKey}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getTransportColor(p.transport, isDark)}`}
                    >
                      {p.transport}
                    </span>
                  </td>
                  <td
                    className={`px-4 py-3 hidden xl:table-cell text-xs max-w-xs ${isDark ? "text-slate-400" : "text-gray-500"}`}
                    dir={lang === "fa" ? "rtl" : "ltr"}
                  >
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

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function ProtocolGrid() {
  /* ── state ── */
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [transportFilter, setTransportFilter] =
    useState<TransportFilter>("all");
  const [isDark, setIsDark] = useState(() => readLS("netports:dark", true));
  const [lang, setLang] = useState<"fa" | "en">(() =>
    readLS("netports:lang", "fa")
  );
  const [viewMode, setViewMode] = useState<ViewMode>(() =>
    readLS("netports:view", "card")
  );
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];
  const isRTL = lang === "fa";

  /* ── persist ── */
  useEffect(() => {
    localStorage.setItem("netports:dark", JSON.stringify(isDark));
  }, [isDark]);
  useEffect(() => {
    localStorage.setItem("netports:lang", JSON.stringify(lang));
  }, [lang]);
  useEffect(() => {
    localStorage.setItem("netports:view", JSON.stringify(viewMode));
  }, [viewMode]);

  /* ── scroll watcher ── */
  useEffect(() => {
    const fn = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── keyboard ── */
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowSearchModal(false);
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearchModal((p) => !p);
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const scrollToToolbar = useCallback(
    () =>
      toolbarRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      }),
    []
  );

  /* ── computed ── */
  const categories = useMemo(() => {
    const unique = new Set(
      protocolsData.map((p) =>
        lang === "fa" ? p.category.fa : p.category.en
      )
    );
    return [t.all, ...Array.from(unique)];
  }, [lang, t.all]);

  const filteredProtocols = useMemo(() => {
    const s = searchTerm.toLowerCase();
    return protocolsData.filter((p) => {
      const matchSearch =
        !s ||
        p.name.toLowerCase().includes(s) ||
        p.port.toString().includes(s) ||
        p.abbreviation.toLowerCase().includes(s) ||
        p.description.fa.includes(searchTerm) ||
        p.description.en.toLowerCase().includes(s) ||
        getFullName(p.abbreviation).toLowerCase().includes(s);
      const cat = lang === "fa" ? p.category.fa : p.category.en;
      const matchCat =
        selectedCategory === "all" ||
        selectedCategory === t.all ||
        cat === selectedCategory;
      const matchTr =
        transportFilter === "all" || p.transport === transportFilter;
      return matchSearch && matchCat && matchTr;
    });
  }, [searchTerm, selectedCategory, lang, t.all, transportFilter]);

  const allTransportCounts = useMemo(
    () =>
      protocolsData.reduce(
        (a, p) => {
          a[p.transport] = (a[p.transport] || 0) + 1;
          return a;
        },
        {} as Record<string, number>
      ),
    []
  );

  const tpColors = useMemo(() => getTpColors(isDark), [isDark]);

  /* ═══════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════ */
  return (
    <>
      <style>{scrollbarStyles}</style>

      {/* ── Search Modal ── */}
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        lang={lang}
        isDark={isDark}
        isRTL={isRTL}
        t={t}
        onSelect={(name) => {
          setSearchTerm(name);
          setTimeout(scrollToToolbar, 80);
        }}
      />

      <div
        dir={isRTL ? "rtl" : "ltr"}
        className={`min-h-screen flex flex-col transition-colors duration-500 ${
          isDark
            ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100"
            : "bg-gradient-to-br from-gray-50 via-white to-blue-50/30 text-slate-800"
        }`}
      >
        {/* ══════════════════════════════════════════════
            TOP BAR  —  scrolls away ، فقط برند + تنظیمات
            ══════════════════════════════════════════════ */}
        <header
          className={`border-b ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}`}
        >
          <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between">
            {/* لوگو */}
            <h1 className="text-2xl font-black tracking-tight">
              <span
                className={`bg-gradient-to-r bg-clip-text text-transparent ${isDark ? "from-blue-400 via-cyan-400 to-purple-400" : "from-blue-600 via-indigo-600 to-purple-600"}`}
              >
                NetPorts
              </span>
            </h1>

            {/* دکمه‌های تنظیمات */}
            <div className="flex items-center gap-2">
        <a
  href={CONTRIBUTE_URLS[lang]}
  target="_blank"
  rel="noopener noreferrer"
  className={`hidden sm:flex px-3 py-2 rounded-xl text-sm font-bold border items-center gap-1.5 transition-all ${
    isDark
      ? "bg-slate-800 text-emerald-400 border-slate-700 hover:bg-slate-700"
      : "bg-white text-emerald-600 border-gray-300 hover:bg-emerald-50"
  }`}
>
  {t.contribute}
</a>
              <button
                onClick={() => {
                  setLang(lang === "fa" ? "en" : "fa");
                  setSelectedCategory("all");
                  setSearchTerm("");
                }}
                className={`px-3 py-2 rounded-xl text-sm font-bold border transition-all ${isDark ? "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
              >
                {lang === "fa" ? "🇬🇧 EN" : "🇮🇷 FA"}
              </button>
              <button
                onClick={() => setIsDark(!isDark)}
                className={`px-3 py-2 rounded-xl text-sm font-bold border transition-all ${isDark ? "bg-slate-800 text-yellow-400 border-slate-700 hover:bg-slate-700" : "bg-white text-slate-700 border-gray-300 hover:bg-gray-50"}`}
              >
                {isDark ? "☀️" : "🌙"}
              </button>
            </div>
          </div>
        </header>

        {/* ══════════════════════════════════════════════
            HERO  —  scrolls away ، معرفی + CTA
            ══════════════════════════════════════════════ */}
        <section
          className={`anim-hero relative overflow-hidden py-16 sm:py-24 ${isDark ? "bg-gradient-to-b from-slate-900 to-slate-950" : "bg-gradient-to-b from-blue-50 to-white"}`}
        >
          {/* دایره‌های تزئینی */}
          <div
            className={`absolute -top-32 ${isRTL ? "-left-32" : "-right-32"} w-96 h-96 rounded-full blur-3xl opacity-10 ${isDark ? "bg-blue-500" : "bg-blue-400"}`}
          />
          <div
            className={`absolute -bottom-20 ${isRTL ? "-right-20" : "-left-20"} w-72 h-72 rounded-full blur-3xl opacity-10 ${isDark ? "bg-purple-500" : "bg-indigo-400"}`}
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

            <h2
              className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4`}
            >
              <span
                className={`bg-gradient-to-r bg-clip-text text-transparent ${isDark ? "from-blue-400 via-cyan-300 to-purple-400" : "from-blue-600 via-indigo-600 to-purple-600"}`}
              >
                {t.heroTitle}
              </span>
            </h2>

            <p
              className={`text-lg sm:text-xl mb-10 max-w-2xl mx-auto ${isDark ? "text-slate-400" : "text-gray-500"}`}
            >
              {t.heroSub}
            </p>

            {/* CTA ها */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={scrollToToolbar}
                className="px-6 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:scale-95"
              >
                {t.heroCta} →
              </button>
              <button
                onClick={() => setShowSearchModal(true)}
                className={`px-6 py-3 rounded-2xl font-bold text-sm border transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 ${isDark ? "bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm"}`}
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
                  className={`text-xs px-1.5 py-0.5 rounded border font-mono ${isDark ? "border-slate-600 text-slate-500" : "border-gray-300 text-gray-400"}`}
                >
                  ⌘K
                </kbd>
              </button>
            </div>

            {/* آمار سریع */}
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              {(["TCP", "UDP", "TCP/UDP"] as const).map((tp) => (
                <div key={tp} className="text-center">
                  <div
                    className={`text-2xl font-black ${tp === "TCP" ? "text-emerald-400" : tp === "UDP" ? "text-amber-400" : "text-violet-400"}`}
                  >
                    {allTransportCounts[tp] ?? 0}
                  </div>
                  <div
                    className={`text-xs mt-0.5 ${isDark ? "text-slate-500" : "text-gray-400"}`}
                  >
                    {tp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            STICKY TOOLBAR  —  تنها بخش sticky صفحه
            سرچ + دسته‌بندی + فیلتر transport + حالت نمایش
            ══════════════════════════════════════════════ */}
        <div
          ref={toolbarRef}
          className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
            isDark
              ? "bg-slate-900/95 border-slate-800 backdrop-blur-xl"
              : "bg-white/95 border-gray-200 backdrop-blur-xl shadow-sm"
          }`}
        >
          <div className="max-w-screen-2xl mx-auto px-3 sm:px-6">
            {/* ── ردیف ۱: سرچ + شمارنده + حالت نمایش ── */}
            <div className="py-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* سرچ */}
              <div className="flex-1 relative">
                <svg
                  className={`absolute ${isRTL ? "right-3.5" : "left-3.5"} top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? "text-slate-500" : "text-gray-400"}`}
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
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  dir={isRTL ? "rtl" : "ltr"}
                  className={`w-full ${isRTL ? "pr-11 pl-10" : "pl-11 pr-10"} py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
                    isDark
                      ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-300"
                  }`}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className={`absolute ${isRTL ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors ${isDark ? "text-slate-400 hover:text-slate-200" : "text-gray-400 hover:text-gray-600"}`}
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
                        strokeWidth={2.5}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* شمارنده — فقط دسکتاپ */}
              <div
                className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm whitespace-nowrap ${isDark ? "text-slate-400" : "text-gray-500"}`}
              >
                <span
                  className={`font-bold tabular-nums ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {filteredProtocols.length}
                </span>
                <span>{t.of}</span>
                <span className="font-semibold">{protocolsData.length}</span>
              </div>

              {/* حالت نمایش */}
              <div
                className={`flex rounded-xl border overflow-hidden flex-shrink-0 ${isDark ? "border-slate-700 bg-slate-800" : "border-gray-200 bg-white"}`}
              >
                {(["card", "table"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-3 py-2 text-sm font-bold transition-all flex items-center gap-1.5 ${
                      viewMode === mode
                        ? isDark
                          ? "bg-blue-600 text-white"
                          : "bg-blue-500 text-white"
                        : isDark
                          ? "text-slate-400 hover:text-slate-200"
                          : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {mode === "card" ? (
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
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                      </svg>
                    ) : (
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
                          d="M3 10h18M3 14h18M10 3v18"
                        />
                      </svg>
                    )}
                    <span className="hidden sm:inline">
                      {mode === "card" ? t.cardView : t.tableView}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── ردیف ۲: دسته‌بندی‌ها ── */}
            <div
              className={`overflow-x-auto pb-2 category-scroll ${isDark ? "dark-scroll" : "light-scroll"}`}
            >
              <div className="flex gap-2 min-w-max">
                {categories.map((category) => {
                  const isActive =
                    category === t.all
                      ? selectedCategory === "all" ||
                        selectedCategory === t.all
                      : selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() =>
                        setSelectedCategory(
                          category === t.all ? "all" : category
                        )
                      }
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap border ${
                        isActive
                          ? isDark
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500 shadow-lg shadow-blue-500/20"
                            : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-500 shadow-lg shadow-blue-500/25"
                          : isDark
                            ? "bg-slate-800/60 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-slate-200"
                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      {categoryIcons[category] && (
                        <span className={isRTL ? "ml-1" : "mr-1"}>
                          {categoryIcons[category]}
                        </span>
                      )}
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── ردیف ۳: فیلتر transport ── */}
            <div
              className={`flex flex-wrap items-center justify-between gap-2 py-2 border-t ${isDark ? "border-slate-800/60" : "border-gray-100"}`}
            >
              <div className="flex items-center gap-2">
                {(["TCP", "UDP", "TCP/UDP"] as const).map((tp) => {
                  const c = tpColors[tp];
                  const isActive = transportFilter === tp;
                  return (
                    <button
                      key={tp}
                      onClick={() =>
                        setTransportFilter((prev) =>
                          prev === tp ? "all" : tp
                        )
                      }
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 active:scale-95 ${isActive ? `${c.active} shadow-lg` : c.inactive}`}
                    >
                      {isActive ? (
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      ) : (
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${c.dot} inline-block`}
                        />
                      )}
                      {tp}
                      <span className="font-bold tabular-nums">
                        {allTransportCounts[tp] ?? 0}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* badge فیلتر فعال + شمارنده موبایل */}
              <div className="flex items-center gap-2">
                {transportFilter !== "all" && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium border ${isDark ? "bg-blue-900/50 text-blue-300 border-blue-700" : "bg-blue-50 text-blue-600 border-blue-200"}`}
                  >
                    {t.filterActive}: {transportFilter}
                  </span>
                )}
                <span
                  className={`sm:hidden text-xs ${isDark ? "text-slate-500" : "text-gray-400"}`}
                >
                  <span className="font-bold">
                    {filteredProtocols.length}
                  </span>
                  /{protocolsData.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            CONTENT
            ══════════════════════════════════════════════ */}
        <main className="flex-1 max-w-screen-2xl mx-auto px-3 sm:px-6 py-6 w-full">
          {filteredProtocols.length > 0 ? (
            viewMode === "card" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {filteredProtocols.map((protocol) => (
                  <ProtocolCard
                    key={`${protocol.name}-${protocol.port}`}
                    protocol={protocol}
                    isDark={isDark}
                    lang={lang}
                    t={t}
                    className="anim-card"
                  />
                ))}
              </div>
            ) : (
              <TableView
                protocols={filteredProtocols}
                isDark={isDark}
                lang={lang}
                t={t}
                isRTL={isRTL}
              />
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="text-6xl">🔍</div>
              <p
                className={`text-xl font-bold ${isDark ? "text-slate-400" : "text-gray-500"}`}
              >
                {t.noResult}
              </p>
              <p
                className={`text-sm ${isDark ? "text-slate-600" : "text-gray-400"}`}
              >
                {t.noResultSub}
              </p>
            </div>
          )}
        </main>

        {/* ══════════════════════════════════════════════
            FOOTER
            ══════════════════════════════════════════════ */}
        <footer
          className={`text-center py-10 text-sm border-t ${isDark ? "text-slate-500 border-slate-800" : "text-gray-500 border-gray-200"}`}
        >
          {t.madeWith}{" "}
          <a
            href="https://erfanbanaei.ir"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-bold hover:underline ${isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`}
          >
            {t.creatorName}
          </a>
        </footer>

        {/* ══════════════════════════════════════════════
            FLOATING BUTTONS
            ══════════════════════════════════════════════ */}
        {showScrollTop && (
          <>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`fixed bottom-8 ${isRTL ? "left-8" : "right-8"} z-40 p-3.5 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border ${isDark ? "bg-blue-600 text-white border-blue-500 shadow-blue-500/30 hover:bg-blue-500" : "bg-blue-500 text-white border-blue-400 shadow-blue-500/30 hover:bg-blue-600"}`}
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
            <button
              onClick={() => setShowSearchModal(true)}
              className={`fixed bottom-8 ${isRTL ? "right-8" : "left-8"} z-40 p-3.5 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border ${isDark ? "bg-slate-800 text-blue-400 border-slate-700 shadow-slate-900/50 hover:bg-slate-700" : "bg-white text-blue-600 border-gray-200 shadow-gray-200/80 hover:bg-gray-50"}`}
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
        )}
      </div>
    </>
  );
}