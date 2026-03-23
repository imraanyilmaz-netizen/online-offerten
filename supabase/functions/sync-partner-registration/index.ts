import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function normalizeEmail(e: string) {
  return (e || '').trim().toLowerCase();
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function slugify(name: string): string {
  const base = (name || 'partner')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return base || 'partner';
}

function makeSlug(companyName: string, userId: string): string {
  const suf = userId.replace(/-/g, '').slice(-10);
  return `${slugify(companyName)}-${suf}`.toLowerCase().slice(0, 120);
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
    const {
      userId,
      email,
      company_name,
      contact_person,
      phone,
      main_categories,
      offered_services,
      service_regions,
      address_street,
      address_zip,
      address_city,
      website,
      year_founded,
      employee_count,
      liability_insurance,
      commercial_register_number,
      message,
      agreed_to_terms,
    } = body as Record<string, unknown>;

    if (!userId || !email || typeof email !== 'string') {
      return new Response(
        JSON.stringify({ success: false, error: 'userId and email are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const { data: userData, error: userErr } = await admin.auth.admin.getUserById(String(userId));
    if (userErr || !userData?.user) {
      console.error('sync-partner-registration: getUserById failed', userErr);
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid user' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const u = userData.user;
    if (normalizeEmail(u.email || '') !== normalizeEmail(String(email))) {
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

    const yfRaw = year_founded;
    let yearParsed: number | null = null;
    if (yfRaw !== undefined && yfRaw !== null && String(yfRaw).trim() !== '') {
      const n = parseInt(String(yfRaw), 10);
      if (!Number.isNaN(n)) yearParsed = n;
    }

    const msgText = typeof message === 'string' ? message : '';

    const patch: Record<string, unknown> = {
      email: normalizeEmail(String(email)),
      company_name: company_name != null ? String(company_name) : '',
      contact_person: contact_person != null ? String(contact_person) : '',
      phone: phone != null ? String(phone) : '',
      main_categories: Array.isArray(main_categories) ? main_categories : [],
      offered_services: Array.isArray(offered_services) ? offered_services : [],
      service_regions: Array.isArray(service_regions) ? service_regions : [],
      address_street: address_street != null ? String(address_street) : '',
      address_zip: address_zip != null ? String(address_zip) : '',
      address_city: address_city != null ? String(address_city) : '',
      website: website != null ? String(website) : '',
      year_founded: yearParsed,
      employee_count: employee_count != null ? String(employee_count) : '',
      liability_insurance: liability_insurance === true,
      commercial_register_number: commercial_register_number != null ? String(commercial_register_number) : '',
      message: msgText,
      agreed_to_terms: agreed_to_terms === true,
      name: company_name != null ? String(company_name) : '',
    };

    let updated = false;
    for (let i = 0; i < 8; i++) {
      const { data: rows, error: upErr } = await admin
        .from('partners')
        .update(patch)
        .eq('id', String(userId))
        .select('id');

      if (!upErr && rows && rows.length > 0) {
        updated = true;
        break;
      }
      await sleep(350 * (i + 1));
    }

    if (!updated) {
      const slug = makeSlug(String(company_name || 'partner'), String(userId));
      const insertRow: Record<string, unknown> = {
        id: String(userId),
        ...patch,
        slug,
        status: 'pending',
      };

      const { error: insErr } = await admin.from('partners').insert(insertRow);
      if (insErr) {
        console.error('sync-partner-registration: insert failed', insErr);
        return new Response(
          JSON.stringify({
            success: false,
            error: insErr.message || 'Could not sync partner row',
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        );
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('sync-partner-registration error:', msg);
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
