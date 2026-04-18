import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import TiptapRenderer from '@/components/AdminPanel/BlogManagement/TiptapRenderer.jsx'
import PostSidebar from '@/components/tools/PostSidebar'
import PostMobileToc from '@/components/pages/tools/PostMobileToc'
import PostFaqSection from '@/components/pages/tools/PostFaqSection'
import type { TocItem } from '@/lib/ratgeber/toc'
import { RatgeberPostHero } from '@/components/pages/ratgeber/RatgeberPostHero'

const ratgeberBasePath = '/ratgeber'

type RecentPost = {
  title?: string | null
  slug?: string | null
  featured_image_url?: string | null
}

type PostRecord = {
  title?: string | null
  meta_title?: string | null
  meta_description?: string | null
  featured_image_url?: string | null
  category?: string | null
  created_at?: string | null
  published_at?: string | null
  content?: unknown
  faq?: Array<{ question?: string; answer?: string }>
  faq_title?: string | null
  faq_description?: string | null
  tags?: string[]
}

type Props = {
  post: PostRecord
  recentPosts: RecentPost[]
  tableOfContents: TocItem[]
}

export default function PostArticle({ post, recentPosts, tableOfContents }: Props) {
  const title =
    post.title && post.title.trim()
      ? post.title.trim()
      : post.meta_title && post.meta_title.trim()
        ? post.meta_title.trim()
        : 'Ratgeber'

  return (
    <div className="min-h-screen bg-[#f6f7f9] dark:bg-background">
      <RatgeberPostHero
        title={title}
        category={post.category}
        publishedAt={post.published_at}
        createdAt={post.created_at}
        metaDescription={post.meta_description}
        featuredImageUrl={post.featured_image_url}
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:pt-10">
        <div
          className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent sm:inset-x-6 dark:via-border"
          aria-hidden
        />

        <PostMobileToc tableOfContents={tableOfContents} />

        <div className="mt-8 grid grid-cols-1 gap-12 lg:mt-10 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <main className="min-w-0 lg:col-span-8">
            <article className="overflow-visible rounded-2xl border border-slate-200/80 bg-white/95 px-5 py-8 shadow-[0_2px_28px_-12px_rgba(15,23,42,0.1)] ring-1 ring-slate-900/[0.04] sm:px-8 sm:py-10 dark:border-border dark:bg-card/95 dark:ring-white/[0.05]">
              <div className="article-content min-w-0 max-w-none [&_h2.heading-2]:scroll-mt-28 [&_h2.heading-2]:text-slate-900 dark:[&_h2.heading-2]:text-foreground">
                <TiptapRenderer jsonContent={post.content} />
              </div>

              {post.faq && Array.isArray(post.faq) ? (
                <PostFaqSection faq={post.faq} faq_title={post.faq_title} faq_description={post.faq_description} />
              ) : null}

              <div className="mt-10 border-t border-slate-100 pt-8 dark:border-border">
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-slate-200/90 bg-white px-6 font-semibold text-slate-800 shadow-sm hover:border-emerald-300 hover:bg-emerald-50/80 hover:text-emerald-900 dark:border-border dark:bg-card dark:text-foreground dark:hover:border-emerald-800/60 dark:hover:bg-emerald-950/30"
                >
                  <Link href={ratgeberBasePath}>
                    <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
                    Zurück zum Ratgeber
                  </Link>
                </Button>
              </div>
            </article>
          </main>

          <div className="min-w-0 lg:col-span-4">
            <PostSidebar
              category={post.category}
              tags={post.tags}
              recentPosts={recentPosts}
              ratgeberBasePath={ratgeberBasePath}
              tableOfContents={tableOfContents}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
