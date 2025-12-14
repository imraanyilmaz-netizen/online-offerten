import { corsHeaders } from "./cors.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@16.2.0';

const stripe = new Stripe(Deno.env.get("STRIPE_LIVE_SECRET_KEY") ?? Deno.env.get("STRIPE_SECRET_KEY") ?? '', {
  apiVersion: "2024-06-20",
  httpClient: Stripe.createFetchHttpClient()
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders
    });
  }

  try {
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

    // Support both old format (sessionId + partnerId) and new format (checkoutSessionId)
    const sessionId = requestBody.sessionId || requestBody.checkoutSessionId || requestBody.session_id;
    const requestPartnerId = requestBody.partnerId;

    if (!sessionId) {
      return new Response(JSON.stringify({
        error: "Session ID is required. Please provide sessionId, checkoutSessionId, or session_id."
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    }

    // Get auth header for user verification
    const authHeader = req.headers.get("Authorization");
    
    // Create Supabase client - use service role if no auth header (for backward compatibility)
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? '';
    let supabaseClient;
    
    if (authHeader) {
      // Use authenticated client if auth header is provided
      supabaseClient = createClient(
        supabaseUrl,
        Deno.env.get("SUPABASE_ANON_KEY") ?? '',
        {
          global: {
            headers: {
              Authorization: authHeader
            }
          }
        }
      );

      // Verify user if auth header is provided
      const { data: { user }, error: userError } = await supabaseClient.auth.getUser();

      if (userError || !user) {
        return new Response(JSON.stringify({
          error: "Authentication failed"
        }), {
          status: 401,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        });
      }

      // If partnerId is provided, verify it matches the authenticated user
      if (requestPartnerId && user.id !== requestPartnerId) {
        return new Response(JSON.stringify({
          error: "Forbidden: User does not match requested partner ID."
        }), {
          status: 403,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        });
      }
    } else {
      // Use service role client if no auth header (for backward compatibility)
      supabaseClient = createClient(
        supabaseUrl,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ''
      );
    }

    // Retrieve checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent']
    });

    if (!session || !session.payment_intent) {
      return new Response(JSON.stringify({
        error: "Invalid session or payment intent not found."
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    }

    // @ts-ignore
    const paymentIntent = session.payment_intent;
    const metadataPartnerId = paymentIntent.metadata?.partner_id || session.metadata?.partnerId;

    // If partnerId was provided in request, verify it matches metadata
    if (requestPartnerId && metadataPartnerId && metadataPartnerId !== requestPartnerId) {
      return new Response(JSON.stringify({
        error: "Forbidden: Payment does not belong to this partner."
      }), {
        status: 403,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    }

    // Use metadata partnerId or request partnerId
    const finalPartnerId = metadataPartnerId || requestPartnerId;

    if (!finalPartnerId) {
      return new Response(JSON.stringify({
        error: "Partner ID not found in payment metadata or request."
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    }

    // Check if payment was successful
    if (session.status === 'complete' && paymentIntent.status === 'succeeded') {
      // Call handle_successful_payment RPC function
      const { error: rpcError } = await supabaseClient.rpc('handle_successful_payment', {
        p_partner_id: finalPartnerId,
        p_payment_intent_id: paymentIntent.id
      });

      if (rpcError) {
        console.error('RPC Error in handle_successful_payment:', rpcError);
        
        // Check for the duplicate warning
        if (rpcError.message && rpcError.message.includes('has already been processed')) {
          return new Response(JSON.stringify({
            success: true,
            message: 'Payment already processed.',
            alreadyProcessed: true
          }), {
            status: 200,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json"
            }
          });
        }

        return new Response(JSON.stringify({
          error: `Database Error: ${rpcError.message}`
        }), {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        });
      }

      return new Response(JSON.stringify({
        success: true,
        message: 'Payment verified and credits added.',
        partnerId: finalPartnerId,
        amount: session.amount_total ? session.amount_total / 100 : null
      }), {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    } else {
      return new Response(JSON.stringify({
        success: false,
        status: 'pending',
        message: `Payment not complete. Status: ${session.status}, Payment Status: ${paymentIntent.status}`
      }), {
        status: 402,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    }

  } catch (error) {
    console.error("Error verifying Stripe session:", error);
    return new Response(JSON.stringify({
      error: error.message || "Internal server error",
      details: error.toString()
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });
  }
});
