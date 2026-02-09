'use client'

import React, { useMemo } from 'react';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle, Star, Home, Heart, Calendar, Award, ShieldCheck } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CleaningRatgeberSidebar from '@/components/CleaningRatgeberSidebar';
import { useUserLocation } from '@/hooks/useUserLocation';

const GrundreinigungPageClient = () => {
  const router = useRouter();
  const { city, loading: locationLoading } = useUserLocation();
  

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=reinigung&step=2');
  };

  // SEO Data
  const metaTitle = "Grundreinigung â€“ Kostenlose Offerten vergleichen";
  const metaDescription = "GrÃ¼ndliche Grundreinigung vom Profi: Erhalten Sie kostenlose Angebote von zertifizierten Reinigungsfirmen und wÃ¤hlen Sie den besten Anbieter aus.";
  // Meta keywords removed - Google no longer uses this tag (since 2009)
  const canonicalUrl = '/reinigung/grundreinigung';

  // FAQ Data
  const faqItems = [
    {
      q: "Was kostet eine Grundreinigung?",
      a: "Die Kosten fÃ¼r Grundreinigung hÃ¤ngen von der GrÃ¶sse der Wohnung, dem Zustand und dem Umfang der Reinigung ab. Eine durchschnittliche 3-Zimmer-Wohnung kostet etwa 300-600 CHF und benÃ¶tigt etwa 4-6 Stunden. GrÃ¶ssere Wohnungen oder stark verschmutzte Bereiche kÃ¶nnen hÃ¶here Kosten verursachen. Durch den Vergleich mehrerer Offerten kÃ¶nnen Sie bis zu 40% sparen."
    },
    {
      q: "Wann sollte eine Grundreinigung durchgefÃ¼hrt werden?",
      a: "Eine Grundreinigung sollte idealerweise bei Einzug, Auszug, nach Renovierungsarbeiten oder periodisch (z.B. ein- bis zweimal jÃ¤hrlich) durchgefÃ¼hrt werden. Sie ist besonders wichtig, wenn eine Wohnung lÃ¤ngere Zeit nicht gereinigt wurde oder wenn tief sitzender Schmutz entfernt werden soll."
    },
    {
      q: "Was beinhaltet eine umfassende Grundreinigung?",
      a: "Eine umfassende Grundreinigung beinhaltet: grÃ¼ndliche Reinigung aller RÃ¤ume, Entfernung von tief sitzendem Schmutz, Reinigung der BÃ¶den inklusive Ecken und Kanten, Reinigung der KÃ¼che inklusive Herd, Backofen und KÃ¼hlschrank, grÃ¼ndliche Reinigung des Badezimmers inklusive Entkalkung, Reinigung der Fenster innen und aussen, sowie Reinigung von HeizkÃ¶rpern, LÃ¼ftungsgittern und Lampen."
    },
    {
      q: "Wie lange dauert eine Grundreinigung?",
      a: "Die Dauer hÃ¤ngt von der GrÃ¶sse der Wohnung und dem Zustand ab. Eine durchschnittliche 3-Zimmer-Wohnung benÃ¶tigt etwa 4-6 Stunden. GrÃ¶ssere Wohnungen oder stark verschmutzte Bereiche kÃ¶nnen lÃ¤nger dauern. Professionelle Reinigungsfirmen kÃ¶nnen Ihnen nach der Besichtigung eine genaue Zeitangabe geben."
    },
    {
      q: "Was ist der Unterschied zwischen Grundreinigung und Unterhaltsreinigung?",
      a: "Eine Grundreinigung ist eine intensive, grÃ¼ndliche Reinigung, die alle Bereiche umfasst und tief sitzenden Schmutz entfernt. Sie wird ein- bis zweimal jÃ¤hrlich durchgefÃ¼hrt. Eine Unterhaltsreinigung ist eine regelmÃ¤ssige, oberflÃ¤chliche Reinigung zur Aufrechterhaltung der Sauberkeit, die wÃ¶chentlich, zweiwÃ¶chentlich oder monatlich durchgefÃ¼hrt wird."
    },
    {
      q: "Welche Reinigungsmethoden werden verwendet?",
      a: "Grundreinigung erfordert spezielle Methoden und GerÃ¤te: Dampfreinigung fÃ¼r hartnÃ¤ckige Verschmutzungen, Hochdruckreinigung fÃ¼r Aussenbereiche, spezielle Reinigungsmittel fÃ¼r Kalk, Fett oder Rost, sowie professionelle GerÃ¤te fÃ¼r Teppichreinigung. Professionelle Reinigungsfirmen haben das Wissen und die AusrÃ¼stung fÃ¼r alle Arten von Verschmutzungen."
    },
    {
      q: "Werden umweltfreundliche Reinigungsmittel verwendet?",
      a: "Ja, moderne Reinigungsfirmen setzen zunehmend auf umweltfreundliche und gesundheitsschonende Reinigungsmittel, auch bei intensiven Grundreinigungen. Alle Reinigungsfirmen in unserem Netzwerk verwenden zertifizierte, umweltfreundliche Reinigungsmittel, die effektiv sind, aber gleichzeitig die Umwelt und die Gesundheit schonen."
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
      "name": "Kostenlose Offerte fÃ¼r Grundreinigung"
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
              backgroundImage: `url('https://online-offerten.ch/reinigungsfirma/grundreinigung_hero.png')`,
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
                    Professionelle Grundreinigung
                  </h1>
                </div>
                
                <p
                  className="text-base md:text-body mb-4 md:mb-6 leading-relaxed"
                >
                  GrÃ¼ndliche und intensive Grundreinigung fÃ¼r ein tiefenreines Zuhause. Professionelle Tiefenreinigung aller Bereiche. Reinigungsofferten online vergleichen und bis zu 40% sparen.
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
                  {/* H2: Warum eine professionelle Grundreinigung sinnvoll ist */}
                  <h2 className="heading-2">Warum eine professionelle Grundreinigung sinnvoll ist</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Eine professionelle Tiefenreinigung bietet zahlreiche Vorteile, die Ã¼ber die normale Unterhaltsreinigung hinausgehen. Sie entfernt tief sitzenden Schmutz, Kalkablagerungen, Fettspuren und andere hartnÃ¤ckige Verschmutzungen, die bei der regelmÃ¤ssigen Reinigung nicht erreicht werden. Eine intensive Reinigung sollte idealerweise ein- bis zweimal jÃ¤hrlich durchgefÃ¼hrt werden, um Ihr Zuhause in optimalem Zustand zu halten. Professionelle ReinigungskrÃ¤fte verfÃ¼gen Ã¼ber das Fachwissen, spezielle GerÃ¤te und intensive Reinigungsmethoden, um auch schwer zugÃ¤ngliche Stellen grÃ¼ndlich zu reinigen. Zudem trÃ¤gt eine regelmÃ¤ssige Tiefenreinigung zur Gesundheit bei, indem sie Allergene, Bakterien und Viren effektiv entfernt und die RaumluftqualitÃ¤t verbessert.
                  </p>
                  
                  {/* H2: Unsere Leistungen im Bereich Grundreinigung */}
                  <h2 className="heading-2">Unsere Leistungen im Bereich Reinigung</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Unser Netzwerk geprÃ¼fter Reinigungsfirmen bietet ein umfassendes Leistungsspektrum fÃ¼r die intensive Tiefenreinigung. Dazu gehÃ¶ren die intensive Reinigung aller RÃ¤ume, inklusive KÃ¼che, Badezimmer, Wohnzimmer und Schlafzimmer. Wir bieten Tiefenreinigung fÃ¼r verschiedene AnlÃ¤sse: Einzug, Auszug, nach Renovierungsarbeiten oder periodisch zur intensiven Pflege. Alle unsere Partnerfirmen arbeiten mit modernsten Reinigungstechniken, speziellen GerÃ¤ten wie Dampfreinigern und umweltfreundlichen Reinigungsmitteln. Besonders wichtig: Alle Reinigungsfirmen in unserem Netzwerk sind versichert, haben Erfahrung mit intensiven Reinigungen und verwenden professionelle Methoden fÃ¼r alle Arten von Verschmutzungen.
                  </p>

                  {/* Leistungen Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/grundreinigung_leistungen.png"
                      alt="Grundreinigungsdienstleistungen - Professionelle intensive Tiefenreinigung"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Bullet Points - Leistungen */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>Intensive Reinigung aller RÃ¤ume</li>
                    <li>Entfernung von tief sitzendem Schmutz und Ablagerungen</li>
                    <li>Reinigung hinter und unter MÃ¶beln</li>
                    <li>GrÃ¼ndliche Reinigung aller BÃ¶den inklusive Ecken und Kanten</li>
                    <li>KÃ¼chenreinigung inklusive Herd, Backofen, KÃ¼hlschrank</li>
                    <li>Intensive Badezimmerreinigung inklusive Entkalkung</li>
                    <li>Fensterreinigung innen und aussen inklusive Rahmen</li>
                    <li>Reinigung von HeizkÃ¶rpern, LÃ¼ftungsgittern und Lampen</li>
                  </ul>

                  {/* CTA 1 - After Leistungen */}
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-green-50 rounded-lg border border-green-200 mb-6 md:mb-8">
                    <h3 className="heading-3">
                      {city && !locationLoading 
                        ? `Professionelle Grundreinigung in ${city}`
                        : 'Professionelle Grundreinigung buchen'
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

                  {/* H2: Vorteile unserer grÃ¼ndlichen Grundreinigung */}
                  <h2 className="heading-2">Vorteile unserer grÃ¼ndlichen Grundreinigung</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Eine grÃ¼ndliche Tiefenreinigung bietet zahlreiche Vorteile gegenÃ¼ber der normalen Unterhaltsreinigung. Sie entfernt tief sitzenden Schmutz und Allergene, die bei oberflÃ¤chlicher Reinigung zurÃ¼ckbleiben. Sie verlÃ¤ngert die Lebensdauer von MÃ¶beln und OberflÃ¤chen, indem sie Ablagerungen und Verschmutzungen entfernt, die langfristig SchÃ¤den verursachen kÃ¶nnen. Eine intensive Reinigung verbessert die RaumluftqualitÃ¤t erheblich und erleichtert die tÃ¤gliche Unterhaltsreinigung, da weniger Schmutz vorhanden ist. Professionelle Reinigungsfirmen verwenden spezielle Methoden und GerÃ¤te, die fÃ¼r intensive Reinigungen entwickelt wurden. Durch den Vergleich mehrerer Offerten Ã¼ber unsere Plattform kÃ¶nnen Sie bis zu 40% sparen.
                  </p>

                  {/* Vorteile Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/reinigungsmittel_auf_tisch.webp"
                      alt="Vorteile grÃ¼ndlicher Grundreinigung - Intensive Reinigungsmethoden"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Bullet Points - Vorteile */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>Entfernung von tief sitzendem Schmutz und Allergenen</li>
                    <li>Nur geprÃ¼fte, versicherte Reinigungsfirmen</li>
                    <li>Spezielle Methoden und GerÃ¤te fÃ¼r intensive Reinigung</li>
                    <li>VerlÃ¤ngerung der Lebensdauer von MÃ¶beln und OberflÃ¤chen</li>
                    <li>Verbesserung der RaumluftqualitÃ¤t</li>
                    <li>Erleichterung der tÃ¤glichen Unterhaltsreinigung</li>
                  </ul>

                  {/* H2: Was bei einer umfassenden Grundreinigung gereinigt wird */}
                  <h2 className="heading-2">Was bei einer umfassenden Grundreinigung gereinigt wird</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Eine umfassende Tiefenreinigung beinhaltet die intensive Reinigung aller RÃ¤ume und Bereiche. Dazu gehÃ¶rt die Entfernung aller MÃ¶bel zur Reinigung darunter und dahinter, die grÃ¼ndliche Reinigung aller BÃ¶den inklusive Ecken, Kanten und schwer zugÃ¤nglicher Stellen. Alle OberflÃ¤chen werden intensiv gereinigt, inklusive Regale, SchrÃ¤nke, FensterbÃ¤nke und HeizkÃ¶rper. In der KÃ¼che werden Herd, Backofen, KÃ¼hlschrank, SpÃ¼le, ArbeitsflÃ¤chen und SchrÃ¤nke innen und aussen gereinigt. Das Badezimmer wird komplett gereinigt, inklusive Entkalkung, Reinigung von Toilette, Dusche, Badewanne, Waschbecken und Fliesen. Fenster werden innen und aussen gereinigt, inklusive Rahmen und BÃ¤nke. HeizkÃ¶rper, LÃ¼ftungsgittern, Lampen und alle schwer zugÃ¤nglichen Stellen werden grÃ¼ndlich gereinigt.
                  </p>

                  {/* H2: Grundreinigung fÃ¼r verschiedene AnlÃ¤sse (Einzug, Auszug, nach Renovation) */}
                  <h2 className="heading-2">Grundreinigung fÃ¼r verschiedene AnlÃ¤sse (Einzug, Auszug, nach Renovation)</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Professionelle Tiefenreinigung wird fÃ¼r verschiedene AnlÃ¤sse angeboten, die alle intensive Reinigung erfordern. Tiefenreinigung bei Einzug sorgt dafÃ¼r, dass Sie in eine saubere, hygienische Wohnung einziehen. Intensive Reinigung bei Auszug stellt sicher, dass die Wohnung den Anforderungen fÃ¼r die Ãœbergabe entspricht. Tiefenreinigung nach Renovierungsarbeiten entfernt Bauschutt, Staub und Farbreste, die bei Renovierungen entstehen. Periodische Tiefenreinigung (ein- bis zweimal jÃ¤hrlich) hÃ¤lt Ihr Zuhause in optimalem Zustand und entfernt tief sitzenden Schmutz, der sich Ã¼ber Zeit ansammelt. Professionelle Reinigungsfirmen passen ihre Methoden und den Umfang der Reinigung an den spezifischen Anlass an.
                  </p>

                  {/* AnlÃ¤sse Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/grundreinigung_anlaesse.png"
                      alt="Grundreinigung fÃ¼r verschiedene AnlÃ¤sse - Einzug, Auszug, nach Renovation"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Intensive Reinigungsmethoden und Spezialtechniken */}
                  <h2 className="heading-2">Intensive Reinigungsmethoden und Spezialtechniken</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Tiefenreinigung erfordert spezielle Methoden und GerÃ¤te, die Ã¼ber die normale Reinigung hinausgehen. Dampfreinigung wird fÃ¼r hartnÃ¤ckige Verschmutzungen verwendet und entfernt tief sitzenden Schmutz und Bakterien. Hochdruckreinigung wird fÃ¼r Aussenbereiche und besonders verschmutzte OberflÃ¤chen eingesetzt. Spezielle Reinigungsmittel fÃ¼r Kalk, Fett oder Rost werden verwendet, um Ablagerungen zu entfernen. Professionelle GerÃ¤te fÃ¼r Teppichreinigung entfernen tief sitzenden Schmutz aus Textilien. Spezielle Techniken fÃ¼r empfindliche OberflÃ¤chen wie Holz oder Naturstein werden angewendet, um SchÃ¤den zu vermeiden. Professionelle Reinigungsfirmen haben das Wissen und die AusrÃ¼stung fÃ¼r alle Arten von Verschmutzungen und verwenden die richtigen Methoden fÃ¼r jedes Material.
                  </p>

                  {/* Methoden Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/grundreinigung_methoden.png"
                      alt="Intensive Reinigungsmethoden und Spezialtechniken - Dampfreinigung, Hochdruckreinigung"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Moderne und umweltfreundliche Reinigungsmittel */}
                  <h2 className="heading-2">Moderne und umweltfreundliche Reinigungsmittel</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Moderne Reinigungsfirmen setzen zunehmend auf umweltfreundliche und gesundheitsschonende Reinigungsmittel, auch bei intensiven Reinigungen. Diese sind nicht nur besser fÃ¼r die Umwelt, sondern auch fÃ¼r Ihre Gesundheit und die Ihrer Familie. Biologische Reinigungsmittel sind besonders fÃ¼r Haushalte mit Kindern, Allergikern oder Haustieren empfehlenswert. Sie sind effektiv gegen hartnÃ¤ckigen Schmutz, Kalk und Bakterien, schonen aber gleichzeitig die Umwelt und die Gesundheit. Unsere Partnerfirmen verwenden ausschliesslich zertifizierte, umweltfreundliche Reinigungsmittel und achten darauf, dass keine schÃ¤dlichen Chemikalien in Ihrer Wohnung zurÃ¼ckbleiben. Dies ist besonders wichtig bei Tiefenreinigung, da intensive Reinigungsmittel verwendet werden.
                  </p>

                  {/* Umweltfreundlich Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/umweltfreundliche_reinigungsmittel_modern.webp"
                      alt="Moderne und umweltfreundliche Reinigungsmittel fÃ¼r Grundreinigung"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Ablauf unserer Grundreinigung â€“ Schritt fÃ¼r Schritt */}
                  <h2 className="heading-2">Ablauf unserer Grundreinigung â€“ Schritt fÃ¼r Schritt</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Der Ablauf einer professionellen Grundreinigung ist strukturiert und grÃ¼ndlich. ZunÃ¤chst erfolgt eine Besichtigung der Wohnung, um den Umfang der Reinigung zu bestimmen, den Zustand zu beurteilen und eine genaue Offerte zu erstellen. Nach der AuftragsbestÃ¤tigung wird ein Termin vereinbart, der zu Ihren BedÃ¼rfnissen passt. Am Reinigungstag erscheint das professionelle Reinigungsteam pÃ¼nktlich mit allen notwendigen GerÃ¤ten, speziellen Reinigungsmitteln und AusrÃ¼stung. Die Reinigung erfolgt systematisch Raum fÃ¼r Raum, beginnend mit den am stÃ¤rksten verschmutzten Bereichen. Spezielle Methoden wie Dampfreinigung werden fÃ¼r hartnÃ¤ckige Verschmutzungen angewendet. Nach Abschluss der Reinigung erfolgt eine QualitÃ¤tskontrolle, und Sie erhalten ein tiefenreines, hygienisch sauberes Zuhause.
                  </p>

                  {/* Ablauf Steps */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 p-6 md:p-8">
                    <ul className="list-disc list-inside space-y-3 text-body">
                      <li><strong>Besichtigung und Offerte:</strong> Wir besichtigen Ihre Wohnung, beurteilen den Zustand und erstellen eine genaue Offerte.</li>
                      <li><strong>Terminvereinbarung:</strong> Nach der AuftragsbestÃ¤tigung vereinbaren wir einen Termin, der zu Ihren BedÃ¼rfnissen passt.</li>
                      <li><strong>Professionelle Grundreinigung:</strong> Unser professionelles Team reinigt Ihre Wohnung intensiv mit speziellen Methoden und GerÃ¤ten.</li>
                      <li><strong>QualitÃ¤tskontrolle:</strong> Nach Abschluss der Reinigung erfolgt eine QualitÃ¤tskontrolle fÃ¼r perfekte Ergebnisse.</li>
                    </ul>
                  </div>

                  {/* H2: Was kostet eine professionelle Grundreinigung? */}
                  <h2 className="heading-2">Was kostet eine professionelle Grundreinigung?</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Die Kosten fÃ¼r intensive Tiefenreinigung sind hÃ¶her als bei Unterhaltsreinigung, da der Aufwand deutlich grÃ¶sser ist und spezielle Methoden und GerÃ¤te verwendet werden. Eine durchschnittliche 3-Zimmer-Wohnung benÃ¶tigt etwa 4-6 Stunden, was Kosten von 300-600 CHF bedeutet. GrÃ¶ssere Wohnungen, stark verschmutzte Bereiche oder zusÃ¤tzliche Leistungen kÃ¶nnen hÃ¶here Kosten verursachen. Die genauen Kosten hÃ¤ngen von der GrÃ¶sse der Wohnung, dem Zustand, dem Umfang der Reinigung und dem Anlass ab. Durch den Vergleich mehrerer Offerten Ã¼ber unsere Plattform kÃ¶nnen Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen erhalten. Alle Offerten sind kostenlos und unverbindlich.
                  </p>

                  {/* H2: Warum wir der richtige Partner fÃ¼r Ihre Grundreinigung sind */}
                  <h2 className="heading-2">Warum wir der richtige Partner fÃ¼r Ihre Tiefenreinigung sind</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Wir sind der vertrauenswÃ¼rdige Partner fÃ¼r Ihre Tiefenreinigung. Unser Netzwerk umfasst nur geprÃ¼fte, versicherte Reinigungsfirmen, die hÃ¶chste QualitÃ¤tsstandards erfÃ¼llen und Erfahrung mit intensiven Reinigungen haben. Alle Partnerfirmen verwenden moderne, umweltfreundliche Reinigungsmittel und haben die richtige AusrÃ¼stung fÃ¼r intensive Reinigungen, wie Dampfreiniger und spezielle Reinigungsmittel. Wir haben bereits Ã¼ber 500 zufriedene Kunden geholfen, die richtige Reinigungsfirma zu finden. Unser Service ist komplett kostenlos und unverbindlich â€“ Sie zahlen nur fÃ¼r die Reinigung selbst, nicht fÃ¼r unsere Vermittlung. Zudem kÃ¶nnen Sie durch den Vergleich mehrerer Offerten bis zu 40% sparen.
                  </p>

                  {/* CTA 2 - After Richtiger Partner */}
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-blue-50 rounded-lg border border-blue-200 mb-6 md:mb-8">
                    <h3 className="heading-3">
                      {city && !locationLoading 
                        ? `Professionelle Grundreinigung in ${city}`
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
                      HÃ¤ufig gestellte Fragen zur professionellen Tiefenreinigung: Was kostet eine intensive Reinigung? Wann sollte eine intensive Reinigung durchgefÃ¼hrt werden? Was beinhaltet eine umfassende Reinigung? Wie lange dauert eine intensive Reinigung? Was ist der Unterschied zwischen Tiefenreinigung und Unterhaltsreinigung? Welche Reinigungsmethoden werden verwendet? Werden umweltfreundliche Reinigungsmittel verwendet? Diese und weitere Fragen beantworten wir Ihnen gerne. Ãœber unsere Plattform kÃ¶nnen Sie Reinigungsofferten online vergleichen und dabei bis zu 40% sparen.
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
                        ? `Professionelle Grundreinigung in ${city}`
                        : 'Jetzt unverbindliche Grundreinigungs-Offerte anfordern'
                      }
                    </h3>
                    <p className="text-body mb-3 md:mb-4">
                      Reinigungsofferten online vergleichen und bis zu 40% sparen. Alle Offerten beinhalten professionelle Grundreinigung mit intensiven Methoden. Ohne Aufpreis, ohne Verpflichtung. Starten Sie jetzt Ihre kostenlose Anfrage und finden Sie die perfekte Reinigungsfirma fÃ¼r Ihre BedÃ¼rfnisse.
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

export default GrundreinigungPageClient;
