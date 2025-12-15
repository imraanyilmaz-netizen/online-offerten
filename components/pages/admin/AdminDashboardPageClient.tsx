'use client'

import React from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Loader2 } from 'lucide-react';
import AdminPanel from '@/src/components/AdminPanel/AdminPanel';

const AdminDashboardPageClient = () => {
  const { user, loading } = useAuth();

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

  // If user is not admin, middleware will redirect
  // We just show loading or nothing while redirect happens
  if (!user || user.user_metadata?.role !== 'admin') {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
          <p className="mt-4 text-lg text-gray-600">Weiterleitung...</p>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-gray-50">
        <AdminPanel />
      </div>
  );
};

export default AdminDashboardPageClient;
