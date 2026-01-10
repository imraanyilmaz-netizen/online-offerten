import type { Metadata } from 'next'
import UmzugskostenRechnerPageClient from '@/components/pages/tools/UmzugskostenRechnerPageClient'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Umzugskosten berechnen: Kostenlos & schnell',
  description: 'Umzugskosten berechnen: Kosten Umzugsunternehmen, Umziehen Kosten & Umzugsfirma Kosten Tabelle. Kostenloser Umzugskosten-Rechner für die Schweiz. In 2 Minuten wissen, was Ihr Umzug kostet! Vergleichen Sie mehrere Angebote & sparen Sie bis zu 40%.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugskosten-rechner',
  },
  openGraph: {
    title: 'Umzugskosten berechnen: Kosten Umzugsunternehmen & Umzugsfirma Kosten Tabelle',
    description: 'Umzugskosten berechnen: Kosten Umzugsunternehmen, Umziehen Kosten & Umzugsfirma Kosten Tabelle. Kostenloser Umzugskosten-Rechner für die Schweiz. In 2 Minuten wissen, was Ihr Umzug kostet!',
    url: 'https://online-offerten.ch/umzugskosten-rechner',
    siteName: 'Online-Offerten.ch',
    locale: 'de_CH',
    type: 'website',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Umzugskosten-Rechner - Kostenlos berechnen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugskosten berechnen: Kosten Umzugsunternehmen & Umzugsfirma Kosten Tabelle',
    description: 'Umzugskosten berechnen: Kosten Umzugsunternehmen, Umziehen Kosten & Umzugsfirma Kosten Tabelle. Kostenloser Rechner für die Schweiz.',
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

export default async function UmzugskostenRechnerPage() {
  const reviewStats = await getReviewStats();
  
  // Server-side schema oluştur (Google için)
  const metaTitle = "Umzugskosten-Rechner: Kostenlose Schätzung in 2 Minuten";
  const metaDescription = "In 2 Minuten wissen, was Ihr Umzug kostet! Kostenloser Umzugskosten-Rechner mit sofortiger Preis-Schätzung. Vergleichen Sie mehrere Angebote & sparen Sie bis zu 40%.";
  
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
            "item": "https://online-offerten.ch/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Umzugskosten-Rechner",
            "item": "https://online-offerten.ch/umzugskosten-rechner"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Umzugskosten-Rechner: Kostenlos berechnen",
        "serviceType": "Umzugskosten-Berechnung",
        "description": metaDescription,
        "provider": {
          "@type": "Organization",
          "name": "Online-Offerten.ch",
          "url": "https://online-offerten.ch",
          "logo": "https://online-offerten.ch/image/online-offerten.ch.jpg"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Switzerland",
          "identifier": "CH"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug",
          "priceCurrency": "CHF",
          "price": "0",
          "name": "Kostenlose Umzugskosten-Berechnung"
        }
      },
      {
        "@type": "HowTo",
        "name": "Umzugskosten berechnen: Kostenlos in 2 Minuten",
        "description": metaDescription,
        "step": [
          {
            "@type": "HowToStep",
            "name": "Wohnungsgrösse angeben",
            "text": "Wählen Sie die Anzahl der Zimmer Ihrer aktuellen Wohnung aus."
          },
          {
            "@type": "HowToStep",
            "name": "Umzugsdistanz eingeben",
            "text": "Geben Sie die Postleitzahlen des Start- und Zielortes ein."
          },
          {
            "@type": "HowToStep",
            "name": "Kosten berechnen",
            "text": "Erhalten Sie eine sofortige Schätzung Ihrer Umzugskosten."
          }
        ],
        "totalTime": "PT2M"
      },
      {
        "@type": "WebPage",
        "name": metaTitle,
        "description": metaDescription,
        "url": "https://online-offerten.ch/umzugskosten-rechner",
        "inLanguage": "de-CH"
      },
      // CreativeWorkSeries - Sadece gerçek yorumlar varsa göster
      ...(reviewStats.reviewCount > 0 && reviewStats.averageRating > 0 ? [{
        "@type": "CreativeWorkSeries",
        "name": "Umzugskosten-Rechner: Kosten Umzugsunternehmen berechnen",
        "description": "Kostenloser Umzugskosten-Rechner zur Berechnung der Kosten für Umzugsunternehmen.",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": reviewStats.averageRating.toFixed(1),
          "reviewCount": reviewStats.reviewCount.toString(),
          "bestRating": "5",
          "worstRating": "1"
        },
        "url": "https://online-offerten.ch/umzugskosten-rechner"
      }] : [])
    ]
  };

  return (
    <>
      {/* Server-side schema - Google için */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serverSchema) }}
      />
      <UmzugskostenRechnerPageClient initialReviewStats={reviewStats} />
    </>
  );
}
