import React from 'react';
// framer-motion removed - CSS for better INP

const TopPartnersList = ({ partners }) => {
  if (!partners || partners.length === 0) {
    return <p className="text-center text-gray-500 py-8">Noch keine Partner mit Umsatz</p>;
  }

  return (
    <div className="space-y-4">
      {partners.map((partner, index) => (
        <div
          key={partner.id}
          className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border"
        >
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-500'}`}>
              {index + 1}
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">{partner.company_name || partner.name}</h4>
              <p className="text-sm text-gray-600">{partner.total_purchases || 0} Käufe</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-green-600">CHF {(partner.total_revenue || 0).toLocaleString()}</p>
            <p className="text-sm text-gray-500">Gesamtumsatz</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopPartnersList;