import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const VerifiedInsuranceBadge = ({ size = 'default', showLabel = true }) => {
  const sizeClasses = size === 'sm'
    ? 'text-[10px] px-2 py-0.5 gap-1'
    : 'text-xs px-2.5 py-1 gap-1.5';
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5';

  return (
    <Badge
      title="Diese Versicherung wurde von Online-Offerten.ch geprüft und bestätigt."
      className={`inline-flex items-center font-bold uppercase tracking-wider border bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-700 hover:bg-emerald-100 ${sizeClasses}`}
    >
      <ShieldCheck className={`${iconSize} flex-shrink-0`} />
      {showLabel && <span>Versichert</span>}
    </Badge>
  );
};

export default VerifiedInsuranceBadge;
