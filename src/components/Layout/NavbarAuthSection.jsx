'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import {
  User,
  LogOut,
  LayoutDashboard,
  Settings,
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
                alt="Partner Logo"
                className="w-9 h-9 rounded-full object-cover border border-gray-200"
                onError={() => setLogoFailed(true)}
                loading="lazy"
              />
            ) : (
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {fallbackChar}
              </div>
            )}
          </span>
          <span className="text-sm font-semibold text-gray-800 truncate" title={displayName}>
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
          <Link href={dashboardPath} className="cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        {user?.user_metadata?.role === 'partner' && (
          <DropdownMenuItem asChild>
            <Link href={settingsPath} className="cursor-pointer">
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

  const handleLogout = async () => {
    await signOut()
    window.location.replace('/login?reason=signed_out')
  }

  if (variant === 'desktop') {
    return (
      <div className="hidden md:flex items-center gap-3" style={{ minHeight: '36px' }}>
        {!loading && !user ? (
          <Button asChild size="sm" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
            <Link href="/partner-werden">Partner werden</Link>
          </Button>
        ) : null}
        {loading ? (
          <div className="h-9 w-[140px] rounded-md bg-gray-100" style={{ minHeight: '36px' }} aria-hidden />
        ) : user ? (
          <UserMenu user={user} onLogout={handleLogout} partnerBrand={partnerBrand} />
        ) : (
          <Button asChild size="sm" className="bg-green-600 hover:bg-green-700 text-white" style={{ minWidth: '80px' }}>
            <Link href="/login">Anmelden</Link>
          </Button>
        )}
      </div>
    )
  }

  /* mobile */
  return (
    <div className="border-t pt-4 mt-4">
      {!loading && !user && (
        <NavItem to="/partner-werden" onClick={onNavigate}>
          Partner werden
        </NavItem>
      )}
      {loading ? (
        <div className="h-10 rounded-md bg-gray-100" aria-hidden />
      ) : user ? (
        <>
          <div className="px-3 py-2 flex items-center gap-2 min-w-0">
            <span className="shrink-0">
              {mobileLogoUrl && !mobileLogoFailed ? (
                <img
                  src={mobileLogoUrl}
                  alt="Partner Logo"
                  className="w-7 h-7 rounded-full object-cover border border-gray-200"
                  onError={() => setMobileLogoFailed(true)}
                  loading="lazy"
                />
              ) : (
                <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  {mobileFallbackChar}
                </div>
              )}
            </span>
            <p className="text-sm font-semibold text-gray-700 truncate">{mobileDisplayName}</p>
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
            className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            <LogOut size={18} /> Abmelden
          </button>
        </>
      ) : (
        <NavItem to="/login" onClick={onNavigate}>
          <User size={18} /> Anmelden
        </NavItem>
      )}
    </div>
  )
}
