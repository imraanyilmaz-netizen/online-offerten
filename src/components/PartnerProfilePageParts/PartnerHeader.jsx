import React from 'react';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { ShieldCheck, Award } from 'lucide-react';
import StarRating from '@/components/PartnerProfilePageParts/StarRating';
import { useTranslation } from 'react-i18next';

const PartnerHeader = ({ partner, averageRating, reviewCount, onGetOffer }) => {
  const { t } = useTranslation('partnerProfilePage');

  const isGoldPartner = partner.status === 'gold' || (averageRating >= 4.5 && reviewCount >= 10); 

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex items-center gap-4">
          <div
            className="rounded-lg bg-green-100 flex items-center justify-center shadow-md border border-green-200 p-2"
          >
            <img 
              alt={`${partner.name} Logo`} 
              className="max-w-24 max-h-24 md:max-w-28 md:max-h-28 w-auto h-auto object-contain" 
              src={partner.logo_url || '/image/logo-icon.avif'} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/image/logo-icon.avif';
              }}
            />
          </div>
          <div className="flex-grow">
            <h1
              className="text-2xl md:text-3xl font-bold text-green-800"
            >
              {partner.name}
            </h1>
            <div
              className="mt-1"
            >
              <StarRating rating={averageRating} reviewCount={reviewCount} starSize={22} textSize="text-base" />
            </div>
          </div>
        </div>
        
        <div
          className="w-full sm:w-auto mt-4 sm:mt-0"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all w-full sm:w-auto px-8 py-3 border-0"
            onClick={onGetOffer}
          >
            {t('getQuoteButton')}
          </Button>
        </div>
      </div>
      {isGoldPartner && (
        <div
          className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-300 rounded-lg flex items-center gap-3 text-amber-700 shadow-sm max-w-md"
        >
          <Award size={24} className="text-amber-500 flex-shrink-0" />
          <div>
            <h3 className="font-semibold">{t('goldPartner')}</h3>
            <p className="text-xs">{t('goldPartnerDescription')}</p>
          </div>
        </div>
      )}
       {partner.status === 'verified' && !isGoldPartner && (
          <div
            className="mt-3 flex items-center text-sm text-green-600"
          >
            <ShieldCheck size={18} className="mr-1.5" />
            {t('verifiedPartner')}
          </div>
        )}
    </div>
  );
};

export default PartnerHeader;