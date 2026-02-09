import React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Heading,
} from '@react-email/components';
import { logoUrl } from '@/assets/logoConstants';

const CustomerQuoteConfirmation = ({
  customerName = 'Kunde',
  quoteId = 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
  statusLink = 'https://online-offerten.ch',
}) => {
  const previewText = `Ihre Anfrage bei Online-Offerten.ch wurde erhalten!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src={logoUrl}
              width="200"
              height="auto"
              alt="Online-Offerten.ch Logo"
              style={logo}
            />
          </Section>
          <Heading style={heading}>
            Vielen Dank für Ihre Anfrage!
          </Heading>
          <Text style={text}>
            Sehr geehrte/r {customerName},
          </Text>
          <Text style={text}>
            vielen Dank für Ihre Anfrage bei Online-Offerten.ch. Wir haben Ihre Daten erhalten und werden diese umgehend bearbeiten. In Kürze erhalten Sie passende und unverbindliche Offerten von unseren geprüften Partnern.
          </Text>
          <Text style={text}>
            Ihre Anfrage-ID lautet: <strong>{quoteId.substring(0, 8)}</strong>
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={statusLink}>
              Anfragestatus ansehen
            </Button>
          </Section>
          <Text style={text}>
            Sie können den Status Ihrer Anfrage auch jederzeit über den obigen Link verfolgen.
          </Text>
          <Hr style={hr} />
          <Text style={text}>
            Bei Fragen stehen wir Ihnen gerne zur Verfügung.
          </Text>
          <Text style={footer}>
            Freundliche Grüsse,
            <br />
            Ihr Team von Online-Offerten.ch
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default CustomerQuoteConfirmation;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  border: '1px solid #f0f0f0',
  borderRadius: '4px',
};

const logoContainer = {
  textAlign: 'center',
  padding: '20px 0',
};

const logo = {
  margin: '0 auto',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center',
  color: '#333',
  padding: '0 30px',
};

const text = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '24px',
  textAlign: 'left',
  padding: '0 30px',
};

const btnContainer = {
  textAlign: 'center',
  padding: '20px 0',
};

const button = {
  backgroundColor: '#22c55e',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'inline-block',
  padding: '12px 24px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0 30px',
};