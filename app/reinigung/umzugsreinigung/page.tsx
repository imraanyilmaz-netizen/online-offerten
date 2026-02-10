import type { Metadata } from 'next'
import UmzugsreinigungPageClient from '@/components/pages/services/UmzugsreinigungPageClient'

// ISR: Sayfa 24 saatte bir otomatik yenilenecek (86400 saniye)
// Bu sayfa statik olarak build edilir, ancak 24 saatte bir arka planda yenilenir
// SEO iÃ§in daha hızlı yükleme ve daha iyi performans sağlar
export const revalidate = 86400 // 24 saat

export const metadata: Metadata = {
  title: 'Umzugsreinigung Preis – Kostenlose Offerten vergleichen',
  description: 'Umzugsreinigung Preis: Was kostet die professionelle Reinigung? Professionelle Umzugsreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Wohnungsübergabe garantiert.',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigung/umzugsreinigung',
    languages: {
      'de-CH': 'https://online-offerten.ch/reinigung/umzugsreinigung',
      'x-default': 'https://online-offerten.ch/reinigung/umzugsreinigung',
    },
  },
  openGraph: {
    title: 'Umzugsreinigung Preis – Kostenlose Offerten vergleichen',
    description: 'Umzugsreinigung Preis: Was kostet die professionelle Reinigung? Professionelle Umzugsreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach.',
    url: 'https://online-offerten.ch/reinigung/umzugsreinigung',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/bilder/wohnungsreinigung-mit-abnahmegarantie.webp',
        width: 1200,
        height: 630,
        alt: 'Umzugsreinigung mit Abnahmegarantie',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsreinigung Preis – Kostenlose Offerten vergleichen',
    description: 'Umzugsreinigung Preis: Was kostet die professionelle Reinigung? Professionelle Umzugsreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen.',
    images: ['https://online-offerten.ch/bilder/wohnungsreinigung-mit-abnahmegarantie.webp'],
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

export default async function UmzugsreinigungPage() {
  
  const metaTitle = "Umzugsreinigung mit Abnahmegarantie – Kostenlose Offerten vergleichen";
  const metaDescription = "Professionelle Umzugsreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Wohnungsübergabe garantiert.";
  const canonicalUrl = 'https://online-offerten.ch/reinigung/umzugsreinigung';
  
  // Server-side schema - Google iÃ§in gerÃ§ek yorum sayısı
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
            "name": "Umzugsreinigung",
            "item": canonicalUrl
          }
        ]
      },
      {
        "@type": "Service",
        "serviceType": "Umzugsreinigung mit Abnahmegarantie",
        "name": "Professionelle Umzugsreinigung mit Abnahmegarantie",
        "description": metaDescription,
        "provider": {
          "@type": "Organization",
          "name": "Online-Offerten.ch",
          "url": "https://online-offerten.ch"
        },
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
          "name": "Kostenlose Offerte für Umzugsreinigung"
        }
      }
    ]
  };

  return (
    <>
      {/* Server-side schema - Google bot iÃ§in */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serverSchema) }}
      />
      <UmzugsreinigungPageClient />
    </>
  );
}



