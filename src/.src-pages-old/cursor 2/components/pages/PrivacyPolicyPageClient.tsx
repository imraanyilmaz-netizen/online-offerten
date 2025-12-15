'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const PrivacyPolicyPageClient = () => {
  const pageTitle = "Datenschutzerklärung"
  const lastUpdated = "Zuletzt aktualisiert: 20. Juni 2025"

  const sections = [
    {
      title: "1. Verantwortlicher",
      content: [
        "Verantwortlich für die Datenverarbeitung auf dieser Website ist:",
        "Online-Offerten.ch",
        "E-Mail: info@online-offerten.ch",
        "Wir haben für unser Unternehmen keinen Datenschutzbeauftragten benannt, da dies gesetzlich nicht erforderlich ist. Bei datenschutzrechtlichen Anliegen können Sie uns direkt über die oben genannten Kontaktdaten erreichen."
      ]
    },
    {
      title: "2. Erfassung allgemeiner Daten und Informationen (Server-Logfiles)",
      content: [
        "Unsere Website erfasst mit jedem Aufruf eine Reihe von allgemeinen Daten und Informationen. Diese werden in den Logfiles des Servers gespeichert. Erfasst werden können:",
        "• Der verwendete Browsertyp und die Version",
        "• Das vom zugreifenden System verwendete Betriebssystem",
        "• Die Webseite, von welcher ein zugreifendes System auf unsere Webseite gelangt (sogenannte Referrer)",
        "• Die Unterwebseiten, welche über ein zugreifendes System auf unserer Webseite angesteuert werden",
        "• Das Datum und die Uhrzeit eines Zugriffs auf die Internetseite",
        "• Eine Internet-Protokoll-Adresse (IP-Adresse)",
        "• Der Internet-Service-Provider des zugreifenden Systems",
        "Diese Daten sind erforderlich, um die Inhalte unserer Website korrekt auszuliefern, die Inhalte unserer Website sowie die Werbung für diese zu optimieren, die dauerhafte Funktionsfähigkeit unserer IT-Systeme und der Technik unserer Website zu gewährleisten sowie um Strafverfolgungsbehörden im Falle eines Cyberangriffes die notwendigen Informationen bereitzustellen."
      ]
    },
    {
      title: "3. Kontaktaufnahme (Angebots- und Partnerformulare)",
      content: [
        "Wenn Sie per Formular auf der Website oder per E-Mail Kontakt mit uns aufnehmen, werden Ihre angegebenen Daten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Im Falle des Angebotsformulars werden die relevanten Daten zur Erstellung von Offerten anonymisiert an unsere ausgewählten Partnerfirmen weitergeleitet. Ihre persönlichen Kontaktdaten werden nur an jene Partnerfirmen übermittelt, deren Offerten Sie explizit anfordern oder die Sie für eine Kontaktaufnahme auswählen."
      ]
    },
    {
      title: "4. Verwendung von Cookies",
      content: [
        "Unsere Webseite verwendet so genannte Cookies. Dabei handelt es sich um kleine Textdateien, die mit Hilfe des Browsers auf Ihrem Endgerät abgelegt werden. Sie richten keinen Schaden an.",
        "Wir nutzen Cookies dazu, unser Angebot nutzerfreundlich zu gestalten. Einige Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese löschen. Sie ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.",
        "Wenn Sie dies nicht wünschen, so können Sie Ihren Browser so einrichten, dass er Sie über das Setzen von Cookies informiert und Sie dies nur im Einzelfall erlauben. Bei der Deaktivierung von Cookies kann die Funktionalität unserer Website eingeschränkt sein."
      ]
    },
    {
      title: "5. Drittanbieter-Dienste",
      content: [
        "**Supabase:** Für die Datenspeicherung und Authentifizierung nutzen wir die Dienste von Supabase Inc., 970 Toa Payoh North #07-04, Singapore 318992. Supabase agiert als unser Auftragsdatenverarbeiter und speichert Daten auf Servern in der EU (Frankfurt). Weitere Informationen finden Sie in der Datenschutzerklärung von Supabase: https://supabase.com/privacy",
        "**Adressen-Vervollständigung (Komoot):** Für die automatische Vervollständigung von Adressen in unseren Formularen nutzen wir den Dienst Photon von Komoot GmbH, Friedrich-S-Pauly-Straße 15, 14469 Potsdam, Deutschland. Dieser Dienst basiert auf Daten von OpenStreetMap. Bei der Eingabe einer Adresse werden Daten an Komoot zur Verarbeitung gesendet. Details finden Sie in der Datenschutzerklärung von Komoot: https://www.komoot.com/privacy"
      ]
    },
    {
      title: "6. Ihre Rechte",
      content: [
        "Ihnen stehen bezüglich Ihrer bei uns gespeicherten Daten grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu. Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstösst oder Ihre datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind, können Sie sich bei uns (info@online-offerten.ch) oder der zuständigen Aufsichtsbehörde beschweren. In der Schweiz ist dies der Eidgenössische Öffentlichkeits- und Datenschutzbeauftragte (EDÖB)."
      ]
    },
    {
      title: "7. Datensicherheit",
      content: [
        "Wir treffen angemessene technische und organisatorische Sicherheitsvorkehrungen, um Ihre Daten gegen unbeabsichtigte oder unrechtmässige Löschung, Veränderung oder gegen Verlust und gegen unberechtigte Weitergabe oder unberechtigten Zugriff zu schützen. Unsere Website verwendet aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel der Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL-bzw. TLS-Verschlüsselung."
      ]
    },
    {
      title: "8. Änderungen dieser Datenschutzerklärung",
      content: [
        "Wir können diese Datenschutzerklärung jederzeit ohne Vorankündigung anpassen. Es gilt die jeweils aktuelle, auf unserer Website publizierte Fassung."
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

export default PrivacyPolicyPageClient

