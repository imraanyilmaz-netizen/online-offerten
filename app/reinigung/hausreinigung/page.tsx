import type { Metadata } from 'next'
import HausreinigungPageClient from '@/components/pages/services/HausreinigungPageClient'

// ISR: Sayfa 24 saatte bir otomatik yenilenecek (86400 saniye)
// Bu sayfa statik olarak build edilir, ancak 24 saatte bir arka planda yenilenir
// SEO için daha hızlı yükleme ve daha iyi performans sağlar
export const revalidate = 86400 // 24 saat

export const metadata: Metadata = {
  title: 'Hausreinigung mit Abnahmegarantie – Offerten vergleichen',
  description: 'Professionelle Hausreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Hausreinigung garantiert.',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigung/hausreinigung',
  },
  openGraph: {
    title: 'Hausreinigung mit Abnahmegarantie – Offerten vergleichen',
    description: 'Professionelle Hausreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach.',
    url: 'https://online-offerten.ch/reinigung/hausreinigung',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/reinigungsfirma.webp',
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

export default async function HausreinigungPage() {
  const metaTitle = "Hausreinigung mit Abnahmegarantie – Offerten vergleichen";
  const metaDescription = "Professionelle Hausreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Hausreinigung garantiert.";
  const canonicalUrl = 'https://online-offerten.ch/reinigung/hausreinigung';
  
  // Server-side schema - Google için
  const serverSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": metaTitle,
    "serviceType": "Reinigungsvermittlung",
    "description": metaDescription,
    "provider": {
      "@type": "Organization",
      "name": "Online-Offerten.ch",
      "url": "https://online-offerten.ch"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Switzerland"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=reinigung",
      "priceCurrency": "CHF",
      "price": "0",
      "name": "Kostenlose Offerte für Hausreinigung"
    }
  };

  return (
    <>
      {/* Server-side schema - Google bot ilk taramada görür */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serverSchema) }}
      />
      <HausreinigungPageClient />
    </>
  );
}



