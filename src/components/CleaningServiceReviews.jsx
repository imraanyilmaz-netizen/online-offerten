import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full bg-white shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-base">{review.customer_name}</p>
                      {review.city && <p className="text-sm text-gray-500">{review.city}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={18} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-base text-gray-800">{(review.rating || 0).toFixed(1)}</span>
                  </div>
                </div>

                {review.review_text && (
                  <p className="text-gray-700 text-base italic mb-4 leading-relaxed">
                    "{review.review_text}"
                  </p>
                )}

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">{formatDate(review.review_date)}</p>
                  {review.partners && review.partners.company_name && (
                    <p className="text-xs text-gray-500 mt-1">
                      Für {review.partners.company_name}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CleaningServiceReviews;

