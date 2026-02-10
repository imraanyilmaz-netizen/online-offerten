'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, ArrowRight, PiggyBank, Search, Truck, Sparkles, FileText, Users, ThumbsUp, ShieldCheck, Phone, Mail, Award, MessageSquare, Home, Recycle, BadgePercent, ChevronRight, CheckCircle2, Paintbrush } from 'lucide-react';

interface ServiceSelectionButtonProps {
  serviceId: string;
  label: string;
  subLabel: string;
  icon: React.ReactNode;
  onClick: (serviceId: string) => void;
  isSelected: boolean;
  colors: string;
}

const ServiceSelectionButton = ({ serviceId, label, subLabel, icon, onClick, isSelected, colors }: ServiceSelectionButtonProps) => {
  return (
    <div
      className="w-full cursor-pointer"
      onClick={() => onClick(serviceId)}
    >
      <div
        className={`w-full h-auto flex items-center p-4 border transition-all duration-200 ease-in-out shadow-sm hover:shadow-md rounded-xl group
          ${isSelected 
            ? 'border-green-500 ring-2 ring-green-500/50 bg-green-50/50' 
            : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
      >
        <div className="flex items-center w-full">
          {icon && React.isValidElement(icon) && (
            <span className={`mr-4 p-3 rounded-full transition-colors ${colors}`}>
              {React.cloneElement(icon as React.ReactElement, { size: 22 })}
            </span>
          )}
          <div className="text-left flex-grow">
            <span className="font-semibold text-base md:text-lg text-gray-800">{label}</span>
            <p className="text-sm text-gray-500">{subLabel}</p>
          </div>
          <ChevronRight className="w-6 h-6 ml-auto text-gray-400 group-hover:text-gray-500 transition-colors" />
        </div>
      </div>
    </div>
  );
};


const OffertenPortalPageClient = () => {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const heroImageUrl = "https://horizons-cdn.hostinger.com/debf3bb6-240b-49e1-ac20-d04a2d77b10a/cc32bed49a2134c2a84192be30b6d854.jpg";

  const handleServiceSelection = (serviceType: string) => {
    setSelectedService(prevService => prevService === serviceType ? null : serviceType);
  };

  const handleStartRequest = () => {
    if (selectedService) {
      router.push(`/kostenlose-offerte-anfordern?service=${selectedService}`);
    }
  };

  const services = [
    { id: 'umzug', label: 'Umzug', subLabel: 'Privat, Geschäftlich, International & Spezial', icon: <Home />, colors: 'bg-blue-100 text-blue-600' },
    { id: 'reinigung', label: 'Reinigung', subLabel: 'Umzugs-, Büro-, Fensterreinigung & mehr', icon: <Sparkles />, colors: 'bg-yellow-100 text-yellow-500' },
    { id: 'maler', label: 'Malerarbeiten', subLabel: 'Innen-, Aussenanstrich, Fassaden & mehr', icon: <Paintbrush />, colors: 'bg-purple-100 text-purple-500' },
    { id: 'raeumung', label: 'Räumung & Entsorgung', subLabel: 'Wohnungsräumung, Entrümpelung & mehr', icon: <Recycle />, colors: 'bg-pink-100 text-pink-500' },
  ];
  
  const features = [
    'Bis zu 40% sparen',
    'Nur geprüfte Firmen',
    '100% kostenlos & unverbindlich',
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };
  
  const faqItems = [
    {
      q: "Ist die Nutzung von Online-Offerten.ch wirklich kostenlos?",
      a: "Ja, absolut. Unser Service ist für Sie als Auftraggeber von der Anfrage bis zur Auftragsvergabe komplett kostenlos und unverbindlich. Sie zahlen nur die Firma, die Sie am Ende beauftragen."
    },
    {
      q: "Wie viele Offerten erhalte ich?",
      a: "Sie erhalten in der Regel bis zu 5 Offerten von passenden Firmen aus Ihrer Region. So haben Sie eine gute Auswahl, um Preise und Leistungen zu vergleichen."
    },
    {
      q: "Sind die Firmen auf dem Portal geprüft?",
      a: "Ja. Jede Firma wird von uns sorgfältig geprüft. Wir kontrollieren unter anderem den Handelsregistereintrag und das Vorhandensein einer Betriebshaftpflichtversicherung."
    },
    {
      q: "Bin ich verpflichtet, eine der Offerten anzunehmen?",
      a: "Nein, Ihre Anfrage ist absolut unverbindlich. Wenn Ihnen keine der Offerten zusagt, müssen Sie keinen Auftrag vergeben."
    },
    {
      q: "Wie schnell erhalte ich die Offerten?",
      a: "Die meisten Firmen melden sich innerhalb von 24-48 Stunden mit einer Offerte bei Ihnen. Oft erhalten Sie die ersten Offerten sogar schon nach wenigen Stunden."
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Vermittlung von Dienstleistungsangeboten",
    "name": "Offertenportal für Umzug, Reinigung und Malerarbeiten",
    "description": "Kostenloser und unverbindlicher Vergleich von Offerten für Umzüge, Reinigungen und Malerarbeiten in der Schweiz.",
    "provider": {
      "@type": "Organization",
      "name": "Online-Offerten.ch",
      "url": "https://online-offerten.ch"
    },
    "areaServed": {
      "@type": "Country",
      "name": "CH"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Verfügbare Dienstleistungen",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Umzugsdienstleistungen"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Reinigungsdienstleistungen"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Malerarbeiten"
          }
        }
      ]
    },
    "mainEntity": {
        "@type": "FAQPage",
        "mainEntity": faqItems.map(item => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
          }
        }))
    }
  };

  const metaTitle = "Offertenportal für Umzug & Reinigung in der Schweiz";
  const metaDescription = "Finden Sie die besten Angebote für Ihren Umzug oder Ihre Reinigung. Vergleichen Sie kostenlos & unverbindlich geprüfte Firmen in Ihrer Nähe und sparen Sie.";
  const metaKeywords = "Offertenportal, Umzug, Reinigung, Angebote, Firmen vergleichen, Schweiz, Offerten, Umzugsfirma, Reinigungsfirma";
  const canonicalUrl = '/offerten-portal';

  const movingServicesList = [
    { title: "Privatumzüge", description: "Vom kleinen Apartment bis zum grossen Einfamilienhaus." },
    { title: "Geschäftsumzüge", description: "Effiziente und schnelle Verlagerung von Büros und Gewerberäumen." },
    { title: "Internationale Umzüge", description: "Komplettservice für Ihren Umzug ins oder aus dem Ausland." },
    { title: "Spezialtransporte", description: "Sicherer Transport von Klavieren, Kunstwerken und anderen wertvollen Gütern." }
  ];

  const movingCostsList = [
    { title: "Wohnungsgrösse", description: "Die Anzahl der Zimmer und das Volumen des Umzugsguts." },
    { title: "Distanz", description: "Die Entfernung zwischen alter und neuer Adresse." },
    { title: "Stockwerke & Lift", description: "Die Zugänglichkeit der Wohnungen." },
    { title: "Zusatzleistungen", description: "Verpackungsmaterial, De- und Montage von Möbeln etc." }
  ];

  const cleaningGuaranteeList = [
    "Bei der Wohnungsübergabe anwesend zu sein.",
    "Eventuelle Nachreinigungen sofort und ohne zusätzliche Kosten durchzuführen.",
    "Solange zu arbeiten, bis der Vermieter die Sauberkeit im Abnahmeprotokoll bestätigt."
  ];

  const cleaningScopeList = [
    { title: "Umzugsreinigung", description: "Die komplette Endreinigung Ihrer alten Wohnung mit Abnahmegarantie." },
    { title: "Fensterreinigung", description: "Streifenfreie Sauberkeit für Fenster, Rahmen und Storen." },
    { title: "Büroreinigung", description: "Regelmässige Unterhaltsreinigung für saubere und repräsentative Geschäftsräume." },
    { title: "Hauswartung", description: "Umfassende Betreuung und Reinigung von Liegenschaften." },
    { title: "Baureinigung", description: "Professionelle Reinigung nach Neu- oder Umbauten für einen sauberen Start." }
  ];

  const paintingServicesList = [
    { title: "Innenanstriche", description: "Streichen von Wänden, Decken, Türen und Fenstern für ein frisches Wohngefühl." },
    { title: "Fassadenanstriche", description: "Schutz und Verschönerung Ihrer Hausfassade mit wetterbeständigen Farben." },
    { title: "Tapezierarbeiten", description: "Professionelles Anbringen von Tapeten aller Art für eine individuelle Wandgestaltung." },
    { title: "Lackierarbeiten", description: "Hochwertiges Lackieren von Holzwerk, Metallteilen und Heizkörpern." }
  ];

  return (
    <>
      
      <div className="bg-slate-50">
        
      <section className="relative bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${heroImageUrl})` }}>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative container mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-28 z-10">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Offerten von Umzugsfirma & Reinigungsfirma vergleichen</h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto md:mx-0 mb-10">Jetzt Offertenanfrage starten und das beste Angebot für Ihren Umzug oder Ihre Reinigung in der Schweiz finden. Unser <strong>Offertenportal</strong> verbindet Sie mit geprüften Firmen aus Ihrer Region.</p>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li 
                      key={index}
                      className="flex items-center text-white text-base"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200"
              >
                  <div className="space-y-3 mb-6">
                    {services.map((service) => (
                      <ServiceSelectionButton
                        key={service.id}
                        serviceId={service.id}
                        label={service.label}
                        subLabel={service.subLabel}
                        icon={service.icon}
                        onClick={handleServiceSelection}
                        isSelected={selectedService === service.id}
                        colors={service.colors}
                      />
                    ))}
                  </div>
                  
                    {selectedService && (
                      <div
                        className="mb-4"
                      >
                        <Button 
                          size="lg" 
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white group py-3 text-base"
                          onClick={handleStartRequest}
                        >
                          Anfrage jetzt starten
                        </Button>
                      </div>
                    )}
                  
                   <p className="text-center text-xs text-gray-600 px-2">Kostenlos Offerten vergleichen und bis zu 40% sparen.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24 space-y-20 md:space-y-28">

            <section>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-12 text-center">So einfach funktioniert's</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4 border-4 border-white shadow-lg">
                                <FileText className="w-12 h-12 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-2">Anfrage ausfüllen</h3>
                            <p className="text-slate-600">Beschreiben Sie Ihren Auftrag in wenigen Minuten. Je genauer Ihre Angaben, desto präziser die Offerten.</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4 border-4 border-white shadow-lg">
                                <Users className="w-12 h-12 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-2">Offerten erhalten</h3>
                            <p className="text-slate-600">Sie erhalten bis zu 5 massgeschneiderte Offerten von qualitätsgeprüften Firmen aus Ihrer Region.</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4 border-4 border-white shadow-lg">
                                <ThumbsUp className="w-12 h-12 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-2">Auftrag vergeben</h3>
                            <p className="text-slate-600">Vergleichen Sie die Offerten in Ruhe und wählen Sie die Firma, die am besten zu Ihnen passt.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <Card className="bg-white shadow-xl p-6 md:p-10 border-t-4 border-green-500">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Willkommen auf dem Offertenportal Schweiz</h2>
                <div className="prose max-w-none text-slate-600 leading-relaxed space-y-4">
                    <p>Online-Offerten.ch ist Ihr zentrales <strong>Offertenportal</strong>, um schnell, einfach und kostenlos die besten Offerten für Umzüge, Reinigungen und Malerarbeiten in der gesamten Schweiz zu finden. Wir verbinden Sie mit einem Netzwerk von über 200 geprüften und qualifizierten Fachfirmen, die bereit sind, Ihren Auftrag professionell und zuverlässig auszuführen.</p>
                    <p>Egal ob Sie einen Privatumzug planen, eine professionelle Endreinigung benötigen oder Ihre Wände neu streichen lassen möchten – unser <strong>Offertenportal</strong> ist darauf ausgelegt, Ihnen Zeit, Geld und Nerven zu sparen. Mit nur einer Anfrage erreichen Sie mehrere Anbieter und können deren Offerten bequem online vergleichen.</p>
                </div>
                </Card>
            </section>
            
            <section>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 text-center">Alles rund um Ihren Umzug</h2>
                <div className="prose max-w-none text-slate-600 leading-relaxed space-y-4">
                    <p>Ein Umzug muss nicht stressig sein. Mit der richtigen Planung und den passenden Partnern wird Ihr Wohnungswechsel zum Kinderspiel. Auf unserem Portal finden Sie spezialisierte Umzugsfirmen für jede Art von Umzug.</p>
                    
                    <h3 className="text-2xl font-semibold text-slate-700 pt-4">Unsere Umzugsdienstleistungen</h3>
                    <p>Unsere Partner bieten ein breites Spektrum an Dienstleistungen an:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        {movingServicesList.map((item, index) => (
                            <li key={index}><strong>{item.title}:</strong> {item.description}</li>
                        ))}
                    </ul>
                    <p>Zusätzlich können Sie Services wie Möbelmontage, Ein- und Auspackservice oder die Einrichtung von Halteverbotszonen anfragen.</p>

                    <h3 className="text-2xl font-semibold text-slate-700 pt-4">Was kostet ein Umzug?</h3>
                    <p>Die Kosten für einen Umzug hängen von verschiedenen Faktoren ab:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        {movingCostsList.map((item, index) => (
                            <li key={index}><strong>{item.title}:</strong> {item.description}</li>
                        ))}
                    </ul>
                    <p>Durch den Vergleich mehrerer Offerten können Sie sicherstellen, dass Sie einen fairen Preis für die gewünschten Leistungen erhalten.</p>
                </div>
            </section>

            <section>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 text-center">Professionelle Reinigung mit Abnahmegarantie</h2>
                <div className="prose max-w-none text-slate-600 leading-relaxed space-y-4">
                    <p>Eine besenreine Wohnung ist bei der Übergabe Pflicht. Sparen Sie sich den Putzstress und überlassen Sie die Arbeit den Profis. Unsere Partner für Reinigungen garantieren eine reibungslose Wohnungsabgabe.</p>
                    
                    <h3 className="text-2xl font-semibold text-slate-700 pt-4">Die Abnahmegarantie</h3>
                    <p>Was bedeutet die Abnahmegarantie? Es ist Ihr Schutzschild für eine stressfreie Wohnungsübergabe. Die Reinigungsfirma verpflichtet sich:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        {cleaningGuaranteeList.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                    <p>So sind Sie auf der sicheren Seite und können sich entspannt zurücklehnen.</p>

                    <h3 className="text-2xl font-semibold text-slate-700 pt-4">Umfang unserer Reinigungsdienstleistungen</h3>
                    <p>Unsere Partner decken ein breites Spektrum an Reinigungsarbeiten ab, um all Ihren Bedürfnissen gerecht zu werden:</p>
                     <ul className="list-disc pl-5 space-y-2">
                        {cleaningScopeList.map((item, index) => (
                            <li key={index}><strong>{item.title}:</strong> {item.description}</li>
                        ))}
                    </ul>
                    <p>Geben Sie bei Ihrer Anfrage einfach an, was alles gereinigt werden muss, und Sie erhalten eine pauschale offerten.</p>
                </div>
            </section>

            <section>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 text-center">Professionelle Malerarbeiten für Ihr Zuhause</h2>
                <div className="prose max-w-none text-slate-600 leading-relaxed space-y-4">
                    <p>Neue Farbe bringt frischen Wind in Ihre Räume. Ob Innenanstrich, Fassadenrenovierung oder spezielle Malertechniken – unsere qualifizierten Malerpartner sorgen für ein perfektes Ergebnis, das lange Freude bereitet.</p>
                    
                    <h3 className="text-2xl font-semibold text-slate-700 pt-4">Unsere Maler-Dienstleistungen</h3>
                    <p>Verleihen Sie Ihrem Eigentum neuen Glanz mit einer Vielzahl von Malerarbeiten:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        {paintingServicesList.map((item, index) => (
                            <li key={index}><strong>{item.title}:</strong> {item.description}</li>
                        ))}
                    </ul>
                    <p>Unsere Maler beraten Sie gerne bei der Farbauswahl und finden die optimale Lösung für Ihr Projekt.</p>
                </div>
            </section>
            
            <section>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 text-center">Ihre Vorteile auf einen Blick</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Card className="bg-white shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-xl font-bold text-green-800"><PiggyBank className="w-8 h-8 text-green-600"/>Kostenlos vergleichen & sparen</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600">Unser Service ist für Sie zu 100% kostenlos. Durch den direkten Vergleich der Offerten sparen Sie bis zu 40% der Kosten.</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-xl font-bold text-green-800"><ShieldCheck className="w-8 h-8 text-green-600"/>Nur geprüfte Firmen</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600">Wir arbeiten ausschliesslich mit qualitätsgeprüften und versicherten Unternehmen aus der ganzen Schweiz zusammen.</p>
                        </CardContent>
                    </Card>
                     <Card className="bg-white shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-xl font-bold text-green-800"><Award className="w-8 h-8 text-green-600"/>Zeit & Nerven sparen</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600">Mit nur einer Anfrage erreichen Sie mehrere Anbieter. Kein mühsames Suchen und Telefonieren mehr.</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 text-center">Häufig gestellte Fragen</h2>
                <Accordion type="single" collapsible className="w-full bg-white p-4 rounded-lg shadow-xl">
                    {faqItems.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline text-slate-800">
                          <h4 className="faq-question">{item.q}</h4>
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-slate-600 leading-relaxed pt-2 pb-4">
                            {item.a}
                        </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

            <section 
                className="text-center py-16 md:py-20 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl shadow-2xl"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Bereit, die beste Firma für Ihr Vorhaben zu finden?</h2>
                <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto px-4">Starten Sie jetzt Ihre kostenlose Anfrage und erhalten Sie in Kürze die ersten Offerten.</p>
                <Button onClick={() => router.push('/kostenlose-offerte-anfordern')} size="lg" className="bg-white text-green-700 hover:bg-gray-100 font-bold group px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                    Jetzt kostenlos Offerten anfordern
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
            </section>

        </div>
      </div>
    </>
  );
};

export default OffertenPortalPageClient;


