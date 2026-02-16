import type { Metadata } from 'next'
import PrivateUmzugPageClient from '@/components/pages/services/PrivateUmzugPageClient'

const canonicalUrl = '/umzugsfirma/privatumzug'

// Service Schema - Enhanced
const serviceSchema = {
  "@type": "Service",
  "serviceType": "Privatumzug",
  "name": "Privatumzug Schweiz – Offerten vergleichen",
  "description": "Vergleichen Sie kostenlos Offerten von geprüften Umzugsfirmen für Ihren Privatumzug in der Schweiz. Wohnungsumzug, Hausumzug, Seniorenumzug – sicher, stressfrei und bis zu 40% günstiger. Online-Offerten.ch ist Ihre Vergleichsplattform.",
  "category": "Umzugsservice / Umzugsvermittlung",
  "url": `https://online-offerten.ch${canonicalUrl}`,
  "provider": {
    "@type": "Organization",
    "name": "Online-Offerten.ch",
    "url": "https://online-offerten.ch",
    "logo": "https://online-offerten.ch/image/logo-icon.webp",
    "description": "Vergleichsplattform für Umzugsfirmen in der Schweiz",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["German"]
    }
  },
  "areaServed": {
    "@type": "Country",
    "name": "Switzerland",
    "alternateName": "Schweiz"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Privatumzug-Dienstleistungen",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wohnungsumzug" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hausumzug" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seniorenumzug" } }
    ]
  },
  "offers": {
    "@type": "Offer",
    "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=privatumzug",
    "price": "0",
    "priceCurrency": "CHF",
    "name": "Kostenlose Offerten für Privatumzug vergleichen",
    "description": "Bis zu 5 kostenlose und unverbindliche Offerten von geprüften Umzugsfirmen für Ihren Privatumzug erhalten"
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "Privatpersonen, die in der Schweiz umziehen möchten"
  }
}

// WebPage Schema
const webPageSchema = {
  "@type": "WebPage",
  "name": "Privatumzug Schweiz – Offerten vergleichen",
  "description": "Vergleichsportal für Privatumzüge in der Schweiz. Kostenlos Offerten von geprüften Umzugsunternehmen anfordern und Umzugskosten sparen.",
  "url": `https://online-offerten.ch${canonicalUrl}`,
  "inLanguage": "de-CH",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Online-Offerten.ch",
    "url": "https://online-offerten.ch"
  },
  "about": { "@type": "Thing", "name": "Privatumzug-Offerten vergleichen" },
  "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".hero-description"] }
}

// BreadcrumbList Schema
const breadcrumbSchema = {
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://online-offerten.ch/" },
    { "@type": "ListItem", "position": 2, "name": "Umzugsfirma", "item": "https://online-offerten.ch/umzugsfirma" },
    { "@type": "ListItem", "position": 3, "name": "Privatumzug", "item": `https://online-offerten.ch${canonicalUrl}` }
  ]
}

// FAQPage Schema
const faqSchema = {
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was kostet ein Privatumzug in der Schweiz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Kosten hängen von der Wohnungsgrösse und dem Umzugsvolumen ab. Richtwerte: 1.5–2.5 Zimmer: 600–1.200 CHF, 3.5 Zimmer: 1.100–1.800 CHF, 4.5 Zimmer: 1.600–2.500 CHF, 5.5+ Zimmer: Ab 2.200 CHF. Vergleichen Sie Offerten kostenlos, um das beste Preis-Leistungs-Verhältnis zu finden."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Leistungen sind bei einem Standard-Wohnungsumzug inklusive?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein Standardangebot umfasst in der Regel: Transport der Möbel und Kartons, professionelle Fahrer und Zügelmänner, Transportversicherung für Ihr Umzugsgut sowie Standard-Verbrauchsmaterial wie Decken und Gurte."
      }
    },
    {
      "@type": "Question",
      "name": "Wie bereite ich mich am besten auf den Umzugstag vor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wichtige Schritte: Frühzeitig aussortieren und entsorgen, alle Kartons beschriften (Inhalt und Zimmer), eine Kiste mit den wichtigsten Dingen separat packen, Parkplätze für den Umzugswagen organisieren."
      }
    },
    {
      "@type": "Question",
      "name": "Was sollte ich bei der Auswahl der Umzugsfirma beachten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Achten Sie auf: Transparente Offerten mit klar aufgeschlüsselten Kosten, Versicherungsnachweis, Kundenbewertungen, Eintrag im Handelsregister, und bei grösseren Umzügen einen kostenlosen Besichtigungstermin."
      }
    },
    {
      "@type": "Question",
      "name": "Wann sollte ich mit der Planung meines Wohnungsumzugs beginnen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "2–3 Monate vorher: Mietvertrag kündigen und Umzugsofferten einholen. 1 Monat vorher: Mit Packen beginnen und Ummeldungen vorbereiten. 1 Woche vorher: Sachen fertig packen und Möbel demontieren. Am Umzugstag: Böden schützen und Zählerstände ablesen."
      }
    },
    {
      "@type": "Question",
      "name": "Lohnt sich ein Ein- und Auspackservice?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein Packservice lohnt sich besonders, wenn Sie wenig Zeit haben, körperlich eingeschränkt sind, wertvolles oder zerbrechliches Inventar haben oder den Umzug so stressfrei wie möglich gestalten möchten."
      }
    }
  ]
}

// Combined Schema
const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [webPageSchema, breadcrumbSchema, serviceSchema, faqSchema]
}

export const metadata: Metadata = {
  title: 'Privatumzug Offerten vergleichen – Bis zu 40% sparen',
  description: 'Umzüge für Privatpersonen: Privatumzug Offerten kostenlos vergleichen ✓ Geprüfte Umzugsfirmen für Wohnungsumzug & Hausumzug. Sicher, stressfrei & bis zu 40% sparen.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/privatumzug',
  },
  openGraph: {
    title: 'Privatumzug Offerten vergleichen – Bis zu 40% sparen',
    description: 'Umzüge für Privatpersonen: Privatumzug Offerten kostenlos vergleichen ✓ Geprüfte Umzugsfirmen für Wohnungsumzug & Hausumzug.',
    url: 'https://online-offerten.ch/umzugsfirma/privatumzug',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzugsservice-Schweiz/privatumzug-offerten-kostenlos-vergleichen.png',
        width: 1200,
        height: 630,
        alt: 'Privatumzug Offerten vergleichen – Online-Offerten.ch',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privatumzug Offerten vergleichen – Bis zu 40% sparen',
    description: 'Umzüge für Privatpersonen: Privatumzug Offerten kostenlos vergleichen ✓ Geprüfte Umzugsfirmen für Wohnungsumzug & Hausumzug.',
    images: ['https://online-offerten.ch/image/umzugsservice-Schweiz/privatumzug-offerten-kostenlos-vergleichen.png'],
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

export default function PrivateUmzugPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />

      {/* Server-rendered SEO content – visible in View Source for crawlers, visually hidden to avoid duplication */}
      <div className="sr-only">
        <article>
          <nav aria-label="Breadcrumb">
            <ol>
              <li><a href="/">Startseite</a></li>
              <li><a href="/umzugsfirma">Umzugsfirma</a></li>
              <li>Privatumzug</li>
            </ol>
          </nav>

          <h1>Privatumzug in der Schweiz – Geprüfte Partner vergleichen</h1>

          <p>Erhalten Sie in nur 5 Minuten bis zu 5 kostenlose Offerten von geprüften Umzugsunternehmen. Vergleichen Sie Preise und Leistungen und sparen Sie bis zu 40% bei Ihrem Umzug.</p>

          <ul>
            <li>Versicherte Firmen</li>
            <li>100% kostenlos</li>
            <li>Nur geprüfte Firmen</li>
            <li>Bis zu 40% sparen</li>
          </ul>

          <h2>Privatumzug in Zürich, Bern, Basel und ganze Schweiz</h2>
          <p>Ein Privatumzug ist mehr als nur der Transport von Möbeln von A nach B – er betrifft das ganze Leben einer Familie. Ob Sie in <a href="/umzugsfirma/zuerich">Zürich</a>, <a href="/umzugsfirma/bern">Bern</a>, <a href="/umzugsfirma/basel">Basel</a>, <a href="/umzugsfirma/aargau">Aargau</a>, <a href="/umzugsfirma/luzern">Luzern</a> oder <a href="/umzugsfirma/st-gallen">St. Gallen</a> wohnen: Die Wohnungsabgabe, neue Kita- oder Schulwege, veränderte Arbeitswege und die gesamte Organisation rund um den Wohnungswechsel erfordern eine frühzeitige Planung. Gerade in der Schweiz konzentrieren sich viele Privatumzüge auf bestimmte Stichtage - Ende März, Ende Juni und Ende September sind typische Mietzinswechsel-Termine, an denen die Nachfrage nach Umzugsfirmen besonders hoch ist.</p>
          <p>Genau hier setzt Online-Offerten.ch an: Als digitale Plattform ermöglicht sie es Ihnen, Ihren geplanten Umzug unkompliziert zu beschreiben und anschliessend mehrere Offerten von geprüften <a href="/umzugsfirma">Umzugsfirmen aus Ihrer Region</a> zu erhalten. Sie entscheiden selbst, welches Unternehmen am besten zu Ihrem Bedarf passt – ob im Raum Zürichsee, Limmattal, der Agglomeration Bern oder anderswo in der Schweiz.</p>
          <p>Alle Offerten sind kostenlos und unverbindlich. Das bedeutet: Sie gehen kein Risiko ein und behalten die volle Kontrolle über Ihre Entscheidung. Die Partner von Online-Offerten.ch sind regionale Spezialisten, die auf Privatumzüge spezialisiert sind und wissen, worauf es bei einem reibungslosen Wohnungswechsel ankommt.</p>

          <h2>So funktioniert der Privatumzug mit Online-Offerten.ch</h2>
          <p>In wenigen Minuten gelangen Sie über Online-Offerten.ch zu passenden Umzugsfirmen in der Schweiz. Der gesamte Prozess ist so gestaltet, dass Sie mit minimalem Aufwand maximale Transparenz erhalten.</p>
          <h3>Schritt für Schritt zur passenden Umzugsfirma</h3>
          <ol>
            <li>Online-Formular ausfüllen: Geben Sie Ihre alte und neue Adresse ein, Etage, ob ein Lift vorhanden ist, Ihr Wunschdatum, den Umfang in Zimmern sowie besondere Güter wie Klavier, Aquarium oder schwere Gerätschaften.</li>
            <li>Anfrage wird geprüft: Online-Offerten.ch prüft Ihre Anfrage und leitet sie an passende, regionale Umzugsfirmen weiter – beispielsweise aus Zürich, Winterthur, Baden, Thun oder Chur.</li>
            <li>Offerten erhalten: Innerhalb von 24–48 Stunden erhalten Sie mehrere Angebote per E-Mail oder Telefon, inklusive detaillierter Leistungsbeschreibung.</li>
            <li>Vergleichen und entscheiden: Prüfen Sie die Offerten in Ruhe: Preis, inkludierte Services (Transport, Verpackung, Montage, Reinigung), Erfahrung und Kundenbewertungen.</li>
          </ol>
          <p>Es besteht kein Abschlusszwang. Wenn Ihnen ein Angebot zusagt, schliessen Sie den Auftrag direkt mit dem ausgewählten Unternehmen ab. Die Plattform übernimmt lediglich die Vermittlung – die Zusammenarbeit erfolgt direkt zwischen Ihnen und der Umzugsfirma Ihrer Wahl.</p>

          <h2>Welche Leistungen umfasst ein moderner Privatumzug?</h2>
          <p>Schweizer Umzugsfirmen bieten heute weit mehr als den reinen Möbeltransport. Ein professioneller Umzugsservice kann den gesamten Prozess von A bis Z übernehmen und Ihnen so erheblichen Stress ersparen.</p>
          <p>Typische Leistungen, die in Offerten auftauchen können:</p>
          <ul>
            <li>Verpackungsservice: Das Team der Umzugsfirma verpackt Ihren gesamten Hausrat fachgerecht in Umzugskartons</li>
            <li>Bereitstellung von Verpackungsmaterial: Kartons, Kleiderboxen, Luftpolsterfolie, Decken</li>
            <li>Demontage und Montage: Aufbau und Abbau von Möbeln, Küchen, Lampen</li>
            <li>Lagerung: Sichere Zwischenlagerung Ihrer Möbel bei zeitversetztem Umzug</li>
            <li>Entsorgung: Alte Möbel und Haushaltsgegenstände werden fachgerecht entsorgt</li>
            <li>Zwischenlagerung: Lagerraum für Mobiliar, wenn der Einzugstermin später liegt</li>
            <li>Umzugsreinigung: Professionelle Räumung und Reinigung mit Abgabegarantie</li>
          </ul>
          <p>Viele Firmen in Zürich, Basel, Lausanne oder Genf bieten auch die Abgabereinigung Ihrer alten Wohnung an – oft mit Garantie, dass die Wohnungsabgabe reibungslos klappt.</p>

          <h2>Kosten eines Privatumzugs: Wovon der Preis in der Schweiz abhängt</h2>
          <p>Die Kosten für einen Privatumzug variieren in der Schweiz stark – je nach Stadt, Distanz, Umfang und gewünschten Dienstleistungen. Genau deshalb ist der Vergleich mehrerer Offerten so wichtig: Nur so erhalten Sie ein realistisches Bild davon, was Ihr Umzug tatsächlich kosten wird.</p>
          <p>Richtwerte: 1,5–2,5 Zimmer: 600–1.200 CHF, 3,5 Zimmer: 1.100–1.800 CHF, 4,5 Zimmer: 1.600–2.500 CHF, 5,5+ Zimmer: Ab 2.200 CHF.</p>
          <p>Timing ist Geld: Wochenend- oder Monatsend-Umzüge (30. Juni, 30. September) sind oft teurer als Termine unter der Woche in der Monatsmitte. Wenn Sie flexibel sind, können Sie bares Geld sparen.</p>

          <h2>Jetzt Ihren Privatumzug online anfragen</h2>
          <p>Planen Sie in den nächsten Wochen oder Monaten einen Umzug? Ob innerhalb Ihrer Stadt, in einen anderen Kanton oder sogar ins Ausland – der erste Schritt zu einem entspannten Umzug ist einfacher als gedacht.</p>
          <p>Füllen Sie jetzt das <a href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=privatumzug">Anfrageformular</a> aus und erhalten Sie schnell mehrere Offerten von Umzugsfirmen aus Ihrer Region. Der Service ist kostenlos, unverbindlich und bringt Ihnen innerhalb von 24–48 Stunden konkrete Angebote direkt in Ihr Postfach.</p>
          <p>Vergleichen Sie in Ruhe, stellen Sie Fragen und entscheiden Sie sich für die Lösung, die am besten zu Ihrem Privatumzug passt. So starten Sie entspannt in Ihr neues Zuhause – mit Profis an Ihrer Seite, die wissen, worauf es ankommt.</p>

          <h3>Häufige Fragen zum Privatumzug</h3>
          <dl>
            <dt>Was kostet ein Privatumzug in der Schweiz?</dt>
            <dd>Die Kosten hängen stark von der Wohnungsgrösse und dem Umzugsvolumen ab. Richtwerte: 1.5–2.5 Zimmer: 600–1.200 CHF, 3.5 Zimmer: 1.100–1.800 CHF, 4.5 Zimmer: 1.600–2.500 CHF, 5.5+ Zimmer: Ab 2.200 CHF. Vergleichen Sie Offerten kostenlos, um das beste Preis-Leistungs-Verhältnis zu finden.</dd>
            <dt>Welche Leistungen sind bei einem Standard-Wohnungsumzug inklusive?</dt>
            <dd>Ein Standardangebot umfasst in der Regel: Transport der Möbel und Kartons, professionelle Fahrer und Zügelmänner, Transportversicherung für Ihr Umzugsgut sowie Standard-Verbrauchsmaterial wie Decken und Gurte.</dd>
            <dt>Wie bereite ich mich am besten auf den Umzugstag vor?</dt>
            <dd>Wichtige Schritte: Frühzeitig aussortieren und entsorgen, alle Kartons beschriften (Inhalt und Zimmer), eine Kiste mit den wichtigsten Dingen separat packen, Parkplätze für den Umzugswagen organisieren.</dd>
            <dt>Was sollte ich bei der Auswahl der Umzugsfirma beachten?</dt>
            <dd>Achten Sie auf: Transparente Offerten mit klar aufgeschlüsselten Kosten, Versicherungsnachweis, Kundenbewertungen, Eintrag im Handelsregister, und bei grösseren Umzügen einen kostenlosen Besichtigungstermin.</dd>
            <dt>Wann sollte ich mit der Planung meines Wohnungsumzugs beginnen?</dt>
            <dd>2–3 Monate vorher: Mietvertrag kündigen und Umzugsofferten einholen. 1 Monat vorher: Mit Packen beginnen und Ummeldungen vorbereiten. 1 Woche vorher: Sachen fertig packen und Möbel demontieren.</dd>
            <dt>Lohnt sich ein Ein- und Auspackservice?</dt>
            <dd>Ein Packservice lohnt sich besonders, wenn Sie wenig Zeit haben, körperlich eingeschränkt sind, wertvolles oder zerbrechliches Inventar haben oder den Umzug so stressfrei wie möglich gestalten möchten.</dd>
          </dl>
        </article>
      </div>

      <PrivateUmzugPageClient />
    </>
  )
}


