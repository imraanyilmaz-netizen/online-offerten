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
        "<strong>Yilmaz Platform Solutions</strong><br>Kreuzstrasse 16<br>8953 Dietikon<br>Schweiz<br>UID: CHE-234.206.612<br>E-Mail: <a href=\"mailto:info@online-offerten.ch\">info@online-offerten.ch</a>",
        "",
        "Die Plattform <strong>Online-Offerten.ch</strong> wird im Rahmen dieser Firma betrieben. Online-Offerten.ch ist eine Vermittlungsplattform und erbringt selbst keine Umzugs-, Reinigungs- oder Transportdienstleistungen."
      ]
    },
    {
      title: "2. Erhebung und Verarbeitung personenbezogener Daten",
      content: [
        "Wir erheben personenbezogene Daten, wenn Sie:",
        "• eine Anfrage über unser Formular stellen<br>• uns per E-Mail kontaktieren<br>• unsere Website besuchen",
        "",
        "Zu den erhobenen Daten gehören insbesondere:",
        "• Name<br>• Telefonnummer<br>• E-Mail-Adresse<br>• Umzugs- oder Projektdetails<br>• Adressangaben",
        "",
        "Diese Daten werden ausschliesslich zum Zweck der Vermittlung geeigneter Partnerfirmen verarbeitet."
      ]
    },
    {
      title: "3. Weitergabe an Partnerfirmen",
      content: [
        "Als Vermittlungsplattform leiten wir Ihre Anfrage an ausgewählte Partnerfirmen in Ihrer Region weiter.",
        "",
        "Die Weitergabe erfolgt ausschliesslich zum Zweck der Angebotserstellung und direkten Kontaktaufnahme durch die Partnerfirma.",
        "",
        "Mit der Nutzung unseres Formulars erklären Sie sich ausdrücklich mit dieser Datenweitergabe einverstanden.",
        "",
        "Online-Offerten.ch wird nicht Vertragspartei zwischen Kunde und Partnerfirma."
      ]
    },
    {
      title: "4. Rechtsgrundlage",
      content: [
        "Die Verarbeitung Ihrer Daten erfolgt:",
        "",
        "• zur Vertragserfüllung<br>• aufgrund Ihrer Einwilligung<br>• zur Wahrung berechtigter Interessen im Rahmen der Vermittlung"
      ]
    },
    {
      title: "5. Speicherdauer",
      content: [
        "Personenbezogene Daten werden nur so lange gespeichert, wie dies für den Vermittlungszweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen."
      ]
    },
    {
      title: "6. Serverstandort und Datensicherheit",
      content: [
        "Unsere Server befinden sich in der Schweiz und innerhalb der EU.",
        "",
        "Die Datenübertragung erfolgt verschlüsselt (SSL/TLS).",
        "",
        "Wir treffen angemessene technische und organisatorische Massnahmen zum Schutz Ihrer Daten."
      ]
    },
    {
      title: "7. Zahlungsabwicklung",
      content: [
        "Falls Zahlungen über externe Zahlungsdienstleister (z. B. Stripe) erfolgen, werden Zahlungsdaten direkt durch den jeweiligen Anbieter verarbeitet.",
        "",
        "Es gelten die Datenschutzbestimmungen des jeweiligen Zahlungsdienstleisters."
      ]
    },
    {
      title: "8. Webanalyse",
      content: [
        "Wir verwenden Webanalyse-Tools (z. B. Google Analytics mit IP-Anonymisierung), um die Nutzung unserer Website statistisch auszuwerten.",
        "",
        "Die Nutzung erfolgt nur im Rahmen der geltenden gesetzlichen Bestimmungen.",
        "",
        "Sie können die Erfassung über entsprechende Browser-Add-ons deaktivieren."
      ]
    },
    {
      title: "9. Einsatz von Drittanbietern",
      content: [
        "Zur technischen Bereitstellung unserer Plattform sowie zur Zahlungsabwicklung und Analyse setzen wir externe Dienstleister ein (z. B. Hosting-Anbieter, Zahlungsdienstleister wie Stripe oder Analyse-Dienste wie Google).",
        "",
        "Diese Anbieter verarbeiten personenbezogene Daten gemäss ihren eigenen Datenschutzbestimmungen."
      ]
    },
    {
      title: "10. Datenübermittlung ins Ausland",
      content: [
        "Im Rahmen der Nutzung externer Dienstleister kann es zu Datenübermittlungen in Länder ausserhalb der Schweiz oder der EU kommen.",
        "",
        "In solchen Fällen erfolgt die Bearbeitung nur unter Einhaltung der geltenden datenschutzrechtlichen Vorgaben. Soweit erforderlich, werden geeignete Garantien eingesetzt (z. B. vertragliche Schutzmechanismen wie Standardvertragsklauseln), um ein angemessenes Datenschutzniveau sicherzustellen."
      ]
    },
    {
      title: "11. Ihre Rechte",
      content: [
        "Sie haben im Rahmen der anwendbaren Datenschutzgesetze insbesondere folgende Rechte:",
        "",
        "• Auskunft über die Bearbeitung Ihrer personenbezogenen Daten<br>• Berichtigung unrichtiger Daten<br>• Löschung Ihrer Daten, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen<br>• Einschränkung der Bearbeitung<br>• Widerspruch gegen bestimmte Bearbeitungen<br>• Herausgabe bzw. Übertragbarkeit Ihrer Daten, soweit gesetzlich vorgesehen<br>• Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft",
        "",
        "Zur Ausübung Ihrer Rechte können Sie uns jederzeit unter info@online-offerten.ch kontaktieren.",
        "",
        "Wenn Sie der Ansicht sind, dass die Bearbeitung Ihrer Daten gegen geltendes Datenschutzrecht verstösst, können Sie zudem eine Beschwerde bei der zuständigen Datenschutzaufsichtsbehörde einreichen."
      ]
    }
  ]

  return (
    <div className="bg-slate-50 dark:bg-background py-12 md:py-20">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <Card className="shadow-lg border-border bg-card">
          <CardHeader className="p-0 px-4 pt-6 pb-3 md:px-6">
            <CardTitle className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              {pageTitle}
            </CardTitle>
            <p className="text-sm md:text-base text-muted-foreground">{lastUpdated}</p>
          </CardHeader>
          <CardContent className="max-w-none border-0 p-0 px-4 pb-8 pt-0 md:px-6 [&_a]:text-base [&_a]:font-normal [&_a]:text-green-700 dark:[&_a]:text-emerald-400 [&_a]:underline-offset-2 hover:[&_a]:underline [&_strong]:font-semibold [&_strong]:text-foreground">
            {sections.map((section, index) => {
              const blocks = Array.isArray(section.content)
                ? section.content.filter((p) => p && p.trim() !== '')
                : [section.content]
              return (
                <section
                  key={index}
                  className="scroll-mt-24 border-b border-border py-8 first:pt-2 last:border-b-0 last:pb-2"
                >
                  <h2 className="mb-5 border-b border-border pb-3 text-xl font-bold tracking-tight text-foreground md:text-2xl">
                    {section.title}
                  </h2>
                  <div className="space-y-4 text-base font-normal leading-relaxed text-muted-foreground">
                    {blocks.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="break-words [overflow-wrap:anywhere]"
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                      />
                    ))}
                  </div>
                </section>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PrivacyPolicyPageClient



