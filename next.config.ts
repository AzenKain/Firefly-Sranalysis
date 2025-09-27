
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
            protocol: 'https',
            hostname: 'api.hakush.in',
            pathname: '**',
          },
      ],
  },
  eslint: {
      ignoreDuringBuilds: true,
  },

};

export default withBundleAnalyzer(withNextIntl(nextConfig));
