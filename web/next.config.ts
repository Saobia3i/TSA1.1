import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  compress: true,
  
  redirects: async () => [
    {
      source: '/:path*',
      destination: 'https://www.tensorsecurityacademy.com/:path*',
      permanent: true,
      has: [
        {
          type: 'host',
          value: 'tensorsecurityacademy.com',
        },
      ],
    },
  ],
  
    images: {
    formats: ['image/avif', 'image/webp'], // Modern formats
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: false,
    minimumCacheTTL: 60,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Production এ console.log remove
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
      
    },
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'recharts'], 
    
  },

  turbopack: {},  // Suppresses Turbopack warnings with Webpack usage

  webpack(config) {
    config.resolve.alias['@prisma/client'] = path.resolve(__dirname, './generated/client');
    return config;
  },
};

export default nextConfig;