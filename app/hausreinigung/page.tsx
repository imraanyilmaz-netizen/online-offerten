import type { Metadata } from 'next'
import HausreinigungPageClient from '@/components/pages/services/HausreinigungPageClient'
import { createClient } from '@/lib/supabase/server'

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
      totalReviews: totalReviewCount || 0,
      averageRating: averageRating,
      realReviewCount: totalReviewCount || 0
    };
  } catch (error) {
    console.error('Error fetching review stats on server:', error);
    return { 
      totalReviews: 0, 
      averageRating: 0,
      realReviewCount: 0
    };
  }
}

export const metadata: Metadata = {
  title: 'Hausreinigung mit Abnahmegarantie – Offerten vergleichen',
  description: 'Professionelle Hausreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Hausreinigung garantiert.',
  alternates: {
    canonical: 'https://online-offerten.ch/hausreinigung',
  },
  openGraph: {
    title: 'Hausreinigung mit Abnahmegarantie – Offerten vergleichen',
    description: 'Professionelle Hausreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach.',
    url: 'https://online-offerten.ch/hausreinigung',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Hausreinigung mit Abnahmegarantie',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hausreinigung mit Abnahmegarantie – Offerten vergleichen',
    description: 'Professionelle Hausreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen.',
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

export default async function HausreinigungPage() {
  // ✅ Server-side'da güncel verileri çek
  const reviewStats = await getReviewStats();
  
  const metaTitle = "Hausreinigung mit Abnahmegarantie – Offerten vergleichen";
  const metaDescription = "Professionelle Hausreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Hausreinigung garantiert.";
  const canonicalUrl = 'https://online-offerten.ch/hausreinigung';
  
  // ✅ Server-side schema - Google için (her sayfa yüklendiğinde güncel)
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
            "name": "Hausreinigung",
            "item": canonicalUrl
          }
        ]
      },
      {
        "@type": "Service",
        "serviceType": "Hausreinigung mit Abnahmegarantie",
        "name": "Professionelle Hausreinigung mit Abnahmegarantie",
        "description": metaDescription,
        "provider": {
          "@type": "Organization",
          "name": "Online-Offerten.ch",
          "url": "https://online-offerten.ch"
        },
        // Sadece gerçek yorumlar varsa göster
        ...(reviewStats.totalReviews > 0 && reviewStats.averageRating > 0 ? {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": reviewStats.averageRating.toFixed(1),
            "reviewCount": reviewStats.totalReviews.toString(),
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
          "name": "Kostenlose Offerte für Hausreinigung"
        }
      },
      {
        "@type": "HowTo",
        "name": "Hausreinigung mit Abnahmegarantie",
        "description": "Schritt-für-Schritt Anleitung für professionelle Hausreinigung mit Abnahmegarantie",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Kostenlose Offerte anfordern",
            "text": "Reinigungsofferten online anfordern und vergleichen."
          },
          {
            "@type": "HowToStep",
            "name": "Besichtigung des Hauses und Offerte erhalten",
            "text": "Die Reinigungsfirma besichtigt das Haus und erstellt eine detaillierte Offerte."
          },
          {
            "@type": "HowToStep",
            "name": "Termin vereinbaren",
            "text": "Vereinbaren Sie einen Termin, der zu Ihren Bedürfnissen passt."
          },
          {
            "@type": "HowToStep",
            "name": "Professionelle Reinigung durchführen",
            "text": "Das professionelle Reinigungsteam führt die Reinigung systematisch durch."
          },
          {
            "@type": "HowToStep",
            "name": "Qualitätskontrolle und Abnahme",
            "text": "Nach Abschluss erfolgt eine Qualitätskontrolle und Sie erhalten eine Abnahmegarantie."
          }
        ]
      }
    ]
  };

  return (
    <>
      {/* ✅ Server-side schema - Google bot ilk taramada görür */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serverSchema) }}
      />
      {/* ✅ Client component'e initial stats ver (hydration için) */}
      <HausreinigungPageClient initialReviewStats={reviewStats} />
    </>
  );
}

