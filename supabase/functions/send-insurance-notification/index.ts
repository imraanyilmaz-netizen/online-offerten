import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Resend } from 'npm:resend';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const generateEmailHtml = (
  type: string,
  companyName: string,
  validUntil?: string,
  rejectionReason?: string,
  daysLeft?: number
) => {
  const dashboardLink = 'https://online-offerten.ch/partner/dashboard';

  let title = '';
  let message = '';
  let buttonText = 'Zum Partner-Dashboard';
  let buttonColor = '#28a745';

  switch (type) {
    case 'approved':
      title = 'Ihre Versicherung wurde genehmigt ✅';
      message = `
        <p>Ihre Betriebshaftpflichtversicherung wurde von unserem Team erfolgreich geprüft und genehmigt.</p>
        ${validUntil ? `<p><strong>Gültig bis:</strong> ${new Date(validUntil).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}</p>` : ''}
        <p>Sie können ab sofort Kundenanfragen kaufen und Offerten versenden.</p>
      `;
      break;

    case 'rejected':
      title = 'Ihre Versicherung wurde abgelehnt';
      message = `
        <p>Leider konnte Ihre Betriebshaftpflichtversicherung nicht genehmigt werden.</p>
        ${rejectionReason ? `<p><strong>Grund:</strong> ${rejectionReason}</p>` : ''}
        <p>Bitte laden Sie ein gültiges Dokument in Ihrem Partner-Dashboard hoch.</p>
      `;
      buttonText = 'Neue Versicherung hochladen';
      buttonColor = '#dc3545';
      break;

    case 'revoked':
      title = 'Ihre Versicherung wurde widerrufen';
      message = `
        <p>Ihre Betriebshaftpflichtversicherung wurde widerrufen. Bitte laden Sie eine aktuelle Versicherungsbescheinigung in Ihrem Partner-Dashboard hoch, um weiterhin Anfragen kaufen zu können.</p>
      `;
      buttonText = 'Versicherung hochladen';
      buttonColor = '#fd7e14';
      break;

    case 'expiry_reminder':
      title = 'Ihre Versicherung läuft bald ab ⚠️';
      message = `
        <p>Ihre Betriebshaftpflichtversicherung läuft in <strong>${daysLeft} Tagen</strong> ab${validUntil ? ` (am ${new Date(validUntil).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })})` : ''}.</p>
        <p>Bitte laden Sie rechtzeitig eine aktualisierte Versicherungsbescheinigung hoch, damit Sie weiterhin Anfragen kaufen können.</p>
        <p><strong>Hinweis:</strong> Nach Ablauf wird Ihr Profil für neue Anfragen gesperrt, bis eine gültige Versicherung vorliegt.</p>
      `;
      buttonText = 'Versicherung erneuern';
      buttonColor = '#fd7e14';
      break;
  }

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .content { border: 1px solid #ddd; padding: 20px; border-radius: 8px; background: #f9f9f9; margin: 15px 0; }
    .button { display: inline-block; padding: 12px 24px; background: ${buttonColor}; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <h2>${title}</h2>
  <p>Guten Tag ${companyName},</p>
  <div class="content">
    ${message}
  </div>
  <p style="text-align: center; margin: 30px 0;">
    <a href="${dashboardLink}" class="button">${buttonText}</a>
  </p>
  <div class="footer">
    <p>Freundliche Grüsse,<br>Ihr Team von Online-Offerten.ch</p>
    <p><em>Diese E-Mail wurde automatisch generiert.</em></p>
  </div>
</body>
</html>`;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { type, email, companyName, validUntil, rejectionReason, daysLeft } = await req.json();

    if (!type || !email) {
      throw new Error('type and email are required.');
    }

    const resendKey = Deno.env.get('RESEND_API_KEY');
    if (!resendKey) throw new Error('RESEND_API_KEY is missing.');

    const resend = new Resend(resendKey);

    const subjectMap: Record<string, string> = {
      approved: 'Ihre Versicherung wurde genehmigt ✅',
      rejected: 'Ihre Versicherung wurde abgelehnt',
      revoked: 'Ihre Versicherung wurde widerrufen',
      expiry_reminder: `⚠️ Ihre Versicherung läuft in ${daysLeft || 30} Tagen ab`,
    };

    const html = generateEmailHtml(type, companyName || 'Partner', validUntil, rejectionReason, daysLeft);

    const { data, error } = await resend.emails.send({
      from: 'Online-Offerten.ch <info@online-offerten.ch>',
      to: [email],
      subject: subjectMap[type] || 'Versicherungsstatus-Aktualisierung',
      html,
    });

    if (error) {
      console.error('❌ Email send error:', error);
      throw error;
    }

    console.log(`✅ Insurance notification (${type}) sent to ${email}, ID: ${data?.id}`);

    return new Response(
      JSON.stringify({ success: true, emailId: data?.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('❌ Error in send-insurance-notification:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});

