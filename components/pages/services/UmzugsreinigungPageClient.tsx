'use client'

import React, { useMemo } from 'react'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Sparkles, ShieldCheck, Clock, CheckCircle, Users, Award, Star, Home, Heart, Calendar } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import CleaningRatgeberSidebar from '@/components/CleaningRatgeberSidebar'
import { useUserLocation } from '@/hooks/useUserLocation'

const UmzugsreinigungPageClient = () => {
  const router = useRouter()
  const { city, loading: locationLoading } = useUserLocation()
  

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=reinigung&step=2')
  }

  // SEO Data
  const metaTitle = "Umzugsreinigung Preis – Kostenlose Offerten vergleichen"
  const metaDescription = "Umzugsreinigung Preis: Was kostet die professionelle Reinigung? Professionelle Umzugsreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Wohnungsübergabe garantiert."
  // Meta keywords removed - Google no longer uses this tag (since 2009)
  const canonicalUrl = "/reinigung/umzugsreinigung"

  // FAQ Data
  const faqItems = [
    {
      q: "Was kostet eine professionelle Umzugsreinigung?",
      a: "Die Kosten für Umzugsreinigung hängen von der Grösse der Wohnung, dem Zustand und dem Umfang der Reinigung ab. Eine durchschnittliche 3-Zimmer-Wohnung kostet etwa 400-900 CHF. Preise liegen typischerweise zwischen 25 und 50 CHF pro Stunde. Durch den Vergleich mehrerer Offerten können Sie bis zu 40% sparen."
    },
    {
      q: "Was beinhaltet eine umfassende Umzugsreinigung?",
      a: "Eine umfassende Umzugsreinigung beinhaltet die gründliche Reinigung aller Räume: Entfernung aller Rückstände, Staubwischen aller Oberflächen, Reinigung der Böden inklusive Ecken und Kanten, Reinigung der Küche inklusive Herd, Backofen und Kühlschrank, gründliche Reinigung des Badezimmers inklusive Sanitäranlagen, Reinigung der Fenster innen und aussen, sowie die Reinigung von Heizkörpern, Lichtschaltern und Steckdosen."
    },
    {
      q: "Was bedeutet Abnahmegarantie bei der Umzugsreinigung?",
      a: "Abnahmegarantie bedeutet, dass die Reinigungsfirma garantiert, dass die Wohnung den Anforderungen für die Übergabe entspricht. Sollte der Vermieter oder neue Eigentümer Mängel feststellen, wird die Reinigungsfirma kostenlos nachbessern, bis die Wohnung den Anforderungen entspricht. Dies gibt Ihnen Sicherheit und schützt vor unerwarteten Kosten."
    },
    {
      q: "Wann sollte die Umzugsreinigung stattfinden?",
      a: "Die Umzugsreinigung sollte idealerweise nach dem Auszug aller Möbel, aber vor der finalen Übergabe stattfinden. Dies ermöglicht eine gründliche Reinigung aller Bereiche. Professionelle Reinigungsfirmen können flexibel planen und die Reinigung zu einem Zeitpunkt durchführen, der zu Ihrem Umzugstermin passt."
    },
    {
      q: "Ist Umzugsreinigung gesetzlich vorgeschrieben?",
      a: "In der Schweiz ist der Mieter verpflichtet, die Wohnung bei Auszug in einem ordnungsgemässen Zustand zu übergeben. Dies beinhaltet in der Regel eine gründliche Reinigung. Die genauen Anforderungen können im Mietvertrag festgelegt sein. Professionelle Umzugsreinigung mit Abnahmegarantie stellt sicher, dass alle Anforderungen erfüllt werden."
    },
    {
      q: "Sind die Reinigungskräfte versichert?",
      a: "Ja, alle Reinigungsfirmen in unserem Netzwerk sind vollständig versichert. Dies umfasst Haftpflichtversicherung, Unfallversicherung und Versicherung für Schäden. Sie haben die Sicherheit, dass im Falle eines Schadens die Versicherung greift. Alle Partnerfirmen müssen ihre Versicherungsnachweise vorlegen, bevor sie in unser Netzwerk aufgenommen werden."
    },
    {
      q: "Kann ich die Reinigung flexibel planen?",
      a: "Ja, professionelle Reinigungsfirmen bieten flexible Terminplanung an. Sie können die Reinigung zu einem Zeitpunkt durchführen, der zu Ihrem Umzugstermin passt. Viele Firmen bieten auch Notfalltermine an, falls kurzfristig eine Reinigung benötigt wird. Frühzeitige Planung ist jedoch empfehlenswert, um den gewünschten Termin zu sichern, besonders während der Umzugssaison."
    }
  ]


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
      "name": "Kostenlose Offerte für Umzugsreinigung"
    }
  }), [metaTitle, metaDescription])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="bg-slate-50">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full py-8 md:py-12 lg:py-16 overflow-hidden"
        >
          {/* Background Image - Right Side */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://online-offerten.ch/reinigungsfirma/umzugsreinigung_team_saubere_wohnung.png')`,
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
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
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
                    Umzugsreinigung Preis – Kostenlose Offerten vergleichen
                  </h1>
                </motion.div>
                
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-base sm:text-body mb-8 leading-relaxed"
                >
                  Professionelle Umzugsreinigung mit 100% Abnahmegarantie für eine sorgenfreie Wohnungsübergabe. Vergleichen Sie kostenlos Offerten von geprüften Reinigungsfirmen.
                </motion.p>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
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
                </motion.div>

                {/* Additional Trust Elements */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
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
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Main Content */}
        <section className="py-8 md:py-12 lg:py-16 xl:py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {/* Main Article */}
              <div className="lg:col-span-2">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 mb-6 md:mb-8"
                >
                  {/* H2: Umzugsreinigung Preis */}
                  <h2 className="heading-2 mb-6 break-words">Umzugsreinigung Preis: Was kostet die professionelle Reinigung?</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Die Preise für Umzugsreinigung variieren je nach Wohnungsgrösse, Zustand der Wohnung und Umfang der Reinigung. Eine durchschnittliche 3-Zimmer-Wohnung kostet etwa 400-900 CHF. Die Preise liegen typischerweise zwischen 25 und 50 CHF pro Stunde. Grössere Wohnungen oder Häuser können entsprechend mehr kosten. Durch den Vergleich mehrerer Offerten von geprüften Reinigungsfirmen können Sie bis zu 40% sparen. Wichtig ist, dass Sie eine Reinigungsfirma mit Abnahmegarantie wählen, um sicherzustellen, dass die Wohnung den Anforderungen für die Übergabe entspricht.
                  </p>

                  {/* H2: Warum eine professionelle Umzugsreinigung sinnvoll ist */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Warum eine professionelle Umzugsreinigung sinnvoll ist</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Eine professionelle Endreinigung ist ein entscheidender Schritt beim Wohnungswechsel, der nicht unterschätzt werden sollte. Sie spart wertvolle Zeit während des stressigen Umzugsprozesses und reduziert den Stress erheblich, da Profis die Umzugsreinigung übernehmen und für einen reibungslosen Ablauf sorgen. Professionelle Reinigungskräfte verfügen über das Fachwissen und die richtigen Geräte, um auch schwer zugängliche Stellen gründlich zu reinigen. Zudem trägt eine gründliche Endreinigung dazu bei, dass keine Nachforderungen vom Vermieter entstehen. Besonders wichtig ist die Abnahmegarantie, die sicherstellt, dass die Wohnung den Anforderungen entspricht und bei Bedarf kostenlos nachgebessert wird.
                  </p>

                  {/* H2: Unsere Leistungen im Bereich Reinigung */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Unsere Leistungen im Bereich Reinigung</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Unser Netzwerk geprüfter Reinigungsfirmen bietet ein umfassendes Spektrum an Reinigungsleistungen für die professionelle Endreinigung. Dabei wird wirklich alles gereinigt – von Fenstern bis zu verschiedenen Bodenbelägen – sodass Sie ein sorgenfreies Komplettpaket ohne versteckte Kosten erhalten. Dazu gehören die gründliche Reinigung aller Räume, inklusive Küche, Badezimmer, Wohnzimmer und Schlafzimmer. Wir bieten auch spezialisierte Dienstleistungen wie Fensterreinigung innen und aussen, die Reinigung sämtlicher Bodenbeläge (z.B. Parkett, Laminat, Teppich) inklusive Ecken und Kanten, Reinigung von Heizkörpern, Lichtschaltern und Steckdosen, sowie die Entfernung von Klebebandresten und Möbelspuren. Alle unsere Partnerfirmen arbeiten mit modernsten Reinigungstechniken und umweltfreundlichen Reinigungsmitteln. Besonders wichtig: Alle Reinigungsfirmen in unserem Netzwerk bieten eine 100% Abnahmegarantie, sodass Sie sicher sein können, dass die Wohnung den Anforderungen entspricht.
                  </p>

                  {/* Leistungen Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/umzugsreinigungsdienstleistungen_professionell.png"
                      alt="Umzugsreinigungsdienstleistungen - Professionelle Reinigung aller Räume"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Bullet Points - Leistungen */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>Gründliche Reinigung aller Räume</li>
                    <li>Küchen- und Badezimmerreinigung</li>
                    <li>Fensterreinigung innen und aussen</li>
                    <li>Reinigung sämtlicher Bodenbeläge inklusive Ecken und Kanten</li>
                    <li>Reinigung von Heizkörpern, Lichtschaltern und Steckdosen</li>
                    <li>Entfernung von Klebebandresten und Möbelspuren</li>
                    <li>Spachteln und Streichen von Löchern in Wänden</li>
                    <li>Desinfektion von Oberflächen</li>
                    <li>Reinigung schwer zugänglicher Stellen</li>
                  </ul>

                  {/* CTA 1 - After Leistungen */}
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-green-50 rounded-lg border border-green-200 mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                      Professionelle Umzugsreinigung buchen
                    </h3>
                    <p className="text-body mb-3 md:mb-4">
                      Vergleichen Sie jetzt kostenlos Offerten von geprüften Reinigungsfirmen.
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

                  {/* H2: Vorteile unserer Umzugsreinigung mit Abnahmegarantie */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Vorteile unserer Umzugsreinigung mit Abnahmegarantie</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Die Abnahmegarantie ist ein entscheidender Vorteil bei der professionellen Endreinigung. Unsere Firma ist im Handelsregister eingetragen und offiziell angemeldet, was Ihnen zusätzliche Sicherheit und Vertrauen in unsere Zuverlässigkeit und Professionalität bietet. Sie bedeutet, dass die Reinigungsfirma garantiert, dass die Wohnung den Anforderungen für die Übergabe entspricht. Sollte der Vermieter oder neue Eigentümer Mängel feststellen, wird die Reinigungsfirma kostenlos nachbessern, bis die Wohnung den Anforderungen entspricht. Dies gibt Ihnen maximale Sicherheit und spart Zeit und Nerven. Zusätzlich profitieren Sie von unserer über 12-jährigen Erfahrung im Bereich Reinigungsdienstleistungen und von unserem Netzwerk geprüfter, versicherter Reinigungsfirmen. Eine professionelle Endreinigung mit Abnahmegarantie schützt Sie vor teuren Nachforderungen und gibt Ihnen die Gewissheit, dass die Wohnungsübergabe reibungslos verläuft.
                  </p>

                  {/* Vorteile Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/reinigungsmittel_auf_tisch.webp"
                      alt="Umzugsreinigung mit Abnahmegarantie - Vorher und Nachher Vergleich"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Bullet Points - Vorteile */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>100% Abnahmegarantie für sorgenfreie Übergabe</li>
                    <li>Nur geprüfte, versicherte Reinigungsfirmen</li>
                    <li>Umweltfreundliche Reinigungsmittel</li>
                    <li>Flexible Terminplanung</li>
                    <li>Bis zu 40% Kostenersparnis durch Vergleich</li>
                    <li>Schutz vor teuren Nachforderungen</li>
                  </ul>

                  {/* H2: Was bei einer gründlichen Umzugsreinigung gereinigt wird */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Was bei einer gründlichen Umzugsreinigung gereinigt wird</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Eine umfassende Endreinigung beinhaltet die Reinigung aller Räume und Bereiche. Dazu gehören das Staubwischen aller Oberflächen, inklusive Regale, Schränke, Fensterbänke und Heizkörper. Die Böden werden gründlich gesaugt und gewischt, inklusive Ecken und Kanten. In der Küche werden Herd, Backofen, Kühlschrank, Spüle und Arbeitsflächen gereinigt, wobei auch hartnäckige Verschmutzungen entfernt werden. Das Badezimmer wird komplett gereinigt, inklusive Toilette, Dusche, Badewanne, Waschbecken und Fliesen, wobei ebenfalls auf die Beseitigung von Verschmutzungen geachtet wird. Fenster werden innen und aussen gereinigt, und alle Oberflächen werden desinfiziert. Auch Außenbereiche wie Terrasse, Sitzplätze und Balkone werden bei der Umzugsreinigung berücksichtigt. Zusätzlich werden Klebebandreste entfernt, Löcher in Wänden gespachtelt und gestrichen, und alle Rückstände von Möbeln beseitigt. Eine professionelle Reinigung geht weit über das normale Putzen hinaus und sorgt für eine hygienisch saubere Wohnung, die den Anforderungen für die Übergabe entspricht.
                  </p>

                  {/* H2: Umzugsreinigung für verschiedene Wohnungstypen */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Umzugsreinigung für verschiedene Wohnungstypen</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Professionelle Endreinigung wird für alle Wohnungstypen sowie für Häuser und andere Immobilien angeboten, von kleinen Studios bis hin zu grossen Familienhäusern. Jeder Wohnungstyp und jede Immobilie hat ihre eigenen Besonderheiten: Studios erfordern eine kompakte, aber gründliche Reinigung, während grössere Wohnungen und Häuser mehr Zeit und Aufwand benötigen. Einfamilienhäuser können zusätzliche Bereiche wie Keller, Dachboden oder Garage umfassen. Professionelle Reinigungsfirmen passen ihre Methoden und den Umfang der Reinigung an die spezifischen Anforderungen jeder Immobilie an. Unsere Partner verfügen über umfangreiche Erfahrung in der Reinigung unterschiedlichster Objekte und haben bereits zahlreiche Immobilien erfolgreich für die Übergabe vorbereitet. Unabhängig von der Grösse der Wohnung, des Hauses oder der Immobilie, alle Reinigungsfirmen in unserem Netzwerk bieten eine 100% Abnahmegarantie, sodass Sie sicher sein können, dass das Objekt den Anforderungen entspricht.
                  </p>

                  {/* Wohnungstypen Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/umzugsreinigung_wohnungstypen_studio_2_3_4_zimmer.png"
                      alt="Umzugsreinigung für verschiedene Wohnungstypen - Studio, 2-Zimmer, 3-Zimmer, 4-Zimmer"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Rechtliche Aspekte und Mietvertrag */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Rechtliche Aspekte und Mietvertrag</h2>
                  <p className="text-body mb-6 break-words w-full">
                    In der Schweiz ist der Mieter gesetzlich verpflichtet, die Wohnung bei Auszug in einem ordnungsgemässen Zustand zu übergeben. Dies beinhaltet in der Regel eine gründliche Reinigung aller Räume. Besonders wichtig ist dabei die Abnahme der Wohnung durch den Vermieter oder die Hausverwaltung, bei der ein Abnahmeprotokoll erstellt wird, um die ordnungsgemässe Reinigung und den Zustand der Wohnung zu dokumentieren und Beanstandungen zu vermeiden. Die genauen Anforderungen können im Mietvertrag festgelegt sein und variieren je nach Vermieter. Professionelle Endreinigung mit Abnahmegarantie stellt sicher, dass alle rechtlichen Anforderungen erfüllt werden und keine Nachforderungen entstehen. Die Abnahmegarantie gibt Ihnen zusätzliche Sicherheit, da die Reinigungsfirma bei Bedarf kostenlos nachbessert. Dies schützt Sie vor teuren Nachforderungen und rechtlichen Auseinandersetzungen. Eine professionelle Reinigung mit Abnahmegarantie ist eine Investition, die sich lohnt.
                  </p>

                  {/* H2: Moderne und umweltfreundliche Reinigungsmittel */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Moderne und umweltfreundliche Reinigungsmittel</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Moderne Reinigungsfirmen setzen zunehmend auf umweltfreundliche und gesundheitsschonende Reinigungsmittel. Diese sind nicht nur besser für die Umwelt, sondern auch für Ihre Gesundheit und die Ihrer Familie. Biologische Reinigungsmittel sind besonders für Haushalte mit Kindern, Allergikern oder Haustieren empfehlenswert. Sie sind effektiv gegen Schmutz und Bakterien, schonen aber gleichzeitig die Umwelt und die Gesundheit. Unsere Partnerfirmen verwenden ausschliesslich zertifizierte, umweltfreundliche Reinigungsmittel und achten darauf, dass keine schädlichen Chemikalien in der Wohnung zurückbleiben. Dies ist besonders wichtig bei der Endreinigung, da die Wohnung für den nächsten Mieter oder Eigentümer bereit sein muss.
                  </p>

                  {/* Umweltfreundlich Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/umweltfreundliche_reinigungsmittel_modern.webp"
                      alt="Umweltfreundliche Reinigungsmittel für Umzugsreinigung - Biologische und gesundheitsschonende Produkte"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Qualitätssicherung und Sauberkeit */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Qualitätssicherung und Sauberkeit</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Bei unserer Umzugsreinigung mit Abnahmegarantie in Zürich steht die Qualitätssicherung an oberster Stelle. Unsere Reinigungsfirma setzt ausschliesslich auf erfahrene und geschulte Mitarbeiter, die mit modernster Ausrüstung und umweltfreundlichen Reinigungsmitteln arbeiten. So garantieren wir eine professionelle Endreinigung, die selbst höchste Ansprüche an Sauberkeit erfüllt. Jeder Bereich der Wohnung – von der Küche über das Bad bis hin zu allen Zimmern und dem Balkon – wird sorgfältig gereinigt und kontrolliert. Unsere Qualitätssicherung umfasst eine abschliessende Überprüfung aller Reinigungsarbeiten, damit Sie sicher sein können, dass Ihre Wohnung bei der Übergabe makellos ist. Die Abnahmegarantie gibt Ihnen dabei die Gewissheit, dass auch im Nachhinein kostenlos nachgebessert wird, falls der Vermieter Beanstandungen hat.
                  </p>

                  {/* H2: Ablauf unserer Umzugsreinigung – Schritt für Schritt */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Ablauf unserer Umzugsreinigung – Schritt für Schritt</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Der Ablauf einer professionellen Endreinigung ist strukturiert und effizient. Zunächst erfolgt eine Besichtigung der Wohnung, um den Umfang der Reinigung zu bestimmen und eine genaue Offerte zu erstellen. Die Besichtigung sowie die anschließende Endreinigung finden direkt vor Ort statt, um einen reibungslosen Ablauf zu gewährleisten. Nach der Auftragsbestätigung wird ein Termin vereinbart, der zu Ihrem Umzugstermin passt. Am Reinigungstag erscheint das professionelle Reinigungsteam pünktlich mit allen notwendigen Geräten und Reinigungsmitteln. Die Reinigung erfolgt systematisch Raum für Raum, beginnend mit den am stärksten verschmutzten Bereichen. Nach Abschluss der Reinigung erfolgt eine Qualitätskontrolle, und Sie erhalten eine Abnahmegarantie. Bei der Wohnungsübergabe ist unser Team persönlich anwesend, um eventuelle Beanstandungen direkt vor Ort zu klären und die Abwicklung zu erleichtern. Sollten Sie mit dem Ergebnis nicht zufrieden sein, wird kostenlos nachgebessert, bis die Wohnung den Anforderungen entspricht.
                  </p>

                  {/* Ablauf Image/Icon */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
                      {[
                        { icon: Home, text: "Kostenlose Offerte anfordern" },
                        { icon: Clock, text: "Besichtigung und Offerte erhalten" },
                        { icon: Calendar, text: "Termin vereinbaren" },
                        { icon: Sparkles, text: "Professionelle Reinigung durchführen" },
                        { icon: CheckCircle, text: "Qualitätskontrolle und Abnahme" }
                      ].map((step, index) => {
                        const IconComponent = step.icon
                        return (
                          <div key={index} className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-600 flex items-center justify-center mb-3">
                              <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
                            </div>
                            <p className="text-xs md:text-sm text-gray-700 font-medium">{step.text}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* H2: Was kostet eine professionelle Umzugsreinigung? */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Was kostet eine professionelle Umzugsreinigung?</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Die Kosten für Endreinigung variieren je nach Grösse der Wohnung, Umfang der Reinigung, Region und dem Verschmutzungsgrad. Der Preis hängt also auch davon ab, wie stark die Wohnung verschmutzt ist. In der Regel werden Preise zwischen 25 und 50 CHF pro Stunde berechnet. Je nach Anbieter werden die Preise als Pauschalpreis oder nach Aufwand kalkuliert. Eine durchschnittliche 3-Zimmer-Wohnung benötigt etwa 4-6 Stunden, was Kosten von 400-900 CHF bedeutet. Grössere Wohnungen oder besonders verschmutzte Bereiche können höhere Kosten verursachen. Durch den Vergleich mehrerer Offerten über unsere Plattform können Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen mit Abnahmegarantie erhalten. Alle Offerten sind kostenlos und unverbindlich.
                  </p>

                  {/* H2: Zeitplanung und Terminvereinbarung */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Zeitplanung und Terminvereinbarung</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Die Endreinigung sollte idealerweise nach dem Auszug aller Möbel, aber vor der finalen Übergabe stattfinden. Dies ermöglicht eine gründliche Reinigung aller Bereiche. Professionelle Reinigungsfirmen können flexibel planen und die Reinigung zu einem Zeitpunkt durchführen, der zu Ihrem Umzugstermin passt. Auf Wunsch werden auch individuelle Terminwünsche berücksichtigt, sodass die Reinigung exakt nach Ihren Vorstellungen und Bedürfnissen organisiert werden kann. Frühzeitige Planung ist wichtig, um den richtigen Termin zu sichern, besonders während der Umzugssaison. Viele Reinigungsfirmen bieten auch Notfalltermine an, falls kurzfristig eine Reinigung benötigt wird. Die Abnahmegarantie gibt Ihnen zusätzliche Sicherheit, da die Reinigungsfirma bei Bedarf kostenlos nachbessert, falls die Übergabe verschoben wird.
                  </p>

                  {/* H2: Organisation und Koordination */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Organisation und Koordination</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Eine reibungslose Organisation und Koordination sind das Herzstück unserer Umzugsreinigung mit Abnahmegarantie. Bereits vor der Reinigung bieten wir Ihnen eine kostenlose und unverbindliche Besichtigung Ihrer Wohnung an, um den genauen Aufwand und die zu erwartenden Kosten transparent zu ermitteln. Unsere Reinigungsfirma übernimmt die gesamte Kommunikation mit der Verwaltung und stimmt alle Termine rund um die Wohnungsübergabe optimal ab. Während der Endreinigung und bei der Übergabe sind unsere Mitarbeiter persönlich anwesend, um sicherzustellen, dass alle Reinigungsarbeiten den vereinbarten Standards entsprechen. So können Sie sich entspannt zurücklehnen und sich auf Ihren Umzug konzentrieren, während wir für eine stressfreie und erfolgreiche Übergabe Ihrer Wohnung sorgen.
                  </p>

                  {/* H2: Warum wir der richtige Partner für Ihre Endreinigung sind */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Warum wir der richtige Partner für Ihre Endreinigung sind</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Wir sind der vertrauenswürdige Partner für Ihre Endreinigung. Als erfahrenes Putzinstitut bieten wir Ihnen einen umfassenden Reinigungsservice, der speziell auf Umzugsreinigung und Wohnungsreinigung ausgerichtet ist. Unser Netzwerk umfasst nur geprüfte, versicherte Reinigungsfirmen, die höchste Qualitätsstandards erfüllen. Alle Partnerfirmen bieten eine 100% Abnahmegarantie und verwenden moderne, umweltfreundliche Reinigungsmittel. Wir haben bereits über 500 zufriedene Kunden geholfen, die richtige Reinigungsfirma zu finden. Unser Service ist komplett kostenlos und unverbindlich – Sie zahlen nur für die Reinigung selbst, nicht für unsere Vermittlung. Zudem können Sie durch den Vergleich mehrerer Offerten bis zu 40% sparen.
                  </p>

                  {/* CTA Banner Section */}
                  <div className="mt-6 md:mt-8 mb-6 md:mb-8">
                    <div className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-700 rounded-xl p-6 md:p-8 lg:p-10 shadow-xl">
                      {/* Header with icons */}
                      <div className="flex items-center justify-center mb-4 md:mb-6">
                        <div className="w-3 h-3 bg-blue-300 rounded-sm rotate-45 mr-2"></div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center leading-tight">
                          Umzugsreinigung mit Abnahmegarantie – Kostenlose Offerten anfordern und bis zu 40% sparen
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
                          <span className="text-white text-base md:text-lg font-medium">Geprüfte Partner mit 100% Abnahmegarantie</span>
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

                  {/* H2: Vorteile für den Vermieter */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Vorteile für den Vermieter</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Auch für Vermieter bietet unsere Umzugsreinigung mit Abnahmegarantie zahlreiche Vorteile. Unsere Reinigungsfirma sorgt für eine professionelle Endreinigung der Wohnung, die exakt den Anforderungen des Vermieters entspricht. Sollte es dennoch Beanstandungen geben, übernehmen wir selbstverständlich die Nachreinigung – und das ohne zusätzliche Kosten. Die Abnahmegarantie schützt den Vermieter vor unerwarteten Überraschungen und stellt sicher, dass die Wohnung in einem einwandfreien Zustand übergeben wird. So profitieren Vermieter von einer zuverlässigen Lösung, die Zeit, Aufwand und Kosten spart und für eine reibungslose Neuvermietung sorgt.
                  </p>


                  {/* H2: Häufig gestellte Fragen zur Umzugsreinigung */}
                  <div className="mt-8 md:mt-12">
                    <h2 className="heading-2 mb-6">Häufig gestellte Fragen zur Endreinigung</h2>
                    <p className="text-body mb-6 md:mb-8">
                      Häufig gestellte Fragen zur professionellen Endreinigung mit Abnahmegarantie: Was kostet eine professionelle Umzugsreinigung oder Wohnungsendreinigung? Was beinhaltet eine umfassende Wohnungsreinigung vor der Wohnungsabgabe? Wie lange dauert eine Reinigung in Zug oder in Ihrer Nähe? Was bedeutet Abnahmegarantie bei der Wohnungsabgabe? Unterstützen Sie mich bei der persönlichen Wohnungsabgabe an den Vermieter? Sind die Reinigungskräfte versichert? Kann ich die Reinigung flexibel planen? Ist eine Endreinigung gesetzlich vorgeschrieben? Unsere professionelle Umzugsreinigung sorgt für ein sauberes neues Zuhause und eine reibungslose Übergabe. Diese und weitere Fragen beantworten wir Ihnen gerne. Über unsere Plattform können Sie kostenlos Offerten von geprüften Reinigungsfirmen aus Ihrer Nähe, zum Beispiel aus Zug, vergleichen und dabei bis zu 40% sparen.
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

                  {/* H2: Fazit */}
                  <div className="mt-8 md:mt-12">
                    <h2 className="heading-2 mb-6">Fazit</h2>
                    <p className="text-body mb-6">
                      Unsere Umzugsreinigung mit Abnahmegarantie in Zürich und Umgebung ist die ideale Lösung für eine professionelle Endreinigung Ihrer Wohnung. Als erfahrene Reinigungsfirma legen wir höchsten Wert auf Qualität, Sauberkeit und eine sorgfältige Organisation, damit die Übergabe an Vermieter oder Verwaltung reibungslos und stressfrei verläuft. Dank kostenloser Besichtigung, transparenter Kommunikation und persönlicher Betreuung sind wir Ihr zuverlässiger Partner für eine professionelle Umzugsreinigung. Ob Mieter oder Vermieter – mit unserer Abnahmegarantie erhalten Sie die Sicherheit, dass Ihre Wohnung in bestem Zustand übergeben wird. Vertrauen Sie auf unsere Erfahrung und unseren Service für eine saubere Lösung bei jedem Umzug.
                    </p>
                  </div>

                  {/* H2: Jetzt unverbindliche Reinigungs-Offerte anfordern */}
                  <div className="mt-8 md:mt-12">
                    <h2 className="heading-2 mb-6">Jetzt unverbindliche Reinigungs-Offerte anfordern</h2>
                    <p className="text-body mb-6">
                      Vergleichen Sie kostenlos Offerten von geprüften Reinigungsfirmen in Ihrer Region und sparen Sie bis zu 40%. Alle Offerten beinhalten eine 100% Abnahmegarantie. Ohne Aufpreis, ohne Verpflichtung. Starten Sie jetzt Ihre kostenlose Anfrage und finden Sie die perfekte Reinigungsfirma für Ihre Umzugsreinigung.
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
                      <Link href="/reinigung/wohnungsreinigung" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <h4 className="heading-4 mb-2">Wohnungsreinigung</h4>
                        <p className="text-sm text-gray-600">Gründliche Wohnungsreinigung mit 100% Abnahmegarantie für alle Räume.</p>
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
                </motion.article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <motion.aside
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-4 md:space-y-6"
                >
                  {/* Ratgeber Section */}
                  <CleaningRatgeberSidebar />
                </motion.aside>
                
                {/* Sticky CTA Section - Outside aside for proper sticky behavior */}
                <div className="mt-4 md:mt-6 lg:sticky lg:top-24 lg:self-start">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 md:p-6 border border-blue-100">
                    <h3 className="heading-3 mb-4">Jetzt Offerten anfordern</h3>
                    <p className="text-body mb-3 md:mb-4">
                      Kostenlos und unverbindlich Offerten von geprüften Reinigungsfirmen vergleichen.
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
  )
}

export default UmzugsreinigungPageClient

