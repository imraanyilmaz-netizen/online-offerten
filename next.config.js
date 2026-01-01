import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'next/dist/compiled/webpack/webpack-lib.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
  },
  // React strict mode
  reactStrictMode: true,
  // Source maps: Disable in production to avoid "missing source maps" warnings
  // This is just a warning, not an error - third-party libraries may not include source maps
  productionBrowserSourceMaps: false,
  // Modern JavaScript: Use SWC compiler with modern JavaScript features
  // This helps Google Speed Test recognize modern JavaScript
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Modern JavaScript output: Target modern browsers
  // This reduces bundle size and improves performance
  swcMinify: true,
  // Fix Router Cache issues - disable aggressive caching for client-side navigation
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  // Redirects for URL aliases
  async redirects() {
    return [
      {
        source: '/checklisten',
        destination: '/checklists',
        permanent: true, // 308 redirect
      },
      {
        source: '/umzugsfirma-zurich',
        destination: '/umzugsfirma-zuerich',
        permanent: true, // 308 redirect
      },
    ];
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
      '@/i18n': path.resolve(__dirname, 'src/i18n.js'),
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
      '@/i18n': path.resolve(__dirname, 'src/i18n.js'),
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
    
    // Performance: Optimize webpack for development
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      };
      
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
}

export default nextConfig

