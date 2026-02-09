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
  Row,
  Column,
} from 'npm:@react-email/components';

const PartnerNewQuoteEmail = ({
  quoteData = {},
  appBaseUrl = 'https://online-offerten.ch'
}) => {
  const previewText = `Neue Anfrage für Sie: ${quoteData.servicetype || 'Allgemein'}`;
  const logoUrl = 'https://godi4fhkodqgtoyvcszja.supabase.co/storage/v1/object/public/logos/logo-full-c.png';
  const dashboardLink = `${appBaseUrl}/partner-dashboard`;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img src={logoUrl} width="200" height="auto" alt="Online-Offerten.ch" />
          </Section>
          <Heading style={h1}>Neue Anfrage für Sie!</Heading>
          <Text style={text}>
            Hallo,
          </Text>
          <Text style={text}>
            Eine neue Anfrage, die Ihren Kriterien entspricht, ist soeben auf unserer Plattform eingegangen.
          </Text>
          
          <Section style={card}>
            <Heading as="h2" style={h2}>Anfragedetails</Heading>
            <Row style={row}>
              <Column style={columnLabel}>Dienstleistung:</Column>
              <Column style={columnValue}>{quoteData.servicetype || 'N/A'}</Column>
            </Row>
            <Row style={row}>
              <Column style={columnLabel}>Von:</Column>
              <Column style={columnValue}>{quoteData.from_zip || ''} {quoteData.from_city || ''}</Column>
            </Row>
            {quoteData.to_city && (
              <Row style={row}>
                <Column style={columnLabel}>Nach:</Column>
                <Column style={columnValue}>{quoteData.to_zip || ''} {quoteData.to_city || ''}</Column>
              </Row>
            )}
            <Row style={row}>
              <Column style={columnLabel}>Datum:</Column>
              <Column style={columnValue}>{formatDate(quoteData.move_date)}</Column>
            </Row>
          </Section>

          <Text style={text}>
            Loggen Sie sich in Ihr Dashboard ein, um die vollständigen Details zu sehen und die Anfrage zu erwerben.
          </Text>

          <Section style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link href={dashboardLink} style={button}>
              Zum Partner-Dashboard
            </Link>
          </Section>

          <Hr style={hr} />
          <Text style={footer}>
            Online-Offerten.ch | Automatisierte Benachrichtigung
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default PartnerNewQuoteEmail;

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
  borderBottom: '1px solid #e9ecef',
  paddingBottom: '8px',
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

const row = {
  marginBottom: '10px',
};

const columnLabel = {
  width: '120px',
  color: '#6c757d',
  fontSize: '14px',
  verticalAlign: 'top',
};

const columnValue = {
  color: '#212529',
  fontSize: '14px',
  fontWeight: '500',
  verticalAlign: 'top',
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