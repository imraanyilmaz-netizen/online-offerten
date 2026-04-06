'use client'

import React, { useMemo } from 'react';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Award, ShieldCheck, Star } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CleaningRatgeberSidebar from '@/components/CleaningRatgeberSidebar';
import { useUserLocation } from '@/hooks/useUserLocation';

const BodenreinigungPageClient = () => {
  const router = useRouter();
  const { city, loading: locationLoading } = useUserLocation();
  

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=reinigung&step=2');
  };

  // SEO Data
  const metaTitle = "Bodenreinigung – Kostenlose Offerten vergleichen";
  const metaDescription = "Bodenreinigung für Parkett, Stein oder Teppich: Erhalten Sie kostenlose Offerten und vergleichen Sie qualifizierte Reinigungsfirmen in Ihrer Region.";
  // Meta keywords removed - Google no longer uses this tag (since 2009)
  const canonicalUrl = '/reinigung/bodenreinigung';

  // FAQ Data
  const faqItems = [
    {
      q: "Was kostet eine professionelle Bodenreinigung?",
      a: "Die Kosten für Bodenreinigung hängen von der Art des Belags, der Grösse der Fläche und der Art der Reinigung ab. Teppichreinigung kostet etwa 8-15 CHF pro m², Parkettreinigung etwa 10-20 CHF pro m². Fliesenreinigung kostet etwa 5-12 CHF pro m², abhängig vom Zustand und der Fugenreinigung. Durch den Vergleich mehrerer Offerten können Sie bis zu 40% sparen."
    },
    {
      q: "Wie oft sollte ich meine Böden professionell reinigen lassen?",
      a: "Die optimale Reinigungsfrequenz hängt vom Belagstyp und der Nutzung ab. Teppiche sollten etwa alle 6-12 Monate professionell gereinigt werden. Parkett benötigt regelmässige, schonende Reinigung, etwa alle 3-6 Monate. Fliesen können häufiger gereinigt werden, etwa alle 2-4 Monate. Professionelle Reinigungsfirmen beraten Sie gerne bei der optimalen Frequenz für Ihre spezifischen Böden."
    },
    {
      q: "Welche Bodenbeläge können gereinigt werden?",
      a: "Professionelle Reinigungsfirmen reinigen alle Arten von Bodenbelägen: Teppichböden, Parkett, Fliesen, Laminat, Vinyl, Steinböden und mehr. Jeder Belag erfordert spezielle Reinigungsmethoden und -mittel, die professionelle Firmen kennen. Sie verwenden die richtigen Methoden für jeden Belagstyp und können empfindliche Böden schonend reinigen."
    },
    {
      q: "Wie lange dauert eine Bodenreinigung?",
      a: "Die Dauer hängt von der Grösse der Fläche und dem Verschmutzungsgrad ab. Eine durchschnittliche Wohnung (80-100 m²) benötigt etwa 2-4 Stunden. Grössere Flächen oder stark verschmutzte Böden können länger dauern. Professionelle Reinigungsfirmen können Ihnen nach der Besichtigung eine genaue Zeitangabe geben."
    },
    {
      q: "Kann ich nach der Reinigung sofort wieder betreten?",
      a: "Dies hängt von der Reinigungsmethode ab. Bei Trockenreinigung können Sie sofort wieder betreten. Bei Nassreinigung oder Dampfreinigung sollten Sie warten, bis die Böden vollständig getrocknet sind, was je nach Belagstyp 2-6 Stunden dauern kann. Professionelle Reinigungsfirmen informieren Sie über die Trocknungszeit für Ihren spezifischen Belagstyp."
    },
    {
      q: "Welche Reinigungsmethoden werden verwendet?",
      a: "Bodenreinigung verwendet verschiedene Methoden je nach Belagstyp: Dampfreinigung für Teppiche, schonende Nassreinigung für Parkett, intensive Reinigung mit Fugenreinigung für Fliesen, vorsichtige Reinigung für Laminat. Professionelle Reinigungsfirmen haben die richtigen Methoden und Geräte für jeden Belagstyp und verwenden die passenden Reinigungsmittel."
    },
    {
      q: "Werden umweltfreundliche Reinigungsmittel verwendet?",
      a: "Ja, moderne Reinigungsfirmen setzen zunehmend auf umweltfreundliche und gesundheitsschonende Reinigungsmittel. Alle Reinigungsfirmen in unserem Netzwerk verwenden zertifizierte, umweltfreundliche Reinigungsmittel, die effektiv sind, aber gleichzeitig die Umwelt und die Gesundheit schonen. Dies ist besonders wichtig bei Bodenreinigung, da die Böden täglich betreten werden."
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
      "name": "Kostenlose Offerte für Bodenreinigung"
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
              backgroundImage: `url('https://online-offerten.ch/reinigungsfirma/bodenreinigung.png')`,
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
                    Professionelle Bodenreinigung
                  </h1>
                </div>
                
                <p
                  className="text-base sm:text-body mb-8 leading-relaxed"
                >
                  Professionelle Bodenreinigung für alle Bodenbeläge. Teppich, Parkett, Fliesen, Laminat, Vinyl, Stein. Reinigungsofferten online vergleichen und bis zu 40% sparen.
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
                  {/* H2: Warum eine professionelle Bodenreinigung sinnvoll ist */}
                  <h2 className="heading-2 mb-6 break-words">Warum eine professionelle Bodenreinigung sinnvoll ist</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Eine professionelle Reinigung der Böden ist essentiell für die Pflege und Langlebigkeit Ihrer Böden. Böden sind täglich Belastungen ausgesetzt: Schmutz, Staub, Feuchtigkeit, Abnutzung und Flecken. Während regelmässiges Staubsaugen und Wischen die Oberfläche sauber hält, entfernt eine professionelle Reinigung tief sitzende Verschmutzungen, Allergene und Bakterien, die bei normaler Reinigung nicht erreicht werden. Verschiedene Bodenbeläge erfordern unterschiedliche Reinigungsmethoden und -mittel, die professionelle Reinigungsfirmen kennen. Eine regelmässige professionelle Reinigung verlängert die Lebensdauer Ihrer Böden erheblich und verbessert die Raumluftqualität, besonders bei Teppichböden, die Allergene und Staub speichern können.
                  </p>

                  {/* H2: Unsere Leistungen im Bereich Bodenreinigung */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Unsere Leistungen im Bereich Böden</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Unser Netzwerk geprüfter Reinigungsfirmen bietet ein umfassendes Leistungsspektrum für die Reinigung aller Arten von Bodenbelägen. Dazu gehören professionelle Teppichreinigung mit Dampfreinigung oder Trockenreinigung, schonende Parkettreinigung und -pflege, intensive Fliesenreinigung mit Fugenreinigung, Laminatreinigung ohne zu viel Feuchtigkeit, Vinylreinigung mit speziellen Methoden, Steinbodenreinigung und -versiegelung, sowie Grundreinigung für alle Bodenbeläge. Alle unsere Partnerfirmen arbeiten mit modernsten Reinigungstechniken, speziellen Geräten für verschiedene Beläge und umweltfreundlichen Reinigungsmitteln. Besonders wichtig: Alle Reinigungsfirmen in unserem Netzwerk haben Erfahrung mit verschiedenen Bodenbelägen und kennen die richtigen Methoden für jeden Belagstyp.
                  </p>

                  {/* Leistungen Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/bodenreinigung_maschine_profi.png"
                      alt="Bodenreinigungsdienstleistungen - Professionelle Reinigung aller Bodenbeläge"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Bullet Points - Leistungen */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>Professionelle Teppichreinigung (Dampfreinigung oder Trockenreinigung)</li>
                    <li>Schonende Parkettreinigung und -pflege</li>
                    <li>Intensive Fliesenreinigung mit Fugenreinigung</li>
                    <li>Vorsichtige Laminatreinigung ohne zu viel Feuchtigkeit</li>
                    <li>Vinylreinigung mit speziellen Methoden</li>
                    <li>Steinbodenreinigung und -versiegelung</li>
                    <li>Fugenreinigung und Kalkentfernung</li>
                    <li>Grundreinigung für alle Bodenbeläge</li>
                  </ul>

                  {/* CTA 1 - After Leistungen */}
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-green-50 rounded-lg border border-green-200 mb-6 md:mb-8">
                    <h3 className="heading-3 mb-4">
                      {city && !locationLoading 
                        ? `Professionelle Reinigung der Böden in ${city}`
                        : 'Professionelle Reinigung der Böden buchen'
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

                  {/* H2: Vorteile unserer professionellen Bodenreinigung */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Vorteile unserer professionellen Bodenreinigung</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Eine professionelle Reinigung der Böden bietet zahlreiche Vorteile gegenüber der eigenen Reinigung. Sie entfernt tief sitzende Verschmutzungen, Allergene und Flecken, die bei normaler Reinigung nicht erreicht werden. Professionelle Reinigungsfirmen haben spezielle Geräte wie Dampfreiniger, Teppichreinigungsmaschinen und Hochdruckreiniger, die für verschiedene Bodenbeläge entwickelt wurden. Sie kennen die richtigen Methoden und Reinigungsmittel für jeden Belagstyp und können empfindliche Böden wie Parkett oder Laminat schonend reinigen. Zudem verlängert eine regelmässige professionelle Reinigung die Lebensdauer Ihrer Böden erheblich und verbessert die Raumluftqualität. Durch den Vergleich mehrerer Offerten über unsere Plattform können Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen erhalten.
                  </p>

                  {/* Vorteile Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/reinigungsmittel_auf_tisch.webp"
                      alt="Vorteile professioneller Bodenreinigung - Spezielle Methoden und Geräte"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Bullet Points - Vorteile */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>Entfernung von tief sitzenden Verschmutzungen und Allergenen</li>
                    <li>Nur geprüfte, versicherte Reinigungsfirmen</li>
                    <li>Spezielle Geräte für verschiedene Bodenbeläge</li>
                    <li>Schonende Reinigung für empfindliche Böden</li>
                    <li>Umweltfreundliche Reinigungsmittel</li>
                    <li>Verlängerung der Lebensdauer Ihrer Böden</li>
                  </ul>

                  {/* H2: Was bei einer gründlichen Bodenreinigung gereinigt wird */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Was bei einer gründlichen Bodenreinigung gereinigt wird</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Eine gründliche Bodenreinigung beinhaltet die intensive Reinigung aller Bodenflächen inklusive schwer zugänglicher Stellen. Bei Teppichböden wird tief sitzender Schmutz, Staub und Allergene entfernt, Flecken werden behandelt und der Teppich wird gründlich gereinigt. Bei Parkett werden alle Oberflächen schonend gereinigt, Kratzer können poliert werden und bei Bedarf wird das Parkett geölt oder versiegelt. Bei Fliesen werden alle Oberflächen gereinigt, Fugen werden intensiv gereinigt, Kalkablagerungen werden entfernt und Verfärbungen werden behandelt. Bei Laminat wird vorsichtig gereinigt ohne zu viel Feuchtigkeit, Kratzer können behandelt werden. Bei Vinyl und Steinböden werden spezielle Methoden angewendet, um optimale Ergebnisse zu erzielen. Professionelle Reinigungsfirmen verwenden die richtigen Methoden für jeden Belagstyp.
                  </p>

                  {/* H2: Bodenreinigung für verschiedene Bodenbeläge (Teppich, Parkett, Fliesen, Laminat, Vinyl, Stein) */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Bodenreinigung für verschiedene Bodenbeläge (Teppich, Parkett, Fliesen, Laminat, Vinyl, Stein)</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Professionelle Bodenreinigung wird für alle Arten von Bodenbelägen angeboten, wobei jeder Belag spezielle Reinigungsanforderungen hat. Teppichböden benötigen Dampfreinigung oder Trockenreinigung, um tief sitzenden Schmutz und Allergene zu entfernen. Parkett erfordert schonende Reinigung ohne zu viel Feuchtigkeit, um das Holz nicht zu schädigen. Fliesen können mit stärkeren Reinigungsmitteln gereinigt werden, wobei die Fugenreinigung besonders wichtig ist. Laminat benötigt vorsichtige Reinigung ohne zu viel Feuchtigkeit, um Schäden zu vermeiden. Vinyl und Steinböden haben ihre eigenen Anforderungen. Professionelle Reinigungsfirmen kennen die richtigen Methoden für jeden Belagstyp und verwenden die passenden Reinigungsmittel und Geräte. Unabhängig von Ihrem Bodenbelag, alle Reinigungsfirmen in unserem Netzwerk haben Erfahrung mit verschiedenen Belägen.
                  </p>

                  {/* H2: Teppichreinigung - Spezielle Methoden und Vorteile */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Teppichreinigung - Spezielle Methoden und Vorteile</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Teppichböden sammeln über Zeit Staub, Allergene, Flecken und tief sitzenden Schmutz, der bei normalem Staubsaugen nicht entfernt wird. Professionelle Teppichreinigung verwendet spezielle Methoden wie Dampfreinigung oder Trockenreinigung, um tief sitzenden Schmutz zu entfernen, Flecken zu behandeln und die Raumluftqualität zu verbessern. Dampfreinigung entfernt Bakterien und Allergene gründlich, während Trockenreinigung schneller trocknet und für empfindliche Teppiche geeignet ist. Regelmässige professionelle Teppichreinigung (alle 6-12 Monate) verlängert die Lebensdauer erheblich, hält Teppiche hygienisch sauber und verbessert die Raumluftqualität, besonders für Allergiker. Professionelle Reinigungsfirmen haben die richtigen Geräte und Methoden für alle Arten von Teppichen.
                  </p>

                  {/* Teppichreinigung Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/teppichreinigung_tiefenrein.png"
                      alt="Teppichreinigung - Spezielle Methoden für tiefenreine Teppiche"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Parkettreinigung und -pflege - Schonende Reinigung für Holz */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Parkettreinigung und -pflege - Schonende Reinigung für Holz</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Parkett ist ein empfindlicher Bodenbelag, der schonende Reinigung erfordert. Zu viel Feuchtigkeit kann das Holz schädigen, quellen lassen oder Verfärbungen verursachen. Professionelle Parkettreinigung verwendet spezielle Reinigungsmittel und Methoden, die das Holz schonen und gleichzeitig gründlich reinigen. Zusätzlich kann Parkettpflege wie Ölen, Versiegeln oder Polieren die Lebensdauer verlängern und das Parkett schützen. Professionelle Reinigungskräfte kennen die richtigen Methoden für verschiedene Holzarten und Oberflächenbehandlungen. Regelmässige schonende Reinigung hält Parkett in optimalem Zustand und verhindert langfristige Schäden. Professionelle Reinigungsfirmen haben Erfahrung mit Parkett und verwenden die richtigen Methoden und Mittel für jeden Parketttyp.
                  </p>

                  {/* Parkettreinigung Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/parkettreinigung_schonend_holzpflege.png"
                      alt="Parkettreinigung und -pflege - Schonende Reinigung für Holz"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Fliesenreinigung - Fugenreinigung und Kalkentfernung */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Fliesenreinigung - Fugenreinigung und Kalkentfernung</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Fliesen sind robust, aber Fugen können problematisch sein, da sich hier Bakterien, Schmutz und Verfärbungen ansammeln können. Professionelle Fliesenreinigung entfernt Schmutz, Kalkablagerungen und Verfärbungen von allen Oberflächen. Fugenreinigung ist besonders wichtig, da sich hier Bakterien ansammeln können und die Fugen oft verfärbt werden. Professionelle Reinigungskräfte verwenden geeignete Mittel und Bürsten für optimale Ergebnisse, entfernen Kalkablagerungen gründlich und behandeln Verfärbungen. Regelmässige professionelle Fliesenreinigung hält Fliesen hygienisch sauber und verhindert langfristige Schäden. Professionelle Reinigungsfirmen haben die richtigen Methoden und Mittel für alle Arten von Fliesen und Fugenmaterialien.
                  </p>

                  {/* Fliesenreinigung Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/fliesenreinigung_fugenreinigung_dampfreiniger.png"
                      alt="Fliesenreinigung - Fugenreinigung und Kalkentfernung"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Moderne und umweltfreundliche Reinigungsmethoden */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Moderne und umweltfreundliche Reinigungsmethoden</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Moderne Reinigungsfirmen setzen zunehmend auf umweltfreundliche und gesundheitsschonende Reinigungsmethoden, auch bei intensiven Bodenreinigungen. Diese sind nicht nur besser für die Umwelt, sondern auch für Ihre Gesundheit und die Ihrer Familie. Biologische Reinigungsmittel sind besonders für Haushalte mit Kindern, Allergikern oder Haustieren empfehlenswert. Sie sind effektiv gegen Schmutz, Flecken und Bakterien, schonen aber gleichzeitig die Umwelt und die Gesundheit. Unsere Partnerfirmen verwenden ausschliesslich zertifizierte, umweltfreundliche Reinigungsmittel und achten darauf, dass keine schädlichen Chemikalien auf Ihren Böden zurückbleiben. Dies ist besonders wichtig bei Bodenreinigung, da die Böden täglich betreten werden und in direktem Kontakt mit Ihrer Familie stehen.
                  </p>

                  {/* Umweltfreundlich Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/umweltfreundliche_reinigungsmittel_modern.webp"
                      alt="Moderne und umweltfreundliche Reinigungsmethoden für Bodenreinigung"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Ablauf unserer Bodenreinigung – Schritt für Schritt */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Ablauf unserer Bodenreinigung – Schritt für Schritt</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Der Ablauf einer professionellen Bodenreinigung ist strukturiert und gründlich. Zunächst erfolgt eine Besichtigung der Böden, um den Belagstyp zu bestimmen, den Zustand zu beurteilen und eine genaue Offerte zu erstellen. Nach der Auftragsbestätigung wird ein Termin vereinbart, der zu Ihren Bedürfnissen passt. Am Reinigungstag erscheint das professionelle Reinigungsteam pünktlich mit allen notwendigen Geräten, speziellen Reinigungsmitteln und Ausrüstung für Ihren spezifischen Belagstyp. Die Reinigung erfolgt systematisch: Vorreinigung zur Entfernung von grobem Schmutz, Hauptreinigung mit speziellen Methoden für Ihren Belagstyp, Behandlung von Flecken und problematischen Stellen, und abschliessende Pflege. Nach Abschluss der Reinigung erfolgt eine Qualitätskontrolle, und Sie erhalten saubere, gepflegte Böden.
                  </p>

                  {/* Ablauf Steps */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 p-6 md:p-8">
                    <ul className="list-disc list-inside space-y-3 text-body">
                      <li><strong>Besichtigung und Offerte:</strong> Wir besichtigen Ihre Böden, bestimmen den Belagstyp, beurteilen den Zustand und erstellen eine genaue Offerte.</li>
                      <li><strong>Terminvereinbarung:</strong> Nach der Auftragsbestätigung vereinbaren wir einen Termin, der zu Ihren Bedürfnissen passt.</li>
                      <li><strong>Professionelle Bodenreinigung:</strong> Unser professionelles Team reinigt Ihre Böden gründlich mit speziellen Methoden und Geräten für Ihren Belagstyp.</li>
                      <li><strong>Qualitätskontrolle:</strong> Nach Abschluss der Reinigung erfolgt eine Qualitätskontrolle für perfekte Ergebnisse.</li>
                    </ul>
                  </div>

                  {/* H2: Was kostet eine professionelle Bodenreinigung? */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Was kostet eine professionelle Bodenreinigung?</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Die Kosten für Bodenreinigung hängen von der Art des Belags, der Grösse der Fläche und der Art der Reinigung ab. Teppichreinigung kostet etwa 8-15 CHF pro m², Parkettreinigung etwa 10-20 CHF pro m². Fliesenreinigung kostet etwa 5-12 CHF pro m², abhängig vom Zustand und der Fugenreinigung. Laminat- und Vinylreinigung kostet etwa 6-12 CHF pro m². Die genauen Kosten hängen vom Belagstyp, dem Zustand, dem Umfang der Reinigung und zusätzlichen Leistungen wie Fugenreinigung oder Parkettpflege ab. Durch den Vergleich mehrerer Offerten über unsere Plattform können Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen erhalten. Alle Offerten sind kostenlos und unverbindlich.
                  </p>

                  {/* H2: Wie oft sollte eine Bodenreinigung durchgeführt werden? */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Wie oft sollte eine Bodenreinigung durchgeführt werden?</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Die optimale Reinigungsfrequenz hängt vom Belagstyp und der Nutzung ab. Teppiche sollten etwa alle 6-12 Monate professionell gereinigt werden, abhängig von der Nutzung und dem Verschmutzungsgrad. Parkett benötigt regelmässige, schonende Reinigung, etwa alle 3-6 Monate, abhängig von der Nutzung. Fliesen können häufiger gereinigt werden, etwa alle 2-4 Monate, besonders wenn Fugenreinigung erforderlich ist. Laminat und Vinyl benötigen regelmässige Reinigung, etwa alle 3-6 Monate. Professionelle Reinigungsfirmen beraten Sie gerne bei der optimalen Frequenz für Ihre spezifischen Böden und berücksichtigen dabei Faktoren wie Nutzung, Verschmutzungsgrad und Belagstyp.
                  </p>

                  {/* H2: Warum wir der richtige Partner für Ihre Bodenreinigung sind */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Warum wir der richtige Partner für Ihre Böden sind</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Wir sind der vertrauenswürdige Partner für Ihre Böden. Unser Netzwerk umfasst nur geprüfte, versicherte Reinigungsfirmen, die höchste Qualitätsstandards erfüllen und Erfahrung mit verschiedenen Bodenbelägen haben. Alle Partnerfirmen verwenden moderne, umweltfreundliche Reinigungsmittel und haben die richtige Ausrüstung für verschiedene Belagstypen, wie Dampfreiniger, Teppichreinigungsmaschinen und spezielle Reinigungsmittel. Sie kennen die richtigen Methoden für jeden Belagstyp und können empfindliche Böden wie Parkett oder Laminat schonend reinigen. Wir haben bereits über 500 zufriedene Kunden geholfen, die richtige Reinigungsfirma für Böden zu finden. Unser Service ist komplett kostenlos und unverbindlich – Sie zahlen nur für die Reinigung selbst, nicht für unsere Vermittlung. Zudem können Sie durch den Vergleich mehrerer Offerten bis zu 40% sparen.
                  </p>

                  {/* CTA Banner Section */}
                  <div className="mt-6 md:mt-8 mb-6 md:mb-8">
                    <div className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-700 rounded-xl p-6 md:p-8 lg:p-10 shadow-xl">
                      {/* Header with icons */}
                      <div className="flex items-center justify-center mb-4 md:mb-6">
                        <div className="w-3 h-3 bg-blue-300 rounded-sm rotate-45 mr-2"></div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center leading-tight">
                          Bodenreinigung – Kostenlose Offerten anfordern und bis zu 40% sparen
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
                          <span className="text-white text-base md:text-lg font-medium">Geprüfte Partner für alle Bodenbeläge</span>
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

                  {/* Customer Reviews */}
                  <div className="mt-8 md:mt-12">
                  </div>

                  {/* FAQ Section */}
                  <div className="mt-6 md:mt-12">
                    <h2 className="heading-2 mb-6">Häufig gestellte Fragen zur Reinigung</h2>
                    <p className="text-body mb-6 md:mb-8">
                      Häufig gestellte Fragen zur professionellen Reinigung der Böden: Was kostet eine Bodenreinigung? Wie oft sollte ich meine Böden professionell reinigen lassen? Welche Bodenbeläge können gereinigt werden? Wie lange dauert eine Bodenreinigung? Kann ich nach der Reinigung sofort wieder betreten? Welche Reinigungsmethoden werden verwendet? Werden umweltfreundliche Reinigungsmittel verwendet? Diese und weitere Fragen beantworten wir Ihnen gerne. Über unsere Plattform können Sie Reinigungsofferten online vergleichen und dabei bis zu 40% sparen.
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

                  {/* Internal Links */}
                  <div className="mt-8 md:mt-12">
                    <h2 className="heading-2 mb-6">Weitere Reinigungsdienstleistungen</h2>
                    <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                      <Link href="/reinigung/wohnungsreinigung"
                        className="block p-4 md:p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                      >
                        <h3 className="heading-3 mb-2">Wohnungsreinigung</h3>
                        <p className="text-sm md:text-base text-gray-600">Professionelle Wohnungsreinigung mit Abnahmegarantie für eine sorgenfreie Wohnungsübergabe.</p>
                      </Link>
                      <Link href="/reinigung/fensterreinigung"
                        className="block p-4 md:p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                      >
                        <h3 className="heading-3 mb-2">Fensterreinigung</h3>
                        <p className="text-sm md:text-base text-gray-600">Streifenfreie Fensterreinigung innen und aussen von professionellen Reinigungsfirmen.</p>
                      </Link>
                      <Link href="/reinigung/grundreinigung"
                        className="block p-4 md:p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                      >
                        <h3 className="heading-3 mb-2">Grundreinigung</h3>
                        <p className="text-sm md:text-base text-gray-600">Gründliche Grundreinigung vom Profi für ein tiefenreines Zuhause.</p>
                      </Link>
                    </div>
                  </div>

                  {/* CTA 3 - Final */}
                  <div className="mt-8 md:mt-12 p-4 md:p-6 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="heading-3 mb-4">
                      {city && !locationLoading 
                        ? `Professionelle Reinigung der Böden in ${city}`
                        : 'Jetzt unverbindliche Reinigungs-Offerte anfordern'
                      }
                    </h3>
                    <p className="text-body mb-3 md:mb-4">
                      Reinigungsofferten online vergleichen und bis zu 40% sparen. Alle Offerten beinhalten professionelle Bodenreinigung mit speziellen Methoden für Ihren Belagstyp. Ohne Aufpreis, ohne Verpflichtung. Starten Sie jetzt Ihre kostenlose Anfrage und finden Sie die perfekte Reinigungsfirma für Ihre Bedürfnisse.
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
                    <h3 className="heading-3 mb-4">Jetzt Offerten anfordern</h3>
                    <p className="text-body mb-3 md:mb-4">Kostenlos und unverbindlich Reinigungsofferten online vergleichen.</p>
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

export default BodenreinigungPageClient;


