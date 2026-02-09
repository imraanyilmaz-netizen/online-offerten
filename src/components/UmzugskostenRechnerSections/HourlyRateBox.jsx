import React from 'react';
// framer-motion removed - CSS for better INP
import { Clock } from 'lucide-react';

const HourlyRateBox = () => {
  return (
    <div
      className="bg-blue-50 p-6 rounded-xl shadow-lg border-l-4 border-blue-500 my-8"
    >
      <div className="flex items-start">
        <Clock size={28} className="mr-4 text-blue-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Stundensätze von Umzugsfirmen</h3>
          <p className="text-gray-700">Die durchschnittlichen Stundensätze für einen Umzugshelfer liegen zwischen CHF 50 und CHF 80. Für einen LKW mit Fahrer können Sie mit CHF 120 bis CHF 180 pro Stunde rechnen. Diese Sätze sind oft in den Pauschalangeboten bereits enthalten.</p>
        </div>
      </div>
    </div>
  );
};

export default HourlyRateBox;