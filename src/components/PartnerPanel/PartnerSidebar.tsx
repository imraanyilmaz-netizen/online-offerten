'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Archive,
  PackageX,
  Receipt,
  Crown,
  Settings,
  User,
  MapPin,
  Image as ImageIcon,
  Lock,
  Star,
  Code2,
  Wallet,
  Gift,
  Clock,
  ExternalLink,
  LogOut,
  ChevronRight,
  ChevronDown,
  Plus,
} from 'lucide-react'
import { format } from 'date-fns'
import { de } from 'date-fns/locale/de'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/src/contexts/SupabaseAuthContext'
import { Button } from '@/components/ui/button'
import { usePartnerCounts, type PartnerCounts } from './PartnerCountsContext'

type BadgeKey = keyof PartnerCounts

type NavLeaf = {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  isActive: (pathname: string, search: URLSearchParams) => boolean
  /** Kilit: hangi count alanı bu öğe için badge olarak gösterilecek. */
  badge?: BadgeKey
  /** İkincil rozet (ör. okunmamış sayısı — kırmızı vurgulu). */
  accentBadge?: BadgeKey
}

type NavGroup = {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  items: NavLeaf[]
  matchPath: (pathname: string) => boolean
}

/** matchTab: Sadece /partner/dashboard altında aktif sekme — tab param default'u `available`. */
function matchDashboardTab(tab: string) {
  return (pathname: string, search: URLSearchParams) => {
    if (pathname !== '/partner/dashboard') return false
    const current = search.get('tab') || 'available'
    return current === tab
  }
}

function matchSettingsTab(tab: string) {
  return (pathname: string, search: URLSearchParams) => {
    if (pathname !== '/partner/einstellungen') return false
    const current = search.get('tab') || 'profile'
    return current === tab
  }
}

const dashboardGroup: NavGroup = {
  id: 'overview',
  label: 'Übersicht',
  icon: LayoutDashboard,
  matchPath: (p) => p === '/partner/dashboard',
  items: [
    {
      label: 'Verfügbar',
      href: '/partner/dashboard?tab=available',
      icon: Package,
      isActive: matchDashboardTab('available'),
      badge: 'available',
      accentBadge: 'unreadAvailable',
    },
    {
      label: 'Angenommen',
      href: '/partner/dashboard?tab=purchased',
      icon: ShoppingCart,
      isActive: matchDashboardTab('purchased'),
      badge: 'purchased',
    },
    {
      label: 'Archiviert',
      href: '/partner/dashboard?tab=archived',
      icon: Archive,
      isActive: matchDashboardTab('archived'),
      badge: 'archived',
    },
    {
      label: 'Verpasst',
      href: '/partner/dashboard?tab=missed',
      icon: PackageX,
      isActive: matchDashboardTab('missed'),
      badge: 'missed',
    },
    {
      label: 'Transaktionen',
      href: '/partner/dashboard?tab=transactions',
      icon: Receipt,
      isActive: matchDashboardTab('transactions'),
    },
    {
      label: 'Abonnement',
      href: '/partner/dashboard?tab=subscription',
      icon: Crown,
      isActive: matchDashboardTab('subscription'),
    },
  ],
}

const settingsGroup: NavGroup = {
  id: 'settings',
  label: 'Einstellungen',
  icon: Settings,
  matchPath: (p) => p === '/partner/einstellungen',
  items: [
    {
      label: 'Profil',
      href: '/partner/einstellungen?tab=profile',
      icon: User,
      isActive: matchSettingsTab('profile'),
    },
    {
      label: 'Einsatzgebiete',
      href: '/partner/einstellungen?tab=regions',
      icon: MapPin,
      isActive: matchSettingsTab('regions'),
    },
    {
      label: 'Bilder',
      href: '/partner/einstellungen?tab=images',
      icon: ImageIcon,
      isActive: matchSettingsTab('images'),
    },
    {
      label: 'Sicherheit',
      href: '/partner/einstellungen?tab=security',
      icon: Lock,
      isActive: matchSettingsTab('security'),
    },
    {
      label: 'Bewertungen',
      href: '/partner/einstellungen?tab=reviews',
      icon: Star,
      isActive: matchSettingsTab('reviews'),
    },
    {
      label: 'Widget',
      href: '/partner/einstellungen?tab=widget',
      icon: Code2,
      isActive: matchSettingsTab('widget'),
    },
  ],
}

type PartnerSummary = {
  company_name: string | null
  logo_url: string | null
  slug: string | null
  main_balance: number | null
  bonus_balance: number | null
  has_active_subscription: boolean | null
  subscription_end_date: string | null
}

export default function PartnerSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const router = useRouter()
  const pathname = usePathname() || ''
  const searchParamsRaw = useSearchParams()
  /** useSearchParams() Readonly → zur Typ-Einheit in URLSearchParams hüllen */
  const searchParams = useMemo(
    () => new URLSearchParams(searchParamsRaw?.toString() || ''),
    [searchParamsRaw]
  )
  const { user, signOut } = useAuth()
  const { counts } = usePartnerCounts()

  const [partner, setPartner] = useState<PartnerSummary | null>(null)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    overview: true,
    settings: false,
  })
  const [signingOut, setSigningOut] = useState(false)

  /** Aktif rota değişince ilgili grubu otomatik aç; diğerlerini kapat (accordion). */
  useEffect(() => {
    setOpenGroups((prev) => {
      if (dashboardGroup.matchPath(pathname)) return { overview: true, settings: false }
      if (settingsGroup.matchPath(pathname)) return { overview: false, settings: true }
      return prev
    })
  }, [pathname])

  useEffect(() => {
    let cancelled = false
    async function fetchPartner() {
      if (!user?.id) return
      const { data, error } = await supabase
        .from('partners')
        .select(
          'company_name, logo_url, slug, main_balance, bonus_balance, has_active_subscription, subscription_end_date'
        )
        .eq('id', user.id)
        .maybeSingle()
      if (cancelled) return
      if (!error && data) setPartner(data as PartnerSummary)
    }
    fetchPartner()
    return () => {
      cancelled = true
    }
  }, [user?.id])

  const hasActiveSub = !!(
    partner?.has_active_subscription &&
    partner?.subscription_end_date &&
    new Date(partner.subscription_end_date) > new Date()
  )
  const totalBalance = (partner?.main_balance || 0) + (partner?.bonus_balance || 0)

  const handleSignOut = async () => {
    if (signingOut) return
    setSigningOut(true)
    try {
      await signOut()
      router.replace('/login')
    } finally {
      setSigningOut(false)
    }
  }

  /** Accordion davranışı: tıklanan grup açılır, diğerleri kapanır.
   *  Aynı gruba tekrar tıklanırsa kapanır (hepsi kapalı durum). */
  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => {
      const willOpen = !prev[id]
      const next: Record<string, boolean> = {}
      Object.keys(prev).forEach((k) => { next[k] = false })
      next[id] = willOpen
      return next
    })
  }

  const isTopUpActive = pathname === '/partner/credit-top-up'

  return (
    <nav
      aria-label="Partner-Navigation"
      className="flex h-full w-full flex-col bg-card text-card-foreground"
    >
      {/* Header: Logo + Begrüssung + Firma */}
      <Link
        href="/partner/einstellungen"
        className="group flex items-center gap-3 border-b border-border px-4 py-4 transition-colors hover:bg-muted/40"
        aria-label="Zu den Einstellungen"
      >
        <img
          src={partner?.logo_url || '/image/logo-icon.webp'}
          alt="Firmenlogo"
          loading="lazy"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement
            img.onerror = null
            img.src = '/image/logo-icon.webp'
          }}
          className="h-11 w-11 flex-shrink-0 rounded-lg border border-border bg-background object-contain"
        />
        <div className="min-w-0">
          <p className="truncate text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Willkommen zurück
          </p>
          <p className="truncate text-sm font-semibold text-foreground group-hover:text-primary">
            {partner?.company_name || 'Partner-Dashboard'}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {hasActiveSub ? (
              <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                <Crown className="h-3 w-3" /> Abo aktiv
              </span>
            ) : (
              <>CHF {totalBalance.toFixed(2)} Guthaben</>
            )}
          </p>
        </div>
      </Link>

      {/* Kompakt Stats (nur Desktop-Sidebar) — Guthaben + Bonus + Abo-Status + Top-up CTA */}
      <SidebarStats
        hasActiveSub={hasActiveSub}
        subscriptionEndDate={partner?.subscription_end_date || null}
        bonusBalance={partner?.bonus_balance ?? null}
        mainBalance={partner?.main_balance ?? null}
        isTopUpActive={isTopUpActive}
        onNavigate={onNavigate}
      />

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {/* Übersicht Group */}
        <SidebarGroup
          group={dashboardGroup}
          expanded={openGroups.overview}
          onToggle={() => toggleGroup('overview')}
          pathname={pathname}
          searchParams={searchParams}
          onNavigate={onNavigate}
          counts={counts}
        />

        {/* Einstellungen Group */}
        <SidebarGroup
          group={settingsGroup}
          expanded={openGroups.settings}
          onToggle={() => toggleGroup('settings')}
          pathname={pathname}
          searchParams={searchParams}
          onNavigate={onNavigate}
          counts={null}
        />

        {/* Profil ansehen — external */}
        {partner?.slug ? (
          <a
            href={`/partner/${partner.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4 flex-shrink-0" />
            <span>Profil ansehen</span>
          </a>
        ) : null}
      </div>

      {/* Footer: Logout */}
      <div className="border-t border-border p-3">
        <Button
          variant="ghost"
          onClick={handleSignOut}
          disabled={signingOut}
          className="w-full justify-start gap-3 text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/35 dark:hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          {signingOut ? 'Abmelden…' : 'Abmelden'}
        </Button>
      </div>
    </nav>
  )
}

function SidebarStats({
  hasActiveSub,
  subscriptionEndDate,
  bonusBalance,
  mainBalance,
  isTopUpActive,
  onNavigate,
}: {
  hasActiveSub: boolean
  subscriptionEndDate: string | null
  bonusBalance: number | null
  mainBalance: number | null
  isTopUpActive: boolean
  onNavigate?: () => void
}) {
  const formatChf = (n: number | null) =>
    n === null ? '—' : `CHF ${n.toFixed(2)}`
  const formattedEnd = subscriptionEndDate
    ? format(new Date(subscriptionEndDate), 'dd.MM.yyyy', { locale: de })
    : null

  return (
    <div className="border-b border-border px-3 py-3 space-y-1.5">
      {hasActiveSub && formattedEnd ? (
        <div className="flex items-center gap-2.5 rounded-lg bg-gradient-to-br from-amber-400 via-amber-300 to-orange-300 px-3 py-2 text-black shadow-sm">
          <Star className="h-4 w-4 flex-shrink-0 fill-white text-white" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wide text-amber-900">
              Abo aktiv
            </p>
            <p className="flex items-center gap-1 truncate text-xs font-bold text-amber-950">
              <Clock className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">bis {formattedEnd}</span>
            </p>
          </div>
        </div>
      ) : null}

      <StatRow
        icon={Gift}
        label="Bonus"
        value={formatChf(bonusBalance)}
        iconBg="bg-indigo-100 dark:bg-indigo-950/50"
        iconColor="text-indigo-600 dark:text-indigo-400"
      />

      <StatRow
        icon={Wallet}
        label="Guthaben"
        value={formatChf(mainBalance)}
        iconBg="bg-yellow-100 dark:bg-yellow-950/40"
        iconColor="text-yellow-600 dark:text-yellow-400"
      />

      {/* Guthaben aufladen — direkt unter den Bakiye-Rows, logisch gruppiert */}
      <Link
        href="/partner/credit-top-up"
        onClick={onNavigate}
        className={`mt-1 flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
          isTopUpActive
            ? 'bg-green-600 text-white shadow-sm hover:bg-green-700 dark:bg-emerald-600 dark:hover:bg-emerald-700'
            : 'bg-green-50 text-green-700 hover:bg-green-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/60'
        }`}
      >
        <Plus className="h-4 w-4 flex-shrink-0" />
        <span>Guthaben aufladen</span>
      </Link>
    </div>
  )
}

function StatRow({
  icon: Icon,
  label,
  value,
  iconBg,
  iconColor,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  iconBg: string
  iconColor: string
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-muted/50 transition-colors">
      <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md ${iconBg}`}>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11px] font-medium text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-bold text-foreground">{value}</p>
      </div>
    </div>
  )
}

function SidebarGroup({
  group,
  expanded,
  onToggle,
  pathname,
  searchParams,
  onNavigate,
  counts,
}: {
  group: NavGroup
  expanded: boolean
  onToggle: () => void
  pathname: string
  searchParams: URLSearchParams
  onNavigate?: () => void
  counts: PartnerCounts | null
}) {
  const GroupIcon = group.icon
  const ChevronIcon = expanded ? ChevronDown : ChevronRight
  const groupActive = group.matchPath(pathname)

  /** Gruba ait toplam okunmamış — başlıkta kırmızı rozet olarak gösterilir. */
  const groupUnread = counts?.unreadAvailable ?? 0

  return (
    <div className="mb-2 rounded-xl border border-border bg-background/40 p-1.5 shadow-sm dark:bg-muted/20">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
          groupActive
            ? 'bg-muted text-foreground'
            : 'text-foreground hover:bg-muted/60'
        }`}
      >
        <GroupIcon className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
        <span className="flex-1 text-left">{group.label}</span>
        {!expanded && groupUnread > 0 && group.id === 'overview' ? (
          <span
            className="mr-1 inline-flex min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-bold leading-5 text-white"
            aria-label={`${groupUnread} neue Anfragen`}
          >
            {groupUnread > 99 ? '99+' : groupUnread}
          </span>
        ) : null}
        <ChevronIcon className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform" />
      </button>

      {expanded && (
        <ul className="mt-1 space-y-0.5 pl-3">
          {group.items.map((item) => {
            const Icon = item.icon
            const active = item.isActive(pathname, searchParams)
            const primaryCount = item.badge && counts ? counts[item.badge] : null
            const accentCount = item.accentBadge && counts ? counts[item.accentBadge] : 0
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center gap-3 rounded-md border-l-2 px-3 py-2 text-sm font-medium transition-all ${
                    active
                      ? 'border-l-green-600 bg-green-50 text-green-800 dark:border-l-emerald-400 dark:bg-emerald-950/35 dark:text-emerald-200'
                      : 'border-l-transparent text-muted-foreground hover:border-l-border hover:bg-muted/50 hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="flex-1 truncate">{item.label}</span>

                  {/* Accent badge (neue / ungelesen) */}
                  {accentCount > 0 ? (
                    <span
                      className="inline-flex min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-bold leading-5 text-white"
                      aria-label={`${accentCount} neu`}
                    >
                      {accentCount > 99 ? '99+' : accentCount}
                    </span>
                  ) : null}

                  {/* Sayısal rozet (toplam) */}
                  {primaryCount !== null && primaryCount !== undefined ? (
                    <span
                      className={`inline-flex min-w-[22px] items-center justify-center rounded-full px-1.5 text-[11px] font-semibold leading-5 ${
                        active
                          ? 'bg-green-600 text-white dark:bg-emerald-500'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {primaryCount > 999 ? '999+' : primaryCount}
                    </span>
                  ) : null}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
