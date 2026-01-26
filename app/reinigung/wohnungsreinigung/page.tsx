import type { Metadata } from 'next'
import WohnungsreinigungPageClient from '@/components/pages/services/WohnungsreinigungPageClient'
import { createStaticClient } from '@/lib/supabase/server'

// ISR: Sayfa 24 saatte bir otomatik yenilenecek (86400 saniye)
// Bu sayfa statik olarak build edilir, ancak 24 saatte bir arka planda yenilenir
// SEO için daha hızlı yükleme ve daha iyi performans sağlar
export const revalidate = 86400 // 24 saat

export const metadata: Metadata = {
  title: 'Wohnungsreinigung mit Abnahmegarantie – Offerten vergleichen',
  description: 'Professionelle Wohnungsreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Wohnungsübergabe garantiert.',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigung/wohnungsreinigung',
  },
  openGraph: {
    title: 'Wohnungsreinigung mit Abnahmegarantie – Kostenlose Offerten vergleichen',
    description: 'Professionelle Wohnungsreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach.',
    url: 'https://online-offerten.ch/reinigung/wohnungsreinigung',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Wohnungsreinigung mit Abnahmegarantie',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wohnungsreinigung mit Abnahmegarantie – Kostenlose Offerten vergleichen',
    description: 'Professionelle Wohnungsreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen.',
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
    const supabase = createStaticClient();
    
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

export default async function WohnungsreinigungPage() {
  const reviewStats = await getReviewStats();
  
  const metaTitle = "Wohnungsreinigung mit Abnahmegarantie – Kostenlose Offerten vergleichen";
  const metaDescription = "Professionelle Wohnungsreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Wohnungsübergabe garantiert.";
  const canonicalUrl = 'https://online-offerten.ch/reinigung/wohnungsreinigung';
  
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
            "name": "Wohnungsreinigung",
            "item": canonicalUrl
          }
        ]
      },
      {
        "@type": "Service",
        "serviceType": "Wohnungsreinigung mit Abnahmegarantie",
        "name": "Professionelle Wohnungsreinigung mit Abnahmegarantie",
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
          "name": "Kostenlose Offerte für Wohnungsreinigung"
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
      <WohnungsreinigungPageClient />
    </>
  );
}

