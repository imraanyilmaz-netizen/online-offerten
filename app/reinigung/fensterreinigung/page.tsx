import type { Metadata } from 'next'
import FensterreinigungPageClient from '@/components/pages/services/FensterreinigungPageClient'

// ISR: Sayfa 24 saatte bir otomatik yenilenecek (86400 saniye)
// Bu sayfa statik olarak build edilir, ancak 24 saatte bir arka planda yenilenir
// SEO için daha hızlı yükleme ve daha iyi performans sağlar
export const revalidate = 86400 // 24 saat

export const metadata: Metadata = {
  title: 'Fensterreinigung – Kostenlose Offerten vergleichen',
  description: 'Fensterreinigung vom Profi: Fordern Sie kostenlose Offerten an und vergleichen Sie Reinigungsfirmen für streifenfreie und professionelle Ergebnisse.',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigung/fensterreinigung',
  },
  openGraph: {
    title: 'Fensterreinigung – Kostenlose Offerten vergleichen',
    description: 'Fensterreinigung vom Profi: Fordern Sie kostenlose Offerten an und vergleichen Sie Reinigungsfirmen für streifenfreie und professionelle Ergebnisse.',
    url: 'https://online-offerten.ch/reinigung/fensterreinigung',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/reinigungsfirma.webp',
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
    images: ['https://online-offerten.ch/image/reinigungsfirma.webp'],
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

export default async function FensterreinigungPage() {
  
  const metaTitle = "Fensterreinigung – Kostenlose Offerten vergleichen";
  const metaDescription = "Fensterreinigung vom Profi: Fordern Sie kostenlose Offerten an und vergleichen Sie Reinigungsfirmen für streifenfreie und professionelle Ergebnisse.";
  const canonicalUrl = 'https://online-offerten.ch/reinigung/fensterreinigung';
  
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



