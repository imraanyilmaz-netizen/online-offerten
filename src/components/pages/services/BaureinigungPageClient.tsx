'use client'

import React, { useMemo } from 'react';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle, Star, Home, Heart, Calendar, Hammer, Award, ShieldCheck } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CleaningRatgeberSidebar from '@/components/CleaningRatgeberSidebar';
import { useUserLocation } from '@/hooks/useUserLocation';

const BaureinigungPageClient = () => {
  const router = useRouter();
  const { city, loading: locationLoading } = useUserLocation();
  

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=reinigung&step=2');
  };

  // SEO Data
  const metaTitle = "Baureinigung – Kostenlose Offerten vergleichen";
  const metaDescription = "Baureinigung nach Neubau oder Renovation: Holen Sie kostenlose Offerten ein und vergleichen Sie zuverlässige Reinigungsfirmen für perfekte Resultate.";
  // Meta keywords removed - Google no longer uses this tag (since 2009)
  const canonicalUrl = '/reinigung/baureinigung';

  // FAQ Data
  const faqItems = [
    {
      q: "Was kostet eine Baureinigung?",
      a: "Die Kosten für Baureinigung hängen von der Grösse des Projekts, dem Umfang der Bauarbeiten und dem Verschmutzungsgrad ab. Eine durchschnittliche Renovierung benötigt etwa 8-15 Stunden, was Kosten von 500-3000 CHF bedeutet. Grössere Projekte oder stark verschmutzte Bereiche können höhere Kosten verursachen. Durch den Vergleich mehrerer Offerten können Sie bis zu 40% sparen."
    },
    {
      q: "Wann sollte die Baureinigung durchgeführt werden?",
      a: "Die Baureinigung sollte idealerweise nach Abschluss aller Bauarbeiten, aber vor dem Einzug oder der Übergabe stattfinden. Dies ermöglicht eine gründliche Reinigung aller Bereiche ohne Behinderung durch Möbel oder Einrichtungsgegenstände. Professionelle Baureinigungsfirmen können flexibel planen und die Reinigung zu einem Zeitpunkt durchführen, der zu Ihrem Bauplan passt."
    },
    {
      q: "Was beinhaltet eine umfassende Baureinigung?",
      a: "Eine umfassende Baureinigung beinhaltet: Entfernung von Bauschutt und Abfällen, gründliche Staubentfernung von allen Oberflächen, Reinigung der Böden inklusive Ecken und Kanten, Reinigung der Fenster, Entfernung von Farb- und Kleberesten, Reinigung von Heizkörpern und Lüftungsgittern, sowie gegebenenfalls Desinfektion. Der genaue Umfang kann individuell vereinbart werden."
    },
    {
      q: "Wie lange dauert eine Baureinigung?",
      a: "Die Dauer hängt von der Grösse des Projekts und dem Verschmutzungsgrad ab. Eine durchschnittliche Wohnung benötigt etwa 1-2 Tage. Grössere Projekte oder stark verschmutzte Bereiche können länger dauern. Professionelle Baureinigungsfirmen können Ihnen nach der Besichtigung eine genaue Zeitangabe geben."
    },
    {
      q: "Ist eine Baureinigung gesetzlich vorgeschrieben?",
      a: "Eine Baureinigung ist nicht gesetzlich vorgeschrieben, aber bei Mietobjekten ist der Mieter verpflichtet, die Wohnung bei Auszug in einem ordnungsgemässen Zustand zu übergeben. Professionelle Baureinigung stellt sicher, dass alle Anforderungen erfüllt werden und keine Nachforderungen entstehen."
    },
    {
      q: "Welche Reinigungsmethoden werden verwendet?",
      a: "Baureinigung erfordert spezielle Methoden und Geräte: Feinstaubfilter für gründliche Staubentfernung, Hochleistungssauger für Bauschutt und grosse Rückstände, spezielle Reinigungsmittel für Farbreste und Klebereste, sowie spezielle Techniken für empfindliche Oberflächen. Professionelle Baureinigungsfirmen haben das Wissen und die Ausrüstung für alle Arten von Verschmutzungen nach Bauarbeiten."
    },
    {
      q: "Werden umweltfreundliche Reinigungsmittel verwendet?",
      a: "Ja, moderne Baureinigungsfirmen setzen zunehmend auf umweltfreundliche und gesundheitsschonende Reinigungsmittel, auch bei intensiven Baureinigungen. Alle Reinigungsfirmen in unserem Netzwerk verwenden zertifizierte, umweltfreundliche Reinigungsmittel, die effektiv sind, aber gleichzeitig die Umwelt und die Gesundheit schonen."
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
      "name": "Kostenlose Offerte für Baureinigung"
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
              backgroundImage: `url('https://online-offerten.ch/reinigungsfirma/baureinigung_header.png')`,
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
                    Professionelle Baureinigung
                  </h1>
                </div>
                
                <p
                  className="text-base md:text-body mb-4 md:mb-6 leading-relaxed"
                >
                  Gründliche Baureinigung nach Neubau oder Renovation für perfekte Resultate. Entfernung von Bauschutt, Staub und Rückständen. Reinigungsofferten online vergleichen und bis zu 40% sparen.
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
                  {/* H2: Warum eine professionelle Baureinigung sinnvoll ist */}
                  <h2 className="heading-2">Warum eine professionelle Baureinigung sinnvoll ist</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Eine professionelle Reinigung nach Bauarbeiten ist nach Renovierungs- oder Bauarbeiten unerlässlich, um wieder ein sauberes und gesundes Zuhause zu haben. Nach Bauarbeiten bleiben oft Bauschutt, Staub, Farbrückstände, Klebebandreste und andere Rückstände zurück, die bei normaler Reinigung nicht entfernt werden können. Professionelle Reinigungsfirmen verfügen über spezielle Methoden und Geräte, um hartnäckige Verschmutzungen zu entfernen. Zudem trägt eine gründliche Reinigung nach Bauarbeiten zur Gesundheit bei, indem sie Feinstaub und schädliche Partikel entfernt, die nach Bauarbeiten in der Luft und auf Oberflächen verbleiben können. Eine professionelle Reinigung stellt sicher, dass alle Bereiche wieder bewohnbar und sicher sind.
                  </p>
                  
                  {/* H2: Unsere Leistungen im Bereich Baureinigung */}
                  <h2 className="heading-2">Unsere Leistungen im Bereich Reinigung</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Unser Netzwerk geprüfter Reinigungsfirmen bietet ein umfassendes Leistungsspektrum für die Reinigung nach Bauarbeiten. Dazu gehören die gründliche Reinigung nach Renovierungsarbeiten, Neubau oder Umbau. Wir bieten die Entfernung von Bauschutt und Bauabfällen, gründliche Staubentfernung von allen Oberflächen, Entfernung von Farbrückständen und Klebeband, Reinigung von Fenstern und Rahmen, sowie die fachgerechte Entsorgung von Bauabfällen. Alle unsere Partnerfirmen arbeiten mit modernsten Reinigungstechniken, speziellen Geräten für Feinstaubentfernung und umweltfreundlichen Reinigungsmitteln. Besonders wichtig: Alle Reinigungsfirmen in unserem Netzwerk haben Erfahrung mit Reinigung nach Bauarbeiten und kennen die besonderen Herausforderungen nach Bauarbeiten.
                  </p>

                  {/* Leistungen Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/baureinigung_besen_schaufel_baustelle_realistisch.png"
                      alt="Baureinigungsdienstleistungen - Professionelle Reinigung nach Bauarbeiten"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Bullet Points - Leistungen */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>Reinigung nach Renovierungsarbeiten</li>
                    <li>Reinigung nach Neubau oder Umbau</li>
                    <li>Entfernung von Bauschutt und Bauabfällen</li>
                    <li>Gründliche Staubentfernung von allen Oberflächen</li>
                    <li>Entfernung von Farbrückständen und Klebeband</li>
                    <li>Reinigung von Fenstern und Rahmen</li>
                    <li>Fachgerechte Entsorgung von Bauabfällen</li>
                    <li>Feinreinigung aller Bereiche</li>
                  </ul>

                  {/* CTA 1 - After Leistungen */}
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-green-50 rounded-lg border border-green-200 mb-6 md:mb-8">
                    <h3 className="heading-3">
                      {city && !locationLoading 
                        ? `Professionelle Baureinigung in ${city}`
                        : 'Professionelle Baureinigung buchen'
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

                  {/* H2: Vorteile unserer gründlichen Baureinigung */}
                  <h2 className="heading-2">Vorteile unserer gründlichen Baureinigung</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Eine gründliche Reinigung nach Bauarbeiten bietet zahlreiche Vorteile gegenüber der eigenen Reinigung. Sie entfernt hartnäckige Verschmutzungen wie Bauschutt, Feinstaub und Farbreste, die bei normaler Reinigung nicht erreicht werden. Professionelle Reinigungsfirmen haben spezielle Geräte wie Feinstaubfilter und Hochleistungssauger, die auch feinste Partikel entfernen. Sie kennen die richtigen Methoden für verschiedene Materialien und Oberflächen und können empfindliche Bereiche schützen. Zudem übernehmen sie die fachgerechte Entsorgung von Bauschutt, was Ihnen Zeit und Mühe spart. Durch den Vergleich mehrerer Offerten über unsere Plattform können Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen erhalten.
                  </p>

                  {/* Vorteile Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/reinigungsmittel_auf_tisch.webp"
                      alt="Vorteile gründlicher Baureinigung - Spezielle Methoden und Geräte"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Bullet Points - Vorteile */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>Entfernung von hartnäckigen Verschmutzungen wie Bauschutt und Feinstaub</li>
                    <li>Nur geprüfte, versicherte Reinigungsfirmen</li>
                    <li>Spezielle Geräte für Feinstaubentfernung</li>
                    <li>Fachgerechte Entsorgung von Bauschutt</li>
                    <li>Umweltfreundliche Reinigungsmittel</li>
                    <li>Schutz empfindlicher Oberflächen</li>
                  </ul>

                  {/* H2: Was bei einer umfassenden Baureinigung gereinigt wird */}
                  <h2 className="heading-2">Was bei einer umfassenden Baureinigung gereinigt wird</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Eine umfassende Reinigung nach Bauarbeiten beinhaltet die intensive Reinigung aller Bereiche nach Bauarbeiten. Dazu gehört die Entfernung von Bauschutt und grossen Rückständen, die gründliche Staubentfernung von allen Oberflächen inklusive schwer zugänglicher Stellen, die Entfernung von Farbrückständen, Klebeband und Schutzfolien, die Reinigung aller Böden inklusive Ecken und Kanten, die Reinigung von Fenstern innen und aussen inklusive Rahmen, die Reinigung von Heizkörpern, Lüftungsgittern und Lampen, sowie die Entfernung von Spachtelmasse- und Kleberesten. Professionelle Reinigungsfirmen verwenden spezielle Methoden und Geräte, um auch hartnäckigste Verschmutzungen gründlich zu entfernen.
                  </p>

                  {/* H2: Baureinigung nach verschiedenen Bauarbeiten (Renovation, Neubau, Umbau) */}
                  <h2 className="heading-2">Baureinigung nach verschiedenen Bauarbeiten (Renovation, Neubau, Umbau)</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Professionelle Reinigung nach Bauarbeiten wird für verschiedene Arten von Bauarbeiten angeboten, die alle spezielle Reinigungsanforderungen haben. Reinigung nach Renovierungsarbeiten entfernt Staub, Farbreste und Rückstände von Renovierungen. Reinigung nach Neubau umfasst die gründliche Reinigung eines komplett neuen Gebäudes, inklusive Entfernung von Bauschutt und Bauabfällen. Reinigung nach Umbau beinhaltet die Reinigung nach strukturellen Änderungen. Jede Art von Bauarbeit hinterlässt unterschiedliche Verschmutzungen, und professionelle Reinigungsfirmen passen ihre Methoden entsprechend an. Unabhängig von der Art der Bauarbeiten, alle Reinigungsfirmen in unserem Netzwerk haben Erfahrung mit Reinigung nach Bauarbeiten und verwenden die richtigen Methoden für jeden Fall.
                  </p>

                  {/* Bauarbeiten Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/baureinigung_bauarbeiten.png"
                      alt="Baureinigung nach verschiedenen Bauarbeiten - Renovation, Neubau, Umbau"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Herausforderungen bei der Baureinigung (Bauschutt, Staub, Farbreste) */}
                  <h2 className="heading-2">Herausforderungen bei der Baureinigung (Bauschutt, Staub, Farbreste)</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Reinigung nach Bauarbeiten hat besondere Herausforderungen, die spezielle Methoden und Geräte erfordern. Feinstaub kann in alle Ritzen und schwer zugängliche Stellen eindringen und erfordert spezielle Filter und Sauger. Bauschutt muss fachgerecht entsorgt werden, was Kenntnisse der Entsorgungsvorschriften erfordert. Farbrückstände und Klebereste sind hartnäckig und erfordern spezielle Reinigungsmittel und Techniken. Zudem müssen empfindliche Oberflächen wie neue Böden oder Fenster geschützt werden. Professionelle Reinigungsfirmen haben die richtigen Geräte, Methoden und Erfahrung für alle diese Herausforderungen. Sie verwenden Feinstaubfilter, Hochleistungssauger, spezielle Reinigungsmittel und kennen die richtigen Techniken für jedes Material.
                  </p>

                  {/* Herausforderungen Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/baureinigung_herausforderungen.png"
                      alt="Herausforderungen bei der Baureinigung - Bauschutt, Staub, Farbreste"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Moderne und umweltfreundliche Reinigungsmethoden */}
                  <h2 className="heading-2">Moderne und umweltfreundliche Reinigungsmethoden</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Moderne Reinigungsfirmen setzen zunehmend auf umweltfreundliche und gesundheitsschonende Reinigungsmethoden, auch bei intensiven Reinigungen nach Bauarbeiten. Diese sind nicht nur besser für die Umwelt, sondern auch für Ihre Gesundheit und die Ihrer Familie. Biologische Reinigungsmittel sind besonders für Haushalte mit Kindern, Allergikern oder Haustieren empfehlenswert. Sie sind effektiv gegen hartnäckige Verschmutzungen wie Farbreste und Klebereste, schonen aber gleichzeitig die Umwelt und die Gesundheit. Unsere Partnerfirmen verwenden ausschliesslich zertifizierte, umweltfreundliche Reinigungsmittel und achten darauf, dass keine schädlichen Chemikalien in Ihrer Wohnung zurückbleiben. Dies ist besonders wichtig bei Reinigung nach Bauarbeiten, da intensive Reinigungsmittel verwendet werden und die Wohnung nach der Reinigung wieder bewohnbar sein muss.
                  </p>

                  {/* Umweltfreundlich Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/umweltfreundliche_reinigungsmittel_modern.webp"
                      alt="Moderne und umweltfreundliche Reinigungsmethoden für Baureinigung"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Ablauf unserer Baureinigung – Schritt für Schritt */}
                  <h2 className="heading-2">Ablauf unserer Baureinigung – Schritt für Schritt</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Der Ablauf einer professionellen Baureinigung ist strukturiert und gründlich. Zunächst erfolgt eine Besichtigung der Baustelle, um den Umfang der Reinigung zu bestimmen, den Verschmutzungsgrad zu beurteilen und eine genaue Offerte zu erstellen. Nach der Auftragsbestätigung wird ein Termin vereinbart, der zu Ihrem Bauplan passt. Am Reinigungstag erscheint das professionelle Reinigungsteam pünktlich mit allen notwendigen Geräten, speziellen Reinigungsmitteln und Ausrüstung für Baureinigung. Die Reinigung erfolgt systematisch in mehreren Phasen: Grobreinigung zur Entfernung von Bauschutt, Feinstaubentfernung, Reinigung aller Oberflächen, und abschliessende Feinreinigung. Nach Abschluss der Reinigung erfolgt eine Qualitätskontrolle, und Sie erhalten ein sauberes, bewohnbares Zuhause.
                  </p>

                  {/* Ablauf Steps */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 p-6 md:p-8">
                    <ul className="list-disc list-inside space-y-3 text-body">
                      <li><strong>Besichtigung und Offerte:</strong> Wir besichtigen die Baustelle, beurteilen den Verschmutzungsgrad und erstellen eine genaue Offerte.</li>
                      <li><strong>Terminvereinbarung:</strong> Nach der Auftragsbestätigung vereinbaren wir einen Termin, der zu Ihrem Bauplan passt.</li>
                      <li><strong>Professionelle Baureinigung:</strong> Unser professionelles Team reinigt Ihre Baustelle gründlich mit speziellen Methoden und Geräten.</li>
                      <li><strong>Qualitätskontrolle:</strong> Nach Abschluss der Reinigung erfolgt eine Qualitätskontrolle für perfekte Ergebnisse.</li>
                    </ul>
                  </div>

                  {/* H2: Was kostet eine professionelle Baureinigung? */}
                  <h2 className="heading-2">Was kostet eine professionelle Baureinigung?</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Die Kosten für Reinigung nach Bauarbeiten hängen stark vom Umfang der Bauarbeiten, der Grösse des Projekts und dem Verschmutzungsgrad ab. Eine durchschnittliche Renovierung benötigt etwa 8-15 Stunden Reinigung, was Kosten von 500-3000 CHF bedeutet. Grössere Bauprojekte, stark verschmutzte Bereiche oder zusätzliche Leistungen wie Bauschuttentsorgung können höhere Kosten verursachen. Die genauen Kosten hängen von der Art der Bauarbeiten, dem Umfang der Reinigung und dem Zustand ab. Durch den Vergleich mehrerer Offerten über unsere Plattform können Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen erhalten. Alle Offerten sind kostenlos und unverbindlich.
                  </p>

                  {/* H2: Warum wir der richtige Partner für Ihre Baureinigung sind */}
                  <h2 className="heading-2">Warum wir der richtige Partner für Ihre Reinigung sind</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Wir sind der vertrauenswürdige Partner für Ihre Reinigung nach Bauarbeiten. Unser Netzwerk umfasst nur geprüfte, versicherte Reinigungsfirmen, die höchste Qualitätsstandards erfüllen und Erfahrung mit Reinigung nach Bauarbeiten haben. Alle Partnerfirmen verwenden moderne, umweltfreundliche Reinigungsmittel und haben die richtige Ausrüstung für Reinigung nach Bauarbeiten, wie Feinstaubfilter und Hochleistungssauger. Sie kennen die besonderen Herausforderungen nach Bauarbeiten und verwenden die richtigen Methoden für Bauschutt, Staub und Farbreste. Wir haben bereits über 500 zufriedene Kunden geholfen, die richtige Reinigungsfirma zu finden. Unser Service ist komplett kostenlos und unverbindlich – Sie zahlen nur für die Reinigung selbst, nicht für unsere Vermittlung. Zudem können Sie durch den Vergleich mehrerer Offerten bis zu 40% sparen.
                  </p>

                  {/* CTA 2 - After Richtiger Partner */}
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-blue-50 rounded-lg border border-blue-200 mb-6 md:mb-8">
                    <h3 className="heading-3">
                      {city && !locationLoading 
                        ? `Professionelle Baureinigung in ${city}`
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
                    <h2 className="heading-2">Häufig gestellte Fragen zur Reinigung</h2>
                    <p className="text-body mb-6 md:mb-8 leading-relaxed">
                      Häufig gestellte Fragen zur professionellen Reinigung nach Bauarbeiten: Was kostet eine Reinigung nach Bauarbeiten? Wann sollte die Reinigung durchgeführt werden? Was beinhaltet eine umfassende Reinigung? Wie lange dauert eine Reinigung nach Bauarbeiten? Ist eine Reinigung gesetzlich vorgeschrieben? Welche Reinigungsmethoden werden verwendet? Werden umweltfreundliche Reinigungsmittel verwendet? Diese und weitere Fragen beantworten wir Ihnen gerne. Über unsere Plattform können Sie Reinigungsofferten online vergleichen und dabei bis zu 40% sparen.
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
                        <p className="text-sm md:text-base text-gray-600">Professionelle Wohnungsreinigung mit Abnahmegarantie für eine sorgenfreie Wohnungsübergabe.</p>
                      </Link>
                      <Link href="/reinigung/fensterreinigung"
                        className="block p-4 md:p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                      >
                        <h3 className="heading-3">Fensterreinigung</h3>
                        <p className="text-sm md:text-base text-gray-600">Streifenfreie Fensterreinigung innen und aussen von professionellen Reinigungsfirmen.</p>
                      </Link>
                      <Link href="/reinigung/grundreinigung"
                        className="block p-4 md:p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                      >
                        <h3 className="heading-3">Grundreinigung</h3>
                        <p className="text-sm md:text-base text-gray-600">Gründliche Grundreinigung vom Profi für ein tiefenreines Zuhause.</p>
                      </Link>
                    </div>
                  </div>

                  {/* CTA 3 - Final */}
                  <div className="mt-8 md:mt-12 p-4 md:p-6 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="heading-3">
                      {city && !locationLoading 
                        ? `Professionelle Baureinigung in ${city}`
                        : 'Jetzt unverbindliche Baureinigungs-Offerte anfordern'
                      }
                    </h3>
                    <p className="text-body mb-3 md:mb-4">
                      Reinigungsofferten online vergleichen und bis zu 40% sparen. Alle Offerten beinhalten professionelle Baureinigung mit speziellen Methoden. Ohne Aufpreis, ohne Verpflichtung. Starten Sie jetzt Ihre kostenlose Anfrage und finden Sie die perfekte Reinigungsfirma für Ihre Bedürfnisse.
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

export default BaureinigungPageClient;


