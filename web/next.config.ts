import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: false,
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
      
    },
  },

  turbopack: {},  // Suppresses Turbopack warnings with Webpack usage

  webpack(config) {
    config.resolve.alias['@prisma/client'] = path.resolve(__dirname, './generated/client');
    return config;
  },
};

export default nextConfig;