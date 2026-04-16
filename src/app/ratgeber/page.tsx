import type { Metadata } from 'next'
import RatgeberLoadMore from '@/components/pages/tools/RatgeberLoadMore'
import RatgeberSidebar from '@/src/components/tools/RatgeberSidebar'
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
  }>
}

export default async function RatgeberPage({ searchParams }: RatgeberPageProps) {
  const params = await searchParams
  const tagParam = Array.isArray(params.tag) ? params.tag[0] : params.tag
  const tagFilter = tagParam?.trim().toLowerCase() ?? ''
  const posts = await getCachedRatgeberPostList(tagFilter)
  const recentPosts = posts.slice(0, 5)

  return (
    <div className="bg-gray-50/70 dark:bg-muted/25">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-[36px] font-extrabold text-gray-900 dark:text-foreground mb-4 leading-tight">
            Unser Ratgeber
          </h1>
          <p className="text-lg text-gray-600 dark:text-muted-foreground max-w-3xl mx-auto">
            Hier finden Sie nützliche Artikel, Tipps und Checklisten rund um Umzug, Reinigung und weitere
            Dienstleistungen, um Ihnen die Planung zu erleichtern.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <main className="lg:col-span-8">
            <RatgeberLoadMore key={tagFilter || 'all'} posts={posts} />
          </main>

          <aside className="lg:col-span-4">
            <RatgeberSidebar recentPosts={recentPosts} />
          </aside>
        </div>
      </div>
    </div>
  )
}
