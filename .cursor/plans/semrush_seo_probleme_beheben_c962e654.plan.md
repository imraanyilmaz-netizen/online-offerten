---
name: Semrush SEO Probleme beheben
overview: "Behebung aller identifizierten SEO-Probleme aus dem Semrush-Audit: Duplizierte Titles, fehlende H1-Tags, duplizierter Inhalt, schwache Überschriftenhierarchie, fehlende llms.txt und interne Links optimieren."
todos: []
---

# Semrush SEO Audit Probleme beheben

## Übersicht der Probleme

Basierend auf dem Semrush-Audit vom 29. Dezember 2025:

1. **8 Seiten mit duplizierten Title-Tags** (Kritisch)
2. **7 Seiten mit dupliziertem Inhalt** (Kritisch)
3. **56 Seiten ohne H1-Überschrift** (Kritisch)
4. **3 Seiten mit schwacher Überschriftenhierarchie** (Wichtig)
5. **llms.txt fehlt** (Wichtig)
6. **1 Seite mit nur einem internen Link** (Niedrig)

## Implementierungsplan

### Phase 1: Duplizierte Title-Tags beheben

**Problem:** 8 Seiten haben identische Title-Tags, was zu Ranking-Problemen führt.

**Lösung:**

- Alle Seiten in `app/` durchgehen und Title-Tags auf Eindeutigkeit prüfen
- Jede Seite muss einen eindeutigen, beschreibenden Title haben
- Format: `[Hauptkeyword] | [Zusatzinfo] | Online-Offerten.ch`
- Besonders prüfen: Homepage, Service-Seiten, Location-Seiten

**Betroffene Dateien (zu prüfen):**

- `app/page.tsx` - Homepage
- Alle Service-Seiten (`app/privatumzug/page.tsx`, `app/geschaeftsumzug/page.tsx`, etc.)
- Alle Location-Seiten (`app/umzugsfirma-zuerich/page.tsx`, etc.)
- Alle Malerfirma-Seiten (`app/malerfirma-zuerich/page.tsx`, etc.)

### Phase 2: H1-Tags hinzufügen

**Problem:** 56 Seiten haben keine H1-Überschrift.

**Lösung:**

- Jede Seite muss genau ein H1-Tag haben
- H1 sollte das Hauptkeyword enthalten
- H1 sollte mit dem Title-Tag übereinstimmen (aber nicht identisch sein)

**Zu prüfende Komponenten:**

- `components/pages/HomePageClient.tsx` - Prüfen ob H1 vorhanden
- Alle PageClient-Komponenten in `components/pages/`
- Alle Location-PageClient-Komponenten in `components/pages/locations/`

**Beispiel-Fix für Homepage:**

```typescript
// In HomePageClient.tsx sollte ein H1 vorhanden sein
<h1 className="...">
  Kostenlose Offerten für Umzug, Reinigung & Renovierung vergleichen
</h1>
```

### Phase 3: Duplizierten Inhalt beheben

**Problem:** 7 Seiten haben zu 85% identischen Inhalt.

**Lösung:**

- Canonical-Tags zu allen Seiten hinzufügen (falls nicht vorhanden)
- Bei wirklich dupliziertem Inhalt: Canonical auf die Hauptseite setzen
- Oder: Inhalt differenzieren und einzigartig machen

**Zu prüfen:**

- Alle Seiten sollten `alternates.canonical` in `generateMetadata` haben
- Prüfen ob WWW/Non-WWW Redirects korrekt sind (308 Redirects sind korrekt)

**Beispiel:**

```typescript
export const metadata: Metadata = {
  // ...
  alternates: {
    canonical: 'https://online-offerten.ch/[seiten-url]',
  },
}
```

### Phase 4: Überschriftenhierarchie verbessern

**Problem:** 3 Seiten haben schwache Überschriftenhierarchie.

**Lösung:**

- Korrekte H1 → H2 → H3 Hierarchie sicherstellen
- Keine Übersprungenen Ebenen (z.B. H1 direkt zu H3)
- Jede Seite sollte mindestens ein H2 haben

**Zu prüfen:**

- Homepage (`components/pages/HomePageClient.tsx`)
- Service-Seiten
- Location-Seiten

### Phase 5: llms.txt erstellen

**Problem:** llms.txt fehlt (404 Fehler).

**Lösung:**

- Neue Datei `public/llms.txt` erstellen
- Inhalt gemäß [Ilmstxt.org](https://ilmstxt.org) Standard
- Kurze Beschreibung der Website, Services, Kontaktinfo

**Datei erstellen:**

- `public/llms.txt` mit strukturiertem Inhalt über die Website

### Phase 6: Interne Links optimieren

**Problem:** 1 Seite hat nur einen internen Link.

**Lösung:**

- Homepage und wichtige Seiten sollten mehr interne Links haben
- Relevante interne Links zu Service-Seiten, Location-Seiten hinzufügen
- Breadcrumb-Navigation sicherstellen

**Zu prüfen:**

- `components/pages/HomePageClient.tsx` - Mehr interne Links hinzufügen
- Footer-Navigation prüfen
- Sidebar-Navigation in Service-Seiten prüfen

## Priorisierung

1. **Kritisch (sofort):** Duplizierte Titles, fehlende H1-Tags, duplizierter Inhalt
2. **Wichtig (diese Woche):** Überschriftenhierarchie, llms.txt
3. **Niedrig (nächste Woche):** Interne Links optimieren

## Technische Details

### Title-Tag Format

- Länge: 50-60 Zeichen (optimal)
- Format: `[Hauptkeyword] | [Zusatz] | Online-Offerten.ch`
- Jeder Title muss eindeutig sein

### H1-Tag Anforderungen

- Genau ein H1 pro Seite
- Enthält Hauptkeyword
- Sollte natürlich und lesbar sein
- Nicht identisch mit Title-Tag

### Canonical-Tags

- Jede Seite muss ein Canonical-Tag haben
- Format: `https://online-offerten.ch/[url]`
- Keine Query-Parameter im Canonical

## Testing

Nach Implementierung:

1. Semrush erneut crawlen lassen
2. Google Search Console prüfen
3. Manuell einige Seiten auf H1/Titles prüfen
4. Canonical-Tags mit SEO-Tools validieren