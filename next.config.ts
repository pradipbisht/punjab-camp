import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 85] },
  headers: async () => [{ source: "/videos/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=86400, immutable" }] }],
};

export default nextConfig;
