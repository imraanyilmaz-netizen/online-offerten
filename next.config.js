import { legacyRedirects } from './legacy-redirects.mjs'
import withBundleAnalyzer from '@next/bundle-analyzer'

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85],
    minimumCacheTTL: 86400,
    remotePatterns: [
      { protocol: 'https', hostname: 'uhkiaodpzvhsuqfrwgih.supabase.co' },
      { protocol: 'https', hostname: 'storage.googleapis.com' },
      { protocol: 'https', hostname: 'online-offerten.ch' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  async redirects() {
    return legacyRedirects
  },
}

export default bundleAnalyzer(nextConfig)
