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
  Row,
  Column,
} from '@react-email/components';
import { logoUrl } from '@/assets/logoConstants';

const AdminNewPartnerEmail = ({
  companyName = 'Testfirma AG',
  contactPerson = 'Max Mustermann',
  email = 'max.mustermann@test.ch',
  phone = '079 123 45 67',
  address = 'Musterstrasse 1, 8000 Zürich',
  website = 'https://testfirma.ch',
  yearFounded = '2010',
  employeeCount = '1-5',
  liabilityInsurance = true,
  commercialRegisterNumber = 'CHE-123.456.789',
  services = ['Privatumzug', 'Reinigung'],
  regions = ['Zürich', 'Aargau'],
  message = 'Wir freuen uns auf die Zusammenarbeit!',
  adminPanelUrl = 'https://online-offerten.ch/admin'
}) => {
  const previewText = `Neue Partner-Anmeldung: ${companyName}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img src={logoUrl} width="200" height="auto" alt="Online-Offerten.ch" />
          </Section>
          <Heading style={h1}>Neue Partner-Anmeldung</Heading>
          <Text style={text}>
            Hallo Admin,
          </Text>
          <Text style={text}>
            Eine neue Firma hat sich auf Online-Offerten.ch als Partner registriert. Bitte prüfen Sie die Angaben und aktivieren Sie das Profil im Admin-Panel.
          </Text>
          
          <Section style={card}>
            <Heading as="h2" style={h2}>Firmendetails</Heading>
            <Row style={row}>
              <Column style={columnLabel}>Firma:</Column>
              <Column style={columnValue}>{companyName}</Column>
            </Row>
            <Row style={row}>
              <Column style={columnLabel}>Kontaktperson:</Column>
              <Column style={columnValue}>{contactPerson}</Column>
            </Row>
            <Row style={row}>
              <Column style={columnLabel}>E-Mail:</Column>
              <Column style={columnValue}><Link href={`mailto:${email}`} style={link}>{email}</Link></Column>
            </Row>
            <Row style={row}>
              <Column style={columnLabel}>Telefon:</Column>
              <Column style={columnValue}><Link href={`tel:${phone}`} style={link}>{phone}</Link></Column>
            </Row>
            <Row style={row}>
              <Column style={columnLabel}>Adresse:</Column>
              <Column style={columnValue}>{address}</Column>
            </Row>
             <Row style={row}>
              <Column style={columnLabel}>Webseite:</Column>
              <Column style={columnValue}><Link href={website} style={link}>{website}</Link></Column>
            </Row>
          </Section>

          <Section style={card}>
            <Heading as="h2" style={h2}>Zusätzliche Informationen</Heading>
            <Row style={row}>
              <Column style={columnLabel}>Gründungsjahr:</Column>
              <Column style={columnValue}>{yearFounded}</Column>
            </Row>
            <Row style={row}>
              <Column style={columnLabel}>Anzahl Mitarbeiter:</Column>
              <Column style={columnValue}>{employeeCount}</Column>
            </Row>
            <Row style={row}>
              <Column style={columnLabel}>Haftpflichtvers.:</Column>
              <Column style={columnValue}>{liabilityInsurance ? 'Ja' : 'Nein'}</Column>
            </Row>
            <Row style={row}>
              <Column style={columnLabel}>Handelsreg.-Nr.:</Column>
              <Column style={columnValue}>{commercialRegisterNumber}</Column>
            </Row>
          </Section>

          <Section style={card}>
            <Heading as="h2" style={h2}>Gewählte Dienstleistungen & Regionen</Heading>
            <Row style={row}>
              <Column style={columnLabel}>Dienstleistungen:</Column>
              <Column style={columnValue}>{services.join(', ')}</Column>
            </Row>
            <Row style={row}>
              <Column style={columnLabel}>Regionen:</Column>
              <Column style={columnValue}>{regions.join(', ')}</Column>
            </Row>
          </Section>

          {message && (
            <Section style={card}>
              <Heading as="h2" style={h2}>Nachricht vom Partner</Heading>
              <Text style={messageText}>{message}</Text>
            </Section>
          )}

          <Section style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link href={adminPanelUrl} style={button}>
              Zum Admin-Panel
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

export default AdminNewPartnerEmail;

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
  width: '150px',
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

const messageText = {
  color: '#495057',
  fontSize: '14px',
  lineHeight: '22px',
  fontStyle: 'italic',
};

const link = {
  color: '#1d3557',
  textDecoration: 'underline',
};

const button = {
  backgroundColor: '#e63946',
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