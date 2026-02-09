import React from 'react';
import { motion } from 'framer-motion';
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="space-y-5">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
              >
                <ReviewCard review={review} formatDate={formatDate} />
              </motion.div>
            ))}
          </div>
          {reviewCount > reviews.length && (
            <div className="text-center mt-8">
              <Button variant="outline" onClick={onShowAllReviews} className="text-green-600 border-green-500 hover:bg-green-50 font-semibold">
                Alle {reviewCount} Bewertungen anzeigen
              </Button>
            </div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ReviewsSection;