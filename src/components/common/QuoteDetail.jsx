import React from 'react';

export const QuoteDetail = ({ label, value, icon: Icon, className = "" }) => {
  if (!value && typeof value !== 'boolean' && value !== 0) return null;
  
  const displayValue = typeof value === 'boolean' ? (value ? 'Ja' : 'Nein') : value;

  return (
    <div className={`flex items-start gap-2 text-sm ${className}`}>
      {Icon && <Icon className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />}
      <div><span className="font-bold text-gray-800">{label}:</span> <span className="text-gray-700">{displayValue}</span></div>
    </div>
  );
};