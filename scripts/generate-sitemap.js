import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicPath = path.join(rootDir, 'public');
const appPath = path.join(rootDir, 'app');

const BASE_URL = 'https://online-offerten.ch';

// Use hardcoded values (same as in customSupabaseClient.js)
// Environment variables may contain invalid keys, so we use the working hardcoded values
const supabaseUrl = 'https://uhkiaodpzvhsuqfrwgih.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoa2lhb2RwenZoc3VxZnJ3Z2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NzY4NDAsImV4cCI6MjA2NTE1Mjg0MH0.PI2YNNYtcUgQYooV-6z2P6qK-1tIQF8DL7oILhfHmDg';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is not defined.");
  process.exit(1); // Exit script with an error code
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});

async function fetchDynamicRoutes() {
  // Fetch published blog posts
  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select('slug, updated_at')
    .eq('status', 'published');
  if (postsError) {
    console.error('Error fetching posts:', postsError.message);
  } else {
    console.log(`✅ Fetched ${posts?.length || 0} blog posts`);
  }

  // Fetch active partners
  // Try both status and is_active fields to be compatible
  const { data: partners, error: partnersError } = await supabase
    .from('partners')
    .select('slug, updated_at')
    .or('status.eq.active,is_active.eq.true')
    .not('slug', 'is', null);
  
  if (partnersError) {
    console.error('❌ Error fetching partners:', partnersError.message);
    console.error('   This will prevent partner profile pages from being added to sitemap.');
    console.error('   Please check your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env file.');
  } else {
    console.log(`✅ Fetched ${partners?.length || 0} active partners`);
  }

  return { posts: posts || [], partners: partners || [] };
}

function createUrlEntry(url, lastmod, changefreq = 'daily', priority = '0.8') {
  return `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date(lastmod).toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

// Get all static routes from app directory
function getStaticRoutes() {
  const routes = [];
  
  // Check if homepage (app/page.tsx) exists
  const homepageFile = path.join(appPath, 'page.tsx');
  const homepageFileJsx = path.join(appPath, 'page.jsx');
  if (fs.existsSync(homepageFile) || fs.existsSync(homepageFileJsx)) {
    routes.push('/');
  }
  
  // Recursively scan app directory for page.tsx files
  function scanDirectory(dir, basePath = '') {
    if (!fs.existsSync(dir)) {
      return;
    }
    
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      const routePath = basePath ? `${basePath}/${item.name}` : `/${item.name}`;
      
      if (item.isDirectory()) {
        // Skip dynamic routes (contain [ or (...))
        if (item.name.startsWith('[') || item.name.startsWith('(')) {
          continue;
        }
        
        // Check if this directory has a page.tsx or page.jsx
        const pageFile = path.join(fullPath, 'page.tsx');
        const pageFileJsx = path.join(fullPath, 'page.jsx');
        
        if (fs.existsSync(pageFile) || fs.existsSync(pageFileJsx)) {
          routes.push(routePath);
        }
        
        // Recursively scan subdirectories
        scanDirectory(fullPath, routePath);
      }
    }
  }
  
  scanDirectory(appPath);
  return routes;
}

async function generateSitemap() {
  const { posts, partners } = await fetchDynamicRoutes();
  const today = new Date().toISOString();

  // Service pages that should have higher priority
  const servicePages = [
    '/umzugsfirma/privatumzug', '/umzugsfirma/geschaeftsumzug', '/umzugsfirma/umzugshilfe', '/umzugsfirma/internationale-umzuege', '/umzugsfirma/spezialtransporte', 
    '/umzugsfirma/spezialtransporte/klaviertransport', '/umzugsfirma/spezialtransporte/klaviertransport/kosten', '/umzugsfirma/checklists', '/reinigung', '/reinigung/wohnungsreinigung', '/reinigung/hausreinigung', 
    '/reinigung/bueroreinigung', '/reinigung/umzugsreinigung', '/reinigung/unterhaltsreinigung', '/reinigung/grundreinigung', 
    '/reinigung/baureinigung', '/reinigung/fensterreinigung', '/reinigung/bodenreinigung', '/reinigung/fassadenreinigung', 
    '/reinigung/hofreinigung', '/raeumung-entsorgung', '/malerarbeitenkosten',
    '/umzugsfirma', '/umzugsfirma', '/umzugsfirma-vergleichen', '/malerfirma'
  ];

  // Location pages (umzugsfirma-* pages) - New structure under /umzugsfirma
  const locationPagePrefixes = [
    '/umzugsfirma/aargau',
    '/umzugsfirma/basel',
    '/umzugsfirma/bern',
    '/umzugsfirma/biel-bienne',
    '/umzugsfirma/genf',
    '/umzugsfirma/lausanne',
    '/umzugsfirma/lugano',
    '/umzugsfirma/luzern',
    '/umzugsfirma/st-gallen',
    '/umzugsfirma/thun',
    '/umzugsfirma/zuerich'
  ];

  // Aargau city pages (dynamic routes) - New structure
  const aargauCityPages = [
    '/umzugsfirma/aargau/aarau',
    '/umzugsfirma/aargau/baden',
    '/umzugsfirma/aargau/zofingen',
    '/umzugsfirma/aargau/brugg',
    '/umzugsfirma/aargau/wettingen'
  ];

  // Zürich city pages (dynamic routes)
  const zurichCityPages = [
    '/umzugsfirma/zuerich/winterthur',
    '/umzugsfirma/zuerich/uster',
    '/umzugsfirma/zuerich/dietikon',
    '/umzugsfirma/zuerich/duebendorf',
    '/umzugsfirma/zuerich/schlieren'
  ];

  // Cost pages
  const costPages = [
    '/umzugsfirma/umzugskosten', '/umzugsofferten', '/guenstig-umziehen',
    '/umzugsfirma/zuerich/umzugsofferten-zuerich',
    '/umzugskosten-aargau', '/reinigung/reinigungskosten'
  ];

  // Reinigungsfirma location pages (reinigungsfirma-* pages) - New structure
  const reinigungsfirmaLocationPages = [
    '/reinigungsfirma/zuerich', '/reinigungsfirma/basel', '/reinigungsfirma/bern',
    '/reinigungsfirma/genf', '/reinigungsfirma/lausanne', '/reinigungsfirma/luzern',
    '/reinigungsfirma/st-gallen', '/reinigungsfirma/winterthur'
  ];

  // Malerfirma location pages (malerfirma/* pages)
  const malerfirmaLocationPages = [
    '/malerfirma/zuerich', '/malerfirma/basel', '/malerfirma/bern',
    '/malerfirma/genf', '/malerfirma/lausanne', '/malerfirma/luzern',
    '/malerfirma/st-gallen', '/malerfirma/winterthur'
  ];

  // Private and admin routes that should NOT be in sitemap
  // Also exclude old URLs that have 301 redirects to new URLs
  const excludedRoutes = [
    '/forgot-password',
    '/update-password',
    '/admin-dashboard',
    '/partner/dashboard',
    '/partner/einstellungen',
    '/partner/credit-top-up',
    '/partner/guthaben-aufladen', // Legacy route (kept for compatibility)
    '/partner/payment-status',
    '/payment/success',
    '/payment/cancel',
    '/login',
    '/anfrage-status', // Private route
    '/bewertung', // Private route
    '/post', // Internal route
    '/email-confirmed', // Email confirmation page (noindex, nofollow)
    // Old URLs with 301 redirects - should not be in sitemap
    '/baureinigung', // → /reinigung/baureinigung
    '/bodenreinigung', // → /reinigung/bodenreinigung
    '/bueroreinigung', // → /reinigung/bueroreinigung
    '/fassadenreinigung', // → /reinigung/fassadenreinigung
    '/fensterreinigung', // → /reinigung/fensterreinigung
    '/grundreinigung', // → /reinigung/grundreinigung
    '/hausreinigung', // → /reinigung/hausreinigung
    '/hofreinigung', // → /reinigung/hofreinigung
    '/umzugsreinigung', // → /reinigung/umzugsreinigung
    '/unterhaltsreinigung', // → /reinigung/unterhaltsreinigung
    '/wohnungsreinigung', // → /reinigung/wohnungsreinigung
    '/reinigungskosten', // → /reinigung/reinigungskosten
    '/free-quote-request', // Noindex page (robots: { index: false })
    '/services', // Gelöscht → Redirect auf /
    // Old Klaviertransport URLs with 301 redirects - should not be in sitemap
    '/klaviertransport', // → /umzugsfirma/spezialtransporte/klaviertransport
    '/klaviertransport/kosten', // → /umzugsfirma/spezialtransporte/klaviertransport/kosten
    '/umzugsfirma/klaviertransport', // → /umzugsfirma/spezialtransporte/klaviertransport
    '/umzugsfirma/klaviertransport/kosten', // → /umzugsfirma/spezialtransporte/klaviertransport/kosten
  ];

  // Get all static routes from app directory
  const allStaticRoutes = getStaticRoutes();
  console.log(`✅ Found ${allStaticRoutes.length} static routes in app directory`);

  // 1. Static pages from app directory
  const staticPages = allStaticRoutes
    .filter(route => {
      // Exclude dynamic routes (already filtered in getStaticRoutes, but double-check)
      if (route.includes('[') || route.includes('(')) {
        return false;
      }
      // Exclude private routes
      if (excludedRoutes.includes(route)) {
        return false;
      }
      // Exclude location pages (handled separately)
      if (locationPagePrefixes.some(prefix => route.startsWith(prefix))) {
        return false;
      }
      // Exclude Aargau city pages (handled separately)
      if (aargauCityPages.includes(route)) {
        return false;
      }
      // Exclude Zürich city pages (handled separately)
      if (zurichCityPages.includes(route)) {
        return false;
      }
      // Exclude cost pages (handled separately)
      if (costPages.includes(route)) {
        return false;
      }
      // Exclude reinigungsfirma location pages (handled separately)
      if (reinigungsfirmaLocationPages.some(prefix => route.startsWith(prefix))) {
        return false;
      }
      // Exclude malerfirma location pages (handled separately)
      if (malerfirmaLocationPages.some(prefix => route.startsWith(prefix))) {
        return false;
      }
      return true;
    })
    .map(route => {
      // Higher priority for service pages
      const isServicePage = servicePages.includes(route);
      const priority = route === '/' ? '1.0' : (isServicePage ? '0.9' : '0.7');
      const changefreq = route === '/' ? 'daily' : (isServicePage ? 'weekly' : 'monthly');
      return createUrlEntry(`${BASE_URL}${route}`, today, changefreq, priority);
    });

  // 2. Location pages (umzugsfirma-* pages)
  // Location pages are important for SEO, so we use weekly changefreq and 0.9 priority
  // Pillar page (Aargau) gets priority 1.0 per plan
  const locationPages = locationPagePrefixes
    .filter(route => allStaticRoutes.includes(route))
    .map(route => {
      if (route === '/umzugsfirma/aargau') {
        return createUrlEntry(`${BASE_URL}${route}`, today, 'weekly', '1.0');
      }
      const priority = route === '/standorte' ? '0.95' : '0.9';
      return createUrlEntry(`${BASE_URL}${route}`, today, 'weekly', priority);
  });

  // 3. Aargau city pages (dynamic routes)
  // City pages are important for SEO, so we use weekly changefreq and 0.8 priority
  const aargauCityPagesEntries = aargauCityPages
    .map(route => createUrlEntry(`${BASE_URL}${route}`, today, 'weekly', '0.8'));

  // 3b. Zürich city pages (dynamic routes)
  // City pages are important for SEO, so we use weekly changefreq and 0.8 priority
  const zurichCityPagesEntries = zurichCityPages
    .map(route => createUrlEntry(`${BASE_URL}${route}`, today, 'weekly', '0.8'));

  // 4. Cost pages
  // Cost pages are important for SEO, so we use weekly changefreq and 0.9 priority
  const costPagesEntries = costPages
    .map(route => createUrlEntry(`${BASE_URL}${route}`, today, 'weekly', '0.9'));

  // 5. Reinigungsfirma location pages (reinigungsfirma-* pages)
  // These are important for SEO, so we use weekly changefreq and 0.9 priority
  const reinigungsfirmaPages = reinigungsfirmaLocationPages
    .filter(route => allStaticRoutes.includes(route))
    .map(route => createUrlEntry(`${BASE_URL}${route}`, today, 'weekly', '0.9'));

  // 6. Malerfirma location pages (malerfirma-* pages)
  // These are important for SEO, so we use weekly changefreq and 0.9 priority
  const malerfirmaPages = malerfirmaLocationPages
    .filter(route => allStaticRoutes.includes(route))
    .map(route => createUrlEntry(`${BASE_URL}${route}`, today, 'weekly', '0.9'));

  // 7. Dynamic blog post pages
  const postPages = posts.map(post => createUrlEntry(`${BASE_URL}/ratgeber/${post.slug}`, post.updated_at, 'weekly', '0.8'));

  // 9. Dynamic partner profile pages
  const partnerPages = partners
    .filter(partner => partner.slug) // Ensure slug exists
    .map(partner => createUrlEntry(`${BASE_URL}/partner/${partner.slug}`, partner.updated_at || today, 'weekly', '0.6'));
  
  if (partnerPages.length > 0) {
    console.log(`✅ Added ${partnerPages.length} partner profile pages to sitemap`);
  } else {
    console.warn('⚠️  No partner profile pages added to sitemap. Check API key and partner data.');
  }

  // Sort staticPages to put homepage first
  const sortedStaticPages = staticPages.sort((a, b) => {
    if (a.includes('<loc>https://online-offerten.ch/</loc>')) return -1;
    if (b.includes('<loc>https://online-offerten.ch/</loc>')) return 1;
    return 0;
  });

  const allUrls = [
    ...sortedStaticPages, // Homepage will be first (priority 1.0)
    ...locationPages,
    ...aargauCityPagesEntries,
    ...zurichCityPagesEntries,
    ...costPagesEntries,
    ...reinigungsfirmaPages,
    ...malerfirmaPages,
    ...postPages,
    ...partnerPages,
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls.join('')}
</urlset>`;

  try {
    fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemap, 'utf8');
    console.log(`✅ sitemap.xml generated successfully with ${allUrls.length} URLs!`);
  } catch (error) {
    console.error('❌ Error generating sitemap.xml:', error);
  }
}

generateSitemap();
