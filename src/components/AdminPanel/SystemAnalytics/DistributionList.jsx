import React from 'react';
// framer-motion removed - CSS for better INP
import { Badge } from '@/components/ui/badge';

const DistributionList = ({ data, type }) => {
  if (!data || data.length === 0) return <p className="text-center text-gray-500 py-8">Veri yok</p>;

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-3">
      {data.map((item, index) => {
        const percentage = total > 0 ? (item.value / total) * 100 : 0;
        return (
          <div
            key={`${type}-${item.name}`}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }} />
              <span className="text-sm font-medium text-gray-700 truncate">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{item.value}</span>
              <Badge variant="outline" className="text-xs">{percentage.toFixed(1)}%</Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DistributionList;