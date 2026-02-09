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
    minimumCacheTTL: 60,
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
      'framer-motion',
      'lucide-react',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
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
        destination: '/umzugsfirma-zuerich',
        permanent: true, // 308 redirect
      },
      {
        source: '/floor-cleaning',
        destination: '/bodenreinigung',
        permanent: true, // 308 redirect
      },
      // Umzugsfirma kanton sayfaları → yeni URL yapısına
      {
        source: '/umzugsfirma-zuerich',
        destination: '/umzugsfirma-in-der-naehe/zuerich',
        permanent: true,
      },
      {
        source: '/umzugsfirma-zuerich/:city*',
        destination: '/umzugsfirma-in-der-naehe/zuerich/:city*',
        permanent: true,
      },
      {
        source: '/umzugsfirma-in-der-naehe/umzugsfirma-zuerich',
        destination: '/umzugsfirma-in-der-naehe/zuerich',
        permanent: true,
      },
      {
        source: '/umzugsfirma-in-der-naehe/umzugsfirma-zuerich/:city*',
        destination: '/umzugsfirma-in-der-naehe/zuerich/:city*',
        permanent: true,
      },
      // Basel
      {
        source: '/umzugsfirma-basel',
        destination: '/umzugsfirma-in-der-naehe/basel',
        permanent: true,
      },
      {
        source: '/umzugsfirma-in-der-naehe/umzugsfirma-basel',
        destination: '/umzugsfirma-in-der-naehe/basel',
        permanent: true,
      },
      // Bern
      {
        source: '/umzugsfirma-bern',
        destination: '/umzugsfirma-in-der-naehe/bern',
        permanent: true,
      },
      {
        source: '/umzugsfirma-in-der-naehe/umzugsfirma-bern',
        destination: '/umzugsfirma-in-der-naehe/bern',
        permanent: true,
      },
      // Genf
      {
        source: '/umzugsfirma-genf',
        destination: '/umzugsfirma-in-der-naehe/genf',
        permanent: true,
      },
      {
        source: '/umzugsfirma-in-der-naehe/umzugsfirma-genf',
        destination: '/umzugsfirma-in-der-naehe/genf',
        permanent: true,
      },
      // Lausanne
      {
        source: '/umzugsfirma-lausanne',
        destination: '/umzugsfirma-in-der-naehe/lausanne',
        permanent: true,
      },
      {
        source: '/umzugsfirma-in-der-naehe/umzugsfirma-lausanne',
        destination: '/umzugsfirma-in-der-naehe/lausanne',
        permanent: true,
      },
      // Luzern
      {
        source: '/umzugsfirma-luzern',
        destination: '/umzugsfirma-in-der-naehe/luzern',
        permanent: true,
      },
      {
        source: '/umzugsfirma-in-der-naehe/umzugsfirma-luzern',
        destination: '/umzugsfirma-in-der-naehe/luzern',
        permanent: true,
      },
      // St. Gallen
      {
        source: '/umzugsfirma-st-gallen',
        destination: '/umzugsfirma-in-der-naehe/st-gallen',
        permanent: true,
      },
      {
        source: '/umzugsfirma-in-der-naehe/umzugsfirma-st-gallen',
        destination: '/umzugsfirma-in-der-naehe/st-gallen',
        permanent: true,
      },
      // Thun
      {
        source: '/umzugsfirma-thun',
        destination: '/umzugsfirma-in-der-naehe/thun',
        permanent: true,
      },
      {
        source: '/umzugsfirma-in-der-naehe/umzugsfirma-thun',
        destination: '/umzugsfirma-in-der-naehe/thun',
        permanent: true,
      },
      // Biel/Bienne
      {
        source: '/umzugsfirma-biel-bienne',
        destination: '/umzugsfirma-in-der-naehe/biel-bienne',
        permanent: true,
      },
      {
        source: '/umzugsfirma-in-der-naehe/umzugsfirma-biel-bienne',
        destination: '/umzugsfirma-in-der-naehe/biel-bienne',
        permanent: true,
      },
      // Lugano
      {
        source: '/umzugsfirma-lugano',
        destination: '/umzugsfirma-in-der-naehe/lugano',
        permanent: true,
      },
      {
        source: '/umzugsfirma-in-der-naehe/umzugsfirma-lugano',
        destination: '/umzugsfirma-in-der-naehe/lugano',
        permanent: true,
      },
      // Aargau
      {
        source: '/umzugsfirma-aargau',
        destination: '/umzugsfirma-in-der-naehe/aargau',
        permanent: true,
      },
      {
        source: '/umzugsfirma-aargau/:city*',
        destination: '/umzugsfirma-in-der-naehe/aargau/:city*',
        permanent: true,
      },
      {
        source: '/umzugsfirma-in-der-naehe/umzugsfirma-aargau',
        destination: '/umzugsfirma-in-der-naehe/aargau',
        permanent: true,
      },
      {
        source: '/umzugsfirma-in-der-naehe/umzugsfirma-aargau/:city*',
        destination: '/umzugsfirma-in-der-naehe/aargau/:city*',
        permanent: true,
      },
      // Malerfirma kanton sayfaları → yeni URL yapısına
      {
        source: '/malerfirma-zuerich',
        destination: '/malerfirma-in-der-naehe/zuerich',
        permanent: true,
      },
      {
        source: '/malerfirma-basel',
        destination: '/malerfirma-in-der-naehe/basel',
        permanent: true,
      },
      {
        source: '/malerfirma-bern',
        destination: '/malerfirma-in-der-naehe/bern',
        permanent: true,
      },
      {
        source: '/malerfirma-winterthur',
        destination: '/malerfirma-in-der-naehe/winterthur',
        permanent: true,
      },
      {
        source: '/malerfirma-luzern',
        destination: '/malerfirma-in-der-naehe/luzern',
        permanent: true,
      },
      {
        source: '/malerfirma-st-gallen',
        destination: '/malerfirma-in-der-naehe/st-gallen',
        permanent: true,
      },
      {
        source: '/malerfirma-genf',
        destination: '/malerfirma-in-der-naehe/genf',
        permanent: true,
      },
      {
        source: '/malerfirma-lausanne',
        destination: '/malerfirma-in-der-naehe/lausanne',
        permanent: true,
      },
      // Malerfirma → Malerfirma in der Nähe (konsolidieren)
      {
        source: '/malerfirma',
        destination: '/malerfirma-in-der-naehe',
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
      // Şehir bazlı sayfa
      {
        source: '/umzugsofferten-zuerich',
        destination: '/umzugsfirma-in-der-naehe/zuerich/umzugsofferten-zuerich',
        permanent: true,
      },
      // Reinigungsfirma sayfaları → yeni URL yapısına
      {
        source: '/reinigungsfirma-zuerich',
        destination: '/reinigungsfirma-in-der-naehe/zuerich',
        permanent: true,
      },
      {
        source: '/reinigungsfirma-basel',
        destination: '/reinigungsfirma-in-der-naehe/basel',
        permanent: true,
      },
      {
        source: '/reinigungsfirma-bern',
        destination: '/reinigungsfirma-in-der-naehe/bern',
        permanent: true,
      },
      {
        source: '/reinigungsfirma-genf',
        destination: '/reinigungsfirma-in-der-naehe/genf',
        permanent: true,
      },
      {
        source: '/reinigungsfirma-lausanne',
        destination: '/reinigungsfirma-in-der-naehe/lausanne',
        permanent: true,
      },
      {
        source: '/reinigungsfirma-luzern',
        destination: '/reinigungsfirma-in-der-naehe/luzern',
        permanent: true,
      },
      {
        source: '/reinigungsfirma-st-gallen',
        destination: '/reinigungsfirma-in-der-naehe/st-gallen',
        permanent: true,
      },
      {
        source: '/reinigungsfirma-winterthur',
        destination: '/reinigungsfirma-in-der-naehe/winterthur',
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

