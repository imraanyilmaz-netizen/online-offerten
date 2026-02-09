import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
// framer-motion removed - CSS for better INP
import { Star, UserCircle2, Globe, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PlatformReviewCard = ({ review }) => {
  const { 
      customer_name, 
      rating, 
      review_text, 
      review_date, 
      city
  } = review;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
  
  const overallRating = rating || 0;

  return (
    <Card className="h-full flex flex-col transition-all duration-300 shadow-lg hover:shadow-2xl rounded-xl border border-gray-200/80 overflow-hidden bg-white">
      <CardHeader className="p-5 bg-gray-50/50 border-b">
         <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                  <UserCircle2 size={32} className="text-gray-400" />
                  <div>
                      <p className="text-base font-bold text-gray-800">{customer_name || 'Anonym'}</p>
                      <p className="text-sm text-gray-500">{city || 'Unbekannter Ort'}</p>
                  </div>
              </div>
              <div className="flex items-center gap-1 text-yellow-400 shrink-0">
                  <p className="text-lg font-bold text-gray-800 mr-1">{overallRating.toFixed(1)}</p>
                  <Star size={20} className="fill-current"/>
              </div>
          </div>
      </CardHeader>
      <CardContent className="p-5 flex-grow flex flex-col justify-between">
        <blockquote className="text-gray-700 text-base italic leading-relaxed mb-5">
            <MessageSquare className="w-5 h-5 text-gray-300 inline-block mr-2 -mt-1" />
            "{review_text}"
        </blockquote>
        <div className="flex justify-between items-center mt-4 text-xs text-gray-400 pt-3 border-t border-gray-100">
          <Badge variant="secondary" className="bg-green-100 text-green-800 font-semibold">Verifiziert</Badge>
          <span>{formatDate(review_date)}</span>
        </div>
      </CardContent>
    </Card>
  );
};


const PlatformReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('customer_reviews')
        .select('*')
        .eq('review_type', 'platform')
        .eq('approval_status', 'approved')
        .eq('show_on_homepage', true)
        .order('review_date', { ascending: false });
      
      if (error) {
        console.error('Error fetching platform reviews:', error);
      } else {
        setReviews(data);
      }
      setLoading(false);
    };
    
    fetchReviews();
  }, []);

  if (loading) {
      return (
          <div className="py-24 text-center">
              <p className="text-gray-500">Lade Bewertungen...</p>
          </div>
      );
  }

  if (reviews.length === 0) return null;

  return (
    <div className="bg-slate-50 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div
            className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Was unsere Kunden über die Plattform sagen</h2>
          <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">
            Wir sind stolz auf das positive Feedback, das wir für unseren Service erhalten.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
                 <div 
                    key={review.id}
                 >
                    <PlatformReviewCard review={review} />
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PlatformReviews;