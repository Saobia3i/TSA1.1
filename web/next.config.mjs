import path from "path";
import { fileURLToPath } from "url";
import withPWAInit from "next-pwa";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,

  // PWA OFFLINE WILL NOT WORK in `next dev` with this enabled:
  disable: process.env.NODE_ENV === "development",

  buildExcludes: [/middleware-manifest\.json$/],

  // ✅ Offline fallback for page navigations
  navigateFallback: "/offline",
  navigateFallbackDenylist: [
    /^\/api\//,           // don't intercept api
    /^\/_next\//,         // don't intercept next internals
    /\/[^/?]+\.[^/]+$/,   // don't intercept file requests
  ],

  runtimeCaching: [
    // ✅ Never cache NextAuth endpoints
    {
      urlPattern: /^\/api\/auth\/.*$/i,
      handler: "NetworkOnly",
      options: { cacheName: "auth-network-only" },
    },

    // ✅ Next.js static assets
    {
      urlPattern: /^\/_next\/static\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "next-static",
        expiration: { maxEntries: 64, maxAgeSeconds: 30 * 24 * 60 * 60 },
      },
    },

    // ✅ Next Image optimizer
    {
      urlPattern: /\/_next\/image\?url=.+$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "next-image",
        expiration: { maxEntries: 64, maxAgeSeconds: 24 * 60 * 60 },
      },
    },

    // ✅ Fonts
    {
      urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: { maxEntries: 4, maxAgeSeconds: 365 * 24 * 60 * 60 },
      },
    },

    // ✅ Images
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-image-assets",
        expiration: { maxEntries: 128, maxAgeSeconds: 7 * 24 * 60 * 60 },
      },
    },

    // ✅ CSS/JS
    {
      urlPattern: /\.(?:js)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-js-assets",
        expiration: { maxEntries: 64, maxAgeSeconds: 24 * 60 * 60 },
      },
    },
    {
      urlPattern: /\.(?:css|less)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-style-assets",
        expiration: { maxEntries: 64, maxAgeSeconds: 24 * 60 * 60 },
      },
    },

    // ✅ Pages / navigation (THIS is what makes your site usable offline)
    {
      urlPattern: ({ request }) => request.mode === "navigate",
      handler: "NetworkFirst",
      options: {
        cacheName: "pages",
        networkTimeoutSeconds: 3,
        expiration: { maxEntries: 32, maxAgeSeconds: 24 * 60 * 60 },
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,

  redirects: async () => [
    {
      source: "/:path*",
      destination: "https://tensorsecurityacademy.com/:path*",
      permanent: true,
      has: [{ type: "host", value: "www.tensorsecurityacademy.com" }],
    },
  ],

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    unoptimized: false,
    minimumCacheTTL: 60,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  experimental: {
    serverActions: { bodySizeLimit: "2mb" },
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "recharts"],
  },

  turbopack: {},

  webpack(config) {
    config.resolve.alias["@prisma/client"] = path.resolve(
      __dirname,
      "./generated/client"
    );
    return config;
  },
};

export default withPWA(nextConfig);
