'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const TermsAndConditionsPageClient = () => {
  const pageTitle = "Allgemeine Geschäftsbedingungen (AGB) für Partnerfirmen"
  const lastUpdated = "Zuletzt aktualisiert: 20. Juni 2025"

  const sections = [
    {
      title: "1. Geltungsbereich",
      content: [
        "Diese Allgemeinen Geschäftsbedingungen (AGB) regeln die vertraglichen Beziehungen zwischen Online-Offerten.ch (nachfolgend \"Plattform\") und den auf der Plattform registrierten Partnerfirmen (nachfolgend \"Partner\") für die Vermittlung von Kundenanfragen (Leads) im Bereich Umzug und damit verbundenen Dienstleistungen in der Schweiz."
      ]
    },
    {
      title: "2. Leistungen der Plattform",
      content: [
        "Die Plattform betreibt eine Online-Vermittlungsplattform, auf der Privat- und Geschäftskunden (nachfolgend \"Kunden\") Anfragen für Umzüge und verwandte Dienstleistungen einstellen können.",
        "Die Plattform leitet qualifizierte Anfragen an registrierte und geprüfte Partner weiter. Die Plattform schuldet keinen Erfolg in Form eines Vertragsabschlusses zwischen dem Partner und dem Kunden.",
        "Die Auswahl der Partner, an die eine Anfrage weitergeleitet wird, erfolgt auf Basis der vom Partner angegebenen Dienstleistungen und regionalen Tätigkeitsgebiete."
      ]
    },
    {
      title: "3. Registrierung und Pflichten des Partners",
      content: [
        "Die Registrierung als Partner erfordert die wahrheitsgemässe und vollständige Angabe der im Registrierungsformular geforderten Informationen.",
        "Der Partner verpflichtet sich, alle Angaben, insbesondere zu angebotenen Dienstleistungen, Tätigkeitsgebieten und Kontaktdaten, stets aktuell zu halten.",
        "Der Partner sichert zu, über alle notwendigen Bewilligungen, Versicherungen (insb. eine gültige Betriebshaftpflichtversicherung) und Qualifikationen zur Ausführung der angebotenen Dienstleistungen zu verfügen.",
        "Der Partner verpflichtet sich, die erhaltenen Kundendaten vertraulich zu behandeln und ausschliesslich zur Erstellung einer Offerte für die angefragte Dienstleistung zu verwenden. Eine Weitergabe der Daten an Dritte ist untersagt."
      ]
    },
    {
      title: "4. Umgang mit Anfragen und Vertragsabschluss",
      content: [
        "Die Weiterleitung einer Anfrage durch die Plattform stellt keine verbindliche Offerte dar.",
        "Der Partner entscheidet eigenständig, ob er auf eine Anfrage eine Offerte unterbreiten möchte.",
        "Der Vertrag über die auszuführende Dienstleistung kommt ausschliesslich und direkt zwischen dem Partner und dem Kunden zustande. Die Plattform ist zu keinem Zeitpunkt Vertragspartei dieses Vertrags.",
        "Die Preisgestaltung, die Vertragsbedingungen und die Ausführung der Dienstleistung liegen in der alleinigen Verantwortung des Partners."
      ]
    },
    {
      title: "5. Vergütung",
      content: [
        "Die Registrierung auf der Plattform ist kostenlos. Für die Vermittlung von qualifizierten Anfragen können Gebühren anfallen. Die genauen Konditionen und Preise werden dem Partner separat mitgeteilt und bedürfen seiner Zustimmung vor dem Kauf von Anfragen.",
        "Es fallen keine Provisionen oder sonstigen Gebühren bei einem erfolgreichen Vertragsabschluss zwischen Partner und Kunde an."
      ]
    },
    {
      title: "6. Haftung",
      content: [
        "Die Plattform haftet nicht für die Richtigkeit und Vollständigkeit der von Kunden gemachten Angaben in den Anfragen.",
        "Jegliche Haftung der Plattform für Schäden, die aus dem Vertragsverhältnis zwischen dem Partner und dem Kunden entstehen, ist ausgeschlossen. Dies betrifft insbesondere, aber nicht ausschliesslich, Mängel bei der Leistungserbringung, Zahlungsausfälle oder sonstige Streitigkeiten.",
        "Die Plattform haftet nur für direkte Schäden, die durch vorsätzliches oder grob fahrlässiges Verhalten der eigenen Organe verursacht wurden. Die Haftung für leichte Fahrlässigkeit sowie für indirekte Schäden und Folgeschäden wird vollumfänglich ausgeschlossen."
      ]
    },
    {
      title: "7. Datenschutz",
      content: [
        "Der Umgang mit Personendaten ist in unserer separaten Datenschutzerklärung geregelt, welche einen integralen Bestandteil dieser AGB bildet. Der Partner verpflichtet sich, die Bestimmungen des Schweizer Datenschutzgesetzes (DSG) einzuhalten."
      ]
    },
    {
      title: "8. Vertragsdauer und Kündigung",
      content: [
        "Die Partnerschaft wird auf unbestimmte Zeit geschlossen. Sie kann von beiden Parteien jederzeit ohne Angabe von Gründen schriftlich (per E-Mail ausreichend) gekündigt werden.",
        "Die Plattform behält sich das Recht vor, Partner bei Verstössen gegen diese AGB, bei negativen Kundenbewertungen oder aus anderen wichtigen Gründen mit sofortiger Wirkung zu sperren oder zu kündigen."
      ]
    },
    {
      title: "9. Schlussbestimmungen",
      content: [
        "Die Plattform behält sich das Recht vor, diese AGB jederzeit zu ändern. Änderungen werden dem Partner in geeigneter Form mitgeteilt und gelten als genehmigt, wenn der Partner nicht innert 14 Tagen widerspricht.",
        "Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
        "Es gilt ausschliesslich Schweizer Recht. Gerichtsstand ist Zürich, Schweiz."
      ]
    }
  ]

  return (
    <div className="bg-slate-50 py-12 md:py-20">
      <div className="container mx-auto max-w-navbar px-4 md:px-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-bold text-slate-800">
              {pageTitle}
            </CardTitle>
            <p className="text-sm text-slate-500">{lastUpdated}</p>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-p:leading-relaxed prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline prose-ul:list-disc prose-ul:pl-6">
            {sections.map((section, index) => (
              <div key={index}>
                <h2>{section.title}</h2>
                {Array.isArray(section.content) ? (
                  section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} dangerouslySetInnerHTML={{ __html: paragraph }} />
                  ))
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: section.content }} />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TermsAndConditionsPageClient

