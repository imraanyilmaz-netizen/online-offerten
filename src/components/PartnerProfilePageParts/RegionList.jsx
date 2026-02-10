import React from 'react';
import { Badge } from '@/components/ui/badge';
// Removed useTranslation
import { MapPin } from 'lucide-react';
import { getFullCantonName } from '@/lib/dataMapping';

const RegionList = ({ regions, titleKey }) => {
  // Removed useTranslation

  if (!regions || regions.length === 0) {
    return (
      <p className="text-base text-gray-500 italic">Keine Regionen aufgeführt.</p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {regions.map((region, index) => {
        const displayName = getFullCantonName(region);
        
        return (
          <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200 py-1.5 px-3 text-sm font-medium hover:bg-blue-200 transition-colors shadow-sm flex items-center gap-1.5">
            <MapPin size={14} className="text-blue-600 flex-shrink-0" />
            {displayName}
          </Badge>
        );
      })}
    </div>
  );
};

export default RegionList;