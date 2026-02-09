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
  const metaTitle = "BÃ¼roreinigung â€“ Kostenlose Offerten vergleichen";
  const metaDescription = "Professionelle BÃ¼roreinigung. Erhalten Sie kostenlose Offerten von geprÃ¼ften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie BÃ¼roreinigung garantiert.";
  // Meta keywords removed - Google no longer uses this tag (since 2009)
  const canonicalUrl = '/reinigung/bueroreinigung';

  // FAQ Data
  const faqItems = [
    {
      q: "Was kostet eine professionelle BÃ¼roreinigung?",
      a: "Die Kosten fÃ¼r BÃ¼roreinigung hÃ¤ngen von der GrÃ¶sse des BÃ¼ros, der Anzahl der RÃ¤ume, der Reinigungsfrequenz und dem Umfang der Reinigung ab. Preise liegen typischerweise zwischen 30 und 65 CHF pro Stunde. Ein durchschnittliches BÃ¼ro kostet etwa 60-260 CHF pro Reinigung. RegelmÃ¤ssige Reinigungen sind oft gÃ¼nstiger als einmalige Reinigungen. Durch den Vergleich mehrerer Offerten kÃ¶nnen Sie bis zu 40% sparen."
    },
    {
      q: "Wann wird eine Abnahmegarantie bei der BÃ¼roreinigung angeboten?",
      a: "Eine Abnahmegarantie wird in der Regel nur bei Umzugsreinigungen oder Endreinigungen angeboten, nicht bei normaler tÃ¤glicher oder wÃ¶chentlicher BÃ¼roreinigung. Bei diesen speziellen Reinigungen garantiert die Reinigungsfirma, dass alle Bereiche Ihres BÃ¼ros grÃ¼ndlich und professionell gereinigt werden. Sollten Sie oder Ihre Mitarbeiter MÃ¤ngel feststellen, wird die Reinigungsfirma kostenlos nachbessern, bis alles den Anforderungen entspricht."
    },
    {
      q: "Was beinhaltet eine umfassende BÃ¼roreinigung?",
      a: "Eine umfassende BÃ¼roreinigung beinhaltet: grÃ¼ndliche Reinigung aller BÃ¼rorÃ¤ume, Reinigung der BÃ¶den inklusive Ecken und Kanten, Reinigung der KÃ¼chen inklusive Herd, Mikrowelle und KÃ¼hlschrank, grÃ¼ndliche Reinigung aller SanitÃ¤ranlagen, Reinigung der Fenster innen, Reinigung von Besprechungszimmern und Empfangsbereichen, sowie Desinfektion hÃ¤ufig berÃ¼hrter OberflÃ¤chen wie TÃ¼rgriffe, Lichtschalter und Tastaturen. ZusÃ¤tzlich werden Abfalleimer geleert und ersetzt, und alle OberflÃ¤chen werden grÃ¼ndlich gereinigt."
    },
    {
      q: "Wie oft sollte eine BÃ¼roreinigung durchgefÃ¼hrt werden?",
      a: "Die optimale Reinigungsfrequenz hÃ¤ngt von der GrÃ¶sse des BÃ¼ros, der Anzahl der Mitarbeiter und der Art der TÃ¤tigkeit ab. Die meisten BÃ¼ros werden tÃ¤glich, wÃ¶chentlich oder mehrmals pro Woche gereinigt. TÃ¤gliche Reinigung ist ideal fÃ¼r grÃ¶ssere BÃ¼ros mit vielen Mitarbeitern, wÃ¤hrend kleinere BÃ¼ros oft mit wÃ¶chentlicher oder zweiwÃ¶chentlicher Reinigung auskommen. Professionelle Reinigungsfirmen beraten Sie gerne bei der optimalen Frequenz fÃ¼r Ihre BÃ¼rorÃ¤ume."
    },
    {
      q: "Kann die Reinigung ausserhalb der GeschÃ¤ftszeiten erfolgen?",
      a: "Ja, die meisten BÃ¼roreinigungsfirmen bieten flexible Reinigungszeiten an, einschliesslich Reinigung ausserhalb der GeschÃ¤ftszeiten. Dies minimiert StÃ¶rungen im Arbeitsablauf und ermÃ¶glicht eine grÃ¼ndlichere Reinigung. Viele Reinigungen finden abends oder am Wochenende statt, sodass der Betriebsablauf nicht beeintrÃ¤chtigt wird. Dies ist besonders vorteilhaft fÃ¼r Unternehmen, die wÃ¤hrend der GeschÃ¤ftszeiten nicht gestÃ¶rt werden mÃ¶chten."
    },
    {
      q: "Sind die ReinigungskrÃ¤fte versichert?",
      a: "Ja, seriÃ¶se BÃ¼roreinigungsfirmen haben eine Betriebshaftpflichtversicherung und ihre Mitarbeiter sind versichert. Dies schÃ¼tzt Sie vor Haftung bei UnfÃ¤llen oder SchÃ¤den wÃ¤hrend der Reinigung. Alle Reinigungsfirmen in unserem Netzwerk sind geprÃ¼ft und versichert, sodass Sie sicher sein kÃ¶nnen, dass Sie professionell und zuverlÃ¤ssig bedient werden."
    },
    {
      q: "Werden umweltfreundliche Reinigungsmittel verwendet?",
      a: "Ja, moderne BÃ¼roreinigungsfirmen setzen zunehmend auf umweltfreundliche und gesundheitsschonende Reinigungsmittel. Diese sind nicht nur besser fÃ¼r die Umwelt, sondern auch fÃ¼r die Gesundheit Ihrer Mitarbeiter. Biologische Reinigungsmittel sind besonders fÃ¼r BÃ¼ros mit vielen Mitarbeitern empfehlenswert, da sie keine schÃ¤dlichen DÃ¤mpfe oder RÃ¼ckstÃ¤nde hinterlassen. Unsere Partnerfirmen verwenden ausschliesslich zertifizierte, umweltfreundliche Reinigungsmittel."
    }
  ];


  // Single JSON-LD Service schema
  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Professionelle BÃ¼roreinigung",
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
      "name": "Kostenlose Offerte fÃ¼r BÃ¼roreinigung"
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
                    Professionelle BÃ¼roreinigung
                  </h1>
                </div>
                
                <p
                  className="text-base sm:text-body mb-8 leading-relaxed"
                >
                  GrÃ¼ndliche BÃ¼roreinigung fÃ¼r ein sauberes und produktives Arbeitsumfeld. BÃ¼roreinigungsofferten online vergleichen und bis zu 40% sparen.
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
                  {/* H2: Warum eine professionelle BÃ¼roreinigung sinnvoll ist */}
                  <h2 className="heading-2 mb-6 break-words">Warum eine professionelle BÃ¼roreinigung sinnvoll ist</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Eine professionelle GeschÃ¤ftsreinigung bietet zahlreiche Vorteile, die Ã¼ber die reine Sauberkeit hinausgehen. Sie spart wertvolle Zeit, die Ihre Mitarbeiter fÃ¼r ihre Kernaufgaben nutzen kÃ¶nnen, anstatt sich um Reinigungsarbeiten zu kÃ¼mmern. Professionelle ReinigungskrÃ¤fte verfÃ¼gen Ã¼ber das Fachwissen und die richtigen GerÃ¤te, um auch schwer zugÃ¤ngliche Stellen wie unter Schreibtischen, in ServerrÃ¤umen oder in hohen Deckenbereichen grÃ¼ndlich zu reinigen. Zudem trÃ¤gt eine regelmÃ¤ssige professionelle Reinigung erheblich zur Gesundheit der Mitarbeiter bei, indem sie Allergene, Bakterien und Viren effektiv entfernt. Studien zeigen, dass ein sauberes Arbeitsumfeld die ProduktivitÃ¤t steigert, Krankheitstage reduziert und das allgemeine Wohlbefinden der Mitarbeiter verbessert. Besonders in BÃ¼ros mit vielen Mitarbeitern ist eine professionelle Reinigung unerlÃ¤sslich, um sicherzustellen, dass alle Bereiche optimal gereinigt werden und ein gesundes Arbeitsklima gewÃ¤hrleistet ist.
                  </p>
                  
                  {/* H2: Unsere Leistungen im Bereich BÃ¼roreinigung */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Unsere Leistungen im Bereich Reinigung</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Unser Netzwerk geprÃ¼fter Reinigungsfirmen bietet ein umfassendes Leistungsspektrum fÃ¼r die professionelle Reinigung. Dazu gehÃ¶ren die grÃ¼ndliche Reinigung aller BÃ¼rorÃ¤ume, inklusive EinzelbÃ¼ros, GrossraumbÃ¼ros, Besprechungszimmer, Empfangsbereiche, KÃ¼chen, SanitÃ¤ranlagen, Flure und PausenrÃ¤ume. Wir bieten auch spezialisierte Dienstleistungen wie Fensterreinigung, Bodenreinigung, Teppichreinigung, Fassadenreinigung und Baureinigung an. Alle unsere Partnerfirmen arbeiten mit modernsten Reinigungstechniken und umweltfreundlichen Reinigungsmitteln, die speziell fÃ¼r BÃ¼roumgebungen entwickelt wurden. FÃ¼r Umzugsreinigungen oder Endreinigungen bieten unsere Partnerfirmen auch eine Abnahmegarantie an, sodass Sie sicher sein kÃ¶nnen, dass Ihr BÃ¼ro den hÃ¶chsten QualitÃ¤tsstandards entspricht und Ihre Mitarbeiter in einem optimalen Arbeitsumfeld tÃ¤tig sein kÃ¶nnen.
                  </p>

                  {/* Leistungen Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/bueroreinigungsdienstleistungen_reines_buero.png"
                      alt="BÃ¼roreinigungsdienstleistungen - Professionelle Reinigung aller BÃ¼rorÃ¤ume"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Bullet Points - Leistungen */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>GrÃ¼ndliche Reinigung aller BÃ¼rorÃ¤ume</li>
                    <li>Reinigung von Besprechungszimmern und Empfangsbereichen</li>
                    <li>KÃ¼chen- und SanitÃ¤rreinigung</li>
                    <li>Fenster- und OberflÃ¤chenreinigung</li>
                    <li>Bodenreinigung inklusive Ecken und Kanten</li>
                    <li>Desinfektion hÃ¤ufig berÃ¼hrter OberflÃ¤chen</li>
                    <li>Leeren und Ersetzen von Abfalleimern</li>
                    <li>Schonende Reinigung von IT-GerÃ¤ten</li>
                  </ul>

                  {/* CTA 1 - After Leistungen */}
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-green-50 rounded-lg border border-green-200 mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                      {city && !locationLoading 
                        ? `Professionelle BÃ¼roreinigung in ${city}`
                        : 'Professionelle BÃ¼roreinigung buchen'
                      }
                    </h3>
                    <p className="text-body mb-3 md:mb-4">
                      BÃ¼roreinigungsofferten online vergleichen und bis zu 40% sparen.
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

                  {/* H2: Vorteile unserer professionellen BÃ¼roreinigung */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Vorteile unserer professionellen BÃ¼roreinigung</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Eine professionelle Reinigung bietet zahlreiche Vorteile fÃ¼r Ihr Unternehmen. Professionelle ReinigungskrÃ¤fte garantieren, dass alle Bereiche Ihres BÃ¼ros grÃ¼ndlich und professionell gereinigt werden. Sollten Sie oder Ihre Mitarbeiter MÃ¤ngel feststellen, wird die Reinigungsfirma diese umgehend beheben. Bei Umzugsreinigungen oder Endreinigungen bieten unsere Partnerfirmen auch eine Abnahmegarantie an. Dies gibt Ihnen maximale Sicherheit und spart Zeit und Nerven. ZusÃ¤tzlich profitieren Sie von unserer Ã¼ber 12-jÃ¤hrigen Erfahrung im Bereich Reinigungsdienstleistungen und von unserem Netzwerk geprÃ¼fter, versicherter Reinigungsfirmen, die speziell auf GeschÃ¤ftsrÃ¤ume und BÃ¼roumgebungen spezialisiert sind. Unsere Partnerfirmen verstehen die besonderen Anforderungen von BÃ¼ros, wie den Schutz vertraulicher Dokumente, die schonende Reinigung von IT-GerÃ¤ten und die flexible Terminplanung ausserhalb der GeschÃ¤ftszeiten.
                  </p>

                  {/* Abnahmegarantie Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/reinigungsmittel_auf_tisch.webp"
                      alt="BÃ¼roreinigung mit Abnahmegarantie - Vorher und Nachher Vergleich"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Bullet Points - Vorteile */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>QualitÃ¤tsgarantie fÃ¼r sorgenfreie Reinigung</li>
                    <li>Nur geprÃ¼fte, versicherte Reinigungsfirmen</li>
                    <li>Umweltfreundliche Reinigungsmittel</li>
                    <li>Flexible Terminplanung ausserhalb der GeschÃ¤ftszeiten</li>
                    <li>Spezialisiert auf GeschÃ¤ftsrÃ¤ume und BÃ¼roumgebungen</li>
                    <li>Schutz vertraulicher Dokumente</li>
                    <li>Bis zu 40% Kostenersparnis durch Vergleich</li>
                  </ul>

                  {/* H2: Was bei einer grÃ¼ndlichen BÃ¼roreinigung gereinigt wird */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Was bei einer grÃ¼ndlichen BÃ¼roreinigung gereinigt wird</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Eine umfassende Reinigung beinhaltet die Reinigung aller BÃ¼rorÃ¤ume und Bereiche. Dazu gehÃ¶ren das Staubwischen aller OberflÃ¤chen, inklusive Schreibtische, Regale, SchrÃ¤nke, FensterbÃ¤nke, HeizkÃ¶rper, Lichtschalter und Steckdosen. Die BÃ¶den werden grÃ¼ndlich gesaugt und gewischt, inklusive Ecken und Kanten sowie unter MÃ¶beln. In den KÃ¼chen werden Herd, Mikrowelle, KÃ¼hlschrank, SpÃ¼le und ArbeitsflÃ¤chen gereinigt. Alle SanitÃ¤ranlagen werden komplett gereinigt, inklusive Toiletten, Waschbecken, Spiegel und Fliesen. Fenster werden innen gereinigt, und alle hÃ¤ufig berÃ¼hrten OberflÃ¤chen wie TÃ¼rgriffe, Lichtschalter, Tastaturen und Telefone werden desinfiziert. Abfalleimer werden geleert und ersetzt, und eine professionelle Reinigung geht weit Ã¼ber das normale Putzen hinaus, um ein hygienisch sauberes Arbeitsumfeld zu gewÃ¤hrleisten.
                  </p>

                  {/* H2: BÃ¼roreinigung fÃ¼r moderne ArbeitsplÃ¤tze */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">BÃ¼roreinigung fÃ¼r moderne ArbeitsplÃ¤tze</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Moderne ArbeitsplÃ¤tze haben besondere Anforderungen bei der Reinigung. Open-Space-BÃ¼ros, Co-Working-Spaces und flexible Arbeitsbereiche erfordern spezielle Reinigungsmethoden und -techniken. Professionelle BÃ¼roreinigungsfirmen kennen die Herausforderungen moderner BÃ¼roumgebungen und haben entsprechende Protokolle entwickelt. Sie verwenden leise ReinigungsgerÃ¤te, um den Arbeitsablauf nicht zu stÃ¶ren, und achten besonders auf die Reinigung von Bereichen, die von vielen Mitarbeitern genutzt werden. Zudem berÃ¼cksichtigen sie die besonderen Anforderungen von IT-GerÃ¤ten, die schonend gereinigt werden mÃ¼ssen, ohne die empfindliche Technik zu beschÃ¤digen. Eine regelmÃ¤ssige professionelle Reinigung ist besonders wichtig fÃ¼r moderne ArbeitsplÃ¤tze, um ein produktives und gesundes Arbeitsumfeld zu gewÃ¤hrleisten und die Zufriedenheit der Mitarbeiter zu steigern.
                  </p>

                  {/* Moderne ArbeitsplÃ¤tze Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/bueroreinigung_open_space_coworking.png"
                      alt="BÃ¼roreinigung fÃ¼r moderne ArbeitsplÃ¤tze - Open-Space und Co-Working"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Hygiene und Gesundheit im BÃ¼ro */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Hygiene und Gesundheit im BÃ¼ro</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Besonders in BÃ¼ros mit vielen Mitarbeitern ist Hygiene von entscheidender Bedeutung. RegelmÃ¤ssige Desinfektion von hÃ¤ufig berÃ¼hrten OberflÃ¤chen reduziert die Verbreitung von Keimen und Viren erheblich. Professionelle BÃ¼roreinigungsfirmen verwenden geeignete Desinfektionsmittel und kennen die kritischen Bereiche, die besondere Aufmerksamkeit benÃ¶tigen, wie TÃ¼rgriffe, Lichtschalter, Tastaturen, MÃ¤use, Telefone und Armaturen in SanitÃ¤ranlagen. Dies ist besonders wichtig in Zeiten erhÃ¶hter Gesundheitsrisiken, um die Gesundheit der Mitarbeiter zu schÃ¼tzen und KrankheitsausfÃ¤lle zu minimieren. Eine professionelle BÃ¼roreinigung trÃ¤gt massgeblich dazu bei, ein gesundes Arbeitsumfeld zu schaffen, in dem sich Mitarbeiter wohlfÃ¼hlen und produktiv arbeiten kÃ¶nnen.
                  </p>

                  {/* H2: Moderne und umweltfreundliche Reinigungsmittel */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Moderne und umweltfreundliche Reinigungsmittel</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Moderne BÃ¼roreinigungsfirmen setzen zunehmend auf umweltfreundliche und gesundheitsschonende Reinigungsmittel. Diese sind nicht nur besser fÃ¼r die Umwelt, sondern auch fÃ¼r die Gesundheit Ihrer Mitarbeiter. Biologische Reinigungsmittel sind besonders fÃ¼r BÃ¼ros mit vielen Mitarbeitern empfehlenswert, da sie keine schÃ¤dlichen DÃ¤mpfe oder RÃ¼ckstÃ¤nde hinterlassen. Sie sind effektiv gegen Schmutz und Bakterien, schonen aber gleichzeitig die Umwelt und die Gesundheit. Unsere Partnerfirmen verwenden ausschliesslich zertifizierte, umweltfreundliche Reinigungsmittel und achten darauf, dass keine schÃ¤dlichen Chemikalien in Ihrem BÃ¼ro zurÃ¼ckbleiben. Dies passt perfekt zu Corporate Social Responsibility-Initiativen und schont gleichzeitig die Gesundheit Ihrer Mitarbeiter.
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

                  {/* H2: Ablauf unserer BÃ¼roreinigung â€“ Schritt fÃ¼r Schritt */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Ablauf unserer BÃ¼roreinigung â€“ Schritt fÃ¼r Schritt</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Der Ablauf einer professionellen BÃ¼roreinigung ist strukturiert und effizient. ZunÃ¤chst erfolgt eine Besichtigung der BÃ¼rorÃ¤ume, um den Umfang der Reinigung zu bestimmen, besondere Anforderungen zu identifizieren und eine genaue Offerte zu erstellen. Nach der AuftragsbestÃ¤tigung wird ein Reinigungsplan erstellt, der zu Ihren GeschÃ¤ftszeiten passt. Viele Reinigungen finden ausserhalb der GeschÃ¤ftszeiten statt, beispielsweise abends oder am Wochenende, um den Betriebsablauf nicht zu stÃ¶ren. Am Reinigungstag erscheint das professionelle Reinigungsteam pÃ¼nktlich mit allen notwendigen GerÃ¤ten und Reinigungsmitteln. Die Reinigung erfolgt systematisch Raum fÃ¼r Raum, beginnend mit den am stÃ¤rksten verschmutzten Bereichen. Nach Abschluss der Reinigung erfolgt eine QualitÃ¤tskontrolle. Bei Umzugsreinigungen oder Endreinigungen erhalten Sie eine Abnahmegarantie. Sollten Sie mit dem Ergebnis nicht zufrieden sein, wird kostenlos nachgebessert.
                  </p>

                  {/* Ablauf Image/Icon */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
                      {[
                        { icon: Home, text: "Kostenlose Offerte anfordern" },
                        { icon: Clock, text: "Besichtigung der BÃ¼rorÃ¤ume und Offerte erhalten" },
                        { icon: Calendar, text: "Termin vereinbaren (flexibel, auch ausserhalb GeschÃ¤ftszeiten)" },
                        { icon: Sparkles, text: "Professionelle Reinigung durchfÃ¼hren" },
                        { icon: CheckCircle, text: "QualitÃ¤tskontrolle und Abnahme" }
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

                  {/* H2: Was kostet eine professionelle BÃ¼roreinigung? */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Was kostet eine professionelle BÃ¼roreinigung?</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Die Kosten fÃ¼r BÃ¼roreinigung variieren je nach GrÃ¶sse des BÃ¼ros, Anzahl der RÃ¤ume, Reinigungsfrequenz, Umfang der Reinigung und Region. In der Regel werden Preise zwischen 30 und 65 CHF pro Stunde berechnet. Ein durchschnittliches BÃ¼ro benÃ¶tigt etwa 2-4 Stunden pro Reinigung, was Kosten von 60-260 CHF bedeutet. GrÃ¶ssere BÃ¼ros mit vielen RÃ¤umen, mehreren Etagen oder speziellen Anforderungen kÃ¶nnen hÃ¶here Kosten verursachen. RegelmÃ¤ssige Reinigungen sind oft gÃ¼nstiger als einmalige Reinigungen, da die Reinigungsfirma die RÃ¤ume kennt und effizienter arbeiten kann. Durch den Vergleich mehrerer Offerten Ã¼ber unsere Plattform kÃ¶nnen Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen erhalten. Alle Offerten sind kostenlos und unverbindlich.
                  </p>

                  {/* H2: RegelmÃ¤ssige vs. einmalige BÃ¼roreinigung */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">RegelmÃ¤ssige vs. einmalige BÃ¼roreinigung</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Viele Unternehmen entscheiden sich fÃ¼r eine regelmÃ¤ssige BÃ¼roreinigung, beispielsweise tÃ¤glich, wÃ¶chentlich oder mehrmals pro Woche. Dies sorgt fÃ¼r kontinuierliche Sauberkeit und reduziert den Aufwand fÃ¼r einzelne Reinigungen. RegelmÃ¤ssige Reinigung ist besonders wichtig fÃ¼r grÃ¶ssere BÃ¼ros mit vielen Mitarbeitern, um die Sauberkeit aufrechtzuerhalten und ein gesundes Arbeitsumfeld zu gewÃ¤hrleisten. Andere nutzen professionelle Reinigung fÃ¼r einmalige, besonders grÃ¼ndliche Reinigungen, beispielsweise nach Renovierungen, beim Umzug in neue BÃ¼rorÃ¤ume, fÃ¼r eine umfassende Grundreinigung oder vor besonderen AnlÃ¤ssen. Beide Optionen sind mÃ¶glich und kÃ¶nnen auch kombiniert werden, beispielsweise regelmÃ¤ssige Unterhaltsreinigung mit periodischen Grundreinigungen fÃ¼r eine besonders grÃ¼ndliche Reinigung.
                  </p>

                  {/* H2: Warum wir der richtige Partner fÃ¼r Ihre BÃ¼roreinigung sind */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Warum wir der richtige Partner fÃ¼r Ihre Reinigung sind</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Wir sind der vertrauenswÃ¼rdige Partner fÃ¼r Ihre GeschÃ¤ftsreinigung. Unser Netzwerk umfasst nur geprÃ¼fte, versicherte Reinigungsfirmen, die hÃ¶chste QualitÃ¤tsstandards erfÃ¼llen und speziell auf GeschÃ¤ftsrÃ¤ume und BÃ¼roumgebungen spezialisiert sind. Unsere Partnerfirmen verwenden moderne, umweltfreundliche Reinigungsmittel und verstehen die besonderen Anforderungen von BÃ¼ros, wie den Schutz vertraulicher Dokumente, die schonende Reinigung von IT-GerÃ¤ten und die flexible Terminplanung. FÃ¼r Umzugsreinigungen oder Endreinigungen bieten unsere Partnerfirmen auch eine Abnahmegarantie an. Wir haben bereits Ã¼ber 500 zufriedene Kunden geholfen, die richtige Reinigungsfirma zu finden. Unser Service ist komplett kostenlos und unverbindlich â€“ Sie zahlen nur fÃ¼r die Reinigung selbst, nicht fÃ¼r unsere Vermittlung. Zudem kÃ¶nnen Sie durch den Vergleich mehrerer Offerten bis zu 40% sparen.
                  </p>

                  {/* CTA Banner Section */}
                  <div className="mt-6 md:mt-8 mb-6 md:mb-8">
                    <div className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-700 rounded-xl p-6 md:p-8 lg:p-10 shadow-xl">
                      {/* Header with icons */}
                      <div className="flex items-center justify-center mb-4 md:mb-6">
                        <div className="w-3 h-3 bg-blue-300 rounded-sm rotate-45 mr-2"></div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center leading-tight">
                          BÃ¼roreinigung â€“ Kostenlose Offerten anfordern und bis zu 40% sparen
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
                          <span className="text-white text-base md:text-lg font-medium">GeprÃ¼fte Partner fÃ¼r BÃ¼ros und GeschÃ¤ftsrÃ¤ume</span>
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


                  {/* H2: HÃ¤ufig gestellte Fragen zur BÃ¼roreinigung */}
                  <div className="mt-8 md:mt-12">
                    <h2 className="heading-2 mb-6">HÃ¤ufig gestellte Fragen zur Reinigung</h2>
                    <p className="text-body mb-6 md:mb-8">
                      HÃ¤ufig gestellte Fragen zur professionellen Reinigung: Was kostet eine professionelle Reinigung? Was beinhaltet eine umfassende Reinigung? Wie oft sollte eine Reinigung durchgefÃ¼hrt werden? Wann wird eine Abnahmegarantie angeboten? Kann die Reinigung ausserhalb der GeschÃ¤ftszeiten erfolgen? Sind die ReinigungskrÃ¤fte versichert? Werden umweltfreundliche Reinigungsmittel verwendet? Diese und weitere Fragen beantworten wir Ihnen gerne. Ãœber unsere Plattform kÃ¶nnen Sie BÃ¼roreinigungsofferten online vergleichen und dabei bis zu 40% sparen.
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
                      BÃ¼roreinigungsofferten online vergleichen und bis zu 40% sparen. Ohne Aufpreis, ohne Verpflichtung. Starten Sie jetzt Ihre kostenlose Anfrage und finden Sie die perfekte Reinigungsfirma fÃ¼r Ihr BÃ¼ro.
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
                        <p className="text-sm text-gray-600">Professionelle Umzugsreinigung mit Abnahmegarantie fÃ¼r eine sorgenfreie WohnungsÃ¼bergabe.</p>
                      </Link>
                      <Link href="/reinigung/fensterreinigung" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <h4 className="heading-4 mb-2">Fensterreinigung</h4>
                        <p className="text-sm text-gray-600">Streifenfreie Fensterreinigung innen und aussen von professionellen Reinigungsfirmen.</p>
                      </Link>
                      <Link href="/reinigung/baureinigung" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <h4 className="heading-4 mb-2">Baureinigung</h4>
                        <p className="text-sm text-gray-600">GrÃ¼ndliche Baureinigung nach Neubau oder Renovation fÃ¼r perfekte Resultate.</p>
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
                      Kostenlos und unverbindlich BÃ¼roreinigungsofferten online vergleichen.
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
