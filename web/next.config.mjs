const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,

  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: isProd
              ? "public, max-age=31536000, immutable"
              : "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90], // Added 90 to fix the warning
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    unoptimized: isDev,
    minimumCacheTTL: 60,
  },

  compiler: {
    removeConsole: isProd,
  },

  experimental: {
    serverActions: { bodySizeLimit: "2mb" },
    optimizeCss: isProd,
    optimizePackageImports: [
      "lucide-react",
      "recharts",
      "@mui/material",
      "@mui/icons-material",
      "@heroicons/react",
    ],
  },

  // ✅ SOLUTION: Use default Prisma location (no custom paths)
  // This avoids Windows path issues with Turbopack
  turbopack: {},
};

export default nextConfig;
