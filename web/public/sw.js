// public/sw.js
const CACHE_VERSION = "TSA-v2";

// Only include routes that are PUBLIC and return 200 without auth/middleware redirects
const PRECACHE = [
  "/",
  "/about",
  "/about/team",
  "/about/join",
  "/courses",
  "/services",
  "/services/web-application-vapt",
  "/services/vapt-service",
  "/services/api-security-testing",
  "/services/ai-llm-security-assessment",
  "/services/network-security-audit",
  "/services/osint-assessment",
  "/services/soc-as-a-service",
  "/services/ai-automation-solutions",
  "/services/secure-web-development",
  "/tools",
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

// Helper: network-first with timeout fallback to cache (best for pages)
async function networkFirstWithTimeout(req, cacheName, timeoutMs = 2500) {
  const cache = await caches.open(cacheName);

  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("network timeout")), timeoutMs)
  );

  try {
    const res = await Promise.race([fetch(req), timeoutPromise]);

    // Cache only successful HTML/doc responses (avoid caching errors)
    if (
      res &&
      res.ok &&
      (res.type === "basic" || res.type === "default") &&
      res.headers.get("content-type")?.includes("text/html")
    ) {
      await cache.put(req, res.clone());
    }

    return res;
  } catch (e) {
    const cached = await cache.match(req);
    if (cached) return cached;
    throw e;
  }
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle same-origin
  if (url.origin !== self.location.origin) return;

  // Never handle API requests
  if (url.pathname.startsWith("/api/")) return;

  // NAVIGATION (pages)
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        // Use request as key instead of url.pathname to avoid edge cases
        const cache = await caches.open(CACHE_VERSION);
        const cached = await cache.match(req);
        if (cached) return cached;

        try {
          // Network-first with a small timeout, then fallback to cache
          const res = await networkFirstWithTimeout(req, CACHE_VERSION, 2500);
          return res;
        } catch {
          // Offline fallback: serve cached home if nothing else is available
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

  // STATIC ASSETS (Cache-first)
  if (
    url.pathname.startsWith("/_next/static/") ||
    /\.(?:png|jpg|jpeg|webp|svg|ico|css|js)$/.test(url.pathname)
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
