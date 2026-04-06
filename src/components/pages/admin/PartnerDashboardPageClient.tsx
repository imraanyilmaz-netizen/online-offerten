'use client'

import React, { Suspense, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/src/lib/supabase/client';
import PartnerPanel from '@/src/components/PartnerPanel';
import { Loader2 } from 'lucide-react';

const LoadingFallback = () => (
  <div className="flex flex-col justify-center items-center h-screen bg-slate-50 text-slate-700">
    <Loader2 className="w-16 h-16 animate-spin text-green-600 mb-4" />
  </div>
);

const PartnerDashboardPageClient = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<any>(null);
  const [companyName, setCompanyName] = useState('');

  // Client-only auth check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient();
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          console.log('[PartnerDashboardPageClient] No session, redirecting to /login');
          router.replace('/login');
          return;
        }

        // Always validate session token server-side to avoid stale/broken client-only sessions.
        const { data: { user: verifiedUser }, error: userError } = await supabase.auth.getUser(session.access_token);
        if (userError || !verifiedUser) {
          console.log('[PartnerDashboardPageClient] Invalid session on getUser, redirecting to /login');
          try {
            await supabase.auth.signOut();
          } catch (signOutError) {
            console.warn('[PartnerDashboardPageClient] signOut after failed getUser:', signOutError);
          }
          router.replace('/login?reason=session_expired');
          return;
        }

        const userRole = verifiedUser.user_metadata?.role ?? verifiedUser.app_metadata?.role;
        
        if (userRole !== 'partner') {
          console.log('[PartnerDashboardPageClient] User is not partner, redirecting to /');
          router.replace('/');
          return;
        }

        // User is partner - allow access
        setUser(verifiedUser);
        setLoading(false);
      } catch (error) {
        console.error('[PartnerDashboardPageClient] Auth check error:', error);
        router.replace('/login');
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <LoadingFallback />;
  }

  const role = user?.user_metadata?.role ?? user?.app_metadata?.role;
  if (!user || role !== 'partner') {
    return null;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <PartnerPanel setCompanyName={setCompanyName} />
    </Suspense>
  );
};

export default PartnerDashboardPageClient;


