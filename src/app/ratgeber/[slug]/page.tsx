import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PostArticle from '@/components/pages/tools/PostArticle'
import {
  getCachedPublishedPostForMeta,
  getCachedPublishedPostFull,
  getCachedRecentPostsExcluding,
} from '@/lib/ratgeber/cached-posts'
import { buildTableOfContentsFromPost } from '@/lib/ratgeber/toc'

export const revalidate = 60

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const params = await props.params
  const { data: post, error } = await getCachedPublishedPostForMeta(params.slug)

  let title = 'Ratgeber - Tipps & Ratgeber'
  let description =
    'Praktische Tipps und Expertenwissen für Umzug, Reinigung & mehr.'
  let ogImage = 'https://online-offerten.ch/image/online-offerten.webp'
  let publishedTime: string | undefined
  let modifiedTime: string | undefined

  if (post && !error) {
    if (post.meta_title && post.meta_title.trim()) {
      title = post.meta_title.trim()
    } else {
      title = post.title || 'Ratgeber - Tipps & Ratgeber'
    }

    description =
      post.meta_description ||
      `Praktische Tipps und Expertenwissen zu ${post.title || 'Ratgeber'}. Lesen Sie unseren Ratgeber auf Online-Offerten.ch.`

    if (post.featured_image_url) {
      ogImage = post.featured_image_url
    }

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

export default async function RatgeberPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const post = await getCachedPublishedPostFull(params.slug)

  if (!post) {
    notFound()
  }

  const recentPosts = await getCachedRecentPostsExcluding(params.slug)
  const tableOfContents = buildTableOfContentsFromPost(post)

  const postTitle = post.meta_title || post.title || 'Ratgeber'
  const postDescription =
    post.meta_description ||
    `Praktische Tipps und Expertenwissen zu ${post?.title || 'Ratgeber'}.`
  const postImage = post.featured_image_url || 'https://online-offerten.ch/image/online-offerten.webp'
  const publishedTime = post.published_at || post.created_at
  const modifiedTime = post.updated_at || publishedTime
  const canonicalUrl = `https://online-offerten.ch/ratgeber/${params.slug}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: postTitle,
    description: postDescription,
    image: postImage,
    datePublished: publishedTime,
    dateModified: modifiedTime,
    author: {
      '@type': 'Organization',
      name: 'Online-Offerten.ch',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Online-Offerten.ch',
      logo: {
        '@type': 'ImageObject',
        url: 'https://online-offerten.ch/image/logo-icon.webp',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Startseite',
        item: 'https://online-offerten.ch/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Ratgeber',
        item: 'https://online-offerten.ch/ratgeber',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post?.title || 'Ratgeber-Artikel',
        item: canonicalUrl,
      },
    ],
  }

  const faqSchema =
    post?.faq &&
    Array.isArray(post.faq) &&
    post.faq.length > 0 &&
    post.faq.some(
      (faq: { question?: string; answer?: string }) => faq.question?.trim() && faq.answer?.trim()
    )
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faq
            .filter(
              (faq: { question?: string; answer?: string }) =>
                faq.question?.trim() && faq.answer?.trim()
            )
            .map((faq: { question: string; answer: string }) => ({
              '@type': 'Question',
              name: faq.question.trim(),
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer.trim(),
              },
            })),
        }
      : null

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
      <PostArticle post={post} recentPosts={recentPosts} tableOfContents={tableOfContents} />
    </>
  )
}
