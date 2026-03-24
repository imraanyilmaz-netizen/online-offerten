'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const ImpressumPageClient = () => {
  const pageTitle = 'Impressum'
  const lastUpdated = 'Stand: März 2026'

  const sections = [
    {
      title: 'Angaben gemäss Schweizer Recht',
      content: [
        '<strong>Yilmaz Platform Solutions</strong><br>Kreuzstrasse 16<br>8953 Dietikon<br>Schweiz',
        '',
        'Eintragung im Handelsregister des Kantons Zürich.',
        'Unternehmens-Identifikationsnummer (UID): <strong>CHE-234.206.612</strong>',
        '',
        'Verantwortlich für den Inhalt dieser Website: Yilmaz Platform Solutions, Kreuzstrasse 16, 8953 Dietikon.',
      ],
    },
    {
      title: 'Kontakt',
      content: [
        'Adresse: Kreuzstrasse 16, 8953 Dietikon',
        'E-Mail: <a href="mailto:info@online-offerten.ch">info@online-offerten.ch</a>',
        '',
        'Die Domain <strong>online-offerten.ch</strong> und das Angebot <strong>Online-Offerten.ch</strong> werden im Rahmen der genannten Firma betrieben.',
      ],
    },
    {
      title: 'Partnerfirmen und Nachweise',
      content: [
        'Wir arbeiten mit registrierten Partnerfirmen zusammen. <strong>Im Rahmen der Registrierung fordern wir Versicherungsnachweise ein (insbesondere Betriebshaftpflicht) und prüfen diese Unterlagen.</strong> Eine weitergehende Prüfung der Geschäftstätigkeit, der Arbeitsqualität oder der wirtschaftlichen Bonität der Partner führen wir nicht durch; die Auswahl und Beurteilung der passenden Firma liegt beim Kunden.',
      ],
    },
    {
      title: 'Haftungsausschluss',
      content: [
        'Wir weisen Sie darauf hin, dass wir <strong>keine Garantie</strong> dafür übernehmen können, <strong>ob und wie viele Angebote</strong> Sie über unser Portal erhalten werden. Wir schliessen ausserdem <strong>jede Haftung für die Inhalte der Angebote</strong> selbst aus (Preise, Leistungsbeschreibungen, Bedingungen der Partnerfirmen).',
        '',
        '<strong>Vertragliche Beziehungen</strong><br>Wenn Sie eine Firma über Online-Offerten.ch gefunden oder kontaktiert haben, entsteht ein Vertrag über die auszuführenden Arbeiten oder Dienstleistungen <strong>ausschliesslich zwischen Ihnen und der von Ihnen gewählten Firma</strong>. Online-Offerten.ch ist eine Vermittlungsplattform und wird nicht Vertragspartei. Wir haften nicht für die Erbringung, Qualität, Termine oder Abwicklung der von Partnern erbrachten Leistungen.',
        '',
        '<strong>Versicherung, Personal und Anstellung</strong><br>Fragen der Versicherung von Gütern, Arbeiten, Mitarbeitenden sowie sämtliche Anstellungs- und Haftungsverhältnisse im Zusammenhang mit der Leistungserbringung sind <strong>ausschliesslich Gegenstand des Vertrags zwischen Ihnen und der Partnerfirma</strong> und liegen ausserhalb der Verantwortung des Vermittlungsportals Online-Offerten.ch.',
        '',
        '<strong>Inhalt des Onlineangebots</strong><br>Die Inhalte dieser Website werden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Informationen können wir jedoch keine Gewähr übernehmen.',
        '',
        '<strong>Haftung für Links</strong><br>Unser Angebot kann Verknüpfungen zu Websites Dritter enthalten. Auf deren Inhalte haben wir keinen Einfluss; deshalb übernehmen wir für diese fremden Inhalte keine Gewähr. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.',
        '',
        '<strong>Schadenersatz</strong><br>Ansprüche gegen uns wegen Schäden materieller oder ideeller Art, die durch die Nutzung oder Nichtnutzung der veröffentlichten Informationen oder durch die Nutzung fehlerhafter oder unvollständiger Informationen entstehen, sind ausgeschlossen, soweit nicht nachweislich Vorsatz oder grobe Fahrlässigkeit unsererseits vorliegt.',
      ],
    },
    {
      title: 'Urheberrecht',
      content: [
        'Die auf dieser Website veröffentlichten Texte, Bilder, Grafiken, Logos und das Layout unterliegen dem Urheberrecht bzw. weiteren Schutzrechten. Eine Vervielfältigung, Bearbeitung, Verbreitung oder jede Art der Verwertung ausserhalb der engen Grenzen des Urheberrechts bedarf der vorherigen schriftlichen Zustimmung von Yilmaz Platform Solutions, soweit nicht ausdrücklich anders angegeben.',
        '',
        `© ${new Date().getFullYear()} Yilmaz Platform Solutions. Alle Rechte vorbehalten.`,
      ],
    },
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
          <CardContent className="prose prose-slate max-w-none text-slate-700 prose-headings:text-slate-900 prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-p:text-base md:prose-p:text-[17px] prose-p:leading-8 prose-p:my-4 prose-strong:text-slate-900 prose-strong:font-semibold prose-a:text-green-700 prose-a:no-underline hover:prose-a:underline">
            {sections.map((section, index) => (
              <div key={index}>
                <h2 className="scroll-mt-24">{section.title}</h2>
                {section.content.map((paragraph, pIndex) => {
                  if (!paragraph) return <br key={pIndex} />
                  return <p key={pIndex} dangerouslySetInnerHTML={{ __html: paragraph }} />
                })}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ImpressumPageClient
