'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const TermsAndConditionsPageClient = () => {
  const pageTitle = "Allgemeine Geschäftsbedingungen (AGB) für Partnerfirmen"
  const lastUpdated = "Zuletzt aktualisiert: 31. Dezember 2025"

  const sections = [
    {
      title: '1. Geltungsbereich',
      content: [
        'Diese Allgemeinen Geschäftsbedingungen (AGB) regeln die vertraglichen Beziehungen zwischen Online-Offerten.ch (nachfolgend „Plattform“) und den auf der Plattform registrierten Partnerfirmen (nachfolgend „Partner“) für die Vermittlung von Kundenanfragen (Leads) im Bereich Umzug, Reinigung, Maler- und Räumungsservices in der Schweiz.',
      ],
    },
    {
      title: '2. Leistungen der Plattform',
      content: [
        'Die Plattform betreibt eine Online-Vermittlungsplattform, auf der Privat- und Geschäftskunden (nachfolgend „Kunden“) Anfragen für Dienstleistungen einstellen können.',
        '',
        'Die Plattform leitet Anfragen an registrierte Partner weiter. Ein Anspruch auf eine bestimmte Anzahl oder Qualität von Anfragen besteht nicht.',
        '',
        'Ein Vertragsabschluss zwischen Partner und Kunde ist nicht garantiert. Die Plattform ist zu keinem Zeitpunkt Vertragspartei.',
      ],
    },
    {
      title: '3. Registrierung und Pflichten des Partners',
      content: [
        '<strong>3.1 Registrierung</strong><br>Die Registrierung als Partner erfordert die wahrheitsgemässe und vollständige Angabe aller geforderten Informationen.',
        '',
        '<strong>3.2 Pflichten des Partners</strong><br>• Der Partner verpflichtet sich, alle Angaben zu Dienstleistungen, Tätigkeitsgebieten und Kontaktdaten aktuell zu halten.<br>• Der Partner sichert zu, über alle erforderlichen Bewilligungen, Versicherungen (z. B. Betriebshaftpflichtversicherung) und Qualifikationen zur Ausführung der angebotenen Dienstleistungen zu verfügen.<br>• Partner verpflichten sich, Kundenanfragen sorgfältig und professionell zu bearbeiten.<br>• Kundendaten sind vertraulich zu behandeln und dürfen ausschliesslich zur Erstellung eines Angebots verwendet werden.<br>• Eine Weitergabe der Daten an Dritte ist untersagt.<br>• Bei Verstoss gegen diese Pflichten behält sich die Plattform vor, den Partner zu sperren oder die Partnerschaft fristlos zu kündigen.',
      ],
    },
    {
      title: '4. Umgang mit Anfragen und Angebotsabgabe',
      content: [
        '• Die Weiterleitung einer Anfrage stellt keine verbindliche Offerte dar.<br>• Der Partner entscheidet eigenständig, ob er auf eine Anfrage ein Angebot unterbreitet.<br>• Partner sind angehalten, Kundenanfragen zeitnah zu bearbeiten und den Kunden zeitnah zu kontaktieren.<br>• Die Preisgestaltung, Vertragsbedingungen und Ausführung der Dienstleistung liegen ausschliesslich in der Verantwortung des Partners.<br>• Die Plattform übernimmt keine Garantie für den Abschluss von Aufträgen oder den wirtschaftlichen Erfolg der vermittelten Anfragen.<br>• Kundendaten dürfen nur zur einmaligen Kontaktaufnahme und Angebotsabgabe verwendet werden.',
      ],
    },
    {
      title: '5. Vergütung',
      content: [
        '• Die Registrierung auf der Plattform ist kostenlos.<br>• Für den Erwerb von Anfragen (Leads) können Kosten anfallen. Die Höhe der Kosten wird vor dem Erwerb transparent angezeigt.<br>• Mit dem Erwerb eines Leads akzeptiert der Partner die entsprechenden Gebühren.<br>• Erfolgt ein Vertragsabschluss zwischen Partner und Kunde, fallen keine weiteren Provisionen oder Gebühren für die Plattform an.<br>• Zahlungsmodalitäten erfolgen über Guthaben, Rechnung oder elektronische Zahlungsmethoden gemäss den Einstellungen im Partnerkonto.',
      ],
    },
    {
      title: '6. Rückerstattung',
      content: [
        'Ein Anspruch auf Rückerstattung besteht grundsätzlich nicht.',
        '',
        'In begründeten Einzelfällen (z. B. nachweislich falsche oder nicht erreichbare Kontaktdaten) kann die Plattform nach eigenem Ermessen eine Gutschrift gewähren.',
      ],
    },
    {
      title: '7. Haftung',
      content: [
        '• Die Plattform haftet nicht für die Richtigkeit oder Vollständigkeit der Kundendaten.<br>• Jegliche Haftung für Schäden, die aus Vertragsverhältnissen zwischen Partner und Kunde entstehen, ist ausgeschlossen, ausser bei vorsätzlichem oder grob fahrlässigem Verhalten.<br>• Eine Haftung für indirekte Schäden, Folgeschäden oder entgangenen Gewinn ist ausgeschlossen.',
      ],
    },
    {
      title: '8. Datenschutz',
      content: [
        '• Der Umgang mit personenbezogenen Daten richtet sich nach der Datenschutzerklärung der Plattform; diese ist integraler Bestandteil dieser AGB.<br>• Partner verpflichten sich, die Vorgaben des Schweizer Datenschutzgesetzes (DSG) einzuhalten.<br>• Kundendaten dürfen nicht weiterverkauft oder für andere Zwecke verwendet werden.<br>• Nach Abschluss der Anfrage oder bei Nichtzustandekommen eines Angebots sind die Daten nach angemessener Frist zu löschen.',
      ],
    },
    {
      title: '9. Vertragsdauer und Kündigung',
      content: [
        '• Die Partnerschaft wird auf unbestimmte Zeit geschlossen.<br>• Eine Kündigung ist jederzeit per E-Mail möglich.<br>• Bei Verstössen gegen diese AGB oder bei missbräuchlicher Nutzung behält sich die Plattform vor, Partner jederzeit zu sperren oder fristlos zu kündigen.',
      ],
    },
    {
      title: '10. Gerichtsstand und anwendbares Recht',
      content: [
        '• Es gilt ausschliesslich Schweizer Recht.<br>• Gerichtsstand ist Zürich, Schweiz.<br>• Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Gültigkeit der übrigen Bestimmungen unberührt.',
      ],
    },
    {
      title: '11. Schlussbestimmungen',
      content: [
        '• Änderungen dieser AGB werden den Partnern mitgeteilt und gelten als akzeptiert, sofern nicht innerhalb von 14 Tagen schriftlich widersprochen wird.<br>• Diese AGB gelten auch für zukünftige Dienstleistungen der Plattform.',
      ],
    },
  ]

  return (
    <div className="bg-slate-50 py-12 md:py-20">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <Card className="shadow-lg">
          <CardHeader className="p-0 px-4 pt-6 pb-3 md:px-6">
            <CardTitle className="text-xl font-bold leading-snug tracking-tight text-slate-900 sm:text-2xl">
              {pageTitle}
            </CardTitle>
            <p className="text-sm md:text-base text-slate-500">{lastUpdated}</p>
          </CardHeader>
          <CardContent className="max-w-none border-0 p-0 px-4 pb-8 pt-0 md:px-6 [&_a]:text-base [&_a]:font-normal [&_a]:text-green-700 [&_a]:underline-offset-2 hover:[&_a]:underline [&_strong]:font-semibold [&_strong]:text-slate-900">
            {sections.map((section, index) => (
              <section
                key={index}
                className="scroll-mt-24 border-b border-slate-100 py-8 first:pt-2 last:border-b-0 last:pb-2"
              >
                <h2 className="mb-5 border-b border-slate-200 pb-3 text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                  {section.title}
                </h2>
                <div className="space-y-4 text-base font-normal leading-relaxed text-slate-700">
                  {Array.isArray(section.content) ? (
                    section.content.map((paragraph, pIndex) => {
                      if (!paragraph?.trim()) {
                        return <div key={pIndex} className="h-2 shrink-0" aria-hidden />
                      }
                      return (
                        <p
                          key={pIndex}
                          className="break-words [overflow-wrap:anywhere]"
                          dangerouslySetInnerHTML={{ __html: paragraph }}
                        />
                      )
                    })
                  ) : (
                    <p
                      className="break-words [overflow-wrap:anywhere]"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  )}
                </div>
              </section>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TermsAndConditionsPageClient



