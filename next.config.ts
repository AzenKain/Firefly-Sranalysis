
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withNextIntl = createNextIntlPlugin()
const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '**',
      },
      {
        protocol: "https",
        hostname: "r2.kain.id.vn",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.kain.id.vn",
        pathname: "**",
      }
    ],
  },
  compiler: {
    styledComponents: true,
  },
  env: {
    CDN_URL: "https://r2.kain.id.vn/asbres",
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
