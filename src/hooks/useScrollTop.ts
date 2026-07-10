"use client";

import { useEffect, useState } from "react";

/** آیا کاربر از بالای صفحه رد شده؟ */
export function useScrollTop(threshold = 300): boolean {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => setShow(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  return show;
}