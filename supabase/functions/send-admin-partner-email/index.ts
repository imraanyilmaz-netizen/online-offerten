/**
 * Edge Function: send-admin-partner-email
 *
 * Sendet eine E-Mail von info@online-offerten.ch an einen Partner (E-Mail aus DB).
 * Nur für authentifizierte Benutzer mit Rolle admin oder editor.
 *
 * Body (JSON): { partnerId: string, subject: string, message: string }
 * Header: Authorization: Bearer <JWT>
 */
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from 'npm:resend@1.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const resendKey = Deno.env.get('RESEND_API_KEY');

    if (!supabaseUrl || !anonKey || !serviceKey) {
      throw new Error('Missing SUPABASE_URL, SUPABASE_ANON_KEY or SUPABASE_SERVICE_ROLE_KEY');
    }
    if (!resendKey) {
      throw new Error('RESEND_API_KEY is missing');
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Nicht angemeldet' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const {
      data: { user },
      error: userErr,
    } = await userClient.auth.getUser();

    if (userErr || !user) {
      console.error('send-admin-partner-email: getUser failed', userErr);
      return new Response(
        JSON.stringify({ success: false, error: 'Ungültige Sitzung' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const role = user.user_metadata?.role ?? user.app_metadata?.role;
    if (role !== 'admin' && role !== 'editor') {
      return new Response(
        JSON.stringify({ success: false, error: 'Keine Berechtigung' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const body = await req.json();
    const partnerId = typeof body.partnerId === 'string' ? body.partnerId.trim() : '';
    const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!partnerId || !subject || !message) {
      return new Response(
        JSON.stringify({ success: false, error: 'partnerId, subject und message sind erforderlich' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const admin = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: partner, error: partnerErr } = await admin
      .from('partners')
      .select('id, email, company_name')
      .eq('id', partnerId)
      .maybeSingle();

    if (partnerErr || !partner?.email) {
      console.error('send-admin-partner-email: partner fetch', partnerErr);
      return new Response(
        JSON.stringify({ success: false, error: 'Partner nicht gefunden oder keine E-Mail' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const htmlBody = `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8" /></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #1f2937;">
  <p>${escapeHtml(message).replace(/\r\n/g, '\n').split('\n').join('<br/>')}</p>
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
  <p style="font-size: 12px; color: #6b7280;">Diese Nachricht wurde Ihnen von <strong>Online-Offerten.ch</strong> gesendet.</p>
</body>
</html>`;

    const resend = new Resend(resendKey);
    const { data: sendData, error: sendErr } = await resend.emails.send({
      from: 'Online-Offerten.ch <info@online-offerten.ch>',
      to: [partner.email],
      subject,
      html: htmlBody,
    });

    if (sendErr) {
      console.error('send-admin-partner-email: Resend', sendErr);
      return new Response(
        JSON.stringify({ success: false, error: sendErr.message || 'Versand fehlgeschlagen' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        messageId: sendData?.id ?? null,
        to: partner.email,
        company: partner.company_name,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('send-admin-partner-email:', msg);
    return new Response(
      JSON.stringify({ success: false, error: msg }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
