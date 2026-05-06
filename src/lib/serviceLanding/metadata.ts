import {
  findServiceInCategory,
  getServicePathSegment,
} from '@/data/categories'
import { serviceCityLandingVariants } from '@/lib/seoVariants'

const SITE = 'https://online-offerten.ch'

const CATEGORY_LABEL_FOR_TITLE: Record<string, string> = {
  umzugsfirma: 'Umzugsfirma',
  reinigungsfirma: 'Reinigung',
  malerfirma: 'Malerfirma',
}

const CATEGORY_LABEL_PLURAL: Record<string, string> = {
  umzugsfirma: 'Umzugsfirmen',
  reinigungsfirma: 'Reinigungsfirmen',
  malerfirma: 'Malerfirmen',
}

const CATEGORY_BRANCHE_SINGULAR: Record<string, string> = {
  umzugsfirma: 'Umzugsfirma',
  reinigungsfirma: 'Reinigungsfirma',
  malerfirma: 'Malerfirma',
}

/** Zusätzliche SEO-Texte; fehlende Einträge → Fallback über Service-Label. */
const SEO: Record<string, Record<string, { title: string; description: string }>> = {
  umzugsfirma: {
    privatumzug: {
      title: 'Privatumzug Offerten kostenlos vergleichen » Bis zu 40% sparen',
      description:
        'Privatumzug Offerten kostenlos vergleichen \u2713 geprüfte Umzugsfirmen für Wohnungsumzug & Hausumzug. Sicher, stressfrei & bis zu 40% sparen. Jetzt vergleichen!',
    },
    kleintransport: {
      title: 'Kleintransport – Kostenlose Offerten vergleichen',
      description:
        'Kleintransport und Einzelmöbel: Bis zu 5 kostenlose Offerten von geprüfte Umzugsfirmen in der Schweiz – schnell, transparent und regional.',
    },
    lagerung_service: {
      title: 'Möbellagerung – Kostenlose Offerten vergleichen',
      description:
        'Möbel einlagern: Kostenlose Offerten von geprüften Anbietern für sichere Lagerung in der Schweiz vergleichen.',
    },
    geschaeftsumzug: {
      title: 'Geschäftsumzug: Kostenlose Offerten vergleichen',
      description:
        'Kosten für Büroumzug & Firmenumzug vergleichen. Geschäftsumzug in der Nähe: Gratis Offerten von geprüfte Umzugsfirmen. Schnell, transparent und regional.',
    },
    auslandumzug: {
      title: 'Auslandumzug – Kostenlose Offerten vergleichen',
      description:
        'Internationale Umzüge: Vergleichen Sie kostenlos mehrere geprüfte Umzugsfirmen und sparen Sie bis zu 40%. Offerten für Umzüge nach Deutschland, Österreich, Frankreich & ganz Europa.',
    },
    klaviertransport: {
      title: 'Klaviertransport: Kostenlose Offerten vergleichen',
      description:
        'Klaviertransport & schwere Stücke: Vergleichen Sie kostenlos geprüfte Umzugsfirmen. Sicher, versichert und professionell. Jetzt Offerten anfordern!',
    },
    raeumung_service: {
      title: 'Räumung & Entsorgung: Kostenlose Offerten vergleichen',
      description:
        'Vergleichen Sie bis zu 5 kostenlose Offerten für Räumung und Entrümpelung in der Schweiz. geprüfte Firmen, transparente Preise und schnelle Abwicklung.',
    },
    entsorgung_service: {
      title: 'Entsorgung & Räumung: Kostenlose Offerten vergleichen',
      description:
        'Fachgerechte Entsorgung und Räumung: Holen Sie kostenlose Offerten von geprüfte Firmen ein – umweltgerecht, regional und unverbindlich.',
    },
  },
  reinigungsfirma: {
    wohnungsreinigung: {
      title: 'Wohnungsreinigung mit Abnahmegarantie – Kostenlose Offerten vergleichen',
      description:
        'Professionelle Wohnungsreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüfte Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Wohnungsübergabe garantiert.',
    },
    hausreinigung: {
      title: 'Hausreinigung mit Abnahmegarantie – Kostenlose Offerten vergleichen',
      description:
        'Professionelle Hausreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüfte Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Hausübergabe garantiert.',
    },
    buero_reinigung: {
      title: 'Büroreinigung – Kostenlose Offerten vergleichen',
      description:
        'Professionelle Büroreinigung. Erhalten Sie kostenlose Offerten von geprüfte Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Büroreinigung garantiert.',
    },
    umzugsreinigung: {
      title: 'Umzugsreinigung Preis – Kostenlose Offerten vergleichen',
      description:
        'Umzugsreinigung Preis: Was kostet die professionelle Reinigung? Professionelle Umzugsreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüfte Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Wohnungsübergabe garantiert.',
    },
    unterhaltsreinigung: {
      title: 'Unterhaltsreinigung – Kostenlose Offerten vergleichen',
      description:
        'Unterhaltsreinigung für Büro, Haus oder Wohnung: Fordern Sie kostenlose Offerten an und vergleichen Sie professionelle Reinigungsservices bequem online.',
    },
    grundreinigung: {
      title: 'Grundreinigung – Kostenlose Offerten vergleichen',
      description:
        'Gründliche Grundreinigung vom Profi: Erhalten Sie kostenlose Angebote von zertifizierten Reinigungsfirmen und wählen Sie den besten Anbieter aus.',
    },
    baureinigung: {
      title: 'Baureinigung – Kostenlose Offerten vergleichen',
      description:
        'Baureinigung nach Neubau oder Renovation: Holen Sie kostenlose Offerten ein und vergleichen Sie zuverlässige Reinigungsfirmen für perfekte Resultate.',
    },
    fensterreinigung: {
      title: 'Fensterreinigung – Kostenlose Offerten vergleichen',
      description:
        'Fensterreinigung vom Profi: Fordern Sie kostenlose Offerten an und vergleichen Sie Reinigungsfirmen für streifenfreie und professionelle Ergebnisse.',
    },
    bodenreinigung: {
      title: 'Bodenreinigung – Kostenlose Offerten vergleichen',
      description:
        'Bodenreinigung für Parkett, Stein oder Teppich: Erhalten Sie kostenlose Offerten und vergleichen Sie qualifizierte Reinigungsfirmen in Ihrer Region.',
    },
    fassadenreinigung: {
      title: 'Fassadenreinigung – Kostenlose Offerten vergleichen',
      description:
        'Fassadenreinigung für Haus oder Gebäude: Erhalten Sie kostenlose Offerten und vergleichen Sie erfahrene Reinigungsfirmen für nachhaltige Sauberkeit.',
    },
    hofreinigung: {
      title: 'Hofreinigung – Kostenlose Offerten vergleichen',
      description:
        'Professionelle Hofreinigung: Fordern Sie kostenlose Offerten an und vergleichen Sie Reinigungsfirmen für saubere Aussenbereiche und gepflegte Umgebung.',
    },
    raeumung_service: {
      title: 'Räumung & Entsorgung: Kostenlose Offerten vergleichen',
      description:
        'Vergleichen Sie bis zu 5 kostenlose Offerten für Räumung und Entsorgung in der Schweiz. geprüfte Firmen, transparente Preise und schnelle Abwicklung.',
    },
    entsorgung_service: {
      title: 'Entsorgung & Räumung: Kostenlose Offerten vergleichen',
      description:
        'Fachgerechte Entsorgung und Räumung: Holen Sie kostenlose Offerten von geprüfte Firmen ein – umweltgerecht, regional und unverbindlich.',
    },
  },
  malerfirma: {
    maler_service: {
      title: 'Malerarbeiten in der Schweiz – Kostenlose Offerten vergleichen',
      description:
        'Malerarbeiten Schweiz: Vergleichen Sie kostenlos Offerten von geprüfte Malerfirmen. Innenanstrich, Aussenanstrich, Fassadenanstrich & Renovierung – sicher, professionell und bis zu 40% günstiger.',
    },
  },
}

export function getServiceLandingMetadata(
  categorySlug: string,
  urlSegment: string
): { title: string; description: string; canonical: string } | null {
  const svc = findServiceInCategory(categorySlug, urlSegment)
  if (!svc) return null

  const pathSeg = getServicePathSegment(svc)
  const internalId = svc.id

  const block = SEO[categorySlug]?.[internalId] ?? null
  if (block) {
    return {
      title: block.title,
      description: block.description,
      canonical: `${SITE}/${categorySlug}/${pathSeg}`,
    }
  }

  const catLabel = CATEGORY_LABEL_FOR_TITLE[categorySlug] || 'Online-Offerten.ch'
  const title = `${svc.label} Schweiz: Kostenlose Offerten vergleichen & bis zu 40% sparen`
  const description = svc.desc
    ? `${svc.label} (${svc.desc}): Bis zu 5 kostenlose Offerten von geprüfte ${catLabel}-Anbietern vergleichen und bis zu 40% sparen – schnell & unverbindlich.`
    : `${svc.label} in der Schweiz: Bis zu 5 kostenlose Offerten von geprüften Anbietern vergleichen und bis zu 40% sparen – schnell & unverbindlich.`

  return {
    title,
    description,
    canonical: `${SITE}/${categorySlug}/${pathSeg}`,
  }
}

/** SEO für `/{category}/{serviceSegment}/{citySlug}` (Leistung in einer Stadt).
 *
 * Ziele:
 *  - Nutzer erkennt Service + Ort + Intention (Offerten vergleichen) schon im Title
 *  - Keine Keyword-Duplikation (früher war `${svc.label}` zwei Mal in der Description)
 *  - Description bleibt unter 160 Zeichen (Google schneidet sonst ab)
 */
/**
 * Klaviertransport-Stadtseiten erhalten dedizierte, jeweils einzigartige
 * Title-/Description-Varianten (deterministisch aus dem Slug). So vermeiden
 * wir copy-paste-Eindrücke und decken Long-Tail-Keywords ab:
 *  - klaviertransport kosten schweiz
 *  - klaviertransport aargau
 *  - klaviertransport luzern
 *  - flügeltransport
 *  - klaviertransport [stadt] preise
 */
function klavierSeed(slug: string): number {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h + slug.charCodeAt(i) * (i + 5)) % 1031
  return h
}

function klaviertransportCityMetadata(location: {
  name: string
  slug: string
  canton: string
}): { title: string; description: string } {
  /*
   * Title-Längen-Budget:
   *  - Google zeigt ~50–60 Zeichen vor Ellipse (~580 px).
   *  - Wir kalkulieren mit dem längsten Stadt-Namen "La Chaux-de-Fonds" (17 Z.)
   *    bzw. "Yverdon-les-Bains" (17 Z.). Die Varianten liegen damit zwischen
   *    ~46 (Zürich) und ~60 Zeichen (CH-de-F.) – jede passt komplett in die SERP.
   *  - Keyword "Klaviertransport" steht möglichst vorne, wo Google am meisten
   *    Gewicht für Ranking und CTR vergibt.
   */
  const c = location.name
  const k = location.canton
  const titleVariants = [
    `Klaviertransport ${c} – Offerten vergleichen`,
    `Klaviertransport ${c} (${k}) – Preise & Offerten`,
    `Klaviertransport ${c}: Klavier & Flügel zügeln`,
    `Pianotransport ${c} – Klaviertransport-Anbieter`,
    `Klaviertransport ${c} Preise – Offerten gratis`,
  ]

  /*
   * Description-Längen-Budget: ~150–160 Zeichen, Google schneidet danach ab.
   * Mit ${c} = 17 Z. liegen die Varianten zwischen ~125 und ~150 Zeichen.
   * Keine Soft-Hyphens (­) in Metadaten – Google zählt sie als Zeichen und
   * sie können in Snippets als sichtbare Bindestriche erscheinen.
   */
  const descVariants = [
    `Klaviertransport ${c}: Klavier & Flügel zügeln, Klaviertransport-Offerten vergleichen. Pianotransport Schweiz – jetzt gratis Offerten einholen.`,
    `Klaviertransport ${c} Preise auf einen Blick. Klavier- und Flügeltransport im ${k} – Klaviertransport-Anbieter vergleichen und sparen.`,
    `Klaviertransport in ${c} (${k}): Klaviertransport Preisvergleich Schweiz für Klavier (Upright) und Flügel (Stutz-/Konzertflügel).`,
    `Klavier & Flügel zügeln Preise ${c}: Pianotransport Schweiz, Klaviertransport-Anbieter vergleichen, gratis Klaviertransport-Offerten.`,
    `Professioneller Klaviertransport in ${c}: Klavier & Flügel zügeln, Klaviertransport-Offerten vergleichen, gratis Anfrage.`,
  ]
  const seed = klavierSeed(location.slug)
  return {
    title: titleVariants[seed % titleVariants.length],
    description: descVariants[(seed + 2) % descVariants.length],
  }
}

/**
 * Geschäftsumzug-Stadtseiten erhalten dedizierte, einzigartige Title-/
 * Description-Varianten (deterministisch aus dem Slug).
 *  - Title-Limit ≤60 Zeichen, getestet mit "La Chaux-de-Fonds" (17 Z.).
 *  - Keywords: Geschäftsumzug, Firmenumzug, Büroumzug, Geschäftsumzug Schweiz.
 */
function geschaeftsumzugSeed(slug: string): number {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h + slug.charCodeAt(i) * (i + 11)) % 1049
  return h
}

function geschaeftsumzugCityMetadata(location: {
  name: string
  slug: string
  canton: string
}): { title: string; description: string } {
  const c = location.name
  const k = location.canton
  /* Title ≤ 60 Zeichen auch bei "La Chaux-de-Fonds" (17 Z.):
   *   "Geschäftsumzug " (15) + 17 + Suffix max 28 = 60.
   *   "Firmenumzug "    (12) + 17 + Suffix max 31 = 60. */
  const titleVariants = [
    `Geschäftsumzug ${c} – Offerten vergleichen`,
    `Geschäftsumzug ${c} (${k}) – Preise & Offerten`,
    `Firmenumzug ${c}: Büro, Ladenlokal, Werkstatt`,
    `Büroumzug ${c} – Geschäftsumzug-Anbieter`,
    `Geschäftsumzug ${c}: Firmenumzug-Offerten`,
  ]

  const descVariants = [
    `Geschäftsumzug ${c}: Büroumzug, Firmenumzug, Ladenlokal & Werkstatt. Geschäftsumzug-Offerten vergleichen – jetzt gratis Offerten einholen.`,
    `Geschäftsumzug ${c} Preise auf einen Blick. Büroumzug und Firmenumzug im ${k} – Geschäftsumzug-Anbieter vergleichen und sparen.`,
    `Firmenumzug in ${c} (${k}): Geschäftsumzug-Anbieter mit Wochenend-Etappen, IT-Slot und klarem Konzept – kostenlose Offerten vergleichen.`,
    `Büroumzug ${c}: Geschäftsumzug Schweiz, Firmenumzug-Anbieter vergleichen, gratis Geschäftsumzug-Offerten – kostenlos und unverbindlich.`,
    `Professioneller Geschäftsumzug in ${c}: Büroumzug, Firmenumzug, Ladenlokal-Umzug, Werkstatt – jetzt Offerten vergleichen.`,
  ]
  const seed = geschaeftsumzugSeed(location.slug)
  return {
    title: titleVariants[seed % titleVariants.length],
    description: descVariants[(seed + 2) % descVariants.length],
  }
}

export function getServiceCityLandingMetadata(
  categorySlug: string,
  serviceUrlSegment: string,
  location: { name: string; slug: string; canton: string }
): { title: string; description: string; canonical: string } | null {
  const svc = findServiceInCategory(categorySlug, serviceUrlSegment)
  if (!svc) return null

  const pathSeg = getServicePathSegment(svc)

  if (categorySlug === 'umzugsfirma' && svc.id === 'klaviertransport') {
    const { title, description } = klaviertransportCityMetadata(location)
    return {
      title,
      description,
      canonical: `${SITE}/${categorySlug}/${pathSeg}/${location.slug}`,
    }
  }

  if (categorySlug === 'umzugsfirma' && svc.id === 'geschaeftsumzug') {
    const { title, description } = geschaeftsumzugCityMetadata(location)
    return {
      title,
      description,
      canonical: `${SITE}/${categorySlug}/${pathSeg}/${location.slug}`,
    }
  }

  const branche = CATEGORY_BRANCHE_SINGULAR[categorySlug] || 'Anbieter'
  const branchePlural = CATEGORY_LABEL_PLURAL[categorySlug] || 'Anbieter'

  const { title, description } = serviceCityLandingVariants(
    {
      service: svc.label,
      stadt: location.name,
      kanton: location.canton,
      branche,
      branchePlural,
    },
    `${categorySlug}|${svc.id}|${location.slug}`
  )

  return {
    title,
    description,
    canonical: `${SITE}/${categorySlug}/${pathSeg}/${location.slug}`,
  }
}
