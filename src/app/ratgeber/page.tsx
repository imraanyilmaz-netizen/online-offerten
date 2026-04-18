import type { Metadata } from 'next'
import { RatgeberIndexHero } from '@/components/pages/ratgeber/RatgeberIndexHero'
import { RatgeberIndexSidebar } from '@/components/pages/ratgeber/RatgeberIndexSidebar'
import RatgeberPostGrid from '@/components/pages/ratgeber/RatgeberPostGrid'
import { getCachedRatgeberPostList } from '@/lib/ratgeber/cached-posts'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Ratgeber & Tipps für Umzug, Reinigung & Maler',
  description:
    'Expertenwissen und praktische Tipps für Ihren Umzug, die Endreinigung und Malerarbeiten. Machen Sie Ihren Übergang einfacher mit unserem Ratgeber.',
  alternates: {
    canonical: 'https://online-offerten.ch/ratgeber',
  },
  openGraph: {
    title: 'Ratgeber & Tipps für Umzug, Reinigung & Maler',
    description:
      'Expertenwissen und praktische Tipps für Ihren Umzug, die Endreinigung und Malerarbeiten. Machen Sie Ihren Übergang einfacher mit unserem Ratgeber.',
    url: 'https://online-offerten.ch/ratgeber',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/online-offerten.webp',
        width: 1200,
        height: 630,
        alt: 'Ratgeber & Tipps',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ratgeber & Tipps für Umzug, Reinigung & Maler',
    description:
      'Expertenwissen und praktische Tipps für Ihren Umzug, die Endreinigung und Malerarbeiten.',
    images: ['https://online-offerten.ch/image/online-offerten.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

type RatgeberPageProps = {
  searchParams: Promise<{
    tag?: string | string[]
    category?: string | string[]
  }>
}

function collectCategories(posts: { category?: string | null }[]) {
  const set = new Set<string>()
  for (const p of posts) {
    const c = p?.category
    if (typeof c === 'string' && c.trim()) set.add(c.trim())
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, 'de'))
}

function collectThemeTags(posts: { tags?: unknown }[], limit = 18) {
  const map = new Map<string, number>()
  for (const p of posts) {
    const tags = Array.isArray(p.tags) ? p.tags : []
    for (const t of tags) {
      if (typeof t !== 'string' || !t.trim()) continue
      const k = t.trim().toLowerCase()
      map.set(k, (map.get(k) ?? 0) + 1)
    }
  }
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag, count]) => ({ tag, count }))
}

export default async function RatgeberPage({ searchParams }: RatgeberPageProps) {
  const params = await searchParams
  const tagParam = Array.isArray(params.tag) ? params.tag[0] : params.tag
  const categoryParam = Array.isArray(params.category) ? params.category[0] : params.category
  const tagFilter = tagParam?.trim().toLowerCase() ?? ''
  const categoryFilter = categoryParam?.trim() ?? ''

  const [posts, allForNav] = await Promise.all([
    getCachedRatgeberPostList(tagFilter, categoryFilter),
    getCachedRatgeberPostList('', ''),
  ])

  const recentPosts = allForNav.slice(0, 5)
  const categories = collectCategories(allForNav)
  const themeTags = collectThemeTags(allForNav)

  const filterKey = `${tagFilter}|${categoryFilter}`

  return (
    <div className="min-h-screen bg-[#f6f7f9] dark:bg-background">
      <RatgeberIndexHero
        articleCount={posts.length}
        categoryCount={categories.length}
        tagCount={themeTags.length}
        activeTag={tagFilter}
        activeCategory={categoryFilter}
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:pt-16">
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent dark:via-border" aria-hidden />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <main className="lg:col-span-8">
            <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-foreground sm:text-2xl">
                  Artikel
                </h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-muted-foreground">
                  Kuratierte Beiträge — wählen Sie rechts Kategorie oder Schlagwort.
                </p>
              </div>
            </div>
            <RatgeberPostGrid key={filterKey} posts={posts} />
          </main>

          <div className="lg:col-span-4">
            <RatgeberIndexSidebar
              recentPosts={recentPosts}
              categories={categories}
              themeTags={themeTags}
              activeTag={tagFilter}
              activeCategory={categoryFilter}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
