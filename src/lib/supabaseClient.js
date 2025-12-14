import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uhkiaodpzvhsuqfrwgih.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoa2lhb2RwenZoc3VxZnJ3Z2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NzY4NDAsImV4cCI6MjA2NTE1Mjg0MH0.PI2YNNYtcUgQYooV-6z2P6qK-1tIQF8DL7oILhfHmDg';

// Singleton pattern to prevent multiple instances
let supabaseInstance = null;

if (!supabaseInstance) {
  // Check if we're in a browser environment
  const isBrowser = typeof window !== 'undefined';
  
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: isBrowser,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: isBrowser ? window.localStorage : undefined
    }
  });
}

export const supabase = supabaseInstance;