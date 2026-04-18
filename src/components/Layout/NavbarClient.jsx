'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  Menu,
  X,
  Home,
  Mail,
  ChevronDown,
  Package,
  Building2,
  Globe2,
  GitCompare,
  Sparkles,
  LayoutGrid,
  Landmark,
  Calculator,
  FileText,
  PiggyBank,
  Wand2,
  BookOpen,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import NavbarAuthSection from '@/src/components/Layout/NavbarAuthSection'
import NavbarMegaMenuNav from '@/components/Layout/NavbarMegaMenuNav'

export default function NavbarClient({ children: logoSlot }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openMobileSections, setOpenMobileSections] = useState({})
  const [openDesktopMenu, setOpenDesktopMenu] = useState(null)
  const desktopMenuCloseTimeoutRef = React.useRef(null)
  const desktopNavRef = React.useRef(null)
  const pathname = usePathname()
  const [mobilePortalReady, setMobilePortalReady] = useState(false)

  useEffect(() => {
    return () => {
      if (desktopMenuCloseTimeoutRef.current) {
        clearTimeout(desktopMenuCloseTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!desktopNavRef.current) return
      if (!desktopNavRef.current.contains(event.target)) {
        setOpenDesktopMenu(null)
      }
    }
    document.addEventListener('mousedown', handleDocumentClick)
    return () => document.removeEventListener('mousedown', handleDocumentClick)
  }, [])

  useEffect(() => {
    setMobilePortalReady(true)
  }, [])

  useEffect(() => {
    if (pathname) setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileMenuOpen) return
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
  }, [mobileMenuOpen])

  const toggleMobileSection = (section) => {
    setOpenMobileSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const openDesktopDropdown = (menuKey) => {
    if (desktopMenuCloseTimeoutRef.current) {
      clearTimeout(desktopMenuCloseTimeoutRef.current)
      desktopMenuCloseTimeoutRef.current = null
    }
    setOpenDesktopMenu(menuKey)
  }

  const scheduleCloseDesktopDropdown = () => {
    if (desktopMenuCloseTimeoutRef.current) {
      clearTimeout(desktopMenuCloseTimeoutRef.current)
    }
    desktopMenuCloseTimeoutRef.current = setTimeout(() => setOpenDesktopMenu(null), 180)
  }

  const umzugLinks = [
    { to: '/umzugsfirma/privatumzug', text: 'Privatumzug', desc: 'Wohnung, Haus & WG', Icon: Home },
    { to: '/umzugsfirma/klaviertransport', text: 'Klaviertransport', desc: 'Spezial- & Schwertransport', Icon: Package },
    { to: '/umzugsfirma/geschaeftsumzug', text: 'Geschäftsumzug', desc: 'Büro & Gewerbe', Icon: Building2 },
    { to: '/umzugsfirma/auslandumzug', text: 'Internationale Umzüge', desc: 'Ausland & Kostenrechner', Icon: Globe2 },
    { to: '/umzugsfirma-vergleichen', text: 'Umzugsfirmen vergleichen', desc: 'Bewertungen & Preise', Icon: GitCompare },
  ]

  const reinigungLinks = [
    { to: '/reinigungsfirma/umzugsreinigung', text: 'Endreinigung', desc: 'Mit Abnahmegarantie', Icon: Sparkles },
    { to: '/reinigungsfirma/wohnungsreinigung', text: 'Wohnungsreinigung', desc: 'Gründlich & zuverlässig', Icon: LayoutGrid },
    { to: '/reinigungsfirma/buero_reinigung', text: 'Büroreinigung', desc: 'Repräsentative Räume', Icon: Landmark },
    { to: '/reinigungsfirma/grundreinigung', text: 'Grundreinigung', desc: 'Tiefenreinigung', Icon: Wand2 },
    { to: '/reinigungsfirma', text: 'Reinigungsfirma finden', desc: 'Regional vergleichen', Icon: Sparkles },
  ]

  const kostenLinks = [
    { to: '/umzugsfirma/umzugskosten', text: 'Umzugskosten-Rechner', desc: 'Preisrahmen einschätzen', Icon: Calculator },
    { to: '/reinigung/reinigungskosten', text: 'Reinigungskosten-Rechner', desc: 'Putzkosten planen', Icon: Calculator },
    { to: '/umzugsofferten', text: 'Umzugsofferte', desc: 'Angebote einholen', Icon: FileText },
    { to: '/guenstig-umziehen', text: 'Günstig umziehen', desc: 'Sparen ohne Stress', Icon: PiggyBank },
  ]

  const megaFeatured = {
    umzug: {
      href: '/umzugsfirma',
      title: 'Umzug planen',
      subtitle: 'Geprüfte Partner in Ihrer Region — mehrere Offerten, ein Formular.',
      cta: 'Zur Übersicht',
      imageSrc: '/fotos/umzugstag.webp',
      imageAlt: 'Umzug mit Umzugskartons',
    },
    reinigung: {
      href: '/reinigungsfirma',
      title: 'Sauber übergeben',
      subtitle: 'End- und Unterhaltsreinigung mit klarer Kommunikation und Festpreisen.',
      cta: 'Leistungen entdecken',
      imageSrc: '/fotos/umzug-reinigung-maler-offerten.webp',
      imageAlt: 'Professionelle Reinigung in der Schweiz',
    },
    kosten: {
      href: '/kostenlose-offerte-anfordern',
      title: 'Kostenlos vergleichen',
      subtitle: 'Eine Anfrage — passende Anbieter — unverbindliche Offerten.',
      cta: 'Jetzt Offerten',
      imageSrc: '/fotos/offerten.webp',
      imageAlt: 'Offerten für Umzug und Reinigung vergleichen',
    },
  }

  const mobileIconAccent = {
    umzug:
      'bg-emerald-100 text-emerald-700 shadow-sm ring-1 ring-emerald-200/90 dark:bg-emerald-950/55 dark:text-emerald-400 dark:ring-emerald-500/25',
    reinigung:
      'bg-sky-100 text-sky-700 shadow-sm ring-1 ring-sky-200/90 dark:bg-sky-950/50 dark:text-sky-400 dark:ring-sky-500/25',
    kosten:
      'bg-amber-100 text-amber-800 shadow-sm ring-1 ring-amber-200/90 dark:bg-amber-950/45 dark:text-amber-300 dark:ring-amber-500/22',
    surface:
      'bg-slate-100/95 text-slate-700 shadow-sm ring-1 ring-slate-200/85 dark:bg-slate-800/65 dark:text-slate-200 dark:ring-slate-600/35',
  }

  const MobileRoundedNavIcon = ({ Icon: LinkIcon, accent }) => (
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${mobileIconAccent[accent]}`}
    >
      <LinkIcon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
    </span>
  )

  const NavItem = ({ to, children, onClick }) => {
    const isActive = pathname === to
    return (
      <Link
        href={to}
        prefetch={false}
        onClick={onClick}
        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${
          isActive
            ? 'bg-green-100 text-green-700 dark:bg-primary/15 dark:text-primary'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-foreground'
        }`}
      >
        {children}
      </Link>
    )
  }

  const closeMobile = () => setMobileMenuOpen(false)

  const mobileMenuPortal =
    mobilePortalReady &&
    createPortal(
      <div className="md:hidden">
        {mobileMenuOpen ? (
          <div
            className="fixed left-0 right-0 top-16 bottom-0 z-[2990] bg-black/40"
            aria-hidden
            onClick={closeMobile}
          />
        ) : null}
        <div
          className={`fixed left-0 right-0 top-16 z-[2995] border-t border-border bg-background shadow-lg rounded-b-md transition-all duration-200 ease-in-out motion-reduce:transition-none ${
            mobileMenuOpen
              ? 'max-h-[min(85vh,calc(100dvh-4rem))] overflow-y-auto opacity-100'
              : 'pointer-events-none max-h-0 overflow-hidden opacity-0'
          }`}
        >
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <nav className="pt-2 pb-5 space-y-1">
              <NavItem to="/" onClick={closeMobile}>
                <MobileRoundedNavIcon Icon={Home} accent="surface" />
                Startseite
              </NavItem>
              <NavItem to="/kostenlose-offerte-anfordern" onClick={closeMobile}>
                <MobileRoundedNavIcon Icon={FileText} accent="surface" />
                OFFERTEN
              </NavItem>

              <div className="pt-1">
                <div className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm font-semibold text-gray-500 rounded-md hover:bg-gray-50 dark:text-muted-foreground dark:hover:bg-muted">
                  <Link prefetch={false} href="/umzugsfirma" onClick={closeMobile} className="flex-1 text-left">
                    UMZUG
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleMobileSection('umzug')}
                    aria-label="Umzug Menü öffnen"
                    className="inline-flex items-center justify-center"
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${openMobileSections.umzug ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    openMobileSections.umzug ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pl-6 pt-1 space-y-1">
                    {umzugLinks.map(({ to, text, Icon: LinkIcon }) => (
                      <NavItem key={to} to={to} onClick={closeMobile}>
                        <MobileRoundedNavIcon Icon={LinkIcon} accent="umzug" />
                        {text}
                      </NavItem>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <div className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm font-semibold text-gray-500 rounded-md hover:bg-gray-50 dark:text-muted-foreground dark:hover:bg-muted">
                  <Link prefetch={false} href="/reinigungsfirma" onClick={closeMobile} className="flex-1 text-left">
                    REINIGUNG
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleMobileSection('reinigung')}
                    aria-label="Reinigung Menü öffnen"
                    className="inline-flex items-center justify-center"
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${openMobileSections.reinigung ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    openMobileSections.reinigung ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pl-6 pt-1 space-y-1">
                    {reinigungLinks.map(({ to, text, Icon: LinkIcon }) => (
                      <NavItem key={to} to={to} onClick={closeMobile}>
                        <MobileRoundedNavIcon Icon={LinkIcon} accent="reinigung" />
                        {text}
                      </NavItem>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => toggleMobileSection('kosten')}
                  className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm font-semibold text-gray-500 rounded-md hover:bg-gray-50 dark:text-muted-foreground dark:hover:bg-muted"
                >
                  <span>KOSTEN & TOOLS</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${openMobileSections.kosten ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    openMobileSections.kosten ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pl-6 pt-1 space-y-1">
                    {kostenLinks.map(({ to, text, Icon: LinkIcon }) => (
                      <NavItem key={to} to={to} onClick={closeMobile}>
                        <MobileRoundedNavIcon Icon={LinkIcon} accent="kosten" />
                        {text}
                      </NavItem>
                    ))}
                  </div>
                </div>
              </div>

              <NavItem to="/ratgeber" onClick={closeMobile}>
                <MobileRoundedNavIcon Icon={BookOpen} accent="surface" />
                RATGEBER
              </NavItem>
              <NavItem to="/kontakt" onClick={closeMobile}>
                <MobileRoundedNavIcon Icon={Mail} accent="surface" />
                Kontakt
              </NavItem>

              <NavbarAuthSection variant="mobile" onNavigate={closeMobile} NavItem={NavItem} />
            </nav>
          </div>
        </div>
      </div>,
      document.body
    )

  return (
    <>
      {mobileMenuPortal}
      <header
        className={`sticky top-0 z-50 border-b border-border/80 shadow-sm ${
          mobileMenuOpen
            ? 'bg-background backdrop-blur-none dark:bg-background'
            : 'bg-background/90 backdrop-blur-md dark:bg-background/95'
        }`}
        style={{ contain: 'layout style', zIndex: 3100 }}
      >
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-center justify-between h-16 gap-2" style={{ minHeight: '64px' }}>
          {logoSlot}

          <nav
            ref={desktopNavRef}
            className="mx-4 hidden max-w-5xl flex-1 items-center justify-center space-x-1 lg:space-x-2 md:flex"
            style={{ minHeight: '40px', contain: 'layout' }}
          >
            <NavItem to="/kostenlose-offerte-anfordern">OFFERTEN</NavItem>
            <NavbarMegaMenuNav
              label="UMZUG"
              baseHref="/umzugsfirma"
              links={umzugLinks}
              featured={megaFeatured.umzug}
              isOpen={openDesktopMenu === 'umzug'}
              onOpen={() => openDesktopDropdown('umzug')}
              onScheduleClose={scheduleCloseDesktopDropdown}
              onToggleMenu={() => setOpenDesktopMenu((prev) => (prev === 'umzug' ? null : 'umzug'))}
              onNavigate={() => setOpenDesktopMenu(null)}
            />
            <NavbarMegaMenuNav
              label="REINIGUNG"
              baseHref="/reinigungsfirma"
              links={reinigungLinks}
              featured={megaFeatured.reinigung}
              isOpen={openDesktopMenu === 'reinigung'}
              onOpen={() => openDesktopDropdown('reinigung')}
              onScheduleClose={scheduleCloseDesktopDropdown}
              onToggleMenu={() => setOpenDesktopMenu((prev) => (prev === 'reinigung' ? null : 'reinigung'))}
              onNavigate={() => setOpenDesktopMenu(null)}
            />
            <NavbarMegaMenuNav
              label="KOSTEN & TOOLS"
              links={kostenLinks}
              featured={megaFeatured.kosten}
              isOpen={openDesktopMenu === 'kosten'}
              onOpen={() => openDesktopDropdown('kosten')}
              onScheduleClose={scheduleCloseDesktopDropdown}
              onToggleMenu={() => setOpenDesktopMenu((prev) => (prev === 'kosten' ? null : 'kosten'))}
              onNavigate={() => setOpenDesktopMenu(null)}
            />
            <NavItem to="/ratgeber">RATGEBER</NavItem>
          </nav>

          <div className="flex items-center justify-end flex-shrink-0 gap-2" style={{ minHeight: '36px', contain: 'layout' }}>
            <NavbarAuthSection variant="desktop" NavItem={NavItem} />
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menü öffnen/schliessen"
                className="ml-auto"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
    </>
  )
}
