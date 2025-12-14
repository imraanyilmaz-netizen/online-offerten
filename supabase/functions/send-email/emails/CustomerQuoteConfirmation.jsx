import {
  Body,
  Button,
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
} from 'npm:@react-email/components';
import * as React from 'react';

const baseUrl = 'https://online-offerten.ch';

export const CustomerQuoteConfirmation = ({
  customerName = 'Kunde',
  quoteId = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  siteUrl = 'https://online-offerten.ch',
}) => {
  const previewText = `Ihre Anfrage bei Online-Offerten.ch wurde empfangen!`;
  const statusLink = `${siteUrl}/anfrage-status?quoteId=${quoteId}`;

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
                Vielen Dank für Ihre Anfrage!
              </Heading>
            </Section>
            <Text className="text-base text-gray-700">
              Hallo {customerName},
            </Text>
            <Text className="text-base text-gray-700">
              wir haben Ihre Offertenanfrage mit der Referenznummer{' '}
              <span className="font-semibold text-green-600">#{quoteId.substring(0, 8)}</span>{' '}
              erfolgreich erhalten. Unser Team prüft Ihre Angaben und wird sich in Kürze mit passenden Offerten von geprüften Partnerfirmen bei Ihnen melden.
            </Text>
            <Section className="text-center my-6">
              <Button
                className="bg-green-600 text-white font-semibold rounded-md px-6 py-3"
                href={statusLink}
              >
                Anfragestatus verfolgen
              </Button>
            </Section>
            <Text className="text-base text-gray-700">
              Sie können den Status Ihrer Anfrage jederzeit über den obigen Button oder den folgenden Link einsehen:
            </Text>
            <Link href={statusLink} className="text-green-600 text-sm break-all">
              {statusLink}
            </Link>
            <Hr className="border-gray-300 my-6" />
            <Text className="text-sm text-gray-500">
              Bei Fragen stehen wir Ihnen gerne zur Verfügung.
            </Text>
            <Text className="text-sm text-gray-500">
              Freundliche Grüsse,
              <br />
              Ihr Team von Online-Offerten.ch
            </Text>
            <Section className="text-center mt-8">
              <Link href={siteUrl} className="text-xs text-gray-400">
                © {new Date().getFullYear()} Online-Offerten.ch | Alle Rechte vorbehalten
              </Link>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default CustomerQuoteConfirmation;