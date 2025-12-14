/** @jsxImportSource react */
import React from 'react';
import { Html, Head, Preview, Body, Container, Section, Img, Text, Heading, Hr, Link, Row, Column } from '@react-email/components';

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
  borderRadius: '8px',
};

const box = {
  padding: '0 48px',
};

const logo = {
  margin: '0 auto',
  width: '200px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const paragraph = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left',
};

const anchor = {
  color: '#006400',
  textDecoration: 'underline',
};

const heading = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '20px',
};

const detailSection = {
  marginTop: '24px',
  padding: '16px',
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
};

const detailTitle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#1e293b',
  marginBottom: '12px',
};

const detailItem = {
  padding: '6px 0',
  borderBottom: '1px solid #e2e8f0',
};

const detailLabel = {
  color: '#64748b',
  fontSize: '14px',
  fontWeight: '600',
  marginBottom: '4px',
};

const detailValue = {
  color: '#334155',
  fontSize: '14px',
  fontWeight: '500',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};

const AdminNewQuoteEmail = ({ quoteData = {} }) => {
  const previewText = `Neue Offertenanfrage für ${quoteData.servicetype || 'N/A'}`;
  const quoteId = quoteData.id ? quoteData.id.substring(0, 8) : 'N/A';
  const adminDashboardUrl = "https://online-offerten.ch/admin-dashboard";

  const details = [
    { label: 'Anfrage-ID', value: `#${quoteId}` },
    { label: 'Dienstleistung', value: quoteData.servicetype },
    { label: 'Art der Anfrage', value: quoteData.umzugart },
    { label: 'Datum', value: quoteData.move_date ? new Date(quoteData.move_date).toLocaleDateString('de-CH') : 'N/A' },
    { label: 'Kunde', value: `${quoteData.salutation || ''} ${quoteData.firstname || ''} ${quoteData.lastname || ''}`.trim() },
    { label: 'E-Mail', value: quoteData.email },
    { label: 'Telefon', value: quoteData.phone },
    { label: 'Von', value: `${quoteData.from_street || ''}, ${quoteData.from_zip || ''} ${quoteData.from_city || ''}`.trim().replace(/^,|,$/g, '') },
    { label: 'Nach', value: `${quoteData.to_street || ''}, ${quoteData.to_zip || ''} ${quoteData.to_city || ''}`.trim().replace(/^,|,$/g, '') },
    { label: 'Zusatzinfos', value: quoteData.additional_info },
  ];

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Heading style={heading}>Neue Offertenanfrage!</Heading>
            <Text style={paragraph}>
              Hallo Admin,
            </Text>
            <Text style={paragraph}>
              Eine neue Offertenanfrage wurde soeben über die Webseite eingereicht. Bitte prüfen und bearbeiten Sie diese.
            </Text>
            
            <Section style={detailSection}>
              <Text style={detailTitle}>Anfragedetails</Text>
              {details.map((item, index) => (
                item.value && (
                  <div key={index} style={detailItem}>
                    <Text style={detailLabel}>{item.label}:</Text>
                    <Text style={detailValue}>{item.value}</Text>
                  </div>
                )
              ))}
            </Section>

            <Link href={adminDashboardUrl} style={{ ...anchor, display: 'block', textAlign: 'center', margin: '20px 0', padding: '12px 20px', backgroundColor: '#22c55e', color: '#ffffff', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
              Zum Admin Dashboard
            </Link>

            <Hr style={hr} />
            <Text style={footer}>
              Dies ist eine automatische Benachrichtigung von Online-Offerten.ch.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default AdminNewQuoteEmail;