'use client'

import React, { useMemo } from 'react';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Clock, CheckCircle, Users, Award, Star, Home, Calendar } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CleaningRatgeberSidebar from '@/components/CleaningRatgeberSidebar';
import { useUserLocation } from '@/hooks/useUserLocation';

const BueroreinigungPageClient = () => {
  const router = useRouter();
  const { city, loading: locationLoading } = useUserLocation();
  

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=reinigung&step=2');
  };

  // SEO Data
  const metaTitle = "Büroreinigung – Kostenlose Offerten vergleichen";
  const metaDescription = "Professionelle Büroreinigung. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Büroreinigung garantiert.";
  // Meta keywords removed - Google no longer uses this tag (since 2009)
  const canonicalUrl = '/reinigung/bueroreinigung';

  // FAQ Data
  const faqItems = [
    {
      q: "Was kostet eine professionelle Büroreinigung?",
      a: "Die Kosten für Büroreinigung hängen von der Grösse des Büros, der Anzahl der Räume, der Reinigungsfrequenz und dem Umfang der Reinigung ab. Preise liegen typischerweise zwischen 30 und 65 CHF pro Stunde. Ein durchschnittliches Büro kostet etwa 60-260 CHF pro Reinigung. Regelmässige Reinigungen sind oft günstiger als einmalige Reinigungen. Durch den Vergleich mehrerer Offerten können Sie bis zu 40% sparen."
    },
    {
      q: "Wann wird eine Abnahmegarantie bei der Büroreinigung angeboten?",
      a: "Eine Abnahmegarantie wird in der Regel nur bei Umzugsreinigungen oder Endreinigungen angeboten, nicht bei normaler täglicher oder wöchentlicher Büroreinigung. Bei diesen speziellen Reinigungen garantiert die Reinigungsfirma, dass alle Bereiche Ihres Büros gründlich und professionell gereinigt werden. Sollten Sie oder Ihre Mitarbeiter Mängel feststellen, wird die Reinigungsfirma kostenlos nachbessern, bis alles den Anforderungen entspricht."
    },
    {
      q: "Was beinhaltet eine umfassende Büroreinigung?",
      a: "Eine umfassende Büroreinigung beinhaltet: gründliche Reinigung aller Büroräume, Reinigung der Böden inklusive Ecken und Kanten, Reinigung der Küchen inklusive Herd, Mikrowelle und Kühlschrank, gründliche Reinigung aller Sanitäranlagen, Reinigung der Fenster innen, Reinigung von Besprechungszimmern und Empfangsbereichen, sowie Desinfektion häufig berührter Oberflächen wie Türgriffe, Lichtschalter und Tastaturen. Zusätzlich werden Abfalleimer geleert und ersetzt, und alle Oberflächen werden gründlich gereinigt."
    },
    {
      q: "Wie oft sollte eine Büroreinigung durchgeführt werden?",
      a: "Die optimale Reinigungsfrequenz hängt von der Grösse des Büros, der Anzahl der Mitarbeiter und der Art der Tätigkeit ab. Die meisten Büros werden täglich, wöchentlich oder mehrmals pro Woche gereinigt. Tägliche Reinigung ist ideal für grössere Büros mit vielen Mitarbeitern, während kleinere Büros oft mit wöchentlicher oder zweiwöchentlicher Reinigung auskommen. Professionelle Reinigungsfirmen beraten Sie gerne bei der optimalen Frequenz für Ihre Büroräume."
    },
    {
      q: "Kann die Reinigung ausserhalb der Geschäftszeiten erfolgen?",
      a: "Ja, die meisten Büroreinigungsfirmen bieten flexible Reinigungszeiten an, einschliesslich Reinigung ausserhalb der Geschäftszeiten. Dies minimiert Störungen im Arbeitsablauf und ermöglicht eine gründlichere Reinigung. Viele Reinigungen finden abends oder am Wochenende statt, sodass der Betriebsablauf nicht beeinträchtigt wird. Dies ist besonders vorteilhaft für Unternehmen, die während der Geschäftszeiten nicht gestört werden möchten."
    },
    {
      q: "Sind die Reinigungskräfte versichert?",
      a: "Ja, seriöse Büroreinigungsfirmen haben eine Betriebshaftpflichtversicherung und ihre Mitarbeiter sind versichert. Dies schützt Sie vor Haftung bei Unfällen oder Schäden während der Reinigung. Alle Reinigungsfirmen in unserem Netzwerk sind geprüft und versichert, sodass Sie sicher sein können, dass Sie professionell und zuverlässig bedient werden."
    },
    {
      q: "Werden umweltfreundliche Reinigungsmittel verwendet?",
      a: "Ja, moderne Büroreinigungsfirmen setzen zunehmend auf umweltfreundliche und gesundheitsschonende Reinigungsmittel. Diese sind nicht nur besser für die Umwelt, sondern auch für die Gesundheit Ihrer Mitarbeiter. Biologische Reinigungsmittel sind besonders für Büros mit vielen Mitarbeitern empfehlenswert, da sie keine schädlichen Dämpfe oder Rückstände hinterlassen. Unsere Partnerfirmen verwenden ausschliesslich zertifizierte, umweltfreundliche Reinigungsmittel."
    }
  ];


  // Single JSON-LD Service schema
  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Professionelle Büroreinigung",
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
      "name": "Kostenlose Offerte für Büroreinigung"
    }
  }), [metaDescription]);

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
              backgroundImage: `url('https://online-offerten.ch/reinigungsfirma/bueroreinigung_modernes_buero.png')`,
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
                  <h1 
                    className="heading-1 break-words"
                    style={{
                      fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                      fontWeight: 700,
                      textAlign: 'start',
                      letterSpacing: 'normal',
                      wordSpacing: '0px',
                      fontStyle: 'normal',
                      textTransform: 'none',
                      textDecoration: 'none',
                      textIndent: '0px'
                    }}
                  >
                    Professionelle Büroreinigung
                  </h1>
                </div>
                
                <p
                  className="text-base sm:text-body mb-8 leading-relaxed"
                >
                  Gründliche Büroreinigung für ein sauberes und produktives Arbeitsumfeld. Büroreinigungsofferten online vergleichen und bis zu 40% sparen.
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
                    <span className="text-sm md:text-body font-medium">Nur geprüfte Firmen</span>
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
                  {/* H2: Warum eine professionelle Büroreinigung sinnvoll ist */}
                  <h2 className="heading-2 mb-6 break-words">Warum eine professionelle Büroreinigung sinnvoll ist</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Eine professionelle Geschäftsreinigung bietet zahlreiche Vorteile, die über die reine Sauberkeit hinausgehen. Sie spart wertvolle Zeit, die Ihre Mitarbeiter für ihre Kernaufgaben nutzen können, anstatt sich um Reinigungsarbeiten zu kümmern. Professionelle Reinigungskräfte verfügen über das Fachwissen und die richtigen Geräte, um auch schwer zugängliche Stellen wie unter Schreibtischen, in Serverräumen oder in hohen Deckenbereichen gründlich zu reinigen. Zudem trägt eine regelmässige professionelle Reinigung erheblich zur Gesundheit der Mitarbeiter bei, indem sie Allergene, Bakterien und Viren effektiv entfernt. Studien zeigen, dass ein sauberes Arbeitsumfeld die Produktivität steigert, Krankheitstage reduziert und das allgemeine Wohlbefinden der Mitarbeiter verbessert. Besonders in Büros mit vielen Mitarbeitern ist eine professionelle Reinigung unerlässlich, um sicherzustellen, dass alle Bereiche optimal gereinigt werden und ein gesundes Arbeitsklima gewährleistet ist.
                  </p>
                  
                  {/* H2: Unsere Leistungen im Bereich Büroreinigung */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Unsere Leistungen im Bereich Reinigung</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Unser Netzwerk geprüfter Reinigungsfirmen bietet ein umfassendes Leistungsspektrum für die professionelle Reinigung. Dazu gehören die gründliche Reinigung aller Büroräume, inklusive Einzelbüros, Grossraumbüros, Besprechungszimmer, Empfangsbereiche, Küchen, Sanitäranlagen, Flure und Pausenräume. Wir bieten auch spezialisierte Dienstleistungen wie Fensterreinigung, Bodenreinigung, Teppichreinigung, Fassadenreinigung und Baureinigung an. Alle unsere Partnerfirmen arbeiten mit modernsten Reinigungstechniken und umweltfreundlichen Reinigungsmitteln, die speziell für Büroumgebungen entwickelt wurden. Für Umzugsreinigungen oder Endreinigungen bieten unsere Partnerfirmen auch eine Abnahmegarantie an, sodass Sie sicher sein können, dass Ihr Büro den höchsten Qualitätsstandards entspricht und Ihre Mitarbeiter in einem optimalen Arbeitsumfeld tätig sein können.
                  </p>

                  {/* Leistungen Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/bueroreinigungsdienstleistungen_reines_buero.png"
                      alt="Büroreinigungsdienstleistungen - Professionelle Reinigung aller Büroräume"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Bullet Points - Leistungen */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>Gründliche Reinigung aller Büroräume</li>
                    <li>Reinigung von Besprechungszimmern und Empfangsbereichen</li>
                    <li>Küchen- und Sanitärreinigung</li>
                    <li>Fenster- und Oberflächenreinigung</li>
                    <li>Bodenreinigung inklusive Ecken und Kanten</li>
                    <li>Desinfektion häufig berührter Oberflächen</li>
                    <li>Leeren und Ersetzen von Abfalleimern</li>
                    <li>Schonende Reinigung von IT-Geräten</li>
                  </ul>

                  {/* CTA 1 - After Leistungen */}
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-green-50 rounded-lg border border-green-200 mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                      {city && !locationLoading 
                        ? `Professionelle Büroreinigung in ${city}`
                        : 'Professionelle Büroreinigung buchen'
                      }
                    </h3>
                    <p className="text-body mb-3 md:mb-4">
                      Büroreinigungsofferten online vergleichen und bis zu 40% sparen.
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

                  {/* H2: Vorteile unserer professionellen Büroreinigung */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Vorteile unserer professionellen Büroreinigung</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Eine professionelle Reinigung bietet zahlreiche Vorteile für Ihr Unternehmen. Professionelle Reinigungskräfte garantieren, dass alle Bereiche Ihres Büros gründlich und professionell gereinigt werden. Sollten Sie oder Ihre Mitarbeiter Mängel feststellen, wird die Reinigungsfirma diese umgehend beheben. Bei Umzugsreinigungen oder Endreinigungen bieten unsere Partnerfirmen auch eine Abnahmegarantie an. Dies gibt Ihnen maximale Sicherheit und spart Zeit und Nerven. Zusätzlich profitieren Sie von unserer über 12-jährigen Erfahrung im Bereich Reinigungsdienstleistungen und von unserem Netzwerk geprüfter, versicherter Reinigungsfirmen, die speziell auf Geschäftsräume und Büroumgebungen spezialisiert sind. Unsere Partnerfirmen verstehen die besonderen Anforderungen von Büros, wie den Schutz vertraulicher Dokumente, die schonende Reinigung von IT-Geräten und die flexible Terminplanung ausserhalb der Geschäftszeiten.
                  </p>

                  {/* Abnahmegarantie Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/reinigungsmittel_auf_tisch.webp"
                      alt="Büroreinigung mit Abnahmegarantie - Vorher und Nachher Vergleich"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Bullet Points - Vorteile */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>Qualitätsgarantie für sorgenfreie Reinigung</li>
                    <li>Nur geprüfte, versicherte Reinigungsfirmen</li>
                    <li>Umweltfreundliche Reinigungsmittel</li>
                    <li>Flexible Terminplanung ausserhalb der Geschäftszeiten</li>
                    <li>Spezialisiert auf Geschäftsräume und Büroumgebungen</li>
                    <li>Schutz vertraulicher Dokumente</li>
                    <li>Bis zu 40% Kostenersparnis durch Vergleich</li>
                  </ul>

                  {/* H2: Was bei einer gründlichen Büroreinigung gereinigt wird */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Was bei einer gründlichen Büroreinigung gereinigt wird</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Eine umfassende Reinigung beinhaltet die Reinigung aller Büroräume und Bereiche. Dazu gehören das Staubwischen aller Oberflächen, inklusive Schreibtische, Regale, Schränke, Fensterbänke, Heizkörper, Lichtschalter und Steckdosen. Die Böden werden gründlich gesaugt und gewischt, inklusive Ecken und Kanten sowie unter Möbeln. In den Küchen werden Herd, Mikrowelle, Kühlschrank, Spüle und Arbeitsflächen gereinigt. Alle Sanitäranlagen werden komplett gereinigt, inklusive Toiletten, Waschbecken, Spiegel und Fliesen. Fenster werden innen gereinigt, und alle häufig berührten Oberflächen wie Türgriffe, Lichtschalter, Tastaturen und Telefone werden desinfiziert. Abfalleimer werden geleert und ersetzt, und eine professionelle Reinigung geht weit über das normale Putzen hinaus, um ein hygienisch sauberes Arbeitsumfeld zu gewährleisten.
                  </p>

                  {/* H2: Büroreinigung für moderne Arbeitsplätze */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Büroreinigung für moderne Arbeitsplätze</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Moderne Arbeitsplätze haben besondere Anforderungen bei der Reinigung. Open-Space-Büros, Co-Working-Spaces und flexible Arbeitsbereiche erfordern spezielle Reinigungsmethoden und -techniken. Professionelle Büroreinigungsfirmen kennen die Herausforderungen moderner Büroumgebungen und haben entsprechende Protokolle entwickelt. Sie verwenden leise Reinigungsgeräte, um den Arbeitsablauf nicht zu stören, und achten besonders auf die Reinigung von Bereichen, die von vielen Mitarbeitern genutzt werden. Zudem berücksichtigen sie die besonderen Anforderungen von IT-Geräten, die schonend gereinigt werden müssen, ohne die empfindliche Technik zu beschädigen. Eine regelmässige professionelle Reinigung ist besonders wichtig für moderne Arbeitsplätze, um ein produktives und gesundes Arbeitsumfeld zu gewährleisten und die Zufriedenheit der Mitarbeiter zu steigern.
                  </p>

                  {/* Moderne Arbeitsplätze Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/bueroreinigung_open_space_coworking.png"
                      alt="Büroreinigung für moderne Arbeitsplätze - Open-Space und Co-Working"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Hygiene und Gesundheit im Büro */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Hygiene und Gesundheit im Büro</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Besonders in Büros mit vielen Mitarbeitern ist Hygiene von entscheidender Bedeutung. Regelmässige Desinfektion von häufig berührten Oberflächen reduziert die Verbreitung von Keimen und Viren erheblich. Professionelle Büroreinigungsfirmen verwenden geeignete Desinfektionsmittel und kennen die kritischen Bereiche, die besondere Aufmerksamkeit benötigen, wie Türgriffe, Lichtschalter, Tastaturen, Mäuse, Telefone und Armaturen in Sanitäranlagen. Dies ist besonders wichtig in Zeiten erhöhter Gesundheitsrisiken, um die Gesundheit der Mitarbeiter zu schützen und Krankheitsausfälle zu minimieren. Eine professionelle Büroreinigung trägt massgeblich dazu bei, ein gesundes Arbeitsumfeld zu schaffen, in dem sich Mitarbeiter wohlfühlen und produktiv arbeiten können.
                  </p>

                  {/* H2: Moderne und umweltfreundliche Reinigungsmittel */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Moderne und umweltfreundliche Reinigungsmittel</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Moderne Büroreinigungsfirmen setzen zunehmend auf umweltfreundliche und gesundheitsschonende Reinigungsmittel. Diese sind nicht nur besser für die Umwelt, sondern auch für die Gesundheit Ihrer Mitarbeiter. Biologische Reinigungsmittel sind besonders für Büros mit vielen Mitarbeitern empfehlenswert, da sie keine schädlichen Dämpfe oder Rückstände hinterlassen. Sie sind effektiv gegen Schmutz und Bakterien, schonen aber gleichzeitig die Umwelt und die Gesundheit. Unsere Partnerfirmen verwenden ausschliesslich zertifizierte, umweltfreundliche Reinigungsmittel und achten darauf, dass keine schädlichen Chemikalien in Ihrem Büro zurückbleiben. Dies passt perfekt zu Corporate Social Responsibility-Initiativen und schont gleichzeitig die Gesundheit Ihrer Mitarbeiter.
                  </p>

                  {/* Umweltfreundlich Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/umweltfreundliche_reinigungsmittel_modern.webp"
                      alt="Umweltfreundliche Reinigungsmittel - Biologische und gesundheitsschonende Produkte"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Ablauf unserer Büroreinigung – Schritt für Schritt */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Ablauf unserer Büroreinigung – Schritt für Schritt</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Der Ablauf einer professionellen Büroreinigung ist strukturiert und effizient. Zunächst erfolgt eine Besichtigung der Büroräume, um den Umfang der Reinigung zu bestimmen, besondere Anforderungen zu identifizieren und eine genaue Offerte zu erstellen. Nach der Auftragsbestätigung wird ein Reinigungsplan erstellt, der zu Ihren Geschäftszeiten passt. Viele Reinigungen finden ausserhalb der Geschäftszeiten statt, beispielsweise abends oder am Wochenende, um den Betriebsablauf nicht zu stören. Am Reinigungstag erscheint das professionelle Reinigungsteam pünktlich mit allen notwendigen Geräten und Reinigungsmitteln. Die Reinigung erfolgt systematisch Raum für Raum, beginnend mit den am stärksten verschmutzten Bereichen. Nach Abschluss der Reinigung erfolgt eine Qualitätskontrolle. Bei Umzugsreinigungen oder Endreinigungen erhalten Sie eine Abnahmegarantie. Sollten Sie mit dem Ergebnis nicht zufrieden sein, wird kostenlos nachgebessert.
                  </p>

                  {/* Ablauf Image/Icon */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
                      {[
                        { icon: Home, text: "Kostenlose Offerte anfordern" },
                        { icon: Clock, text: "Besichtigung der Büroräume und Offerte erhalten" },
                        { icon: Calendar, text: "Termin vereinbaren (flexibel, auch ausserhalb Geschäftszeiten)" },
                        { icon: Sparkles, text: "Professionelle Reinigung durchführen" },
                        { icon: CheckCircle, text: "Qualitätskontrolle und Abnahme" }
                      ].map((step, index) => {
                        const IconComponent = step.icon;
                        return (
                          <div key={index} className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-600 flex items-center justify-center mb-3">
                              <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
                            </div>
                            <p className="text-xs md:text-sm text-gray-700 font-medium">{step.text}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* H2: Was kostet eine professionelle Büroreinigung? */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Was kostet eine professionelle Büroreinigung?</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Die Kosten für Büroreinigung variieren je nach Grösse des Büros, Anzahl der Räume, Reinigungsfrequenz, Umfang der Reinigung und Region. In der Regel werden Preise zwischen 30 und 65 CHF pro Stunde berechnet. Ein durchschnittliches Büro benötigt etwa 2-4 Stunden pro Reinigung, was Kosten von 60-260 CHF bedeutet. Grössere Büros mit vielen Räumen, mehreren Etagen oder speziellen Anforderungen können höhere Kosten verursachen. Regelmässige Reinigungen sind oft günstiger als einmalige Reinigungen, da die Reinigungsfirma die Räume kennt und effizienter arbeiten kann. Durch den Vergleich mehrerer Offerten über unsere Plattform können Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen erhalten. Alle Offerten sind kostenlos und unverbindlich.
                  </p>

                  {/* H2: Regelmässige vs. einmalige Büroreinigung */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Regelmässige vs. einmalige Büroreinigung</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Viele Unternehmen entscheiden sich für eine regelmässige Büroreinigung, beispielsweise täglich, wöchentlich oder mehrmals pro Woche. Dies sorgt für kontinuierliche Sauberkeit und reduziert den Aufwand für einzelne Reinigungen. Regelmässige Reinigung ist besonders wichtig für grössere Büros mit vielen Mitarbeitern, um die Sauberkeit aufrechtzuerhalten und ein gesundes Arbeitsumfeld zu gewährleisten. Andere nutzen professionelle Reinigung für einmalige, besonders gründliche Reinigungen, beispielsweise nach Renovierungen, beim Umzug in neue Büroräume, für eine umfassende Grundreinigung oder vor besonderen Anlässen. Beide Optionen sind möglich und können auch kombiniert werden, beispielsweise regelmässige Unterhaltsreinigung mit periodischen Grundreinigungen für eine besonders gründliche Reinigung.
                  </p>

                  {/* H2: Warum wir der richtige Partner für Ihre Büroreinigung sind */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Warum wir der richtige Partner für Ihre Reinigung sind</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Wir sind der vertrauenswürdige Partner für Ihre Geschäftsreinigung. Unser Netzwerk umfasst nur geprüfte, versicherte Reinigungsfirmen, die höchste Qualitätsstandards erfüllen und speziell auf Geschäftsräume und Büroumgebungen spezialisiert sind. Unsere Partnerfirmen verwenden moderne, umweltfreundliche Reinigungsmittel und verstehen die besonderen Anforderungen von Büros, wie den Schutz vertraulicher Dokumente, die schonende Reinigung von IT-Geräten und die flexible Terminplanung. Für Umzugsreinigungen oder Endreinigungen bieten unsere Partnerfirmen auch eine Abnahmegarantie an. Wir haben bereits über 500 zufriedene Kunden geholfen, die richtige Reinigungsfirma zu finden. Unser Service ist komplett kostenlos und unverbindlich – Sie zahlen nur für die Reinigung selbst, nicht für unsere Vermittlung. Zudem können Sie durch den Vergleich mehrerer Offerten bis zu 40% sparen.
                  </p>

                  {/* CTA Banner Section */}
                  <div className="mt-6 md:mt-8 mb-6 md:mb-8">
                    <div className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-700 rounded-xl p-6 md:p-8 lg:p-10 shadow-xl">
                      {/* Header with icons */}
                      <div className="flex items-center justify-center mb-4 md:mb-6">
                        <div className="w-3 h-3 bg-blue-300 rounded-sm rotate-45 mr-2"></div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center leading-tight">
                          Büroreinigung – Kostenlose Offerten anfordern und bis zu 40% sparen
                        </h3>
                        <div className="w-3 h-3 bg-blue-300 rounded-sm rotate-45 ml-2"></div>
                      </div>
                      
                      {/* Features with checkmarks */}
                      <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-300 mr-3 flex-shrink-0" />
                          <span className="text-white text-base md:text-lg font-medium">100% kostenlos und unverbindlich</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-300 mr-3 flex-shrink-0" />
                          <span className="text-white text-base md:text-lg font-medium">Geprüfte Partner für Büros und Geschäftsräume</span>
                      </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-300 mr-3 flex-shrink-0" />
                          <span className="text-white text-base md:text-lg font-medium">Transparente Preise ohne Verpflichtung</span>
                        </div>
                      </div>
                      
                      {/* CTA Button */}
                      <div className="flex justify-center">
                        <Button
                          onClick={handleCtaClick}
                          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
                        >
                          Kostenlose Offerten anfordern
                          <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                        </Button>
                      </div>
                    </div>
                  </div>


                  {/* H2: Häufig gestellte Fragen zur Büroreinigung */}
                  <div className="mt-8 md:mt-12">
                    <h2 className="heading-2 mb-6">Häufig gestellte Fragen zur Reinigung</h2>
                    <p className="text-body mb-6 md:mb-8">
                      Häufig gestellte Fragen zur professionellen Reinigung: Was kostet eine professionelle Reinigung? Was beinhaltet eine umfassende Reinigung? Wie oft sollte eine Reinigung durchgeführt werden? Wann wird eine Abnahmegarantie angeboten? Kann die Reinigung ausserhalb der Geschäftszeiten erfolgen? Sind die Reinigungskräfte versichert? Werden umweltfreundliche Reinigungsmittel verwendet? Diese und weitere Fragen beantworten wir Ihnen gerne. Über unsere Plattform können Sie Büroreinigungsofferten online vergleichen und dabei bis zu 40% sparen.
                    </p>
                    <Accordion type="single" collapsible className="w-full">
                      {faqItems.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-xl font-semibold text-left hover:no-underline text-gray-900 px-2 sm:px-4 py-4">
                            <h4 className="faq-question">{item.q}</h4>
                          </AccordionTrigger>
                          <AccordionContent className="text-body pt-2 pb-4 px-2 sm:px-4">
                            {item.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>

                  {/* H2: Jetzt unverbindliche Reinigungs-Offerte anfordern */}
                  <div className="mt-8 md:mt-12">
                    <h2 className="heading-2 mb-6">Jetzt unverbindliche Reinigungs-Offerte anfordern</h2>
                    <p className="text-body mb-6">
                      Büroreinigungsofferten online vergleichen und bis zu 40% sparen. Ohne Aufpreis, ohne Verpflichtung. Starten Sie jetzt Ihre kostenlose Anfrage und finden Sie die perfekte Reinigungsfirma für Ihr Büro.
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

                  {/* Internal Links */}
                  <div className="mt-8 md:mt-12">
                    <h3 className="heading-3 mb-6">Weitere Reinigungsdienstleistungen</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      <Link href="/reinigung/umzugsreinigung" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <h4 className="heading-4 mb-2">Umzugsreinigung</h4>
                        <p className="text-sm text-gray-600">Professionelle Umzugsreinigung mit Abnahmegarantie für eine sorgenfreie Wohnungsübergabe.</p>
                      </Link>
                      <Link href="/reinigung/fensterreinigung" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <h4 className="heading-4 mb-2">Fensterreinigung</h4>
                        <p className="text-sm text-gray-600">Streifenfreie Fensterreinigung innen und aussen von professionellen Reinigungsfirmen.</p>
                      </Link>
                      <Link href="/reinigung/baureinigung" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <h4 className="heading-4 mb-2">Baureinigung</h4>
                        <p className="text-sm text-gray-600">Gründliche Baureinigung nach Neubau oder Renovation für perfekte Resultate.</p>
                      </Link>
                    </div>
                  </div>
                </article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <aside
                  className="space-y-4 md:space-y-6"
                >
                  {/* Ratgeber Section */}
                  <CleaningRatgeberSidebar />
                </aside>
                
                {/* Sticky CTA Section - Outside aside for proper sticky behavior */}
                <div className="mt-4 md:mt-6 lg:sticky lg:top-24 lg:self-start">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 md:p-6 border border-blue-100">
                    <h3 className="heading-3 mb-4">Jetzt Offerten anfordern</h3>
                    <p className="text-body mb-3 md:mb-4">
                      Kostenlos und unverbindlich Büroreinigungsofferten online vergleichen.
                    </p>
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

export default BueroreinigungPageClient;


