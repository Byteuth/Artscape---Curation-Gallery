import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "placehold.co",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "nrs.harvard.edu",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images.metmuseum.org",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "via.placeholder.com",
				pathname: "/**",
			},
		],
	},
	eslint: {
		ignoreDuringBuilds: true, 
	},
};

export default nextConfig;
