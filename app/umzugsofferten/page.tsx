import type { Metadata } from 'next'
import { Suspense } from 'react'
import Script from 'next/script'
import UmzugsoffertenPageClient from '@/components/pages/info/UmzugsoffertenPageClient'
import { createStaticClient } from '@/lib/supabase/server'

// ISR: Sayfa 1 saatte bir otomatik yenilenecek (3600 saniye)
// Bu sayfa statik olarak build edilir, ancak 1 saatte bir arka planda yenilenir
// SEO için daha hızlı yükleme ve daha iyi performans sağlar
export const revalidate = 3600 // 1 saat

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
    return { 
      reviewCount: 0, 
      averageRating: 0 
    };
  }
}

// FAQ items for schema (must match client component)
const faqItemsForSchema = [
  {
    q: "Was sind Umzugsofferten und wie funktioniert der Vergleich?",
    a: "Umzugsofferten sind kostenlose Preisangebote von Umzugsfirmen für Ihren geplanten Umzug. Bei Online-Offerten.ch können Sie bis zu 5 Preisvorschläge von geprüften Umzugsfirmen in Ihrer Region kostenlos und unverbindlich anfordern. Sie füllen einfach ein kurzes Formular aus, beschreiben Ihren Umzug, und erhalten innerhalb von 24-48 Stunden mehrere Preisvorschläge per E-Mail. Diese können Sie dann in Ruhe vergleichen und die beste für Ihre Bedürfnisse auswählen. Der direkte Vergleich ist der effektivste Weg, um faire Preise zu finden und bis zu 40% zu sparen."
  },
  {
    q: "Sind Umzugsofferten wirklich kostenlos?",
    a: "Ja, der Service von Online-Offerten.ch ist für Sie als Kunde zu 100% kostenlos und unverbindlich. Sie zahlen keine Gebühren für die Offertenanfrage, keine Vermittlungsgebühren und keine versteckten Kosten. Die Umzugsfirmen zahlen eine kleine Gebühr, wenn Sie deren Offerte annehmen. Sie können alle Offerten vergleichen und entscheiden selbst, ob und welche Offerte Sie annehmen möchten. Es gibt keine Mindestlaufzeit oder Verpflichtungen Ihrerseits."
  },
  {
    q: "Wie viele Umzugsofferten erhalte ich?",
    a: "Sie erhalten bis zu 5 Preisvorschläge von verschiedenen geprüften Umzugsfirmen aus Ihrer Region. Die Anzahl hängt von der Verfügbarkeit der Partnerfirmen in Ihrer Region und Ihrem Umzugsdatum ab. In Ballungsgebieten wie Zürich, Basel oder Bern erhalten Sie meist alle 5 Angebote, in ländlicheren Regionen können es auch 3-4 sein. Jede Offerte wird Ihnen per E-Mail zugesendet und enthält alle wichtigen Details wie Preis, Leistungen, Versicherungen und Kontaktinformationen."
  },
  {
    q: "Wie lange dauert es, bis ich Umzugsofferten erhalte?",
    a: "In der Regel erhalten Sie die ersten Preisvorschläge innerhalb von 24-48 Stunden nach Ihrer Anfrage. Einige Umzugsfirmen antworten bereits nach wenigen Stunden. Alle Angebote werden Ihnen per E-Mail zugesendet und enthalten detaillierte Informationen zu Preis, Leistungen, Versicherungen und Kontaktdaten der Umzugsfirma. Falls Sie nach 48 Stunden noch nicht alle Kostenvoranschläge erhalten haben, können Sie uns kontaktieren und wir helfen Ihnen gerne weiter."
  },
  {
    q: "Was sollte eine gute Umzugsofferte enthalten?",
    a: "Eine professionelle Umzugsofferte sollte folgende Informationen enthalten: Gesamtpreis mit detaillierter Aufschlüsselung, alle enthaltenen Leistungen (Verpackung, Transport, Montage/Demontage), Versicherungsschutz und Deckungssumme, Umzugsdatum und Zeitfenster, Anzahl der Umzugshelfer und Fahrzeuge, Zusatzleistungen und deren Kosten, Zahlungsbedingungen und Stornierungsbedingungen. Achten Sie darauf, dass alle Leistungen schriftlich festgehalten sind. Eine seriöse Umzugsfirma bietet transparente Preise ohne versteckte Kosten."
  },
  {
    q: "Kann ich Umzugsofferten auch für Auslandumzüge anfordern?",
    a: "Ja, Sie können auch für Auslandumzüge Preisvorschläge anfordern. Viele unserer Partnerfirmen sind auf Umzüge ins Ausland spezialisiert und können Ihnen Kostenvoranschläge für Umzüge nach Deutschland, Österreich, Frankreich, Italien und andere europäische Länder erstellen. Auslandumzüge erfordern zusätzliche Planung und Dokumentation, daher sollten Sie diese frühzeitig anfragen. Die Angebote enthalten dann auch Informationen zu Zollbestimmungen, Transportdauer und internationalen Versicherungen."
  },
  {
    q: "Wie kann ich bei Umzugsofferten sparen?",
    a: "Der beste Weg, um bei Umzugsangeboten zu sparen, ist der Vergleich mehrerer Preise. Studien zeigen, dass Kunden durch den Vergleich durchschnittlich 30-40% der Umzugskosten einsparen können. Weitere Sparmöglichkeiten: Flexibel beim Umzugsdatum sein (Wochentage sind oft günstiger als Wochenenden), Eigenleistung beim Packen erbringen, vor dem Umzug ausmisten und nicht benötigte Gegenstände verkaufen oder entsorgen, frühzeitig buchen (Last-Minute-Buchungen sind teurer), und Angebote genau vergleichen - nicht nur auf den Preis achten, sondern auch auf enthaltene Leistungen."
  }
]

// Generate schema data (server-side) - Will be updated dynamically
const canonicalUrl = 'https://online-offerten.ch/umzugsofferten'
function getSchemaData(reviewStats: { reviewCount: number; averageRating: number }) {
  return {
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
          "name": "Umzugsofferten",
          "item": canonicalUrl
        }
      ]
    },
    {
      "@type": "Service",
      "name": "Umzugsofferten kostenlos vergleichen",
      "serviceType": "Umzugsofferten",
      "description": "Kostenlose Umzugsangebote von geprüften Umzugsfirmen in der Schweiz vergleichen. Bis zu 5 Preisvorschläge erhalten und bis zu 40% sparen.",
      "provider": {
        "@type": "Organization",
        "name": "Online-Offerten.ch",
        "url": "https://online-offerten.ch",
        "logo": "https://online-offerten.ch/image/logo.png"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Switzerland"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2",
        "priceCurrency": "CHF",
        "price": "0",
        "name": "Kostenlose Umzugsofferten"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqItemsForSchema.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    },
    {
      "@type": "HowTo",
      "name": "Wie fordere ich Umzugsofferten an?",
      "description": "Schritt-für-Schritt Anleitung zum Anfordern von Umzugsofferten",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Umzugsdetails eingeben",
          "text": "Füllen Sie das Online-Formular aus und geben Sie Ihre Umzugsdetails ein: Umzugsdatum, Umzugsstrecke, Wohnungsgrösse und gewünschte Leistungen."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Kontaktdaten angeben",
          "text": "Geben Sie Ihre Kontaktdaten (Name, E-Mail, Telefon) an, damit die Umzugsfirmen Ihnen die Offerten zusenden können."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Anfrage absenden",
          "text": "Senden Sie Ihre Anfrage ab. Sie erhalten eine Bestätigung per E-Mail."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Offerten vergleichen",
          "text": "Innerhalb von 24-48 Stunden erhalten Sie bis zu 5 Preisvorschläge per E-Mail. Vergleichen Sie Preise, Leistungen und Bewertungen."
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Beste Offerte auswählen",
          "text": "Wählen Sie die Umzugsofferte aus, die am besten zu Ihren Bedürfnissen passt, und kontaktieren Sie die Umzugsfirma direkt."
        }
      ]
    },
    {
      "@type": "CreativeWorkSeries",
      "name": "Umzugsofferten: Kostenlos vergleichen",
      "description": "Kostenlose Umzugsangebote von geprüften Umzugsfirmen in der Schweiz vergleichen. Bis zu 5 Preisvorschläge erhalten und bis zu 40% sparen.",
      ...(reviewStats.reviewCount > 0 && reviewStats.averageRating > 0 ? {
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": reviewStats.averageRating.toFixed(1),
          "reviewCount": reviewStats.reviewCount.toString(),
          "bestRating": "5",
          "worstRating": "1"
        }
      } : {}),
      "url": "https://online-offerten.ch/umzugsofferten"
    }
    ]
  };
}

export const metadata: Metadata = {
  title: 'Umzugsofferten vergleichen – Bis zu 40% sparen',
  description: 'Umzugsofferten kostenlos vergleichen ✓ Bis zu 5 Offerten von geprüften Umzugsfirmen erhalten. Umzug offerten Schweiz – schnell, sicher und bis zu 40% günstiger. Jetzt kostenlos Offerten anfordern!',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsofferten',
  },
  openGraph: {
    title: 'Umzugsofferten kostenlos vergleichen » Bis zu 40% sparen',
    description: 'Umzugsofferten kostenlos vergleichen ✓ Bis zu 5 Offerten von geprüften Umzugsfirmen erhalten. Umzug offerten Schweiz – schnell, sicher und bis zu 40% günstiger.',
    url: 'https://online-offerten.ch/umzugsofferten',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzugsservice-Schweiz/umzugsofferten-kostenlos-vergleichen.png',
        width: 1200,
        height: 630,
        alt: 'Umzugsofferten kostenlos vergleichen',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsofferten kostenlos vergleichen » Bis zu 40% sparen',
    description: 'Umzugsofferten kostenlos vergleichen ✓ Bis zu 5 Offerten von geprüften Umzugsfirmen erhalten.',
    images: ['https://online-offerten.ch/image/umzugsservice-Schweiz/umzugsofferten-kostenlos-vergleichen.png'],
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

export default async function UmzugsoffertenPage() {
  // ✅ Server-side'da güncel verileri çek
  const reviewStats = await getReviewStats();
  
  // ✅ Server-side schema - Google için (her sayfa yüklendiğinde güncel)
  const schemaData = getSchemaData(reviewStats);
  
  return (
    <>
      {/* ✅ Server-side schema - Google bot ilk taramada görür */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>}>
        <UmzugsoffertenPageClient initialReviewStats={reviewStats} />
      </Suspense>
    </>
  )
}

