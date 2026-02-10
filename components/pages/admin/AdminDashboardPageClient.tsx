'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';
import AdminPanel from '@/src/components/AdminPanel/AdminPanel';

const AdminDashboardPageClient = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<any>(null);

  // Client-only auth check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient();
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          console.log('[AdminDashboardPageClient] No session, redirecting to /login');
          router.replace('/login');
          return;
        }

        const userRole = session.user?.user_metadata?.role;
        
        if (userRole !== 'admin') {
          console.log('[AdminDashboardPageClient] User is not admin, redirecting to /');
          router.replace('/');
          return;
        }

        // User is admin - allow access
        setUser(session.user);
        setLoading(false);
      } catch (error) {
        console.error('[AdminDashboardPageClient] Auth check error:', error);
        router.replace('/login');
      }
    };

    checkAuth();
  }, [router]);

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
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminPanel />
    </div>
  );
};

export default AdminDashboardPageClient;


