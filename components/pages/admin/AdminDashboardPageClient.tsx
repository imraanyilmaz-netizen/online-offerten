'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Loader2 } from 'lucide-react';
import AdminPanel from '@/src/components/AdminPanel/AdminPanel';

const AdminDashboardPageClient = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
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
    // Only redirect if we've finished initial check AND loading is complete AND user is not admin
    if (!isChecking && !loading && (!user || user.user_metadata?.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, loading, router, isChecking]);

  // Show loading while checking or auth context is loading
  if (isChecking || loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
          <p className="mt-4 text-lg text-gray-600">Laden...</p>
        </div>
      </div>
    );
  }

  if (!user || user.user_metadata?.role !== 'admin') {
    return null; // Redirect is handled in useEffect
  }

  return (
    <>
      
      
      <div className="min-h-screen bg-gray-50">
        <AdminPanel />
      </div>
    </>
  );
};

export default AdminDashboardPageClient;