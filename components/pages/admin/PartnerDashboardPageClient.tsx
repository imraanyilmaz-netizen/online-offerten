'use client'

import React, { Suspense, useState } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import PartnerPanel from '@/src/components/PartnerPanel';
import { Loader2 } from 'lucide-react';

const LoadingFallback = () => (
  <div className="flex flex-col justify-center items-center h-screen bg-slate-50 text-slate-700">
    <Loader2 className="w-16 h-16 animate-spin text-green-600 mb-4" />
  </div>
);

const PartnerDashboardPageClient = () => {
  const { user, loading } = useAuth();
  const [companyName, setCompanyName] = useState('');

  const pageTitle = companyName 
    ? `${companyName} - Partner-Dashboard` 
    : 'Partner-Dashboard';

  // Debug logging
  React.useEffect(() => {
    console.log('[PartnerDashboardPageClient] State:', { 
      loading, 
      hasUser: !!user, 
      userEmail: user?.email,
      userRole: user?.user_metadata?.role 
    })
  }, [user, loading])

  // Middleware handles route protection and redirects
  // We only show loading state here
  if (loading) {
    return <LoadingFallback />;
  }

  // If user is not partner after loading completes, show error
  // Middleware should have redirected already, but show message just in case
  if (!loading && (!user || user.user_metadata?.role !== 'partner')) {
    console.log('[PartnerDashboardPageClient] User not partner or missing:', { 
      hasUser: !!user, 
      userRole: user?.user_metadata?.role 
    })
    return <LoadingFallback />;
  }

  // Only render PartnerPanel if we have confirmed partner user
  if (!user || user.user_metadata?.role !== 'partner') {
    return null
  }

  return (
      <Suspense fallback={<LoadingFallback />}>
        <PartnerPanel setCompanyName={setCompanyName} />
      </Suspense>
  );
};

export default PartnerDashboardPageClient;
