"use client";

import { useEffect } from "react";

/**
 * ثبت Service Worker برای قابلیت آفلاین (PWA).
 * جایگزین سبک و سازگار با Next 16 برای next-pwa (که با Turbopack کار نمی‌کرد).
 * فقط در production ثبت می‌شود تا در توسعه دچار کش‌های قدیمی نشویم.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;

    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    const register = () => {
      navigator.serviceWorker.register(`${base}/sw.js`).catch(() => {
        // ثبت ناموفق را بی‌صدا رد می‌کنیم؛ سایت بدون SW هم کار می‌کند
      });
    };

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);

  return null;
}
