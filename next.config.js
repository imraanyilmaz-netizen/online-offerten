import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'next/dist/compiled/webpack/webpack-lib.js';
import { legacyRedirects } from './legacy-redirects.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 80, 85],
    minimumCacheTTL: 86400, // 24 saat – görseller sık değişmez
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uhkiaodpzvhsuqfrwgih.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'online-offerten.ch',
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },

    optimizePackageImports: [
      'lucide-react',
      'react-icons',
      'date-fns',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-separator',
      '@radix-ui/react-slider',
    ]
  },

  // React strict mode
  reactStrictMode: true,

  // Source maps: Disable in production to avoid "missing source maps" warnings
  // This is just a warning, not an error - third-party libraries may not include source maps
  productionBrowserSourceMaps: false,

  // Modern JavaScript: Use SWC compiler with modern JavaScript features
  // This helps Google Speed Test recognize modern JavaScript
  // Note: removeConsole is not supported with Turbo mode
  // If you need to remove console.logs, use a babel plugin or webpack plugin instead
  // compiler: {
  //   removeConsole: process.env.NODE_ENV === 'production' ? {
  //     exclude: ['error', 'warn'],
  //   } : false,
  // },
  // Fix Router Cache issues - disable aggressive caching for client-side navigation
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },

  // Transpile packages if needed
  transpilePackages: ['@radix-ui/react-accordion', '@radix-ui/react-dialog'],

  // Exclude old src/pages directory from build
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

  webpack: (config, { isServer }) => {
    // Ignore src/pages directory (old Pages Router)
    // Performance: Ignore more directories to speed up file watching
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/src/pages/**', 
        '**/node_modules/**',
        '**/.next/**',
        '**/.git/**',
        '**/public/**',
        '**/build-*.txt',
        '**/*.md',
        '**/scripts/**',
        '**/supabase/functions/**',
        '**/plugins/**',
        '**/tools/**',
        '**/temp_*.tsx',
      ],
      aggregateTimeout: 300,
      poll: false,
    };
    // Add aliases to resolve both root and src directories
    // Next.js will try both paths automatically with this configuration
    const aliases = {
      '@/components': [
        path.resolve(__dirname, 'src/components'),
        path.resolve(__dirname, 'components'),
      ],
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/lib': [
        path.resolve(__dirname, 'src/lib'),
        path.resolve(__dirname, 'lib'),
      ],
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/contexts': [
        path.resolve(__dirname, 'src/contexts'),
        path.resolve(__dirname, 'contexts'),
      ],
      '@/data': path.resolve(__dirname, 'src/data'),
    };
    
    // Set primary alias (webpack doesn't support array, so use src first)
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/lib': path.resolve(__dirname, 'src/lib'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/contexts': path.resolve(__dirname, 'src/contexts'),
      '@/data': path.resolve(__dirname, 'src/data'),
    };
    // Ignore src/pages files (old Pages Router - not used anymore, app directory is used instead)
    if (!config.plugins) {
      config.plugins = [];
    }
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/src\/pages\//,
        contextRegExp: /src\/pages/,
      })
    );
    
    // Also ignore via resolve alias
    if (!config.resolve) {
      config.resolve = {};
    }
    if (!config.resolve.alias) {
      config.resolve.alias = {};
    }
    
    // Performance: Optimize webpack
    if (!isServer) {
      // Production: Enable proper code splitting for smaller bundles
      // Development: Faster rebuilds with relaxed optimization
      if (process.env.NODE_ENV === 'production') {
        config.optimization = {
          ...config.optimization,
          splitChunks: {
            chunks: 'all',
            cacheGroups: {
              // Separate heavy vendor libraries into their own chunks
              vendor: {
                test: /[\\/]node_modules[\\/](date-fns|@radix-ui|lucide-react|react-icons)[\\/]/,
                name: 'vendor-heavy',
                chunks: 'all',
                priority: 20,
              },
              // Common shared modules
              common: {
                minChunks: 2,
                priority: 10,
                reuseExistingChunk: true,
              },
            },
          },
        };
      } else {
        config.optimization = {
          ...config.optimization,
          removeAvailableModules: false,
          removeEmptyChunks: false,
        };
      }
      
      // Modern JavaScript: Target modern browsers (ES2020+)
      // This helps Google Speed Test recognize modern JavaScript
      if (!config.output) {
        config.output = {};
      }
      // Use modern JavaScript syntax in output
      config.output.environment = {
        ...config.output.environment,
        arrowFunction: true,
        bigIntLiteral: true,
        const: true,
        destructuring: true,
        dynamicImport: true,
        forOf: true,
        module: true,
        optionalChaining: true,
        templateLiteral: true,
        globalThis: true,
      };
      
      // Suppress source map warnings for third-party libraries
      // This prevents "missing source maps" warnings in browser console
      if (config.devtool) {
        // Keep existing devtool setting but suppress warnings
        config.ignoreWarnings = [
          ...(config.ignoreWarnings || []),
          /Failed to parse source map/,
          /Missing source map/,
        ];
      }
    }
    
    return config;
  },

  async redirects() {
    return legacyRedirects;
  },

  turbopack: {
    // Proje kökü; üst klasördeki başka package-lock.json yanlış root seçimini engeller
    root: __dirname,
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    }
  }
}

export default nextConfig

