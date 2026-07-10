"use client";

import type { Lang, SortDir, SortKey } from "@/types";
import { Protocol, getFullName } from "@/lib/protocols";
import { useCallback, useMemo, useState } from "react";

import { CATEGORY_ICONS } from "@/lib/constants";
import FavoriteButton from "@/components/FavoriteButton";
import Highlight from "@/components/Highlight"; // ✅ هایلایت نتایج جستجو
import type { Translations } from "@/lib/translations";
import { getTransportColor } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Props {
  protocols: Protocol[];
  isDark: boolean;
  lang: Lang;
  t: Translations;
  isRTL: boolean;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  searchTerm: string; // ✅ دریافت کلمه جستجو برای هایلایت
}

const securityIcons: Record<string, string> = {
  low: "🔒",
  medium: "⚠️",
  high: "🚨",
  critical: "☠️",
};

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  return (
    <span className="inline-flex flex-col mx-1 opacity-60">
      <svg className={`w-2 h-2 -mb-0.5 ${sortKey === col && sortDir === "asc" ? "opacity-100 text-blue-400" : ""}`} viewBox="0 0 10 6" fill="currentColor"><path d="M5 0L10 6H0z" /></svg>
      <svg className={`w-2 h-2 ${sortKey === col && sortDir === "desc" ? "opacity-100 text-blue-400" : ""}`} viewBox="0 0 10 6" fill="currentColor"><path d="M5 6L0 0H10z" /></svg>
    </span>
  );
}

export default function ProtocolTable({
  protocols,
  isDark,
  lang,
  t,
  isRTL,
  isFavorite,
  onToggleFavorite,
  searchTerm,
}: Props) {
  const router = useRouter();

  const [sortKey, setSortKey] = useState<SortKey>("port");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [copiedPort, setCopiedPort] = useState<number | null>(null);

  const handleSort = useCallback((key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  }, [sortKey]);

  const sorted = useMemo(() => {
    return [...protocols].sort((a, b) => {
      let va: string | number, vb: string | number;
      if (sortKey === "port") { va = a.port; vb = b.port; }
      else if (sortKey === "name") { va = a.name.toLowerCase(); vb = b.name.toLowerCase(); }
      else {
        va = (lang === "fa" ? a.category.fa : a.category.en).toLowerCase();
        vb = (lang === "fa" ? b.category.fa : b.category.en).toLowerCase();
      }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [protocols, sortKey, sortDir, lang]);

  const handleRowClick = (name: string) => {
    const slug = name.toLowerCase();
    router.push(`/protocol/${slug}`);
  };

  const handleCopy = (e: React.MouseEvent, port: number) => {
    e.stopPropagation(); // جلوگیری از رفتن به صفحه جزئیات هنگام کپی
    navigator.clipboard.writeText(port.toString());
    setCopiedPort(port);
    setTimeout(() => setCopiedPort(null), 1500);
  };

  const getProtocolId = (p: Protocol) => `${p.name}-${p.port}`;

  const thBase = `px-4 py-4 text-xs font-bold uppercase tracking-wider select-none whitespace-nowrap transition-colors ${
    isDark ? "text-slate-400 border-slate-700/50" : "text-gray-500 border-gray-200"
  }`;

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
      isDark ? "border-slate-800 bg-slate-900/50 shadow-2xl" : "border-gray-200 bg-white shadow-xl"
    }`}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right" dir={isRTL ? "rtl" : "ltr"}>
          <thead className={isDark ? "bg-slate-800/80" : "bg-gray-50/80"}>
            <tr>
              <th className={`${thBase} w-10 !text-center`}>⭐</th>
              <th className={`${thBase} cursor-pointer hover:text-blue-500`} onClick={() => handleSort("port")}>
                <div className="flex items-center gap-1">{t.colPort}<SortIcon col="port" sortKey={sortKey} sortDir={sortDir} /></div>
              </th>
              <th className={`${thBase} cursor-pointer hover:text-blue-500`} onClick={() => handleSort("name")}>
                <div className="flex items-center gap-1">{t.colName}<SortIcon col="name" sortKey={sortKey} sortDir={sortDir} /></div>
              </th>
              <th className={`${thBase} hidden md:table-cell`}>{t.colFullName}</th>
              <th className={`${thBase} hidden lg:table-cell`}>{t.colTransport}</th>
              <th className={`${thBase} text-center`}>{lang === "fa" ? "امنیت" : "Security"}</th>
              <th className={`${thBase} hidden xl:table-cell`}>{t.colDescription}</th>
            </tr>
          </thead>

          <tbody className={`divide-y ${isDark ? "divide-slate-800/50" : "divide-gray-100"}`}>
            {sorted.map((p) => {
              const protocolId = getProtocolId(p);
              const isFav = isFavorite(protocolId);

              return (
                <tr
                  key={protocolId}
                  onClick={() => handleRowClick(p.name)}
                  className={`group cursor-pointer transition-all duration-200 ${
                    isDark ? "hover:bg-blue-500/10" : "hover:bg-blue-50"
                  } ${isFav ? (isDark ? "bg-yellow-500/[0.02]" : "bg-yellow-50/30") : ""}`}
                >
                  {/* Favorite */}
                  <td className="px-2 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <FavoriteButton
                      isFavorite={isFav}
                      onToggle={() => onToggleFavorite(protocolId)}
                      size="sm"
                      title={isFav ? t.removeFromFavorites : t.addToFavorites}
                    />
                  </td>

                  {/* Port */}
                  <td className="px-4 py-4">
                    <button
                      onClick={(e) => handleCopy(e, p.port)}
                      className={`font-mono font-bold text-sm rounded-lg px-2.5 py-1 border transition-all active:scale-95 ${
                        copiedPort === p.port
                          ? "bg-green-500/20 text-green-500 border-green-500/50"
                          : isDark
                          ? "bg-slate-800 border-slate-700 text-blue-400 group-hover:border-blue-500/50"
                          : "bg-blue-50 border-blue-100 text-blue-600"
                      }`}
                    >
                      {copiedPort === p.port ? "✓" : p.port}
                    </button>
                  </td>

                  {/* Name */}
                  <td className="px-4 py-4">
                    <span className={`font-bold transition-colors group-hover:text-blue-500 ${isDark ? "text-slate-100" : "text-slate-900"} ${p.isDeprecated ? 'line-through opacity-50' : ''}`}>
                      <Highlight text={p.name} search={searchTerm} />
                    </span>
                    {p.isDeprecated && (
                      <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-500 border border-red-500/20">
                        {lang === 'fa' ? 'منسوخ' : 'Deprecated'}
                      </span>
                    )}
                  </td>

                  {/* Full Name */}
                  <td className="px-4 py-4 hidden md:table-cell text-xs text-slate-500">
                    <Highlight text={getFullName(p.abbreviation)} search={searchTerm} />
                  </td>

                  {/* Transport */}
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className={`text-[11px] px-2 py-1 rounded-md border font-bold ${getTransportColor(p.transport, isDark)}`}>
                      {p.transport}
                    </span>
                  </td>

                  {/* Security */}
                  <td className="px-4 py-4 text-center text-lg" title={p.securityRisk || ""}>
                    {p.securityRisk ? securityIcons[p.securityRisk] : "-"}
                  </td>

                  {/* Description */}
                  <td className={`px-4 py-4 hidden xl:table-cell text-xs max-w-xs ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                    <p className="line-clamp-1" dir={isRTL ? "rtl" : "ltr"}>
                      <Highlight
                        text={lang === "fa" ? p.description.fa : p.description.en}
                        search={searchTerm}
                      />
                    </p>
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