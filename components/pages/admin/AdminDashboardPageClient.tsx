'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Loader2 } from 'lucide-react';
import AdminPanel from '@/src/components/AdminPanel/AdminPanel';

const AdminDashboardPageClient = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || user.user_metadata?.role !== 'admin') {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

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