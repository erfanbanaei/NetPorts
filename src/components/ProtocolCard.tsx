"use client";

import * as utils from "@/lib/utils";

import { Protocol, getFullName, nameToSlug } from "@/lib/protocols";
import React, { useCallback, useState } from "react";

import { CATEGORY_ICONS } from "@/lib/constants";
import FavoriteButton from "@/components/FavoriteButton";
import Highlight from "@/components/Highlight"; // ✅ هایلایت نتایج جستجو
import type { Lang } from "@/types";
import Link from "next/link";
import type { Translations } from "@/lib/translations";

interface Props {
  protocol: Protocol;
  isDark: boolean;
  lang: Lang;
  t: Translations;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  className?: string;
  searchTerm: string; // ✅ دریافت کلمه جستجو
}

const ProtocolCard = React.memo(function ProtocolCard({
  protocol,
  isDark,
  lang,
  t,
  isFavorite,
  onToggleFavorite,
  className = "",
  searchTerm,
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(protocol.port.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    },
    [protocol.port]
  );

  const catKey = lang === "fa" ? protocol.category.fa : protocol.category.en;
  const slug = nameToSlug(protocol.name);

  return (
    <Link
      href={`/protocol/${slug}`}
      className={`group relative p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col overflow-hidden ${className} ${
        isDark
          ? "bg-gradient-to-br from-slate-800 to-slate-800/80 border-slate-700/60 hover:border-blue-500/70 hover:shadow-blue-500/10"
          : "bg-white border-gray-200 hover:border-blue-400 hover:shadow-blue-100"
      } ${
        isFavorite
          ? isDark
            ? "ring-1 ring-yellow-500/30"
            : "ring-1 ring-yellow-400/50"
          : ""
      } ${
        protocol.isDeprecated
          ? isDark
            ? "opacity-70 saturate-50"
            : "opacity-80 saturate-75"
          : ""
      }`}
      style={{ minHeight: 280 }}
    >
      {/* Deprecated Badge */}
      {protocol.isDeprecated && (
        <div
          className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold rounded-full ${
            isDark
              ? "bg-red-900/50 text-red-300 border border-red-700"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {lang === "fa" ? "منسوخ" : "DEPRECATED"}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-3 gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={`text-xs px-2.5 py-1 rounded-full border font-medium ${utils.getTransportColor(
              protocol.transport,
              isDark
            )}`}
          >
            {protocol.transport}
          </span>

          {protocol.securityRisk && (
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${utils.getSecurityRiskBadge(
                protocol.securityRisk,
                isDark
              )}`}
              title={lang === "fa" ? "سطح امنیت" : "Security Risk"}
            >
              {protocol.securityRisk === "low" && "🔒"}
              {protocol.securityRisk === "medium" && "⚠️"}
              {protocol.securityRisk === "high" && "🚨"}
              {protocol.securityRisk === "critical" && "☠️"}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={onToggleFavorite}
            title={isFavorite ? t.removeFromFavorites : t.addToFavorites}
            size="sm"
            className={`opacity-0 group-hover:opacity-100 transition-opacity ${
              isFavorite ? "!opacity-100" : ""
            }`}
          />
          <span className="text-lg" title={catKey}>
            {CATEGORY_ICONS[catKey] || "📦"}
          </span>
        </div>
      </div>

      {/* Name (highlighted) */}
      <h3
        className={`text-lg font-extrabold mb-1 tracking-tight ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        <Highlight text={protocol.name} search={searchTerm} />
      </h3>

      {/* Full Name (highlighted) */}
      <p
        className={`text-[11px] font-mono mb-2 leading-relaxed ${
          isDark ? "text-slate-500" : "text-gray-400"
        }`}
      >
        <Highlight text={getFullName(protocol.abbreviation)} search={searchTerm} />
      </p>

      {/* Meta (year/vendor) */}
      {(protocol.introducedYear || protocol.vendor) && (
        <div
          className={`text-[10px] mb-2 flex items-center gap-2 ${
            isDark ? "text-slate-600" : "text-gray-400"
          }`}
        >
          {protocol.introducedYear && <span>📅 {protocol.introducedYear}</span>}
          {protocol.vendor && (
            <span className="truncate" title={protocol.vendor}>
              🏢 {protocol.vendor}
            </span>
          )}
        </div>
      )}

      {/* Description (highlighted) */}
      <p
        className={`text-sm leading-relaxed flex-grow line-clamp-2 ${
          isDark ? "text-slate-300" : "text-gray-600"
        }`}
        dir={lang === "fa" ? "rtl" : "ltr"}
      >
        <Highlight
          text={lang === "fa" ? protocol.description.fa : protocol.description.en}
          search={searchTerm}
        />
      </p>

      {/* Copy Port Button */}
      <button
        onClick={handleCopy}
        title={t.clickToCopy}
        className={`w-full mt-4 rounded-xl flex items-center justify-center gap-2 py-3.5 font-black text-xl tracking-widest cursor-pointer transition-all duration-200 active:scale-95 ${
          isDark
            ? "bg-slate-900/80 border border-slate-700 text-blue-400 hover:bg-slate-900 hover:border-blue-500/50"
            : "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-600 hover:from-blue-100 hover:to-indigo-100"
        } ${
          copied
            ? isDark
              ? "!border-green-500 !text-green-400"
              : "!border-green-500 !text-green-600"
            : ""
        }`}
      >
        {copied ? (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
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
    </Link>
  );
});

export default ProtocolCard;