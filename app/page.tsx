import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import HomePageClient from '@/components/pages/HomePageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Offerten vergleichen – Umzug, Reinigung oder Renovierung',
  description: 'Kostenlose Offerten von geprüften Umzugs-, Reinigungs-, Maler- & Gärtnerfirmen aus Ihrer Region anfordern. Mehrere Angebote vergleichen und bis zu 40% sparen.',
  alternates: {
    canonical: 'https://online-offerten.ch/',
  },
  openGraph: {
    title: 'Offerten vergleichen – Umzug, Reinigung oder Renovierung',
    description: 'Kostenlose Offerten von geprüften Umzugs-, Reinigungs-, Maler- & Gärtnerfirmen aus Ihrer Region anfordern. Mehrere Angebote vergleichen und bis zu 40% sparen.',
    url: 'https://online-offerten.ch/',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Offerten vergleichen – Umzug, Reinigung oder Renovierung',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Offerten vergleichen – Umzug, Reinigung oder Renovierung',
    description: 'Kostenlose Offerten von geprüften Umzugs-, Reinigungs-, Maler- & Gärtnerfirmen aus Ihrer Region anfordern. Mehrere Angebote vergleichen und bis zu 40% sparen.',
    images: ['https://online-offerten.ch/image/services-professionals.png'],
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

async function getHomePageData() {
  const supabase = await createClient()
  
  // Fetch reviews and posts in parallel
  const [reviewsResult, postsResult] = await Promise.all([
    supabase
      .from('customer_reviews')
      .select(`
        id, customer_name, rating, city, review_date, 
        rating_price, rating_workflow, rating_administration, 
        review_text,
        service_type, partner_name,
        partners (slug, company_name)
      `)
      .eq('approval_status', 'approved')
      .eq('show_on_homepage', true)
      .not('partner_id', 'is', null)
      .order('review_date', { ascending: false })
      .limit(9),
    supabase
      .from('posts')
      .select('id, title, slug, meta_description, featured_image_url, category, tags')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(9)
  ])

  return {
    reviews: reviewsResult.data || [],
    posts: postsResult.data || [],
  }
}

export default async function HomePage() {
  const { reviews, posts } = await getHomePageData()

  return (
    <>
      {/* Preload hero image for faster LCP */}
      <link
        rel="preload"
        as="image"
        href="/image/online-offerten.webp"
        fetchPriority="high"
      />
      <HomePageClient initialReviews={reviews} initialPosts={posts} />
    </>
  )
}

