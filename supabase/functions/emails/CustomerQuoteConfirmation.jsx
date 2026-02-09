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
  display: 'flex',
  justifyContent: 'space-between',
  padding: '6px 0',
};

const detailLabel = {
  color: '#64748b',
  fontSize: '14px',
};

const detailValue = {
  color: '#334155',
  fontSize: '14px',
  fontWeight: '500',
  textAlign: 'right',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};

const CustomerQuoteConfirmation = ({ quoteData = {} }) => {
  const previewText = `Ihre Offertenanfrage wurde erfolgreich übermittelt!`;
  const quoteId = quoteData.id ? quoteData.id.substring(0, 8) : 'N/A';
  const siteUrl = "https://online-offerten.ch";

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Heading style={heading}>Vielen Dank für Ihre Anfrage!</Heading>
            <Text style={paragraph}>
              Sehr geehrte/r {quoteData.salutation === 'Herr' ? 'Herr' : 'Frau'} {quoteData.lastname || 'Kunde'},
            </Text>
            <Text style={paragraph}>
              Wir haben Ihre Offertenanfrage mit der Referenznummer <strong>#{quoteId}</strong> erfolgreich erhalten. Unsere Partner werden Ihre Anfrage prüfen und Ihnen in Kürze ihre besten Offerten zukommen lassen.
            </Text>
            <Text style={paragraph}>
              In der Zwischenzeit können Sie den Status Ihrer Anfrage jederzeit über den folgenden Link verfolgen:
            </Text>
            <Link href={`${siteUrl}/anfrage-status/${quoteData.id}`} style={{ ...anchor, display: 'block', textAlign: 'center', margin: '20px 0', padding: '12px 20px', backgroundColor: '#22c55e', color: '#ffffff', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
              Anfragestatus ansehen
            </Link>
            
            <Section style={detailSection}>
              <Text style={detailTitle}>Ihre Anfragedetails</Text>
              <Row style={detailItem}>
                <Column style={detailLabel}>Dienstleistung:</Column>
                <Column style={detailValue}>{quoteData.servicetype || 'N/A'}</Column>
              </Row>
              {quoteData.umzugart && (
                <Row style={detailItem}>
                  <Column style={detailLabel}>Art:</Column>
                  <Column style={detailValue}>{quoteData.umzugart}</Column>
                </Row>
              )}
              <Row style={detailItem}>
                <Column style={detailLabel}>Datum:</Column>
                <Column style={detailValue}>{quoteData.move_date ? new Date(quoteData.move_date).toLocaleDateString('de-CH') : 'N/A'}</Column>
              </Row>
              {quoteData.from_city && (
                <Row style={detailItem}>
                  <Column style={detailLabel}>Von:</Column>
                  <Column style={detailValue}>{quoteData.from_zip} {quoteData.from_city}</Column>
                </Row>
              )}
              {quoteData.to_city && (
                <Row style={detailItem}>
                  <Column style={detailLabel}>Nach:</Column>
                  <Column style={detailValue}>{quoteData.to_zip} {quoteData.to_city}</Column>
                </Row>
              )}
            </Section>

            <Hr style={hr} />
            <Text style={paragraph}>
              Bei Fragen stehen wir Ihnen jederzeit zur Verfügung.
            </Text>
            <Text style={paragraph}>
              Freundliche Grüsse,<br />
              Ihr Team von Online-Offerten.ch
            </Text>
            <Hr style={hr} />
            <Text style={footer}>
              Online-Offerten.ch | <Link href={`${siteUrl}/kontakt`} style={anchor}>Kontakt</Link> | <Link href={`${siteUrl}/datenschutz`} style={anchor}>Datenschutz</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default CustomerQuoteConfirmation;