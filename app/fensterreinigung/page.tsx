import type { Metadata } from 'next'
import FensterreinigungPageClient from '@/components/pages/services/FensterreinigungPageClient'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Fensterreinigung – Kostenlose Offerten vergleichen',
  description: 'Fensterreinigung vom Profi: Fordern Sie kostenlose Offerten an und vergleichen Sie Reinigungsfirmen für streifenfreie und professionelle Ergebnisse.',
  alternates: {
    canonical: 'https://online-offerten.ch/fensterreinigung',
  },
  openGraph: {
    title: 'Fensterreinigung – Kostenlose Offerten vergleichen',
    description: 'Fensterreinigung vom Profi: Fordern Sie kostenlose Offerten an und vergleichen Sie Reinigungsfirmen für streifenfreie und professionelle Ergebnisse.',
    url: 'https://online-offerten.ch/fensterreinigung',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Fensterreinigung',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fensterreinigung – Kostenlose Offerten vergleichen',
    description: 'Fensterreinigung vom Profi: Fordern Sie kostenlose Offerten an und vergleichen Sie Reinigungsfirmen für streifenfreie und professionelle Ergebnisse.',
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

async function getReviewStats() {
  try {
    const supabase = await createClient();
    
    // Tüm onaylanmış yorumları say (sınırsız)
    const { count: totalReviewCount, error: countError } = await supabase
      .from('customer_reviews')
      .select('*', { count: 'exact', head: true })
      .eq('approval_status', 'approved');
    
    if (countError) {
      console.error('Error fetching review count:', countError);
    }
    
    // Tüm onaylanmış yorumların rating'lerini al (average hesaplamak için)
    const { data: allReviews, error: reviewsError } = await supabase
      .from('customer_reviews')
      .select('rating')
      .eq('approval_status', 'approved');
    
    if (reviewsError) {
      console.error('Error fetching reviews for average:', reviewsError);
    }
    
    // Average rating hesapla
    let averageRating = 0;
    if (allReviews && allReviews.length > 0) {
      const totalRating = allReviews.reduce((sum: number, review: any) => sum + (review.rating || 0), 0);
      averageRating = totalRating / allReviews.length;
    }
    
    return {
      reviewCount: totalReviewCount || 0,
      averageRating: averageRating
    };
  } catch (error) {
    console.error('Error fetching review stats on server:', error);
    return { reviewCount: 0, averageRating: 0 };
  }
}

export default async function FensterreinigungPage() {
  const reviewStats = await getReviewStats();
  
  const metaTitle = "Fensterreinigung – Kostenlose Offerten vergleichen";
  const metaDescription = "Fensterreinigung vom Profi: Fordern Sie kostenlose Offerten an und vergleichen Sie Reinigungsfirmen für streifenfreie und professionelle Ergebnisse.";
  const canonicalUrl = 'https://online-offerten.ch/fensterreinigung';
  
  // Server-side schema - Google için gerçek yorum sayısı
  const serverSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://online-offerten.ch"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Reinigung",
            "item": "https://online-offerten.ch/reinigung"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Fensterreinigung",
            "item": canonicalUrl
          }
        ]
      },
      {
        "@type": "Service",
        "serviceType": "Fensterreinigung",
        "name": "Fensterreinigung vom Profi",
        "description": metaDescription,
        "provider": {
          "@type": "Organization",
          "name": "Online-Offerten.ch",
          "url": "https://online-offerten.ch"
        },
        ...(reviewStats.reviewCount > 0 && reviewStats.averageRating > 0 ? {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": reviewStats.averageRating.toFixed(1),
            "reviewCount": reviewStats.reviewCount.toString(),
            "bestRating": "5",
            "worstRating": "1"
          }
        } : {}),
        "areaServed": {
          "@type": "Country",
          "name": "Switzerland",
          "identifier": "CH"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=reinigung",
          "priceCurrency": "CHF",
          "price": "0",
          "availability": "https://schema.org/InStock",
          "name": "Kostenlose Offerte für Fensterreinigung"
        }
      }
    ]
  };

  return (
    <>
      {/* Server-side schema - Google bot için */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serverSchema) }}
      />
      <FensterreinigungPageClient />
    </>
  );
}

