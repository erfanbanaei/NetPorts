"use client";

import { useEffect, useState } from "react";

/**
 * مقدار ورودی را با تأخیر برمی‌گرداند
 * مثال: const debouncedSearch = useDebounce(searchTerm, 250);
 */
export function useDebounce<T>(value: T, delay = 250): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}