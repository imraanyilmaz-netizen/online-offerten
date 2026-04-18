import {
  findServiceInCategory,
  getServicePathSegment,
} from '@/data/categories'

const SITE = 'https://online-offerten.ch'

const CATEGORY_LABEL_FOR_TITLE: Record<string, string> = {
  umzugsfirma: 'Umzugsfirma',
  reinigungsfirma: 'Reinigung',
  malerfirma: 'Malerfirma',
}

/** Zusätzliche SEO-Texte; fehlende Einträge → Fallback über Service-Label. */
const SEO: Record<string, Record<string, { title: string; description: string }>> = {
  umzugsfirma: {
    privatumzug: {
      title: 'Privatumzug Offerten kostenlos vergleichen » Bis zu 40% sparen',
      description:
        'Privatumzug Offerten kostenlos vergleichen \u2713 Geprüfte Umzugsfirmen für Wohnungsumzug & Hausumzug. Sicher, stressfrei & bis zu 40% sparen. Jetzt vergleichen!',
    },
    kleintransport: {
      title: 'Kleintransport – Kostenlose Offerten vergleichen',
      description:
        'Kleintransport und Einzelmöbel: Bis zu 5 kostenlose Offerten von geprüften Umzugsfirmen in der Schweiz – schnell, transparent und regional.',
    },
    lagerung_service: {
      title: 'Möbellagerung – Kostenlose Offerten vergleichen',
      description:
        'Möbel einlagern: Kostenlose Offerten von geprüften Anbietern für sichere Lagerung in der Schweiz vergleichen.',
    },
    geschaeftsumzug: {
      title: 'Geschäftsumzug: Kostenlose Offerten vergleichen',
      description:
        'Kosten für Büroumzug & Firmenumzug vergleichen. Geschäftsumzug in der Nähe: Gratis Offerten von geprüften Umzugsfirmen. Schnell, transparent und regional.',
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
        'Vergleichen Sie bis zu 5 kostenlose Offerten für Räumung und Entrümpelung in der Schweiz. Geprüfte Firmen, transparente Preise und schnelle Abwicklung.',
    },
    entsorgung_service: {
      title: 'Entsorgung & Räumung: Kostenlose Offerten vergleichen',
      description:
        'Fachgerechte Entsorgung und Räumung: Holen Sie kostenlose Offerten von geprüften Firmen ein – umweltgerecht, regional und unverbindlich.',
    },
  },
  reinigungsfirma: {
    wohnungsreinigung: {
      title: 'Wohnungsreinigung mit Abnahmegarantie – Kostenlose Offerten vergleichen',
      description:
        'Professionelle Wohnungsreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Wohnungsübergabe garantiert.',
    },
    hausreinigung: {
      title: 'Hausreinigung mit Abnahmegarantie – Kostenlose Offerten vergleichen',
      description:
        'Professionelle Hausreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Hausübergabe garantiert.',
    },
    buero_reinigung: {
      title: 'Büroreinigung – Kostenlose Offerten vergleichen',
      description:
        'Professionelle Büroreinigung. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Büroreinigung garantiert.',
    },
    umzugsreinigung: {
      title: 'Umzugsreinigung Preis – Kostenlose Offerten vergleichen',
      description:
        'Umzugsreinigung Preis: Was kostet die professionelle Reinigung? Professionelle Umzugsreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Wohnungsübergabe garantiert.',
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
        'Vergleichen Sie bis zu 5 kostenlose Offerten für Räumung und Entsorgung in der Schweiz. Geprüfte Firmen, transparente Preise und schnelle Abwicklung.',
    },
    entsorgung_service: {
      title: 'Entsorgung & Räumung: Kostenlose Offerten vergleichen',
      description:
        'Fachgerechte Entsorgung und Räumung: Holen Sie kostenlose Offerten von geprüften Firmen ein – umweltgerecht, regional und unverbindlich.',
    },
  },
  malerfirma: {
    maler_service: {
      title: 'Malerarbeiten in der Schweiz – Kostenlose Offerten vergleichen',
      description:
        'Malerarbeiten Schweiz: Vergleichen Sie kostenlos Offerten von geprüften Malerfirmen. Innenanstrich, Aussenanstrich, Fassadenanstrich & Renovierung – sicher, professionell und bis zu 40% günstiger.',
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
  const title = `${svc.label} – Kostenlose Offerten vergleichen | ${catLabel}`
  const description = svc.desc
    ? `${svc.label}: ${svc.desc}. Bis zu 5 kostenlose Offerten von geprüften Anbietern in der Schweiz – unverbindlich.`
    : `${svc.label} in der Schweiz: Kostenlose Offerten von geprüften Anbietern vergleichen und bis zu 40% sparen.`

  return {
    title,
    description,
    canonical: `${SITE}/${categorySlug}/${pathSeg}`,
  }
}

/** SEO für `/{category}/{serviceSegment}/{citySlug}` (Leistung in einer Stadt). */
export function getServiceCityLandingMetadata(
  categorySlug: string,
  serviceUrlSegment: string,
  location: { name: string; slug: string; canton: string }
): { title: string; description: string; canonical: string } | null {
  const svc = findServiceInCategory(categorySlug, serviceUrlSegment)
  if (!svc) return null

  const pathSeg = getServicePathSegment(svc)
  const base = getServiceLandingMetadata(categorySlug, serviceUrlSegment)
  if (!base) return null

  const catLabel = CATEGORY_LABEL_FOR_TITLE[categorySlug] || 'Online-Offerten.ch'
  const title = `${svc.label} ${location.name} – Offerten vergleichen | ${catLabel}`
  const description = `${svc.label} in ${location.name} (Kanton ${location.canton}): ${base.description}`

  return {
    title,
    description,
    canonical: `${SITE}/${categorySlug}/${pathSeg}/${location.slug}`,
  }
}
