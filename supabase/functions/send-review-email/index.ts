import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.30.0';
import { corsHeaders } from '../_shared/cors.ts';
import { Resend } from 'https://esm.sh/resend@1.0.0';

interface Quote {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  review_token: string;
  review_email_sent_count: number;
}

const resend = new Resend(Deno.env.get('RESEND_API_KEY')!);

async function ReviewRequestEmail({ firstName, reviewLink }: { firstName: string; reviewLink: string }) {
  return await resend.emails.send({
    from: `Online-Offerten.ch <${Deno.env.get('EMAIL_SENDER') || 'info@online-offerten.ch'}>`,
    to: [Deno.env.get('ADMIN_EMAIL') || 'info@online-offerten.ch'], // E-posta test için yöneticiye gönderilir
    subject: 'Wie war Ihr Umzug? Bitte bewerten Sie die Umzugsfirma',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Hallo ${firstName},</h2>
        <p>wir hoffen, Ihr Umzug ist gut verlaufen!</p>
        <p>Ihre Meinung ist uns sehr wichtig. Bitte nehmen Sie sich einen Moment Zeit, um Ihre Erfahrungen mit der Umzugsfirma zu bewerten. Ihr Feedback hilft anderen Kunden bei ihrer Entscheidung und den Firmen, ihren Service zu verbessern.</p>
        <a href="${reviewLink}" style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 5px;">Jetzt Bewertung abgeben</a>
        <p>Vielen Dank für Ihre Mithilfe!</p>
        <p>Freundliche Grüsse,<br>Ihr Team von Online-Offerten.ch</p>
      </div>
    `,
    // Bcc: Deno.env.get('ADMIN_EMAIL') || 'info@online-offerten.ch' // Gerçek kullanımda bu satır açılabilir
  });
}

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
    
    const { quoteId } = await req.json();

    if (!quoteId) {
      throw new Error("Quote ID is required.");
    }
    
    const { data: quote, error: quoteError } = await supabaseClient
      .from('quotes')
      .select('id, email, firstname, lastname, review_token, review_email_sent_count')
      .eq('id', quoteId)
      .single();

    if (quoteError) throw quoteError;
    if (!quote) throw new Error("Quote not found.");

    if (quote.review_email_sent_count >= 3) {
      return new Response(JSON.stringify({ success: false, message: "Review email has already been sent 3 times." }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 429,
      });
    }

    const reviewToken = quote.review_token || crypto.randomUUID();
    const siteUrl = Deno.env.get('SITE_URL') || 'http://localhost:3000';
    const reviewLink = `${siteUrl}/bewertung?quote_id=${quote.id}&token=${reviewToken}`;

    await ReviewRequestEmail({
      firstName: quote.firstname,
      reviewLink,
    });
    
    const { error: updateError } = await supabaseClient
      .from('quotes')
      .update({ 
        review_token: reviewToken,
        review_email_sent_at: new Date().toISOString(),
        review_email_sent_count: (quote.review_email_sent_count || 0) + 1,
      })
      .eq('id', quote.id);

    if (updateError) throw updateError;
    
    return new Response(JSON.stringify({ success: true, message: "Review email sent successfully." }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error sending review email:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});