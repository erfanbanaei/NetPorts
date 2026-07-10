"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * هوک امن برای Next.js (جلوگیری از خطای Hydration)
 * در رندر اول همیشه از initialValue استفاده می‌کند تا با سرور یکی باشد.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
): [T, (value: T | ((prev: T) => T)) => void] {
  
  // ۱. همیشه با مقدار پیش‌فرض شروع می‌کنیم (هم سرور هم کلاینت)
  const [stored, setStored] = useState<T>(initialValue);

  // ۲. بعد از mount شدن کامپوننت در کلاینت، از localStorage می‌خوانیم
  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item !== null) {
        setStored(JSON.parse(item));
      } else if (typeof initialValue === "function") {
        // برای حالت Auto Dark Mode
        setStored((initialValue as () => T)());
      }
    } catch {
      // خطا در خواندن از localStorage
    }
  }, [key]); // intentionally ignoring initialValue

  // ۳. آپدیت کردن state و localStorage همزمان
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStored((prev) => {
        const next = value instanceof Function ? (value as (prev: T) => T)(prev) : value;
        try {
          localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // quota exceeded یا حالت private mode
        }
        return next;
      });
    },
    [key]
  );

  return [stored, setValue];
}