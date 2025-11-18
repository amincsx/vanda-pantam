import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure Turbopack uses THIS folder as the workspace root
  // See: https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack#root-directory
  // @ts-expect-error - turbopack is not in typed NextConfig yet
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
