import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get Stripe secret key from environment variables
    const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
    
    if (!STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not set');
      return new Response(
        JSON.stringify({ error: 'Stripe API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse request body
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (error) {
      console.error('Error parsing request body:', error);
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { amount, partnerId } = requestBody;

    // Log request for debugging
    console.log('Creating checkout session:', { amount, partnerId });

    // Validate input
    if (amount === undefined || amount === null || amount <= 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid amount. Amount must be greater than 0.' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!partnerId) {
      return new Response(
        JSON.stringify({ error: 'Partner ID is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify partner exists
    const { data: partner, error: partnerError } = await supabase
      .from('partners')
      .select('id, email, company_name')
      .eq('id', partnerId)
      .single();

    if (partnerError || !partner) {
      return new Response(
        JSON.stringify({ error: 'Partner not found' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create Stripe Checkout Session
    // Note: Stripe amounts are in cents, but we're receiving amount in the base currency
    // Assuming amount is in CHF, convert to cents
    const amountInCents = Math.round(amount * 100);

    // Get minimum amount from admin settings
    const { data: settingsData, error: settingsError } = await supabase
      .from('app_settings')
      .select('value')
      .eq('key', 'topup_settings')
      .single();

    let minAmount = 2; // Default minimum if not set in admin panel
    
    if (settingsError) {
      console.warn('Error fetching min amount from settings:', settingsError);
      // Continue with default value if settings query fails
    } else if (settingsData?.value?.min_amount) {
      minAmount = parseFloat(settingsData.value.min_amount);
      console.log('Min amount from admin settings:', minAmount);
    } else {
      console.log('Using default min amount:', minAmount);
    }

    // Ensure minAmount is a valid number
    if (isNaN(minAmount) || minAmount <= 0) {
      minAmount = 2; // Fallback to safe default
      console.warn('Invalid minAmount, using default:', minAmount);
    }

    const minAmountInCents = Math.round(minAmount * 100);
    console.log('Validating amount:', { 
      amount, 
      amountInCents, 
      minAmount, 
      minAmountInCents,
      isValid: amountInCents >= minAmountInCents 
    });

    // Validate amount against admin panel setting
    if (amountInCents < minAmountInCents) {
      return new Response(
        JSON.stringify({ 
          error: `Amount must be at least ${minAmount.toFixed(2)} CHF`,
          minAmount: minAmount,
          receivedAmount: amount
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const checkoutSessionUrl = `https://api.stripe.com/v1/checkout/sessions`;
    
    // Build form data for Stripe Checkout Session
    const formData = new URLSearchParams();
    
    // Required fields
    formData.append('mode', 'payment');
    formData.append('payment_method_types[]', 'card');
    
    // Line items - product information
    formData.append('line_items[0][price_data][currency]', 'chf');
    formData.append('line_items[0][price_data][product_data][name]', `Guthaben-Aufladung - ${partner.company_name || 'Partner'}`);
    formData.append('line_items[0][price_data][product_data][description]', `Guthaben-Aufladung für ${partner.company_name || 'Partner'}`);
    formData.append('line_items[0][price_data][unit_amount]', amountInCents.toString());
    formData.append('line_items[0][quantity]', '1');
    
    // Customer information
    if (partner.email) {
      formData.append('customer_email', partner.email);
    }
    
    // Metadata for tracking
    formData.append('metadata[partnerId]', partnerId);
    formData.append('metadata[amount]', amount.toString());
    formData.append('metadata[amountInCents]', amountInCents.toString());
    
    // URLs for embedded checkout
    const siteUrl = Deno.env.get('SITE_URL') || 'https://online-offerten.ch';
    formData.append('ui_mode', 'embedded');
    formData.append('return_url', `${siteUrl}/partner/payment-status?session_id={CHECKOUT_SESSION_ID}`);
    
    // Success and cancel URLs (still required even in embedded mode)
    formData.append('success_url', `${siteUrl}/partner/payment-status?success=true&session_id={CHECKOUT_SESSION_ID}`);
    formData.append('cancel_url', `${siteUrl}/partner/credit-top-up?canceled=true`);

    const stripeResponse = await fetch(checkoutSessionUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!stripeResponse.ok) {
      let errorData;
      const contentType = stripeResponse.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        errorData = await stripeResponse.json();
      } else {
        errorData = await stripeResponse.text();
      }
      
      console.error('Stripe API error:', {
        status: stripeResponse.status,
        statusText: stripeResponse.statusText,
        error: errorData
      });
      
      // Parse Stripe error message
      let errorMessage = `Stripe API error: ${stripeResponse.status} ${stripeResponse.statusText}`;
      if (errorData && typeof errorData === 'object') {
        if (errorData.error && errorData.error.message) {
          errorMessage = errorData.error.message;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      } else if (typeof errorData === 'string') {
        try {
          const parsed = JSON.parse(errorData);
          if (parsed.error && parsed.error.message) {
            errorMessage = parsed.error.message;
          }
        } catch {
          errorMessage = errorData;
        }
      }
      
      return new Response(
        JSON.stringify({ 
          error: errorMessage,
          status: stripeResponse.status,
          details: errorData 
        }),
        { 
          status: stripeResponse.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const checkoutSession = await stripeResponse.json();

    // Return client_secret for Embedded Checkout
    if (!checkoutSession.client_secret) {
      return new Response(
        JSON.stringify({ error: 'No client_secret returned from Stripe' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        clientSecret: checkoutSession.client_secret,
        sessionId: checkoutSession.id 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        details: error.toString() 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

