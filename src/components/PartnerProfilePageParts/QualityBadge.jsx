import React from 'react';
import { Badge } from '@/components/ui/badge';

const getBadgeClass = (tier) => {
  switch (tier) {
    case 'gold':
      return 'bg-yellow-400 text-yellow-900 border-yellow-500';
    case 'silver':
      return 'bg-gray-300 text-gray-800 border-gray-400';
    case 'bronze':
      return 'bg-yellow-600 text-white border-yellow-700';
    default:
      return 'bg-slate-200 text-slate-800 border-slate-300';
  }
};

const QualityBadge = ({ tier }) => {
  if (!tier) return null;
  const label = `${String(tier).charAt(0).toUpperCase()}${String(tier).slice(1)} Partner`;
  return (
    <Badge className={`text-xs font-bold uppercase tracking-wider ${getBadgeClass(tier)}`}>
      {label}
    </Badge>
  );
};

export default QualityBadge;
