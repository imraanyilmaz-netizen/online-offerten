'use client'

import PartnerSidebar from './PartnerSidebar'

/**
 * Partner-Dashboard Shell.
 *
 * Die Panel-Navbar und der PartnerCountsProvider werden bereits global im
 * `Layout` gerendert (für eingeloggte Partner überall sichtbar). Hier
 * ergänzen wir nur die Desktop-Sidebar und den Content-Wrapper.
 *
 * Desktop: Sticky-Sidebar direkt unterhalb der Panel-Navbar (h-16).
 * Mobile: keine Sidebar — die Navigation erfolgt über den Hamburger-Drawer
 * der Panel-Navbar (dort wird dieselbe `PartnerSidebar` als Overlay gezeigt).
 */
export default function PartnerShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/30 dark:bg-background">
      <div className="lg:mx-auto lg:max-w-7xl lg:px-6 lg:py-6">
        <div className="lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6">
          {/* Desktop Sidebar — sticky, unterhalb der Panel-Navbar */}
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
  )
}
