import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from 'npm:resend';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { quoteId, skipEmail = false } = await req.json();
    if (!quoteId) throw new Error('Quote ID is required.');

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const resendKey = Deno.env.get('RESEND_API_KEY');

    if (!supabaseUrl || !supabaseKey) throw new Error('Supabase configuration missing.');
    if (!resendKey) throw new Error('Resend API key missing.');

    const supabaseAdmin = createClient(supabaseUrl, supabaseKey);
    const resend = new Resend(resendKey);

    const { data: quoteDetails, error: quoteError } = await supabaseAdmin
      .from('quotes')
      .select('*')
      .eq('id', quoteId)
      .single();

    if (quoteError) throw quoteError;
    if (!quoteDetails) throw new Error('Quote not found.');

    const { data: partners, error: partnersError } = await supabaseAdmin
      .from('partners')
      .select('id, email, company_name')
      .in('id', quoteDetails.assigned_partner_ids || []);

    if (partnersError) throw partnersError;
    if (!partners || partners.length === 0) throw new Error('No partners found.');

    await supabaseAdmin
      .from('quotes')
      .update({ status: 'approved' })
      .eq('id', quoteId);

    const generateEmailHtml = (quote, partnerName) => {
      const formattedDate = quote.move_date
        ? new Date(quote.move_date).toLocaleDateString('de-DE', {
            weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
          })
        : 'N/A';

      const dashboardLink = 'https://online-offerten.ch/partner/dashboard';

      // Kompakt Adresszeilen
      const fromFloorLift = [quote.from_floor, quote.from_lift !== null && quote.from_lift !== undefined ? `Lift: ${quote.from_lift ? 'Ja' : 'Nein'}` : null].filter(Boolean).join(' / ');
      const fromRoomsObj = [quote.from_rooms, quote.from_object_type ? quote.from_object_type.charAt(0).toUpperCase() + quote.from_object_type.slice(1) : null].filter(Boolean).join(' / ');
      const toFloorLift = [quote.to_floor, quote.to_lift !== null && quote.to_lift !== undefined ? `Lift: ${quote.to_lift ? 'Ja' : 'Nein'}` : null].filter(Boolean).join(' / ');
      const toRoomsObj = [quote.to_object_type ? quote.to_object_type.charAt(0).toUpperCase() + quote.to_object_type.slice(1) : null].filter(Boolean).join(' / ');

      // Zusätzliche Leistungen
      const zusatz = [];
      if (quote.furniture_assembly) zusatz.push('Möbel De-/Montage');
      if (quote.additional_services_packing) zusatz.push('Einpackservice');
      if (quote.special_transport) {
        const details = [
          quote.special_transport_piano && 'Klavier',
          quote.special_transport_safe && 'Tresor',
          quote.special_transport_heavy && 'Flügel'
        ].filter(Boolean).join(', ');
        zusatz.push(`Spezialtransporte (${details || 'Ja'})`);
      }
      if (quote.additional_services_disposal) zusatz.push('Entsorgung');

      // Reinigung Details
      const areaSizeLabels = { 'bis_40': 'bis 40 m²', '40_60': '40 – 60 m²', '60_80': '60 – 80 m²', '80_100': '80 – 100 m²', '100_120': '100 – 120 m²', '120_140': '120 – 140 m²', 'ueber_140': 'über 140 m²' };
      const cleaningTypeLabels = { 'mit_abnahmegarantie': 'Endreinigung mit Abnahmegarantie', 'ohne_abnahmegarantie': 'Endreinigung ohne Abnahmegarantie', 'umzugsreinigung': 'Umzugsreinigung' };
      const cleaningExtras = [quote.cleaning_additional_balcony && 'Balkon', quote.cleaning_additional_cellar && 'Keller', quote.cleaning_additional_garage && 'Garage'].filter(Boolean);

      return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
body { font-family: Arial, sans-serif; line-height:1.6; color:#333; max-width:600px; margin:0 auto; padding:20px; }
.quote-box { border:1px solid #ddd; padding:15px; border-radius:5px; background:#f9f9f9; margin:15px 0; }
.button { display:inline-block; padding:12px 24px; background:#28a745; color:#fff; text-decoration:none; border-radius:5px; font-weight:bold; }
.footer { margin-top:20px; padding-top:20px; border-top:1px solid #eee; color:#666; }
.sub-info { color:#555; font-size:14px; margin:2px 0 8px 0; }
</style>
</head>
<body>

<div style="display:none;max-height:0;overflow:hidden;">
Neue bestätigte Anfrage – Details im Partner-Dashboard verfügbar.
</div>

<h1>Neue bestätigte Anfrage für Sie, ${partnerName}!</h1>
<p>Eine neue, für Sie relevante Anfrage ist auf Online-Offerten.ch eingegangen:</p>

<div class="quote-box">
<p><strong>Dienstleistung:</strong> ${quote.servicetype}</p>
<p><strong>Datum:</strong> ${formattedDate}</p>
${quote.move_date_flexible ? '<p class="sub-info">📅 Termin ist flexibel</p>' : ''}

<p><strong>Von:</strong> ${quote.from_zip} ${quote.from_city}</p>
${fromFloorLift ? `<p class="sub-info">${fromFloorLift}</p>` : ''}
${fromRoomsObj ? `<p class="sub-info">${fromRoomsObj}</p>` : ''}

${quote.to_city ? `<p><strong>Nach:</strong> ${quote.to_zip} ${quote.to_city}</p>` : ''}
${quote.to_city && toFloorLift ? `<p class="sub-info">${toFloorLift}</p>` : ''}
${quote.to_city && toRoomsObj ? `<p class="sub-info">${toRoomsObj}</p>` : ''}

${zusatz.length > 0 ? `<p><strong>Zusatzleistungen:</strong> ${zusatz.join(', ')}</p>` : ''}
${quote.cleaning_area_sqm ? `<p><strong>Wohnungsfläche:</strong> ${areaSizeLabels[quote.cleaning_area_sqm] || quote.cleaning_area_sqm}</p>` : ''}
${quote.cleaning_type_guarantee ? `<p><strong>Art der Reinigung:</strong> ${cleaningTypeLabels[quote.cleaning_type_guarantee] || quote.cleaning_type_guarantee}</p>` : ''}
${cleaningExtras.length > 0 ? `<p><strong>Zusatzflächen:</strong> ${cleaningExtras.join(', ')}</p>` : ''}
</div>

<p>Die vollständigen Details finden Sie in Ihrem Partner-Dashboard.</p>

<a href="${dashboardLink}" class="button">Jetzt zum Partner-Dashboard</a>

<div class="footer">
<p>Freundliche Grüsse,<br>Ihr Team von Online-Offerten.ch</p>
</div>

</body>
</html>`;
    };

    let emailsSent = 0;

    if (!skipEmail) {
      for (let i = 0; i < partners.length; i++) {
        const partner = partners[i];
        const formattedDate = quoteDetails.move_date
          ? new Date(quoteDetails.move_date).toLocaleDateString('de-DE', {
              weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
            })
          : 'N/A';

        const emailHtml = generateEmailHtml(quoteDetails, partner.company_name || 'Partner');

        await resend.emails.send({
          from: 'Online-Offerten.ch <info@online-offerten.ch>',
          to: [partner.email],
          subject: `Neue bestätigte Anfrage – ${quoteDetails.servicetype} in ${quoteDetails.from_city}`,
          html: emailHtml,
          text: `
Neue bestätigte Anfrage

Dienstleistung: ${quoteDetails.servicetype}
Von: ${quoteDetails.from_zip} ${quoteDetails.from_city}
${quoteDetails.to_city ? `Nach: ${quoteDetails.to_zip} ${quoteDetails.to_city}` : ''}
Datum: ${formattedDate}
${quoteDetails.move_date_flexible ? 'Termin ist flexibel' : ''}

Details im Partner-Dashboard:
https://online-offerten.ch/partner/dashboard

Freundliche Grüsse
Online-Offerten.ch
`
        });

        emailsSent++;

        if (i < partners.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      }
    }

    return new Response(
      JSON.stringify({
        message: skipEmail
          ? `Erfolg! Anfrage wurde ohne E-Mail an ${partners.length} Partner zugewiesen.`
          : `Erfolg! Anfrage wurde an ${emailsSent} Partner gesendet.`,
        status: 'approved',
        skipEmail
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
