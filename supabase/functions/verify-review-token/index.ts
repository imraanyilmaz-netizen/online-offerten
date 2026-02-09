import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.30.0';
import { corsHeaders } from '../_shared/cors.ts';

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );
    
    const { quoteId, token } = await req.json();

    if (!quoteId || !token) {
      throw new Error("Quote ID and token are required.");
    }
    
    // 1. Verify the quote and token
    const { data: quote, error: quoteError } = await supabaseClient
      .from('quotes')
      .select('id, email, firstname, lastname')
      .eq('id', quoteId)
      .eq('review_token', token)
      .single();

    if (quoteError || !quote) {
      throw new Error("Invalid quote ID or token.");
    }

    // 2. Check if any partner has purchased this quote
    const { data: purchaseData, error: purchaseError } = await supabaseClient
        .from('purchased_quotes')
        .select('partner_id')
        .eq('quote_id', quoteId)
        .limit(1); // Get the first one, assuming one is enough for review

    if (purchaseError) {
        throw new Error('Error checking for purchased quotes.');
    }
    
    let partnerData = null;
    if (purchaseData && purchaseData.length > 0) {
        const partnerId = purchaseData[0].partner_id;
        const { data: partner, error: partnerError } = await supabaseClient
            .from('partners')
            .select('id, company_name')
            .eq('id', partnerId)
            .single();

        if (partnerError) {
             throw new Error('Error fetching partner details.');
        }
        partnerData = partner;
    }
    
    return new Response(JSON.stringify({ 
      success: true, 
      quote: quote,
      partner: partnerData // This will be null if no partner purchased the quote
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error verifying review token:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});