import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from 'npm:resend';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

/**
 * Diese Funktion wird täglich per Cron-Job aufgerufen und prüft:
 * 1. Versicherungen, die in 30 Tagen ablaufen → Erinnerungs-Email senden
 * 2. Versicherungen, die in 7 Tagen ablaufen → Dringende Erinnerungs-Email senden
 * 3. Abgelaufene Versicherungen → Status auf 'expired' setzen & Profil sperren
 */

const generateReminderHtml = (companyName: string, daysLeft: number, validUntil: string) => {
  const dashboardLink = 'https://online-offerten.ch/partner/dashboard';
  const isUrgent = daysLeft <= 7;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .content { border: 1px solid ${isUrgent ? '#f5c6cb' : '#ffeeba'}; padding: 20px; border-radius: 8px; background: ${isUrgent ? '#fff5f5' : '#fffbeb'}; margin: 15px 0; }
    .button { display: inline-block; padding: 12px 24px; background: ${isUrgent ? '#dc3545' : '#fd7e14'}; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px; }
    .highlight { font-size: 18px; font-weight: bold; color: ${isUrgent ? '#dc3545' : '#fd7e14'}; }
  </style>
</head>
<body>
  <h2>${isUrgent ? '🚨 Dringend: ' : '⚠️ '}Ihre Versicherung läuft bald ab</h2>
  <p>Guten Tag ${companyName},</p>
  <div class="content">
    <p class="highlight">Ihre Versicherung läuft in ${daysLeft} ${daysLeft === 1 ? 'Tag' : 'Tagen'} ab!</p>
    <p><strong>Ablaufdatum:</strong> ${new Date(validUntil).toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}</p>
    <p>Bitte laden Sie rechtzeitig eine aktualisierte Betriebshaftpflichtversicherung hoch, damit Sie weiterhin Kundenanfragen kaufen können.</p>
    ${isUrgent ? '<p><strong>⚠️ Nach Ablauf wird Ihr Profil automatisch für neue Anfragen gesperrt.</strong></p>' : ''}
  </div>
  <p style="text-align: center; margin: 30px 0;">
    <a href="${dashboardLink}" class="button">Versicherung jetzt erneuern</a>
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
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const resendKey = Deno.env.get('RESEND_API_KEY');

    if (!supabaseUrl || !supabaseKey) throw new Error('Supabase configuration missing.');
    if (!resendKey) throw new Error('RESEND_API_KEY is missing.');

    const supabaseAdmin = createClient(supabaseUrl, supabaseKey);
    const resend = new Resend(resendKey);

    const now = new Date();
    const today = now.toISOString().split('T')[0];

    // 1. Alle genehmigten Versicherungen mit valid_until abrufen
    const { data: insuranceRecords, error: fetchError } = await supabaseAdmin
      .from('partner_insurance')
      .select('partner_id, valid_until, status, expiry_reminder_sent_at')
      .eq('status', 'approved')
      .not('valid_until', 'is', null);

    if (fetchError) throw fetchError;

    console.log(`📋 Found ${insuranceRecords?.length || 0} approved insurance records with valid_until`);

    let emailsSent = 0;
    let expiredCount = 0;
    let reminderCount = 0;

    for (const record of (insuranceRecords || [])) {
      const validUntil = new Date(record.valid_until);
      const diffMs = validUntil.getTime() - now.getTime();
      const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      // Partner-Daten abrufen
      const { data: partner } = await supabaseAdmin
        .from('partners')
        .select('email, company_name, status')
        .eq('id', record.partner_id)
        .single();

      if (!partner || partner.status !== 'active') continue;

      // Fall 1: Versicherung ist abgelaufen
      if (daysLeft <= 0) {
        console.log(`❌ Insurance expired for ${partner.company_name} (${daysLeft} days)`);

        // Status auf expired setzen
        await supabaseAdmin
          .from('partner_insurance')
          .update({ status: 'expired', updated_at: now.toISOString() })
          .eq('partner_id', record.partner_id);

        await supabaseAdmin
          .from('partners')
          .update({ insurance_status: 'expired', updated_at: now.toISOString() })
          .eq('id', record.partner_id);

        // Ablauf-Email senden
        try {
          await resend.emails.send({
            from: 'Online-Offerten.ch <info@online-offerten.ch>',
            to: [partner.email],
            subject: '🚨 Ihre Versicherung ist abgelaufen – Profil gesperrt',
            html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
.content { border: 1px solid #f5c6cb; padding: 20px; border-radius: 8px; background: #fff5f5; margin: 15px 0; }
.button { display: inline-block; padding: 12px 24px; background: #dc3545; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold; }
.footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px; }
</style></head><body>
<h2>🚨 Ihre Versicherung ist abgelaufen</h2>
<p>Guten Tag ${partner.company_name},</p>
<div class="content">
<p>Ihre Betriebshaftpflichtversicherung ist am <strong>${validUntil.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}</strong> abgelaufen.</p>
<p><strong>Ihr Profil wurde für neue Anfragen gesperrt.</strong> Um weiterhin Kundenanfragen zu erhalten, laden Sie bitte eine aktuelle Versicherungsbescheinigung hoch.</p>
</div>
<p style="text-align: center; margin: 30px 0;">
<a href="https://online-offerten.ch/partner/dashboard" class="button">Versicherung jetzt hochladen</a>
</p>
<div class="footer"><p>Freundliche Grüsse,<br>Ihr Team von Online-Offerten.ch</p></div>
</body></html>`,
          });
          emailsSent++;
        } catch (e) {
          console.error(`Failed to send expiry email to ${partner.email}:`, e);
        }

        expiredCount++;
        continue;
      }

      // Fall 2: 30 Tage oder 7 Tage Erinnerung
      const shouldRemind30 = daysLeft <= 30 && daysLeft > 7;
      const shouldRemind7 = daysLeft <= 7;

      // Prüfen ob schon eine Erinnerung in den letzten 7 Tagen gesendet wurde
      const lastReminder = record.expiry_reminder_sent_at ? new Date(record.expiry_reminder_sent_at) : null;
      const daysSinceLastReminder = lastReminder
        ? Math.ceil((now.getTime() - lastReminder.getTime()) / (1000 * 60 * 60 * 24))
        : 999;

      // 30 Tage: einmal senden (wenn noch nie gesendet)
      // 7 Tage: nochmal senden (wenn letzte Erinnerung > 7 Tage her)
      const shouldSend =
        (shouldRemind30 && !lastReminder) ||
        (shouldRemind7 && daysSinceLastReminder >= 7);

      if (shouldSend) {
        console.log(`⚠️ Sending ${daysLeft}-day reminder to ${partner.company_name} (${partner.email})`);

        try {
          const html = generateReminderHtml(partner.company_name, daysLeft, record.valid_until);
          await resend.emails.send({
            from: 'Online-Offerten.ch <info@online-offerten.ch>',
            to: [partner.email],
            subject: `${shouldRemind7 ? '🚨 Dringend' : '⚠️ Erinnerung'}: Ihre Versicherung läuft in ${daysLeft} Tagen ab`,
            html,
          });

          // Erinnerungsdatum speichern
          await supabaseAdmin
            .from('partner_insurance')
            .update({ expiry_reminder_sent_at: now.toISOString() })
            .eq('partner_id', record.partner_id);

          emailsSent++;
          reminderCount++;
        } catch (e) {
          console.error(`Failed to send reminder to ${partner.email}:`, e);
        }

        // Rate limiting: 1 Sekunde warten
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const summary = `Geprüft: ${insuranceRecords?.length || 0} Versicherungen. Abgelaufen: ${expiredCount}. Erinnerungen: ${reminderCount}. Emails gesendet: ${emailsSent}.`;
    console.log(`✅ ${summary}`);

    return new Response(
      JSON.stringify({ success: true, message: summary, emailsSent, expiredCount, reminderCount }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('❌ Error in check-insurance-expiry:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});


