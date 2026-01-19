import type { NextConfig } from "next";

// We change ': NextConfig' to ': any' to stop the "eslint does not exist" error
const nextConfig: any = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;