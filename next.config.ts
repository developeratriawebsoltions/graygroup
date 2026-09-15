import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    // Every photograph is served locally from /public/images, so no remote
    // patterns are required. Next.js 16 requires an explicit quality
    // allowlist — these are the only values the design uses.
    qualities: [60, 75, 82, 90],
    formats: ["image/avif", "image/webp"],
    // Assets are content-addressed by filename, so they can cache aggressively.
    minimumCacheTTL: 2678400, // 31 days
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920, 2048, 2560],
    imageSizes: [96, 128, 200, 256, 320, 420],
  },

  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
