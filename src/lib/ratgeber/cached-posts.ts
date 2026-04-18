import { unstable_cache } from 'next/cache'
import { createStaticClient } from '@/src/lib/supabase/server'

const RATGEBER_TAG = 'ratgeber-posts'

export const getCachedPublishedPostForMeta = unstable_cache(
  async (slug: string) => {
    const supabase = createStaticClient()
    return supabase
      .from('posts')
      .select(
        'title, meta_title, meta_description, featured_image_url, category, published_at, updated_at, created_at'
      )
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
  },
  ['ratgeber-post-meta'],
  { revalidate: 60, tags: [RATGEBER_TAG] }
)

export const getCachedPublishedPostFull = unstable_cache(
  async (slug: string) => {
    const supabase = createStaticClient()
    const { data } = await supabase
      .from('posts')
      .select('*, meta_title, faq, faq_title, faq_description, custom_html')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    return data
  },
  ['ratgeber-post-full'],
  { revalidate: 60, tags: [RATGEBER_TAG] }
)

export const getCachedRecentPostsExcluding = unstable_cache(
  async (excludeSlug: string) => {
    const supabase = createStaticClient()
    const { data } = await supabase
      .from('posts')
      .select('title, slug, featured_image_url')
      .eq('status', 'published')
      .neq('slug', excludeSlug)
      .order('published_at', { ascending: false })
      .limit(5)
    return data ?? []
  },
  ['ratgeber-recent'],
  { revalidate: 60, tags: [RATGEBER_TAG] }
)

/** `tagKey` / `categoryKey` empty = no filter (arguments participate in cache identity). */
export const getCachedRatgeberPostList = unstable_cache(
  async (tagKey: string, categoryKey: string) => {
    const supabase = createStaticClient()
    const tagFilter = tagKey.trim().toLowerCase() || null
    const categoryFilter = categoryKey.trim() || null
    let query = supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (tagFilter) {
      query = query.contains('tags', [tagFilter])
    }
    if (categoryFilter) {
      query = query.eq('category', categoryFilter)
    }

    const { data } = await query
    return data ?? []
  },
  ['ratgeber-list'],
  { revalidate: 60, tags: [RATGEBER_TAG] }
)
