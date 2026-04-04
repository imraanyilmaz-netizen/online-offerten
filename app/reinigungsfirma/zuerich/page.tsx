import type { Metadata } from 'next'
import { Suspense } from 'react'
import ReinigungsfirmaStadtPageClient, { type StadtInfo } from '@/components/pages/info/ReinigungsfirmaStadtPageClient'

export const metadata: Metadata = {
  title: 'Reinigungsfirma Zürich – Umzugsreinigung & Endreinigung | Kostenlose Offerten',
  description:
    'Reinigungsfirma Zürich: Umzugsreinigung, Endreinigung mit Abnahmegarantie, Wohnungsreinigung und Büroreinigung vergleichen. Bis zu 5 kostenlose Reinigungsofferten von geprüften Anbietern in Zürich und Umgebung – unverbindlich.',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigungsfirma/zuerich',
  },
  openGraph: {
    title: 'Reinigungsfirma Zürich – Umzugsreinigung & Endreinigung | Kostenlose Offerten',
    description:
      'Umzugsreinigung und Endreinigung in Zürich vergleichen: bis zu 5 kostenlose Offerten von geprüften Reinigungsfirmen – Wohnungsabgabe, Büro, Haushalt.',
    url: 'https://online-offerten.ch/reinigungsfirma/zuerich',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/reinigungsfirma-zuerich-finden.png',
        width: 1200,
        height: 630,
        alt: 'Reinigungsfirma Zürich finden',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reinigungsfirma Zürich – Umzugsreinigung & Endreinigung | Kostenlose Offerten',
    description:
      'Reinigungsfirma Zürich: Umzugsreinigung, Endreinigung, Wohnungsreinigung – bis zu 5 kostenlose Offerten.',
    images: ['https://online-offerten.ch/image/reinigungsfirma-zuerich-finden.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const stadtInfo: StadtInfo = {
  name: 'Zürich',
  slug: 'zuerich',
  canonicalUrl: 'https://online-offerten.ch/reinigungsfirma/zuerich',
  description:
    'Vergleichen Sie bis zu 5 Reinigungsofferten von geprüften Firmen in Zürich und der Agglomeration – für Umzugsreinigung, Endreinigung mit Abnahmegarantie, Wohnungsreinigung bei Auszug, Büro oder Haushalt. Kostenlos und unverbindlich.',
  richContent: {
    problemTitle:
      'Umzugsreinigung, Endreinigung, Büro: So finden Sie in Zürich eine passende Reinigungsfirma',
    problemP1:
      'Viele Suchende starten mit Begriffen wie Umzugsreinigung Zürich, Endreinigung mit Abnahmegarantie oder Wohnungsreinigung bei Auszug – und stellen fest, dass Angebote schwer vergleichbar sind. In der Stadt und der Agglomeration sind Übergabetermine oft eng; wer zu spät eine Reinigungsfirma sucht, verliert Slots. Zusätzlich unterscheiden sich die Einsatzorte: enge Altstadthäuser, Neubauten mit Tiefgarage oder Quartiere ohne Lift verlangen unterschiedliche Planung für Zeit, Personal und Material.',
    problemP2:
      'Mit einer einzigen Anfrage bei Online-Offerten.ch beschreiben Sie Ihr Projekt strukturiert. Wir vermitteln bis zu fünf Offerten geprüfter Reinigungsdienste, die in Zürich und Umgebung arbeiten – Sie vergleichen Leistung und Preis transparent, ohne mehrfache Einzelkontakte und ohne Verpflichtung zum Abschluss.',
    articles: [
      {
        title: 'Umzugsreinigung in Zürich: Offerten einholen und Preise vergleichen',
        body:
          'Für eine Umzugsreinigung in Zürich lohnt sich der direkte Preisvergleich: Die Kosten hängen von Fläche, Zustand der Wohnung, Stockwerk und Zeitfenster ab – nicht zuletzt von der Frage, ob eine Abnahmegarantie vereinbart wird. Seriöse Anbieter benennen im Offert Leistungsumfang (Küche inklusive Geräte, Nasszellen, Storen, Balkon) und klären den Übergabetermin mit Puffer für Anfahrt und Parken. Mehrere Reinigungsofferten parallel einzuholen, zeigt marktübliche Spannen für genau Ihre Situation – ohne dass Sie jedes Putzinstitut einzeln anfragen müssen.',
      },
      {
        title: 'Endreinigung mit Abnahmegarantie und Wohnungsabgabe',
        body:
          'Bei der Wohnungsübergabe zählt oft die Endreinigung mit Abnahmegarantie: Schlägt die Abnahme fehl, bessert die Reinigungsfirma nach – sofern das schriftlich fixiert ist. Achten Sie in Offerten auf die genaue Definition (z. B. Küche, Badezimmer, Böden, Storen) und auf den Abnahmetermin. Suchanfragen wie Wohnungsabgabe Reinigung oder Wohnungsreinigung mit Abnahmegarantie zielen genau auf dieses Bedürfnis: klare Leistung statt Missverständnisse am Übergabetag.',
      },
      {
        title: 'Wohnungsreinigung und Haushalt in Zürich und Umgebung',
        body:
          'Neben einmaligen Einsätzen zur Übergabe suchen Haushalte auch wiederkehrende Unterhaltsreinigung oder eine gründliche Grundreinigung. In dicht besiedelten Gebieten lohnt sich die Frage nach festen Zeitfenstern und Erreichbarkeit – gerade wenn Sie eine Reinigungsfirma in der Nähe oder Reinigungsdienste in Ihrer Nähe bevorzugen. Im Formular können Sie Art der Reinigung, Objektgrösse und Ort präzise angeben; so erhalten Sie passende Offerten von Anbietern, die Zürich und die umliegenden Gemeinden kennen.',
      },
      {
        title: 'Büro- und Gewerbereinigung am Wirtschaftsstandort Zürich',
        body:
          'Zwischen Finanzplatz, Zürich West und den Bürolagen entlang der Verkehrsachsen sind Reinigungsfenster oft ausserhalb der Geschäftszeiten üblich. Zu klären sind Festpreis versus Stundensatz, Verbrauchsmaterial, Zutrittssicherheit und eventuelle Spezialreinigungen nach Events. Ein Vergleich mehrerer Offerten hilft, Leistung und Konditionen gegenüberzustellen – analog zu Haushaltsprojekten, aber mit klaren betrieblichen Anforderungen.',
      },
      {
        title: 'Reinigungskosten in Zürich einordnen – ohne Überraschungen',
        body:
          'Lohn- und Standortkosten in Zürich liegen über dem schweizerischen Durchschnitt; trotzdem variieren Reinigungskosten je nach Aufwand stark. Wer nur eine einzelne Offerte hat, erkennt schwer, ob der Preis marktüblich ist. Mehrere vergleichbare Angebote – mit denselben Eckdaten zu Fläche, Lift, Parken und Leistungsumfang – schaffen Transparenz. Tragen Sie diese Angaben vollständig ein; dann erhalten Sie Offerten, die Sie sinnvoll gegenüberstellen können.',
      },
    ],
  },
}

export default function ReinigungsfirmaZuerichPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600" />
        </div>
      }
    >
      <ReinigungsfirmaStadtPageClient stadtInfo={stadtInfo} />
    </Suspense>
  )
}
