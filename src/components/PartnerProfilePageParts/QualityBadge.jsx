import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const QualityBadge = ({ titleKey, descriptionKey, icon: Icon = Star, iconColor = "text-amber-500" }) => {
  const { t } = useTranslation('partnerProfilePage');
  return (
    <Card className="shadow-lg rounded-xl border border-gray-200 bg-white">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconColor.replace('text-', 'bg-').replace('-500', '-100')}`}>
            <Icon size={22} className={iconColor} />
          </div>
          <div>
            <h4 className="text-base font-bold text-gray-800">{t(titleKey)}</h4>
            <p className="text-sm text-gray-600">{t(descriptionKey)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QualityBadge;