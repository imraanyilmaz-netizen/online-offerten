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

  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Give auth context time to initialize after page load
    // This is especially important after login redirect
    const checkAuth = setTimeout(() => {
      setIsChecking(false);
    }, 500);

    return () => clearTimeout(checkAuth);
  }, []);

  useEffect(() => {
    // Only redirect if we've finished initial check AND loading is complete AND user is not partner
    if (!isChecking && !loading && (!user || user.user_metadata?.role !== 'partner')) {
      router.push('/login?redirect=partner-dashboard');
    }
  }, [user, loading, router, isChecking]);

  const pageTitle = companyName 
    ? `${companyName} - Partner-Dashboard` 
    : 'Partner-Dashboard';

  // Show loading while checking or auth context is loading
  if (isChecking || loading) {
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