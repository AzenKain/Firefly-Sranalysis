
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";


const withNextIntl = createNextIntlPlugin()
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/hakushin',
        destination: 'https://api.hakush.in/hsr/data/character.json',
      },
    ];
  },
};

export default withNextIntl(nextConfig);
