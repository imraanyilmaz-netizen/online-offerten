'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const TermsAndConditionsPageClient = () => {
  const pageTitle = "Allgemeine Geschäftsbedingungen (AGB) für Partnerfirmen"
  const lastUpdated = "Zuletzt aktualisiert: 31. Dezember 2025"

  const sections = [
    {
      title: "1. Geltungsbereich",
      content: [
        "Diese Allgemeinen Geschäftsbedingungen (AGB) regeln die vertraglichen Beziehungen zwischen Online-Offerten.ch (nachfolgend \"Plattform\") und den auf der Plattform registrierten Partnerfirmen (nachfolgend \"Partner\") für die Vermittlung von Kundenanfragen (Leads) im Bereich Umzug, Reinigung, Maler- und Räumungsservices in der Schweiz."
      ]
    },
    {
      title: "2. Leistungen der Plattform",
      content: [
        "Die Plattform betreibt eine Online-Vermittlungsplattform, auf der Privat- und Geschäftskunden (nachfolgend \"Kunden\") Anfragen für Dienstleistungen einstellen können. Die Plattform leitet qualifizierte Anfragen an registrierte und geprüfte Partner weiter. Ein Vertragsabschluss zwischen Partner und Kunde ist nicht garantiert. Die Plattform ist zu keinem Zeitpunkt Vertragspartei."
      ]
    },
    {
      title: "3. Registrierung und Pflichten des Partners",
      content: [
        "<strong>3.1 Registrierung</strong><br>Die Registrierung als Partner erfordert die wahrheitsgemässe und vollständige Angabe aller geforderten Informationen.",
        "",
        "<strong>3.2 Pflichten des Partners</strong><br>• Der Partner verpflichtet sich, alle Angaben zu Dienstleistungen, Tätigkeitsgebieten und Kontaktdaten aktuell zu halten.<br>• Der Partner sichert zu, über alle erforderlichen Bewilligungen, Versicherungen (z. B. Betriebshaftpflichtversicherung) und Qualifikationen zur Ausführung der angebotenen Dienstleistungen zu verfügen.<br>• Partner müssen die erhaltenen Kundendaten vertraulich behandeln und ausschliesslich zur Erstellung eines Angebots verwenden.<br>• Weitergabe der Daten an Dritte ist untersagt.<br>• Bei Verstoss gegen diese Pflichten behält sich die Plattform vor, den Partner zu sperren oder die Partnerschaft zu kündigen."
      ]
    },
    {
      title: "4. Umgang mit Anfragen und Angebotsabgabe",
      content: [
        "• Die Weiterleitung einer Anfrage stellt keine verbindliche Offerte dar.<br>• Der Partner entscheidet eigenständig, ob er auf eine Anfrage ein Angebot unterbreitet.<br>• Die Preisgestaltung, Vertragsbedingungen und Ausführung der Dienstleistung liegen in der Verantwortung des Partners.<br>• Die Plattform vermittelt nur; es gibt keine Garantie für Auftragsabschluss.<br>• Partner müssen Kunden innerhalb von 24 Stunden kontaktieren, wenn nötig eine Begehung durchführen und Angebote fristgerecht erstellen.<br>• Kundendaten dürfen nur einmalig für die Angebotsabgabe verwendet werden."
      ]
    },
    {
      title: "5. Vergütung",
      content: [
        "• Registrierung auf der Plattform ist kostenlos.<br>• Für die Vermittlung qualifizierter Anfragen können Gebühren anfallen, die vorab kommuniziert und genehmigt werden müssen.<br>• Erfolgt ein Vertragsabschluss zwischen Partner und Kunde, fallen keine weiteren Provisionen oder Gebühren für die Plattform an.<br>• Zahlungsmodalitäten: Guthaben, Rechnung, Kreditkarte/Lastschrift. Die Abrechnung erfolgt monatlich oder wöchentlich gemäss Einstellung im Backend."
      ]
    },
    {
      title: "6. Haftung",
      content: [
        "• Die Plattform haftet nicht für Richtigkeit oder Vollständigkeit der Kundendaten.<br>• Jegliche Haftung für Schäden, die aus Vertragsverhältnissen zwischen Partner und Kunde entstehen, ist ausgeschlossen, ausser bei vorsätzlichem oder grob fahrlässigem Verhalten.<br>• Leichte Fahrlässigkeit, indirekte Schäden und Folgeschäden sind ausgeschlossen."
      ]
    },
    {
      title: "7. Datenschutz",
      content: [
        "• Der Umgang mit personenbezogenen Daten richtet sich nach unserer Datenschutzerklärung, die integraler Bestandteil dieser AGB ist.<br>• Partner verpflichten sich, die Vorgaben des Schweizer Datenschutzgesetzes (DSG) einzuhalten.<br>• Kundendaten dürfen nicht weiterverkauft oder für andere Zwecke verwendet werden.<br>• Nach Auftragserfüllung oder bei nicht erfolgter Angebotsabgabe werden Kundendaten innerhalb eines angemessenen Zeitraums gelöscht."
      ]
    },
    {
      title: "8. Vertragsdauer und Kündigung",
      content: [
        "• Die Partnerschaft wird auf unbestimmte Zeit geschlossen.<br>• Kündigung jederzeit schriftlich per E-Mail möglich.<br>• Bei Verstössen gegen AGB oder negativer Bewertung kann die Plattform Partner sofort sperren oder kündigen."
      ]
    },
    {
      title: "9. Gerichtsstand und anwendbares Recht",
      content: [
        "• Ausschliesslich Schweizer Recht ist anwendbar.<br>• Gerichtsstand für alle Streitigkeiten ist Zürich, Schweiz.<br>• Sollten einzelne Bestimmungen unwirksam sein, bleibt die Gültigkeit der übrigen Bestimmungen unberührt."
      ]
    },
    {
      title: "10. Schlussbestimmungen",
      content: [
        "• Änderungen der AGB werden den Partnern mitgeteilt und gelten als genehmigt, wenn nicht innerhalb von 14 Tagen Widerspruch erfolgt.<br>• Diese AGB gelten auch für zukünftige Dienstleistungen, selbst wenn sie nicht explizit in jedem Einzelfall beigefügt sind."
      ]
    }
  ]

  return (
    <div className="bg-slate-50 py-12 md:py-20">
      <div className="container mx-auto max-w-navbar px-4 md:px-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="heading-2">
              {pageTitle}
            </CardTitle>
            <p className="text-sm text-slate-500">{lastUpdated}</p>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-4 prose-h2:mt-8 prose-h2:pb-2 prose-h2:border-b prose-p:leading-relaxed prose-p:mb-4 prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline prose-ul:list-disc prose-ul:pl-6">
            {sections.map((section, index) => (
              <div key={index} className={index > 0 ? "mt-10" : "mt-6"}>
                <h2>{section.title}</h2>
                {Array.isArray(section.content) ? (
                  section.content.map((paragraph, pIndex) => {
                    if (!paragraph) return <br key={pIndex} className="mb-4" />
                    return <p key={pIndex} className="mb-4" dangerouslySetInnerHTML={{ __html: paragraph }} />
                  })
                ) : (
                  <p className="mb-4" dangerouslySetInnerHTML={{ __html: section.content }} />
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

