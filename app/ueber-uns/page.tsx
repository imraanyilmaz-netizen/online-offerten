import type { Metadata } from 'next'
import { Suspense } from 'react'
import { createStaticClient } from '@/lib/supabase/server'
import AboutPageClient from '@/components/pages/AboutPageClient'

export const metadata: Metadata = {
  title: 'Über uns – Online-Offerten.ch | Kostenlose Vermittlungsplattform für Umzug, Reinigung & Malerarbeiten',
  description: 'Online-Offerten.ch ist eine unabhängige Schweizer Vermittlungsplattform. Wir verbinden Sie kostenlos mit bis zu 5 geprüften Partnerfirmen für Umzug, Reinigung und Malerarbeiten in der ganzen Schweiz. 100% kostenlos und unverbindlich.',
  alternates: {
    canonical: 'https://online-offerten.ch/ueber-uns',
  },
  openGraph: {
    title: 'Über uns – Online-Offerten.ch | Kostenlose Vermittlungsplattform Schweiz',
    description: 'Kostenlose Vermittlung von Umzugs-, Reinigungs- und Malerfirmen in der ganzen Schweiz. Bis zu 5 Offerten vergleichen – 100% kostenlos und unverbindlich.',
    url: 'https://online-offerten.ch/ueber-uns',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/online-offerten.webp',
        width: 1200,
        height: 630,
        alt: 'Online-Offerten.ch – Über uns',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Über uns – Online-Offerten.ch | Kostenlose Vermittlungsplattform',
    description: 'Kostenlose Vermittlung von Umzugs-, Reinigungs- und Malerfirmen in der ganzen Schweiz. Bis zu 5 Offerten vergleichen.',
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

// ISR: Sayfa 1 saatte bir otomatik yenilenecek
export const revalidate = 3600

async function getReviews() {
  const supabase = createStaticClient()
  
  // Platform yorumlarını getir (ana sayfadaki gibi)
  const { data: reviews, error } = await supabase
    .from('customer_reviews')
    .select(`
      id, customer_name, rating, city, review_date, 
      review_text,
      service_type, partner_name,
      partners (slug, company_name)
    `)
    .eq('approval_status', 'approved')
    .eq('review_type', 'platform')
    .eq('show_on_homepage', true)
    .order('review_date', { ascending: false })
    .limit(6)

  return {
    reviews: reviews || [],
    error
  }
}

export default async function AboutPage() {
  const { reviews } = await getReviews()
  
  // Schema.org structured data for About page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Über uns – Online-Offerten.ch",
    "description": "Online-Offerten.ch ist eine unabhängige Schweizer Vermittlungsplattform für Umzugs-, Reinigungs- und Malerofferten. Wir verbinden Privat- und Geschäftskunden kostenlos mit geprüften Partnerfirmen in der ganzen Schweiz.",
    "url": "https://online-offerten.ch/ueber-uns",
    "mainEntity": {
      "@type": "Organization",
      "@id": "https://online-offerten.ch/#organization",
      "name": "Online Offerten",
      "url": "https://online-offerten.ch",
      "logo": "https://online-offerten.ch/image/logo-icon.avif",
      "description": "Unabhängige Schweizer Vermittlungsplattform für Umzugs-, Reinigungs- und Malerofferten. Kostenlose Vermittlung von geprüften Partnerfirmen in der ganzen Schweiz.",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "info@online-offerten.ch",
        "areaServed": "CH",
        "availableLanguage": ["de"]
      },
      "sameAs": [
        "https://www.facebook.com/onlineofferten",
        "https://www.instagram.com/onlineofferten"
      ],
      "areaServed": {
        "@type": "Country",
        "name": "Switzerland",
        "identifier": "CH"
      }
    }
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-gray-50">Loading...</div>}>
        <AboutPageClient initialReviews={reviews} />
      </Suspense>
    </>
  )
}



