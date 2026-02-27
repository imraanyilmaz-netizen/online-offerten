'use client'

import React from 'react';
import Link from 'next/link';
// Framer Motion removed for better performance
import { Calculator, CheckCircle, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import MovingCostCalculator from '@/components/UmzugskostenRechnerSections/MovingCostCalculator';

const UmzugskostenRechnerPageClient: React.FC = () => {
  const [shouldOpenForm, setShouldOpenForm] = React.useState(false);
  const faqs = [
    {
      question: 'Was kostet ein Umzug in der Schweiz durchschnittlich?',
      answer: 'Ein Standardumzug einer 3.5-Zimmer-Wohnung innerhalb der gleichen Stadt kostet zwischen 1.500 und 2.500 CHF.',
    },
    {
      question: 'Wie berechnen Umzugsfirmen ihre Preise?',
      answer: 'Die meisten Zugelunternehmen kalkulieren auf Basis von Wohnungsgrosse, Anzahl Zimmer, Umzugsdistanz, Stockwerk und gewunschten Zusatzleistungen.',
    },
    {
      question: 'Sind Umzugskosten steuerlich absetzbar?',
      answer: 'In der Schweiz konnen berufsbedingte Umzugskosten unter bestimmten Voraussetzungen steuerlich geltend gemacht werden.',
    },
    {
      question: 'Was ist bei Umzugsofferten zu beachten?',
      answer: 'Achten Sie auf Festpreis oder Stundenabrechnung, enthaltene MwSt., Versicherungsschutz und genaue Leistungsbeschreibung.',
    },
    {
      question: 'Wie kann ich Umzugsfirmen serios vergleichen?',
      answer: 'Nutzen Sie Plattformen wie Online-Offerten.ch, die nur geprufte Anbieter listen und transparente Preisangaben bieten.',
    },
  ];
  const openFormSection = React.useCallback(() => {
    setShouldOpenForm(true);
    setTimeout(() => {
      const formElement = document.getElementById('moving-cost-calculator-section');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  }, []);

  return (
    <>
      <div className="bg-white">

        {/* Hero Section */}
        <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-green-50">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316a34a' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                backgroundSize: '60px 60px'
              }}
            ></div>
          </div>
          <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
                </li>
                <li><ChevronRightIcon className="w-4 h-4 text-gray-400" /></li>
                <li>
                  <Link href="/umzugsfirma" className="hover:text-green-600 transition-colors">Umzugsfirma</Link>
                </li>
                <li><ChevronRightIcon className="w-4 h-4 text-gray-400" /></li>
                <li className="text-gray-900 font-medium" aria-current="page">Umzugskosten</li>
              </ol>
            </nav>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-semibold text-sm mb-4">
                  <Calculator className="h-4 w-4 mr-2" />
                  Umzugskosten vergleichen
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
                  Umzug Kosten Schweiz - Transparente Preise durch Offertenvergleich
                </h1>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
                  Vergleichen Sie bis zu 5 kostenlose Offerten von gepruften Umzugsfirmen und sparen Sie bei Ihrem nachsten Umzug.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Bis zu 5 Offerten von gepruften Umzugsfirmen</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>100% kostenlos und unverbindlich</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>In nur 2 Minuten ausgefullt</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Regionale Anbieter in der ganzen Schweiz</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl border-4 border-green-200 overflow-hidden">
                  <MovingCostCalculator 
                    onRequestQuote={() => {
                      openFormSection();
                    }}
                    hideInlineForm={true}
                    onFormOpened={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="max-w-4xl space-y-10">
            <section>
              <h2 className="heading-2 mb-4">Schluss mit versteckten Kosten und uberteuerten Umzugsangeboten</h2>
              <p className="text-body mb-4">
                Ein Umzug in der Schweiz kostet durchschnittlich zwischen 1.500 und 6.000 CHF - doch viele Menschen zahlen mehr als notig, weil sie nur eine einzige Offerte einholen oder versteckte Kosten ubersehen. Die Preisunterschiede zwischen verschiedenen Umzugsfirmen konnen bis zu 40 Prozent betragen.
              </p>
              <p className="text-body mb-4">
                Online-Offerten.ch lost dieses Problem: Mit einer einzigen Anfrage erhalten Sie <strong>bis zu 5 kostenlose Umzugsofferten</strong> von gepruften regionalen Zugelfirmen. So vergleichen Sie transparent die Umzugskosten und treffen eine fundierte Wahl - ohne Stress und ohne versteckte Gebuhren.
              </p>
              <p className="text-body mb-6">
                Der Service ist <strong>100% kostenlos und unverbindlich</strong> fur Sie als Kunde. Sie gehen keinerlei Verpflichtung ein und behalten die volle Kontrolle uber Ihre Entscheidung.
              </p>
              <button
                type="button"
                onClick={openFormSection}
                className="inline-flex items-center rounded-lg bg-green-600 px-5 py-3 text-white font-semibold hover:bg-green-700 transition-colors"
              >
                Jetzt kostenlose Offerten anfordern
              </button>
            </section>

            <section>
              <h2 className="heading-2 mb-4">Warum Online-Offerten.ch fur Ihren Umzugskostenvergleich wahlen?</h2>
              <p className="text-body mb-4">
                Ein Umzugsfirma Vergleich spart nicht nur Geld, sondern auch Nerven. Hier sind die wichtigsten Grunde, warum tausende Menschen in der Schweiz auf Online-Offerten.ch vertrauen:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body">
                <li><strong>Bis zu 5 kostenlose Offerten</strong> - Erhalten Sie mehrere Angebote von gepruften lokalen Umzugsunternehmen mit einer einzigen Anfrage</li>
                <li><strong>Transparente Preise ohne Uberraschungen</strong> - Alle Offerten enthalten klare Angaben zu Kosten, MwSt. und Leistungsumfang</li>
                <li><strong>Massive Zeitersparnis</strong> - Statt stundenlang Firmen zu recherchieren und einzeln zu kontaktieren, erledigen Sie alles in wenigen Minuten</li>
                <li><strong>Neutrale Plattform</strong> - Wir bieten keine eigenen Umzugsdienstleistungen an und beraten daher objektiv</li>
                <li><strong>Keine versteckten Kosten</strong> - Fur Kunden ist der gesamte Service komplett kostenlos und unverbindlich</li>
              </ul>
              <p className="text-body italic mt-4">
                Mit Online-Offerten.ch nutzen Sie die Vorteile eines professionellen Offertenvergleichs, ohne selbst den Aufwand zu haben. Sie erhalten Zugang zu regionalen Zugelunternehmen, die Ihre Wohnsituation kennen und faire Preise bieten.
              </p>
            </section>

            <section>
              <img
                src="/umzug/vergleichsportal.webp"
                alt="Umzugsfirma Vergleich in der Schweiz"
                className="w-full h-auto rounded-xl shadow-md"
                loading="lazy"
              />
            </section>

            <section>
              <h2 className="heading-2 mb-4">So funktioniert der Umzugskostenvergleich</h2>
              <p className="text-body mb-3"><strong>Schritt 1: Umzugsprojekt online beschreiben</strong></p>
              <p className="text-body mb-3">Fullen Sie unser kurzes Formular aus. Geben Sie Informationen zu Ihrer Wohnungsgrosse, dem Umzugsdatum, der Distanz zwischen altem und neuem Wohnort sowie gewunschten Zusatzleistungen an. Das dauert nur wenige Minuten.</p>
              <p className="text-body mb-3"><strong>Schritt 2: Anfrage wird automatisch weitergeleitet</strong></p>
              <p className="text-body mb-3">Ihre Anfrage geht direkt an bis zu 5 passende regionale Umzugsfirmen in Ihrer Nahe. Jede Firma erhalt die gleichen Angaben und kann ein individuelles Angebot erstellen.</p>
              <p className="text-body mb-3"><strong>Schritt 3: Kostenlose Offerten erhalten und vergleichen</strong></p>
              <p className="text-body mb-3">Innerhalb kurzer Zeit erhalten Sie verschiedene Umzugsofferten. Vergleichen Sie in Ruhe Preise, Leistungen und Konditionen - alles transparent und ubersichtlich.</p>
              <p className="text-body mb-3"><strong>Schritt 4: Beste Umzugsfirma auswahlen</strong></p>
              <p className="text-body">Entscheiden Sie sich fur das Angebot, das am besten zu Ihrem Budget und Ihren Anforderungen passt. Beauftragen Sie die Firma direkt - ohne Vermittlungsgebuhren.</p>
            </section>

            <section>
              <h2 className="heading-2 mb-4">Was uns von anderen Umzugsportalen unterscheidet</h2>
              <ul className="list-disc pl-6 space-y-2 text-body">
                <li><strong>Ausschliesslich geprufte Schweizer Umzugsfirmen</strong> - Jedes Zugelunternehmen in unserem Netzwerk wurde auf Qualitat, Zuverlassigkeit und Betriebshaftpflichtversicherung gepruft</li>
                <li><strong>Keine Provision oder Vermittlungsgebuhren</strong> - Sie zahlen keinen Cent an uns, weder direkt noch versteckt im Preis der Umzugsfirma</li>
                <li><strong>Neutrale Beratung garantiert</strong> - Da wir selbst keine Umzuge durchfuhren, haben wir kein Interesse daran, bestimmte Anbieter zu bevorzugen</li>
                <li><strong>Schweizweite Abdeckung</strong> - Von Zurich bis Genf, von Basel bis Lugano finden wir regionale Anbieter, die Ihren Wohnort kennen</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-2 mb-4">Umzugsfirma Kosten Tabelle Schweiz</h2>
              <p className="text-body mb-4">
                Was kostet ein Umzug in der Schweiz? Die folgende Ubersicht gibt Ihnen eine erste Orientierung uber durchschnittliche Umzugspreise nach Wohnungsgrosse:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-3 text-left border-b">Wohnungsgrosse</th>
                      <th className="p-3 text-left border-b">Lokaler Umzug (bis 50 km)</th>
                      <th className="p-3 text-left border-b">Fernumzug (uber 100 km)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="p-3 border-b">1.5-Zimmer-Wohnung (bis 40 m2)</td><td className="p-3 border-b">800 - 1.200 CHF</td><td className="p-3 border-b">1.200 - 1.800 CHF</td></tr>
                    <tr><td className="p-3 border-b">2.5-Zimmer-Wohnung (bis 60 m2)</td><td className="p-3 border-b">1.200 - 1.800 CHF</td><td className="p-3 border-b">1.800 - 2.500 CHF</td></tr>
                    <tr><td className="p-3 border-b">3.5-Zimmer-Wohnung (bis 80 m2)</td><td className="p-3 border-b">1.500 - 2.500 CHF</td><td className="p-3 border-b">2.500 - 3.500 CHF</td></tr>
                    <tr><td className="p-3 border-b">4.5-Zimmer-Wohnung (bis 100 m2)</td><td className="p-3 border-b">2.000 - 3.200 CHF</td><td className="p-3 border-b">3.200 - 4.500 CHF</td></tr>
                    <tr><td className="p-3 border-b">5.5-Zimmer-Wohnung (bis 120 m2)</td><td className="p-3 border-b">2.500 - 4.000 CHF</td><td className="p-3 border-b">4.000 - 5.500 CHF</td></tr>
                    <tr><td className="p-3">6.5-Zimmer-Wohnung (uber 120 m2)</td><td className="p-3">3.500 - 5.000 CHF</td><td className="p-3">5.500 - 7.000 CHF</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-body italic mt-4">
                Alle Preise verstehen sich inklusive MwSt. und basieren auf durchschnittlichen Marktpreisen 2024. Die tatsachlichen Kosten fur einen Umzug variieren je nach Umzugsfirma, Umfang der Einrichtungsgegenstande und regionalen Faktoren.
              </p>
              <p className="text-body mt-3">
                <strong>Wichtig:</strong> Diese Richtpreise dienen als Uberblick. Fur eine genaue Kalkulation empfehlen wir, mehrere individuelle Offerten einzuholen und zu vergleichen.
              </p>
            </section>

            <section>
              <h2 className="heading-2 mb-4">Umzugsfirma Kosten pro Stunde Schweiz</h2>
              <p className="text-body mb-4">
                Viele Umzugsfirmen rechnen auf Stundenbasis ab. Die Umzug Kosten pro Stunde hangen von der Teamgrosse und dem eingesetzten Material ab:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-3 text-left border-b">Teamgrosse</th>
                      <th className="p-3 text-left border-b">Umzugswagen</th>
                      <th className="p-3 text-left border-b">Stundenpreis</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="p-3 border-b">2 Zugelmanner</td><td className="p-3 border-b">Kleiner Transporter (bis 12 m3)</td><td className="p-3 border-b">120 - 160 CHF/Stunde</td></tr>
                    <tr><td className="p-3 border-b">3 Umzugshelfer</td><td className="p-3 border-b">Mittelgrosser LKW (bis 20 m3)</td><td className="p-3 border-b">150 - 190 CHF/Stunde</td></tr>
                    <tr><td className="p-3 border-b">4 Zugelmanner</td><td className="p-3 border-b">Grosser LKW (bis 30 m3)</td><td className="p-3 border-b">180 - 220 CHF/Stunde</td></tr>
                    <tr><td className="p-3">5-6 Personen</td><td className="p-3">LKW mit Mobellift</td><td className="p-3">220 - 280 CHF/Stunde</td></tr>
                  </tbody>
                </table>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-body mt-4">
                <li><strong>Stundenabrechnung</strong> eignet sich bei kleineren Wohnungen, kurzer Umzugsdistanz und wenn Sie selbst beim Tragen helfen</li>
                <li><strong>Festpreise</strong> bieten mehr Planungssicherheit, besonders bei grosseren Haushalten oder wenn eine Besichtigung vorab stattgefunden hat</li>
              </ul>
            </section>

            <section>
              <img
                 src="/ratgeber/umzug-in-der-schweiz-planen-umzugsofferten-vergleichen.webp"
                alt="Professioneller Umzug in der Schweiz"
                className="w-full h-auto rounded-xl shadow-md"
                loading="lazy"
              />
            </section>

            <section>
              <h2 className="heading-2 mb-4">Faktoren die Ihre Umzugskosten beeinflussen</h2>
              <p className="text-body mb-3"><strong>Wohnungsgrosse und Umzugsvolumen</strong></p>
              <p className="text-body mb-3">Die Haushaltsgrosse bestimmt massgeblich die Kosten. Je mehr Zimmer und je grosser das Inventar an Mobeln, Umzugskartons und Hausrat, desto mehr Zeit, Personal und Volumen im Umzugswagen werden benotigt.</p>
              <p className="text-body mb-3"><strong>Umzugsdistanz</strong></p>
              <p className="text-body mb-3">Die Distanz zwischen altem und neuem Wohnort beeinflusst die Anfahrt und Transportzeit. Lokale Umzuge innerhalb des gleichen Ortes sind deutlich gunstiger als Fernumzuge uber 100 Kilometer.</p>
              <p className="text-body mb-3"><strong>Stockwerk und Zugang</strong></p>
              <p className="text-body mb-3">Fehlt ein Lift, erhoht sich der Aufwand erheblich. Enge Treppenhauser, schwieriger Zugang oder die Notwendigkeit eines Mobellifts schlagen sich in der Hohe des Preises nieder.</p>
              <p className="text-body mb-3"><strong>Zusatzleistungen</strong></p>
              <p className="text-body mb-3">Einpackservice, Mobelmontage, Lampen abnehmen oder professionelle Reinigung - jede zusatzliche Hilfe kostet extra, spart Ihnen aber Zeit und Nerven.</p>
              <p className="text-body mb-3"><strong>Saisonale Preisunterschiede</strong></p>
              <p className="text-body">In den beliebten Umzugsmonaten Marz und September sind Umzugsfirmen stark ausgelastet. Die Preise konnen dann 10-15% hoher liegen als in der Nebensaison.</p>
            </section>

            <section>
              <h2 className="heading-2 mb-4">Zusatzleistungen und deren Kosten</h2>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-3 text-left border-b w-1/2">Zusatzleistung</th>
                      <th className="p-3 text-left border-b">Kosten / Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border-b font-medium">Umzug mit Reinigung</td>
                      <td className="p-3 border-b">Professionelle Endreinigung: 4-10 CHF pro m2; 3.5-Zimmer-Wohnung (80 m2): 400-800 CHF; Vorteil: Abnahmegarantie durch professionelle Reinigungsfirmen</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b font-medium">Einpackservice und Verpackungsmaterial</td>
                      <td className="p-3 border-b">Kompletter Einpackservice: 200-500 CHF; Umzugskartons (Kauf): 5-8 CHF pro Stuck; Verpackungsmaterial (Kartons, Decken, Folie): 100-300 CHF</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b font-medium">Mobelmontage und -demontage</td>
                      <td className="p-3 border-b">Demontage/Montage pro Mobelstuck: 30-80 CHF; Kuchenmontage komplett: 300-600 CHF; Schrankwand oder grosses Bett: 80-150 CHF</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b font-medium">Einlagerungsservice</td>
                      <td className="p-3 border-b">Lagerraum pro m3/Monat: 25-50 CHF; Mindestmietdauer meist 1-3 Monate</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Entsorgungsservice</td>
                      <td className="p-3">Altmobel-Entsorgung pro Stuck: 30-80 CHF; Komplette Raumung: Nach Umfang und Volumen</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="heading-2 mb-4">Tipps zum Sparen bei Umzugskosten</h2>
              <ul className="space-y-3 text-body">
                <li><strong>Mehrere Offerten vergleichen:</strong> Holen Sie mindestens 3-5 Umzugsofferten ein. Die Preisunterschiede zwischen Firmen konnen bei gleichem Leistungsumfang bis zu 50% betragen.</li>
                <li><strong>Flexibles Umzugsdatum wahlen:</strong> Meiden Sie die Hochsaison (Marz, April, September, Oktober) sowie Monatsenden. Unter der Woche ist oft gunstiger als am Wochenende.</li>
                <li><strong>Eigenleistung bei Verpackung:</strong> Packen Sie Kartons selbst - das spart den Einpackservice.</li>
                <li><strong>Fruhzeitig buchen:</strong> Wer 4-6 Wochen vor dem Umzugsdatum bucht, erhalt oft bessere Konditionen und mehr Auswahl bei den Terminen.</li>
                <li><strong>Unnotigen Hausrat aussortieren:</strong> Jedes Mobelstuck weniger bedeutet weniger Umzugsvolumen.</li>
                <li><strong>DIY Umzug fur kleine Haushalte prufen:</strong> Bei kleiner Wohnung und kurzer Distanz kann das gunstiger sein.</li>
              </ul>
            </section>

            <section>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-10 shadow-sm">
                <div className="mb-8">
                  <p className="text-sm font-semibold text-green-700 mb-2">Haufige Fragen</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Haufig gestellte Fragen zu Umzugskosten
                  </h2>
                  <p className="text-gray-600 mt-3">
                    Hier finden Sie die wichtigsten Antworten zu Preisen, Offerten und Vergleich.
                  </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={faq.question} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-semibold text-gray-900">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>

            <section className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h2 className="heading-2 mb-4">Jetzt kostenlose Umzugsofferten vergleichen</h2>
              <p className="text-body mb-4">
                Sie kennen nun alle wichtigen Faktoren, die den Preis Ihres Umzugs beeinflussen. Der nachste Schritt: <strong>Vergleichen Sie konkrete Offerten fur Ihre individuelle Wohnsituation.</strong>
              </p>
              <button
                type="button"
                onClick={openFormSection}
                className="inline-flex items-center rounded-lg bg-green-600 px-5 py-3 text-white font-semibold hover:bg-green-700 transition-colors mb-4"
              >
                Jetzt kostenlose Offerten anfordern
              </button>
              <ul className="list-disc pl-6 space-y-2 text-body">
                <li>Kostenlose und unverbindliche Anfrage</li>
                <li>Ausschliesslich qualitatsgeprufte Umzugsfirmen</li>
                <li>Auswahl aus mehreren Anbietern in Ihrer Region</li>
              </ul>
              <p className="text-body italic mt-4">Kein Risiko. Keine versteckten Kosten. Nur transparente Preise von seriosen Anbietern.</p>
              <p className="text-body font-semibold mt-2">Geprufte Umzugsfirmen | Schweizweites Netzwerk | Kostenloser Service</p>
            </section>
            </div>
          </div>
        </section>

        {/* Form Section - Opens when "Detaillierte Offerten anfordern" is clicked from hero */}
        {shouldOpenForm && (
          <section 
            id="moving-cost-calculator-section" 
            className="py-8 bg-white"
          >
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
              <MovingCostCalculator 
                key={`form-${shouldOpenForm}`}
                shouldOpenForm={true}
                onFormOpened={() => {
                  console.log('[Page] Form opened callback called - keeping form section open');
                  // Don't close the form section - let it stay open
                }}
                hideCalculator={true}
                hideInlineForm={false}
                onRequestQuote={() => {}}
              />
            </div>
          </section>
        )}

      </div>
    </>
  );
};

export default UmzugskostenRechnerPageClient;


