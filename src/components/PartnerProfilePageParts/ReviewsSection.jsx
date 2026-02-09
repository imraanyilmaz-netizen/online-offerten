import React from 'react';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import ReviewCard from '@/components/PartnerProfilePageParts/ReviewCard';
// Removed useTranslation
import { MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ReviewsSection = ({ reviews, reviewCount, formatDate, onShowAllReviews }) => {
  // Removed useTranslation

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <Card className="shadow-lg rounded-xl border border-gray-200 bg-white">
      <CardHeader className="p-6 border-b border-gray-100">
        <CardTitle className="text-xl font-bold text-gray-800">Kundenbewertungen</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div
        >
          <div className="space-y-5">
            {reviews.map((review, index) => (
              <div
                key={review.id}
              >
                <ReviewCard review={review} formatDate={formatDate} />
              </div>
            ))}
          </div>
          {reviewCount > reviews.length && (
            <div className="text-center mt-8">
              <Button variant="outline" onClick={onShowAllReviews} className="text-green-600 border-green-500 hover:bg-green-50 font-semibold">
                Alle {reviewCount} Bewertungen anzeigen
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewsSection;