import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

// Supabase lazy loaded to reduce initial bundle size
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(undefined);

// Lazy load Supabase client - singleton pattern
let supabaseInstance = null;
let supabasePromise = null;

const getSupabase = async () => {
  if (supabaseInstance) return supabaseInstance;
  if (!supabasePromise) {
    supabasePromise = import('@/lib/customSupabaseClient').then(module => {
      supabaseInstance = module.supabase;
      return supabaseInstance;
    });
  }
  return supabasePromise;
};

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSession = useCallback(async (session) => {
    setSession(session);
    setUser(session?.user ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Defer Supabase loading until after initial render to reduce initial bundle impact
    // Use requestIdleCallback if available, otherwise use setTimeout
    const initAuth = () => {
    const getSession = async () => {
        const supabase = await getSupabase();
      const { data: { session } } = await supabase.auth.getSession();
      handleSession(session);
    };

    getSession();

      // Set up auth state listener after Supabase is loaded
      const setupAuthListener = async () => {
        const supabase = await getSupabase();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        handleSession(session);
      }
    );

    return () => subscription.unsubscribe();
      };

      let cleanup = null;
      setupAuthListener().then(unsubscribe => {
        cleanup = unsubscribe;
      });

      return () => {
        if (cleanup) cleanup();
      };
    };

    // Defer auth initialization to improve initial page load
    // Check if we're on a route that definitely needs auth
    const needsImmediateAuth = typeof window !== 'undefined' && (
      window.location.pathname.startsWith('/admin-dashboard') ||
      window.location.pathname.startsWith('/partner/') ||
      ['/login', '/forgot-password', '/partner-werden'].includes(window.location.pathname)
    );

    let timeoutId;
    let cleanupFn;

    if (needsImmediateAuth) {
      // For auth routes, initialize immediately
      cleanupFn = initAuth();
    } else {
      // For public routes (like homepage), defer auth check
      // Use requestIdleCallback for better performance, fallback to setTimeout
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        timeoutId = requestIdleCallback(initAuth, { timeout: 2000 });
      } else {
        timeoutId = setTimeout(initAuth, 100);
      }
    }

    return () => {
      if (timeoutId) {
        if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
          cancelIdleCallback(timeoutId);
        } else {
          clearTimeout(timeoutId);
        }
      }
      if (cleanupFn) cleanupFn();
    };
  }, [handleSession]);

  const signUp = useCallback(async (email, password, options) => {
    const supabase = await getSupabase();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign up Failed",
        description: error.message || "Something went wrong",
      });
    }

    return { error };
  }, [toast]);

  const signIn = useCallback(async (email, password) => {
    const supabase = await getSupabase();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign in Failed",
        description: error.message || "Something went wrong",
      });
    }

    return { error };
  }, [toast]);

  const signOut = useCallback(async () => {
    const supabase = await getSupabase();
    const { error } = await supabase.auth.signOut();

    // Gracefully handle cases where the session is already invalidated on the server
    if (error && error.message !== 'Session from session_id claim in JWT does not exist' && error.message !== 'Authentifizierungssitzung nicht gefunden.') {
      toast({
        variant: "destructive",
        title: "Sign out Failed",
        description: error.message || "Something went wrong",
      });
       return { error };
    } 
    
    // Even if there's a session_not_found error, we want the client to be logged out.
    // onAuthStateChange will handle setting user/session to null.
    // We return a null error to indicate success from the client's perspective.
    return { error: null };

  }, [toast]);

  // New function for updating user password
  const updateUserPassword = useCallback(async (newPassword) => {
    const supabase = await getSupabase();
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      toast({
        variant: "destructive",
        title: "Passwortaktualisierung fehlgeschlagen",
        description: error.message || "Etwas ist schiefgelaufen.",
      });
    } else {
      toast({
        title: "Passwort erfolgreich aktualisiert",
        description: "Ihr Passwort wurde erfolgreich geändert.",
      });
    }
    return { data, error };
  }, [toast]);


  const value = useMemo(() => ({
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateUserPassword, // Add the new function to the context value
  }), [user, session, loading, signUp, signIn, signOut, updateUserPassword]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};