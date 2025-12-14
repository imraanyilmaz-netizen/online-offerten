import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Award, ShieldCheck } from 'lucide-react';
import { locations } from '@/data/locations';
import LocationPageNavigation from '@/components/locations/LocationPageNavigation';
import CantonFlag from '@/components/CantonFlag';
import LocationFAQ from '@/components/locations/LocationFAQ';
import { faqs } from '@/data/locationFaqs';
import LocationSidebar from '@/components/locations/LocationSidebar';

const AdvantageItem = ({ text, delay }) => {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.1 + 0.5 }}
      className="flex items-start"
    >
      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
      <span className="text-gray-700 leading-relaxed">{text}</span>
    </motion.li>
  );
};

const UmzugsfirmaLuzernPage = () => {
  const city = "Luzern";
  const locationData = locations.find(loc => loc.name === city);

  const metaTitle = "Umzugsfirma Luzern » Günstig zügeln | Top-Firmen";
  const metaDescription = "Ihre Umzugsfirma in Luzern für einen stressfreien Umzug. Vergleichen Sie kostenlose Offerten von geprüften Zügelfirmen und Reinigungsfirmen in der Region Luzern.";
  const metaKeywords = "umzugsfirma luzern, zügelfirma luzern, umzug luzern, reinigung luzern, umzugsreinigung, umzugsservice luzern";
  const canonicalUrl = "https://online-offerten.ch/umzugsfirma-luzern";

  const advantages = [
    "Bis zu 6 Offerten mit einer einzigen Anfrage vergleichen.",
    "Nur geprüfte und bewertete Umzugsfirmen aus Luzern und Umgebung.",
    "Kostenlos und 100% unverbindlich.",
    "Transparente Preise und detaillierte Leistungsbeschreibungen.",
    "Bis zu 40% der Umzugskosten sparen durch direkten Vergleich."
  ];

  const step1List = [
    "Die genaue Anzahl der Zimmer und die Wohnfläche.",
    "Besondere Gegenstände wie Klaviere oder schwere Möbel.",
    "Zusatzleistungen wie Ein- und Auspackservice oder Möbelmontage."
  ];

  const costs = [
    "2.5-Zimmer-Wohnung: ca. CHF 800 – 1.500",
    "3.5-Zimmer-Wohnung: ca. CHF 1.200 – 2.000",
    "4.5-Zimmer-Wohnung: ca. CHF 1.500 – 2.800"
  ];

  const savingsTips = [
    "Ziehen Sie unter der Woche um, da Wochenenden oft teurer sind.",
    "Packen Sie Ihre Kisten selbst und beschriften Sie sie deutlich.",
    "Entrümpeln Sie vor dem Umzug und verkaufen oder spenden Sie, was Sie nicht mehr brauchen.",
    "Organisieren Sie Halteverbotszonen bei der alten und neuen Adresse rechtzeitig."
  ];

  const faqItemsForSchema = faqs.move.concat(faqs.clean);
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": ["MovingCompany", "Moving and Storage", "CleaningService"],
    "provider": {
      "@type": "Organization",
      "name": `Online-Offerten.ch - Umzugsfirmen in ${city}`
    },
    "areaServed": {
      "@type": "City",
      "name": "Luzern",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Luzern",
        "addressRegion": "LU",
        "addressCountry": "CH"
      }
    },
    "name": metaTitle,
    "description": metaDescription,
    "mainEntity": {
        "@type": "FAQPage",
        "mainEntity": faqItemsForSchema.map(item => ({
            "@type": "Question",
            "name": (item.question.de || item.question).replace('{city}', city),
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer.map(ans => typeof ans === 'string' ? ans : (ans.de || ans)).join(' ').replace(/{city}/g, city)
            }
        }))
    }
  };

  return (
    <>
      
      <div className="bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 py-12 md:py-16">
        <div className="container mx-auto max-w-navbar px-4 md:px-6">
          
          <motion.header 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16 pt-8"
          >
            <div className="inline-block p-3 bg-white rounded-full shadow-xl mb-6">
              <CantonFlag canton={locationData.canton} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4 text-shadow-md">
              Umzugsfirma <span className="text-green-600 underline decoration-green-500 decoration-2 underline-offset-4">Luzern</span> für einen stressfreien Umzug.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Stressfrei umziehen in der Leuchtenstadt. Finden Sie hier geprüfte Umzugs- und Reinigungsfirmen für Ihren Umzug in und um Luzern.
            </p>
          </motion.header>

          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-start">
            <motion.main 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lg:col-span-3 bg-white p-6 md:p-8 rounded-xl shadow-2xl space-y-10"
            >
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Willkommen bei Ihrer Umzugslösung in Luzern</h2>
                <p className="text-gray-700 leading-relaxed mb-4">Ein Umzug in Luzern, der Stadt des Lichts, erfordert sorgfältige Planung und eine zuverlässige Umzugsfirma an Ihrer Seite. Ob Sie innerhalb der malerischen Altstadt, in einen modernen Vorort oder aus einem anderen Kanton nach Luzern ziehen – wir helfen Ihnen, die besten Offerten von lokalen, geprüften Profis zu finden. So wird Ihr Umzug so reibungslos und effizient wie möglich.</p>
                <p className="text-gray-700 leading-relaxed">Unser Portal verbindet Sie mit Top-Umzugsfirmen und Reinigungsunternehmen in der Region Luzern. Erhalten Sie mit nur einer Anfrage bis zu 6 kostenlose und unverbindliche Offerten und wählen Sie die für Sie passende Offerte aus. Sparen Sie Zeit, Geld und Nerven.</p>
              </section>

              <section className="pt-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Ihre Vorteile bei der Firmensuche über uns</h3>
                <ul className="space-y-4">
                  {advantages.map((item, index) => (
                    <AdvantageItem key={index} text={item} delay={index + 1} />
                  ))}
                </ul>
              </section>
              
              <div className="mt-8 text-center bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Bereit für Ihren Umzug in Luzern?</h3>
                <p className="text-gray-700 mb-5">Starten Sie jetzt und erhalten Sie in Kürze Ihre persönlichen Offerten. Der Vergleich lohnt sich!</p>
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white group shadow-lg">
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&city=Luzern">
                    Jetzt kostenlose Offerten anfordern
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <article className="pt-8 border-t border-gray-200 space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">Ihr Umzugs-Leitfaden für Luzern</h2>
                  <p>Ein gut geplanter Umzug ist der halbe Erfolg. Hier sind die wichtigsten Schritte, um Ihren Wohnungswechsel in Luzern optimal vorzubereiten:</p>

                  <h3 className="text-xl font-semibold text-gray-800 pt-4">1. Offerten einholen und vergleichen</h3>
                  <p>Der erste und wichtigste Schritt ist, einen Überblick über die Kosten zu bekommen. Nutzen Sie unser Formular, um Ihre Umzugsdetails anzugeben. Achten Sie auf:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
                    {step1List.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-gray-800 pt-4">2. Die richtige Umzugsfirma auswählen</h3>
                  <p>Vergleichen Sie die erhaltenen Offerten nicht nur nach dem Preis. Achten Sie auf die enthaltenen Leistungen, Versicherungen und Bewertungen anderer Kunden. Eine seriöse Firma bietet:</p>
                  <div className="grid md:grid-cols-3 gap-4 text-center mt-4">
                      <div className="p-4 bg-gray-50 rounded-lg border">
                          <ShieldCheck className="mx-auto h-8 w-8 text-green-600 mb-2"/>
                          <h4 className="font-semibold">Vollständiger Versicherungsschutz</h4>
                          <p className="text-sm text-gray-600">Für den Fall, dass doch mal etwas schiefgeht.</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg border">
                          <Award className="mx-auto h-8 w-8 text-yellow-600 mb-2"/>
                          <h4 className="font-semibold">Erfahrung & gute Bewertungen</h4>
                          <p className="text-sm text-gray-600">Zeugt von Qualität und Zuverlässigkeit.</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg border">
                          <h4 className="font-semibold">Faire und transparente Preise</h4>
                           <p className="text-sm text-gray-600">Keine versteckten Kosten im Nachhinein.</p>
                      </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 pt-4">3. Umzugskosten im Überblick</h3>
                  <p>Die Kosten für einen Umzug in Luzern hängen von vielen Faktoren ab. Als grobe Richtlinie können Sie mit folgenden Preisen rechnen:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
                     {costs.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                  <p className="text-sm text-gray-600 italic mt-2">Diese Preise sind Schätzungen und können je nach Distanz, Stockwerk und Zusatzleistungen variieren.</p>
              </article>
              
              <article className="pt-8 border-t border-gray-200 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Spartipps für Ihren Umzug in Luzern</h2>
                <p>Mit ein paar Tricks können Sie die Kosten für Ihren Umzug deutlich reduzieren:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
                  {savingsTips.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </article>
            </motion.main>

            <LocationSidebar 
              city={city} 
              districts={{
                title: "Stadtteile in Luzern",
                text: "Unsere Partner sind in allen Quartieren von Luzern für Sie im Einsatz:",
                list: [
                  "Altstadt",
                  "Neustadt",
                  "Wesemlin",
                  "Tribschen",
                  "Bramberg",
                  "Hirschmatt",
                  "Maihof",
                  "Biregg",
                  "Littau",
                  "Reussbühl"
                ]
              }}
              searches={{
                title: "Häufige Suchanfragen",
                list: [
                  "Günstige Umzugsfirma Luzern",
                  "Zügeln mit Möbellift",
                  "Umzugsreinigung mit Abnahmegarantie",
                  "Klaviertransport Luzern",
                  "Private Umzüge",
                  "Geschäftsumzüge"
                ]
              }}
            />
          </div>
          
          <LocationFAQ city={city} faqs={faqs} />

          <LocationPageNavigation allLocations={locations} currentCity={city} />
        </div>
      </div>
    </>
  );
};

export default UmzugsfirmaLuzernPage;
