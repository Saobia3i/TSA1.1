
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Image quality configuration
    qualities: [75, 90], // 75 default, 90 for high quality images
    
    // Allowed external image domains (if needed)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS domains for flexibility
      },
    ],
    
    // Disable optimization for GIFs (they're animated)
    unoptimized: false, // Keep optimization on for other images
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  
  // Dev origin configuration for cross-origin requests

};

export default nextConfig;
