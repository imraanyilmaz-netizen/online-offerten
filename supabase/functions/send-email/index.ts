import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from 'npm:resend@1.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

// Hilfsfunktionen für die Anzeige
const yn = (v: any) => (v ? 'Ja' : 'Nein');
const safe = (v: any, fallback = 'Nicht angegeben') => (v === null || v === undefined || v === '' ? fallback : String(v));
const cleaningTypeLabels: Record<string, string> = {
  mit_abnahmegarantie: 'Endreinigung mit Abnahmegarantie',
  ohne_abnahmegarantie: 'Endreinigung ohne Abnahmegarantie',
  umzugsreinigung: 'Umzugsreinigung'
};
const areaSizeLabels: Record<string, string> = {
  bis_40: 'bis 40 m²', '40_60': '40 – 60 m²', '60_80': '60 – 80 m²', '80_100': '80 – 100 m²',
  '100_120': '100 – 120 m²', '120_140': '120 – 140 m²', ueber_140: 'über 140 m²',
  sqm_40: '40 m²', sqm_60: '60 m²', sqm_70: '70 m²', sqm_80: '80 m²', sqm_90: '90 m²',
  sqm_100: '100 m²', sqm_120: '120 m²', sqm_150_plus: '150+ m²'
};

// PROFESYONEL ADMIN EMAIL TEMPLATE - TÜM ALANLAR EKLENDİ + ZUSATZLEISTUNGEN
const createAdminEmailHtml = (quoteDetails: any) => {
  const {
    servicetype, firstname, lastname, email, phone, preferredtime, quoteswanted,
    from_street, from_zip, from_city, from_rooms, from_country, from_floor, from_lift, from_object_type,
    to_street, to_zip, to_city, to_country, to_floor, to_lift, to_object_type,
    move_date, move_date_flexible,
    umzugart,
    additional_cleaning, additional_info, how_found, salutation, id,
    special_transport, special_transport_type, special_transport_other_details,
    additional_services_piano, additional_services_furniture_assembly, additional_services_packing,
    additional_services_furniture_lift, additional_services_disposal, additional_services_lamp_demontage,
    besichtigung_erwuenscht,
    cleaning_area_sqm, cleaning_type_guarantee,
    cleaning_additional_balcony, cleaning_additional_cellar, cleaning_additional_garage
  } = quoteDetails;

  const formattedDate = move_date ? new Date(move_date).toLocaleDateString('de-DE') : 'Nicht angegeben';
  const adminDashboardLink = `https://online-offerten.ch/admin-dashboard?quote_id=${id}`;
  const cleaningExtras = [
    cleaning_additional_balcony && 'Balkon',
    cleaning_additional_cellar && 'Keller',
    cleaning_additional_garage && 'Garage'
  ].filter(Boolean).join(', ');

  const hasZusatzleistungen =
    additional_services_piano !== undefined ||
    additional_services_furniture_assembly !== undefined ||
    additional_services_lamp_demontage !== undefined ||
    besichtigung_erwuenscht !== undefined;

  const hasReinigungDetails =
    cleaning_area_sqm || cleaning_type_guarantee || cleaningExtras || additional_cleaning;

  const hasSpezialtransport =
    special_transport || special_transport_type || special_transport_other_details ||
    additional_services_packing || additional_services_furniture_lift || additional_services_disposal;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Neue Offertanfrage - Online-Offerten.ch</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      color: #374151;
      background-color: #f8fafc;
      margin: 0;
      padding: 20px;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .header {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      padding: 30px;
      text-align: center;
      color: white;
    }
    .header h1 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
    .header p { opacity: 0.9; font-size: 16px; }
    .content { padding: 32px; }
    .alert-badge {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 24px;
    }
    .alert-badge strong { color: #047857; }
    .quote-details {
      background: #f8fafc;
      border-radius: 8px;
      padding: 24px;
      margin: 24px 0;
      border: 1px solid #e2e8f0;
    }
    .section-title {
      font-weight: bold;
      margin: 20px 0 10px 0;
      color: #059669;
      border-bottom: 2px solid #059669;
      padding-bottom: 5px;
      font-size: 15px;
    }
    .detail-table { width: 100%; border-collapse: collapse; }
    .detail-table td {
      padding: 8px 6px;
      vertical-align: top;
      border-bottom: 1px solid #eef2f7;
      font-size: 14px;
    }
    .detail-table td.label {
      font-weight: 600;
      color: #4b5563;
      width: 45%;
    }
    .detail-table td.value { color: #1f2937; }
    .detail-table tr:last-child td { border-bottom: none; }
    .yes-badge { display: inline-block; background: #d1fae5; color: #065f46; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; }
    .no-badge { display: inline-block; background: #f1f5f9; color: #475569; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      color: white;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      box-shadow: 0 2px 4px rgba(5, 150, 105, 0.2);
    }
    .button-container { text-align: center; margin: 28px 0; }
    .footer {
      border-top: 1px solid #e5e7eb;
      padding: 24px;
      text-align: center;
      color: #6b7280;
      font-size: 14px;
      background: #f9fafb;
    }
    .footer p { margin-bottom: 8px; }
    @media (max-width: 600px) {
      .content { padding: 20px; }
      .header { padding: 24px 20px; }
      .detail-table td.label { width: 50%; }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Neue Offertanfrage</h1>
      <p>Eine neue Anfrage ist auf Online-Offerten.ch eingegangen</p>
    </div>

    <div class="content">
      <div class="alert-badge">
        <strong>Neue Kundenanfrage erhalten</strong>
        <div style="font-size: 14px; margin-top: 4px; color: #4b5563;">Bitte bearbeiten Sie diese Anfrage umgehend.</div>
      </div>

      <div class="quote-details">
        <h3 style="margin-bottom: 16px; color: #1f2937;">📋 Anfragedetails</h3>

        <div class="section-title">Grundlegende Informationen</div>
        <table class="detail-table">
          <tr><td class="label">Hauptdienstleistung</td><td class="value">${safe(servicetype)}</td></tr>
          <tr><td class="label">Umzugsart / Art</td><td class="value">${safe(umzugart)}</td></tr>
          <tr><td class="label">Kundenname</td><td class="value">${safe(salutation, '')} ${safe(firstname, '')} ${safe(lastname, '')}</td></tr>
          <tr><td class="label">E-Mail</td><td class="value">${safe(email)}</td></tr>
          <tr><td class="label">Telefon</td><td class="value">${safe(phone)}</td></tr>
        </table>

        <div class="section-title">Von Adresse</div>
        <table class="detail-table">
          <tr><td class="label">Adresse</td><td class="value">${safe(from_street, '')} ${safe(from_zip, '')} ${safe(from_city, '')}</td></tr>
          ${from_country ? `<tr><td class="label">Land</td><td class="value">${from_country}</td></tr>` : ''}
          ${from_floor ? `<tr><td class="label">Stockwerk</td><td class="value">${from_floor}</td></tr>` : ''}
          ${from_lift !== null && from_lift !== undefined ? `<tr><td class="label">Aufzug</td><td class="value">${yn(from_lift)}</td></tr>` : ''}
          ${from_rooms ? `<tr><td class="label">Zimmeranzahl</td><td class="value">${from_rooms}</td></tr>` : ''}
          ${from_object_type ? `<tr><td class="label">Objektart</td><td class="value">${from_object_type}</td></tr>` : ''}
        </table>

        ${(to_city || to_street || to_zip) ? `
        <div class="section-title">Nach Adresse</div>
        <table class="detail-table">
          <tr><td class="label">Adresse</td><td class="value">${safe(to_street, '')} ${safe(to_zip, '')} ${safe(to_city, '')}</td></tr>
          ${to_country ? `<tr><td class="label">Land</td><td class="value">${to_country}</td></tr>` : ''}
          ${to_floor ? `<tr><td class="label">Stockwerk</td><td class="value">${to_floor}</td></tr>` : ''}
          ${to_lift !== null && to_lift !== undefined ? `<tr><td class="label">Aufzug</td><td class="value">${yn(to_lift)}</td></tr>` : ''}
          ${to_object_type ? `<tr><td class="label">Objektart</td><td class="value">${to_object_type}</td></tr>` : ''}
        </table>
        ` : ''}

        <div class="section-title">Termin & Details</div>
        <table class="detail-table">
          <tr><td class="label">Wunschdatum</td><td class="value">${formattedDate}</td></tr>
          <tr><td class="label">Datum flexibel</td><td class="value">${yn(move_date_flexible)}</td></tr>
          ${preferredtime ? `<tr><td class="label">Bevorzugte Uhrzeit</td><td class="value">${preferredtime}</td></tr>` : ''}
          <tr><td class="label">Gewünschte Offerten</td><td class="value">${safe(quoteswanted)}</td></tr>
        </table>

        ${hasZusatzleistungen ? `
        <div class="section-title">Zusatzleistungen & Besonderheiten</div>
        <table class="detail-table">
          <tr><td class="label">Klavier / Flügel vorhanden</td><td class="value"><span class="${additional_services_piano ? 'yes-badge' : 'no-badge'}">${yn(additional_services_piano)}</span></td></tr>
          <tr><td class="label">Möbel De-/Montage</td><td class="value"><span class="${additional_services_furniture_assembly ? 'yes-badge' : 'no-badge'}">${yn(additional_services_furniture_assembly)}</span></td></tr>
          <tr><td class="label">Lampen Demontage</td><td class="value"><span class="${additional_services_lamp_demontage ? 'yes-badge' : 'no-badge'}">${yn(additional_services_lamp_demontage)}</span></td></tr>
          <tr><td class="label">Besichtigung erwünscht</td><td class="value"><span class="${besichtigung_erwuenscht ? 'yes-badge' : 'no-badge'}">${yn(besichtigung_erwuenscht)}</span></td></tr>
        </table>
        ` : ''}

        ${hasSpezialtransport ? `
        <div class="section-title">Umzug – weitere Zusatzleistungen</div>
        <table class="detail-table">
          ${additional_services_packing ? `<tr><td class="label">Verpackungsservice</td><td class="value"><span class="yes-badge">Ja</span></td></tr>` : ''}
          ${additional_services_furniture_lift ? `<tr><td class="label">Möbellift</td><td class="value"><span class="yes-badge">Ja</span></td></tr>` : ''}
          ${additional_services_disposal ? `<tr><td class="label">Entsorgung</td><td class="value"><span class="yes-badge">Ja</span></td></tr>` : ''}
          ${special_transport ? `<tr><td class="label">Spezialtransport</td><td class="value"><span class="yes-badge">Ja</span></td></tr>` : ''}
          ${special_transport_type ? `<tr><td class="label">Art Spezialtransport</td><td class="value">${special_transport_type}</td></tr>` : ''}
          ${special_transport_other_details ? `<tr><td class="label">Details Spezialtransport</td><td class="value">${special_transport_other_details}</td></tr>` : ''}
        </table>
        ` : ''}

        ${hasReinigungDetails ? `
        <div class="section-title">Reinigung – Details</div>
        <table class="detail-table">
          ${additional_cleaning ? `<tr><td class="label">Endreinigung gewünscht</td><td class="value"><span class="yes-badge">Ja</span></td></tr>` : ''}
          ${cleaning_area_sqm ? `<tr><td class="label">Wohnungsfläche</td><td class="value">${areaSizeLabels[cleaning_area_sqm] || cleaning_area_sqm}</td></tr>` : ''}
          ${cleaning_type_guarantee ? `<tr><td class="label">Art der Reinigung</td><td class="value">${cleaningTypeLabels[cleaning_type_guarantee] || cleaning_type_guarantee}</td></tr>` : ''}
          ${cleaningExtras ? `<tr><td class="label">Zusatzflächen</td><td class="value">${cleaningExtras}</td></tr>` : ''}
        </table>
        ` : ''}

        ${additional_info ? `
        <div class="section-title">Zusätzliche Informationen</div>
        <table class="detail-table">
          <tr><td class="label">Kundennotiz</td><td class="value" style="white-space: pre-wrap;">${additional_info}</td></tr>
        </table>
        ` : ''}

        ${how_found ? `
        <div class="section-title">Marketing</div>
        <table class="detail-table">
          <tr><td class="label">Wie gefunden</td><td class="value">${how_found}</td></tr>
        </table>
        ` : ''}
      </div>

      <div class="button-container">
        <a href="${adminDashboardLink}" class="button">
          Diese Anfrage im Dashboard ansehen
        </a>
      </div>

      <div style="text-align: center; color: #6b7280; font-size: 14px;">
        <p>Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht auf diese Nachricht.</p>
      </div>
    </div>

    <div class="footer">
      <p><strong>Online-Offerten.ch</strong></p>
      <p>Ihr Partner für Umzugs- und Reinigungsdienstleistungen</p>
      <p>© ${new Date().getFullYear()} Online-Offerten.ch. Alle Rechte vorbehalten.</p>
    </div>
  </div>
</body>
</html>
  `;
};

// PROFESYONEL CUSTOMER EMAIL TEMPLATE
const createCustomerEmailHtml = (quoteDetails: any) => {
  const { lastname, salutation, id } = quoteDetails;
  const statusLink = `https://online-offerten.ch/anfrage-status/${id}`;
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ihre Anfrage wurde erhalten - Online-Offerten.ch</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      color: #374151;
      background-color: #f8fafc;
      margin: 0;
      padding: 20px;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .header {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      padding: 40px 30px;
      text-align: center;
      color: white;
    }
    .header h1 { font-size: 28px; font-weight: 700; margin-bottom: 8px; }
    .header p { opacity: 0.9; font-size: 16px; }
    .content { padding: 40px 32px; }
    .greeting {
      font-size: 18px;
      color: #1f2937;
      margin-bottom: 24px;
      line-height: 1.7;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      color: white;
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      box-shadow: 0 2px 4px rgba(5, 150, 105, 0.2);
    }
    .button-container { text-align: center; margin: 32px 0; }
    .next-steps {
      background: #f8fafc;
      border-radius: 8px;
      padding: 24px;
      margin: 32px 0;
      border-left: 4px solid #059669;
    }
    .next-steps h3 {
      color: #059669;
      margin-bottom: 16px;
      font-size: 18px;
    }
    .next-steps ul { list-style: none; padding: 0; }
    .next-steps li {
      padding: 8px 0;
      padding-left: 24px;
      position: relative;
    }
    .next-steps li:before {
      content: "✓";
      color: #059669;
      font-weight: bold;
      position: absolute;
      left: 0;
    }
    .footer {
      border-top: 1px solid #e5e7eb;
      padding: 32px;
      text-align: center;
      color: #6b7280;
      font-size: 14px;
      background: #f9fafb;
    }
    .contact-info {
      margin: 20px 0;
      padding: 16px;
      background: #f0fdf4;
      border-radius: 8px;
      border: 1px solid #bbf7d0;
    }
    @media (max-width: 600px) {
      .content { padding: 24px 20px; }
      .header { padding: 30px 20px; }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Erfolgreich übermittelt!</h1>
      <p>Vielen Dank für Ihre Anfrage bei Online-Offerten.ch</p>
    </div>

    <div class="content">
      <div class="greeting">
        Sehr geehrte/r ${salutation || ''} ${lastname || ''},<br><br>
        vielen Dank für Ihr Vertrauen in unsere Dienstleistungen. Wir haben Ihre Anfrage erhalten und werden diese umgehend bearbeiten.
      </div>

      <div class="button-container">
        <a href="${statusLink}" class="button">
          Status Ihrer Anfrage verfolgen
        </a>
      </div>

      <div class="next-steps">
        <h3>📝 Was passiert als nächstes?</h3>
        <ul>
          <li>Wir leiten Ihre Anfrage an passende Partner weiter</li>
          <li>Sie erhalten in Kürze unverbindliche Offerten</li>
          <li>Vergleichen Sie die Angebote in Ruhe</li>
          <li>Wählen Sie den passenden Anbieter aus</li>
        </ul>
      </div>

      <div class="contact-info">
        <strong>Haben Sie Fragen?</strong><br>
        Wir sind Montag bis Freitag von 8:00 bis 18:00 Uhr für Sie da.<br>
        E-Mail: info@online-offerten.ch
      </div>
    </div>

    <div class="footer">
      <p><strong>Online-Offerten.ch</strong></p>
      <p>Ihr Partner für Umzugs- und Reinigungsdienstleistungen</p>
      <p>© ${new Date().getFullYear()} Online-Offerten.ch. Alle Rechte vorbehalten.</p>
    </div>
  </div>
</body>
</html>
  `;
};

serve(async (req) => {
  console.log('🚀 FUNCTION STARTED - send-email');
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  try {
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
    const { data: quoteDetails, error: quoteError } = await supabaseAdmin
      .from('quotes')
      .select('*')
      .eq('id', quoteId)
      .single();

    if (quoteError) {
      console.error('❌ Quote error:', quoteError);
      throw new Error(`Quote not found: ${quoteError.message}`);
    }
    if (!quoteDetails) {
      throw new Error('Quote not found in database');
    }
    console.log('✅ Quote details found for:', quoteDetails.email);

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
      throw new Error(`Admin email failed: ${JSON.stringify(adminError)}`);
    }
    console.log('✅ Admin email sent:', adminResult?.id);

    console.log('📧 Sending customer email...');
    const customerEmailHtml = createCustomerEmailHtml(quoteDetails);
    const { data: customerResult, error: customerError } = await resend.emails.send({
      from: 'Online-Offerten.ch <info@online-offerten.ch>',
      to: [quoteDetails.email],
      subject: 'Bitte bestätigen Sie Ihre E-Mail-Adresse',
      html: customerEmailHtml
    });
    if (customerError) {
      console.error('❌ Customer email failed:', customerError);
      throw new Error(`Customer email failed: ${JSON.stringify(customerError)}`);
    }
    console.log('✅ Customer email sent:', customerResult?.id);

    return new Response(JSON.stringify({
      success: true,
      message: 'Both admin and customer emails sent successfully',
      adminEmail: adminResult,
      customerEmail: customerResult,
      quoteId: quoteId
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
      status: 400
    });
  }
});
