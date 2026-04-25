'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createPortal } from 'react-dom'
import {
  Send,
  Menu,
  X,
  LayoutDashboard,
  Settings,
  Wallet,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/src/contexts/SupabaseAuthContext'
import { supabase } from '@/lib/supabaseClient'
import PartnerSidebar from './PartnerSidebar'

type TopLink = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  primary?: boolean
}

const TOP_LINKS: TopLink[] = [
  { href: '/partner/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/partner/einstellungen', label: 'Einstellungen', icon: Settings },
  { href: '/partner/credit-top-up', label: 'Guthaben aufladen', icon: Wallet, primary: true },
]

/**
 * Dashboard-spezifische Navbar für Partnerfirmen.
 *
 * Wird nur auf Partner-Panel-Routen gerendert (siehe PartnerShell).
 * Die öffentliche Haupt-Navbar (OFFERTEN / UMZUG / REINIGUNG) wird auf diesen
 * Seiten in Layout.tsx ausgeblendet, damit das Panel wie eine eigenständige
 * App wirkt und nicht mit Marketing-Links ablenkt.
 */
export default function PartnerNavbar() {
  const pathname = usePathname() || ''
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { user, signOut } = useAuth()
  const [partnerBrand, setPartnerBrand] = useState<{
    logoUrl: string | null
    companyName: string | null
  }>({ logoUrl: null, companyName: null })
  const [logoFailed, setLogoFailed] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  /** Route-Wechsel → Mobile-Drawer automatisch schliessen. */
  useEffect(() => {
    if (pathname) setMobileOpen(false)
  }, [pathname])

  /** Body-Scroll sperren, solange der Mobile-Drawer offen ist. */
  useEffect(() => {
    if (!mobileOpen) return
    const prevOverflow = document.body.style.overflow
    const prevPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }
    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.paddingRight = prevPaddingRight
    }
  }, [mobileOpen])

  useEffect(() => {
    let cancelled = false
    async function loadBrand() {
      if (!user?.email || user?.user_metadata?.role !== 'partner') {
        setPartnerBrand({ logoUrl: null, companyName: null })
        return
      }
      const { data, error } = await supabase
        .from('partners')
        .select('logo_url, company_name')
        .eq('email', user.email)
        .limit(1)
        .maybeSingle()
      if (cancelled || error || !data) return
      setPartnerBrand({
        logoUrl: data.logo_url || null,
        companyName: data.company_name || null,
      })
    }
    loadBrand()
    return () => {
      cancelled = true
    }
  }, [user?.email, user?.user_metadata?.role])

  useEffect(() => {
    setLogoFailed(false)
  }, [partnerBrand.logoUrl])

  const handleLogout = async () => {
    await signOut()
    window.location.replace('/login?reason=signed_out')
  }

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  const logoUrl =
    partnerBrand.logoUrl ||
    user?.user_metadata?.logo_url ||
    user?.user_metadata?.avatar_url ||
    null
  const displayName =
    partnerBrand.companyName ||
    user?.user_metadata?.company_name ||
    user?.email?.split('@')?.[0] ||
    'Konto'
  const fallbackChar = (
    partnerBrand.companyName?.charAt(0) ||
    user?.user_metadata?.company_name?.charAt(0) ||
    user?.email?.charAt(0) ||
    'U'
  ).toUpperCase()

  /** Mobile-Drawer: zeigt die komplette Sidebar-Navigation als Overlay. */
  const mobileDrawer =
    mounted &&
    createPortal(
      <div className="lg:hidden">
        {mobileOpen ? (
          <div
            className="fixed inset-x-0 bottom-0 top-16 z-[2990] bg-black/40"
            aria-hidden
            onClick={() => setMobileOpen(false)}
          />
        ) : null}
        <div
          className={`fixed inset-x-0 bottom-0 top-16 z-[2995] flex flex-col border-t border-border bg-card shadow-xl transition-transform duration-200 ease-in-out motion-reduce:transition-none ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full pointer-events-none'
          }`}
          aria-hidden={!mobileOpen}
        >
          <div className="h-full overflow-y-auto">
            <PartnerSidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      </div>,
      document.body
    )

  return (
    <>
      {mobileDrawer}
      <header
        className="sticky top-0 z-50 border-b border-border/80 bg-background/90 shadow-sm backdrop-blur-md dark:bg-background/95"
        style={{ contain: 'layout style', zIndex: 3100 }}
      >
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div
            className="flex h-16 items-center justify-between gap-2"
            style={{ minHeight: '64px' }}
          >
            {/* Brand */}
            <Link href="/" className="group flex flex-shrink-0 items-center gap-2.5">
              <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow-sm">
                <Send className="h-[18px] w-[18px] text-white" aria-hidden />
              </span>
              <span
                className="text-[22px] font-bold italic leading-none tracking-tight text-foreground md:text-2xl lg:text-[26px]"
                style={{
                  fontFamily:
                    'Inter, "Inter Fallback", ui-sans-serif, system-ui, sans-serif',
                  fontSynthesis: 'none',
                  fontOpticalSizing: 'none',
                  fontFeatureSettings: '"liga" 1, "calt" 1',
                }}
              >
                Online Offerten
              </span>
            </Link>

            {/* Desktop-Navigation (Panel-Tops) */}
            <nav
              aria-label="Partner-Hauptnavigation"
              className="mx-4 hidden max-w-5xl flex-1 items-center justify-center gap-1 lg:flex lg:gap-2"
              style={{ minHeight: '40px', contain: 'layout' }}
            >
              {TOP_LINKS.map(({ href, label, icon: Icon, primary }) => {
                const active = isActive(href)
                const base =
                  'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors'
                const style = primary
                  ? active
                    ? 'bg-green-600 text-white shadow-sm hover:bg-green-700 dark:bg-emerald-600 dark:hover:bg-emerald-700'
                    : 'bg-green-50 text-green-700 hover:bg-green-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/60'
                  : active
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                return (
                  <Link
                    key={href}
                    href={href}
                    prefetch={false}
                    aria-current={active ? 'page' : undefined}
                    className={`${base} ${style}`}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" aria-hidden />
                    <span>{label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Rechts: User-Menu + Mobile-Hamburger */}
            <div
              className="flex flex-shrink-0 items-center justify-end gap-2"
              style={{ minHeight: '36px', contain: 'layout' }}
            >
              {!mounted ? (
                <div
                  className="hidden h-9 w-[140px] rounded-md bg-gray-100 dark:bg-muted md:block"
                  style={{ minHeight: '36px' }}
                  aria-hidden
                />
              ) : user ? (
                <div className="hidden md:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-10 max-w-[220px] gap-2 rounded-full pl-1 pr-2"
                      >
                        <span className="shrink-0">
                          {logoUrl && !logoFailed ? (
                            /* eslint-disable-next-line @next/next/no-img-element -- Supabase avatar URL */
                            <img
                              src={logoUrl}
                              alt="Partner Logo"
                              className="h-9 w-9 rounded-full border border-gray-200 object-cover dark:border-border"
                              onError={() => setLogoFailed(true)}
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-bold text-white">
                              {fallbackChar}
                            </div>
                          )}
                        </span>
                        <span
                          className="hidden truncate text-sm font-semibold text-gray-800 dark:text-foreground lg:inline"
                          title={displayName}
                        >
                          {displayName}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="truncate text-sm font-medium leading-none">
                            {displayName}
                          </p>
                          <p className="truncate text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link
                          prefetch={false}
                          href="/partner/dashboard"
                          className="cursor-pointer"
                        >
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          prefetch={false}
                          href="/partner/einstellungen"
                          className="cursor-pointer"
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Einstellungen</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Abmelden</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : null}

              {/* Mobile-Hamburger: öffnet Drawer mit kompletter Sidebar-Navigation */}
              <div className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileOpen((v) => !v)}
                  aria-label={mobileOpen ? 'Menü schliessen' : 'Menü öffnen'}
                  aria-expanded={mobileOpen}
                  className="ml-auto"
                >
                  {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
