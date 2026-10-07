import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  output: "standalone",
  rewrites: async () => [
    {
      source: "/api/:path*",
      destination:
        (process.env.BACKEND_INTERNAL_URL || "http://localhost:3001") +
        "/:path*",
    },
  ],
};

export default nextConfig;
