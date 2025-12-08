import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/digital-health-twin',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
