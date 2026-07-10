"use client";

import { getFullName, protocolsData } from "@/lib/protocols";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { CATEGORY_ICONS } from "@/lib/constants";
import type { Lang } from "@/types";
import type { Translations } from "@/lib/translations";
import { getTransportColor } from "@/lib/utils";
import { useSearchHistory } from "@/hooks/useSearchHistory";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: Lang;
  isDark: boolean;
  isRTL: boolean;
  t: Translations;
  onSelect: (name: string) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  lang,
  isDark,
  isRTL,
  t,
  onSelect,
}: Props) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const { history, addToHistory, removeFromHistory, clearHistory } =
    useSearchHistory();

  // ── ریست وقتی باز/بسته میشه ──
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(-1);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  // ── ریست index وقتی query عوض میشه ──
  useEffect(() => setActiveIndex(-1), [query]);

  // ── نتایج جستجو ──
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

  // ── تعداد کل آیتم‌های قابل انتخاب ──
  const totalItems = query.trim() ? results.length : history.length;

  // ── اسکرول به آیتم فعال ──
  useEffect(() => {
    if (activeIndex >= 0 && resultRefs.current[activeIndex]) {
      resultRefs.current[activeIndex]?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [activeIndex]);

  // ── انتخاب آیتم ──
  const handleSelectItem = useCallback(
    (term: string) => {
      addToHistory(term);
      onSelect(term);
      onClose();
    },
    [addToHistory, onSelect, onClose]
  );

  // ── کیبورد: ↑ ↓ Enter ──
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
          break;
        case "Enter":
          e.preventDefault();
          if (activeIndex >= 0) {
            if (query.trim() && results[activeIndex]) {
              handleSelectItem(results[activeIndex].name);
            } else if (!query.trim() && history[activeIndex]) {
              handleSelectItem(history[activeIndex]);
            }
          } else if (query.trim()) {
            // اگه چیزی تایپ شده ولی هیچی انتخاب نشده، ثبت کن
            addToHistory(query.trim());
            onSelect(query.trim());
            onClose();
          }
          break;
        case "Escape":
          onClose();
          break;
      }
    },
    [
      activeIndex,
      results,
      history,
      query,
      totalItems,
      handleSelectItem,
      addToHistory,
      onSelect,
      onClose,
    ]
  );

  if (!isOpen) return null;

  const showHistory = !query.trim() && history.length > 0;
  const showResults = query.trim() && results.length > 0;
  const showEmpty = query.trim() && results.length === 0;
  const showNoHistory = !query.trim() && history.length === 0;

  return (
    <div
      className="search-modal-backdrop fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4"
      style={{ background: "rgba(0,0,0,.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`search-modal-box w-full max-w-xl rounded-2xl border overflow-hidden shadow-2xl ${
          isDark ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"
        }`}
        onKeyDown={handleKeyDown}
      >
        {/* ── Input ── */}
        <div className="relative flex items-center">
          <svg
            className={`absolute ${isRTL ? "right-4" : "left-4"} w-5 h-5 ${
              isDark ? "text-slate-500" : "text-gray-400"
            }`}
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
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchHint}
            dir={isRTL ? "rtl" : "ltr"}
            className={`w-full py-4 text-base border-0 outline-none bg-transparent ${
              isRTL ? "pr-12 pl-4" : "pl-12 pr-4"
            } ${
              isDark
                ? "text-white placeholder-slate-500"
                : "text-gray-900 placeholder-gray-400"
            }`}
          />
          <button
            onClick={onClose}
            className={`absolute ${isRTL ? "left-3" : "right-3"} text-xs px-2 py-1 rounded border ${
              isDark
                ? "border-slate-700 text-slate-500 hover:text-slate-300"
                : "border-gray-200 text-gray-400 hover:text-gray-600"
            }`}
          >
            ESC
          </button>
        </div>

        {/* ── تاریخچه جستجو ── */}
        {showHistory && (
          <div
            className={`border-t ${
              isDark ? "border-slate-700/60" : "border-gray-100"
            }`}
          >
            {/* هدر */}
            <div
              className={`flex items-center justify-between px-4 py-2 ${
                isDark ? "text-slate-500" : "text-gray-400"
              }`}
            >
              <span className="text-xs font-medium flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {t.recentSearches}
              </span>
              <button
                onClick={clearHistory}
                className={`text-xs hover:underline ${
                  isDark
                    ? "text-slate-600 hover:text-slate-400"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {t.clearHistory}
              </button>
            </div>

            {/* لیست */}
            <div className="max-h-64 overflow-y-auto">
              {history.map((term, i) => {
                const isActive = i === activeIndex;
                return (
                  <div
                    key={term}
                    className={`flex items-center group ${
                      isActive
                        ? isDark
                          ? "bg-blue-600/20"
                          : "bg-blue-50"
                        : ""
                    }`}
                  >
                    <button
                      ref={(el) => {
                        resultRefs.current[i] = el;
                      }}
                      onClick={() => handleSelectItem(term)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`flex-1 flex items-center gap-3 px-4 py-2.5 transition-colors text-left ${
                        isDark ? "hover:bg-slate-800" : "hover:bg-gray-50"
                      }`}
                    >
                      <svg
                        className={`w-4 h-4 flex-shrink-0 ${
                          isDark ? "text-slate-600" : "text-gray-300"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span
                        className={`text-sm ${
                          isDark ? "text-slate-300" : "text-gray-700"
                        }`}
                      >
                        {term}
                      </span>
                    </button>
                    {/* دکمه حذف */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromHistory(term);
                      }}
                      className={`p-2 mx-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${
                        isDark
                          ? "hover:bg-slate-700 text-slate-500 hover:text-slate-300"
                          : "hover:bg-gray-200 text-gray-400 hover:text-gray-600"
                      }`}
                      title={lang === "fa" ? "حذف" : "Remove"}
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── نتایج جستجو ── */}
        {showResults && (
          <div
            className={`border-t max-h-80 overflow-y-auto ${
              isDark ? "border-slate-700/60" : "border-gray-100"
            }`}
          >
            {results.map((p, i) => {
              const catKey = lang === "fa" ? p.category.fa : p.category.en;
              const isActive = i === activeIndex;
              return (
                <button
                  key={`${p.port}-${p.name}`}
                  ref={(el) => {
                    resultRefs.current[i] = el;
                  }}
                  onClick={() => handleSelectItem(p.name)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left ${
                    isActive
                      ? isDark
                        ? "bg-blue-600/20 border-l-2 border-blue-500"
                        : "bg-blue-50 border-l-2 border-blue-500"
                      : isDark
                        ? "hover:bg-slate-800 border-l-2 border-transparent"
                        : "hover:bg-gray-50 border-l-2 border-transparent"
                  }`}
                >
                  <span
                    className={`font-black tabular-nums text-sm min-w-[50px] ${
                      isDark ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    {p.port}
                  </span>
                  <span
                    className={`font-semibold text-sm flex-1 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {p.name}
                  </span>
                  <span
                    className={`text-xs hidden sm:inline ${
                      isDark ? "text-slate-500" : "text-gray-400"
                    }`}
                  >
                    {CATEGORY_ICONS[catKey] || "📦"} {catKey}
                  </span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded border ${getTransportColor(
                      p.transport,
                      isDark
                    )}`}
                  >
                    {p.transport}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* ── خالی — نتیجه‌ای نیست ── */}
        {showEmpty && (
          <div
            className={`border-t py-8 text-center text-sm ${
              isDark
                ? "border-slate-700/60 text-slate-500"
                : "border-gray-100 text-gray-400"
            }`}
          >
            {t.noResult}
          </div>
        )}

        {/* ── خالی — تاریخچه‌ای نیست ── */}
        {showNoHistory && (
          <div
            className={`border-t py-8 text-center ${
              isDark ? "border-slate-700/60" : "border-gray-100"
            }`}
          >
            <svg
              className={`w-12 h-12 mx-auto mb-3 ${
                isDark ? "text-slate-700" : "text-gray-200"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p
              className={`text-sm ${
                isDark ? "text-slate-500" : "text-gray-400"
              }`}
            >
              {t.noRecentSearches}
            </p>
            <p
              className={`text-xs mt-1 ${
                isDark ? "text-slate-600" : "text-gray-300"
              }`}
            >
              {t.searchHint}
            </p>
          </div>
        )}

        {/* ── راهنما ── */}
        <div
          className={`border-t px-4 py-2.5 flex items-center justify-between text-xs ${
            isDark
              ? "border-slate-700/60 text-slate-600"
              : "border-gray-100 text-gray-400"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                  isDark
                    ? "bg-slate-800 border border-slate-700"
                    : "bg-gray-100 border border-gray-200"
                }`}
              >
                ↑↓
              </kbd>
              {t.navHint}
            </span>
            <span className="flex items-center gap-1">
              <kbd
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                  isDark
                    ? "bg-slate-800 border border-slate-700"
                    : "bg-gray-100 border border-gray-200"
                }`}
              >
                ↵
              </kbd>
              {t.select}
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd
              className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                isDark
                  ? "bg-slate-800 border border-slate-700"
                  : "bg-gray-100 border border-gray-200"
              }`}
            >
              ESC
            </kbd>
            {t.close}
          </span>
        </div>
      </div>
    </div>
  );
}