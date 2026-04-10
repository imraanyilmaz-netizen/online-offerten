'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Menu, X, Home, Mail, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import NavbarAuthSection from '@/src/components/Layout/NavbarAuthSection'

export default function NavbarClient({ children: logoSlot }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openMobileSections, setOpenMobileSections] = useState({})
  const [openDesktopMenu, setOpenDesktopMenu] = useState(null)
  const desktopMenuCloseTimeoutRef = React.useRef(null)
  const desktopNavRef = React.useRef(null)
  const pathname = usePathname()

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
    { to: '/umzugsfirma/privatumzug', text: 'Privatumzug' },
    { to: '/umzugsfirma/spezialtransporte/klaviertransport', text: 'Klaviertransport' },
    { to: '/umzugsfirma/geschaeftsumzug', text: 'Geschäftsumzug' },
    { to: '/umzugsfirma/internationale-umzuege', text: 'Internationale Umzüge' },
    { to: '/umzugsfirma-vergleichen', text: 'Umzugsfirmen vergleichen' },
  ]

  const reinigungLinks = [
    { to: '/reinigung/umzugsreinigung', text: 'Umzugsreinigung' },
    { to: '/reinigung/wohnungsreinigung', text: 'Wohnungsreinigung' },
    { to: '/reinigung/bueroreinigung', text: 'Büroreinigung' },
    { to: '/reinigung/grundreinigung', text: 'Grundreinigung' },
    { to: '/reinigungsfirma', text: 'Reinigungsfirma finden' },
  ]

  const kostenLinks = [
    { to: '/umzugsfirma/umzugskosten', text: 'Umzugskosten Rechner' },
    { to: '/reinigung/reinigungskosten', text: 'Reinigungskosten Rechner' },
    { to: '/umzugsofferten', text: 'Umzugsofferte' },
    { to: '/guenstig-umziehen', text: 'Günstig umziehen' },
  ]

  const NavItem = ({ to, children, onClick }) => {
    const isActive = pathname === to
    return (
      <Link
        href={to}
        prefetch={false}
        onClick={onClick}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${
          isActive ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}
      >
        {children}
      </Link>
    )
  }

  const DesktopDropdownNav = ({ label, links, menuKey, baseHref = null }) => {
    const isOpen = openDesktopMenu === menuKey
    return (
      <div className="relative" onMouseEnter={() => openDesktopDropdown(menuKey)} onMouseLeave={scheduleCloseDesktopDropdown}>
        <div className="flex items-center gap-1 rounded-xl border border-transparent px-3 py-2 text-sm font-semibold text-gray-600 transition-colors duration-150 ease-in-out hover:border-emerald-100 hover:bg-emerald-50/60 hover:text-gray-900">
          {baseHref ? (
            <Link prefetch={false} href={baseHref} className="leading-none text-gray-700 hover:text-gray-900">
              {label}
            </Link>
          ) : (
            <button type="button" onClick={() => openDesktopDropdown(menuKey)} className="leading-none text-gray-700 hover:text-gray-900">
              {label}
            </button>
          )}
          <button
            type="button"
            aria-label={`${label} Menü öffnen`}
            aria-expanded={isOpen}
            onClick={() => setOpenDesktopMenu((prev) => (prev === menuKey ? null : menuKey))}
            className="inline-flex items-center justify-center rounded-md p-0.5 hover:bg-emerald-100"
          >
            <ChevronDown size={16} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
        <div
          className={`absolute left-1/2 top-[calc(100%+10px)] z-[4000] w-[520px] max-w-[88vw] -translate-x-1/2 rounded-2xl border border-emerald-100 bg-white/95 p-3 shadow-xl backdrop-blur transition-all duration-150 ${
            isOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-1 opacity-0 pointer-events-none'
          }`}
        >
          <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            {label}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {links.map((link) => (
              <Link
                key={link.to}
                href={link.to}
                prefetch={false}
                onClick={() => setOpenDesktopMenu(null)}
                className="rounded-xl border border-transparent bg-slate-50/70 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-900"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const closeMobile = () => setMobileMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md" style={{ contain: 'layout style', zIndex: 3000 }}>
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-center justify-between h-16 gap-2" style={{ minHeight: '64px' }}>
          {logoSlot}

          <nav
            ref={desktopNavRef}
            className="mx-4 hidden max-w-5xl flex-1 items-center justify-center space-x-1 lg:space-x-2 md:flex"
            style={{ minHeight: '40px', contain: 'layout' }}
          >
            <NavItem to="/kostenlose-offerte-anfordern">OFFERTEN</NavItem>
            <DesktopDropdownNav label="UMZUG" links={umzugLinks} menuKey="umzug" baseHref="/umzugsfirma" />
            <DesktopDropdownNav label="REINIGUNG" links={reinigungLinks} menuKey="reinigung" />
            <DesktopDropdownNav label="KOSTEN & TOOLS" links={kostenLinks} menuKey="kosten" />
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

      <div
        className={`md:hidden bg-white border-t overflow-hidden overflow-y-auto transition-all duration-200 ease-in-out ${
          mobileMenuOpen ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <nav className="pt-2 pb-4 space-y-1">
            <NavItem to="/" onClick={closeMobile}>
              <Home size={18} /> Startseite
            </NavItem>
            <NavItem to="/kostenlose-offerte-anfordern" onClick={closeMobile}>
              OFFERTEN
            </NavItem>

            <div className="pt-1">
              <div className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm font-semibold text-gray-500 rounded-md hover:bg-gray-50">
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
                  {umzugLinks.map((link) => (
                    <NavItem key={link.to} to={link.to} onClick={closeMobile}>
                      {link.text}
                    </NavItem>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => toggleMobileSection('reinigung')}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm font-semibold text-gray-500 rounded-md hover:bg-gray-50"
              >
                <span>REINIGUNG</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${openMobileSections.reinigung ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ease-in-out ${
                  openMobileSections.reinigung ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pl-6 pt-1 space-y-1">
                  {reinigungLinks.map((link) => (
                    <NavItem key={link.to} to={link.to} onClick={closeMobile}>
                      {link.text}
                    </NavItem>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => toggleMobileSection('kosten')}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm font-semibold text-gray-500 rounded-md hover:bg-gray-50"
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
                  {kostenLinks.map((link) => (
                    <NavItem key={link.to} to={link.to} onClick={closeMobile}>
                      {link.text}
                    </NavItem>
                  ))}
                </div>
              </div>
            </div>

            <NavItem to="/ratgeber" onClick={closeMobile}>
              RATGEBER
            </NavItem>
            <NavItem to="/kontakt" onClick={closeMobile}>
              <Mail size={18} /> Kontakt
            </NavItem>

            <NavbarAuthSection variant="mobile" onNavigate={closeMobile} NavItem={NavItem} />
          </nav>
        </div>
      </div>
    </header>
  )
}
