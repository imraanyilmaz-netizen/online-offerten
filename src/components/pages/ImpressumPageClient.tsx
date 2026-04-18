'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const ImpressumPageClient = () => {
  const pageTitle = 'Impressum'

  const sections = [
    {
      title: 'Angaben gemäss Schweizer Recht',
      content: [
        'Yilmaz Platform Solutions<br>Kreuzstrasse 16<br>8953 Dietikon<br>Schweiz',
        'Eintragung im Handelsregister des Kantons Zürich.',
        'Unternehmens-Identifikationsnummer (UID): CHE-234.206.612',
        'Verantwortlich für den Inhalt dieser Website: Yilmaz Platform Solutions, Kreuzstrasse 16, 8953 Dietikon.',
      ],
    },
    {
      title: 'Kontakt',
      content: [
        'Adresse: Kreuzstrasse 16, 8953 Dietikon',
        'E-Mail: <a href="mailto:info@online-offerten.ch">info@online-offerten.ch</a>',
        'Die Domain online-offerten.ch und das Angebot Online-Offerten.ch werden im Rahmen der genannten Firma betrieben.',
      ],
    },
    {
      title: 'Partnerfirmen und Nachweise',
      content: [
        'Wir arbeiten mit registrierten Partnerfirmen zusammen. Im Rahmen der Registrierung fordern wir Versicherungsnachweise ein (insbesondere Betriebshaftpflicht) und prüfen diese Unterlagen. Eine weitergehende Prüfung der Geschäftstätigkeit, der Arbeitsqualität oder der wirtschaftlichen Bonität der Partner führen wir nicht durch; die Auswahl und Beurteilung der passenden Firma liegt beim Kunden.',
      ],
    },
    {
      title: 'Haftungsausschluss',
      content: [
        'Wir weisen Sie darauf hin, dass wir keine Garantie dafür übernehmen können, ob und wie viele Angebote Sie über unser Portal erhalten werden. Wir schliessen ausserdem jede Haftung für die Inhalte der Angebote selbst aus (Preise, Leistungsbeschreibungen, Bedingungen der Partnerfirmen).',
        'Vertragliche Beziehungen<br>Wenn Sie eine Firma über Online-Offerten.ch gefunden oder kontaktiert haben, entsteht ein Vertrag über die auszuführenden Arbeiten oder Dienstleistungen ausschliesslich zwischen Ihnen und der von Ihnen gewählten Firma. Online-Offerten.ch ist eine Vermittlungsplattform und wird nicht Vertragspartei. Wir haften nicht für die Erbringung, Qualität, Termine oder Abwicklung der von Partnern erbrachten Leistungen.',
        'Versicherung, Personal und Anstellung<br>Fragen der Versicherung von Gütern, Arbeiten, Mitarbeitenden sowie sämtliche Anstellungs- und Haftungsverhältnisse im Zusammenhang mit der Leistungserbringung sind ausschliesslich Gegenstand des Vertrags zwischen Ihnen und der Partnerfirma und liegen ausserhalb der Verantwortung des Vermittlungsportals Online-Offerten.ch.',
        'Inhalt des Onlineangebots<br>Die Inhalte dieser Website werden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Informationen können wir jedoch keine Gewähr übernehmen.',
        'Haftung für Links<br>Unser Angebot kann Verknüpfungen zu Websites Dritter enthalten. Auf deren Inhalte haben wir keinen Einfluss; deshalb übernehmen wir für diese fremden Inhalte keine Gewähr. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.',
        'Schadenersatz<br>Ansprüche gegen uns wegen Schäden materieller oder ideeller Art, die durch die Nutzung oder Nichtnutzung der veröffentlichten Informationen oder durch die Nutzung fehlerhafter oder unvollständiger Informationen entstehen, sind ausgeschlossen, soweit nicht nachweislich Vorsatz oder grobe Fahrlässigkeit unsererseits vorliegt.',
      ],
    },
    {
      title: 'Urheberrecht',
      content: [
        'Die auf dieser Website veröffentlichten Texte, Bilder, Grafiken, Logos und das Layout unterliegen dem Urheberrecht bzw. weiteren Schutzrechten. Eine Vervielfältigung, Bearbeitung, Verbreitung oder jede Art der Verwertung ausserhalb der engen Grenzen des Urheberrechts bedarf der vorherigen schriftlichen Zustimmung von Yilmaz Platform Solutions, soweit nicht ausdrücklich anders angegeben.',
        `© ${new Date().getFullYear()} Yilmaz Platform Solutions. Alle Rechte vorbehalten.`,
      ],
    },
  ]

  return (
    <div className="bg-slate-50 dark:bg-background py-12 md:py-20">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <Card className="shadow-lg border-border bg-card">
          <CardHeader className="p-0 px-4 pt-6 pb-3 md:px-6">
            <CardTitle className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              {pageTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="max-w-none border-0 p-0 px-4 pb-8 pt-0 md:px-6 [&_a]:text-base [&_a]:font-normal [&_a]:text-green-700 dark:[&_a]:text-emerald-400 [&_a]:underline-offset-2 hover:[&_a]:underline">
            {sections.map((section, index) => (
              <section
                key={index}
                className="scroll-mt-24 border-b border-border py-8 first:pt-2 last:border-b-0 last:pb-2"
              >
                <h2 className="mb-5 border-b border-border pb-3 text-xl font-bold tracking-tight text-foreground md:text-2xl">
                  {section.title}
                </h2>
                <div className="space-y-4 text-base font-normal leading-relaxed text-muted-foreground">
                  {section.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="break-words [overflow-wrap:anywhere]"
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  ))}
                </div>
              </section>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ImpressumPageClient
