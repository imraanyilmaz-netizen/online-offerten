import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(undefined);

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
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        }
        handleSession(session);
      } catch (error) {
        console.error('Unexpected error getting session:', error);
        setLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        handleSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, [handleSession]);

  const signUp = useCallback(async (email, password) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Sign up error:', error);
        toast({
          variant: "destructive",
          title: "Registrierung fehlgeschlagen",
          description: error.message || "Ein Fehler ist aufgetreten",
        });
      }

      return { error };
    } catch (error) {
      console.error('Unexpected sign up error:', error);
      toast({
        variant: "destructive",
        title: "Registrierung fehlgeschlagen",
        description: "Ein unerwarteter Fehler ist aufgetreten",
      });
      return { error };
    }
  }, [toast]);

  const signIn = useCallback(async (email, password) => {
    try {
      console.log('Attempting sign in with:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        return { error };
      }

      console.log('Sign in successful:', data.user?.email);
      return { error: null };
    } catch (error) {
      console.error('Unexpected sign in error:', error);
      return { error };
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        // Treat 'session_not_found' as a non-critical error, as the user is effectively logged out.
        if (error.message.includes('session_not_found')) {
          console.warn('Sign out attempted with an invalid session, but user is already out.');
          return { error: null }; // Return no error to proceed with UI update
        }
        
        console.error('Sign out error:', error);
        toast({
          variant: "destructive",
          title: "Abmeldung fehlgeschlagen",
          description: error.message || "Ein Fehler ist aufgetreten",
        });
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      console.error('Unexpected sign out error:', error);
      toast({
        variant: "destructive",
        title: "Abmeldung fehlgeschlagen",
        description: "Ein unerwarteter Fehler ist aufgetreten",
      });
      return { error };
    }
  }, [toast]);

  const value = useMemo(() => ({
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  }), [user, session, loading, signUp, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};