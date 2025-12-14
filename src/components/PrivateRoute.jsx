'use client'

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Note: This component is kept for backward compatibility, but route protection
// is now handled by Next.js middleware (middleware.ts)
const PrivateRoute = ({ requiredRole, allowedRoles, children }) => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  // Support both requiredRole (single role) and allowedRoles (array of roles)
  const userRole = user?.user_metadata?.role;
  const isAuthorized = requiredRole 
    ? userRole === requiredRole 
    : allowedRoles 
      ? allowedRoles.includes(userRole)
      : true; // If no role requirement, allow access

  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast({
          variant: "destructive",
          title: "Zugriff verweigert",
          description: "Bitte melden Sie sich an, um auf diese Seite zuzugreifen.",
        });
        router.push('/login');
      } else if (!isAuthorized) {
        toast({
          variant: "destructive",
          title: "Nicht autorisiert",
          description: "Sie haben keine Berechtigung, diese Seite anzuzeigen.",
        });
        // Redirect to the appropriate dashboard if they are logged in but have the wrong role
        const homePath = userRole === 'admin' ? '/admin-dashboard' : '/';
        router.push(homePath);
      }
    }
  }, [loading, user, isAuthorized, toast, router, userRole]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-green-600" />
      </div>
    );
  }

  if (!user || !isAuthorized) {
    return null; // Redirect is handled in useEffect
  }

  return <>{children}</>;
};

export default PrivateRoute;
