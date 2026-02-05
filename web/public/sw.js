// public/sw.js
const CACHE_VERSION = "TSA-v3";

// Only include static assets that are safe to keep across deploys.
const PRECACHE = [
  "/icon-72.png",
  "/icon-192.png",
  "/icon-512.png",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);

      // IMPORTANT: don't use cache.addAll() — it fails if any single request fails.
      for (const url of PRECACHE) {
        try {
          // cache:"reload" helps avoid caching redirected/old responses while testing
          const req = new Request(url, { cache: "reload" });
          const res = await fetch(req);

          // Only cache valid successful responses
          if (!res || !res.ok) {
            console.warn("[SW] Precache skipped:", url, "status:", res?.status);
            continue;
          }

          // Avoid caching opaque/redirect responses
          if (res.type === "opaque" || res.redirected) {
            console.warn("[SW] Precache skipped (opaque/redirect):", url);
            continue;
          }

          await cache.put(req, res.clone());
          console.log("[SW] Precached:", url);
        } catch (err) {
          console.warn("[SW] Precache failed:", url, err);
        }
      }
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((k) => (k !== CACHE_VERSION ? caches.delete(k) : null))
      );
      await self.clients.claim();
      console.log("[SW] Activated:", CACHE_VERSION);
    })()
  );
});

// Allow the app to trigger immediate activation
self.addEventListener("message", (event) => {
  if (event?.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle same-origin
  if (url.origin !== self.location.origin) return;

  // Never handle API requests
  if (url.pathname.startsWith("/api/")) return;

  // Never handle Next.js internal assets (avoid stale chunk errors)
  if (url.pathname.startsWith("/_next/")) return;

  // NAVIGATION (pages)
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          // Network-only for HTML to prevent serving stale pages after deploys
          return await fetch(req);
        } catch {
          // Offline fallback
          const cache = await caches.open(CACHE_VERSION);
          const home = await cache.match(new Request("/"));
          if (home) return home;

          return new Response(
            "<h1>You are offline</h1><p>This page was not cached yet.</p>",
            { headers: { "Content-Type": "text/html; charset=utf-8" } }
          );
        }
      })()
    );
    return;
  }

  // STATIC ASSETS (Cache-first, excluding JS/CSS chunks)
  if (
    /\.(?:png|jpg|jpeg|webp|svg|ico|woff|woff2|ttf|otf)$/.test(
      url.pathname
    )
  ) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_VERSION);
        const cached = await cache.match(req);
        if (cached) return cached;

        try {
          const fresh = await fetch(req);
          if (fresh && fresh.ok) await cache.put(req, fresh.clone());
          return fresh;
        } catch {
          return cached || Response.error();
        }
      })()
    );
  }
});
