'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import {
  LogOut,
  LayoutDashboard,
  Settings,
  ArrowRight,
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

const PARTNER_WERDEN_CARD_IMAGE = '/image/c6bed9bf-0e88-4eaf-b57f-0938374cdb53.webp'

const UserMenu = ({ user, onLogout, partnerBrand }) => {
  const [logoFailed, setLogoFailed] = useState(false)
  const dashboardPath = user?.user_metadata?.role === 'admin' ? '/admin-dashboard' : '/partner/dashboard'
  const settingsPath = '/partner/einstellungen'
  const logoUrl = partnerBrand.logoUrl || user?.user_metadata?.logo_url || user?.user_metadata?.avatar_url || null
  const displayName = partnerBrand.companyName || user?.user_metadata?.company_name || user?.email?.split('@')?.[0] || 'Konto'
  const fallbackChar = (partnerBrand.companyName?.charAt(0) || user?.user_metadata?.company_name?.charAt(0) || user?.email?.charAt(0) || 'U').toUpperCase()

  useEffect(() => {
    setLogoFailed(false)
  }, [logoUrl])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 rounded-full pl-1 pr-2 gap-2 max-w-[220px]">
          <span className="shrink-0">
            {logoUrl && !logoFailed ? (
              <img
                src={logoUrl}
                alt={displayName ? `${displayName} Logo` : 'Partner Logo'}
                className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-border"
                onError={() => setLogoFailed(true)}
                loading="lazy"
              />
            ) : (
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {fallbackChar}
              </div>
            )}
          </span>
          <span className="text-sm font-semibold text-gray-800 truncate dark:text-foreground" title={displayName}>
            {displayName}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{partnerBrand.companyName || user.user_metadata?.company_name || user.email}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link prefetch={false} href={dashboardPath} className="cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        {user?.user_metadata?.role === 'partner' && (
          <DropdownMenuItem asChild>
            <Link prefetch={false} href={settingsPath} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Einstellungen</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Abmelden</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/**
 * Auth + account UI for navbar (desktop column or mobile drawer block).
 */
export default function NavbarAuthSection({ variant = 'desktop', onNavigate, NavItem }) {
  const [partnerBrand, setPartnerBrand] = useState({ logoUrl: null, companyName: null })
  const [mobileLogoFailed, setMobileLogoFailed] = useState(false)
  /** Auth + Supabase ilk render'da sunucu ile istemci farklı olabiliyor; hydration uyumu için. */
  const [mounted, setMounted] = useState(false)
  const { user, signOut, loading } = useAuth()
  const settingsPath = '/partner/einstellungen'
  const mobileLogoUrl = partnerBrand.logoUrl || user?.user_metadata?.logo_url || user?.user_metadata?.avatar_url || null
  const mobileDisplayName = partnerBrand.companyName || user?.user_metadata?.company_name || user?.email?.split('@')?.[0] || user?.email || 'Konto'
  const mobileFallbackChar = (partnerBrand.companyName?.charAt(0) || user?.user_metadata?.company_name?.charAt(0) || user?.email?.charAt(0) || 'U').toUpperCase()

  useEffect(() => {
    const fetchPartnerBrand = async () => {
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
      if (error || !data) return
      setPartnerBrand({
        logoUrl: data.logo_url || null,
        companyName: data.company_name || null,
      })
    }
    fetchPartnerBrand()
  }, [user?.email, user?.user_metadata?.role])

  useEffect(() => {
    setMobileLogoFailed(false)
  }, [mobileLogoUrl])

  useEffect(() => {
    // Navbar auth: SSR ile ilk client render aynı kalsın (Supabase loading farkı hydration hatası veriyordu)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- kasıtlı: mount sonrası gerçek auth UI
    setMounted(true)
  }, [])

  const handleLogout = async () => {
    await signOut()
    window.location.replace('/login?reason=signed_out')
  }

  const guestMobileCtas = (onNavigate) => (
    <div className="space-y-3">
      <Link
        prefetch={false}
        href="/partner-werden"
        onClick={onNavigate}
        className="group block overflow-hidden rounded-2xl border border-emerald-200/90 bg-card shadow-sm ring-1 ring-emerald-900/[0.04] transition-colors hover:border-emerald-300 hover:shadow-md dark:border-emerald-900/50 dark:ring-white/10 dark:hover:border-emerald-800"
      >
        <div className="relative aspect-[2.1/1] w-full overflow-hidden bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element -- nav promo card; static asset */}
          <img
            src={PARTNER_WERDEN_CARD_IMAGE}
            alt=""
            width={640}
            height={304}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.92)_10%,rgba(0,0,0,0.78)_22%,rgba(0,0,0,0.52)_38%,rgba(0,0,0,0.22)_52%,transparent_82%)]"
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 space-y-1 p-3 pt-16">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-emerald-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              Partnerprogramm
            </p>
            <p className="text-sm font-semibold leading-snug text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
              Partner werden
            </p>
            <p className="text-xs leading-snug text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
              Kostenlos registrieren und Anfragen aus Ihrer Region erhalten.
            </p>
            <span className="mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              Jetzt starten
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </div>
        </div>
      </Link>
      <Button
        asChild
        className="h-11 w-full rounded-xl bg-emerald-600 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
      >
        <Link prefetch={false} href="/login" onClick={onNavigate}>
          Anmelden
        </Link>
      </Button>
    </div>
  )

  if (variant === 'desktop') {
    if (!mounted) {
      return (
        <div className="hidden md:flex items-center gap-3" style={{ minHeight: '36px' }}>
          <div className="h-9 w-[140px] rounded-md bg-gray-100 dark:bg-muted" style={{ minHeight: '36px' }} aria-hidden />
        </div>
      )
    }
    return (
      <div className="hidden md:flex items-center gap-2" style={{ minHeight: '36px' }}>
        {!loading && !user ? (
          <Button
            asChild
            size="sm"
            variant="outline"
            className="h-9 rounded-xl border-emerald-200 bg-emerald-50/50 px-4 font-semibold text-emerald-700 shadow-sm transition-colors hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/70"
          >
            <Link prefetch={false} href="/partner-werden">Partner werden</Link>
          </Button>
        ) : null}
        {loading ? (
          <div className="h-9 w-[140px] rounded-md bg-gray-100 dark:bg-muted" style={{ minHeight: '36px' }} aria-hidden />
        ) : user ? (
          <UserMenu user={user} onLogout={handleLogout} partnerBrand={partnerBrand} />
        ) : (
          <Button
            asChild
            size="sm"
            className="h-9 rounded-xl bg-emerald-600 px-4 font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
            style={{ minWidth: '92px' }}
          >
            <Link prefetch={false} href="/login">Anmelden</Link>
          </Button>
        )}
      </div>
    )
  }

  /* mobile */
  if (!mounted) {
    return (
      <div className="border-t border-border pt-4 mt-4">
        <div className="space-y-3" aria-hidden>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-muted/40">
            <div className="aspect-[2.1/1] w-full bg-gray-200 dark:bg-muted" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.5)_45%,transparent_82%)]" />
            <div className="absolute inset-x-0 bottom-0 space-y-2 p-3 pt-14">
              <div className="h-2.5 w-16 rounded bg-white/25" />
              <div className="h-4 w-[min(75%,140px)] rounded bg-white/30" />
              <div className="h-3 w-full rounded bg-white/20" />
            </div>
          </div>
          <div className="h-11 w-full rounded-xl bg-gray-100 dark:bg-muted" />
        </div>
      </div>
    )
  }

  return (
    <div className="border-t border-border pt-4 mt-4">
      {!loading && !user ? guestMobileCtas(onNavigate) : null}
      {loading ? (
        <div className="space-y-3" aria-hidden>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-muted/40">
            <div className="aspect-[2.1/1] w-full bg-gray-200 dark:bg-muted" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.5)_45%,transparent_82%)]" />
            <div className="absolute inset-x-0 bottom-0 space-y-2 p-3 pt-14">
              <div className="h-2.5 w-16 rounded bg-white/25" />
              <div className="h-4 w-[140px] max-w-[75%] rounded bg-white/30" />
              <div className="h-3 w-full rounded bg-white/20" />
            </div>
          </div>
          <div className="h-11 w-full rounded-xl bg-gray-100 dark:bg-muted" />
        </div>
      ) : user ? (
        <>
          <div className="px-3 py-2 flex items-center gap-2 min-w-0">
            <span className="shrink-0">
              {mobileLogoUrl && !mobileLogoFailed ? (
                <img
                  src={mobileLogoUrl}
                  alt={mobileDisplayName ? `${mobileDisplayName} Logo` : 'Partner Logo'}
                  className="w-7 h-7 rounded-full object-cover border border-gray-200 dark:border-border"
                  onError={() => setMobileLogoFailed(true)}
                  loading="lazy"
                />
              ) : (
                <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  {mobileFallbackChar}
                </div>
              )}
            </span>
            <p className="text-sm font-semibold text-gray-700 truncate dark:text-foreground">{mobileDisplayName}</p>
          </div>
          <NavItem to={user?.user_metadata?.role === 'admin' ? '/admin-dashboard' : '/partner/dashboard'} onClick={onNavigate}>
            <LayoutDashboard size={18} /> Dashboard
          </NavItem>
          {user?.user_metadata?.role === 'partner' && (
            <NavItem to={settingsPath} onClick={onNavigate}>
              <Settings size={18} /> Einstellungen
            </NavItem>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-foreground"
          >
            <LogOut size={18} /> Abmelden
          </button>
        </>
      ) : null}
    </div>
  )
}
