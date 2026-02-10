import React, { useEffect, useState } from 'react';
// framer-motion removed - CSS for better INP
import { Star, User } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

const CleaningServiceReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        // Tüm temizlik servisleri için yorumları çek
        const cleaningServices = [
          'wohnungsreinigung',
          'hausreinigung', 
          'bueroreinigung',
          'unterhaltsreinigung',
          'baureinigung',
          'grundreinigung',
          'fensterreinigung',
          'bodenreinigung',
          'fassadenreinigung',
          'hofreinigung',
          'umzugsreinigung',
          'Wohnungsreinigung',
          'Hausreinigung',
          'Büroreinigung',
          'Unterhaltsreinigung',
          'Baureinigung',
          'Grundreinigung',
          'Fensterreinigung',
          'Bodenreinigung',
          'Fassadenreinigung',
          'Hofreinigung',
          'Umzugsreinigung'
        ];
        
        // Filter oluştur
        const orFilter = cleaningServices
          .map(service => `service_type.ilike.%${service}%`)
          .join(',');
        
        const { data, error } = await supabase
          .from('customer_reviews')
          .select(`
            id, customer_name, rating, city, review_date, 
            review_text, service_type, partner_name,
            partners (slug, company_name)
          `)
          .eq('approval_status', 'approved')
          .not('partner_id', 'is', null)
          .or(orFilter)
          .order('review_date', { ascending: false })
          .limit(5);

        if (error) {
          console.error('Error fetching cleaning reviews:', error);
        } else {
          setReviews(data || []);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">Lade Bewertungen...</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 md:mt-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 md:mb-8">Was unsere Kunden sagen</h2>
      {/* Mobil: Yatay kaydırılabilir, Desktop: 2 kolon grid */}
      <div className="overflow-x-auto -mx-4 px-4 pb-4 md:overflow-visible md:mx-0 md:px-0">
        <div className="flex gap-6 min-w-max md:grid md:grid-cols-2 md:min-w-0 md:gap-6">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="flex-shrink-0 w-[85vw] sm:w-[400px] md:w-auto md:flex-shrink"
            >
              <Card className="h-full bg-white shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow w-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-800 text-base truncate">{review.customer_name}</p>
                        {review.city && <p className="text-sm text-gray-500 truncate">{review.city}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star size={18} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-bold text-base text-gray-800">{(review.rating || 0).toFixed(1)}</span>
                    </div>
                  </div>

                  {review.review_text && (
                    <p className="text-body italic mb-4 break-words">
                      "{review.review_text}"
                    </p>
                  )}

                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">{formatDate(review.review_date)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CleaningServiceReviews;

