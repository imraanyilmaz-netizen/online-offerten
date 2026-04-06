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
  const metaTitle = "Grundreinigung – Kostenlose Offerten vergleichen";
  const metaDescription = "Gründliche Grundreinigung vom Profi: Erhalten Sie kostenlose Angebote von zertifizierten Reinigungsfirmen und wählen Sie den besten Anbieter aus.";
  // Meta keywords removed - Google no longer uses this tag (since 2009)
  const canonicalUrl = '/reinigung/grundreinigung';

  // FAQ Data
  const faqItems = [
    {
      q: "Was kostet eine Grundreinigung?",
      a: "Die Kosten für Grundreinigung hängen von der Grösse der Wohnung, dem Zustand und dem Umfang der Reinigung ab. Eine durchschnittliche 3-Zimmer-Wohnung kostet etwa 300-600 CHF und benötigt etwa 4-6 Stunden. Grössere Wohnungen oder stark verschmutzte Bereiche können höhere Kosten verursachen. Durch den Vergleich mehrerer Offerten können Sie bis zu 40% sparen."
    },
    {
      q: "Wann sollte eine Grundreinigung durchgeführt werden?",
      a: "Eine Grundreinigung sollte idealerweise bei Einzug, Auszug, nach Renovierungsarbeiten oder periodisch (z.B. ein- bis zweimal jährlich) durchgeführt werden. Sie ist besonders wichtig, wenn eine Wohnung längere Zeit nicht gereinigt wurde oder wenn tief sitzender Schmutz entfernt werden soll."
    },
    {
      q: "Was beinhaltet eine umfassende Grundreinigung?",
      a: "Eine umfassende Grundreinigung beinhaltet: gründliche Reinigung aller Räume, Entfernung von tief sitzendem Schmutz, Reinigung der Böden inklusive Ecken und Kanten, Reinigung der Küche inklusive Herd, Backofen und Kühlschrank, gründliche Reinigung des Badezimmers inklusive Entkalkung, Reinigung der Fenster innen und aussen, sowie Reinigung von Heizkörpern, Lüftungsgittern und Lampen."
    },
    {
      q: "Wie lange dauert eine Grundreinigung?",
      a: "Die Dauer hängt von der Grösse der Wohnung und dem Zustand ab. Eine durchschnittliche 3-Zimmer-Wohnung benötigt etwa 4-6 Stunden. Grössere Wohnungen oder stark verschmutzte Bereiche können länger dauern. Professionelle Reinigungsfirmen können Ihnen nach der Besichtigung eine genaue Zeitangabe geben."
    },
    {
      q: "Was ist der Unterschied zwischen Grundreinigung und Unterhaltsreinigung?",
      a: "Eine Grundreinigung ist eine intensive, gründliche Reinigung, die alle Bereiche umfasst und tief sitzenden Schmutz entfernt. Sie wird ein- bis zweimal jährlich durchgeführt. Eine Unterhaltsreinigung ist eine regelmässige, oberflächliche Reinigung zur Aufrechterhaltung der Sauberkeit, die wöchentlich, zweiwöchentlich oder monatlich durchgeführt wird."
    },
    {
      q: "Welche Reinigungsmethoden werden verwendet?",
      a: "Grundreinigung erfordert spezielle Methoden und Geräte: Dampfreinigung für hartnäckige Verschmutzungen, Hochdruckreinigung für Aussenbereiche, spezielle Reinigungsmittel für Kalk, Fett oder Rost, sowie professionelle Geräte für Teppichreinigung. Professionelle Reinigungsfirmen haben das Wissen und die Ausrüstung für alle Arten von Verschmutzungen."
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
      "name": "Kostenlose Offerte für Grundreinigung"
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
                  Gründliche und intensive Grundreinigung für ein tiefenreines Zuhause. Professionelle Tiefenreinigung aller Bereiche. Reinigungsofferten online vergleichen und bis zu 40% sparen.
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
                  {/* H2: Warum eine professionelle Grundreinigung sinnvoll ist */}
                  <h2 className="heading-2">Warum eine professionelle Grundreinigung sinnvoll ist</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Eine professionelle Tiefenreinigung bietet zahlreiche Vorteile, die über die normale Unterhaltsreinigung hinausgehen. Sie entfernt tief sitzenden Schmutz, Kalkablagerungen, Fettspuren und andere hartnäckige Verschmutzungen, die bei der regelmässigen Reinigung nicht erreicht werden. Eine intensive Reinigung sollte idealerweise ein- bis zweimal jährlich durchgeführt werden, um Ihr Zuhause in optimalem Zustand zu halten. Professionelle Reinigungskräfte verfügen über das Fachwissen, spezielle Geräte und intensive Reinigungsmethoden, um auch schwer zugängliche Stellen gründlich zu reinigen. Zudem trägt eine regelmässige Tiefenreinigung zur Gesundheit bei, indem sie Allergene, Bakterien und Viren effektiv entfernt und die Raumluftqualität verbessert.
                  </p>
                  
                  {/* H2: Unsere Leistungen im Bereich Grundreinigung */}
                  <h2 className="heading-2">Unsere Leistungen im Bereich Reinigung</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Unser Netzwerk geprüfter Reinigungsfirmen bietet ein umfassendes Leistungsspektrum für die intensive Tiefenreinigung. Dazu gehören die intensive Reinigung aller Räume, inklusive Küche, Badezimmer, Wohnzimmer und Schlafzimmer. Wir bieten Tiefenreinigung für verschiedene Anlässe: Einzug, Auszug, nach Renovierungsarbeiten oder periodisch zur intensiven Pflege. Alle unsere Partnerfirmen arbeiten mit modernsten Reinigungstechniken, speziellen Geräten wie Dampfreinigern und umweltfreundlichen Reinigungsmitteln. Besonders wichtig: Alle Reinigungsfirmen in unserem Netzwerk sind versichert, haben Erfahrung mit intensiven Reinigungen und verwenden professionelle Methoden für alle Arten von Verschmutzungen.
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
                    <li>Intensive Reinigung aller Räume</li>
                    <li>Entfernung von tief sitzendem Schmutz und Ablagerungen</li>
                    <li>Reinigung hinter und unter Möbeln</li>
                    <li>Gründliche Reinigung aller Böden inklusive Ecken und Kanten</li>
                    <li>Küchenreinigung inklusive Herd, Backofen, Kühlschrank</li>
                    <li>Intensive Badezimmerreinigung inklusive Entkalkung</li>
                    <li>Fensterreinigung innen und aussen inklusive Rahmen</li>
                    <li>Reinigung von Heizkörpern, Lüftungsgittern und Lampen</li>
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

                  {/* H2: Vorteile unserer gründlichen Grundreinigung */}
                  <h2 className="heading-2">Vorteile unserer gründlichen Grundreinigung</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Eine gründliche Tiefenreinigung bietet zahlreiche Vorteile gegenüber der normalen Unterhaltsreinigung. Sie entfernt tief sitzenden Schmutz und Allergene, die bei oberflächlicher Reinigung zurückbleiben. Sie verlängert die Lebensdauer von Möbeln und Oberflächen, indem sie Ablagerungen und Verschmutzungen entfernt, die langfristig Schäden verursachen können. Eine intensive Reinigung verbessert die Raumluftqualität erheblich und erleichtert die tägliche Unterhaltsreinigung, da weniger Schmutz vorhanden ist. Professionelle Reinigungsfirmen verwenden spezielle Methoden und Geräte, die für intensive Reinigungen entwickelt wurden. Durch den Vergleich mehrerer Offerten über unsere Plattform können Sie bis zu 40% sparen.
                  </p>

                  {/* Vorteile Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/reinigungsmittel_auf_tisch.webp"
                      alt="Vorteile gründlicher Grundreinigung - Intensive Reinigungsmethoden"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Bullet Points - Vorteile */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>Entfernung von tief sitzendem Schmutz und Allergenen</li>
                    <li>Nur geprüfte, versicherte Reinigungsfirmen</li>
                    <li>Spezielle Methoden und Geräte für intensive Reinigung</li>
                    <li>Verlängerung der Lebensdauer von Möbeln und Oberflächen</li>
                    <li>Verbesserung der Raumluftqualität</li>
                    <li>Erleichterung der täglichen Unterhaltsreinigung</li>
                  </ul>

                  {/* H2: Was bei einer umfassenden Grundreinigung gereinigt wird */}
                  <h2 className="heading-2">Was bei einer umfassenden Grundreinigung gereinigt wird</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Eine umfassende Tiefenreinigung beinhaltet die intensive Reinigung aller Räume und Bereiche. Dazu gehört die Entfernung aller Möbel zur Reinigung darunter und dahinter, die gründliche Reinigung aller Böden inklusive Ecken, Kanten und schwer zugänglicher Stellen. Alle Oberflächen werden intensiv gereinigt, inklusive Regale, Schränke, Fensterbänke und Heizkörper. In der Küche werden Herd, Backofen, Kühlschrank, Spüle, Arbeitsflächen und Schränke innen und aussen gereinigt. Das Badezimmer wird komplett gereinigt, inklusive Entkalkung, Reinigung von Toilette, Dusche, Badewanne, Waschbecken und Fliesen. Fenster werden innen und aussen gereinigt, inklusive Rahmen und Bänke. Heizkörper, Lüftungsgittern, Lampen und alle schwer zugänglichen Stellen werden gründlich gereinigt.
                  </p>

                  {/* H2: Grundreinigung für verschiedene Anlässe (Einzug, Auszug, nach Renovation) */}
                  <h2 className="heading-2">Grundreinigung für verschiedene Anlässe (Einzug, Auszug, nach Renovation)</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Professionelle Tiefenreinigung wird für verschiedene Anlässe angeboten, die alle intensive Reinigung erfordern. Tiefenreinigung bei Einzug sorgt dafür, dass Sie in eine saubere, hygienische Wohnung einziehen. Intensive Reinigung bei Auszug stellt sicher, dass die Wohnung den Anforderungen für die Übergabe entspricht. Tiefenreinigung nach Renovierungsarbeiten entfernt Bauschutt, Staub und Farbreste, die bei Renovierungen entstehen. Periodische Tiefenreinigung (ein- bis zweimal jährlich) hält Ihr Zuhause in optimalem Zustand und entfernt tief sitzenden Schmutz, der sich über Zeit ansammelt. Professionelle Reinigungsfirmen passen ihre Methoden und den Umfang der Reinigung an den spezifischen Anlass an.
                  </p>

                  {/* Anlässe Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/grundreinigung_anlaesse.png"
                      alt="Grundreinigung für verschiedene Anlässe - Einzug, Auszug, nach Renovation"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Intensive Reinigungsmethoden und Spezialtechniken */}
                  <h2 className="heading-2">Intensive Reinigungsmethoden und Spezialtechniken</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Tiefenreinigung erfordert spezielle Methoden und Geräte, die über die normale Reinigung hinausgehen. Dampfreinigung wird für hartnäckige Verschmutzungen verwendet und entfernt tief sitzenden Schmutz und Bakterien. Hochdruckreinigung wird für Aussenbereiche und besonders verschmutzte Oberflächen eingesetzt. Spezielle Reinigungsmittel für Kalk, Fett oder Rost werden verwendet, um Ablagerungen zu entfernen. Professionelle Geräte für Teppichreinigung entfernen tief sitzenden Schmutz aus Textilien. Spezielle Techniken für empfindliche Oberflächen wie Holz oder Naturstein werden angewendet, um Schäden zu vermeiden. Professionelle Reinigungsfirmen haben das Wissen und die Ausrüstung für alle Arten von Verschmutzungen und verwenden die richtigen Methoden für jedes Material.
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
                    Moderne Reinigungsfirmen setzen zunehmend auf umweltfreundliche und gesundheitsschonende Reinigungsmittel, auch bei intensiven Reinigungen. Diese sind nicht nur besser für die Umwelt, sondern auch für Ihre Gesundheit und die Ihrer Familie. Biologische Reinigungsmittel sind besonders für Haushalte mit Kindern, Allergikern oder Haustieren empfehlenswert. Sie sind effektiv gegen hartnäckigen Schmutz, Kalk und Bakterien, schonen aber gleichzeitig die Umwelt und die Gesundheit. Unsere Partnerfirmen verwenden ausschliesslich zertifizierte, umweltfreundliche Reinigungsmittel und achten darauf, dass keine schädlichen Chemikalien in Ihrer Wohnung zurückbleiben. Dies ist besonders wichtig bei Tiefenreinigung, da intensive Reinigungsmittel verwendet werden.
                  </p>

                  {/* Umweltfreundlich Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/umweltfreundliche_reinigungsmittel_modern.webp"
                      alt="Moderne und umweltfreundliche Reinigungsmittel für Grundreinigung"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Ablauf unserer Grundreinigung – Schritt für Schritt */}
                  <h2 className="heading-2">Ablauf unserer Grundreinigung – Schritt für Schritt</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Der Ablauf einer professionellen Grundreinigung ist strukturiert und gründlich. Zunächst erfolgt eine Besichtigung der Wohnung, um den Umfang der Reinigung zu bestimmen, den Zustand zu beurteilen und eine genaue Offerte zu erstellen. Nach der Auftragsbestätigung wird ein Termin vereinbart, der zu Ihren Bedürfnissen passt. Am Reinigungstag erscheint das professionelle Reinigungsteam pünktlich mit allen notwendigen Geräten, speziellen Reinigungsmitteln und Ausrüstung. Die Reinigung erfolgt systematisch Raum für Raum, beginnend mit den am stärksten verschmutzten Bereichen. Spezielle Methoden wie Dampfreinigung werden für hartnäckige Verschmutzungen angewendet. Nach Abschluss der Reinigung erfolgt eine Qualitätskontrolle, und Sie erhalten ein tiefenreines, hygienisch sauberes Zuhause.
                  </p>

                  {/* Ablauf Steps */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 p-6 md:p-8">
                    <ul className="list-disc list-inside space-y-3 text-body">
                      <li><strong>Besichtigung und Offerte:</strong> Wir besichtigen Ihre Wohnung, beurteilen den Zustand und erstellen eine genaue Offerte.</li>
                      <li><strong>Terminvereinbarung:</strong> Nach der Auftragsbestätigung vereinbaren wir einen Termin, der zu Ihren Bedürfnissen passt.</li>
                      <li><strong>Professionelle Grundreinigung:</strong> Unser professionelles Team reinigt Ihre Wohnung intensiv mit speziellen Methoden und Geräten.</li>
                      <li><strong>Qualitätskontrolle:</strong> Nach Abschluss der Reinigung erfolgt eine Qualitätskontrolle für perfekte Ergebnisse.</li>
                    </ul>
                  </div>

                  {/* H2: Was kostet eine professionelle Grundreinigung? */}
                  <h2 className="heading-2">Was kostet eine professionelle Grundreinigung?</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Die Kosten für intensive Tiefenreinigung sind höher als bei Unterhaltsreinigung, da der Aufwand deutlich grösser ist und spezielle Methoden und Geräte verwendet werden. Eine durchschnittliche 3-Zimmer-Wohnung benötigt etwa 4-6 Stunden, was Kosten von 300-600 CHF bedeutet. Grössere Wohnungen, stark verschmutzte Bereiche oder zusätzliche Leistungen können höhere Kosten verursachen. Die genauen Kosten hängen von der Grösse der Wohnung, dem Zustand, dem Umfang der Reinigung und dem Anlass ab. Durch den Vergleich mehrerer Offerten über unsere Plattform können Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen erhalten. Alle Offerten sind kostenlos und unverbindlich.
                  </p>

                  {/* H2: Warum wir der richtige Partner für Ihre Grundreinigung sind */}
                  <h2 className="heading-2">Warum wir der richtige Partner für Ihre Tiefenreinigung sind</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Wir sind der vertrauenswürdige Partner für Ihre Tiefenreinigung. Unser Netzwerk umfasst nur geprüfte, versicherte Reinigungsfirmen, die höchste Qualitätsstandards erfüllen und Erfahrung mit intensiven Reinigungen haben. Alle Partnerfirmen verwenden moderne, umweltfreundliche Reinigungsmittel und haben die richtige Ausrüstung für intensive Reinigungen, wie Dampfreiniger und spezielle Reinigungsmittel. Wir haben bereits über 500 zufriedene Kunden geholfen, die richtige Reinigungsfirma zu finden. Unser Service ist komplett kostenlos und unverbindlich – Sie zahlen nur für die Reinigung selbst, nicht für unsere Vermittlung. Zudem können Sie durch den Vergleich mehrerer Offerten bis zu 40% sparen.
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
                    <h2 className="heading-2">Häufig gestellte Fragen zur Reinigung</h2>
                    <p className="text-body mb-6 md:mb-8 leading-relaxed">
                      Häufig gestellte Fragen zur professionellen Tiefenreinigung: Was kostet eine intensive Reinigung? Wann sollte eine intensive Reinigung durchgeführt werden? Was beinhaltet eine umfassende Reinigung? Wie lange dauert eine intensive Reinigung? Was ist der Unterschied zwischen Tiefenreinigung und Unterhaltsreinigung? Welche Reinigungsmethoden werden verwendet? Werden umweltfreundliche Reinigungsmittel verwendet? Diese und weitere Fragen beantworten wir Ihnen gerne. Über unsere Plattform können Sie Reinigungsofferten online vergleichen und dabei bis zu 40% sparen.
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
                      <Link href="/reinigung/baureinigung"
                        className="block p-4 md:p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                      >
                        <h3 className="heading-3">Baureinigung</h3>
                        <p className="text-sm md:text-base text-gray-600">Gründliche Baureinigung nach Neubau oder Renovation für perfekte Resultate.</p>
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
                      Reinigungsofferten online vergleichen und bis zu 40% sparen. Alle Offerten beinhalten professionelle Grundreinigung mit intensiven Methoden. Ohne Aufpreis, ohne Verpflichtung. Starten Sie jetzt Ihre kostenlose Anfrage und finden Sie die perfekte Reinigungsfirma für Ihre Bedürfnisse.
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


