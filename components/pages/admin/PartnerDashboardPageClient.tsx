'use client'

import React, { Suspense, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import PartnerPanel from '@/components/PartnerPanel';
import { Loader2 } from 'lucide-react';

const LoadingFallback = () => (
  <div className="flex flex-col justify-center items-center h-screen bg-slate-50 text-slate-700">
    <Loader2 className="w-16 h-16 animate-spin text-green-600 mb-4" />
  </div>
);

const PartnerDashboardPageClient = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    if (!loading) {
      if (!user || user.user_metadata?.role !== 'partner') {
        router.push('/login?redirect=partner-dashboard');
      }
    }
  }, [user, loading, router]);

  const pageTitle = companyName 
    ? `${companyName} - Partner-Dashboard` 
    : 'Partner-Dashboard';

  if (loading) {
    return <LoadingFallback />;
  }

  if (!user || user.user_metadata?.role !== 'partner') {
    return null; // Redirect is handled in useEffect
  }

  return (
    <>
      
      <Suspense fallback={<LoadingFallback />}>
        <PartnerPanel setCompanyName={setCompanyName} />
      </Suspense>
    </>
  );
};

export default PartnerDashboardPageClient;