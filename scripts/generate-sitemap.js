import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { routePaths } from '../src/routePaths.js';
// Import locationRoutes from .js file (not .jsx) for Node.js compatibility
import { locationRoutes } from '../src/locationRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicPath = path.join(rootDir, 'public');

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

async function generateSitemap() {
  const { posts, partners } = await fetchDynamicRoutes();
  const today = new Date().toISOString();

  // Service pages that should have higher priority
  const servicePages = [
    '/privatumzug', '/geschaeftsumzug', '/internationale-umzuege', '/spezialtransporte', 
    '/klaviertransport', '/reinigung', '/wohnungsreinigung', '/hausreinigung', 
    '/bueroreinigung', '/umzugsreinigung', '/unterhaltsreinigung', '/grundreinigung', 
    '/baureinigung', '/fensterreinigung', '/bodenreinigung', '/fassadenreinigung', 
    '/hofreinigung', '/raeumung-entsorgung', '/malerarbeiten', '/gartenarbeiten'
  ];

  // Private and admin routes that should NOT be in sitemap
  const excludedRoutes = [
    '/forgot-password',
    '/update-password',
    '/admin-dashboard',
    '/partner/dashboard',
    '/partner/settings',
    '/partner/guthaben-aufladen',
    '/payment/success',
    '/payment/cancel',
    '/login', // Login page should also be excluded
  ];

  // 1. Static pages from routePaths.js
  const staticPages = routePaths
    .filter(route => 
      !route.path.includes(':') && 
      !route.path.includes('*') && 
      !locationRoutes.some(lr => lr.path === route.path.replace('/','')) &&
      !excludedRoutes.includes(route.path) &&
      !route.private // Exclude all private routes
    )
    .map(route => {
      // Higher priority for service pages
      const isServicePage = servicePages.includes(route.path);
      const priority = route.path === '/' ? '1.0' : (isServicePage ? '0.9' : '0.7');
      const changefreq = isServicePage ? 'weekly' : 'monthly';
      return createUrlEntry(`${BASE_URL}${route.path}`, today, changefreq, priority);
    });

  // 2. Location pages from locationRoutes.js
  // Location pages are important for SEO, so we use weekly changefreq and 0.9 priority
  const locationPages = locationRoutes.map(route => {
    // Standorte page gets slightly higher priority
    const priority = route.path === 'standorte' ? '0.95' : '0.9';
    return createUrlEntry(`${BASE_URL}/${route.path}`, today, 'weekly', priority);
  });

  // 3. Dynamic blog post pages
  const postPages = posts.map(post => createUrlEntry(`${BASE_URL}/ratgeber/${post.slug}`, post.updated_at, 'weekly', '0.8'));

  // 4. Dynamic partner profile pages
  const partnerPages = partners
    .filter(partner => partner.slug) // Ensure slug exists
    .map(partner => createUrlEntry(`${BASE_URL}/partner/${partner.slug}`, partner.updated_at || today, 'weekly', '0.6'));
  
  if (partnerPages.length > 0) {
    console.log(`✅ Added ${partnerPages.length} partner profile pages to sitemap`);
  } else {
    console.warn('⚠️  No partner profile pages added to sitemap. Check API key and partner data.');
  }

  const allUrls = [
    ...staticPages,
    ...locationPages,
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