import type { Metadata } from 'next'
import HausreinigungPageClient from '@/components/pages/services/HausreinigungPageClient'
import { createStaticClient } from '@/lib/supabase/server'

// ISR: Sayfa 24 saatte bir otomatik yenilenecek (86400 saniye)
// Bu sayfa statik olarak build edilir, ancak 24 saatte bir arka planda yenilenir
// SEO için daha hızlı yükleme ve daha iyi performans sağlar
export const revalidate = 86400 // 24 saat

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

export const metadata: Metadata = {
  title: 'Hausreinigung mit Abnahmegarantie – Offerten vergleichen',
  description: 'Professionelle Hausreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Hausreinigung garantiert.',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigung/hausreinigung',
    languages: {
      'de-CH': 'https://online-offerten.ch/reinigung/hausreinigung',
      'x-default': 'https://online-offerten.ch/reinigung/hausreinigung',
    },
  },
  openGraph: {
    title: 'Hausreinigung mit Abnahmegarantie – Offerten vergleichen',
    description: 'Professionelle Hausreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach.',
    url: 'https://online-offerten.ch/reinigung/hausreinigung',
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
  const canonicalUrl = 'https://online-offerten.ch/reinigung/hausreinigung';
  
  // ✅ Server-side schema - Google için (her sayfa yüklendiğinde güncel)
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

