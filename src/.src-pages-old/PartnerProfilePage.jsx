import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
// Removed useTranslation
import PartnerHero from '@/components/PartnerProfilePageParts/PartnerHero';
import Sidebar from '@/components/PartnerProfilePageParts/Sidebar';
import ReviewsSection from '@/components/PartnerProfilePageParts/ReviewsSection';
import ImageGallery from '@/components/PartnerProfilePageParts/ImageGallery';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

const FullPageLoader = () => (
  <div className="fixed inset-0 z-[9999] flex h-screen w-full items-center justify-center bg-white">
    <Loader2 className="h-12 w-12 animate-spin text-green-600" />
  </div>
);

const PartnerProfilePage = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  // Removed useTranslation
  
  // Removed ready check - DE-only now

  const [partner, setPartner] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const fetchPartnerData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: partnerData, error: partnerError } = await supabase
        .from('partners')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (partnerError || !partnerData) {
        throw new Error('Partnerprofil konnte nicht gefunden werden.');
      }
      setPartner(partnerData);

      const { data: reviewsData, error: reviewsError } = await supabase
        .from('customer_reviews')
        .select('*')
        .eq('partner_id', partnerData.id)
        .eq('approval_status', 'approved')
        .order('created_at', { ascending: false });

      if (reviewsError) {
        throw new Error('Bewertungen für diesen Partner konnten nicht geladen werden.');
      }
      setReviews(reviewsData);

      const totalRating = reviewsData.reduce((acc, review) => acc + review.rating, 0);
      const avgRating = reviewsData.length > 0 ? (totalRating / reviewsData.length) : 0;
      setAverageRating(avgRating);
      setReviewCount(reviewsData.length);

    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Fehler',
        description: error.message,
      });
      router.push('/404');
    } finally {
      setLoading(false);
    }
  }, [slug, toast, navigate]);

  useEffect(() => {
    fetchPartnerData();
  }, [fetchPartnerData]);

  // Removed language parameter handling - DE-only now
  // Query parameters are still cleaned up if present
  useEffect(() => {
    const searchParams = new URLSearchParams(searchParams?.toString());
    const hasLangParams = searchParams.has('lang') || searchParams.has('lng');
    
    if (hasLangParams && pathname.startsWith('/partner/')) {
      // Query parametrelerini kaldırarak temiz URL'e yönlendir
      router.push(pathname, { replace: true });
    }
  }, [pathname, searchParams?.toString(), navigate]);

  const handleGetOffer = () => {
    router.push('/kostenlose-offerte-anfordern', { state: { preselectedPartner: partner } });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Loader2 className="h-16 w-16 animate-spin text-green-600" />
      </div>
    );
  }

  if (!partner) {
    return null;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": partner.company_name,
    "image": partner.logo_url,
    "url": `https://online-offerten.ch/partner/${partner.slug}`,
    "telephone": partner.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": partner.address_street,
      "addressLocality": partner.address_city,
      "postalCode": partner.address_zip,
      "addressCountry": "CH"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating.toFixed(1),
      "reviewCount": reviewCount
    },
    "review": reviews.map(r => ({
      "@type": "Review",
      "author": {"@type": "Person", "name": r.customer_name},
      "datePublished": r.review_date,
      "reviewBody": r.review_text,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": r.rating
      }
    }))
  };

  const canonicalUrl = `https://online-offerten.ch/partner/${partner.slug}`;

  return (
    <>
      
      <div className="bg-gray-50 min-h-screen">
        <PartnerHero 
          partner={{
            ...partner,
            average_rating: averageRating,
            review_count: reviewCount
          }} 
          onGetOffer={handleGetOffer}
        />

        <div className="container mx-auto max-w-navbar px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <main className="lg:col-span-2 space-y-8">
              <ReviewsSection reviews={reviews} reviewCount={reviewCount} formatDate={formatDate} />
              
              {partner.message && (
                <Card className="shadow-lg rounded-xl border border-gray-200 bg-white">
                  <CardHeader className="p-6 border-b border-gray-100">
                    <CardTitle className="text-xl font-bold text-gray-800">Über Uns</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-600 whitespace-pre-wrap">{partner.message}</p>
                  </CardContent>
                </Card>
              )}
              
              <ImageGallery images={partner.gallery_images} />

            </main>

            <aside className="lg:sticky top-24 self-start space-y-8">
              <Sidebar partner={partner} averageRating={averageRating} reviewCount={reviewCount} onGetOffer={handleGetOffer} />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerProfilePage;