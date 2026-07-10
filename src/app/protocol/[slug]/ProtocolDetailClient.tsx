"use client";

import { Protocol, getFullName, nameToSlug } from "@/lib/protocols";
import { getSecurityRiskBadge, getTransportColor } from "@/lib/utils";
import { useCallback, useState } from "react";

import { CATEGORY_ICONS } from "@/lib/constants";
import FavoriteButton from "@/components/FavoriteButton";
import type { Lang } from "@/types";
import Link from "next/link";
import { translations } from "@/lib/translations";
import { useFavorites } from "@/hooks/useFavorites";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface Props {
  protocol: Protocol;
  relatedProtocols: Protocol[];
}

export default function ProtocolDetailClient({
  protocol,
  relatedProtocols,
}: Props) {
  const [isDark, setIsDark] = useLocalStorage<boolean>("netports:dark", () => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [lang, setLang] = useLocalStorage<Lang>("netports:lang", "fa");
  const [copied, setCopied] = useState(false);
  const [copiedExample, setCopiedExample] = useState<number | null>(null);

  const { isFavorite, toggleFavorite } = useFavorites();
  const protocolId = `${protocol.name}-${protocol.port}`;
  const isFav = isFavorite(protocolId);

  const t = translations[lang];
  const isRTL = lang === "fa";
  const catKey = lang === "fa" ? protocol.category.fa : protocol.category.en;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(protocol.port.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [protocol.port]);

  const handleCopyExample = useCallback((code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedExample(index);
    setTimeout(() => setCopiedExample(null), 2000);
  }, []);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const text = `${protocol.name} - Port ${protocol.port}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: text, url });
      } catch {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(url);
    }
  }, [protocol]);

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className={`min-h-screen transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100"
          : "bg-gradient-to-br from-gray-50 via-white to-blue-50/30 text-slate-800"
      }`}
    >
      {/* ── Header ── */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-xl ${
          isDark
            ? "bg-slate-900/95 border-slate-800"
            : "bg-white/95 border-gray-200"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all hover:-translate-x-1 active:scale-95 ${
              isDark
                ? "bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
                : "bg-white border-gray-200 text-gray-600 hover:text-gray-900"
            }`}
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
            {t.backToList}
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "fa" ? "en" : "fa")}
              className={`px-3 py-2 rounded-xl text-sm font-bold border transition-all active:scale-95 ${
                isDark
                  ? "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {lang === "fa" ? "🇬🇧 EN" : "🇮🇷 FA"}
            </button>
            <button
              onClick={() => setIsDark(!isDark)}
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

      {/* ── Main Content ── */}
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero Card */}
        <div
          className={`rounded-3xl border p-6 sm:p-10 mb-8 relative overflow-hidden ${
            isDark
              ? "bg-gradient-to-br from-slate-800 to-slate-800/50 border-slate-700/60"
              : "bg-white border-gray-200 shadow-lg shadow-gray-100"
          } ${isFav ? (isDark ? "ring-2 ring-yellow-500/30" : "ring-2 ring-yellow-400/50") : ""}`}
        >
          {/* نشان Deprecated */}
          {protocol.isDeprecated && (
            <div
              className={`absolute top-4 right-4 px-3 py-1.5 text-xs font-bold rounded-full ${
                isDark
                  ? "bg-red-900/70 text-red-200 border border-red-700"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              ⚠️ {lang === "fa" ? "منسوخ شده" : "DEPRECATED"}
            </div>
          )}

          <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
            {/* Left: Info */}
            <div className="flex-1">
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span
                  className={`text-sm px-3 py-1.5 rounded-full border font-semibold ${getTransportColor(
                    protocol.transport,
                    isDark
                  )}`}
                >
                  {protocol.transport}
                </span>
                <span
                  className={`text-sm px-3 py-1.5 rounded-xl ${
                    isDark
                      ? "bg-slate-700/60 text-slate-300"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {CATEGORY_ICONS[catKey] || "📦"} {catKey}
                </span>
                {/* 🆕 نشان امنیت */}
                {protocol.securityRisk && (
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-bold ${getSecurityRiskBadge(
                      protocol.securityRisk,
                      isDark
                    )}`}
                  >
                    {protocol.securityRisk === "low" && "🔒 Low Risk"}
                    {protocol.securityRisk === "medium" && "⚠️ Medium Risk"}
                    {protocol.securityRisk === "high" && "🚨 High Risk"}
                    {protocol.securityRisk === "critical" && "☠️ Critical"}
                  </span>
                )}
              </div>

              {/* Name */}
              <h1
                className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {protocol.name}
              </h1>

              {/* Full Name */}
              <p
                className={`text-base sm:text-lg font-mono mb-4 ${
                  isDark ? "text-slate-500" : "text-gray-400"
                }`}
              >
                {getFullName(protocol.abbreviation)}
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                {protocol.introducedYear && (
                  <span
                    className={`text-sm px-3 py-1 rounded-lg ${
                      isDark
                        ? "bg-slate-700/50 text-slate-300"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    📅 {protocol.introducedYear}
                  </span>
                )}
                {protocol.vendor && (
                  <span
                    className={`text-sm px-3 py-1 rounded-lg ${
                      isDark
                        ? "bg-slate-700/50 text-slate-300"
                        : "bg-gray-100 text-gray-600"
                    }`}
                    title="Vendor/Organization"
                  >
                    🏢 {protocol.vendor}
                  </span>
                )}
                {protocol.ianaStatus && (
                  <span
                    className={`text-xs px-2 py-1 rounded-md font-semibold ${
                      protocol.ianaStatus === "official"
                        ? isDark
                          ? "bg-green-900/50 text-green-300"
                          : "bg-green-100 text-green-700"
                        : isDark
                          ? "bg-yellow-900/50 text-yellow-300"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {protocol.ianaStatus.toUpperCase()}
                  </span>
                )}
              </div>

              {/* Description */}
              <p
                className={`text-base sm:text-lg leading-relaxed mb-6 ${
                  isDark ? "text-slate-300" : "text-gray-600"
                }`}
              >
                {lang === "fa"
                  ? protocol.description.fa
                  : protocol.description.en}
              </p>

              {/* Common Use Cases */}
              {protocol.commonUseCases && (
                <div className="mb-6">
                  <h3
                    className={`text-sm font-bold mb-2 ${
                      isDark ? "text-slate-400" : "text-gray-500"
                    }`}
                  >
                    {lang === "fa" ? "کاربردهای رایج:" : "Common Use Cases:"}
                  </h3>
                  <ul className="space-y-1">
                    {(lang === "fa"
                      ? protocol.commonUseCases.fa
                      : protocol.commonUseCases.en
                    ).map((use, i) => (
                      <li
                        key={i}
                        className={`text-sm flex items-center gap-2 ${
                          isDark ? "text-slate-400" : "text-gray-600"
                        }`}
                      >
                        <span className="text-blue-500">•</span>
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <FavoriteButton
                  isFavorite={isFav}
                  onToggle={() => toggleFavorite(protocolId)}
                  title={isFav ? t.removeFromFav : t.addToFav}
                  size="md"
                  className={
                    isDark
                      ? "bg-slate-700/50 border border-slate-600"
                      : "bg-gray-50 border border-gray-200"
                  }
                />
                <button
                  onClick={handleShare}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all active:scale-95 ${
                    isDark
                      ? "bg-slate-700/50 border-slate-600 text-slate-300 hover:text-white"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900"
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
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  {t.share}
                </button>
              </div>
            </div>

            {/* Right: Port Card */}
            <div
              className={`flex-shrink-0 w-full lg:w-72 rounded-2xl p-6 text-center ${
                isDark
                  ? "bg-slate-900/80 border border-slate-700"
                  : "bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100"
              }`}
            >
              <p
                className={`text-sm font-semibold mb-2 ${
                  isDark ? "text-slate-500" : "text-gray-500"
                }`}
              >
                {t.portNumber}
              </p>
              <p
                className={`text-6xl sm:text-7xl font-black mb-4 tabular-nums ${
                  isDark ? "text-blue-400" : "text-blue-600"
                }`}
              >
                {protocol.port}
              </p>
              <button
                onClick={handleCopy}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  copied
                    ? isDark
                      ? "bg-green-600 text-white"
                      : "bg-green-500 text-white"
                    : isDark
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
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
                    {t.copiedPort}
                  </>
                ) : (
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
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    {t.copyPort}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

     {/* Code Examples */}
{protocol.codeExample && protocol.codeExample.length > 0 && (
  <section className="mb-10">
    <h2
      className={`text-2xl font-bold mb-4 ${
        isDark ? "text-white" : "text-gray-900"
      }`}
    >
      💻 {lang === "fa" ? "مثال‌های کد" : "Code Examples"}
    </h2>
    <div className="space-y-4">
      {protocol.codeExample.map((example, index) => (
        <div
          key={index}
          className={`rounded-xl border overflow-hidden ${
            isDark
              ? "bg-slate-800/50 border-slate-700"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div
            className={`flex items-center justify-between px-4 py-2 border-b ${
              isDark
                ? "bg-slate-900/50 border-slate-700"
                : "bg-white border-gray-200"
            }`}
            // اطمینان از اینکه هدر کدها (نام زبان و دکمه کپی) با جهت صفحه هماهنگ باشد
            dir={isRTL ? "rtl" : "ltr"} 
          >
            <span
              className={`text-sm font-bold ${
                isDark ? "text-slate-300" : "text-gray-700"
              }`}
            >
              {example.language.toUpperCase()}
            </span>
            <button
              onClick={() => handleCopyExample(example.code, index)}
              className={`text-xs px-3 py-1 rounded-lg transition-all active:scale-95 ${
                copiedExample === index
                  ? isDark
                    ? "bg-green-600 text-white"
                    : "bg-green-500 text-white"
                  : isDark
                    ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {copiedExample === index ? "✓ Copied" : "Copy"}
            </button>
          </div>
          
          {/* بخش اصلاح شده: اضافه کردن dir="ltr" و text-left */}
          <pre
            dir="ltr"
            className={`p-4 text-sm overflow-x-auto text-left font-mono ${
              isDark ? "text-slate-300" : "text-gray-800"
            }`}
          >
            <code>{example.code}</code>
          </pre>
        </div>
      ))}
    </div>
  </section>
)}
        {/* Technical Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            {
              label: t.portNumber,
              value: protocol.port.toString(),
              icon: "🔌",
            },
            {
              label: t.transportProtocol,
              value: protocol.transport,
              icon: "📡",
            },
            {
              label: t.category,
              value: catKey,
              icon: CATEGORY_ICONS[catKey] || "📦",
            },
            ...(protocol.rfc && protocol.rfc.length > 0
              ? [
                  {
                    label: "RFC",
                    value: `RFC ${protocol.rfc[0]}`,
                    icon: "📄",
                  },
                ]
              : []),
            ...(protocol.alternativePorts && protocol.alternativePorts.length > 0
              ? [
                  {
                    label: lang === "fa" ? "پورت‌های جایگزین" : "Alt Ports",
                    value: protocol.alternativePorts.join(", "),
                    icon: "🔀",
                  },
                ]
              : []),
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-2xl border p-5 ${
                isDark
                  ? "bg-slate-800/50 border-slate-700/60"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{item.icon}</span>
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    isDark ? "text-slate-500" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
              </div>
              <p
                className={`text-lg font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* References */}
        {protocol.references && (
          <section className="mb-10">
            <h2
              className={`text-2xl font-bold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              📚 {lang === "fa" ? "مراجع" : "References"}
            </h2>
            <div className="flex flex-wrap gap-3">
              {protocol.references.rfc?.map((url, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                    isDark
                      ? "bg-slate-800 text-blue-400 hover:bg-slate-700"
                      : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  }`}
                >
                  📄 RFC Documentation
                </a>
              ))}
              {protocol.references.wiki && (
                <a
                  href={protocol.references.wiki}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                    isDark
                      ? "bg-slate-800 text-blue-400 hover:bg-slate-700"
                      : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  }`}
                >
                  📖 Wikipedia
                </a>
              )}
              {protocol.references.docs && (
                <a
                  href={protocol.references.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                    isDark
                      ? "bg-slate-800 text-blue-400 hover:bg-slate-700"
                      : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  }`}
                >
                  📘 Official Docs
                </a>
              )}
            </div>
          </section>
        )}

        {/* Related Protocols */}
        {relatedProtocols.length > 0 && (
          <section>
            <h2
              className={`text-xl font-bold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t.relatedProtocols}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProtocols.map((p) => {
                const pCatKey =
                  lang === "fa" ? p.category.fa : p.category.en;
                return (
                  <Link
                    key={`${p.name}-${p.port}`}
                    href={`/protocol/${nameToSlug(p.name)}`}
                    className={`group rounded-2xl border p-5 transition-all hover:-translate-y-1 hover:shadow-lg ${
                      isDark
                        ? "bg-slate-800/50 border-slate-700/60 hover:border-blue-500/50"
                        : "bg-white border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full border font-medium ${getTransportColor(
                          p.transport,
                          isDark
                        )}`}
                      >
                        {p.transport}
                      </span>
                      <span>{CATEGORY_ICONS[pCatKey] || "📦"}</span>
                    </div>
                    <h3
                      className={`font-bold mb-1 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {p.name}
                    </h3>
                    <p
                      className={`text-2xl font-black ${
                        isDark ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {p.port}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer
        className={`text-center py-8 text-sm border-t ${
          isDark
            ? "text-slate-500 border-slate-800"
            : "text-gray-500 border-gray-200"
        }`}
      >
        {t.madeWith}{" "}
        <a
          href="https://erfanbanaei.ir"
          target="_blank"
          rel="noopener noreferrer"
          className={`font-bold hover:underline ${
            isDark
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-600 hover:text-blue-700"
          }`}
        >
          {t.creatorName}
        </a>
      </footer>
    </div>
  );
}