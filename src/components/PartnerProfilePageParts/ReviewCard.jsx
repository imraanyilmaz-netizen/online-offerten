import React from 'react';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import StarRating from '@/components/PartnerProfilePageParts/StarRating';
import { useStaticT } from '@/lib/staticTranslate';
    import { Star } from 'lucide-react';
import { getCustomerInitials } from '@/lib/utils';

    const DetailedStarRating = ({ label, rating }) => {
        if (rating === null || rating === undefined) return null;
        
        const totalStars = 5;
        const displayRating = Math.round(rating * 2) / 2;
        const fullStars = Math.floor(displayRating);
        const hasHalfStar = displayRating % 1 !== 0;
        const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{label}</span>
                <div className="flex items-center gap-2">
                    <div className="flex">
                       {[...Array(fullStars)].map((_, i) => (
                          <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                        {hasHalfStar && (
                          <div style={{ position: 'relative' }}>
                            <Star key="half-empty" className="w-4 h-4 text-muted-foreground/50" />
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', overflow: 'hidden' }}>
                                <Star key="half-full" className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            </div>
                          </div>
                        )}
                        {[...Array(emptyStars)].map((_, i) => (
                          <Star key={`empty-${i}`} className="w-4 h-4 text-muted-foreground/50" />
                        ))}
                    </div>
                    <span className="font-semibold text-foreground w-6 text-right">{rating.toFixed(1)}</span>
                </div>
            </div>
        );
    };

    const ReviewCard = ({ review, formatDate }) => {
      const { t } = useStaticT('partnerProfilePage');

      return (
        <Card className="bg-card text-card-foreground shadow-lg rounded-xl overflow-hidden border border-border">
          <CardHeader className="pb-3 pt-4 px-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full bg-muted border border-border flex items-center justify-center shrink-0"
                      aria-hidden
                    >
                      <span className="text-xs font-bold text-foreground tracking-tight select-none">
                        {getCustomerInitials(review.customer_name || '')}
                      </span>
                    </div>
                    <div>
                        <CardTitle className="text-base font-bold text-foreground">
                        {review.customer_name || t('anonymousUser')} 
                        {review.city && <span className="text-sm text-muted-foreground font-medium">, {review.city}</span>}
                        </CardTitle>
                        {review.review_date && (
                        <CardDescription className="text-sm text-muted-foreground">
                            {formatDate(review.review_date)}
                        </CardDescription>
                        )}
                    </div>
                </div>
              <StarRating rating={review.rating} starSize={18} showNumeric={true} />
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-4">
            {review.review_text && <p className="text-body mb-4">{review.review_text}</p>}
            
            <div className="space-y-1.5 pt-3 border-t border-border">
                <DetailedStarRating label="Preiseinhaltung" rating={review.rating_price} />
                <DetailedStarRating label="Arbeitsablauf" rating={review.rating_workflow} />
                <DetailedStarRating label="Administration" rating={review.rating_administration} />
            </div>

            {review.service_type && (
              <div className="mt-3">
                <span className="inline-block bg-green-100 dark:bg-emerald-950/55 text-green-800 dark:text-emerald-200 text-xs px-3 py-1 rounded-full font-medium border border-green-200/80 dark:border-emerald-800/60">
                  {review.service_type === 'privatumzug' ? 'Privatumzug' : 
                   review.service_type === 'geschaeftsumzug' ? 'Geschäftsumzug' : 
                   review.service_type}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      );
    };

    export default ReviewCard;