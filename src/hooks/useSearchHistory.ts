"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "netports:search-history";
const MAX_ITEMS = 10;

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>([]);

  // خواندن از localStorage در mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  // ذخیره در localStorage وقتی تغییر کرد
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      // quota exceeded
    }
  }, [history]);

  // اضافه کردن به تاریخچه
  const addToHistory = useCallback((term: string) => {
    const trimmed = term.trim();
    if (!trimmed || trimmed.length < 2) return;

    setHistory((prev) => {
      // حذف اگه قبلاً بوده (برای انتقال به اول)
      const filtered = prev.filter(
        (item) => item.toLowerCase() !== trimmed.toLowerCase()
      );
      // اضافه به اول + محدود کردن تعداد
      return [trimmed, ...filtered].slice(0, MAX_ITEMS);
    });
  }, []);

  // حذف یک آیتم
  const removeFromHistory = useCallback((term: string) => {
    setHistory((prev) =>
      prev.filter((item) => item.toLowerCase() !== term.toLowerCase())
    );
  }, []);

  // پاک کردن کل تاریخچه
  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
}