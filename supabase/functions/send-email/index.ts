import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from 'npm:resend@1.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

const createAdminEmailHtml = (quoteDetails)=>{
  const { servicetype, firstname, lastname, email, phone, preferredtime, quoteswanted, from_street, from_zip, from_city, from_rooms, move_date, additional_services_piano, how_found, salutation, from_country, to_country, move_date_flexible } = quoteDetails;
  const formattedDate = move_date ? new Date(move_date).toLocaleDateString('de-DE') : 'N/A';
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; }
        .details { border: 1px solid #ddd; padding: 15px; border-radius: 5px; background-color: #f9f9f9; margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 8px; border-bottom: 1px solid #eee; }
        td:first-child { font-weight: bold; width: 150px; }
        .button { display: inline-block; padding: 12px 24px; background-color: #28a745; color: #fff; text-decoration: none; border-radius: 5px; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Neue Offertanfrage erhalten</h1>
        <p>Sie haben eine neue Offertanfrage über Ihre Webseite erhalten. Hier sind die Details:</p>
        
        <div class="details">
          <table>
            <tr><td><strong>Dienstleistung:</strong></td><td>${servicetype || 'N/A'}</td></tr>
            <tr><td><strong>Anrede:</strong></td><td>${salutation || 'N/A'}</td></tr>
            <tr><td><strong>Vorname:</strong></td><td>${firstname || 'N/A'}</td></tr>
            <tr><td><strong>Nachname:</strong></td><td>${lastname || 'N/A'}</td></tr>
            <tr><td><strong>E-Mail:</strong></td><td>${email || 'N/A'}</td></tr>
            <tr><td><strong>Telefon:</strong></td><td>${phone || 'N/A'}</td></tr>
            <tr><td><strong>Gewünschte Zeit:</strong></td><td>${preferredtime || 'N/A'}</td></tr>
            <tr><td><strong>Anzahl Offerten:</strong></td><td>${quoteswanted || 'N/A'}</td></tr>
            <tr><td><strong>Von (Strasse):</strong></td><td>${from_street || 'N/A'}</td></tr>
            <tr><td><strong>Von (PLZ):</strong></td><td>${from_zip || 'N/A'}</td></tr>
            <tr><td><strong>Von (Stadt):</strong></td><td>${from_city || 'N/A'}</td></tr>
            <tr><td><strong>Von (Land):</strong></td><td>${from_country || 'N/A'}</td></tr>
            <tr><td><strong>Anzahl Zimmer:</strong></td><td>${from_rooms || 'N/A'}</td></tr>
            <tr><td><strong>Nach (Land):</strong></td><td>${to_country || 'N/A'}</td></tr>
            <tr><td><strong>Umzugsdatum:</strong></td><td>${formattedDate}</td></tr>
            <tr><td><strong>Datum flexibel:</strong></td><td>${move_date_flexible ? 'Ja' : 'Nein'}</td></tr>
            <tr><td><strong>Klaviertransport:</strong></td><td>${additional_services_piano ? 'Ja' : 'Nein'}</td></tr>
            <tr><td><strong>Wie gefunden:</strong></td><td>${how_found || 'N/A'}</td></tr>
          </table>
        </div>
        
        <p>
          <a href="https://online-offerten.ch/admin-dashboard" class="button">
            Anfrage im Dashboard ansehen
          </a>
        </p>
        
        <div class="footer">
          <p>Diese E-Mail wurde automatisch von online-offerten.ch generiert.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const createCustomerEmailHtml = (quoteDetails)=>{
  const { lastname, salutation, id } = quoteDetails;
  const statusLink = `https://online-offerten.ch/anfrage-status/${id}`;
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; }
        .button { display: inline-block; padding: 12px 24px; background-color: #28a745; color: #fff; text-decoration: none; border-radius: 5px; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Ihre Anfrage wurde erfolgreich übermittelt!</h1>
        <p>Sehr geehrte/r ${salutation || ''} ${lastname || ''},</p>
        
        <p>vielen Dank für Ihre Anfrage bei Online-Offerten.ch. Wir haben Ihre Daten erhalten und werden diese umgehend bearbeiten. In Kürze erhalten Sie passende und unverbindliche Offerten von unseren geprüften Partnern.</p>
        
        <p>Sie können den Status Ihrer Anfrage jederzeit über den folgenden Link verfolgen:</p>
        
        <p style="text-align: center; margin: 30px 0;">
          <a href="${statusLink}" class="button">
            Status Ihrer Anfrage ansehen
          </a>
        </p>
        
        <p>Bei Fragen stehen wir Ihnen gerne zur Verfügung.</p>
        
        <div class="footer">
          <p><strong>Freundliche Grüsse,</strong><br>
          Ihr Team von Online-Offerten.ch</p>
          <p><em>Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht auf diese E-Mail.</em></p>
        </div>
      </div>
    </body>
    </html>
  `;
};

serve(async (req)=>{
  console.log('🚀 FUNCTION STARTED - send-email');
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }
  try {
    if (!req.body) {
      throw new Error('Request body is missing');
    }
    const { quoteId } = await req.json();
    console.log('📦 Received quoteId:', quoteId);

    if (!quoteId) {
      throw new Error('Quote ID is required');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials are missing');
    }
    const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is missing');
    }
    const resend = new Resend(RESEND_API_KEY);

    console.log('🔍 Fetching quote details for ID:', quoteId);
    const { data: quoteDetails, error: quoteError } = await supabaseAdmin.from('quotes').select('*').eq('id', quoteId).single();
    if (quoteError) {
      console.error('❌ Quote error:', quoteError);
      throw new Error(`Quote not found: ${quoteError.message}`);
    }
    if (!quoteDetails) {
      throw new Error('Quote not found in database');
    }
    console.log('✅ Quote details found for:', quoteDetails.email);

    console.log('📧 Confirming email for quote:', quoteId);
    const { error: confirmError } = await supabaseAdmin.rpc('confirm_email', {
      p_quote_id: quoteId
    });
    if (confirmError) {
      console.error('⚠️ Email confirmation failed (continuing anyway):', confirmError);
    } else {
      console.log('✅ Email confirmed successfully');
    }

    console.log('📧 Sending admin email...');
    const adminEmailHtml = createAdminEmailHtml(quoteDetails);
    const { data: adminResult, error: adminError } = await resend.emails.send({
      from: 'Online-Offerten.ch <info@online-offerten.ch>',
      to: ['info@online-offerten.ch'],
      subject: `Neue Offertanfrage: ${quoteDetails.servicetype} von ${quoteDetails.firstname} ${quoteDetails.lastname}`,
      html: adminEmailHtml
    });
    if (adminError) {
      console.error('❌ Admin email failed:', adminError);
      // We don't throw here, to allow customer email to be sent anyway
    } else {
      console.log('✅ Admin email sent:', adminResult?.id);
    }

    console.log('📧 Sending customer email...');
    const customerEmailHtml = createCustomerEmailHtml(quoteDetails);
    const { data: customerResult, error: customerError } = await resend.emails.send({
      from: 'Online-Offerten.ch <info@online-offerten.ch>',
      to: [quoteDetails.email],
      subject: 'Ihre Anfrage wurde erfolgreich übermittelt!',
      html: customerEmailHtml
    });
    if (customerError) {
      console.error('❌ Customer email failed:', customerError);
      throw new Error(`Customer email failed: ${JSON.stringify(customerError)}`);
    }
    console.log('✅ Customer email sent:', customerResult?.id);

    return new Response(JSON.stringify({
      success: true,
      message: 'Both admin and customer emails processed.',
      adminEmailId: adminResult?.id,
      customerEmailId: customerResult?.id,
      quoteId: quoteId,
      emailConfirmed: !confirmError
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    console.error('💥 FUNCTION ERROR:', error);
    return new Response(JSON.stringify({
      error: error.message,
      success: false
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});