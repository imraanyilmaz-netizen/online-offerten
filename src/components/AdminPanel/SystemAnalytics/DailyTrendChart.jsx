import React from 'react';
// framer-motion removed - CSS for better INP

const DailyTrendChart = ({ data }) => {
  if (!data || data.length === 0) return <p className="text-center text-gray-500 py-8">Veri yok</p>;

  const maxCount = Math.max(...data.map(d => d.count), 0);
  const displayData = data.slice(-7);

  return (
    <div className="space-y-4 h-48 flex flex-col justify-end">
      <div className="grid grid-cols-7 gap-2 h-full items-end">
        {displayData.map((day, index) => {
          const height = maxCount > 0 ? (day.count / maxCount) * 100 : 0;
          return (
            <div key={index} className="relative h-full flex items-end justify-center group">
              <div
                style={{ height: `${Math.max(height, 5)}%` }}
                className="w-full bg-blue-500 rounded-t"
              />
              <div className="absolute -top-6 text-xs font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                {day.count}
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-7 gap-2 text-xs text-center text-gray-500 border-t pt-2">
        {displayData.map((day, index) => (
          <div key={index}>{day.formattedDate}</div>
        ))}
      </div>
    </div>
  );
};

export default DailyTrendChart;