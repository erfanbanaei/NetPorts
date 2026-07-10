/* Service Worker سبک برای NetPorts
 * راهبرد:
 *  - دارایی‌های هش‌دار Next (/_next/static) و فونت‌ها: cache-first (تغییرناپذیر)
 *  - ناوبری صفحات (HTML): network-first با fallback به کش و صفحه‌ی آفلاین
 *  - سایر GET های هم‌مبدأ: stale-while-revalidate
 */
const VERSION = "netports-v1";
const STATIC_CACHE = `${VERSION}-static`;
const PAGES_CACHE = `${VERSION}-pages`;

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

function isImmutableAsset(url) {
  return (
    url.pathname.includes("/_next/static/") ||
    url.pathname.startsWith("/fonts/") ||
    /\.(?:woff2?|ttf|otf|png|svg|ico|jpg|jpeg|webp)$/.test(url.pathname)
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // فقط هم‌مبدأ

  // ناوبری صفحات: network-first
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          const cache = await caches.open(PAGES_CACHE);
          cache.put(request, fresh.clone());
          return fresh;
        } catch {
          const cached = await caches.match(request);
          return cached || (await caches.match("/404.html")) || Response.error();
        }
      })()
    );
    return;
  }

  // دارایی‌های تغییرناپذیر: cache-first
  if (isImmutableAsset(url)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        const fresh = await fetch(request);
        const cache = await caches.open(STATIC_CACHE);
        cache.put(request, fresh.clone());
        return fresh;
      })()
    );
    return;
  }

  // بقیه: stale-while-revalidate
  event.respondWith(
    (async () => {
      const cached = await caches.match(request);
      const network = fetch(request)
        .then((resp) => {
          const cache = caches.open(STATIC_CACHE);
          cache.then((c) => c.put(request, resp.clone()));
          return resp;
        })
        .catch(() => cached);
      return cached || network;
    })()
  );
});
