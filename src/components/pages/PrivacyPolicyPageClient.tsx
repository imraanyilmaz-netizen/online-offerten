'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const PrivacyPolicyPageClient = () => {
  const pageTitle = "Datenschutzerklärung"
  const lastUpdated = "Zuletzt aktualisiert: 22. April 2026"

  const sections = [
    {
      title: "1. Verantwortlicher",
      content: [
        "Verantwortlich für die Datenbearbeitung auf dieser Website im Sinne des Schweizer Datenschutzgesetzes (DSG) sowie der EU-Datenschutz-Grundverordnung (DSGVO) ist:",
        "<strong>Yilmaz Platform Solutions</strong><br>Kreuzstrasse 16<br>8953 Dietikon<br>Schweiz<br>UID: CHE-234.206.612<br>E-Mail: <a href=\"mailto:info@online-offerten.ch\">info@online-offerten.ch</a>",
        "",
        "Die Plattform <strong>Online-Offerten.ch</strong> wird im Rahmen dieser Firma betrieben. Online-Offerten.ch ist eine reine Vermittlungsplattform für Offerten aus den Bereichen Umzug, Reinigung, Malerarbeiten sowie Räumung/Entsorgung. Wir erbringen selbst keine dieser Dienstleistungen, sondern vermitteln Anfragen an geprüfte Partnerfirmen.",
        "",
        "Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte können Sie uns jederzeit unter <a href=\"mailto:info@online-offerten.ch\">info@online-offerten.ch</a> kontaktieren."
      ]
    },
    {
      title: "2. Grundsätze und Rechtsgrundlagen",
      content: [
        "Wir bearbeiten personenbezogene Daten nur, soweit dies für die Erbringung unserer Leistungen erforderlich ist oder eine andere gesetzliche Grundlage besteht. Die Bearbeitung erfolgt nach den Grundsätzen von Treu und Glauben, Zweckbindung, Verhältnismässigkeit, Transparenz sowie Datensicherheit.",
        "",
        "Je nach Bearbeitung stützen wir uns insbesondere auf folgende Rechtsgrundlagen:",
        "• <strong>Vertragserfüllung bzw. vorvertragliche Massnahmen</strong> (Art. 31 Abs. 2 lit. a DSG / Art. 6 Abs. 1 lit. b DSGVO) – z. B. Bearbeitung Ihrer Offerten-Anfrage oder Partnerregistrierung<br>• <strong>Einwilligung</strong> (Art. 31 Abs. 1 DSG / Art. 6 Abs. 1 lit. a DSGVO) – z. B. für Analyse-Cookies<br>• <strong>Berechtigte Interessen</strong> (Art. 31 Abs. 2 lit. c DSG / Art. 6 Abs. 1 lit. f DSGVO) – z. B. zur Gewährleistung der IT-Sicherheit und Missbrauchsprävention<br>• <strong>Gesetzliche Verpflichtungen</strong> (Art. 6 Abs. 1 lit. c DSGVO) – z. B. steuer- und handelsrechtliche Aufbewahrungspflichten"
      ]
    },
    {
      title: "3. Besuch unserer Website",
      content: [
        "Beim Aufruf unserer Website werden durch unseren Hosting-Dienstleister aus technischen Gründen automatisch Informationen verarbeitet, insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite, verwendeter Browser sowie Betriebssystem (sogenannte Server-Logs).",
        "",
        "Diese Daten werden zur Bereitstellung der Website, zur Gewährleistung der IT-Sicherheit und zur Missbrauchsabwehr bearbeitet (berechtigtes Interesse).",
        "",
        "Zur ungefähren Standorterkennung (z. B. Anzeige regionaler Inhalte wie \"Umzug in Zürich\") rufen wir zudem den Dienst <strong>ipapi.co</strong> (Kaffeine Inc., USA) auf. Dabei wird Ihre IP-Adresse in Echtzeit an ipapi.co übermittelt, ausgewertet (nur Land und Stadt für die Schweiz) und anschliessend nicht weiter bei uns gespeichert. Das Ergebnis (Stadt) wird ausschliesslich lokal in Ihrem Browser (LocalStorage) für 24 Stunden zwischengespeichert."
      ]
    },
    {
      title: "4. Anfrage von Offerten (Kundinnen und Kunden)",
      content: [
        "Wenn Sie über unser Formular eine kostenlose Offerte anfordern, bearbeiten wir die Daten, die Sie in den Formularschritten angeben. Je nach gewählter Dienstleistung (Umzug, Reinigung, Malerarbeiten, Räumung/Entsorgung) können dies insbesondere sein:",
        "",
        "<strong>Kontakt- und Identitätsdaten:</strong> Anrede, Vor- und Nachname, ggf. Firmenname, E-Mail-Adresse, Telefonnummer, bevorzugte Kontaktzeit.",
        "",
        "<strong>Projekt- und Adressdaten:</strong> Auszugs- und Einzugsadresse (Strasse, PLZ, Ort, Land), Objekttyp, Anzahl Zimmer, Stockwerk, Liftverfügbarkeit, Parkmöglichkeit, gewünschter Umzugs-/Ausführungstermin, Flexibilität, Entfernung (soweit berechnet).",
        "",
        "<strong>Dienstleistungsspezifische Angaben:</strong> Art des Umzugs oder der Reinigung, Angaben zu Malerarbeiten (Innen-/Aussenbereich, zu streichende Flächen), Räumungs-/Entsorgungsumfang, Fläche in m², Bodentypen, besondere Transportgüter (z. B. Klavier, Tresor, Maschinen), gewünschte Zusatzleistungen, Lagerung, zusätzliche Bemerkungen, gewünschte Anzahl Offerten sowie Angabe, wie Sie auf uns aufmerksam geworden sind.",
        "",
        "<strong>Einwilligungs- und Protokolldaten:</strong> Bestätigung der Datenschutzhinweise, Zeitpunkt der Anfrage, technisch bedingte Verbindungsdaten.",
        "",
        "Die Angabe dieser Daten ist grundsätzlich freiwillig. Ohne die als erforderlich gekennzeichneten Angaben können wir Ihre Anfrage jedoch nicht an passende Partnerfirmen vermitteln.",
        "",
        "<strong>Zweck:</strong> Entgegennahme, Qualifizierung und Vermittlung Ihrer Anfrage an geeignete Partnerfirmen in Ihrer Region sowie Versand einer Bestätigungs-E-Mail mit einem Statuslink.",
        "",
        "<strong>Rechtsgrundlage:</strong> Durchführung vorvertraglicher Massnahmen auf Ihre Anfrage hin bzw. Ihre ausdrückliche Einwilligung bei Absenden des Formulars."
      ]
    },
    {
      title: "5. Weitergabe Ihrer Anfrage an Partnerfirmen",
      content: [
        "Online-Offerten.ch ist eine Vermittlungsplattform. Zur Erstellung von Offerten übermitteln wir Ihre Anfrage an ausgewählte, geprüfte Partnerfirmen in Ihrer Region. Dies geschieht in zwei Stufen:",
        "",
        "<strong>a) Anonyme Vorschau:</strong> Bevor eine Partnerfirma Ihren Auftrag freischaltet, sieht sie nur eine anonymisierte Übersicht (z. B. Art der Leistung, ungefährer Ort/PLZ, Stockwerk, Liftverfügbarkeit, ungefährer Umfang). Ihre Kontaktdaten (Anrede, Vor-/Nachname, E-Mail, Telefonnummer, genaue Strasse, bevorzugte Kontaktzeit) werden in dieser Phase <strong>nicht</strong> offengelegt.",
        "",
        "<strong>b) Nach Freischaltung durch die Partnerfirma:</strong> Erst wenn eine Partnerfirma Ihren Auftrag mittels Guthaben oder Abonnement freischaltet, erhält diese Firma Ihre vollständigen Kontaktdaten, um Ihnen eine individuelle Offerte zu unterbreiten. Die Partnerfirma wird ab diesem Zeitpunkt zum eigenständigen Verantwortlichen für die weitere Bearbeitung Ihrer Daten und unterliegt ihren eigenen Datenschutzbestimmungen.",
        "",
        "Mit dem Absenden des Formulars willigen Sie ausdrücklich in diese Weitergabe zum Zweck der Angebotserstellung und direkten Kontaktaufnahme ein.",
        "",
        "Online-Offerten.ch wird nicht Vertragspartei zwischen Ihnen und der Partnerfirma. Der Dienstleistungsvertrag kommt ausschliesslich zwischen Ihnen und der jeweiligen Partnerfirma zustande."
      ]
    },
    {
      title: "6. Registrierung und Nutzung durch Partnerfirmen",
      content: [
        "Wenn Sie sich als Partnerfirma registrieren und unser Partner-Dashboard nutzen, bearbeiten wir zusätzlich folgende Daten:",
        "",
        "<strong>Firmen- und Kontaktdaten:</strong> Firmenname, Kontaktperson, E-Mail-Adresse, Telefonnummer, Firmenadresse, Webseite, Gründungsjahr, Mitarbeiterzahl, Handelsregisternummer, Angaben zur Haftpflichtversicherung, gewählte Dienstleistungskategorien und Einsatzregionen, Firmenbeschreibung, Einwilligung in die AGB.",
        "",
        "<strong>Zugangsdaten:</strong> Verschlüsseltes Passwort (Hash) für das Login, verwaltet durch unseren Auth-Dienstleister Supabase.",
        "",
        "<strong>Nutzungs- und Transaktionsdaten:</strong> Guthabenstand, gekaufte Anfragen, Abonnements, erhaltene Bewertungen, Kommunikation mit Kundinnen und Kunden innerhalb der Plattform.",
        "",
        "<strong>Zahlungsdaten:</strong> Für das Aufladen von Guthaben oder den Kauf von Abonnements werden Sie zu unserem Zahlungsdienstleister <strong>Stripe</strong> weitergeleitet. Zahlungsdaten (z. B. Kartendaten) werden direkt von Stripe verarbeitet und sind für uns nicht zugänglich. Wir erhalten lediglich Bestätigungsinformationen (Transaktions-ID, Betrag, Status).",
        "",
        "<strong>Zweck:</strong> Vertragsabwicklung, Bereitstellung des Partner-Dashboards, Abrechnung und Qualitätssicherung (Prüfung der Firmenangaben, z. B. HR-Eintrag und Haftpflichtversicherung).",
        "",
        "<strong>Rechtsgrundlage:</strong> Vertragserfüllung, gesetzliche Aufbewahrungspflichten sowie berechtigtes Interesse an einer qualitativ hochwertigen Vermittlungsplattform."
      ]
    },
    {
      title: "7. Kontaktaufnahme",
      content: [
        "Wenn Sie uns per E-Mail oder über das Kontaktformular kontaktieren, bearbeiten wir die von Ihnen freiwillig mitgeteilten Angaben (insbesondere Name, E-Mail-Adresse, Telefonnummer und Inhalt der Nachricht) ausschliesslich zur Beantwortung Ihrer Anfrage.",
        "",
        "Rechtsgrundlage ist die Durchführung vorvertraglicher Massnahmen bzw. unser berechtigtes Interesse an einer effizienten Kommunikation."
      ]
    },
    {
      title: "8. Eingesetzte Dienstleister (Auftragsbearbeiter)",
      content: [
        "Zur Bereitstellung und zum Betrieb unserer Plattform setzen wir sorgfältig ausgewählte Dienstleister ein, mit denen – soweit datenschutzrechtlich erforderlich – Auftragsbearbeitungsverträge abgeschlossen wurden:",
        "",
        "• <strong>Hosting und Frontend:</strong> Vercel Inc. (USA) – die Auslieferung unserer Anwendung erfolgt über Server in der EU (Frankfurt, Deutschland). Ergänzend nutzen wir bei erteilter Analyse-Einwilligung <em>Vercel Speed Insights</em> zur Messung der Seitenperformance.<br>• <strong>Datenbank, Authentifizierung und Serverfunktionen:</strong> Supabase Inc. (USA) – unsere Datenbank und serverseitigen Funktionen werden in der EU (Frankfurt, Deutschland) betrieben. Hier werden Ihre Formular- und Kontodaten gespeichert.<br>• <strong>E-Mail-Versand:</strong> Resend, Inc. (USA) – Serverstandort EU (Irland). Resend wird eingesetzt für Bestätigungs-, Benachrichtigungs- und Systemmails an Kundinnen, Kunden, Partnerfirmen und Administratoren.<br>• <strong>Zahlungsabwicklung:</strong> Stripe Payments Europe, Ltd. (Irland) bzw. Stripe, Inc. (USA). Stripe verarbeitet Zahlungsdaten ausschliesslich in eigener Verantwortung gemäss den <a href=\"https://stripe.com/de/privacy\" target=\"_blank\" rel=\"noopener\">Datenschutzbestimmungen von Stripe</a>.<br>• <strong>Webanalyse:</strong> Google Tag Manager (GTM-PNCCCGC5) sowie Google Analytics 4 von Google Ireland Ltd. / Google LLC (USA). Diese Dienste werden <strong>nur nach Ihrer ausdrücklichen Einwilligung</strong> über unser Cookie-Banner geladen.<br>• <strong>Karten und Schriften:</strong> Google Maps und Google Fonts von Google Ireland Ltd. / Google LLC (USA). Google Maps wird nur auf Seiten mit Kartenanzeige geladen. Schriftarten werden über <em>next/font</em> ausgeliefert; dabei kann es zur Verbindung mit Google-Servern kommen.<br>• <strong>Geolokalisierung (IP):</strong> Kaffeine Inc. / ipapi.co (USA) – zur groben Standortbestimmung (Stadt) bei Besuchern aus der Schweiz.",
        "",
        "Weitere Informationen zum Datenschutz der einzelnen Anbieter finden Sie in deren jeweiligen Datenschutzerklärungen."
      ]
    },
    {
      title: "9. Cookies, LocalStorage und ähnliche Technologien",
      content: [
        "Wir setzen auf unserer Website Cookies und ähnliche Technologien (insbesondere LocalStorage) ein. Diese sind teils technisch notwendig, teils dienen sie der Messung und Verbesserung unseres Angebots.",
        "",
        "<strong>a) Technisch notwendige Cookies und Speicherwerte</strong> – ohne Einwilligung:",
        "• Session-Cookies zur Anmeldung im Partner-Dashboard (Supabase Auth)<br>• Speicherung Ihres Cookie-Einwilligungsstatus (<code>oo-cookie-consent-v1</code> im LocalStorage)<br>• Kurzfristige Speicherung zur Verhinderung von doppelten Formularversendungen<br>• Lokaler Cache Ihrer ungefähren Stadt für 24 Stunden (<code>userLocation</code>)",
        "",
        "<strong>b) Analyse, Marketing und Performance-Messung</strong> – nur mit Ihrer Einwilligung:",
        "• Google Tag Manager und Google Analytics 4 (Messung anonymisierter Nutzungsstatistiken)<br>• Google Ads Conversion- und Remarketing-Tags (Erfolgsmessung unserer Werbekampagnen)<br>• Vercel Speed Insights (Messung der Ladezeiten)",
        "",
        "<strong>c) Google Consent Mode v2:</strong> Wir setzen den von Google bereitgestellten <em>Consent Mode v2</em> ein. Ohne Ihre Einwilligung werden <strong>keine</strong> Marketing- oder Analyse-Cookies gesetzt und <strong>keine</strong> personenbezogenen Daten (z. B. IP-Adresse, Client-ID) an Google übermittelt. Google erhält in diesem Fall lediglich anonyme, cookielose Signale darüber, dass ein Seitenaufruf oder eine Conversion stattgefunden hat. Auf Basis dieser anonymen Signale erstellt Google mittels statistischer Modellierung aggregierte Kennzahlen, die keinen Rückschluss auf Ihre Person erlauben. Erteilen Sie Ihre Einwilligung, werden die entsprechenden Dienste vollumfänglich aktiviert.",
        "",
        "Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie die Cookie-Einstellungen in Ihrem Browser anpassen oder den LocalStorage-Eintrag <code>oo-cookie-consent-v1</code> löschen. Beim nächsten Besuch wird das Einwilligungs-Banner erneut angezeigt.",
        "",
        "Zusätzlich können Sie das Setzen von Cookies über Ihren Browser generell verhindern. Wir weisen darauf hin, dass in diesem Fall möglicherweise nicht alle Funktionen unserer Website vollumfänglich nutzbar sind."
      ]
    },
    {
      title: "10. Datenübermittlung ins Ausland",
      content: [
        "Die Bearbeitung und Speicherung Ihrer Kern-Daten (Formularangaben, Kontoinformationen der Partner) erfolgt grundsätzlich auf Servern in der EU (Deutschland/Irland).",
        "",
        "Im Rahmen der oben genannten Dienstleister kann es jedoch zu einer Übermittlung personenbezogener Daten in Drittstaaten – insbesondere die USA – kommen, namentlich bei:",
        "• Stripe (Zahlungsabwicklung)<br>• Google (Tag Manager, Analytics, Maps, Fonts) – nur bei erteilter Einwilligung bzw. Seitenaufruf mit Kartendienst<br>• ipapi.co (Geolokalisierung via IP)<br>• Muttergesellschaften unserer EU-Anbieter (Vercel, Supabase, Resend), sofern ein Support- oder Verwaltungszugriff aus den USA erfolgt",
        "",
        "Für diese Übermittlungen setzen wir – soweit erforderlich – geeignete Garantien ein, insbesondere Standardvertragsklauseln der EU-Kommission bzw. berufen uns auf Angemessenheitsbeschlüsse (z. B. EU-US Data Privacy Framework), soweit diese bestehen. Auf Anfrage stellen wir Ihnen weitere Informationen zu den getroffenen Schutzmassnahmen zur Verfügung."
      ]
    },
    {
      title: "11. Speicherdauer",
      content: [
        "Wir speichern personenbezogene Daten nur so lange, wie dies für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten (insbesondere handels- und steuerrechtliche Pflichten von bis zu 10 Jahren) dies verlangen.",
        "",
        "• <strong>Offerten-Anfragen:</strong> Speicherung für die Dauer der Vermittlung sowie zur Nachverfolgung allfälliger Rückfragen, danach Löschung oder Anonymisierung.<br>• <strong>Partner-Konten:</strong> Speicherung für die Dauer der Geschäftsbeziehung zuzüglich gesetzlicher Aufbewahrungsfristen.<br>• <strong>Zahlungsdaten bzw. Transaktionsbelege:</strong> Aufbewahrung gemäss gesetzlichen Vorgaben (in der Regel 10 Jahre).<br>• <strong>E-Mail-Kommunikation:</strong> Speicherung, solange dies für die Bearbeitung Ihrer Anliegen erforderlich ist.<br>• <strong>Server-Logs:</strong> Kurzfristige Speicherung zu Sicherheitszwecken durch den Hosting-Dienstleister."
      ]
    },
    {
      title: "12. Datensicherheit",
      content: [
        "Wir treffen angemessene technische und organisatorische Massnahmen, um Ihre Daten gegen Verlust, Manipulation und unbefugten Zugriff zu schützen. Dazu zählen insbesondere:",
        "• verschlüsselte Datenübertragung über SSL/TLS<br>• rollenbasierte Zugriffskontrollen im Partner- und Administrationsbereich<br>• regelmässige Aktualisierung der eingesetzten Software<br>• gesicherte Passwortverarbeitung durch unseren Auth-Dienstleister (Hash-Verfahren)<br>• Auswahl vertrauenswürdiger Dienstleister mit entsprechendem Datenschutzniveau",
        "",
        "Trotz dieser Massnahmen kann kein IT-System einen absoluten Schutz garantieren."
      ]
    },
    {
      title: "13. Ihre Rechte",
      content: [
        "Sie haben im Rahmen des anwendbaren Datenschutzrechts insbesondere folgende Rechte:",
        "",
        "• <strong>Auskunft</strong> über die über Sie bearbeiteten Daten<br>• <strong>Berichtigung</strong> unrichtiger oder unvollständiger Daten<br>• <strong>Löschung</strong> Ihrer Daten, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen<br>• <strong>Einschränkung</strong> der Bearbeitung<br>• <strong>Widerspruch</strong> gegen bestimmte Bearbeitungen, insbesondere aus Gründen Ihrer besonderen Situation<br>• <strong>Datenherausgabe bzw. -übertragbarkeit</strong>, soweit gesetzlich vorgesehen<br>• <strong>Widerruf</strong> einer erteilten Einwilligung mit Wirkung für die Zukunft",
        "",
        "Zur Ausübung Ihrer Rechte genügt eine formlose Mitteilung an <a href=\"mailto:info@online-offerten.ch\">info@online-offerten.ch</a>. Zur Verhinderung von Missbrauch können wir einen angemessenen Identitätsnachweis verlangen.",
        "",
        "Wenn Sie der Ansicht sind, dass die Bearbeitung Ihrer Daten gegen geltendes Datenschutzrecht verstösst, können Sie zudem eine Beschwerde bei der zuständigen Aufsichtsbehörde einreichen:",
        "• In der Schweiz: Eidgenössischer Datenschutz- und Öffentlichkeitsbeauftragter (EDÖB), <a href=\"https://www.edoeb.admin.ch\" target=\"_blank\" rel=\"noopener\">www.edoeb.admin.ch</a><br>• In der EU: bei der zuständigen Datenschutzaufsichtsbehörde Ihres Wohnsitz- oder Arbeitsortes"
      ]
    },
    {
      title: "14. Automatisierte Einzelentscheidungen",
      content: [
        "Eine ausschliesslich automatisierte Entscheidungsfindung im Sinne von Art. 21 DSG bzw. Art. 22 DSGVO (inkl. Profiling mit rechtlicher Wirkung) findet auf unserer Plattform nicht statt. Die Zuordnung von Anfragen an Partnerfirmen erfolgt auf Basis von Dienstleistung und Region; die Entscheidung zur Angebotserstellung liegt stets bei der jeweiligen Partnerfirma.",
      ]
    },
    {
      title: "15. Änderungen dieser Datenschutzerklärung",
      content: [
        "Wir passen diese Datenschutzerklärung bei Bedarf an, z. B. wenn wir neue Dienste einsetzen oder rechtliche Anforderungen sich ändern. Es gilt jeweils die auf dieser Seite veröffentlichte Fassung. Wir empfehlen, diese Seite regelmässig zu konsultieren.",
        "",
        "Stand: 22. April 2026"
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
          <CardContent className="max-w-none border-0 p-0 px-4 pb-8 pt-0 md:px-6 [&_a]:text-base [&_a]:font-normal [&_a]:text-green-700 dark:[&_a]:text-emerald-400 [&_a]:underline-offset-2 hover:[&_a]:underline [&_strong]:font-semibold [&_strong]:text-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-mono">
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



