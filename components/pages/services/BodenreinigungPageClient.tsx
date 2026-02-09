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
  const metaTitle = "Bodenreinigung â€“ Kostenlose Offerten vergleichen";
  const metaDescription = "Bodenreinigung fÃ¼r Parkett, Stein oder Teppich: Erhalten Sie kostenlose Offerten und vergleichen Sie qualifizierte Reinigungsfirmen in Ihrer Region.";
  // Meta keywords removed - Google no longer uses this tag (since 2009)
  const canonicalUrl = '/reinigung/bodenreinigung';

  // FAQ Data
  const faqItems = [
    {
      q: "Was kostet eine professionelle Bodenreinigung?",
      a: "Die Kosten fÃ¼r Bodenreinigung hÃ¤ngen von der Art des Belags, der GrÃ¶sse der FlÃ¤che und der Art der Reinigung ab. Teppichreinigung kostet etwa 8-15 CHF pro mÂ², Parkettreinigung etwa 10-20 CHF pro mÂ². Fliesenreinigung kostet etwa 5-12 CHF pro mÂ², abhÃ¤ngig vom Zustand und der Fugenreinigung. Durch den Vergleich mehrerer Offerten kÃ¶nnen Sie bis zu 40% sparen."
    },
    {
      q: "Wie oft sollte ich meine BÃ¶den professionell reinigen lassen?",
      a: "Die optimale Reinigungsfrequenz hÃ¤ngt vom Belagstyp und der Nutzung ab. Teppiche sollten etwa alle 6-12 Monate professionell gereinigt werden. Parkett benÃ¶tigt regelmÃ¤ssige, schonende Reinigung, etwa alle 3-6 Monate. Fliesen kÃ¶nnen hÃ¤ufiger gereinigt werden, etwa alle 2-4 Monate. Professionelle Reinigungsfirmen beraten Sie gerne bei der optimalen Frequenz fÃ¼r Ihre spezifischen BÃ¶den."
    },
    {
      q: "Welche BodenbelÃ¤ge kÃ¶nnen gereinigt werden?",
      a: "Professionelle Reinigungsfirmen reinigen alle Arten von BodenbelÃ¤gen: TeppichbÃ¶den, Parkett, Fliesen, Laminat, Vinyl, SteinbÃ¶den und mehr. Jeder Belag erfordert spezielle Reinigungsmethoden und -mittel, die professionelle Firmen kennen. Sie verwenden die richtigen Methoden fÃ¼r jeden Belagstyp und kÃ¶nnen empfindliche BÃ¶den schonend reinigen."
    },
    {
      q: "Wie lange dauert eine Bodenreinigung?",
      a: "Die Dauer hÃ¤ngt von der GrÃ¶sse der FlÃ¤che und dem Verschmutzungsgrad ab. Eine durchschnittliche Wohnung (80-100 mÂ²) benÃ¶tigt etwa 2-4 Stunden. GrÃ¶ssere FlÃ¤chen oder stark verschmutzte BÃ¶den kÃ¶nnen lÃ¤nger dauern. Professionelle Reinigungsfirmen kÃ¶nnen Ihnen nach der Besichtigung eine genaue Zeitangabe geben."
    },
    {
      q: "Kann ich nach der Reinigung sofort wieder betreten?",
      a: "Dies hÃ¤ngt von der Reinigungsmethode ab. Bei Trockenreinigung kÃ¶nnen Sie sofort wieder betreten. Bei Nassreinigung oder Dampfreinigung sollten Sie warten, bis die BÃ¶den vollstÃ¤ndig getrocknet sind, was je nach Belagstyp 2-6 Stunden dauern kann. Professionelle Reinigungsfirmen informieren Sie Ã¼ber die Trocknungszeit fÃ¼r Ihren spezifischen Belagstyp."
    },
    {
      q: "Welche Reinigungsmethoden werden verwendet?",
      a: "Bodenreinigung verwendet verschiedene Methoden je nach Belagstyp: Dampfreinigung fÃ¼r Teppiche, schonende Nassreinigung fÃ¼r Parkett, intensive Reinigung mit Fugenreinigung fÃ¼r Fliesen, vorsichtige Reinigung fÃ¼r Laminat. Professionelle Reinigungsfirmen haben die richtigen Methoden und GerÃ¤te fÃ¼r jeden Belagstyp und verwenden die passenden Reinigungsmittel."
    },
    {
      q: "Werden umweltfreundliche Reinigungsmittel verwendet?",
      a: "Ja, moderne Reinigungsfirmen setzen zunehmend auf umweltfreundliche und gesundheitsschonende Reinigungsmittel. Alle Reinigungsfirmen in unserem Netzwerk verwenden zertifizierte, umweltfreundliche Reinigungsmittel, die effektiv sind, aber gleichzeitig die Umwelt und die Gesundheit schonen. Dies ist besonders wichtig bei Bodenreinigung, da die BÃ¶den tÃ¤glich betreten werden."
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
      "name": "Kostenlose Offerte fÃ¼r Bodenreinigung"
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
                  Professionelle Bodenreinigung fÃ¼r alle BodenbelÃ¤ge. Teppich, Parkett, Fliesen, Laminat, Vinyl, Stein. Reinigungsofferten online vergleichen und bis zu 40% sparen.
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
                  {/* H2: Warum eine professionelle Bodenreinigung sinnvoll ist */}
                  <h2 className="heading-2 mb-6 break-words">Warum eine professionelle Bodenreinigung sinnvoll ist</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Eine professionelle Reinigung der BÃ¶den ist essentiell fÃ¼r die Pflege und Langlebigkeit Ihrer BÃ¶den. BÃ¶den sind tÃ¤glich Belastungen ausgesetzt: Schmutz, Staub, Feuchtigkeit, Abnutzung und Flecken. WÃ¤hrend regelmÃ¤ssiges Staubsaugen und Wischen die OberflÃ¤che sauber hÃ¤lt, entfernt eine professionelle Reinigung tief sitzende Verschmutzungen, Allergene und Bakterien, die bei normaler Reinigung nicht erreicht werden. Verschiedene BodenbelÃ¤ge erfordern unterschiedliche Reinigungsmethoden und -mittel, die professionelle Reinigungsfirmen kennen. Eine regelmÃ¤ssige professionelle Reinigung verlÃ¤ngert die Lebensdauer Ihrer BÃ¶den erheblich und verbessert die RaumluftqualitÃ¤t, besonders bei TeppichbÃ¶den, die Allergene und Staub speichern kÃ¶nnen.
                  </p>

                  {/* H2: Unsere Leistungen im Bereich Bodenreinigung */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Unsere Leistungen im Bereich BÃ¶den</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Unser Netzwerk geprÃ¼fter Reinigungsfirmen bietet ein umfassendes Leistungsspektrum fÃ¼r die Reinigung aller Arten von BodenbelÃ¤gen. Dazu gehÃ¶ren professionelle Teppichreinigung mit Dampfreinigung oder Trockenreinigung, schonende Parkettreinigung und -pflege, intensive Fliesenreinigung mit Fugenreinigung, Laminatreinigung ohne zu viel Feuchtigkeit, Vinylreinigung mit speziellen Methoden, Steinbodenreinigung und -versiegelung, sowie Grundreinigung fÃ¼r alle BodenbelÃ¤ge. Alle unsere Partnerfirmen arbeiten mit modernsten Reinigungstechniken, speziellen GerÃ¤ten fÃ¼r verschiedene BelÃ¤ge und umweltfreundlichen Reinigungsmitteln. Besonders wichtig: Alle Reinigungsfirmen in unserem Netzwerk haben Erfahrung mit verschiedenen BodenbelÃ¤gen und kennen die richtigen Methoden fÃ¼r jeden Belagstyp.
                  </p>

                  {/* Leistungen Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/bodenreinigung_maschine_profi.png"
                      alt="Bodenreinigungsdienstleistungen - Professionelle Reinigung aller BodenbelÃ¤ge"
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
                    <li>Grundreinigung fÃ¼r alle BodenbelÃ¤ge</li>
                  </ul>

                  {/* CTA 1 - After Leistungen */}
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-green-50 rounded-lg border border-green-200 mb-6 md:mb-8">
                    <h3 className="heading-3 mb-4">
                      {city && !locationLoading 
                        ? `Professionelle Reinigung der BÃ¶den in ${city}`
                        : 'Professionelle Reinigung der BÃ¶den buchen'
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
                    Eine professionelle Reinigung der BÃ¶den bietet zahlreiche Vorteile gegenÃ¼ber der eigenen Reinigung. Sie entfernt tief sitzende Verschmutzungen, Allergene und Flecken, die bei normaler Reinigung nicht erreicht werden. Professionelle Reinigungsfirmen haben spezielle GerÃ¤te wie Dampfreiniger, Teppichreinigungsmaschinen und Hochdruckreiniger, die fÃ¼r verschiedene BodenbelÃ¤ge entwickelt wurden. Sie kennen die richtigen Methoden und Reinigungsmittel fÃ¼r jeden Belagstyp und kÃ¶nnen empfindliche BÃ¶den wie Parkett oder Laminat schonend reinigen. Zudem verlÃ¤ngert eine regelmÃ¤ssige professionelle Reinigung die Lebensdauer Ihrer BÃ¶den erheblich und verbessert die RaumluftqualitÃ¤t. Durch den Vergleich mehrerer Offerten Ã¼ber unsere Plattform kÃ¶nnen Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen erhalten.
                  </p>

                  {/* Vorteile Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/reinigungsmittel_auf_tisch.webp"
                      alt="Vorteile professioneller Bodenreinigung - Spezielle Methoden und GerÃ¤te"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Bullet Points - Vorteile */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>Entfernung von tief sitzenden Verschmutzungen und Allergenen</li>
                    <li>Nur geprÃ¼fte, versicherte Reinigungsfirmen</li>
                    <li>Spezielle GerÃ¤te fÃ¼r verschiedene BodenbelÃ¤ge</li>
                    <li>Schonende Reinigung fÃ¼r empfindliche BÃ¶den</li>
                    <li>Umweltfreundliche Reinigungsmittel</li>
                    <li>VerlÃ¤ngerung der Lebensdauer Ihrer BÃ¶den</li>
                  </ul>

                  {/* H2: Was bei einer grÃ¼ndlichen Bodenreinigung gereinigt wird */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Was bei einer grÃ¼ndlichen Bodenreinigung gereinigt wird</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Eine grÃ¼ndliche Bodenreinigung beinhaltet die intensive Reinigung aller BodenflÃ¤chen inklusive schwer zugÃ¤nglicher Stellen. Bei TeppichbÃ¶den wird tief sitzender Schmutz, Staub und Allergene entfernt, Flecken werden behandelt und der Teppich wird grÃ¼ndlich gereinigt. Bei Parkett werden alle OberflÃ¤chen schonend gereinigt, Kratzer kÃ¶nnen poliert werden und bei Bedarf wird das Parkett geÃ¶lt oder versiegelt. Bei Fliesen werden alle OberflÃ¤chen gereinigt, Fugen werden intensiv gereinigt, Kalkablagerungen werden entfernt und VerfÃ¤rbungen werden behandelt. Bei Laminat wird vorsichtig gereinigt ohne zu viel Feuchtigkeit, Kratzer kÃ¶nnen behandelt werden. Bei Vinyl und SteinbÃ¶den werden spezielle Methoden angewendet, um optimale Ergebnisse zu erzielen. Professionelle Reinigungsfirmen verwenden die richtigen Methoden fÃ¼r jeden Belagstyp.
                  </p>

                  {/* H2: Bodenreinigung fÃ¼r verschiedene BodenbelÃ¤ge (Teppich, Parkett, Fliesen, Laminat, Vinyl, Stein) */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Bodenreinigung fÃ¼r verschiedene BodenbelÃ¤ge (Teppich, Parkett, Fliesen, Laminat, Vinyl, Stein)</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Professionelle Bodenreinigung wird fÃ¼r alle Arten von BodenbelÃ¤gen angeboten, wobei jeder Belag spezielle Reinigungsanforderungen hat. TeppichbÃ¶den benÃ¶tigen Dampfreinigung oder Trockenreinigung, um tief sitzenden Schmutz und Allergene zu entfernen. Parkett erfordert schonende Reinigung ohne zu viel Feuchtigkeit, um das Holz nicht zu schÃ¤digen. Fliesen kÃ¶nnen mit stÃ¤rkeren Reinigungsmitteln gereinigt werden, wobei die Fugenreinigung besonders wichtig ist. Laminat benÃ¶tigt vorsichtige Reinigung ohne zu viel Feuchtigkeit, um SchÃ¤den zu vermeiden. Vinyl und SteinbÃ¶den haben ihre eigenen Anforderungen. Professionelle Reinigungsfirmen kennen die richtigen Methoden fÃ¼r jeden Belagstyp und verwenden die passenden Reinigungsmittel und GerÃ¤te. UnabhÃ¤ngig von Ihrem Bodenbelag, alle Reinigungsfirmen in unserem Netzwerk haben Erfahrung mit verschiedenen BelÃ¤gen.
                  </p>

                  {/* H2: Teppichreinigung - Spezielle Methoden und Vorteile */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Teppichreinigung - Spezielle Methoden und Vorteile</h2>
                  <p className="text-body mb-6 break-words w-full">
                    TeppichbÃ¶den sammeln Ã¼ber Zeit Staub, Allergene, Flecken und tief sitzenden Schmutz, der bei normalem Staubsaugen nicht entfernt wird. Professionelle Teppichreinigung verwendet spezielle Methoden wie Dampfreinigung oder Trockenreinigung, um tief sitzenden Schmutz zu entfernen, Flecken zu behandeln und die RaumluftqualitÃ¤t zu verbessern. Dampfreinigung entfernt Bakterien und Allergene grÃ¼ndlich, wÃ¤hrend Trockenreinigung schneller trocknet und fÃ¼r empfindliche Teppiche geeignet ist. RegelmÃ¤ssige professionelle Teppichreinigung (alle 6-12 Monate) verlÃ¤ngert die Lebensdauer erheblich, hÃ¤lt Teppiche hygienisch sauber und verbessert die RaumluftqualitÃ¤t, besonders fÃ¼r Allergiker. Professionelle Reinigungsfirmen haben die richtigen GerÃ¤te und Methoden fÃ¼r alle Arten von Teppichen.
                  </p>

                  {/* Teppichreinigung Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/teppichreinigung_tiefenrein.png"
                      alt="Teppichreinigung - Spezielle Methoden fÃ¼r tiefenreine Teppiche"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Parkettreinigung und -pflege - Schonende Reinigung fÃ¼r Holz */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Parkettreinigung und -pflege - Schonende Reinigung fÃ¼r Holz</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Parkett ist ein empfindlicher Bodenbelag, der schonende Reinigung erfordert. Zu viel Feuchtigkeit kann das Holz schÃ¤digen, quellen lassen oder VerfÃ¤rbungen verursachen. Professionelle Parkettreinigung verwendet spezielle Reinigungsmittel und Methoden, die das Holz schonen und gleichzeitig grÃ¼ndlich reinigen. ZusÃ¤tzlich kann Parkettpflege wie Ã–len, Versiegeln oder Polieren die Lebensdauer verlÃ¤ngern und das Parkett schÃ¼tzen. Professionelle ReinigungskrÃ¤fte kennen die richtigen Methoden fÃ¼r verschiedene Holzarten und OberflÃ¤chenbehandlungen. RegelmÃ¤ssige schonende Reinigung hÃ¤lt Parkett in optimalem Zustand und verhindert langfristige SchÃ¤den. Professionelle Reinigungsfirmen haben Erfahrung mit Parkett und verwenden die richtigen Methoden und Mittel fÃ¼r jeden Parketttyp.
                  </p>

                  {/* Parkettreinigung Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/parkettreinigung_schonend_holzpflege.png"
                      alt="Parkettreinigung und -pflege - Schonende Reinigung fÃ¼r Holz"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Fliesenreinigung - Fugenreinigung und Kalkentfernung */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Fliesenreinigung - Fugenreinigung und Kalkentfernung</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Fliesen sind robust, aber Fugen kÃ¶nnen problematisch sein, da sich hier Bakterien, Schmutz und VerfÃ¤rbungen ansammeln kÃ¶nnen. Professionelle Fliesenreinigung entfernt Schmutz, Kalkablagerungen und VerfÃ¤rbungen von allen OberflÃ¤chen. Fugenreinigung ist besonders wichtig, da sich hier Bakterien ansammeln kÃ¶nnen und die Fugen oft verfÃ¤rbt werden. Professionelle ReinigungskrÃ¤fte verwenden geeignete Mittel und BÃ¼rsten fÃ¼r optimale Ergebnisse, entfernen Kalkablagerungen grÃ¼ndlich und behandeln VerfÃ¤rbungen. RegelmÃ¤ssige professionelle Fliesenreinigung hÃ¤lt Fliesen hygienisch sauber und verhindert langfristige SchÃ¤den. Professionelle Reinigungsfirmen haben die richtigen Methoden und Mittel fÃ¼r alle Arten von Fliesen und Fugenmaterialien.
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
                    Moderne Reinigungsfirmen setzen zunehmend auf umweltfreundliche und gesundheitsschonende Reinigungsmethoden, auch bei intensiven Bodenreinigungen. Diese sind nicht nur besser fÃ¼r die Umwelt, sondern auch fÃ¼r Ihre Gesundheit und die Ihrer Familie. Biologische Reinigungsmittel sind besonders fÃ¼r Haushalte mit Kindern, Allergikern oder Haustieren empfehlenswert. Sie sind effektiv gegen Schmutz, Flecken und Bakterien, schonen aber gleichzeitig die Umwelt und die Gesundheit. Unsere Partnerfirmen verwenden ausschliesslich zertifizierte, umweltfreundliche Reinigungsmittel und achten darauf, dass keine schÃ¤dlichen Chemikalien auf Ihren BÃ¶den zurÃ¼ckbleiben. Dies ist besonders wichtig bei Bodenreinigung, da die BÃ¶den tÃ¤glich betreten werden und in direktem Kontakt mit Ihrer Familie stehen.
                  </p>

                  {/* Umweltfreundlich Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/umweltfreundliche_reinigungsmittel_modern.webp"
                      alt="Moderne und umweltfreundliche Reinigungsmethoden fÃ¼r Bodenreinigung"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Ablauf unserer Bodenreinigung â€“ Schritt fÃ¼r Schritt */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Ablauf unserer Bodenreinigung â€“ Schritt fÃ¼r Schritt</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Der Ablauf einer professionellen Bodenreinigung ist strukturiert und grÃ¼ndlich. ZunÃ¤chst erfolgt eine Besichtigung der BÃ¶den, um den Belagstyp zu bestimmen, den Zustand zu beurteilen und eine genaue Offerte zu erstellen. Nach der AuftragsbestÃ¤tigung wird ein Termin vereinbart, der zu Ihren BedÃ¼rfnissen passt. Am Reinigungstag erscheint das professionelle Reinigungsteam pÃ¼nktlich mit allen notwendigen GerÃ¤ten, speziellen Reinigungsmitteln und AusrÃ¼stung fÃ¼r Ihren spezifischen Belagstyp. Die Reinigung erfolgt systematisch: Vorreinigung zur Entfernung von grobem Schmutz, Hauptreinigung mit speziellen Methoden fÃ¼r Ihren Belagstyp, Behandlung von Flecken und problematischen Stellen, und abschliessende Pflege. Nach Abschluss der Reinigung erfolgt eine QualitÃ¤tskontrolle, und Sie erhalten saubere, gepflegte BÃ¶den.
                  </p>

                  {/* Ablauf Steps */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 p-6 md:p-8">
                    <ul className="list-disc list-inside space-y-3 text-body">
                      <li><strong>Besichtigung und Offerte:</strong> Wir besichtigen Ihre BÃ¶den, bestimmen den Belagstyp, beurteilen den Zustand und erstellen eine genaue Offerte.</li>
                      <li><strong>Terminvereinbarung:</strong> Nach der AuftragsbestÃ¤tigung vereinbaren wir einen Termin, der zu Ihren BedÃ¼rfnissen passt.</li>
                      <li><strong>Professionelle Bodenreinigung:</strong> Unser professionelles Team reinigt Ihre BÃ¶den grÃ¼ndlich mit speziellen Methoden und GerÃ¤ten fÃ¼r Ihren Belagstyp.</li>
                      <li><strong>QualitÃ¤tskontrolle:</strong> Nach Abschluss der Reinigung erfolgt eine QualitÃ¤tskontrolle fÃ¼r perfekte Ergebnisse.</li>
                    </ul>
                  </div>

                  {/* H2: Was kostet eine professionelle Bodenreinigung? */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Was kostet eine professionelle Bodenreinigung?</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Die Kosten fÃ¼r Bodenreinigung hÃ¤ngen von der Art des Belags, der GrÃ¶sse der FlÃ¤che und der Art der Reinigung ab. Teppichreinigung kostet etwa 8-15 CHF pro mÂ², Parkettreinigung etwa 10-20 CHF pro mÂ². Fliesenreinigung kostet etwa 5-12 CHF pro mÂ², abhÃ¤ngig vom Zustand und der Fugenreinigung. Laminat- und Vinylreinigung kostet etwa 6-12 CHF pro mÂ². Die genauen Kosten hÃ¤ngen vom Belagstyp, dem Zustand, dem Umfang der Reinigung und zusÃ¤tzlichen Leistungen wie Fugenreinigung oder Parkettpflege ab. Durch den Vergleich mehrerer Offerten Ã¼ber unsere Plattform kÃ¶nnen Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen erhalten. Alle Offerten sind kostenlos und unverbindlich.
                  </p>

                  {/* H2: Wie oft sollte eine Bodenreinigung durchgefÃ¼hrt werden? */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Wie oft sollte eine Bodenreinigung durchgefÃ¼hrt werden?</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Die optimale Reinigungsfrequenz hÃ¤ngt vom Belagstyp und der Nutzung ab. Teppiche sollten etwa alle 6-12 Monate professionell gereinigt werden, abhÃ¤ngig von der Nutzung und dem Verschmutzungsgrad. Parkett benÃ¶tigt regelmÃ¤ssige, schonende Reinigung, etwa alle 3-6 Monate, abhÃ¤ngig von der Nutzung. Fliesen kÃ¶nnen hÃ¤ufiger gereinigt werden, etwa alle 2-4 Monate, besonders wenn Fugenreinigung erforderlich ist. Laminat und Vinyl benÃ¶tigen regelmÃ¤ssige Reinigung, etwa alle 3-6 Monate. Professionelle Reinigungsfirmen beraten Sie gerne bei der optimalen Frequenz fÃ¼r Ihre spezifischen BÃ¶den und berÃ¼cksichtigen dabei Faktoren wie Nutzung, Verschmutzungsgrad und Belagstyp.
                  </p>

                  {/* H2: Warum wir der richtige Partner fÃ¼r Ihre Bodenreinigung sind */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Warum wir der richtige Partner fÃ¼r Ihre BÃ¶den sind</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Wir sind der vertrauenswÃ¼rdige Partner fÃ¼r Ihre BÃ¶den. Unser Netzwerk umfasst nur geprÃ¼fte, versicherte Reinigungsfirmen, die hÃ¶chste QualitÃ¤tsstandards erfÃ¼llen und Erfahrung mit verschiedenen BodenbelÃ¤gen haben. Alle Partnerfirmen verwenden moderne, umweltfreundliche Reinigungsmittel und haben die richtige AusrÃ¼stung fÃ¼r verschiedene Belagstypen, wie Dampfreiniger, Teppichreinigungsmaschinen und spezielle Reinigungsmittel. Sie kennen die richtigen Methoden fÃ¼r jeden Belagstyp und kÃ¶nnen empfindliche BÃ¶den wie Parkett oder Laminat schonend reinigen. Wir haben bereits Ã¼ber 500 zufriedene Kunden geholfen, die richtige Reinigungsfirma fÃ¼r BÃ¶den zu finden. Unser Service ist komplett kostenlos und unverbindlich â€“ Sie zahlen nur fÃ¼r die Reinigung selbst, nicht fÃ¼r unsere Vermittlung. Zudem kÃ¶nnen Sie durch den Vergleich mehrerer Offerten bis zu 40% sparen.
                  </p>

                  {/* CTA Banner Section */}
                  <div className="mt-6 md:mt-8 mb-6 md:mb-8">
                    <div className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-700 rounded-xl p-6 md:p-8 lg:p-10 shadow-xl">
                      {/* Header with icons */}
                      <div className="flex items-center justify-center mb-4 md:mb-6">
                        <div className="w-3 h-3 bg-blue-300 rounded-sm rotate-45 mr-2"></div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center leading-tight">
                          Bodenreinigung â€“ Kostenlose Offerten anfordern und bis zu 40% sparen
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
                          <span className="text-white text-base md:text-lg font-medium">GeprÃ¼fte Partner fÃ¼r alle BodenbelÃ¤ge</span>
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
                    <h2 className="heading-2 mb-6">HÃ¤ufig gestellte Fragen zur Reinigung</h2>
                    <p className="text-body mb-6 md:mb-8">
                      HÃ¤ufig gestellte Fragen zur professionellen Reinigung der BÃ¶den: Was kostet eine Bodenreinigung? Wie oft sollte ich meine BÃ¶den professionell reinigen lassen? Welche BodenbelÃ¤ge kÃ¶nnen gereinigt werden? Wie lange dauert eine Bodenreinigung? Kann ich nach der Reinigung sofort wieder betreten? Welche Reinigungsmethoden werden verwendet? Werden umweltfreundliche Reinigungsmittel verwendet? Diese und weitere Fragen beantworten wir Ihnen gerne. Ãœber unsere Plattform kÃ¶nnen Sie Reinigungsofferten online vergleichen und dabei bis zu 40% sparen.
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
                        <p className="text-sm md:text-base text-gray-600">Professionelle Wohnungsreinigung mit Abnahmegarantie fÃ¼r eine sorgenfreie WohnungsÃ¼bergabe.</p>
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
                        <p className="text-sm md:text-base text-gray-600">GrÃ¼ndliche Grundreinigung vom Profi fÃ¼r ein tiefenreines Zuhause.</p>
                      </Link>
                    </div>
                  </div>

                  {/* CTA 3 - Final */}
                  <div className="mt-8 md:mt-12 p-4 md:p-6 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="heading-3 mb-4">
                      {city && !locationLoading 
                        ? `Professionelle Reinigung der BÃ¶den in ${city}`
                        : 'Jetzt unverbindliche Reinigungs-Offerte anfordern'
                      }
                    </h3>
                    <p className="text-body mb-3 md:mb-4">
                      Reinigungsofferten online vergleichen und bis zu 40% sparen. Alle Offerten beinhalten professionelle Bodenreinigung mit speziellen Methoden fÃ¼r Ihren Belagstyp. Ohne Aufpreis, ohne Verpflichtung. Starten Sie jetzt Ihre kostenlose Anfrage und finden Sie die perfekte Reinigungsfirma fÃ¼r Ihre BedÃ¼rfnisse.
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
