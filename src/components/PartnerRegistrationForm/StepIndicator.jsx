import React from 'react';
import { Check } from 'lucide-react';

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between items-start relative">
        <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-200 transform -translate-y-1/2"></div>
        <div className="absolute top-5 left-0 h-0.5 bg-blue-600 transform -translate-y-1/2 transition-all duration-500" style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}></div>
        {steps.map(s => (
          <div key={s.id} className="z-10 text-center w-1/3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-2 transition-colors duration-300 ${currentStep >= s.id ? 'bg-blue-600 text-white' : 'bg-white border-2 border-slate-300 text-slate-500'}`}>
              {currentStep > s.id ? <Check className="w-6 h-6" /> : s.id}
            </div>
            <p className="text-xs md:text-sm text-slate-600 font-medium">{s.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;