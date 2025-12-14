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
  Tailwind,
  Button,
} from 'npm:@react-email/components';
import * as React from 'react';

const baseUrl = 'https://online-offerten.ch';

const formatValue = (value) => {
  if (typeof value === 'boolean') {
    return value ? 'Ja' : 'Nein';
  }
  if (!value) {
    return <span className="text-gray-400">Nicht angegeben</span>;
  }
  return value;
};

export const AdminNewQuoteEmail = ({
  quoteData = {},
  siteUrl = 'https://online-offerten.ch',
}) => {
  const previewText = `Neue Anfrage: ${quoteData.servicetype || 'Service'} von ${quoteData.firstname || ''} ${quoteData.lastname || ''}`;
  const adminLink = `${siteUrl}/admin-dashboard`;

  const details = [
    { label: 'Anfrage-ID', value: quoteData.id?.substring(0, 8) },
    { label: 'Dienstleistung', value: quoteData.servicetype },
    { label: 'Kunde', value: `${quoteData.salutation || ''} ${quoteData.firstname || ''} ${quoteData.lastname || ''}`.trim() },
    { label: 'E-Mail', value: quoteData.email },
    { label: 'Telefon', value: quoteData.phone },
    { label: 'Umzugsdatum', value: quoteData.move_date ? new Date(quoteData.move_date).toLocaleDateString('de-CH') : 'N/A' },
    { label: 'Flexibel', value: formatValue(quoteData.move_date_flexible) },
  ];

  const fromAddress = [
    quoteData.from_street,
    `${quoteData.from_zip || ''} ${quoteData.from_city || ''}`.trim(),
    quoteData.from_country,
  ].filter(Boolean).join(', ');

  const toAddress = [
    quoteData.to_street,
    `${quoteData.to_zip || ''} ${quoteData.to_city || ''}`.trim(),
    quoteData.to_country,
  ].filter(Boolean).join(', ');

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white border border-gray-200 rounded-lg mx-auto p-8 my-8 max-w-2xl">
            <Section className="text-center">
              <Img
                src={`${baseUrl}/favicon-192x192.png`}
                width="48"
                height="48"
                alt="Online-Offerten.ch Logo"
                className="mx-auto"
              />
              <Heading className="text-2xl font-bold text-gray-800 mt-4">
                Neue Offertenanfrage!
              </Heading>
            </Section>
            <Text className="text-base text-gray-700">
              Hallo Admin,
            </Text>
            <Text className="text-base text-gray-700">
              Eine neue Anfrage wurde soeben über das Portal eingereicht. Hier sind die Details:
            </Text>

            <Section className="border border-gray-200 rounded-md p-4 my-6">
              {details.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="flex justify-between py-2">
                    <Text className="text-sm font-semibold text-gray-600 m-0">{item.label}:</Text>
                    <Text className="text-sm text-gray-800 text-right m-0">{formatValue(item.value)}</Text>
                  </div>
                  {index < details.length - 1 && <Hr className="border-gray-200 my-0" />}
                </React.Fragment>
              ))}
            </Section>

            {fromAddress && (
              <Section>
                <Heading as="h3" className="text-lg font-semibold text-gray-800 mt-6 mb-2">Adressdetails</Heading>
                <div className="border border-gray-200 rounded-md p-4">
                  <Text className="text-sm m-0"><span className="font-semibold">Von:</span> {fromAddress}</Text>
                  {toAddress && <Text className="text-sm m-0 mt-2"><span className="font-semibold">Nach:</span> {toAddress}</Text>}
                </div>
              </Section>
            )}

            {quoteData.additional_info && (
              <Section>
                <Heading as="h3" className="text-lg font-semibold text-gray-800 mt-6 mb-2">Zusätzliche Informationen</Heading>
                <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                  <Text className="text-sm text-gray-700 m-0">{quoteData.additional_info}</Text>
                </div>
              </Section>
            )}

            <Section className="text-center my-8">
              <Button
                className="bg-green-600 text-white font-semibold rounded-md px-6 py-3"
                href={adminLink}
              >
                Zum Admin-Dashboard
              </Button>
            </Section>

            <Hr className="border-gray-300 my-6" />
            <Text className="text-xs text-gray-500 text-center">
              Diese E-Mail wurde automatisch generiert.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default AdminNewQuoteEmail;