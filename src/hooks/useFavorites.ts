"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "netports:favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  // خواندن از localStorage در mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as string[];
        setFavorites(new Set(parsed));
      }
    } catch {
      // ignore
    }
    setIsLoaded(true);
  }, []);

  // ذخیره در localStorage وقتی تغییر کرد
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
    } catch {
      // quota exceeded
    }
  }, [favorites, isLoaded]);

  // چک کردن آیا favorite هست
  const isFavorite = useCallback(
    (id: string) => favorites.has(id),
    [favorites]
  );

  // toggle favorite
  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // اضافه کردن
  const addFavorite = useCallback((id: string) => {
    setFavorites((prev) => new Set(prev).add(id));
  }, []);

  // حذف کردن
  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  // پاک کردن همه
  const clearFavorites = useCallback(() => {
    setFavorites(new Set());
  }, []);

  return {
    favorites,
    count: favorites.size,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
    isLoaded,
  };
}