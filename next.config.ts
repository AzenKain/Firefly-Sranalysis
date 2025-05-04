
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";


const withNextIntl = createNextIntlPlugin()
const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  images: {
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

export default withNextIntl(nextConfig);
