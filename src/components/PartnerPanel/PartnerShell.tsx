'use client'

import PartnerSidebar from './PartnerSidebar'
import { PartnerCountsProvider } from './PartnerCountsContext'

/**
 * Partner-Dashboard Shell: Nur Desktop bekommt die Sidebar.
 * Mobile bleibt beim originalen Layout mit den Tabs oben — deshalb
 * kein Hamburger, keine Drawer, keine Mobile-Topbar.
 */
/**
 * Navbar ist sticky und 64px hoch (h-16). Wir geben dem Shell oben/unten
 * 1.5rem Atemluft, damit Sidebar und Content denselben vertikalen Rhythmus
 * haben. Die Sidebar wird direkt unter der Navbar angeheftet und begrenzt
 * ihre Höhe, damit sie nie länger als das Viewport wird (innerer Scroll).
 */
export default function PartnerShell({ children }: { children: React.ReactNode }) {
  return (
    <PartnerCountsProvider>
      <div className="min-h-screen bg-muted/30 dark:bg-background">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-6 lg:py-6">
          <div className="lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6">
            {/* Desktop Sidebar — sticky, unterhalb der Navbar */}
            <aside className="hidden lg:block sticky top-20 self-start h-[calc(100vh-6rem)]">
              <div className="h-full overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <PartnerSidebar />
              </div>
            </aside>

            {/* Content column — eigener Karten-Look auf Desktop */}
            <div className="min-w-0">
              <main className="lg:rounded-xl lg:border lg:border-border lg:bg-background lg:shadow-sm lg:overflow-hidden">
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    </PartnerCountsProvider>
  )
}
