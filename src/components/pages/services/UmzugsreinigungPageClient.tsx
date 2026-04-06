'use client'

import React, { useMemo } from 'react'

// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Sparkles, ShieldCheck, Clock, CheckCircle, Users, Award, Star, Home, Heart, Calendar } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import CleaningRatgeberSidebar from '@/components/CleaningRatgeberSidebar'
import { useUserLocation } from '@/hooks/useUserLocation'
import ReinigungServiceHero from '@/components/reinigung/ReinigungServiceHero'

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
      q: "Was kostet eine Umzugsreinigung in der Schweiz?",
      a: "Die Kosten hängen von Wohnungsgrösse, Zustand, Region und Leistungsumfang ab. Für kleine Wohnungen starten Offerten oft im unteren dreistelligen Bereich, bei grösseren Objekten liegen sie entsprechend höher. Wichtig ist, dass Sie Angebote mit identischem Leistungsumfang vergleichen. So sehen Sie transparent, welches Angebot wirklich fair ist."
    },
    {
      q: "Was bedeutet eine Umzugsreinigung mit Abnahmegarantie genau?",
      a: "Abnahmegarantie bedeutet, dass die Reinigungsfirma im vereinbarten Rahmen nachbessert, wenn bei der Übergabe ein relevanter Punkt beanstandet wird. Das reduziert Ihr Risiko für zusätzliche Kosten und gibt mehr Sicherheit beim Abgabetermin."
    },
    {
      q: "Welche Leistungen sind normalerweise enthalten?",
      a: "Typischerweise enthalten sind Küche, Bad/WC, Böden, Fenster, Türen, Schränke, Steckdosen und Lichtschalter. Je nach Offerte kommen Keller, Balkon oder weitere Nebenräume hinzu. Entscheidend ist ein klarer Leistungsbeschrieb, damit es später keine Missverständnisse gibt."
    },
    {
      q: "Wann sollte ich die Umzugsreinigung buchen?",
      a: "Am besten frühzeitig, vor allem in stark nachgefragten Monaten. Ideal ist die Reinigung nach dem Auszug und vor der Schlüsselübergabe. Je genauer Ihre Objektangaben sind, desto präziser fallen die Offerten aus."
    },
    {
      q: "Wie kann ich bei der Umzugsreinigung Kosten sparen?",
      a: "Vergleichen Sie mehrere Offerten, achten Sie auf klar definierte Leistungen und geben Sie genaue Objektdaten an. So vermeiden Sie unklare Pauschalen und unnötige Zusatzkosten. Ein strukturierter Vergleich spart häufig deutlich mehr als reine Preisverhandlung mit nur einem Anbieter."
    },
    {
      q: "Ist eine Besichtigung immer notwendig?",
      a: "Nicht immer. Bei standardisierten Objekten reichen oft detaillierte Angaben und Fotos. Bei grossen, komplexen oder stark verschmutzten Objekten ist eine Besichtigung sinnvoll, damit die Offerte realistisch kalkuliert werden kann."
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
        <ReinigungServiceHero
          breadcrumbCurrent="Umzugsreinigung"
          backgroundImageUrl="https://online-offerten.ch/reinigungsfirma/umzugsreinigung_team_saubere_wohnung.png"
          title="Umzugsreinigung Preis – Kostenlose Offerten vergleichen"
          intro="Professionelle Umzugsreinigung mit 100% Abnahmegarantie für eine sorgenfreie Wohnungsübergabe. Vergleichen Sie kostenlos Offerten von geprüften Reinigungsfirmen."
          ctaLabel="Jetzt kostenlose Offerten anfordern"
          onCtaClick={handleCtaClick}
          trustItems={['Bis zu 40% sparen', 'Nur geprüfte Firmen', '100% kostenlos & unverbindlich']}
        />

        {/* Main Content */}
        <section className="py-8 md:py-12 lg:py-16 xl:py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {/* Main Article */}
              <div className="lg:col-span-2">
                <article className="mb-6 md:mb-8">
                  <div className="space-y-8 md:space-y-10">
                    <h2 className="heading-2 break-words">Umzugsreinigung in der Schweiz: Offerten vergleichen statt Risiko eingehen</h2>
                    <p className="text-body break-words w-full">
                      Eine Wohnungsabgabe ist oft der letzte und zugleich stressigste Schritt eines Umzugs. Kartons sind
                      gepackt, Termine laufen parallel, und genau in dieser Phase entscheidet die Endreinigung häufig
                      darüber, ob die Übergabe reibungslos verläuft oder teure Nacharbeiten entstehen. Viele Mieter
                      unterschätzen, wie detailliert Verwaltungen prüfen: Backofen, Kalkränder, Fensterrahmen,
                      Lichtschalter, Storen oder Fugen. Bereits kleine Rückstände können Beanstandungen auslösen.
                    </p>
                    <p className="text-body break-words w-full">
                      Genau deshalb lohnt sich eine professionelle Umzugsreinigung mit Abnahmegarantie. Auf
                      Online-Offerten.ch erhalten Sie mehrere Offerten von geprüften Reinigungsfirmen und vergleichen
                      transparent nach Preis, Leistung und Verfügbarkeit. Statt unklarer Einzelangebote sehen Sie klar,
                      was enthalten ist und welche Zusatzleistungen optional dazukommen.
                    </p>

                    <h2 className="heading-2 break-words">Für wen ist eine professionelle Umzugsreinigung sinnvoll?</h2>
                    <p className="text-body break-words w-full">
                      Die Dienstleistung ist ideal für Mieter, Eigentümer, Familien und Berufstätige mit engem
                      Zeitplan. Wer neben dem Umzug noch Behördenwege, Adressänderungen und Übergabetermine koordinieren
                      muss, gewinnt durch ein eingespieltes Reinigungsteam vor allem Planungssicherheit. Auch bei
                      grösseren Wohnungen, Häusern oder Objekten mit Balkon und Keller ist professionelle Unterstützung
                      meist die effizientere Lösung.
                    </p>

                    <div className="rounded-lg overflow-hidden">
                      <img
                        src="https://online-offerten.ch/reinigungsfirma/umzugsreinigungsdienstleistungen_professionell.png"
                        alt="Umzugsreinigungsdienstleistungen - Professionelle Reinigung aller Räume"
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    </div>

                    <h2 className="heading-2 break-words">Was ist bei einer Umzugsreinigung enthalten?</h2>
                    <p className="text-body break-words w-full">
                      Der genaue Umfang hängt von Objektgrösse und Offerte ab. Seriöse Anbieter decken in der Regel alle
                      übergaberelevanten Bereiche ab und dokumentieren diese klar. So können Sie Angebote fair
                      vergleichen und vermeiden Missverständnisse.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-body">
                      <li>Gründliche Küchenreinigung inkl. Backofen, Dampfabzug und Kühlschrank</li>
                      <li>Komplette Bad- und WC-Reinigung inkl. Entkalkung</li>
                      <li>Fenster innen und aussen inkl. Rahmen und Fensterbänke</li>
                      <li>Bodenreinigung aller Beläge und Detailflächen</li>
                      <li>Reinigung von Türen, Schränken, Griffen, Schaltern und Steckdosen</li>
                      <li>Optional: Balkon, Keller, Nebenräume und weitere Zusatzleistungen</li>
                    </ul>

                    <h2 className="heading-2 break-words">Umzugsreinigung Preis: Was kostet die Endreinigung?</h2>
                    <p className="text-body break-words w-full">
                      Suchanfragen wie „Umzugsreinigung Preis“, „Endreinigung Wohnung Kosten Schweiz“ oder „Reinigung
                      Preise pro Stunde“ zeigen, dass Transparenz beim Budget zentral ist. In der Praxis arbeiten
                      Reinigungsfirmen je nach Auftrag mit Pauschalen, Stundenansätzen oder Mischmodellen. Ein einzelner
                      Preis sagt jedoch wenig aus, wenn Leistungen und Objektangaben nicht vergleichbar sind.
                    </p>
                    <p className="text-body break-words w-full">
                      Die wichtigsten Preisfaktoren sind Zimmeranzahl, Wohnfläche, Verschmutzungsgrad, Anzahl Fenster,
                      Zugänglichkeit und Terminfenster. Deshalb gilt: Nur Offerten mit identischem Leistungsumfang
                      vergleichen. Genau hier schafft eine Vergleichsplattform einen echten Vorteil.
                    </p>

                    <div className="p-5 md:p-6 bg-green-50 rounded-lg border border-green-200">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                        Kostenlose Offerten für Umzugsreinigung vergleichen
                      </h3>
                      <p className="text-body mb-4">
                        Mit einer Anfrage erhalten Sie mehrere Angebote von geprüften Firmen und sehen Preis und Leistung
                        direkt im Vergleich.
                      </p>
                      <Button
                        onClick={handleCtaClick}
                        size="lg"
                        className="bg-green-700 hover:bg-green-800 text-white w-full sm:w-auto text-base font-semibold"
                      >
                        Jetzt Offerten einholen
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>

                    <h2 className="heading-2 break-words">Abnahmegarantie: der zentrale Sicherheitsfaktor</h2>
                    <p className="text-body break-words w-full">
                      Die Abnahmegarantie ist mehr als ein Werbeversprechen. Sie bedeutet, dass die Reinigungsfirma im
                      vereinbarten Rahmen nachbessert, falls bei der Übergabe ein relevanter Punkt beanstandet wird. Das
                      reduziert Ihr Kostenrisiko und sorgt für deutlich mehr Sicherheit am Abgabetermin.
                    </p>
                    <p className="text-body break-words w-full">
                      Achten Sie auf die Details: Ist die Nachbesserung klar geregelt? Gibt es eine erreichbare
                      Kontaktperson? Sind kritische Bereiche wie Fenster, Küche und Sanitärbereiche eindeutig in der
                      Offerte enthalten? Gute Anbieter beantworten diese Fragen bereits vor der Buchung.
                    </p>

                    <div className="rounded-lg overflow-hidden">
                      <img
                        src="https://online-offerten.ch/reinigungsfirma/reinigungsmittel_auf_tisch.webp"
                        alt="Umzugsreinigung mit Abnahmegarantie - Vorher und Nachher Vergleich"
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    </div>

                    <h2 className="heading-2 break-words">Ablauf einer professionellen Umzugsreinigung</h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5 bg-gradient-to-br from-blue-50 to-cyan-50 p-5 md:p-6 rounded-lg">
                      {[
                        { icon: Home, text: "Kostenlose Offerte anfordern" },
                        { icon: Clock, text: "Leistungen vergleichen" },
                        { icon: Calendar, text: "Termin fixieren" },
                        { icon: Sparkles, text: "Reinigung durchführen" },
                        { icon: CheckCircle, text: "Übergabe absichern" }
                      ].map((step, index) => {
                        const IconComponent = step.icon
                        return (
                          <div key={index} className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-2">
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-xs md:text-sm text-gray-700 font-medium">{step.text}</p>
                          </div>
                        )
                      })}
                    </div>
                    <p className="text-body break-words w-full">
                      Dieser Ablauf spart Zeit, weil Sie nicht jedes Unternehmen einzeln kontaktieren müssen. Sie bündeln
                      den Prozess, erhalten strukturierte Offerten und treffen Ihre Entscheidung auf Basis klarer Daten
                      statt auf Bauchgefühl.
                    </p>

                    <h2 className="heading-2 break-words">Regionale Verfügbarkeit in der Schweiz</h2>
                    <p className="text-body break-words w-full">
                      Verfügbarkeit und Preise unterscheiden sich je nach Region. Besonders in Städten wie Zürich, Basel,
                      Bern oder Luzern ist eine frühzeitige Anfrage wichtig. Über unsere Plattform finden Sie passende
                      Anbieter aus Ihrer Region und können den Umzugstermin mit der Reinigung sinnvoll abstimmen.
                    </p>

                    <h2 className="heading-2 break-words">Welche Faktoren beeinflussen den Endpreis?</h2>
                    <p className="text-body break-words w-full">
                      Ein professioneller Vergleich beginnt immer mit den richtigen Eingabedaten. Der wichtigste
                      Kostenfaktor ist die Objektgrösse: Eine 1.5-Zimmer-Wohnung benötigt deutlich weniger Zeit als ein
                      5.5-Zimmer-Objekt mit Nebenräumen. Ebenso relevant ist der tatsächliche Verschmutzungsgrad. Wer
                      mehrere Jahre in der Wohnung gelebt hat, benötigt in der Regel mehr Detailarbeit in Küche, Bad,
                      Fenstern und schwer zugänglichen Bereichen. Dazu kommen mögliche Zusatzleistungen wie
                      Storenreinigung, Balkonflächen oder besonders hohe Fenster.
                    </p>
                    <p className="text-body break-words w-full">
                      Auch die Zugänglichkeit des Objekts spielt in der Praxis eine Rolle. Ohne Lift oder mit langen
                      Laufwegen steigt der Aufwand. Gleiches gilt bei knappen Terminfenstern, etwa wenn Reinigung und
                      Übergabe am selben Tag stattfinden müssen. Eine gute Offerte macht diese Punkte transparent und
                      zeigt klar, welche Leistungen im Grundpreis enthalten sind. Dadurch erkennen Sie sofort, ob ein
                      Angebot realistisch kalkuliert wurde oder ob später mit Zusatzkosten zu rechnen ist.
                    </p>

                    <h2 className="heading-2 break-words">Typische Fehler bei der Umzugsreinigung vermeiden</h2>
                    <p className="text-body break-words w-full">
                      Der häufigste Fehler ist die Entscheidung nur nach dem tiefsten Preis. Günstige Offerten sind nicht
                      automatisch schlecht, aber ohne klaren Leistungsumfang lassen sie sich kaum fair bewerten.
                      Unpräzise Formulierungen wie „komplette Reinigung“ reichen nicht aus. Entscheidend ist, ob
                      kritische Punkte wie Backofen, Dunstabzug, Fensterrahmen, Storen, Fugen und Einbauschränke
                      ausdrücklich genannt werden.
                    </p>
                    <p className="text-body break-words w-full">
                      Ein weiterer Fehler ist eine zu späte Buchung. Besonders in Monaten mit hoher Umzugsaktivität sind
                      gute Termine schnell vergeben. Wer zu spät anfragt, muss häufig Kompromisse bei Preis oder
                      Verfügbarkeit eingehen. Ebenfalls problematisch ist es, wenn der Zustand der Wohnung in der Anfrage
                      zu optimistisch beschrieben wird. Je genauer Ihre Angaben sind, desto präziser erhalten Sie
                      Offerten, die später auch eingehalten werden können.
                    </p>

                    <h2 className="heading-2 break-words">Checkliste vor dem Reinigungstermin</h2>
                    <p className="text-body break-words w-full">
                      Damit das Reinigungsteam effizient arbeiten kann, sollte das Objekt vor dem Termin vollständig
                      geräumt sein. Persönliche Gegenstände, Möbelreste und lose Materialien verzögern den Ablauf und
                      erhöhen das Risiko, dass bestimmte Flächen nicht sauber bearbeitet werden können. Prüfen Sie vorab,
                      ob Strom und Wasser verfügbar sind und ob alle Räume zugänglich sind.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-body">
                      <li>Wohnung komplett leer räumen (inkl. Keller/Nebenraum, falls im Auftrag enthalten)</li>
                      <li>Schlüsselübergabe und Zugang zum Objekt rechtzeitig organisieren</li>
                      <li>Besondere Mängel oder sensible Bereiche im Voraus kommunizieren</li>
                      <li>Leistungsumfang und Termin schriftlich bestätigen lassen</li>
                      <li>Ansprechperson für den Übergabetag festlegen</li>
                    </ul>
                    <p className="text-body break-words w-full">
                      Diese Vorbereitung spart nicht nur Zeit, sondern verbessert auch die Qualität des Ergebnisses.
                      Gleichzeitig minimieren Sie das Risiko für spätere Diskussionen mit Verwaltung oder Vermieterschaft.
                    </p>

                    <h2 className="heading-2 break-words">Qualität erkennen: worauf Sie bei Offerten achten sollten</h2>
                    <p className="text-body break-words w-full">
                      Eine hochwertige Offerte zeichnet sich durch Klarheit aus. Dazu gehören nachvollziehbare
                      Leistungspositionen, transparente Konditionen und ein realistisches Terminfenster. Seriöse Anbieter
                      kommunizieren offen, welche Leistungen standardmässig enthalten sind und welche als Zusatzoptionen
                      gelten. Gerade bei der Umzugsreinigung ist das entscheidend, weil kleine Lücken im Leistungsumfang
                      bei der Übergabe schnell zu Problemen führen.
                    </p>
                    <p className="text-body break-words w-full">
                      Zusätzlich sollten Sie prüfen, wie die Firma mit Rückfragen und Nachbesserung umgeht. Gibt es eine
                      klare Kontaktperson? Ist der Ablauf bei Beanstandungen definiert? Wie schnell wird reagiert? Solche
                      Punkte sind oft wichtiger als ein kleiner Preisunterschied. Ein verlässlicher Partner spart am Ende
                      Zeit, Nerven und in vielen Fällen auch Geld.
                    </p>

                    <h2 className="heading-2 break-words">Umzugsreinigung für Mieter und Vermieter</h2>
                    <p className="text-body break-words w-full">
                      Für Mieter steht vor allem die reibungslose Rückgabe der Wohnung im Zentrum. Ziel ist eine saubere
                      Übergabe ohne zusätzliche Nachforderungen. Für Vermieter wiederum ist eine zügige Neuvermietung
                      wichtig. Eine professionell gereinigte Wohnung erleichtert die Übergabe an neue Bewohner deutlich.
                      Deshalb profitieren beide Seiten von einem klar definierten Reinigungsstandard und einem
                      nachvollziehbaren Ablauf.
                    </p>
                    <p className="text-body break-words w-full">
                      Besonders bei angespannten Zeitplänen – etwa wenn die nächste Mietpartei bereits feststeht –
                      schafft eine professionelle Endreinigung Sicherheit. Das gilt auch bei Objekten mit hoher
                      Beanspruchung, in denen ohne Fachteam häufiger Nacharbeiten nötig wären. Ein strukturierter
                      Offertenvergleich ist daher für beide Seiten sinnvoll.
                    </p>

                    <h2 className="heading-2 break-words">Umweltfreundliche Reinigung ohne Qualitätsverlust</h2>
                    <p className="text-body break-words w-full">
                      Moderne Reinigungsfirmen arbeiten zunehmend mit umweltschonenden und materialverträglichen
                      Reinigungsmitteln. Das ist nicht nur für die Umwelt relevant, sondern auch für Innenräume, in denen
                      empfindliche Oberflächen vorhanden sind. Entscheidend ist, dass ökologische Mittel fachgerecht
                      eingesetzt werden und der Reinigungsprozess an Material und Verschmutzung angepasst wird.
                    </p>
                    <p className="text-body break-words w-full">
                      Bei hochwertigen Küchenfronten, Naturstein oder empfindlichen Bodenbelägen ist professionelle
                      Produktauswahl besonders wichtig. Gute Anbieter kombinieren deshalb geschultes Personal mit
                      passender Ausstattung, statt mit Standardlösungen zu arbeiten. So bleibt die Reinigungsleistung
                      hoch, ohne Oberflächen unnötig zu belasten.
                    </p>

                    <h2 className="heading-2 break-words">So holen Sie in wenigen Minuten passende Offerten ein</h2>
                    <p className="text-body break-words w-full">
                      Über das Anfrageformular geben Sie zuerst die wichtigsten Eckdaten an: Objekttyp, Zimmerzahl,
                      Standort, gewünschter Termin und besondere Anforderungen. Anschliessend erhalten Sie Angebote von
                      geprüften Reinigungsfirmen, die zu Ihren Kriterien passen. Diese Offerten können Sie direkt
                      gegenüberstellen und nach Preis, Leistung und Verfügbarkeit bewerten.
                    </p>
                    <p className="text-body break-words w-full">
                      Der Vorteil: Sie müssen nicht selbst dutzende Anbieter recherchieren und kontaktieren. Mit einer
                      einzigen Anfrage bekommen Sie strukturierte Vergleichbarkeit und sparen wertvolle Zeit in einer
                      ohnehin intensiven Umzugsphase.
                    </p>

                    <h2 className="heading-2 break-words">Fazit: sauberer Abschluss für einen stressfreien Umzug</h2>
                    <p className="text-body break-words w-full">
                      Eine professionelle Umzugsreinigung ist keine Nebensache, sondern ein zentraler Teil einer
                      erfolgreichen Wohnungsabgabe. Wer früh plant, Leistungen sauber vergleicht und auf klare
                      Abnahmebedingungen achtet, reduziert das Risiko für teure Nacharbeiten erheblich. Genau hier
                      unterstützt Sie Online-Offerten.ch: transparent, unverbindlich und mit Fokus auf realistische
                      Angebote statt auf Werbeversprechen.
                    </p>
                    <p className="text-body break-words w-full">
                      Ob kleine Wohnung, Familienhaushalt oder grösseres Objekt mit Nebenräumen: Mit einem strukturierten
                      Offertenvergleich finden Sie den passenden Anbieter schneller und treffen Entscheidungen auf Basis
                      nachvollziehbarer Leistungen. So gelingt der letzte Schritt Ihres Umzugs effizient, planbar und mit
                      deutlich weniger Stress.
                    </p>

                    <div className="rounded-lg overflow-hidden">
                      <img
                        src="https://online-offerten.ch/reinigungsfirma/umweltfreundliche_reinigungsmittel_modern.webp"
                        alt="Umweltfreundliche Reinigungsmittel für Umzugsreinigung - Biologische und gesundheitsschonende Produkte"
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    </div>

                    <h2 className="heading-2 break-words">Häufig gestellte Fragen zur Endreinigung</h2>
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

                    <div className="p-5 md:p-6 bg-blue-50 rounded-lg border border-blue-200">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                        Jetzt unverbindliche Offerten für Umzugsreinigung anfordern
                      </h3>
                      <p className="text-body mb-4">
                        Vergleichen Sie kostenlos Angebote von geprüften Reinigungsfirmen und sichern Sie sich eine
                        reibungslose Übergabe mit Abnahmegarantie.
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

                    <div>
                      <h3 className="heading-3 mb-5">Weitere Reinigungsdienstleistungen</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        <Link href="/reinigung/wohnungsreinigung" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                          <h4 className="heading-4 mb-2">Wohnungsreinigung</h4>
                          <p className="text-sm text-gray-600">Gründliche Wohnungsreinigung mit klar definiertem Leistungsumfang.</p>
                        </Link>
                        <Link href="/reinigung/fensterreinigung" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                          <h4 className="heading-4 mb-2">Fensterreinigung</h4>
                          <p className="text-sm text-gray-600">Streifenfreie Fensterreinigung innen und aussen.</p>
                        </Link>
                        <Link href="/reinigung/baureinigung" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                          <h4 className="heading-4 mb-2">Baureinigung</h4>
                          <p className="text-sm text-gray-600">Saubere Übergabe nach Neubau oder Renovation.</p>
                        </Link>
                      </div>
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



