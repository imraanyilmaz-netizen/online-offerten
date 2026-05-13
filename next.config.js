import { legacyRedirects } from './legacy-redirects.mjs'
import withBundleAnalyzer from '@next/bundle-analyzer'

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Tree-shake'lenmesi zor barrel-export'lu paketleri Next'in optimize etmesini sağla.
  // Sonuç: LCP path'inden ~50-150KB JS azalır.
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-label',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slider',
      '@radix-ui/react-slot',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      'date-fns',
      'react-icons',
    ],
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [70, 75, 80, 85],
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
