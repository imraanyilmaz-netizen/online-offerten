import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'next/dist/compiled/webpack/webpack-lib.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
    ],
    // Turbo mode for faster builds
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
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
        source: '/umzugsfirmen-im-vergleich-warum-sich-ein-umzugs',
        destination: '/',
        permanent: true,
      },
      // Alte englische Form-Seite → deutsche Version
      {
        source: '/free-quote-request',
        destination: '/kostenlose-offerte-anfordern',
        permanent: true,
      },
      // Alte Services-Seite → Startseite
      {
        source: '/services',
        destination: '/',
        permanent: true,
      },
      // Alte .php URLs → Startseite
      {
        source: '/g2.php',
        destination: '/',
        permanent: true,
      },
      {
        source: '/s3.php',
        destination: '/',
        permanent: true,
      },
      {
        source: '/w3.php',
        destination: '/',
        permanent: true,
      },
      {
        source: '/checklisten',
        destination: '/umzugsfirma/checklists',
        permanent: true, // 308 redirect
      },
      {
        source: '/checklists',
        destination: '/umzugsfirma/checklists',
        permanent: true, // 301 redirect
      },
      {
        source: '/umzugsfirma-zurich',
        destination: '/umzugsfirma/zuerich',
        permanent: true, // 301 redirect - direkt yeni URL'ye
      },
      {
        source: '/floor-cleaning',
        destination: '/bodenreinigung',
        permanent: true, // 308 redirect
      },
      // Malerfirma-in-der-naehe → /malerfirma (ana sayfa + alt sayfalar)
      {
        source: '/malerfirma-in-der-naehe',
        destination: '/malerfirma',
        permanent: true, // 301 redirect
      },
      {
        source: '/malerfirma-in-der-naehe/:path*',
        destination: '/malerfirma/:path*',
        permanent: true, // 301 redirect
      },
      // Eski malerfirma şehir URL'leri → yeni URL'lere (tek hop)
      {
        source: '/malerfirma-zuerich',
        destination: '/malerfirma/zuerich',
        permanent: true,
      },
      {
        source: '/malerfirma-basel',
        destination: '/malerfirma/basel',
        permanent: true,
      },
      {
        source: '/malerfirma-bern',
        destination: '/malerfirma/bern',
        permanent: true,
      },
      {
        source: '/malerfirma-winterthur',
        destination: '/malerfirma/winterthur',
        permanent: true,
      },
      {
        source: '/malerfirma-luzern',
        destination: '/malerfirma/luzern',
        permanent: true,
      },
      {
        source: '/malerfirma-st-gallen',
        destination: '/malerfirma/st-gallen',
        permanent: true,
      },
      {
        source: '/malerfirma-genf',
        destination: '/malerfirma/genf',
        permanent: true,
      },
      {
        source: '/malerfirma-lausanne',
        destination: '/malerfirma/lausanne',
        permanent: true,
      },
      // Reinigungsfirma-in-der-naehe → /reinigungsfirma (ana sayfa + alt sayfalar)
      {
        source: '/reinigungsfirma-in-der-naehe',
        destination: '/reinigungsfirma',
        permanent: true, // 301 redirect
      },
      {
        source: '/reinigungsfirma-in-der-naehe/:path*',
        destination: '/reinigungsfirma/:path*',
        permanent: true, // 301 redirect
      },
      // Eski reinigungsfirma şehir URL'leri → yeni URL'lere (tek hop)
      {
        source: '/reinigungsfirma-zuerich',
        destination: '/reinigungsfirma/zuerich',
        permanent: true,
      },
      {
        source: '/reinigungsfirma-basel',
        destination: '/reinigungsfirma/basel',
        permanent: true,
      },
      {
        source: '/reinigungsfirma-bern',
        destination: '/reinigungsfirma/bern',
        permanent: true,
      },
      {
        source: '/reinigungsfirma-genf',
        destination: '/reinigungsfirma/genf',
        permanent: true,
      },
      {
        source: '/reinigungsfirma-lausanne',
        destination: '/reinigungsfirma/lausanne',
        permanent: true,
      },
      {
        source: '/reinigungsfirma-luzern',
        destination: '/reinigungsfirma/luzern',
        permanent: true,
      },
      {
        source: '/reinigungsfirma-st-gallen',
        destination: '/reinigungsfirma/st-gallen',
        permanent: true,
      },
      {
        source: '/reinigungsfirma-winterthur',
        destination: '/reinigungsfirma/winterthur',
        permanent: true,
      },
      // Umzugsfirma-in-der-naehe alt sayfaları → /umzugsfirma/ altına (ana sayfa kalıyor)
      {
        source: '/umzugsfirma-in-der-naehe/:path+',
        destination: '/umzugsfirma/:path+',
        permanent: true, // 301 redirect
      },
      // Eski kanton URL'leri → yeni URL'lere (tek hop, zincir yok)
      {
        source: '/umzugsfirma-zuerich',
        destination: '/umzugsfirma/zuerich',
        permanent: true,
      },
      {
        source: '/umzugsfirma-zuerich/:city*',
        destination: '/umzugsfirma/zuerich/:city*',
        permanent: true,
      },
      {
        source: '/umzugsfirma-basel',
        destination: '/umzugsfirma/basel',
        permanent: true,
      },
      {
        source: '/umzugsfirma-bern',
        destination: '/umzugsfirma/bern',
        permanent: true,
      },
      {
        source: '/umzugsfirma-genf',
        destination: '/umzugsfirma/genf',
        permanent: true,
      },
      {
        source: '/umzugsfirma-lausanne',
        destination: '/umzugsfirma/lausanne',
        permanent: true,
      },
      {
        source: '/umzugsfirma-luzern',
        destination: '/umzugsfirma/luzern',
        permanent: true,
      },
      {
        source: '/umzugsfirma-st-gallen',
        destination: '/umzugsfirma/st-gallen',
        permanent: true,
      },
      {
        source: '/umzugsfirma-thun',
        destination: '/umzugsfirma/thun',
        permanent: true,
      },
      {
        source: '/umzugsfirma-biel-bienne',
        destination: '/umzugsfirma/biel-bienne',
        permanent: true,
      },
      {
        source: '/umzugsfirma-lugano',
        destination: '/umzugsfirma/lugano',
        permanent: true,
      },
      {
        source: '/umzugsfirma-aargau',
        destination: '/umzugsfirma/aargau',
        permanent: true,
      },
      {
        source: '/umzugsfirma-aargau/:city*',
        destination: '/umzugsfirma/aargau/:city*',
        permanent: true,
      },
      {
        source: '/umzugsofferten-zuerich',
        destination: '/umzugsfirma/zuerich/umzugsofferten-zuerich',
        permanent: true,
      },
      // Malerarbeiten → Malerarbeitenkosten
      {
        source: '/malerarbeiten',
        destination: '/malerarbeitenkosten',
        permanent: true,
      },
      // Umzugskosten-Rechner → Umzugskosten
      {
        source: '/umzugskosten-rechner',
        destination: '/umzugskosten',
        permanent: true, // 301 redirect (SEO için önemli)
      },
      // Reinigungskosten-Rechner → Reinigungskosten
      {
        source: '/reinigungskosten-rechner',
        destination: '/reinigung/reinigungskosten',
        permanent: true, // 301 redirect (SEO için önemli)
      },
      // Reinigungskosten → /reinigung/reinigungskosten
      {
        source: '/reinigungskosten',
        destination: '/reinigung/reinigungskosten',
        permanent: true,
      },
      // Reinigung alt sayfaları → /reinigung/ altına
      {
        source: '/wohnungsreinigung',
        destination: '/reinigung/wohnungsreinigung',
        permanent: true,
      },
      {
        source: '/hausreinigung',
        destination: '/reinigung/hausreinigung',
        permanent: true,
      },
      {
        source: '/bueroreinigung',
        destination: '/reinigung/bueroreinigung',
        permanent: true,
      },
      {
        source: '/umzugsreinigung',
        destination: '/reinigung/umzugsreinigung',
        permanent: true,
      },
      {
        source: '/unterhaltsreinigung',
        destination: '/reinigung/unterhaltsreinigung',
        permanent: true,
      },
      {
        source: '/grundreinigung',
        destination: '/reinigung/grundreinigung',
        permanent: true,
      },
      {
        source: '/baureinigung',
        destination: '/reinigung/baureinigung',
        permanent: true,
      },
      {
        source: '/fensterreinigung',
        destination: '/reinigung/fensterreinigung',
        permanent: true,
      },
      {
        source: '/bodenreinigung',
        destination: '/reinigung/bodenreinigung',
        permanent: true,
      },
      {
        source: '/fassadenreinigung',
        destination: '/reinigung/fassadenreinigung',
        permanent: true,
      },
      {
        source: '/hofreinigung',
        destination: '/reinigung/hofreinigung',
        permanent: true,
      },
      // Service sayfaları → /umzugsfirma/ altına
      {
        source: '/privatumzug',
        destination: '/umzugsfirma/privatumzug',
        permanent: true,
      },
      {
        source: '/geschaeftsumzug',
        destination: '/umzugsfirma/geschaeftsumzug',
        permanent: true,
      },
      {
        source: '/internationale-umzuege',
        destination: '/umzugsfirma/internationale-umzuege',
        permanent: true,
      },
      {
        source: '/spezialtransporte',
        destination: '/umzugsfirma/spezialtransporte',
        permanent: true,
      },
      // Klaviertransport redirects - eski URL'lerden yeni URL'lere
      {
        source: '/klaviertransport',
        destination: '/umzugsfirma/spezialtransporte/klaviertransport',
        permanent: true,
      },
      {
        source: '/klaviertransport/kosten',
        destination: '/umzugsfirma/spezialtransporte/klaviertransport/kosten',
        permanent: true,
      },
      {
        source: '/umzugsfirma/klaviertransport',
        destination: '/umzugsfirma/spezialtransporte/klaviertransport',
        permanent: true,
      },
      {
        source: '/umzugsfirma/klaviertransport/kosten',
        destination: '/umzugsfirma/spezialtransporte/klaviertransport/kosten',
        permanent: true,
      },
      // Trailing slash varyasyonları
      {
        source: '/klaviertransport/',
        destination: '/umzugsfirma/spezialtransporte/klaviertransport',
        permanent: true,
      },
      {
        source: '/klaviertransport/kosten/',
        destination: '/umzugsfirma/spezialtransporte/klaviertransport/kosten',
        permanent: true,
      },
      {
        source: '/umzugsfirma/klaviertransport/',
        destination: '/umzugsfirma/spezialtransporte/klaviertransport',
        permanent: true,
      },
      {
        source: '/umzugsfirma/klaviertransport/kosten/',
        destination: '/umzugsfirma/spezialtransporte/klaviertransport/kosten',
        permanent: true,
      },
      {
        source: '/umzugsfirma/guenstig-umziehen',
        destination: '/guenstig-umziehen',
        permanent: true,
      },
      {
        source: '/umzugshilfe',
        destination: '/umzugsfirma/umzugshilfe',
        permanent: true,
      },
      {
        source: '/umzugskosten',
        destination: '/umzugsfirma/umzugskosten',
        permanent: true,
      },
      // Uluslararası sayfalar → /umzugsfirma/internationale-umzuege/ altına
      {
        source: '/umzug-nach-belgien',
        destination: '/umzugsfirma/internationale-umzuege/umzug-nach-belgien',
        permanent: true,
      },
      {
        source: '/umzug-nach-daenemark',
        destination: '/umzugsfirma/internationale-umzuege/umzug-nach-daenemark',
        permanent: true,
      },
      {
        source: '/umzug-nach-deutschland',
        destination: '/umzugsfirma/internationale-umzuege/umzug-nach-deutschland',
        permanent: true,
      },
      {
        source: '/umzug-nach-frankreich',
        destination: '/umzugsfirma/internationale-umzuege/umzug-nach-frankreich',
        permanent: true,
      },
      {
        source: '/umzug-nach-italien',
        destination: '/umzugsfirma/internationale-umzuege/umzug-nach-italien',
        permanent: true,
      },
      {
        source: '/umzug-nach-oesterreich',
        destination: '/umzugsfirma/internationale-umzuege/umzug-nach-oesterreich',
        permanent: true,
      },
      {
        source: '/umzug-nach-portugal',
        destination: '/umzugsfirma/internationale-umzuege/umzug-nach-portugal',
        permanent: true,
      },
      {
        source: '/umzug-nach-spanien',
        destination: '/umzugsfirma/internationale-umzuege/umzug-nach-spanien',
        permanent: true,
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
}

export default nextConfig

