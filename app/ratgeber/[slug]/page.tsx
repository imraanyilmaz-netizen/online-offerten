import type { Metadata } from 'next'
import { Suspense } from 'react'
import PostPageClient from '@/components/pages/tools/PostPageClient'
import { createClient } from '@/lib/supabase/server'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = await createClient()
  
  // Fetch post data for metadata - including meta_title, published_at, updated_at
  const { data: post, error } = await supabase
    .from('posts')
    .select('title, meta_title, meta_description, featured_image_url, category, published_at, updated_at, created_at')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single()

  // Default values
  let title = 'Ratgeber - Tipps & Ratgeber'
  let description = 'Praktische Tipps und Expertenwissen für Umzug, Reinigung & mehr.'
  let ogImage = 'https://online-offerten.ch/image/online-offerten.webp'
  let publishedTime: string | undefined
  let modifiedTime: string | undefined

  if (post && !error) {
    // PRIORITY 1: Use meta_title if available (from admin panel)
    if (post.meta_title && post.meta_title.trim()) {
      title = post.meta_title.trim()
    } else {
      // Fallback: Use post title directly (no suffix, no template)
      title = post.title || 'Ratgeber - Tipps & Ratgeber'
    }
    
    // Use meta_description if available, otherwise generate from title
    description = post.meta_description || `Praktische Tipps und Expertenwissen zu ${post.title || 'Ratgeber'}. Lesen Sie unseren Ratgeber auf Online-Offerten.ch.`
    
    // Use featured image if available
    if (post.featured_image_url) {
      ogImage = post.featured_image_url
    }
    
    // Set published and modified times for Article metadata
    publishedTime = post.published_at || post.created_at
    modifiedTime = post.updated_at || publishedTime
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
      publishedTime: publishedTime,
      modifiedTime: modifiedTime,
      authors: ['Online-Offerten.ch'],
      section: post?.category || undefined,
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

export default async function RatgeberPostPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()
  
  // Fetch post data for schema
  const { data: post } = await supabase
    .from('posts')
    .select('title, meta_title, meta_description, featured_image_url, category, published_at, updated_at, created_at, faq, faq_title, faq_description, custom_html')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single()

  // Prepare schema data
  const postTitle = post?.meta_title || post?.title || 'Ratgeber'
  const postDescription = post?.meta_description || `Praktische Tipps und Expertenwissen zu ${post?.title || 'Ratgeber'}.`
  const postImage = post?.featured_image_url || 'https://online-offerten.ch/image/online-offerten.webp'
  const publishedTime = post?.published_at || post?.created_at
  const modifiedTime = post?.updated_at || publishedTime
  const canonicalUrl = `https://online-offerten.ch/ratgeber/${params.slug}`

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": postTitle,
    "description": postDescription,
    "image": postImage,
    "datePublished": publishedTime,
    "dateModified": modifiedTime,
    "author": {
      "@type": "Organization",
      "name": "Online-Offerten.ch"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Online-Offerten.ch",
      "logo": {
        "@type": "ImageObject",
        "url": "https://online-offerten.ch/image/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  }

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Startseite",
        "item": "https://online-offerten.ch/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Ratgeber",
        "item": "https://online-offerten.ch/ratgeber"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post?.title || "Ratgeber-Artikel",
        "item": canonicalUrl
      }
    ]
  }

  // FAQPage Schema (only if FAQs exist)
  const faqSchema = post?.faq && Array.isArray(post.faq) && post.faq.length > 0 && post.faq.some((faq: { question?: string; answer?: string }) => faq.question?.trim() && faq.answer?.trim()) ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faq
      .filter((faq: { question?: string; answer?: string }) => faq.question?.trim() && faq.answer?.trim())
      .map((faq: { question: string; answer: string }) => ({
        "@type": "Question",
        "name": faq.question.trim(),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer.trim()
        }
      }))
  } : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>}>
      <PostPageClient />
    </Suspense>
    </>
  )
}

