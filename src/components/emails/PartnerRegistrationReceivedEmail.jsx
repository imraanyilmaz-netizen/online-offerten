import React from 'react';
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
} from '@react-email/components';
import { logoUrl } from '@/assets/logoConstants';

const PartnerRegistrationReceivedEmail = ({
  companyName = 'Musterfirma AG',
  contactPerson = 'Max Mustermann',
}) => {
  const previewText = `Ihre Registrierung bei Online-Offerten.ch ist eingegangen!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img src={logoUrl} width="200" height="auto" alt="Online-Offerten.ch" />
          </Section>
          <Heading style={h1}>Wir haben Ihre Registrierung erhalten!</Heading>
          <Text style={text}>
            Hallo {contactPerson},
          </Text>
          <Text style={text}>
            vielen Dank für Ihr Interesse an einer Partnerschaft mit Online-Offerten.ch. Wir bestätigen hiermit den Eingang Ihrer Registrierung für die Firma <strong>{companyName}</strong>.
          </Text>
          <Section style={card}>
            <Heading as="h2" style={h2}>Wie geht es weiter?</Heading>
            <Text style={cardText}>
              <strong>1. Prüfung Ihrer Angaben:</strong> Unser Team wird Ihr Profil und die von Ihnen übermittelten Informationen sorgfältig prüfen. Dieser Prozess dient der Qualitätssicherung und dauert in der Regel 1-2 Werktage.
            </Text>
            <Text style={cardText}>
              <strong>2. Aktivierungs-E-Mail:</strong> Sobald Ihr Konto geprüft und freigeschaltet wurde, erhalten Sie eine separate E-Mail zur Aktivierung. Mit dieser können Sie Ihr Passwort festlegen und sich in Ihr persönliches Partner-Dashboard einloggen.
            </Text>
          </Section>
          <Text style={text}>
            Wir freuen uns auf eine erfolgreiche Zusammenarbeit und werden uns so schnell wie möglich bei Ihnen melden.
          </Text>
          <Text style={text}>
            Mit freundlichen Grüssen,
            <br />
            Ihr Team von Online-Offerten.ch
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Online-Offerten.ch | Ihr Partner für Umzugs- und Reinigungsanfragen
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default PartnerRegistrationReceivedEmail;


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

const h2 = {
  color: '#457b9d',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 15px 0',
};

const text = {
  color: '#495057',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left',
  padding: '0 20px',
};

const card = {
  backgroundColor: '#f8f9fa',
  borderRadius: '6px',
  padding: '20px',
  margin: '20px',
  border: '1px solid #e9ecef',
};

const cardText = {
  ...text,
  padding: '0',
  marginBottom: '10px',
};

const button = {
  backgroundColor: '#22c55e',
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