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
        "Online-Offerten.ch<br>Schweiz<br>E-Mail: info@online-offerten.ch",
        "",
        "Online-Offerten.ch ist eine Vermittlungsplattform und erbringt selbst keine Umzugs-, Reinigungs- oder Transportdienstleistungen."
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
    <div className="bg-slate-50 py-12 md:py-20">
      <div className="container mx-auto max-w-navbar px-4 md:px-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              {pageTitle}
            </CardTitle>
            <p className="text-sm md:text-base text-slate-500">{lastUpdated}</p>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none text-slate-700 prose-headings:text-slate-900 prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3 prose-h4:text-lg prose-h4:font-semibold prose-h4:mt-6 prose-h4:mb-2 prose-p:text-base md:prose-p:text-[17px] prose-p:leading-8 prose-p:my-4 prose-strong:text-slate-900 prose-strong:font-semibold prose-a:text-green-700 prose-a:no-underline hover:prose-a:underline prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4">
            {sections.map((section, index) => (
              <div key={index}>
                <h2 className="scroll-mt-24">{section.title}</h2>
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



