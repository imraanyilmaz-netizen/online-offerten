import type { Metadata } from 'next'
import { Suspense } from 'react'
import PostPageClient from '@/components/pages/tools/PostPageClient'
import { createClient } from '@/lib/supabase/server'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = await createClient()
  
  // Fetch post data for metadata
  const { data: post, error } = await supabase
    .from('posts')
    .select('title, meta_description, featured_image_url, category')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single()

  // Create unique title based on post title
  let title = 'Ratgeber - Tipps & Ratgeber'
  let description = 'Praktische Tipps und Expertenwissen für Umzug, Reinigung & mehr.'
  let ogImage = 'https://online-offerten.ch/image/services-professionals.png'

  if (post && !error) {
    // Create SEO-friendly title: [BLOG KONUSU] - Tipps & Ratgeber
    // Target: 50-60 characters total (template will add "| Online-Offerten.ch")
    // So we have ~27-37 characters for the title prefix
    const baseTitle = post.title || 'Ratgeber'
    const suffix = ' - Tipps & Ratgeber' // 19 characters
    const maxTitleLength = 60 - suffix.length - 23 // ~18 characters for title (23 = "| Online-Offerten.ch")
    
    let titlePrefix = baseTitle
    if (baseTitle.length > maxTitleLength) {
      // Truncate to fit, but try to cut at word boundary
      titlePrefix = baseTitle.substring(0, maxTitleLength - 3).trim()
      const lastSpace = titlePrefix.lastIndexOf(' ')
      if (lastSpace > maxTitleLength - 10) {
        titlePrefix = titlePrefix.substring(0, lastSpace)
      }
      titlePrefix += '...'
    }
    
    title = `${titlePrefix}${suffix}`
    
    // Ensure title doesn't exceed 60 characters (before template adds "| Online-Offerten.ch")
    if (title.length > 37) {
      title = title.substring(0, 34) + '...'
    }
    
    // Use meta_description if available, otherwise use a default
    description = post.meta_description || `Praktische Tipps und Expertenwissen zu ${baseTitle}. Lesen Sie unseren Ratgeber auf Online-Offerten.ch.`
    
    // Use featured image if available
    if (post.featured_image_url) {
      ogImage = post.featured_image_url
    }
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://online-offerten.ch/ratgeber/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://online-offerten.ch/ratgeber/${params.slug}`,
      siteName: 'Online-Offerten.ch',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'de_CH',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
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
}

export default function RatgeberPostPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>}>
      <PostPageClient />
    </Suspense>
  )
}

