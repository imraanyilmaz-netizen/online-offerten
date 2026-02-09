import React from 'react';
// framer-motion removed - CSS for better INP

const RevenueChart = ({ data }) => {
  if (!data || data.length === 0) return <p className="text-center text-gray-500 py-8">Veri yok</p>;

  const maxRevenue = Math.max(...data.map(m => m.revenue), 0);

  return (
    <div className="space-y-4 h-56 flex flex-col justify-end">
      <div className="grid grid-cols-6 gap-4 h-full items-end">
        {data.map((month, index) => {
          const height = maxRevenue > 0 ? (month.revenue / maxRevenue) * 100 : 0;
          return (
            <div
              key={index}
              style={{ height: `${Math.max(height, 5)}%` }}
              className="bg-green-500 rounded-t flex items-end justify-center p-1 text-white text-xs font-medium group relative"
            >
              <div className="absolute -top-8 text-center text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                <div>CHF</div>
                <div>{Math.round(month.revenue).toLocaleString()}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-6 gap-4 text-xs text-center text-gray-500 border-t pt-2">
        {data.map((month, index) => (
          <div key={index}>{month.formattedMonth}</div>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;