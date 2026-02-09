import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Mail, ChevronDown, User, LogOut, LayoutDashboard, Settings, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
// framer-motion removed – using CSS transitions for better INP
// Removed useTranslation
import { useAuth } from '@/contexts/SupabaseAuthContext';
// logoUrl removed - using inline SVG icon instead
import { useToast } from '@/components/ui/use-toast';
// Removed useLanguageSwitcher and getLocalizedUrl

const UserMenu = ({ user, onLogout }) => {
  // Removed useTranslation
  const dashboardPath = user?.user_metadata?.role === 'admin' ? '/admin-dashboard' : '/partner/dashboard';
  const settingsPath = '/partner/einstellungen';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {user.email?.charAt(0).toUpperCase()}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.user_metadata?.company_name || user.email}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
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
  );
};

const Navbar = () => {
  // Removed useTranslation
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileSections, setOpenMobileSections] = useState({});
  const [mounted, setMounted] = useState(false);
  const { user, signOut, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const settingsPath = '/partner/einstellungen';

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await signOut();
    toast({
      title: 'Erfolgreich abgemeldet',
      description: 'Sie wurden erfolgreich abgemeldet. Auf Wiedersehen!',
    });
    router.push('/');
    setMobileMenuOpen(false);
  };
  
  const toggleMobileSection = (section) => {
    setOpenMobileSections(prev => ({
        ...prev,
        [section]: !prev[section]
    }));
  };

  // Removed language switching - DE-only now

  const kostenLinks = [
    { to: '/umzugsfirma/umzugskosten', text: 'Umzugskosten Rechner' },
    { to: '/reinigung/reinigungskosten', text: 'Reinigungskosten Rechner' },
    { to: '/umzugsofferten', text: 'Umzugsofferte' },
    { to: '/guenstig-umziehen', text: 'Günstig umziehen' },
    { to: '/umzugsfirma-vergleichen', text: 'Umzugsfirma vergleichen' },
  ];

  // CSS transitions used instead of framer-motion for better performance

  const NavItem = ({ to, children, onClick }) => {
    const isActive = pathname === to;
    return (
      <Link
        href={to}
        onClick={onClick}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${
          isActive 
            ? 'bg-green-100 text-green-700' 
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}
      >
        {children}
      </Link>
    );
  };

  const KostenToolsDropdownNav = () => {
    // Removed useTranslation
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150 ease-in-out">
            KOSTEN & TOOLS
            <ChevronDown size={16} className="text-gray-500" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {kostenLinks.map((link) => (
            <DropdownMenuItem key={link.to} asChild>
              <Link href={link.to} className="cursor-pointer">
                {link.text}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-50 shadow-sm" style={{ contain: 'layout style paint', zIndex: 3000 }}>
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-center justify-between h-16" style={{ minHeight: '64px' }}>
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="inline-flex items-center justify-center w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex-shrink-0">
              <Send className="w-[18px] h-[18px] text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">Online-Offerten.ch</span>
          </Link>

          <nav 
            className="hidden md:flex items-center space-x-4 flex-1 justify-center max-w-5xl mx-4"
            style={{ minHeight: '40px', contain: 'layout' }}
          >
            <NavItem to="/kostenlose-offerte-anfordern">
              OFFERTEN
            </NavItem>
            <KostenToolsDropdownNav />
            <NavItem to="/ratgeber">
              RATGEBER
            </NavItem>
            <NavItem to="/kontakt">
              KONTAKT
            </NavItem>
          </nav>

          <div 
            className="flex items-center justify-end flex-shrink-0"
            style={{ minHeight: '36px', contain: 'layout' }}
          >
            {/* Removed language switcher - DE-only now */}

            <div className="hidden md:flex items-center gap-3" style={{ minHeight: '36px' }}>
              {!mounted || loading ? null : !user ? (
                <Button asChild size="sm" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  <Link href="/partner-werden">Partner werden</Link>
                </Button>
              ) : null}
              {!mounted || loading ? (
                <div className="w-9 h-9 bg-gray-200 rounded-full animate-pulse" style={{ minWidth: '36px', minHeight: '36px' }}></div>
              ) : user ? (
                <UserMenu user={user} onLogout={handleLogout} />
              ) : (
                <Button asChild size="sm" className="bg-green-600 hover:bg-green-700 text-white" style={{ minWidth: '80px' }}>
                  <Link href="/login">Anmelden</Link>
                </Button>
              )}
            </div>

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

      {/* Mobile menu – CSS transition instead of framer-motion for better INP */}
      <div
        className={`md:hidden bg-white border-t overflow-hidden transition-all duration-200 ease-in-out ${
          mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <nav className="pt-2 pb-4 space-y-1">
            <NavItem to="/" onClick={() => setMobileMenuOpen(false)}>
              <Home size={18} /> Startseite
            </NavItem>
            
            <NavItem to="/kostenlose-offerte-anfordern" onClick={() => setMobileMenuOpen(false)}>
              OFFERTEN
            </NavItem>
            <NavItem to="/ratgeber" onClick={() => setMobileMenuOpen(false)}>
              RATGEBER
            </NavItem>

            <div className="pt-1">
              <button onClick={() => toggleMobileSection('kosten')} className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm font-semibold text-gray-500 rounded-md hover:bg-gray-50">
                  <span>KOSTEN & TOOLS</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${openMobileSections['kosten'] ? 'rotate-180' : ''}`} />
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ease-in-out ${
                  openMobileSections['kosten'] ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pl-6 pt-1 space-y-1">
                    {kostenLinks.map((link) => (
                        <NavItem key={link.to} to={link.to} onClick={() => setMobileMenuOpen(false)}>
                            {link.text}
                        </NavItem>
                    ))}
                </div>
              </div>
            </div>

            <NavItem to="/kontakt" onClick={() => setMobileMenuOpen(false)}>
              <Mail size={18} /> Kontakt
            </NavItem>

            <div className="border-t pt-4 mt-4">
              {!loading && !user && (
                <NavItem to="/partner-werden" onClick={() => setMobileMenuOpen(false)}>
                  Partner werden
                </NavItem>
              )}
              {loading ? (
                <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
              ) : user ? (
                <>
                  <p className="px-3 py-2 text-sm font-semibold text-gray-500 truncate">{user.email}</p>
                  <NavItem to={user?.user_metadata?.role === 'admin' ? '/admin-dashboard' : '/partner/dashboard'} onClick={() => setMobileMenuOpen(false)}>
                    <LayoutDashboard size={18} /> Dashboard
                  </NavItem>
                  {user?.user_metadata?.role === 'partner' && (
                    <NavItem to={settingsPath} onClick={() => setMobileMenuOpen(false)}>
                      <Settings size={18} /> Einstellungen
                    </NavItem>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <LogOut size={18} /> Abmelden
                  </button>
                </>
              ) : (
                <NavItem to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <User size={18} /> Anmelden
                </NavItem>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;