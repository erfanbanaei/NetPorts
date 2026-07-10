"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useCallback } from "react";

export type TransportFilter = "TCP" | "UDP" | "TCP/UDP" | "all";
export type ViewMode = "card" | "table";

export function useUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const transport = (searchParams.get("transport") || "all") as TransportFilter;
  const view = (searchParams.get("view") || "card") as ViewMode;

  const updateUrl = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (!value || value === "all" || value === "" || value === "card") {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      
      router.replace(newUrl, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const setSearch = useCallback(
    (value: string) => updateUrl("search", value),
    [updateUrl]
  );

  const setCategory = useCallback(
    (value: string) => updateUrl("category", value),
    [updateUrl]
  );

  const setTransport = useCallback(
    (value: TransportFilter) => updateUrl("transport", value),
    [updateUrl]
  );

  const setView = useCallback(
    (value: ViewMode) => updateUrl("view", value),
    [updateUrl]
  );

  return {
    search,
    category,
    transport,
    view,
    setSearch,
    setCategory,
    setTransport,
    setView,
  };
}