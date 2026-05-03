import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

/**
 * DEAKTIVIERT (03.05.2026):
 * Versicherungsdokumente sind nun ein optionales Vertrauenssignal
 * (Verifizierungs-Badge im Profil). Es werden keine automatischen
 * Ablauf-Erinnerungs-Emails mehr versendet und Profile werden nicht
 * mehr automatisch gesperrt.
 *
 * Diese Funktion ist absichtlich ein No-Op, falls der Cron-Job in
 * Supabase noch existiert. Bitte zusätzlich den Cron-Job entfernen.
 */
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: 'check-insurance-expiry is disabled. Insurance is now an optional trust signal only.',
      emailsSent: 0,
      expiredCount: 0,
      reminderCount: 0,
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
  );
});
