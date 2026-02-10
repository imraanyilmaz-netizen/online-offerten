import React from 'react';

export const QuoteDetail = ({ label, value, icon: Icon, className = "" }) => {
  if (!value && typeof value !== 'boolean' && value !== 0) return null;
  
  const displayValue = typeof value === 'boolean' ? (value ? 'Ja' : 'Nein') : value;

  return (
    <div className={`${className}`}>
      {Icon && <Icon className="w-4 h-4 text-gray-500 mb-1 flex-shrink-0" />}
      <div className="font-bold text-sm text-gray-800 mb-1">{label}</div>
      <div className="text-sm text-gray-800">{displayValue}</div>
    </div>
  );
};