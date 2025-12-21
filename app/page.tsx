import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import HomePageClient from '@/components/pages/HomePageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Offerten vergleichen – Umzug, Reinigung oder Renovierung',
  description: 'Kostenlose Offerten von geprüften Umzugs-, Reinigungs-, Maler- & Gärtnerfirmen aus Ihrer Region anfordern. Mehrere Angebote vergleichen und bis zu 40% sparen.',
  openGraph: {
    title: 'Offerten vergleichen – Umzug, Reinigung oder Renovierung',
    description: 'Kostenlose Offerten von geprüften Umzugs-, Reinigungs-, Maler- & Gärtnerfirmen aus Ihrer Region anfordern. Mehrere Angebote vergleichen und bis zu 40% sparen.',
    images: ['https://online-offerten.ch/image/services-professionals.png'],
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

  return <HomePageClient initialReviews={reviews} initialPosts={posts} />
}

