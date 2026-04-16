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
    <Card className="shadow-lg rounded-xl border border-border bg-card text-card-foreground">
      <CardHeader className="p-6 border-b border-border">
        <CardTitle className="text-xl font-bold text-foreground">Kundenbewertungen</CardTitle>
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
              <Button variant="outline" onClick={onShowAllReviews} className="text-green-600 dark:text-emerald-400 border-green-500 dark:border-emerald-600 hover:bg-green-50 dark:hover:bg-emerald-950/40 font-semibold">
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