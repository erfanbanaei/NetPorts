"use client";

import { RefObject, useRef } from "react";

import { CATEGORY_ICONS } from "@/lib/constants";
import type { Lang } from "@/types";
import type { SecurityType } from "./ProtocolGrid";
import type { Translations } from "@/lib/translations";
import type { TransportFilter } from "@/hooks/useUrlState";

interface Props {
  isDark: boolean;
  isRTL: boolean;
  lang: Lang;
  t: Translations;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
  transportFilter: string;
  onTransportChange: (value: TransportFilter) => void;
  securityFilter: SecurityType;
  onSecurityChange: (value: SecurityType) => void;
  securityCounts: Record<string, number>;
  showDeprecated: boolean;
  onToggleDeprecated: () => void;
  viewMode: "card" | "table";
  onViewModeChange: (mode: "card" | "table") => void;
  filteredCount: number;
  totalCount: number;
  allTransportCounts: Record<string, number>;
  toolbarRef: RefObject<HTMLDivElement | null>;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  favoritesCount: number;
  onClearFilters: () => void;
}

export default function StickyToolbar({
  isDark,
  isRTL,
  lang,
  t,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  transportFilter,
  onTransportChange,
  securityFilter,
  onSecurityChange,
  securityCounts,
  showDeprecated,
  onToggleDeprecated,
  viewMode,
  onViewModeChange,
  filteredCount,
  totalCount,
  allTransportCounts,
  toolbarRef,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  favoritesCount,
  onClearFilters,
}: Props) {
  const categoryScrollRef = useRef<HTMLDivElement | null>(null);

  const hasFilters =
    searchTerm !== "" ||
    selectedCategory !== "all" ||
    transportFilter !== "all" ||
    securityFilter !== "all" ||
    showFavoritesOnly ||
    !showDeprecated;

  const scrollCategories = (direction: "left" | "right") => {
    const el = categoryScrollRef.current;
    if (!el) return;

    el.scrollBy({
      left: direction === "left" ? -260 : 260,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={toolbarRef}
      className={`sticky top-0 z-30 border-b backdrop-blur-xl transition-all ${
        isDark ? "bg-slate-950/90 border-slate-800" : "bg-white/90 border-gray-200"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 py-3 sm:px-6">
        {/* ردیف اول: جستجو و آمار */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 group">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className={`w-full ${
                isRTL ? "pr-10 pl-4" : "pl-10 pr-4"
              } py-2.5 rounded-2xl border-2 transition-all outline-none text-sm ${
                isDark
                  ? "bg-slate-900 border-slate-800 text-white focus:border-blue-500/50"
                  : "bg-gray-50 border-gray-100 text-gray-900 focus:border-blue-500/50"
              }`}
            />

            <span
              className={`absolute top-1/2 -translate-y-1/2 opacity-40 group-focus-within:opacity-100 transition-opacity ${
                isRTL ? "right-3" : "left-3"
              }`}
            >
              🔍
            </span>
          </div>

          <div
            className={`hidden sm:flex flex-col items-end leading-tight ${
              isDark ? "text-slate-500" : "text-gray-400"
            }`}
          >
            <span className="text-[10px] uppercase font-bold tracking-widest">
              {lang === "fa" ? "نتایج" : "Results"}
            </span>
            <span className="text-sm font-black text-blue-500">
              {filteredCount} / {totalCount}
            </span>
          </div>
        </div>

        {/* ردیف دوم: دسته‌بندی‌ها - نسخه تمیز و جدا از حالت عادی */}
        <div
          className={`relative mb-4 rounded-2xl border px-10 py-2 shadow-sm ${
            isDark
              ? "bg-slate-900/70 border-slate-800"
              : "bg-gray-50/80 border-gray-200"
          }`}
        >
          {/* دکمه اسکرول چپ */}
          <button
            type="button"
            onClick={() => scrollCategories("left")}
            aria-label="Scroll categories left"
            className={`absolute left-2 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border text-xs transition-all md:flex ${
              isDark
                ? "bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                : "bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300"
            }`}
          >
            ‹
          </button>

          {/* دکمه اسکرول راست */}
          <button
            type="button"
            onClick={() => scrollCategories("right")}
            aria-label="Scroll categories right"
            className={`absolute right-2 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border text-xs transition-all md:flex ${
              isDark
                ? "bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                : "bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300"
            }`}
          >
            ›
          </button>

          {/* محو شدن لبه‌ها */}
          <div
            className={`pointer-events-none absolute left-10 top-0 bottom-0 z-[1] w-8 ${
              isDark
                ? "bg-gradient-to-r from-slate-900/90 to-transparent"
                : "bg-gradient-to-r from-gray-50/90 to-transparent"
            }`}
          />
          <div
            className={`pointer-events-none absolute right-10 top-0 bottom-0 z-[1] w-8 ${
              isDark
                ? "bg-gradient-to-l from-slate-900/90 to-transparent"
                : "bg-gradient-to-l from-gray-50/90 to-transparent"
            }`}
          />

          <div
            ref={categoryScrollRef}
            dir={isRTL ? "rtl" : "ltr"}
            className="category-scroll relative z-[2] flex items-center gap-2 overflow-x-auto scroll-smooth py-1"
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onCategoryChange(cat)}
                  className={`relative shrink-0 rounded-xl border px-4 py-2 text-xs font-bold whitespace-nowrap transition-all active:scale-95 ${
                    isActive
                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20"
                      : isDark
                      ? "bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-700"
                      : "bg-white border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300"
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="text-sm">{CATEGORY_ICONS[cat] || "📦"}</span>
                    <span>{cat}</span>
                  </span>

                  {isActive && (
                    <span className="absolute -bottom-[7px] left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-blue-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ردیف سوم: کنترل پنل */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Toggle */}
            <div
              className={`flex p-1 rounded-xl border ${
                isDark
                  ? "bg-slate-900 border-slate-800"
                  : "bg-gray-100 border-gray-200"
              }`}
            >
              <button
                onClick={() => onViewModeChange("card")}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "card"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-500 hover:text-blue-500"
                }`}
              >
                🎴 {lang === "fa" ? "شبکه‌ای" : "Grid"}
              </button>

              <button
                onClick={() => onViewModeChange("table")}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "table"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-500 hover:text-blue-500"
                }`}
              >
                📋 {lang === "fa" ? "جدولی" : "Table"}
              </button>
            </div>

            {/* Favorites Toggle */}
            <button
              onClick={onToggleFavoritesOnly}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
                showFavoritesOnly
                  ? "bg-yellow-500 border-yellow-500 text-white shadow-lg shadow-yellow-500/20"
                  : isDark
                  ? "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              ⭐ {lang === "fa" ? "علاقه‌مندی‌ها" : "Favs"}{" "}
              {favoritesCount > 0 && `(${favoritesCount})`}
            </button>

            {/* Transport Select */}
            <select
              value={transportFilter}
              onChange={(e) => onTransportChange(e.target.value as TransportFilter)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border outline-none cursor-pointer ${
                isDark
                  ? "bg-slate-900 border-slate-800 text-slate-300"
                  : "bg-white border-gray-200 text-gray-600"
              }`}
            >
              <option value="all">
                📡 {lang === "fa" ? "پروتکل" : "Transport"}
              </option>
              {["TCP", "UDP", "TCP/UDP"].map((tr) => (
                <option key={tr} value={tr}>
                  {tr}
                  {allTransportCounts[tr] ? ` (${allTransportCounts[tr]})` : ""}
                </option>
              ))}
            </select>

            {/* Security Select */}
            <select
              value={securityFilter}
              onChange={(e) => onSecurityChange(e.target.value as SecurityType)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border outline-none cursor-pointer ${
                isDark
                  ? "bg-slate-900 border-slate-800 text-slate-300"
                  : "bg-white border-gray-200 text-gray-600"
              }`}
            >
              <option value="all">
                🔐 {lang === "fa" ? "امنیت" : "Security"}
              </option>
              {(["low", "medium", "high", "critical"] as SecurityType[]).map(
                (risk) => (
                  <option key={risk} value={risk}>
                    {risk}
                    {securityCounts[risk] ? ` (${securityCounts[risk]})` : ""}
                  </option>
                )
              )}
            </select>

            {/* Deprecated Toggle */}
            <button
              onClick={onToggleDeprecated}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
                showDeprecated
                  ? isDark
                    ? "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  : "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20"
              }`}
            >
              {showDeprecated ? "👁️" : "🚫"}{" "}
              {lang === "fa" ? "منسوخ‌شده‌ها" : "Deprecated"}
            </button>
          </div>

          {/* Clear Filters */}
          <div className="flex items-center gap-2">
            {hasFilters && (
              <button
                onClick={onClearFilters}
                className="px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 hover:bg-red-500/10 text-red-500 active:scale-95"
              >
                <span>✕</span>
                <span className="hidden sm:inline">
                  {lang === "fa" ? "پاک کردن فیلترها" : "Clear Filters"}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .category-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .category-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}