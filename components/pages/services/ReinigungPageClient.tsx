'use client'

import React from 'react'

// Framer Motion removed for better performance - using CSS transitions instead
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, CheckCircle, ShieldCheck, Clock, Sparkles, ThumbsUp, BookOpen, Award, HelpCircle, Users, TrendingUp } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import PricingTable from '@/components/SEO/PricingTable'
import HowItWorks from '@/components/SEO/HowItWorks'
import WhyChooseUs from '@/components/SEO/WhyChooseUs'

const ReinigungPageClient = () => {
  const router = useRouter()

  // SEO Data (moved to server component, but kept for schema generation if needed client-side)
  const metaTitle = "Reinigungsfirma – Kostenlose Offerten vergleichen | Schweiz"
  const metaDescription = "Professionelle Reinigungsdienstleistungen für Wohnung, Haus und Büro. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen in Ihrer Region und sparen Sie bis zu 40%."
  const metaKeywords = "umzugsreinigung mit abnahmegarantie, endreinigung wohnung, reinigungsfirma für umzug, wohnungsreinigung mit abnahmegarantie, umzugsreinigung preise, reinigungsofferte, endreinigung kosten, umzugsreinigung zürich, reinigung nach umzug, privatumzug reinigung"
  const canonicalUrl = "/reinigung"

  // Schema Data - Single JSON-LD Service schema
  const schema = {
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
      "name": "Kostenlose Offerte für Reinigung"
    }
  }

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=reinigung&step=2')
  }

  const handleCalculatorClick = () => {
    router.push('/reinigung/reinigungskosten')
  }

  const benefits = [
    { icon: ShieldCheck, title: "Abnahmegarantie", text: "Unsere Partner sind bei der Übergabe anwesend und garantieren die Abnahme durch den Vermieter. Falls Nachbesserungen nötig sind, werden diese kostenlos erledigt." },
    { icon: Clock, title: "Zeitersparnis & Stressreduktion", text: "Konzentrieren Sie sich auf das Einrichten Ihres neuen Heims, während Profis die aufwändige Endreinigung übernehmen." },
    { icon: Sparkles, title: "Professionelle Ausrüstung", text: "Reinigungsfirmen verfügen über spezielle Geräte und Mittel, um auch hartnäckigsten Schmutz zu entfernen und perfekte Ergebnisse zu erzielen." },
    { icon: ThumbsUp, title: "Geprüfte Qualität", text: "Wir arbeiten nur mit qualifizierten und versicherten Reinigungsfirmen zusammen, die höchste Standards erfüllen." },
  ]

  const includedServices = [
    "Gründliche Reinigung von Küche (inkl. Backofen, Dampfabzug, Kühlschrank)",
    "Komplette Bad- und WC-Reinigung (inkl. Entkalkung von Armaturen)",
    "Fensterreinigung (innen und aussen), inkl. Rahmen und Fensterbänke",
    "Reinigung von Storen, Rollläden und Lamellen",
    "Bodenreinigung (alle Beläge: Parkett, Laminat, Fliesen etc.)",
    "Reinigung von Türen, Türrahmen, Griffen und Lichtschaltern",
    "Reinigung von Einbauschränken (innen und aussen)",
    "Reinigung von Sockelleisten, Heizkörpern und Fenstersimsen",
    "Reinigung von Balkon, Terrasse und Kellerabteil (besenrein)"
  ]

  const costData = [
    "1.5-2.5 Zimmer: CHF 500-800",
    "3.5 Zimmer: CHF 800-1'100",
    "4.5 Zimmer: CHF 950-1'300",
    "5.5+ Zimmer: ab CHF 1'200"
  ]

  const pricingTableData = [
    { size: "1.5 - 2.5 Zimmer", cost: "500 - 800 CHF", description: "Kleine Wohnung, WG-Zimmer" },
    { size: "3.5 Zimmer", cost: "800 - 1'100 CHF", description: "Standard Wohnung" },
    { size: "4.5 Zimmer", cost: "950 - 1'300 CHF", description: "Grössere Wohnung" },
    { size: "5.5+ Zimmer", cost: "Ab 1'200 CHF", description: "Einfamilienhaus, Villa" }
  ]

  const oldCostData = [
    "1.5 - 2.5 Zimmer-Wohnung: CHF 500 - 800",
    "3.5 Zimmer-Wohnung: CHF 800 - 1'100",
    "4.5 Zimmer-Wohnung: CHF 950 - 1'300",
    "5.5 Zimmer-Wohnung oder grösser: ab CHF 1'200"
  ]

  const reinigungServices = [
    { path: '/reinigung/wohnungsreinigung', title: 'Wohnungsreinigung' },
    { path: '/reinigung/hausreinigung', title: 'Hausreinigung' },
    { path: '/reinigung/bueroreinigung', title: 'Büroreinigung' },
    { path: '/reinigung/umzugsreinigung', title: 'Umzugsreinigung' },
    { path: '/reinigung/unterhaltsreinigung', title: 'Unterhaltsreinigung' },
    { path: '/reinigung/grundreinigung', title: 'Grundreinigung' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="bg-slate-50">
        <section className="relative w-full bg-gray-100 py-12 md:py-16">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-0 items-center">
              <div className="md:col-span-2 bg-gray-100 px-8 md:px-10 py-8 md:py-12">
                <div>
                  <h1 className="heading-1">
                    Reinigungsfirma für eine stressfreie Reinigung
                  </h1>
                </div>
                <p className="text-base md:text-body mb-6 leading-relaxed">
                  Sorgenfrei zur Wohnungsübergabe. Unsere geprüften Partner sorgen für eine blitzblanke Sauberkeit, damit Sie sich auf Ihr neues Zuhause konzentrieren können. Ideal nach einem Privatumzug.
                </p>
                <div className="mb-6">
                  <Button
                    onClick={handleCtaClick}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold group px-6 py-4 text-base md:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    Jetzt kostenlose Offerten anfordern →
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
                <div className="bg-green-50 rounded-lg p-4 md:p-6 flex flex-wrap gap-4 md:gap-6">
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
              <div className="md:col-span-1 relative h-64 md:h-auto md:min-h-[400px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952"
                  alt="Professionelle Umzugsreinigung"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
          <HowItWorks
            title="So einfach ist es"
            ctaText="Jetzt kostenlose Reinigungs-Offerten anfordern"
            ctaLink="/kostenlose-offerte-anfordern?service=reinigung"
          />
        </div>

        {/* Why Choose Us Section */}
        <div className="container mx-auto max-w-7xl px-4 md:px-6 pb-12 md:pb-16">
          <WhyChooseUs
            title="Warum Online-Offerten.ch?"
            subtitle="Ihre Vorteile beim Vergleich von Reinigungs-Offerten"
            advantages={[
              {
                icon: <ShieldCheck className="h-8 w-8" />,
                title: "Geprüfte Reinigungsfirmen",
                description: "Alle unsere Partner werden sorgfältig geprüft. Sie erhalten nur Offerten von vertrauenswürdigen, zertifizierten Reinigungsfirmen mit Abnahmegarantie."
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Bis zu 40% sparen",
                description: "Durch den Vergleich mehrerer Reinigungs-Offerten finden Sie das beste Preis-Leistungs-Verhältnis und sparen erheblich."
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "100% kostenlos",
                description: "Die Anfrage ist vollständig kostenlos und unverbindlich. Keine versteckten Kosten, keine Verpflichtungen."
              }
            ]}
          />
        </div>

        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-20 space-y-16 md:space-y-24">
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2">Warum eine professionelle Umzugsreinigung?</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Eine Wohnungsübergabe kann stressig sein. Vermieter haben hohe Ansprüche an die Sauberkeit. Mit einer professionellen Reinigungsfirma an Ihrer Seite sparen Sie nicht nur Zeit und Nerven, sondern sichern sich auch dank der Abnahmegarantie gegen teure Nachreinigungen ab. Die perfekte Lösung nach jedem Privatumzug. Vergleichen Sie kostenlose Reinigungsofferten von mehreren geprüften Firmen und finden Sie das beste Angebot.                 Erfahren Sie mehr über unsere <Link href="/umzugsfirma/privatumzug" className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">Privatumzug</Link> Dienstleistungen und wie wir Ihnen bei Ihrem Umzug helfen können.
              </p>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
              <img  
                className="absolute inset-0 w-full h-full object-cover"
                alt="Professionelles Reinigungsteam bei der Endreinigung einer Wohnung"
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </section>

          <section>
            <h2 className="heading-2 text-center">Ihre Vorteile auf einen Blick</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div
                    key={index}
                    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center"
                  >
                    <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">{benefit.title}</h3>
                    <p className="text-slate-600">{benefit.text}</p>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-12 items-center bg-white p-8 md:p-12 rounded-2xl shadow-xl">
            <div className="order-2 md:order-1">
              <h2 className="heading-2">Was ist in einer Umzugsreinigung enthalten?</h2>
              <p className="text-slate-600 mb-6">Eine Standard-Umzugsreinigung mit Abnahmegarantie umfasst alle notwendigen Arbeiten für eine erfolgreiche Wohnungsübergabe. Vergleichen Sie Reinigungsofferten von verschiedenen Anbietern, um das beste Angebot zu finden:</p>
              <ul className="space-y-3">
                {includedServices.map((service, index) => (
                  <li
                    key={index}
                    className="flex items-start"
                  >
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl order-1 md:order-2">
              <img   
                className="absolute inset-0 w-full h-full object-cover"
                alt="Glänzende saubere Küche nach einer professionellen Umzugsreinigung"
                src="https://images.unsplash.com/photo-1641823911769-c55f23c25143" />
            </div>
          </section>
          
          {/* Article Section */}
          <section className="bg-white p-8 md:p-12 rounded-2xl shadow-xl">
            <h2 className="heading-2 flex items-center">
              <BookOpen className="w-8 h-8 mr-4 text-blue-500" />
              Ihr Leitfaden für die perfekte Umzugsreinigung: Vertrauen, Qualität und cleveres Vergleichen
            </h2>
            <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-4">
              <p>
                Die Schlüsselübergabe steht bevor und der Umzugsstress erreicht seinen Höhepunkt. Inmitten von Kisten und Chaos ist die Endreinigung der alten Wohnung oft die letzte Hürde, die es zu überwinden gilt. Doch diese Hürde hat es in sich: Vermieter in der Schweiz sind für ihre hohen Ansprüche an die Sauberkeit bekannt. Ein nicht gründlich gereinigter Backofen oder Kalkrückstände im Bad können schnell zu teuren Nachreinigungen oder sogar zur Einbehaltung der Mietkaution führen. Genau hier kommt die professionelle Umzugsreinigung mit Abnahmegarantie ins Spiel – Ihr Schutzschild für eine reibungslose und stressfreie Übergabe. Es geht nicht nur darum, eine Reinigungsfirma zu beauftragen, sondern den richtigen, vertrauenswürdigen Partner für diese wichtige Aufgabe zu finden. Ein Partner, der Qualität liefert und dessen Preis-Leistungs-Verhältnis überzeugt.
              </p>
              <p>
                Die Suche nach diesem idealen Partner kann jedoch schnell zu einer zeitraubenden Aufgabe werden. Unzählige Anbieter werben mit ihren Diensten, doch wie trennt man die Spreu vom Weizen? Wie stellt man sicher, dass die versprochene Qualität auch wirklich geliefert wird? An dieser Stelle wird der Wert einer Plattform wie Online-Offerten.ch unschätzbar. Statt stundenlang zu recherchieren und einzelne Offerten einzuholen, ermöglichen wir Ihnen, mit nur einer einzigen Anfrage mehrere Offerten von geprüften und bewerteten Reinigungsfirmen aus Ihrer Region zu erhalten. Sie vergleichen nicht nur Preise, sondern auch Kundenbewertungen und Leistungsumfänge. So treffen Sie eine fundierte Entscheidung und finden eine Firma, die nicht nur sauber putzt, sondern der Sie voll und ganz vertrauen können. Dieser Leitfaden führt Sie durch alle wichtigen Aspekte der Umzugsreinigung und zeigt Ihnen, wie Sie mit dem richtigen Vorgehen Zeit, Geld und vor allem Nerven sparen.
              </p>
              
              <div className="!mt-8 !mb-6 p-6 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                <h3 className="text-2xl font-semibold text-slate-800 mb-3 flex items-center">
                  <Award className="w-7 h-7 mr-3 text-blue-500"/>
                  Die Abnahmegarantie: Mehr als nur ein Versprechen für Ihre Reinigung
                </h3>
                <p>
                  Der Begriff 'Abnahmegarantie' ist das wohl wichtigste Qualitätsmerkmal bei einer Umzugsreinigung. Doch was verbirgt sich genau dahinter? Es ist weit mehr als nur eine Zusage für Sauberkeit. Eine echte Abnahmegarantie bedeutet, dass ein Vertreter der Reinigungsfirma bei der Wohnungsübergabe an den Vermieter anwesend ist. Gemeinsam wird die Wohnung inspiziert. Sollte der Vermieter einen Mangel feststellen – sei es ein übersehener Fleck an der Wand oder eine nicht perfekt entkalkte Duschbrause – wird dieser umgehend und ohne zusätzliche Kosten von der Reinigungsfirma nachgebessert. Die Garantie gilt so lange, bis der Vermieter die Sauberkeit im Übergabeprotokoll bestätigt und seine Unterschrift daruntersetzt. Diese Garantie gibt Ihnen die absolute Sicherheit, dass die Reinigung den strengen Schweizer Standards entspricht und Sie keine unerwarteten Kosten fürchten müssen. Sie kaufen nicht nur eine Dienstleistung, sondern ein sorgenfreies Ergebnis.
                </p>
                <img 
                  src="https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/3ed326ca4d6c724a080e41089283afe4.png" 
                  alt="Die Abnahmegarantie: Mehr als nur ein Versprechen für Ihre Reinigung" 
                  className="mt-6 rounded-lg shadow-md w-full object-cover" 
                />
              </div>

              <h3 className="text-2xl font-semibold text-slate-800 pt-4">Der richtige Partner: Warum der Vergleich auf Online-Offerten.ch entscheidend ist</h3>
              <p>
                Die Auswahl der richtigen Reinigungsfirma ist der Schlüssel zum Erfolg. Ein günstiger Preis allein ist kein Garant für Qualität. Auf unserer Plattform legen wir Wert auf Transparenz und Vertrauen. Alle Partnerfirmen werden von uns sorgfältig geprüft. Sie können auf echte Kundenbewertungen zugreifen und sehen auf einen Blick, welche Erfahrungen andere Mieter mit den jeweiligen Unternehmen gemacht haben. Indem Sie mehrere Offerten vergleichen, bekommen Sie ein realistisches Gefühl für die marktüblichen Preise und können Offerten identifizieren, die möglicherweise zu gut sind, um wahr zu sein. Ein detaillierter Vergleich der in den Offerten enthaltenen Leistungen ist ebenso wichtig. Ist die Fensterreinigung inklusive Storen abgedeckt? Wie sieht es mit dem Kellerabteil oder dem Balkon aus? Unser standardisiertes Anfrageformular stellt sicher, dass alle Offerten auf derselben Grundlage basieren und somit fair vergleichbar sind. Sie sparen sich die mühsame Koordination mit verschiedenen Anbietern und erhalten stattdessen übersichtlich aufbereitete, konkurrenzfähige Offerten direkt in Ihr Postfach. So finden Sie mühelos die perfekte Balance aus Preis, Leistung und Vertrauenswürdigkeit. Neben der <Link href="/umzugsreinigung" className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">Umzugsreinigung</Link> bieten wir auch <Link href="/wohnungsreinigung" className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">Wohnungsreinigung</Link>, <Link href="/hausreinigung" className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">Hausreinigung</Link> und <Link href="/bueroreinigung" className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">Büroreinigung</Link> an. Für regelmässige Reinigung empfehlen wir unsere <Link href="/unterhaltsreinigung" className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">Unterhaltsreinigung</Link>.
              </p>
              <p>
                Zusammenfassend lässt sich sagen, dass eine professionelle Umzugsreinigung eine kluge Investition in Ihren Seelenfrieden ist. Sie delegieren eine der anspruchsvollsten Aufgaben des Umzugsprozesses an Experten und sichern sich durch die Abnahmegarantie vollständig ab. Nutzen Sie die Macht des Vergleichs auf Online-Offerten.ch, um den idealen Reinigungspartner zu finden, der Ihnen eine makellose Wohnungsübergabe garantiert. So können Sie sich voll und ganz auf das freuen, was wirklich zählt: der Start in Ihrem neuen Zuhause. Weitere Informationen finden Sie auf unseren <Link href="/standorte" className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">Standorte-Seiten</Link> oder in unserem <Link href="/ratgeber" className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">Ratgeber</Link>.
              </p>
            </div>
          </section>

          {/* Pricing Table Section */}
          <section className="my-12">
            <PricingTable
              title="Preise für Umzugsreinigung"
              subtitle="Durchschnittliche Preise in der Schweiz"
              rows={pricingTableData}
              serviceType="reinigung"
            />
          </section>

          {/* FAQ Section */}
          <section className="bg-slate-100 p-8 md:p-12 rounded-2xl">
            <h2 className="heading-2 text-center flex items-center justify-center">
              <HelpCircle className="w-8 h-8 mr-4 text-blue-500" />
              Häufig gestellte Fragen zur Umzugsreinigung
            </h2>
            <Accordion type="single" collapsible className="w-full max-w-7xl mx-auto">
              <div>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <h4 className="faq-question">Was genau bedeutet die 'Abnahmegarantie'?</h4>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>Die Abnahmegarantie ist Ihre Versicherung für eine erfolgreiche Wohnungsübergabe. Das bedeutet konkret: Ein Mitarbeiter der Reinigungsfirma ist bei der Übergabe anwesend. Beanstandet der Vermieter einen Punkt bezüglich der Sauberkeit, wird dieser sofort und ohne Mehrkosten nachgereinigt. Die Garantie gilt, bis der Vermieter die Reinigung im Übergabeprotokoll als einwandfrei akzeptiert.</p>
                  </AccordionContent>
                </AccordionItem>
              </div>
              <div>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <h4 className="faq-question">Wie viel kostet eine Umzugsreinigung?</h4>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div>
                      <p>Die Kosten variieren je nach Grösse der Wohnung, Verschmutzungsgrad und inkludierten Zusatzleistungen (z.B. sehr hohe Fenster). Als grobe Richtlinie können Sie mit folgenden Preisen rechnen:</p>
                      <ul className="list-disc list-inside my-2 space-y-1">
                        {costData.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      <p>
                        Diese Preise sind Schätzungen. Für eine genaue Kostenübersicht nutzen Sie am besten unseren <Link href="/reinigung/reinigungskosten" className="text-blue-600 hover:underline font-semibold">Reinigungskosten-Rechner</Link> oder fordern Sie direkt <a href="#cta" className="text-blue-600 hover:underline font-semibold">unverbindliche Offerten</a> an.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </div>
              <div>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <h4 className="faq-question">Was muss ich vor der Ankunft des Reinigungsteams tun?</h4>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>Für einen reibungslosen Ablauf sollte die Wohnung komplett leer und geräumt sein. Alle persönlichen Gegenstände und Möbel müssen entfernt sein, damit das Team alle Flächen, Ecken und Schränke uneingeschränkt erreichen und reinigen kann. Stellen Sie zudem sicher, dass Strom und Wasser funktionieren.</p>
                  </AccordionContent>
                </AccordionItem>
              </div>
              <div>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    <h4 className="faq-question">Wie lange dauert eine professionelle Umzugsreinigung?</h4>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>Die Dauer hängt stark von der Grösse und dem Zustand der Wohnung ab. In der Regel benötigt ein Team von 2-3 Personen für eine durchschnittlich grosse 3.5-Zimmer-Wohnung zwischen 6 und 9 Stunden. Planen Sie am besten einen ganzen Tag für die Reinigung ein.</p>
                  </AccordionContent>
                </AccordionItem>
              </div>
            </Accordion>
          </section>

          {/* Contextual Service Links */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Weitere Reinigungsdienstleistungen
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reinigungServices.filter(service => service?.path).map((service) => (
                <Link
                  key={service.path}
                  href={service.path}
                  className="group block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>

          {/* Additional Internal Links */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 md:p-8 rounded-lg mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Weitere Informationen & Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Reinigungsarten</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/reinigung/umzugsreinigung" className="text-blue-600 hover:text-blue-700 font-medium underline">
                      Umzugsreinigung mit Abnahmegarantie
                    </Link>
                  </li>
                  <li>
                    <Link href="/reinigung/wohnungsreinigung" className="text-blue-600 hover:text-blue-700 font-medium underline">
                      Wohnungsreinigung Offerten
                    </Link>
                  </li>
                  <li>
                    <Link href="/reinigung/bueroreinigung" className="text-blue-600 hover:text-blue-700 font-medium underline">
                      Büroreinigung vergleichen
                    </Link>
                  </li>
                  <li>
                    <Link href="/reinigung/grundreinigung" className="text-blue-600 hover:text-blue-700 font-medium underline">
                      Grundreinigung buchen
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Verwandte Services</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/umzugsfirma" className="text-blue-600 hover:text-blue-700 font-medium underline">
                      Umzugsfirmen finden
                    </Link>
                  </li>
                  <li>
                    <Link href="/malerfirma-in-der-naehe" className="text-blue-600 hover:text-blue-700 font-medium underline">
                      Malerfirmen vergleichen
                    </Link>
                  </li>
                  <li>
                    <Link href="/ratgeber" className="text-blue-600 hover:text-blue-700 font-medium underline">
                      Ratgeber & Tipps
                    </Link>
                  </li>
                  <li>
                    <Link href="/reinigung/reinigungskosten" className="text-blue-600 hover:text-blue-700 font-medium underline">
                      Reinigungskosten berechnen
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <section id="cta" className="text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-6 rounded-2xl shadow-2xl">
            <h2 className="heading-2">
              Bereit für eine makellose Übergabe?
            </h2>
            <p className="max-w-2xl mx-auto text-blue-200 mb-8">
              Erhalten Sie in wenigen Schritten kostenlose und unverbindliche Offerten von geprüften Reinigungsfirmen in Ihrer Region.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button onClick={handleCtaClick} size="lg" className="bg-white text-blue-700 hover:bg-blue-100 group w-full sm:w-auto px-8 py-4 text-base">
                Kostenlose Offerten erhalten
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <div className="flex flex-col items-center w-full sm:w-auto">
                <p className="text-blue-200 text-sm mb-1">Oder berechnen Sie zuerst die ungefähren Kosten:</p>
                <Button onClick={handleCalculatorClick} variant="link" className="text-white hover:text-blue-200">
                  Zum Reinigungskosten-Rechner
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default ReinigungPageClient

