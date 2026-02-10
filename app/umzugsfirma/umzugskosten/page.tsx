import type { Metadata } from 'next'
import UmzugskostenRechnerPageClient from '@/components/pages/tools/UmzugskostenRechnerPageClient'
import { createStaticClient } from '@/lib/supabase/server'

// ISR: Sayfa 1 saatte bir otomatik yenilenecek (3600 saniye)
// Bu sayfa statik olarak build edilir, ancak 1 saatte bir arka planda yenilenir
// SEO için daha hızlı yükleme ve daha iyi performans sağlar
export const revalidate = 3600 // 1 saat

export const metadata: Metadata = {
  title: 'Umzugskosten berechnen: Kostenlos & schnell',
  description: 'Umzugskosten berechnen: Kosten Umzugsunternehmen, Umziehen Kosten & Umzugsfirma Kosten Tabelle. Kostenloser Umzugskosten-Rechner für die Schweiz. In 2 Minuten wissen, was Ihr Umzug kostet! Vergleichen Sie mehrere Angebote & sparen Sie bis zu 40%.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/umzugskosten',
  },
  openGraph: {
    title: 'Umzugskosten berechnen: Kosten Umzugsunternehmen & Umzugsfirma Kosten Tabelle',
    description: 'Umzugskosten berechnen: Kosten Umzugsunternehmen, Umziehen Kosten & Umzugsfirma Kosten Tabelle. Kostenloser Umzugskosten-Rechner für die Schweiz. In 2 Minuten wissen, was Ihr Umzug kostet!',
    url: 'https://online-offerten.ch/umzugsfirma/umzugskosten',
    siteName: 'Online-Offerten.ch',
    locale: 'de_CH',
    type: 'website',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzugsfirma-kartons.webp',
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
    images: ['https://online-offerten.ch/image/umzugsfirma-kartons.webp'],
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

export default async function UmzugskostenPage() {
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
            "name": "Umzugsfirma",
            "item": "https://online-offerten.ch/umzugsfirma"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Umzugskosten",
            "item": "https://online-offerten.ch/umzugsfirma/umzugskosten"
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
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Wie berechnet man die Umzugskosten?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Die Umzugskosten werden basierend auf mehreren Faktoren (Kostenfaktoren) berechnet: Wohnungsgrösse (Anzahl Zimmer), Distanz zwischen Alt- und Neuwohnung, Zusatzleistungen wie Reinigung oder Möbelmontage. Unser Rechner berücksichtigt all diese Faktoren und liefert Ihnen in nur 2 Minuten eine verlässliche Preis-Schätzung."
            }
          },
          {
            "@type": "Question",
            "name": "Was kostet ein Umzug in der Schweiz durchschnittlich?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Die durchschnittlichen Umzugskosten in der Schweiz variieren je nach Wohnungsgrösse. Für eine 3.5-Zimmer-Wohnung liegt der Umzugspreis zwischen CHF 1'200 und CHF 1'800 für den reinen Transport (Basispreis CHF 1'200 + Distanzkosten). Mit Zusatzleistungen wie Möbelmontage (CHF 400) und Reinigung (CHF 500) können die Kosten auf CHF 2'100 bis CHF 2'700 steigen. Nutzen Sie unseren Rechner für eine individuelle Schätzung."
            }
          },
          {
            "@type": "Question",
            "name": "Kann ich bei einem Umzug Geld sparen?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ja, Sie können bei Ihrem Umzug sparen, indem Sie flexible Umzugstermine ausserhalb der Hauptsaison (Juni-August) wählen, mehrere Offerten vergleichen und unnötige Zusatzleistungen vermeiden. Ein Vergleich von mindestens 3 Offerten kann Ihnen bis zu 30% bei den Umzugskosten sparen. Eine erste Preis-Schätzung hilft Ihnen, das Budget zu planen, dann können Sie Offerten vergleichen."
            }
          },
          {
            "@type": "Question",
            "name": "Was beeinflusst die Umzugskosten am meisten?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Die wichtigsten Faktoren, die die Umzugskosten beeinflussen, sind (Kostenfaktoren): Das Volumen der Umzugsgüter, die Distanz zwischen den Wohnorten, Stockwerke und Zugangssituation sowie gewählte Zusatzleistungen wie Ein- und Auspacken oder Möbelmontage. Unser Rechner berücksichtigt all diese Faktoren bei der Kalkulation."
            }
          },
          {
            "@type": "Question",
            "name": "Sind die berechneten Umzugskosten verbindlich?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Die Umzugskosten aus unserem Rechner sind Schätzungen und dienen als Richtwerte. Für eine verbindliche Offerte sollten Sie nach der ersten Preis-Schätzung kostenlose und unverbindliche Offerten von geprüften Umzugsfirmen in Ihrer Region anfordern."
            }
          },
          {
            "@type": "Question",
            "name": "Wie funktioniert der Umzugskosten-Rechner?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Unser Rechner ist einfach zu bedienen: Geben Sie die Anzahl der Zimmer, die Postleitzahlen von Start- und Zielort sowie gewünschte Zusatzleistungen ein. Das Tool ermittelt dann Ihre Umzugskosten basierend auf aktuellen Marktpreisen und liefert Ihnen in 2 Minuten eine verlässliche Schätzung."
            }
          },
          {
            "@type": "Question",
            "name": "Ist die Umzugskosten-Berechnung kostenlos?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ja, die Nutzung unseres Umzugskosten-Rechners ist vollständig kostenlos und unverbindlich. Sie können Ihre Umzugskosten so oft berechnen, wie Sie möchten, ohne dass Kosten entstehen. Nach der Berechnung können Sie optional kostenlose Offerten von geprüften Umzugsfirmen anfordern."
            }
          },
          {
            "@type": "Question",
            "name": "Was kostet ein Umzug pro Zimmer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Die Umzugskosten pro Zimmer variieren je nach Umzugsunternehmen und Region. Die Basispreise (ohne Distanz) betragen: 1-1.5 Zimmer CHF 600, 2-2.5 Zimmer CHF 900, 3-3.5 Zimmer CHF 1'200, 4-4.5 Zimmer CHF 1'750 und 5.5+ Zimmer CHF 2'250. Mit durchschnittlicher Distanz (20-50 km) und Zusatzleistungen liegen die Gesamtkosten typischerweise zwischen CHF 600-900 (1.5 Zimmer), CHF 900-1'200 (2.5 Zimmer), CHF 1'200-1'800 (3.5 Zimmer), CHF 1'750-2'500 (4.5 Zimmer) und CHF 2'250-3'500 (5.5+ Zimmer). Unser Rechner liefert eine genaue Schätzung basierend auf diesen Werten."
            }
          },
          {
            "@type": "Question",
            "name": "Wie genau ist die Umzugskosten-Schätzung?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Unser Rechner liefert eine verlässliche Schätzung basierend auf aktuellen Marktpreisen. Die ermittelten Umzugskosten sind Richtwerte und können je nach spezifischen Anforderungen, Zugangssituation, Stockwerken und weiteren Faktoren variieren. Für eine verbindliche Offerte empfehlen wir, nach der ersten Einschätzung kostenlose Offerten von mehreren Umzugsfirmen anzufordern und zu vergleichen."
            }
          },
          {
            "@type": "Question",
            "name": "Was sind versteckte Umzugskosten?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Versteckte Umzugskosten können Parkgebühren, Möbelmontage, Verpackungsmaterial, Versicherung, Aufzuggebühren oder zusätzliche Stockwerke sein. Unser Rechner berücksichtigt die wichtigsten Faktoren, aber für eine vollständige Übersicht sollten Sie nach der ersten Schätzung detaillierte Offerten von Umzugsfirmen anfordern."
            }
          },
          {
            "@type": "Question",
            "name": "Wie unterscheiden sich Umzugskosten nach Distanz?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Die Distanz ist ein wichtiger Faktor bei der Umzugskosten-Berechnung. Kurze Umzüge (unter 20 km) haben niedrigere Distanzkosten, während längere Umzüge (über 50 km) deutlich höhere Kosten verursachen können. Unser Rechner ermittelt automatisch die Distanz basierend auf den eingegebenen Postleitzahlen und berücksichtigt diese in der Gesamtkalkulation."
            }
          },
          {
            "@type": "Question",
            "name": "Was kostet ein Umzug in Zürich, Genf oder Bern?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Die Umzugskosten in Grossstädten wie Zürich, Genf oder Bern sind tendenziell höher als in ländlichen Gebieten. Dies liegt an höheren Lebenshaltungskosten, Parkplatzsituationen und höherer Nachfrage. Für eine 3.5-Zimmer-Wohnung in Zürich können die Kosten zwischen CHF 1'400 und CHF 2'000 liegen. Unser Rechner berücksichtigt diese regionalen Unterschiede bei der Schätzung."
            }
          }
        ]
      }
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



