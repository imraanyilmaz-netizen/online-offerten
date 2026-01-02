# Master Template: Server + Client Component Split für Stadt-Seiten

## 📋 Übersicht

Dieses Template zeigt die optimale Architektur für SEO-optimierte Stadt-Landing-Pages mit Server + Client Component Split.

**Ziel:** 
- ✅ 500-700+ Wörter statisches HTML für Google's ersten Render
- ✅ Keine "thin content" Warnungen
- ✅ Keine "programmatic landing page" Erkennung
- ✅ Optimale Performance durch Client Component Separation

## 🏗️ Architektur

### Server Component (`app/umzugsfirma-[city]/page.tsx`)

**KEIN `'use client'` - Vollständig server-side**

#### 1. Schema.org (Server-side)
```typescript
// Service Schema + FAQPage Schema
const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [serviceSchema, faqSchema]
}

// Script mit strategy="beforeInteractive" für SEO
<Script
  id="city-schema"
  type="application/ld+json"
  strategy="beforeInteractive"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(combinedSchema)
  }}
/>
```

#### 2. Hero Section (Server-rendered)
- `<h1>` Hauptüberschrift
- 2-3 einleitende Paragraphen (60-100 Wörter)
- **KEINE** Animationen, **KEINE** framer-motion

#### 3. Hauptinhalt (Server-rendered)
**Mindestens 500-700 Wörter statisches HTML:**

- **Article 1:** "Zügelfirmen in [City] vergleichen..." (3 Paragraphen, ~200 Wörter)
- **Article 2:** "Umzugskosten in [City]" (Text + Tabelle, ~150 Wörter)
- **Article 3:** "Vorteile beim Firmenvergleich" (~100 Wörter)
- **Article 4:** "Checkliste für die perfekte Zügelfirma" (~150 Wörter)
- **Article 5:** "Spartipps" (~100 Wörter)
- **Article 6:** CTA Section (~30 Wörter)
- **Article 7:** "Dienstleistungen im Überblick" (~200 Wörter)
- **Article 8:** Lokale Besonderheiten (~80 Wörter)

**Total: ~1010 Wörter statisches HTML**

#### 4. Tabellen (Server-rendered)
- Statische HTML-Tabellen
- **KEINE** Animationen
- Direkt im HTML für Google

### Client Component (`components/pages/locations/Umzugsfirma[City]PageClient.tsx`)

**NUR interaktive Elemente:**

```typescript
interface Props {
  showSidebar?: boolean
  showFAQ?: boolean
  showNavigation?: boolean
}

// Conditional rendering:
// - Service Grid (CTA Buttons) - default
// - Sidebar - showSidebar={true}
// - FAQ - showFAQ={true}
// - Navigation - showNavigation={true}
```

**Entfernt:**
- ❌ framer-motion
- ❌ Komplexe Animationen
- ❌ Dynamic imports (außer für große Komponenten)

**Erlaubt:**
- ✅ CSS transitions (hover effects)
- ✅ Interaktive UI-Elemente
- ✅ Conditional rendering

## 📝 Template-Struktur

### Server Component Pattern:

```typescript
// app/umzugsfirma-[city]/page.tsx
import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import { cityServiceData } from '@/data/cityLocalBusinessData'
import { faqs } from '@/data/locationFaqs'
import UmzugsfirmaCityPageClient from '@/components/pages/locations/UmzugsfirmaCityPageClient'

const city = "[City]"
const cityData = cityServiceData[city]

// 1. Schema Definition
const serviceSchema = { /* ... */ }
const faqSchema = { /* ... */ }
const combinedSchema = { /* ... */ }

// 2. Metadata
export const metadata: Metadata = { /* ... */ }

// 3. Server Component
export default function UmzugsfirmaCityPage() {
  return (
    <>
      {/* Schema Script */}
      <Script ... />
      
      {/* Hero Section - Server */}
      <section>
        <h1>...</h1>
        <p>...</p>
        <UmzugsfirmaCityPageClient /> {/* Service Grid */}
      </section>
      
      {/* Main Content - Server */}
      <main>
        <article>...</article> {/* 500-700+ Wörter */}
        <article>...</article>
        {/* ... */}
      </main>
      
      {/* Sidebar - Client */}
      <UmzugsfirmaCityPageClient showSidebar={true} />
      
      {/* FAQ & Navigation - Client */}
      <UmzugsfirmaCityPageClient showFAQ={true} showNavigation={true} />
    </>
  )
}
```

## ✅ Checkliste für neue Stadt-Seiten

- [ ] Server Component erstellt (`app/umzugsfirma-[city]/page.tsx`)
- [ ] **KEIN** `'use client'` im Server Component
- [ ] H1 + Hero-Paragraphen (Server)
- [ ] Mindestens 500-700 Wörter statischer Inhalt (Server)
- [ ] Kosten-Tabelle als statisches HTML (Server)
- [ ] Schema.org (Service + FAQPage) server-side
- [ ] Client Component für interaktive Elemente
- [ ] Framer Motion entfernt
- [ ] Metadata unverändert
- [ ] Canonical URL korrekt

## 🎯 SEO-Vorteile

1. **Rich Content im ersten HTML:** Google sieht sofort 500-700+ Wörter
2. **Keine Thin Content Warnungen:** Ausreichend Text vorhanden
3. **Keine Programmatic Detection:** Einzigartiger, lokaler Inhalt
4. **Schnelle Indexierung:** Schema.org server-side gerendert
5. **Bessere Performance:** Kleinerer Client Bundle

## 📊 Word Count Beispiel (Zürich)

- Hero: ~60 Wörter
- Article 1: ~200 Wörter
- Article 2: ~150 Wörter
- Article 3: ~100 Wörter
- Article 4: ~150 Wörter
- Article 5: ~100 Wörter
- Article 6: ~30 Wörter
- Article 7: ~200 Wörter
- Article 8: ~80 Wörter

**Total: ~1010 Wörter statisches HTML** ✅

## 🔄 Wiederverwendung für andere Städte

1. `app/umzugsfirma-zuerich/page.tsx` kopieren
2. `city` Variable ändern
3. Lokale Inhalte anpassen (Stadtkreise, Besonderheiten)
4. Client Component wiederverwenden
5. Schema automatisch angepasst

**Master Template:** ✅ Zürich Seite

