'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Check, ListChecks, Plus, RotateCcw, Sparkles, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ChecklistItem = {
  id: string
  text: string
  /** Hint shown under text in the UI */
  hint?: string
  /** Default origin: 'preset' (built-in) or 'custom' (user-added) */
  origin: 'preset' | 'custom'
  /** Phase grouping for visual organization */
  phase: ChecklistPhase
}

type ChecklistPhase = 'before' | 'move' | 'after'

const PHASE_LABEL: Record<ChecklistPhase, string> = {
  before: '8 – 4 Wochen vorher',
  move: 'Umzugswoche',
  after: 'Nach dem Umzug',
}

type Props = {
  citySlug: string
  cityName: string
  canton?: string
}

const STORAGE_PREFIX = 'oo:umzug-checklist:v1:'

/**
 * Default-Liste — bewusst nicht zu lang gehalten, damit sie als
 * „Quick-Win"-Werkzeug funktioniert. Stadt-spezifische Items werden
 * dynamisch ergänzt (siehe `buildPresetItems`).
 */
const PRESETS_BEFORE: Omit<ChecklistItem, 'origin' | 'phase'>[] = [
  {
    id: 'kuendigung',
    text: 'Mietvertrag kündigen oder Nachmieter:in suchen',
    hint: 'Frist im Vertrag prüfen — oft 3 Monate auf Termin.',
  },
  {
    id: 'offerten',
    text: 'Mehrere Umzugsofferten einholen',
    hint: 'Drei vergleichbare Offerten genügen meistens, um den Markt zu sehen.',
  },
  {
    id: 'umzugstermin',
    text: 'Umzugstermin und Wunsch-Slot fixieren',
    hint: 'Frühling/Frühsommer sind in der Schweiz Hochsaison — früh buchen.',
  },
  {
    id: 'parkbewilligung',
    text: 'Parkbewilligung / Halteverbot beantragen',
    hint: 'Stadt-Tiefbauamt: meist 7–14 Tage Vorlauf.',
  },
  {
    id: 'aussortieren',
    text: 'Aussortieren, verkaufen, entsorgen',
    hint: 'Spart unmittelbar bei Volumen, Material und Tragezeit.',
  },
]
const PRESETS_MOVE: Omit<ChecklistItem, 'origin' | 'phase'>[] = [
  {
    id: 'kartons-packen',
    text: 'Umzugskartons beschriften (Raum + Inhalt)',
  },
  {
    id: 'inventar',
    text: 'Inventarliste mit Fotos für Versicherung führen',
    hint: 'Wichtig bei Schäden — speichern Sie Bilder vor dem Verlad.',
  },
  {
    id: 'wert-und-fragiles',
    text: 'Wertsachen und Dokumente separat transportieren',
  },
  {
    id: 'lift-tragwege',
    text: 'Lift-Reservation und Tragwege bestätigen',
    hint: 'Hauswart oder Verwaltung kontaktieren.',
  },
  {
    id: 'reinigung',
    text: 'Endreinigung organisieren oder selber planen',
    hint: 'Mit Abnahmegarantie — vergleicht sich auf der Plattform separat.',
  },
]

const PRESETS_AFTER: Omit<ChecklistItem, 'origin' | 'phase'>[] = [
  {
    id: 'einwohner',
    text: 'Anmeldung bei der neuen Einwohnerkontrolle',
    hint: 'Innerhalb von 14 Tagen nach dem Zuzug.',
  },
  {
    id: 'abmeldung',
    text: 'Abmeldung bei der alten Gemeinde',
  },
  {
    id: 'post',
    text: 'Nachsendeauftrag bei der Post einrichten',
  },
  {
    id: 'versicherungen',
    text: 'Versicherungen melden (Hausrat, Haftpflicht)',
  },
  {
    id: 'adresse',
    text: 'Adresse aktualisieren (Bank, Krankenkasse, Abos)',
  },
]

function buildPresetItems(cityName: string): ChecklistItem[] {
  return [
    ...PRESETS_BEFORE.map(
      (i): ChecklistItem => ({
        ...i,
        origin: 'preset',
        phase: 'before',
        text: i.text.replace('{city}', cityName),
      })
    ),
    ...PRESETS_MOVE.map(
      (i): ChecklistItem => ({
        ...i,
        origin: 'preset',
        phase: 'move',
        text: i.text.replace('{city}', cityName),
      })
    ),
    ...PRESETS_AFTER.map(
      (i): ChecklistItem => ({
        ...i,
        origin: 'preset',
        phase: 'after',
        text: i.text.replace('{city}', cityName),
      })
    ),
  ]
}

type PersistedState = {
  /** ID → checked? */
  checked: Record<string, boolean>
  /** User-added custom items (preset items live in the code) */
  customItems: ChecklistItem[]
}

function readState(key: string): PersistedState {
  if (typeof window === 'undefined') return { checked: {}, customItems: [] }
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return { checked: {}, customItems: [] }
    const parsed = JSON.parse(raw) as PersistedState
    return {
      checked: parsed?.checked && typeof parsed.checked === 'object' ? parsed.checked : {},
      customItems: Array.isArray(parsed?.customItems) ? parsed.customItems : [],
    }
  } catch {
    return { checked: {}, customItems: [] }
  }
}

function writeState(key: string, state: PersistedState) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(state))
  } catch {
    /* localStorage full or disabled */
  }
}

export default function MovingChecklistSection({ citySlug, cityName, canton }: Props) {
  const storageKey = `${STORAGE_PREFIX}${citySlug}`
  const presets = useMemo(() => buildPresetItems(cityName), [cityName])

  const [hydrated, setHydrated] = useState(false)
  const [state, setState] = useState<PersistedState>({ checked: {}, customItems: [] })
  const [draft, setDraft] = useState('')

  useEffect(() => {
    setState(readState(storageKey))
    setHydrated(true)
  }, [storageKey])

  useEffect(() => {
    if (!hydrated) return
    writeState(storageKey, state)
  }, [hydrated, state, storageKey])

  const allItems = useMemo<ChecklistItem[]>(
    () => [...presets, ...state.customItems],
    [presets, state.customItems]
  )

  const totalCount = allItems.length
  const doneCount = allItems.filter((it) => state.checked[it.id]).length
  const progressPct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0

  const toggle = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      checked: { ...prev.checked, [id]: !prev.checked[id] },
    }))
  }, [])

  const addCustom = useCallback(() => {
    const text = draft.trim()
    if (!text) return
    const id = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
    setState((prev) => ({
      ...prev,
      customItems: [
        ...prev.customItems,
        { id, text, origin: 'custom', phase: 'before' },
      ],
    }))
    setDraft('')
  }, [draft])

  const removeCustom = useCallback((id: string) => {
    setState((prev) => {
      const { [id]: _omit, ...restChecked } = prev.checked
      return {
        checked: restChecked,
        customItems: prev.customItems.filter((it) => it.id !== id),
      }
    })
  }, [])

  const reset = useCallback(() => {
    if (typeof window !== 'undefined') {
      const ok = window.confirm(
        'Sollen alle Häkchen und benutzerdefinierten Einträge zurückgesetzt werden?'
      )
      if (!ok) return
    }
    setState({ checked: {}, customItems: [] })
  }, [])

  const groupedItems: Record<ChecklistPhase, ChecklistItem[]> = useMemo(
    () => ({
      before: allItems.filter((i) => i.phase === 'before'),
      move: allItems.filter((i) => i.phase === 'move'),
      after: allItems.filter((i) => i.phase === 'after'),
    }),
    [allItems]
  )

  return (
    <section
      className="border-t border-slate-200/70 bg-gradient-to-b from-white via-emerald-50/30 to-white py-14 dark:border-border dark:from-background dark:via-emerald-950/15 dark:to-background md:py-18"
      aria-labelledby={`checklist-${citySlug}`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div
          className={cn(
            'rounded-3xl border border-slate-200/85 bg-white/95 p-6 shadow-[0_24px_48px_-32px_rgba(15,23,42,0.18)] backdrop-blur sm:p-8 md:p-10',
            'dark:border-border dark:bg-card/95 dark:shadow-[0_24px_48px_-32px_rgba(0,0,0,0.55)]'
          )}
        >
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/45 dark:text-emerald-300">
                <ListChecks className="h-3 w-3" aria-hidden />
                Interaktive Checkliste
              </span>
              <h2
                id={`checklist-${citySlug}`}
                className="mt-3 text-balance text-2xl font-semibold tracking-tight text-slate-950 dark:text-foreground sm:text-[1.7rem]"
              >
                Umzugs-Checkliste für {cityName}
                {canton ? <span className="text-slate-500 dark:text-muted-foreground"> · Kanton {canton}</span> : null}
              </h2>
              <p className="mt-2 max-w-2xl text-[0.9875rem] leading-relaxed text-slate-600 dark:text-muted-foreground">
                Haken Sie ab, was erledigt ist, ergänzen Sie eigene Aufgaben und
                speichern Sie alles automatisch in Ihrem Browser. So behalten Sie
                den Überblick über Kündigung, Termine und Behördengänge.
              </p>
            </div>
            <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:text-right">
              <div className="text-right">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                  Fortschritt
                </p>
                <p className="text-2xl font-bold tabular-nums text-slate-950 dark:text-foreground">
                  {progressPct}%
                </p>
                <p className="text-xs text-slate-500 dark:text-muted-foreground">
                  {doneCount} von {totalCount} erledigt
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="shrink-0 border-slate-200 text-slate-600 hover:text-slate-900 dark:border-border dark:text-muted-foreground dark:hover:text-foreground"
                onClick={reset}
                title="Alle Häkchen und Einträge zurücksetzen"
              >
                <RotateCcw className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                Zurücksetzen
              </Button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
              style={{ width: `${progressPct}%` }}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPct}
              aria-label={`${doneCount} von ${totalCount} Aufgaben erledigt`}
            />
          </div>

          {/* Add custom item */}
          <form
            className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-3"
            onSubmit={(e) => {
              e.preventDefault()
              addCustom()
            }}
          >
            <label className="sr-only" htmlFor={`new-task-${citySlug}`}>
              Eigene Aufgabe hinzufügen
            </label>
            <input
              id={`new-task-${citySlug}`}
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={'Eigene Aufgabe hinzufügen — z. B. „Internet ummelden"…'}
              className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus-visible:border-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 dark:border-border dark:bg-background dark:text-foreground dark:placeholder:text-muted-foreground/70 dark:focus-visible:border-emerald-500"
              maxLength={140}
            />
            <Button
              type="submit"
              variant="cta"
              className="shrink-0 px-5"
              disabled={!draft.trim()}
            >
              <Plus className="mr-1.5 h-4 w-4" aria-hidden />
              Hinzufügen
            </Button>
          </form>

          {/* Phases */}
          <div className="mt-8 space-y-7">
            {(['before', 'move', 'after'] as const).map((phase) => {
              const items = groupedItems[phase]
              if (items.length === 0) return null
              const phaseDone = items.filter((it) => state.checked[it.id]).length
              return (
                <div key={phase}>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-700 dark:text-foreground">
                      {PHASE_LABEL[phase]}
                    </h3>
                    <span className="text-xs tabular-nums text-slate-500 dark:text-muted-foreground">
                      {phaseDone}/{items.length}
                    </span>
                  </div>
                  <ul className="grid gap-2 md:grid-cols-2">
                    {items.map((item) => {
                      const isChecked = Boolean(state.checked[item.id])
                      return (
                        <li
                          key={item.id}
                          className={cn(
                            'group rounded-2xl border px-3.5 py-3 transition-colors',
                            isChecked
                              ? 'border-emerald-200/80 bg-emerald-50/65 dark:border-emerald-900/60 dark:bg-emerald-950/30'
                              : 'border-slate-200/85 bg-white hover:border-emerald-200/80 dark:border-border dark:bg-card/85 dark:hover:border-emerald-900/55'
                          )}
                        >
                          <label className="flex cursor-pointer items-start gap-3">
                            <span
                              className={cn(
                                'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors',
                                isChecked
                                  ? 'border-emerald-600 bg-emerald-600 text-white'
                                  : 'border-slate-300 bg-white group-hover:border-emerald-400 dark:border-border dark:bg-background'
                              )}
                              aria-hidden
                            >
                              {isChecked ? <Check className="h-3.5 w-3.5" /> : null}
                            </span>
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={isChecked}
                              onChange={() => toggle(item.id)}
                            />
                            <span className="min-w-0 flex-1">
                              <span
                                className={cn(
                                  'block text-[0.9375rem] font-medium leading-snug',
                                  isChecked
                                    ? 'text-slate-500 line-through decoration-emerald-400/60 dark:text-muted-foreground'
                                    : 'text-slate-900 dark:text-foreground'
                                )}
                              >
                                {item.text}
                              </span>
                              {item.hint ? (
                                <span className="mt-0.5 block text-xs leading-snug text-slate-500 dark:text-muted-foreground">
                                  {item.hint}
                                </span>
                              ) : null}
                            </span>
                            {item.origin === 'custom' ? (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault()
                                  removeCustom(item.id)
                                }}
                                title="Aufgabe entfernen"
                                className="ml-2 rounded-md p-1 text-slate-400 opacity-0 transition group-hover:opacity-100 hover:bg-rose-50 hover:text-rose-600 dark:text-muted-foreground dark:hover:bg-rose-950/30 dark:hover:text-rose-400"
                              >
                                <Trash2 className="h-3.5 w-3.5" aria-hidden />
                              </button>
                            ) : null}
                          </label>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>

          <p className="mt-7 inline-flex items-center gap-2 text-xs text-slate-500 dark:text-muted-foreground">
            <Sparkles className="h-3 w-3" aria-hidden />
            Ihre Häkchen und eigenen Aufgaben werden lokal in diesem Browser
            gespeichert — sie verlassen Ihr Gerät nicht.
          </p>
        </div>
      </div>
    </section>
  )
}
