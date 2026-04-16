import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calendar, Folder, Home, ChevronRight, ArrowLeft } from 'lucide-react'
import TiptapRenderer from '@/components/AdminPanel/BlogManagement/TiptapRenderer.jsx'
import ImageWithFallback from '@/components/ui/ImageWithFallback'
import PostSidebar from '@/src/components/tools/PostSidebar'
import PostMobileToc from '@/components/pages/tools/PostMobileToc'
import PostFaqSection from '@/components/pages/tools/PostFaqSection'
import type { TocItem } from '@/lib/ratgeber/toc'

const ratgeberBasePath = '/ratgeber'

type RecentPost = {
  title?: string | null
  slug?: string | null
  featured_image_url?: string | null
}

type PostRecord = {
  title?: string | null
  meta_title?: string | null
  featured_image_url?: string | null
  category?: string | null
  created_at?: string | null
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
  const heading =
    post.meta_title && post.meta_title.trim()
      ? post.meta_title.trim()
      : post.title ?? ''

  const h1Text =
    post.title && post.title.trim()
      ? post.title.trim()
      : post.meta_title && post.meta_title.trim()
        ? post.meta_title.trim()
        : ''

  return (
    <>
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12 overflow-x-visible">
        <nav className="flex items-center text-sm text-gray-500 dark:text-muted-foreground mb-8">
          <Link href="/" className="hover:text-green-600 dark:hover:text-primary flex items-center">
            <Home className="h-4 w-4 mr-1.5" /> Startseite
          </Link>
          <ChevronRight className="h-4 w-4 mx-1.5 opacity-70" />
          <Link href={ratgeberBasePath} className="hover:text-green-600 dark:hover:text-primary">
            Ratgeber
          </Link>
          <ChevronRight className="h-4 w-4 mx-1.5 opacity-70" />
          <span className="font-medium text-gray-700 dark:text-foreground truncate max-w-[200px] md:max-w-xs">
            {heading}
          </span>
        </nav>

        <PostMobileToc tableOfContents={tableOfContents} />

        <div className="min-w-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <main className="lg:col-span-2 min-w-0 overflow-x-visible">
              <article className="bg-white dark:bg-card border border-transparent dark:border-border p-6 md:p-8 rounded-2xl shadow-lg overflow-visible min-w-0 max-w-full">
                {post.featured_image_url && (
                  <ImageWithFallback
                    src={post.featured_image_url}
                    alt={post.title ?? ''}
                    className="w-full h-auto max-h-[500px] object-cover rounded-xl mb-8 shadow-md"
                    loading="eager"
                    fetchPriority="high"
                  />
                )}
                <h1
                  className="text-[26px] font-extrabold text-gray-900 dark:text-foreground mb-4 leading-normal break-words w-full min-w-0 max-w-none -mx-6 md:-mx-8 px-6 md:px-8"
                  style={{
                    wordBreak: 'break-word',
                    overflowWrap: 'anywhere',
                    width: 'calc(100% + 3rem)',
                    maxWidth: 'none',
                    overflow: 'visible',
                    textOverflow: 'unset',
                    whiteSpace: 'normal',
                  }}
                >
                  {h1Text}
                </h1>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-muted-foreground mb-6 border-b border-border pb-4">
                  {post.category && (
                    <div className="flex items-center">
                      <Folder className="h-4 w-4 mr-1.5" />
                      <span>{post.category}</span>
                    </div>
                  )}
                  {post.created_at && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1.5" />
                      <span>{new Date(post.created_at).toLocaleDateString('de-DE')}</span>
                    </div>
                  )}
                </div>

                <TiptapRenderer jsonContent={post.content} />

                {post.faq && Array.isArray(post.faq) && (
                  <PostFaqSection faq={post.faq} faq_title={post.faq_title} faq_description={post.faq_description} />
                )}

                <Button asChild variant="outline" className="mt-8">
                  <Link href={ratgeberBasePath}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Zurück zur Übersicht
                  </Link>
                </Button>
              </article>
            </main>

            <aside className="lg:col-span-1">
              <PostSidebar
                category={post.category}
                tags={post.tags}
                recentPosts={recentPosts}
                ratgeberBasePath={ratgeberBasePath}
                tableOfContents={tableOfContents}
                hideMobileTOC={true}
              />
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
