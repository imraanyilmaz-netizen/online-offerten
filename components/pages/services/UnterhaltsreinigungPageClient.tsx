'use client'

import React, { useMemo } from 'react';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Clock, CheckCircle, Users, Award, Star, Home, Heart, Calendar, RotateCw } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CleaningRatgeberSidebar from '@/components/CleaningRatgeberSidebar';
import { useUserLocation } from '@/hooks/useUserLocation';

const UnterhaltsreinigungPageClient = () => {
  const router = useRouter();
  const { city, loading: locationLoading } = useUserLocation();
  

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=reinigung&step=2');
  };

  // SEO Data
  const metaTitle = "Unterhaltsreinigung â€“ Kostenlose Offerten vergleichen";
  const metaDescription = "Unterhaltsreinigung fÃ¼r BÃ¼ro, Haus oder Wohnung: Fordern Sie kostenlose Offerten an und vergleichen Sie professionelle Reinigungsservices bequem online.";
  // Meta keywords removed - Google no longer uses this tag (since 2009)
  const canonicalUrl = '/reinigung/unterhaltsreinigung';

  // FAQ Data
  const faqItems = [
    {
      q: "Was kostet eine regelmÃ¤ssige Unterhaltsreinigung?",
      a: "Die Kosten fÃ¼r Unterhaltsreinigung hÃ¤ngen von der GrÃ¶sse der Wohnung, der Reinigungsfrequenz und dem Umfang der Leistungen ab. Preise liegen typischerweise zwischen 20 und 40 CHF pro Stunde oder 0.80-1.50 CHF pro mÂ². Eine durchschnittliche 3-Zimmer-Wohnung benÃ¶tigt etwa 2-3 Stunden pro Reinigung. Durch den Vergleich mehrerer Offerten kÃ¶nnen Sie bis zu 40% sparen."
    },
    {
      q: "Wie oft sollte eine Unterhaltsreinigung durchgefÃ¼hrt werden?",
      a: "Die optimale Reinigungsfrequenz hÃ¤ngt von Ihren individuellen BedÃ¼rfnissen ab. Viele Haushalte wÃ¤hlen wÃ¶chentliche, zweiwÃ¶chentliche oder monatliche Reinigung. Die Frequenz kann auch angepasst werden, wenn sich Ihre BedÃ¼rfnisse Ã¤ndern. Professionelle Reinigungsfirmen beraten Sie gerne bei der optimalen Frequenz fÃ¼r Ihre Wohnung."
    },
    {
      q: "Was beinhaltet eine umfassende Unterhaltsreinigung?",
      a: "Eine umfassende Unterhaltsreinigung beinhaltet: Staubwischen aller OberflÃ¤chen, Reinigung der BÃ¶den (Saugen und Wischen), Reinigung der SanitÃ¤ranlagen, Leeren der Abfalleimer, Reinigung der KÃ¼chenbereiche, sowie gegebenenfalls Reinigung der Fenster. Der genaue Umfang kann individuell vereinbart werden."
    },
    {
      q: "Kann ich die Reinigungszeiten flexibel gestalten?",
      a: "Ja, die meisten Reinigungsfirmen bieten flexible Zeiten an. Sie kÃ¶nnen die Reinigungstermine nach Ihren BedÃ¼rfnissen planen, einschliesslich Reinigung wÃ¤hrend Ihrer Abwesenheit oder zu bestimmten Zeiten. Die Reinigungsfrequenz kann auch angepasst werden, wenn sich Ihre BedÃ¼rfnisse Ã¤ndern."
    },
    {
      q: "Sind die ReinigungskrÃ¤fte vertrauenswÃ¼rdig?",
      a: "Ja, seriÃ¶se Reinigungsfirmen prÃ¼fen ihre Mitarbeiter sorgfÃ¤ltig und haben Vertrauensschutzmassnahmen. Alle Reinigungsfirmen in unserem Netzwerk sind versichert und ihre Mitarbeiter sind geschult. Viele Firmen bieten auch Versicherungsschutz fÃ¼r den Fall von SchÃ¤den oder Diebstahl."
    },
    {
      q: "Wie lange dauert eine Unterhaltsreinigung?",
      a: "Die Dauer hÃ¤ngt von der GrÃ¶sse der Wohnung und dem Umfang der Reinigung ab. Eine durchschnittliche 3-Zimmer-Wohnung benÃ¶tigt etwa 2-3 Stunden. GrÃ¶ssere Wohnungen oder zusÃ¤tzliche Leistungen kÃ¶nnen lÃ¤nger dauern. Professionelle Reinigungsfirmen kÃ¶nnen Ihnen eine genaue Zeitangabe nach der Besichtigung geben."
    },
    {
      q: "Werden umweltfreundliche Reinigungsmittel verwendet?",
      a: "Ja, moderne Reinigungsfirmen setzen zunehmend auf umweltfreundliche und gesundheitsschonende Reinigungsmittel. Alle Reinigungsfirmen in unserem Netzwerk verwenden zertifizierte, umweltfreundliche Reinigungsmittel, die effektiv sind, aber gleichzeitig die Umwelt und die Gesundheit schonen."
    }
  ];


  // Single JSON-LD Service schema
  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": metaTitle,
    "serviceType": "Reinigungsvermittlung",
    "description": metaDescription,
    "provider": {
      "@type": "Organization",
      "name": "Online-Offerten.ch",
      "url": "https://online-offerten.ch"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Switzerland"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=reinigung",
      "priceCurrency": "CHF",
      "price": "0",
      "name": "Kostenlose Offerte fÃ¼r Unterhaltsreinigung"
    }
  }), [metaTitle, metaDescription]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="bg-slate-50">
        {/* Hero Section */}
        <section
          className="relative w-full py-8 md:py-12 lg:py-16 overflow-hidden"
        >
          {/* Background Image - Right Side */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://online-offerten.ch/reinigungsfirma/unterhaltsreinigung_hero.png')`,
              maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 100%)'
            }}
          ></div>
          
          {/* Gradient Overlay - White from left to right with shadow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
          
          {/* White shadow/glow effect towards the image */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/20 pointer-events-none"></div>
          <div 
            className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 pointer-events-none"
            style={{
              boxShadow: 'inset -100px 0 100px -50px rgba(255, 255, 255, 0.8)'
            }}
          ></div>
          
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
            <div className="max-w-full">
              {/* Text Section */}
              <div className="px-0 sm:px-4 py-4 sm:py-6 md:py-8 lg:py-12">
                <div
                >
                  <h1 className="heading-1">
                    Professionelle Unterhaltsreinigung
                  </h1>
                </div>
                
                <p
                  className="text-base md:text-body mb-4 md:mb-6 leading-relaxed"
                >
                  RegelmÃ¤ssige Unterhaltsreinigung fÃ¼r ein kontinuierlich sauberes Zuhause. Flexible Reinigungsfrequenz â€“ wÃ¶chentlich, zweiwÃ¶chentlich oder monatlich. Reinigungsofferten online vergleichen und bis zu 40% sparen.
                </p>
                
                <div
                  className="mb-4 md:mb-6"
                >
                  <Button 
                    size="lg" 
                    onClick={handleCtaClick}
                    className="bg-green-700 hover:bg-green-800 text-white font-bold group w-full sm:w-auto px-6 py-4 text-base md:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    Jetzt kostenlose Offerten anfordern
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>

                {/* Additional Trust Elements */}
                <div
                  className="bg-blue-50 rounded-lg p-3 md:p-4 lg:p-6 flex flex-wrap gap-3 md:gap-4 lg:gap-6"
                >
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-body font-medium">Bis zu 40% sparen</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-body font-medium">Nur geprÃ¼fte Firmen</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-body font-medium">100% kostenlos & unverbindlich</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 md:py-12 lg:py-16 xl:py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {/* Main Article */}
              <div className="lg:col-span-2">
                <article
                  className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 mb-6 md:mb-8"
                >
                  {/* H2: Warum eine professionelle Unterhaltsreinigung sinnvoll ist */}
                  <h2 className="heading-2">Warum eine professionelle Unterhaltsreinigung sinnvoll ist</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Eine professionelle regelmÃ¤ssige Reinigung bietet zahlreiche Vorteile, die Ã¼ber die reine Sauberkeit hinausgehen. Sie spart wertvolle Zeit, die Sie fÃ¼r Familie, Beruf oder Hobbys nutzen kÃ¶nnen. Ihr Zuhause bleibt kontinuierlich sauber und gepflegt, ohne dass Sie selbst Zeit investieren mÃ¼ssen. Professionelle ReinigungskrÃ¤fte verfÃ¼gen Ã¼ber das Fachwissen und die richtigen GerÃ¤te, um auch schwer zugÃ¤ngliche Stellen grÃ¼ndlich zu reinigen. Zudem trÃ¤gt eine regelmÃ¤ssige professionelle Reinigung zur Gesundheit bei, indem sie Allergene, Bakterien und Viren effektiv entfernt. Besonders fÃ¼r berufstÃ¤tige Personen, Familien mit Kindern oder Senioren ist eine regelmÃ¤ssige Reinigung eine grosse Entlastung.
                  </p>
                  
                  {/* H2: Unsere Leistungen im Bereich Unterhaltsreinigung */}
                  <h2 className="heading-2">Unsere Leistungen im Bereich Reinigung</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Unser Netzwerk geprÃ¼fter Reinigungsfirmen bietet ein umfassendes Leistungsspektrum fÃ¼r die regelmÃ¤ssige Reinigung. Dazu gehÃ¶ren die regelmÃ¤ssige Reinigung aller RÃ¤ume, inklusive KÃ¼che, Badezimmer, Wohnzimmer und Schlafzimmer. Wir bieten flexible Reinigungsfrequenzen: wÃ¶chentliche, zweiwÃ¶chentliche oder monatliche Reinigung. Alle unsere Partnerfirmen arbeiten mit modernsten Reinigungstechniken und umweltfreundlichen Reinigungsmitteln. Besonders wichtig: Alle Reinigungsfirmen in unserem Netzwerk sind versichert, ihre Mitarbeiter sind vertrauenswÃ¼rdig und geschult, und sie bieten flexible Terminplanung, die sich an Ihre BedÃ¼rfnisse anpasst.
                  </p>

                  {/* Leistungen Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/unterhaltsreinigung_leistungen.png"
                      alt="Unterhaltsreinigungsdienstleistungen - Professionelle regelmÃ¤ssige Reinigung"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Bullet Points - Leistungen */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>RegelmÃ¤ssige Reinigung aller RÃ¤ume</li>
                    <li>Staubwischen aller OberflÃ¤chen</li>
                    <li>GrÃ¼ndliche Bodenreinigung (Saugen und Wischen)</li>
                    <li>KÃ¼chenreinigung inklusive ArbeitsflÃ¤chen und SpÃ¼le</li>
                    <li>Badezimmerreinigung inklusive SanitÃ¤ranlagen</li>
                    <li>Entleerung von Abfalleimern</li>
                    <li>Grundlegende Ordnung und AufrÃ¤umen</li>
                    <li>Fensterreinigung auf Wunsch</li>
                  </ul>

                  {/* CTA 1 - After Leistungen */}
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-green-50 rounded-lg border border-green-200 mb-6 md:mb-8">
                    <h3 className="heading-3">
                      {city && !locationLoading 
                        ? `Professionelle Unterhaltsreinigung in ${city}`
                        : 'Professionelle Unterhaltsreinigung buchen'
                      }
                    </h3>
                    <p className="text-body mb-3 md:mb-4">
                      Reinigungsofferten online vergleichen und bis zu 40% sparen.
                    </p>
                    <Button 
                      onClick={handleCtaClick} 
                      size="lg" 
                      className="bg-green-700 hover:bg-green-800 text-white w-full sm:w-auto text-base font-semibold"
                    >
                      Schnelle Anfrage senden
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>

                  {/* H2: Vorteile unserer regelmÃ¤ssigen Unterhaltsreinigung */}
                  <h2 className="heading-2">Vorteile unserer regelmÃ¤ssigen Unterhaltsreinigung</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    RegelmÃ¤ssige Unterhaltsreinigung bietet zahlreiche Vorteile gegenÃ¼ber sporadischer Reinigung. Sie spart wertvolle Zeit und MÃ¼he, da Sie keine grossen Reinigungsaktionen mehr durchfÃ¼hren mÃ¼ssen. Ihr Zuhause bleibt kontinuierlich sauber und gepflegt, was zu einem angenehmeren Wohnumfeld fÃ¼hrt. Die regelmÃ¤ssige Reinigung verhindert die Ansammlung von Schmutz und erleichtert spÃ¤tere Grundreinigungen erheblich. Zudem trÃ¤gt sie zur Gesundheit bei, indem sie Allergene, Bakterien und Viren regelmÃ¤ssig entfernt. Professionelle Reinigungsfirmen sind versichert und ihre Mitarbeiter sind geschult, was Ihnen Sicherheit und Vertrauen gibt. Durch den Vergleich mehrerer Offerten Ã¼ber unsere Plattform kÃ¶nnen Sie bis zu 40% sparen.
                  </p>

                  {/* Vorteile Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/reinigungsmittel_auf_tisch.webp"
                      alt="Vorteile regelmÃ¤ssiger Unterhaltsreinigung - Kontinuierlich sauberes Zuhause"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Bullet Points - Vorteile */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>Kontinuierlich sauberes Zuhause ohne eigenen Zeitaufwand</li>
                    <li>Nur geprÃ¼fte, versicherte Reinigungsfirmen</li>
                    <li>Flexible Reinigungsfrequenz â€“ wÃ¶chentlich, zweiwÃ¶chentlich, monatlich</li>
                    <li>VertrauenswÃ¼rdige, geschulte ReinigungskrÃ¤fte</li>
                    <li>Umweltfreundliche Reinigungsmittel</li>
                    <li>Anpassbare ReinigungsplÃ¤ne</li>
                  </ul>

                  {/* H2: Was bei einer umfassenden Unterhaltsreinigung gereinigt wird */}
                  <h2 className="heading-2">Was bei einer umfassenden Unterhaltsreinigung gereinigt wird</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Eine umfassende Reinigung beinhaltet die Reinigung aller RÃ¤ume und Bereiche. Dazu gehÃ¶ren das Staubwischen aller OberflÃ¤chen, inklusive Regale, SchrÃ¤nke, FensterbÃ¤nke und HeizkÃ¶rper. Die BÃ¶den werden grÃ¼ndlich gesaugt und gewischt, inklusive Ecken und Kanten. In der KÃ¼che werden Herd, ArbeitsflÃ¤chen, SpÃ¼le und gegebenenfalls KÃ¼hlschrank gereinigt. Das Badezimmer wird komplett gereinigt, inklusive Waschbecken, Spiegel, Dusche oder Badewanne. Abfalleimer werden geleert, und es wird grundlegende Ordnung geschaffen. Fenster kÃ¶nnen auf Wunsch ebenfalls gereinigt werden. Eine professionelle Reinigung geht Ã¼ber das normale Putzen hinaus und sorgt fÃ¼r ein hygienisch sauberes Zuhause.
                  </p>

                  {/* H2: Unterhaltsreinigung fÃ¼r verschiedene RÃ¤ume und Bereiche */}
                  <h2 className="heading-2">Unterhaltsreinigung fÃ¼r verschiedene RÃ¤ume und Bereiche</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Professionelle Reinigung wird fÃ¼r alle RÃ¤ume und Bereiche angeboten, von kleinen Studios bis hin zu grossen FamilienhÃ¤usern. Jeder Raum hat seine eigenen Besonderheiten: KÃ¼chen erfordern die Reinigung von ArbeitsflÃ¤chen, Herd und SpÃ¼le, wÃ¤hrend Badezimmer besondere Aufmerksamkeit fÃ¼r SanitÃ¤ranlagen benÃ¶tigen. Wohnzimmer und Schlafzimmer benÃ¶tigen grÃ¼ndliches Staubwischen und Bodenreinigung. Professionelle Reinigungsfirmen passen ihre Methoden und den Umfang der Reinigung an die spezifischen Anforderungen jedes Raumes an. UnabhÃ¤ngig von der GrÃ¶sse oder Art der RÃ¤ume, alle Reinigungsfirmen in unserem Netzwerk bieten flexible ReinigungsplÃ¤ne, die sich an Ihre BedÃ¼rfnisse anpassen.
                  </p>

                  {/* RÃ¤ume Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/unterhaltsreinigung_raeume.png"
                      alt="Unterhaltsreinigung fÃ¼r verschiedene RÃ¤ume und Bereiche - KÃ¼che, Bad, Wohnzimmer"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Flexible Reinigungsfrequenz â€“ wÃ¶chentlich, zweiwÃ¶chentlich, monatlich */}
                  <h2 className="heading-2">Flexible Reinigungsfrequenz â€“ wÃ¶chentlich, zweiwÃ¶chentlich, monatlich</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Die optimale Reinigungsfrequenz hÃ¤ngt von verschiedenen Faktoren ab: GrÃ¶sse der Wohnung, Anzahl der Bewohner, Lebensstil und individuelle PrÃ¤ferenzen. Viele Haushalte wÃ¤hlen wÃ¶chentliche Reinigung fÃ¼r maximale Sauberkeit, wÃ¤hrend andere zweiwÃ¶chentliche oder monatliche Reinigung bevorzugen. Professionelle Reinigungsfirmen beraten Sie gerne bei der Wahl der passenden Frequenz fÃ¼r Ihre Wohnung. Die Frequenz kann auch angepasst werden, wenn sich Ihre BedÃ¼rfnisse Ã¤ndern. FlexibilitÃ¤t ist ein wichtiger Vorteil bei der Unterhaltsreinigung, da Sie die Reinigung an Ihren Lebensstil anpassen kÃ¶nnen.
                  </p>

                  {/* Frequenz Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/unterhaltsreinigung_frequenz.png"
                      alt="Flexible Reinigungsfrequenz - WÃ¶chentlich, zweiwÃ¶chentlich, monatlich"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Moderne und umweltfreundliche Reinigungsmittel */}
                  <h2 className="heading-2">Moderne und umweltfreundliche Reinigungsmittel</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Moderne Reinigungsfirmen setzen zunehmend auf umweltfreundliche und gesundheitsschonende Reinigungsmittel. Diese sind nicht nur besser fÃ¼r die Umwelt, sondern auch fÃ¼r Ihre Gesundheit und die Ihrer Familie. Biologische Reinigungsmittel sind besonders fÃ¼r Haushalte mit Kindern, Allergikern oder Haustieren empfehlenswert. Sie sind effektiv gegen Schmutz und Bakterien, schonen aber gleichzeitig die Umwelt und die Gesundheit. Unsere Partnerfirmen verwenden ausschliesslich zertifizierte, umweltfreundliche Reinigungsmittel und achten darauf, dass keine schÃ¤dlichen Chemikalien in Ihrer Wohnung zurÃ¼ckbleiben. Dies ist besonders wichtig bei regelmÃ¤ssiger Reinigung, da die Reinigungsmittel regelmÃ¤ssig verwendet werden.
                  </p>

                  {/* Umweltfreundlich Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/umweltfreundliche_reinigungsmittel_modern.webp"
                      alt="Moderne und umweltfreundliche Reinigungsmittel fÃ¼r Unterhaltsreinigung"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Ablauf unserer Unterhaltsreinigung â€“ Schritt fÃ¼r Schritt */}
                  <h2 className="heading-2">Ablauf unserer Unterhaltsreinigung â€“ Schritt fÃ¼r Schritt</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Der Ablauf einer professionellen Unterhaltsreinigung ist strukturiert und effizient. ZunÃ¤chst erfolgt eine Besichtigung der Wohnung, um den Umfang der Reinigung zu bestimmen, die Reinigungsfrequenz zu besprechen und eine genaue Offerte zu erstellen. Nach der AuftragsbestÃ¤tigung wird ein Reinigungsplan erstellt, der zu Ihren BedÃ¼rfnissen passt. Am vereinbarten Reinigungstag erscheint das professionelle Reinigungsteam pÃ¼nktlich mit allen notwendigen GerÃ¤ten und Reinigungsmitteln. Die Reinigung erfolgt systematisch Raum fÃ¼r Raum, beginnend mit den am stÃ¤rksten genutzten Bereichen. Nach Abschluss der Reinigung erfolgt eine kurze QualitÃ¤tskontrolle, und Sie erhalten ein sauberes, gepflegtes Zuhause.
                  </p>

                  {/* Ablauf Steps */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 p-6 md:p-8">
                    <ul className="list-disc list-inside space-y-3 text-body">
                      <li><strong>Besichtigung und Offerte:</strong> Wir besichtigen Ihre Wohnung, besprechen die Reinigungsfrequenz und erstellen eine genaue Offerte.</li>
                      <li><strong>Reinigungsplan erstellen:</strong> Nach der AuftragsbestÃ¤tigung erstellen wir einen Reinigungsplan, der zu Ihren BedÃ¼rfnissen passt.</li>
                      <li><strong>Professionelle Reinigung:</strong> Unser professionelles Team reinigt Ihre Wohnung grÃ¼ndlich mit den richtigen Methoden und GerÃ¤ten.</li>
                      <li><strong>QualitÃ¤tskontrolle:</strong> Nach Abschluss der Reinigung erfolgt eine kurze QualitÃ¤tskontrolle fÃ¼r perfekte Ergebnisse.</li>
                    </ul>
                  </div>

                  {/* H2: Was kostet eine professionelle Unterhaltsreinigung? */}
                  <h2 className="heading-2">Was kostet eine professionelle Unterhaltsreinigung?</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Die Kosten fÃ¼r regelmÃ¤ssige Reinigung hÃ¤ngen von der GrÃ¶sse der Wohnung, der Reinigungsfrequenz und dem Umfang der Leistungen ab. Preise liegen typischerweise zwischen 20 und 40 CHF pro Stunde oder 0.80-1.50 CHF pro mÂ². Eine durchschnittliche 3-Zimmer-Wohnung benÃ¶tigt etwa 2-3 Stunden pro Reinigung. Bei wÃ¶chentlicher Reinigung bedeutet dies monatliche Kosten von etwa 160-480 CHF, bei zweiwÃ¶chentlicher Reinigung etwa 80-240 CHF. GrÃ¶ssere Wohnungen oder zusÃ¤tzliche Leistungen kÃ¶nnen hÃ¶here Kosten verursachen. Durch den Vergleich mehrerer Offerten Ã¼ber unsere Plattform kÃ¶nnen Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen erhalten. Alle Offerten sind kostenlos und unverbindlich.
                  </p>

                  {/* H2: Warum wir der richtige Partner fÃ¼r Ihre Unterhaltsreinigung sind */}
                  <h2 className="heading-2">Warum wir der richtige Partner fÃ¼r Ihre Reinigung sind</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Wir sind der vertrauenswÃ¼rdige Partner fÃ¼r Ihre regelmÃ¤ssige Reinigung. Unser Netzwerk umfasst nur geprÃ¼fte, versicherte Reinigungsfirmen, die hÃ¶chste QualitÃ¤tsstandards erfÃ¼llen. Alle Partnerfirmen verwenden moderne, umweltfreundliche Reinigungsmittel und bieten flexible ReinigungsplÃ¤ne, die sich an Ihre BedÃ¼rfnisse anpassen. Ihre Mitarbeiter sind vertrauenswÃ¼rdig, geschult und versichert. Wir haben bereits Ã¼ber 500 zufriedene Kunden geholfen, die richtige Reinigungsfirma zu finden. Unser Service ist komplett kostenlos und unverbindlich â€“ Sie zahlen nur fÃ¼r die Reinigung selbst, nicht fÃ¼r unsere Vermittlung. Zudem kÃ¶nnen Sie durch den Vergleich mehrerer Offerten bis zu 40% sparen.
                  </p>

                  {/* CTA 2 - After Richtiger Partner */}
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-blue-50 rounded-lg border border-blue-200 mb-6 md:mb-8">
                    <h3 className="heading-3">
                      {city && !locationLoading 
                        ? `Professionelle Unterhaltsreinigung in ${city}`
                        : 'Jetzt kostenlose Offerten anfordern'
                      }
                    </h3>
                    <p className="text-body mb-3 md:mb-4">
                      Reinigungsofferten online vergleichen und bis zu 40% sparen. Ohne Aufpreis, ohne Verpflichtung.
                    </p>
                    <Button 
                      onClick={handleCtaClick} 
                      size="lg" 
                      className="bg-blue-700 hover:bg-blue-800 text-white w-full sm:w-auto text-base font-semibold"
                    >
                      Kostenlose Offerten anfordern
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>

                  {/* Customer Reviews */}
                  <div className="mt-8 md:mt-12">
                  </div>

                  {/* FAQ Section */}
                  <div className="mt-6 md:mt-12">
                    <h2 className="heading-2">HÃ¤ufig gestellte Fragen zur Reinigung</h2>
                    <p className="text-body mb-6 md:mb-8 leading-relaxed">
                      HÃ¤ufig gestellte Fragen zur professionellen Reinigung: Was kostet eine regelmÃ¤ssige Reinigung? Wie oft sollte eine Reinigung durchgefÃ¼hrt werden? Was beinhaltet eine umfassende Reinigung? Kann ich die Reinigungszeiten flexibel gestalten? Sind die ReinigungskrÃ¤fte vertrauenswÃ¼rdig? Wie lange dauert eine Reinigung? Werden umweltfreundliche Reinigungsmittel verwendet? Diese und weitere Fragen beantworten wir Ihnen gerne. Ãœber unsere Plattform kÃ¶nnen Sie Reinigungsofferten online vergleichen und dabei bis zu 40% sparen.
                    </p>
                    <Accordion type="single" collapsible className="w-full">
                      {faqItems.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline text-gray-800 px-2 sm:px-4">
                            <h4 className="faq-question">{item.q}</h4>
                          </AccordionTrigger>
                          <AccordionContent className="text-base text-gray-600 leading-relaxed pt-2 pb-4 px-2 sm:px-4">
                            {item.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>

                  {/* Internal Links */}
                  <div className="mt-8 md:mt-12">
                    <h2 className="heading-2">Weitere Reinigungsdienstleistungen</h2>
                    <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                      <Link href="/reinigung/wohnungsreinigung"
                        className="block p-4 md:p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                      >
                        <h3 className="heading-3">Wohnungsreinigung</h3>
                        <p className="text-sm md:text-base text-gray-600">Professionelle Wohnungsreinigung mit Abnahmegarantie fÃ¼r eine sorgenfreie WohnungsÃ¼bergabe.</p>
                      </Link>
                      <Link href="/reinigung/fensterreinigung"
                        className="block p-4 md:p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                      >
                        <h3 className="heading-3">Fensterreinigung</h3>
                        <p className="text-sm md:text-base text-gray-600">Streifenfreie Fensterreinigung innen und aussen von professionellen Reinigungsfirmen.</p>
                      </Link>
                      <Link href="/reinigung/baureinigung"
                        className="block p-4 md:p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                      >
                        <h3 className="heading-3">Baureinigung</h3>
                        <p className="text-sm md:text-base text-gray-600">GrÃ¼ndliche Baureinigung nach Neubau oder Renovation fÃ¼r perfekte Resultate.</p>
                      </Link>
                    </div>
                  </div>

                  {/* CTA 3 - Final */}
                  <div className="mt-8 md:mt-12 p-4 md:p-6 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="heading-3">
                      {city && !locationLoading 
                        ? `Professionelle Unterhaltsreinigung in ${city}`
                        : 'Jetzt unverbindliche Unterhaltsreinigungs-Offerte anfordern'
                      }
                    </h3>
                    <p className="text-body mb-3 md:mb-4">
                      Reinigungsofferten online vergleichen und bis zu 40% sparen. Alle Offerten beinhalten professionelle Reinigung mit flexibler Terminplanung. Ohne Aufpreis, ohne Verpflichtung. Starten Sie jetzt Ihre kostenlose Anfrage und finden Sie die perfekte Reinigungsfirma fÃ¼r Ihre BedÃ¼rfnisse.
                    </p>
                    <Button 
                      onClick={handleCtaClick} 
                      size="lg" 
                      className="bg-green-700 hover:bg-green-800 text-white w-full sm:w-auto text-base font-semibold"
                    >
                      Jetzt kostenlose Offerten anfordern
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <aside className="space-y-4 md:space-y-6">
                  {/* Ratgeber Sidebar */}
                  <CleaningRatgeberSidebar />
                </aside>
                
                {/* Sticky CTA Section - Outside aside for proper sticky behavior */}
                <div className="mt-4 md:mt-6 lg:sticky lg:top-24 lg:self-start">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 md:p-6 border border-blue-100">
                    <h3 className="heading-3">Jetzt Offerten anfordern</h3>
                    <p className="text-gray-700 mb-3 md:mb-4 text-base">Kostenlos und unverbindlich Reinigungsofferten online vergleichen.</p>
                    <Button 
                      onClick={handleCtaClick} 
                      className="w-full bg-blue-700 hover:bg-blue-800 text-white text-base font-semibold"
                    >
                      Offerten anfordern
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default UnterhaltsreinigungPageClient;
