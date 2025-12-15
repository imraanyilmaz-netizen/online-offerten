'use client'

import React, { Suspense, useState } from 'react';
import PartnerPanel from '@/components/PartnerPanel';
import { Loader2 } from 'lucide-react';

const LoadingFallback = () => (
  <div className="flex flex-col justify-center items-center h-screen bg-slate-50 text-slate-700">
    <Loader2 className="w-16 h-16 animate-spin text-green-600 mb-4" />
  </div>
);

const PartnerDashboardPageClient = () => {
  const [companyName, setCompanyName] = useState('');

  const pageTitle = companyName 
    ? `${companyName} - Partner-Dashboard` 
    : 'Partner-Dashboard';

  return (
    <>
      
      <Suspense fallback={<LoadingFallback />}>
        <PartnerPanel setCompanyName={setCompanyName} />
      </Suspense>
    </>
  );
};

export default PartnerDashboardPageClient;