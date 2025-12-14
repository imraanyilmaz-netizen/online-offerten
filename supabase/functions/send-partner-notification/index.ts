import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Resend } from 'npm:resend@1.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const createAdminEmailHtml = (payload: any) => {
  const { email, partnerMetaData } = payload;
  const {
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
  } = partnerMetaData || {};

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
          .container { max-width: 650px; margin: 0 auto; }
          .details { border: 1px solid #ddd; padding: 15px; border-radius: 5px; background-color: #f9f9f9; margin: 20px 0; }
          table { width: 100%; border-collapse: collapse; }
          td { padding: 6px 8px; border-bottom: 1px solid #eee; vertical-align: top; }
          td.label { font-weight: bold; width: 180px; }
          .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Neue Partner-Registrierung</h1>
          <p>Es wurde soeben ein neuer Partner auf Online-Offerten.ch registriert.</p>

          <div class="details">
            <table>
              <tr><td class="label">E-Mail (Login)</td><td>${email || 'N/A'}</td></tr>
              <tr><td class="label">Firmenname</td><td>${company_name || 'N/A'}</td></tr>
              <tr><td class="label">Ansprechperson</td><td>${contact_person || 'N/A'}</td></tr>
              <tr><td class="label">Telefon</td><td>${phone || 'N/A'}</td></tr>
              <tr><td class="label">Adresse</td><td>${address_street || ''}, ${address_zip || ''} ${address_city || ''}</td></tr>
              <tr><td class="label">Webseite</td><td>${website || 'N/A'}</td></tr>
              <tr><td class="label">Gründungsjahr</td><td>${year_founded || 'N/A'}</td></tr>
              <tr><td class="label">Mitarbeiter</td><td>${employee_count || 'N/A'}</td></tr>
              <tr><td class="label">Betriebshaftpflicht</td><td>${liability_insurance === true ? 'Ja' : liability_insurance === false ? 'Nein' : 'N/A'}</td></tr>
              <tr><td class="label">Handelsregister-Nr.</td><td>${commercial_register_number || 'N/A'}</td></tr>
              <tr><td class="label">Hauptkategorien</td><td>${Array.isArray(main_categories) ? main_categories.join(', ') : main_categories || 'N/A'}</td></tr>
              <tr><td class="label">Dienstleistungen</td><td>${Array.isArray(offered_services) ? offered_services.join(', ') : offered_services || 'N/A'}</td></tr>
              <tr><td class="label">Einsatzgebiete</td><td>${Array.isArray(service_regions) ? service_regions.join(', ') : service_regions || 'N/A'}</td></tr>
            </table>
          </div>

          <div class="footer">
            <p>Diese E-Mail wurde automatisch von <strong>online-offerten.ch</strong> generiert.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

const createPartnerEmailHtml = (payload: any) => {
  const { partnerMetaData } = payload;
  const { company_name, contact_person } = partnerMetaData || {};

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
          .container { max-width: 650px; margin: 0 auto; }
          .button { display: inline-block; padding: 12px 24px; background-color: #16a34a; color: #fff; text-decoration: none; border-radius: 6px; }
          .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Willkommen als Partner bei Online-Offerten.ch!</h1>
          <p>Sehr geehrte/r ${contact_person || ''}${company_name ? ` von ${company_name}` : ''},</p>
          <p>vielen Dank für Ihre Registrierung als Partner. Ihr Account wurde erfolgreich erstellt.</p>
          <p>Sie können sich jederzeit im Partner-Dashboard anmelden, um Anfragen zu verwalten und Ihr Profil zu bearbeiten.</p>
          <p style="text-align:center; margin: 30px 0;">
            <a href="https://online-offerten.ch/partner/login" class="button">
              Zum Partner-Dashboard
            </a>
          </p>
          <p>Bei Fragen stehen wir Ihnen gerne zur Verfügung.</p>
          <div class="footer">
            <p><strong>Freundliche Grüsse</strong><br/>Ihr Team von Online-Offerten.ch</p>
            <p><em>Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese Nachricht.</em></p>
          </div>
        </div>
      </body>
    </html>
  `;
};

serve(async (req) => {
  console.log('🚀 FUNCTION STARTED - send-partner-notification');

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    if (!req.body) {
      throw new Error('Request body is missing');
    }

    const payload = await req.json();
    console.log('📦 Received payload for partner notification:', payload);

    const { email, partnerMetaData } = payload;
    if (!email) {
      throw new Error('Email is required');
    }
    if (!partnerMetaData || !partnerMetaData.company_name) {
      console.warn('⚠️ partnerMetaData or company_name missing in payload');
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is missing');
    }

    const resend = new Resend(RESEND_API_KEY);

    // Admin notification
    console.log('📧 Sending admin partner notification...');
    const adminHtml = createAdminEmailHtml(payload);
    const { data: adminResult, error: adminError } = await resend.emails.send({
      from: 'Online-Offerten.ch <info@online-offerten.ch>',
      to: ['info@online-offerten.ch'],
      subject: `Neue Partner-Registrierung: ${partnerMetaData?.company_name || email}`,
      html: adminHtml,
    });

    if (adminError) {
      console.error('❌ Admin partner notification failed:', adminError);
    } else {
      console.log('✅ Admin partner notification sent:', adminResult?.id);
    }

    // Partner welcome email
    console.log('📧 Sending welcome email to partner...');
    const partnerHtml = createPartnerEmailHtml(payload);
    const { data: partnerResult, error: partnerError } = await resend.emails.send({
      from: 'Online-Offerten.ch <info@online-offerten.ch>',
      to: [email],
      subject: 'Willkommen als Partner bei Online-Offerten.ch',
      html: partnerHtml,
    });

    if (partnerError) {
      console.error('❌ Partner welcome email failed:', partnerError);
      throw new Error(`Partner welcome email failed: ${JSON.stringify(partnerError)}`);
    }

    console.log('✅ Partner welcome email sent:', partnerResult?.id);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Partner notification emails processed.',
        adminEmailId: adminResult?.id,
        partnerEmailId: partnerResult?.id,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error: any) {
    console.error('💥 FUNCTION ERROR - send-partner-notification:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error?.message || 'Internal server error',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
});


