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
      },
      {
        protocol: "https",
        hostname: 'images.metmuseum.org',
        pathname: '/**'
      }
      
    ]
  }
};

export default nextConfig;
