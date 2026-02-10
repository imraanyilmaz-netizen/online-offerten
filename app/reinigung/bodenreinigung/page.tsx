import type { Metadata } from 'next'
import BodenreinigungPageClient from '@/components/pages/services/BodenreinigungPageClient'

// ISR: Sayfa 24 saatte bir otomatik yenilenecek (86400 saniye)
// Bu sayfa statik olarak build edilir, ancak 24 saatte bir arka planda yenilenir
// SEO iÃ§in daha hızlı yükleme ve daha iyi performans sağlar
export const revalidate = 86400 // 24 saat

export const metadata: Metadata = {
  title: 'Bodenreinigung – Kostenlose Offerten vergleichen',
  description: 'Bodenreinigung für Parkett, Stein oder Teppich: Erhalten Sie kostenlose Offerten und vergleichen Sie qualifizierte Reinigungsfirmen in Ihrer Region.',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigung/bodenreinigung',
  },
  openGraph: {
    title: 'Bodenreinigung – Kostenlose Offerten vergleichen',
    description: 'Bodenreinigung für Parkett, Stein oder Teppich: Erhalten Sie kostenlose Offerten und vergleichen Sie qualifizierte Reinigungsfirmen in Ihrer Region.',
    url: 'https://online-offerten.ch/reinigung/bodenreinigung',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/reinigungsfirma.webp',
        width: 1200,
        height: 630,
        alt: 'Bodenreinigung',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bodenreinigung – Kostenlose Offerten vergleichen',
    description: 'Bodenreinigung für Parkett, Stein oder Teppich: Erhalten Sie kostenlose Offerten und vergleichen Sie qualifizierte Reinigungsfirmen.',
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

export default async function BodenreinigungPage() {
  
  const metaTitle = "Bodenreinigung – Kostenlose Offerten vergleichen";
  const metaDescription = "Bodenreinigung für Parkett, Stein oder Teppich: Erhalten Sie kostenlose Offerten und vergleichen Sie qualifizierte Reinigungsfirmen in Ihrer Region.";
  const canonicalUrl = 'https://online-offerten.ch/reinigung/bodenreinigung';
  
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
            "name": "Bodenreinigung",
            "item": canonicalUrl
          }
        ]
      },
      {
        "@type": "Service",
        "serviceType": "Bodenreinigung",
        "name": "Bodenreinigung für Parkett, Stein oder Teppich",
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
          "name": "Kostenlose Offerte für Bodenreinigung"
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
      <BodenreinigungPageClient />
    </>
  );
}



