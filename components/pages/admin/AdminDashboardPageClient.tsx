'use client'

import React from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Loader2 } from 'lucide-react';
import AdminPanel from '@/src/components/AdminPanel/AdminPanel';

const AdminDashboardPageClient = () => {
  const { user, loading } = useAuth();

  // Debug logging
  React.useEffect(() => {
    console.log('[AdminDashboardPageClient] State:', { 
      loading, 
      hasUser: !!user, 
      userEmail: user?.email,
      userRole: user?.user_metadata?.role 
    })
  }, [user, loading])

  // Middleware handles route protection and redirects
  // We only show loading state here
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
          <p className="mt-4 text-lg text-gray-600">Laden...</p>
        </div>
      </div>
    );
  }

  // If user is not admin after loading completes, show error
  // Middleware should have redirected already, but show message just in case
  if (!loading && (!user || user.user_metadata?.role !== 'admin')) {
    console.log('[AdminDashboardPageClient] User not admin or missing:', { 
      hasUser: !!user, 
      userRole: user?.user_metadata?.role 
    })
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
          <p className="mt-4 text-lg text-gray-600">Weiterleitung...</p>
        </div>
      </div>
    );
  }

  // Only render AdminPanel if we have confirmed admin user
  if (!user || user.user_metadata?.role !== 'admin') {
    return null
  }

  return (
      <div className="min-h-screen bg-gray-50">
        <AdminPanel />
      </div>
  );
};

export default AdminDashboardPageClient;
