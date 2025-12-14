import React from 'https://esm.sh/react@18.2.0';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components';

const CustomerQuoteConfirmationEmail = ({
  customerName = 'Kunde',
  quoteId = '12345678',
  statusLink = 'https://online-offerten.ch/anfrage-status/12345678'
}) => {
  const previewText = `Ihre Anfrage #${quoteId.substring(0, 8)} wurde empfangen!`;
  const logoUrl = 'https://godi4fhkodqgtoyvcszja.supabase.co/storage/v1/object/public/logos/logo-full-c.png';

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img src={logoUrl} width="200" height="auto" alt="Online-Offerten.ch" />
          </Section>
          <Heading style={h1}>Vielen Dank für Ihre Anfrage!</Heading>
          <Text style={text}>
            Hallo {customerName},
          </Text>
          <Text style={text}>
            wir haben Ihre Anfrage mit der Nummer <strong>#{quoteId.substring(0, 8)}</strong> erhalten und Ihre E-Mail-Adresse erfolgreich bestätigt. Unser Team prüft nun Ihre Angaben sorgfältig. In Kürze erhalten Sie passende und unverbindliche Offerten von unseren geprüften Partnern.
          </Text>
          <Text style={text}>
            Sie können den Status Ihrer Anfrage jederzeit über den folgenden Link einsehen:
          </Text>
          
          <Section style={{ textAlign: 'center', marginTop: '32px', marginBottom: '32px' }}>
            <Link href={statusLink} style={button}>
              Status Ihrer Anfrage prüfen
            </Link>
          </Section>

          <Text style={text}>
            Wir freuen uns darauf, die passenden Partner für Ihr Vorhaben zu finden!
          </Text>
          <Text style={text}>
            Herzliche Grüsse,<br />
            Ihr Team von Online-Offerten.ch
          </Text>

          <Hr style={hr} />
          <Text style={footer}>
            Online-Offerten.ch | Automatisierte Benachrichtigung
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default CustomerQuoteConfirmationEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
};

const logoContainer = {
  textAlign: 'center',
  padding: '20px 0',
};

const h1 = {
  color: '#1d3557',
  fontSize: '28px',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: '30px 0',
};

const text = {
  color: '#495057',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left',
  padding: '0 20px',
};

const button = {
  backgroundColor: '#10B981',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'inline-block',
  padding: '12px 24px',
};

const hr = {
  borderColor: '#e9ecef',
  margin: '20px 0',
};

const footer = {
  color: '#adb5bd',
  fontSize: '12px',
  textAlign: 'center',
};