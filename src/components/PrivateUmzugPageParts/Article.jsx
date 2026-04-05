import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { PackagePlus, ClipboardList, Users, ShieldCheck, Home, MapPin, ArrowRight, Wrench, HeartHandshake } from 'lucide-react';

const Article = () => {
  return (
    <>
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <PackagePlus size={32} className="mr-3 text-green-500" />
          Was ist ein Privatumzug?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Ein Privatumzug umfasst den Transport Ihres Haushalts von einer Wohnung oder einem Haus zur nächsten – ob innerhalb derselben Stadt, in eine andere Region oder ins Ausland.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Gut geplant sparen Sie Zeit, Nerven und oft auch Kosten: Von der ersten Bestandsaufnahme bis zur Übergabe der alten Wohnung begleitet Sie eine professionelle Umzugsfirma durch die wichtigsten Schritte.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Auf Online-Offerten.ch vergleichen Sie kostenlos Offerten geprüfter Partner und finden Anbieter, die zu Ihrem Budget und Ihrer Situation passen.
        </p>
      </section>

      <section className="pt-6 border-t border-gray-200">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <ClipboardList size={28} className="mr-3 text-blue-500" />
          Planung und Ablauf
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Frühzeitig zu planen lohnt sich: Kartons, Termine mit der Hausverwaltung und die Koordination von Hilfskräften sollten festgelegt werden, bevor der Stress am Umzugstag beginnt.
        </p>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h3 className="font-bold text-lg text-gray-700 mb-2">Checklisten und Zeitplan</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Eine Checkliste hilft, Kündigungen, Adressänderungen und die Nachsendeauftrag bei der Post nicht zu vergessen. So behalten Sie den Überblick über Fristen und To-dos.
          </p>
          <h3 className="font-bold text-lg text-gray-700 mt-4 mb-2">Umzugskosten einordnen</h3>
          <p className="text-gray-700 leading-relaxed">
            Die Höhe der Kosten hängt von Volumen, Distanz, Stockwerk und Zusatzleistungen ab. Eine detaillierte Offerte gibt Ihnen Planungssicherheit.
          </p>
          <Button asChild className="mt-4 bg-green-600 hover:bg-green-700 text-white group">
            <Link href="/umzugsfirma/checklists">
              Zu den Checklisten
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="pt-6 border-t border-gray-200">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <Users size={28} className="mr-3 text-purple-500" />
          Warum mehrere Offerten einholen?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Jede Umzugsfirma kalkuliert anders. Mit mehreren Offerten erkennen Sie marktübliche Preise und können Leistungen (Versicherung, Material, Ein- und Auspacken) fair vergleichen.
        </p>
        <ul className="space-y-2 list-inside list-disc mb-4 text-gray-700">
          <li>Transparente Leistungsbeschreibungen</li>
          <li>Bessere Verhandlungsbasis</li>
          <li>Mehr Sicherheit bei der Partnerwahl</li>
          <li>Zeitersparnis durch eine zentrale Anfrage</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          Stellen Sie eine{' '}
          <Link href="/kostenlose-offerte-anfordern" className="text-green-600 hover:underline font-semibold">
            kostenlose Anfrage
          </Link>{' '}
          – unverbindlich und ohne versteckte Kosten.
        </p>
      </section>

      <section className="pt-6 border-t border-gray-200">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          Umzugskosten und Budget
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Pauschalangaben aus dem Internet sind selten verlässlich. Entscheidend sind Volumen, Zugang (Lift, Tragestrecke) und Zusatzleistungen wie Einpackservice oder Zwischenlager.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Vergleichen Sie Angebote mit gleicher Leistungsdefinition – erst dann sind die Preise wirklich vergleichbar.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Unseren Ratgeber zu{' '}
          <Link href="/umzugsfirma/umzugskosten" className="text-green-600 hover:underline font-semibold">
            Umzugskosten in der Schweiz
          </Link>{' '}
          finden Sie hier.
        </p>
      </section>

      <section className="pt-6 border-t border-gray-200">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <ShieldCheck size={28} className="mr-3 text-red-500" />
          Versicherung und Sicherheit
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Achten Sie auf Transportversicherung und Haftung: Seriöse Anbieter dokumentieren Schäden und bieten klare Bedingungen. Das schützt Sie bei Wertgegenständen und Möbeln.
        </p>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h3 className="font-bold text-lg text-gray-700 mb-2">Was Sie prüfen sollten</h3>
          <p className="text-gray-700 leading-relaxed">
            Vertragsumfang, Selbstbehalt und Ausschlüsse – bei Fragen sollten Sie vor Buchung schriftliche Klarheit erhalten.
          </p>
          <h3 className="font-bold text-lg text-gray-700 mt-4 mb-2">Bewertungen und Referenzen</h3>
          <p className="text-gray-700 leading-relaxed">
            Erfahrungsberichte anderer Kundinnen und Kunden geben zusätzliche Sicherheit bei der Auswahl.
          </p>
        </div>
      </section>

      <section className="pt-6 border-t border-gray-200">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <Wrench size={28} className="mr-3 text-indigo-500" />
          Zusatzleistungen
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Einpacken, Möbeldemontage, Zwischenlager oder Endreinigung können den Ablauf erleichtern. Klären Sie früh, welche Leistungen im Preis enthalten sind.
        </p>
        <ul className="space-y-2 list-inside list-disc mb-4 text-gray-700">
          <li>Ein- und Auspackservice</li>
          <li>Möbeldemontage und -montage</li>
          <li>Entsorgung und Entrümpelung</li>
        </ul>
      </section>

      <section className="pt-6 border-t border-gray-200">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <HeartHandshake size={28} className="mr-3 text-pink-500" />
          Regionale Partner
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Lokale Umzugsfirmen kennen die Wege, Parkzonen und oft auch die Hausverwaltungen vor Ort – das kann Abläufe beschleunigen und Kosten senken.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Über Online-Offerten.ch finden Sie geprüfte Partner in Ihrer Region – mit klaren Bewertungen und nachvollziehbaren Offerten.
        </p>
      </section>

      <section className="pt-6 border-t border-gray-200">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <MapPin size={28} className="mr-3 text-cyan-500" />
          Beliebte Umzugsregionen
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Ob Zürich, Bern, Basel oder Luzern – in der ganzen Schweiz helfen wir Ihnen, passende Anbieter zu finden.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Beispiele:{' '}
          <Link href="/umzugsfirma/zuerich" className="text-green-600 hover:underline font-semibold">Zürich</Link>
          {', '}
          <Link href="/umzugsfirma/bern" className="text-green-600 hover:underline font-semibold">Bern</Link>
          {', '}
          <Link href="/umzugsfirma/basel" className="text-green-600 hover:underline font-semibold">Basel</Link>
          {', '}
          <Link href="/umzugsfirma/luzern" className="text-green-600 hover:underline font-semibold">Luzern</Link>
          {' – oder alle '}
          <Link href="/standorte" className="text-green-600 hover:underline font-semibold">Standorte</Link>.
        </p>
      </section>

      <section className="pt-6 border-t border-gray-200">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <Home size={28} className="mr-3 text-teal-500" />
          Fazit
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Ein Privatumzug gelingt mit Planung, klaren Offerten und einem verlässlichen Partner. Starten Sie jetzt mit einer{' '}
          <Link href="/kostenlose-offerte-anfordern" className="text-green-600 hover:underline font-semibold">
            kostenlosen Offertenanfrage
          </Link>
          {' – unverbindlich und schnell.'}
        </p>
      </section>
    </>
  );
};

export default Article;
