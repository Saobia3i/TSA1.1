const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Enable compression and SWC minification
  compress: true,
  poweredByHeader: false,

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
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 90],
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    unoptimized: isDev,
    minimumCacheTTL: 60,
  },

  compiler: {
    removeConsole: isProd ? {
      exclude: ['error', 'warn'],
    } : false,
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
      "framer-motion",
    ],
  },

  // ✅ Webpack optimizations for better code splitting
  webpack: (config, { isServer }) => {
    if (!isServer && isProd) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            styles: {
              name: 'styles',
              test: /\.css$/,
              chunks: 'all',
              enforce: true,
            },
            commons: {
              name: 'commons',
              chunks: 'all',
              minChunks: 2,
              priority: 10,
            },
          },
        },
      };
    }
    return config;
  },

  turbopack: {},
};

export default nextConfig;
