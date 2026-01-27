'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const PrivacyPolicyPageClient = () => {
  const pageTitle = "Datenschutzerklärung"
  const lastUpdated = "Zuletzt aktualisiert: 31. Dezember 2025"

  const sections = [
    {
      title: "1. Verantwortlicher",
      content: [
        "Verantwortlich für die Datenverarbeitung auf dieser Website ist:",
        "Online-Offerten.ch<br>E-Mail: info@online-offerten.ch",
        "",
        "Es wurde kein Datenschutzbeauftragter benannt, da dies gesetzlich nicht erforderlich ist. Für datenschutzrechtliche Fragen können Sie uns jederzeit über die oben genannten Kontaktdaten erreichen."
      ]
    },
    {
      title: "2. Nutzung unserer Website",
      content: [
        "Durch die Nutzung unserer Website erklären Sie sich mit dieser Datenschutzerklärung einverstanden. Zur Verbesserung der Funktionalität und Nutzerfreundlichkeit sammeln wir allgemeine Informationen über Besuche auf unserer Website, wie z. B. Browsertyp oder Zugriffszeitpunkte.",
        "",
        "Wir verwenden Cookies, um bestimmte Funktionen zu ermöglichen und Ihre Erfahrung zu optimieren. Cookies können jederzeit in Ihrem Browser gelöscht oder blockiert werden. Eine eingeschränkte Nutzung kann die Funktionalität der Website beeinflussen."
      ]
    },
    {
      title: "3. Angebotsanfragen",
      content: [
        "Wenn Sie über ein Formular oder per E-Mail Kontakt aufnehmen, geben Sie personenbezogene Daten an (z. B. Name, E-Mail, Telefonnummer, Projektdetails). Diese Daten werden ausschliesslich zur Bearbeitung Ihrer Anfrage verwendet.",
        "",
        "Sie können auswählen, wie viele Offerten Sie erhalten möchten (2–6). Ihre Daten werden dann entsprechend an die ausgewählten Partnerfirmen in Ihrer Region weitergeleitet, damit diese Ihnen individuelle Angebote erstellen und direkt Kontakt aufnehmen können.",
        "",
        "Die Weitergabe erfolgt nur für diesen Zweck. Online-Offerten.ch selbst erbringt keine Dienstleistungen."
      ]
    },
    {
      title: "4. Datensicherheit",
      content: [
        "Wir treffen angemessene technische und organisatorische Massnahmen, um Ihre Daten vor Verlust, unberechtigtem Zugriff oder unrechtmässiger Verwendung zu schützen.",
        "",
        "Alle Datenübertragungen erfolgen verschlüsselt per SSL/TLS."
      ]
    },
    {
      title: "5. Serverstandort",
      content: [
        "Unsere Server befinden sich in der Schweiz (z. B. Infomaniak) und in der EU (z. B. Frankfurt). Wir verwenden keine Server von Amazon, Microsoft oder Google für die Speicherung personenbezogener Daten."
      ]
    },
    {
      title: "6. Webanalysedienste",
      content: [
        "Wir verwenden IP-anonymisierte Webanalysen, z. B.:<br>Google Analytics: <a href='https://www.google.com/intl/de/policies/technologies/' target='_blank' rel='noopener noreferrer'>https://www.google.com/intl/de/policies/technologies/</a>",
        "",
        "Persönliche Daten werden nicht zurückverfolgt und nicht für individuelle Nachforschungen genutzt. Nutzer können Google Analytics über das Browser-Addon deaktivieren."
      ]
    },
    {
      title: "7. Ihre Rechte",
      content: [
        "Sie haben jederzeit das Recht auf:",
        "• Auskunft über gespeicherte personenbezogene Daten<br>• Berichtigung unrichtiger Daten<br>• Löschung Ihrer Daten<br>• Einschränkung der Verarbeitung<br>• Datenübertragbarkeit<br>• Widerruf einer erteilten Einwilligung<br>• Widerspruch gegen die Verarbeitung",
        "",
        "Beschwerden können Sie an uns (info@online-offerten.ch) oder an den Eidgenössischen Öffentlichkeits- und Datenschutzbeauftragten (EDÖB) richten: <a href='https://www.edoeb.admin.ch' target='_blank' rel='noopener noreferrer'>https://www.edoeb.admin.ch</a>"
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
          <CardContent className="prose prose-slate max-w-none prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-p:leading-relaxed prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4">
            {sections.map((section, index) => (
              <div key={index}>
                <h2>{section.title}</h2>
                {Array.isArray(section.content) ? (
                  section.content.map((paragraph, pIndex) => {
                    if (!paragraph) return <br key={pIndex} />
                    return <p key={pIndex} dangerouslySetInnerHTML={{ __html: paragraph }} />
                  })
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

export default PrivacyPolicyPageClient

