import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';

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
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // React strict mode
  reactStrictMode: true,
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
    }
    
    return config;
  },
}

export default nextConfig

