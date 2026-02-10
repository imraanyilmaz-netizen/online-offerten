import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, reviewCount, starSize = 20, textSize = 'text-sm', showNumeric = false }) => {
  const totalStars = 5;
  const displayRating = Math.round((rating || 0) * 2) / 2;
  const fullStars = Math.floor(displayRating);
  const hasHalfStar = displayRating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

  const getReviewText = () => {
    if (reviewCount === undefined || reviewCount === null) return '';
    if (reviewCount === 1) {
      return `(1 Bewertung)`;
    }
    return `(${reviewCount} Bewertungen)`;
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={starSize} className={`mr-0.5 text-yellow-400 fill-yellow-400`} />
        ))}
        {hasHalfStar && (
          <div style={{ position: 'relative' }}>
            <Star key="half-empty" size={starSize} className={`mr-0.5 text-gray-300`} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', overflow: 'hidden' }}>
              <Star key="half-full" size={starSize} className={`mr-0.5 text-yellow-400 fill-yellow-400`} />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={starSize} className={`mr-0.5 text-gray-300`} />
        ))}
      </div>
      <div className={`flex items-baseline gap-1.5 ${textSize}`}>
        {showNumeric && (
          <span className={`font-bold text-gray-700`}>{(rating || 0).toFixed(1)}</span>
        )}
        {reviewCount !== undefined && reviewCount !== null && (
          <span className={`text-gray-700 font-semibold`}>
            {(rating || 0).toFixed(1)} {getReviewText()}
          </span>
        )}
      </div>
    </div>
  );
};

export default StarRating;