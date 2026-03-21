import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

function base64ToUint8Array(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function normalizeEmail(e: string) {
  return (e || '').trim().toLowerCase();
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !serviceKey) {
      throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    }

    const admin = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const body = await req.json();
    const { userId, email, fileBase64, fileName, mimeType } = body as {
      userId?: string;
      email?: string;
      fileBase64?: string;
      fileName?: string;
      mimeType?: string;
    };

    if (!userId || !email || !fileBase64 || !fileName) {
      return new Response(
        JSON.stringify({ success: false, error: 'userId, email, fileBase64 and fileName are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const { data: userData, error: userErr } = await admin.auth.admin.getUserById(userId);
    if (userErr || !userData?.user) {
      console.error('upload-partner-logo: getUserById failed', userErr);
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid user' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const u = userData.user;
    if (normalizeEmail(u.email || '') !== normalizeEmail(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email does not match user' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const role = u.user_metadata?.role ?? u.app_metadata?.role;
    if (role !== 'partner') {
      return new Response(
        JSON.stringify({ success: false, error: 'Not a partner account' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const bytes = base64ToUint8Array(fileBase64);
    if (bytes.length > MAX_BYTES) {
      return new Response(
        JSON.stringify({ success: false, error: 'File too large (max 5 MB)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const ext = (fileName.split('.').pop() || 'png').replace(/[^a-zA-Z0-9]/g, '').slice(0, 8) || 'png';
    const objectPath = `${userId}/${Date.now()}.${ext}`;
    const contentType = mimeType && mimeType.length < 120 ? mimeType : 'application/octet-stream';

    const { error: uploadError } = await admin.storage.from('partner-logos').upload(objectPath, bytes, {
      contentType,
      upsert: true,
    });

    if (uploadError) {
      console.error('upload-partner-logo: storage upload failed', uploadError);
      return new Response(
        JSON.stringify({ success: false, error: uploadError.message || 'Storage upload failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const { data: pub } = admin.storage.from('partner-logos').getPublicUrl(objectPath);
    const logoUrl = pub.publicUrl;

    let updated = false;
    for (let i = 0; i < 5; i++) {
      const { data: rows, error: upErr } = await admin
        .from('partners')
        .update({ logo_url: logoUrl })
        .eq('id', userId)
        .select('id');

      if (!upErr && rows && rows.length > 0) {
        updated = true;
        break;
      }
      await sleep(1500 * (i + 1));
    }

    if (!updated) {
      console.warn('upload-partner-logo: partners row not updated after retries; logo uploaded to storage:', objectPath);
    }

    try {
      await admin.auth.admin.updateUserById(userId, {
        user_metadata: { ...u.user_metadata, logo_url: logoUrl },
      });
    } catch (metaErr) {
      console.warn('upload-partner-logo: updateUserById metadata failed (non-fatal)', metaErr);
    }

    return new Response(
      JSON.stringify({ success: true, logoUrl, partnersUpdated: updated }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('upload-partner-logo error:', msg);
    return new Response(
      JSON.stringify({ success: false, error: msg }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
