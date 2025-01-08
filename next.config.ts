import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'placehold.co',
        pathname: '/**'
      },
      {
        protocol: "https",
        hostname: 'nrs.harvard.edu',
        pathname: '/**'
      }
      
    ]
  }
};

export default nextConfig;
