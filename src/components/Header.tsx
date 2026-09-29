import React from 'react';
import { Shield, Calendar, Users, GraduationCap, Phone, UserCheck, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenPortal: () => void;
  onOpenEnrollment: () => void;
  isLoggedIn: boolean;
  parentName?: string;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  setActiveSection,
  onOpenPortal,
  onOpenEnrollment,
  isLoggedIn,
  parentName,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Shield },
    { id: 'about', label: 'About', icon: GraduationCap },
    { id: 'academics', label: 'Academics', icon: GraduationCap },
    { id: 'events', label: 'Events Calendar', icon: Calendar },
    { id: 'teachers', label: 'Faculty Directory', icon: Users },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-md">
      {/* Strict Top Bar Contract: 3 Zones: Brand Title - Nav Links - Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Zone 1: Brand Wordmark (Single text element in display style) */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="group flex items-center gap-3 text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 transition-colors">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white block">
                Katingawan SDA Elementary School
              </span>
              <span className="text-xs text-stone-400 block tracking-wider uppercase font-sans">
                Seventh-day Adventist Christian Education · Midsayap
              </span>
            </div>
          </a>

          {/* Zone 2: 4-6 Clean Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-300">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors whitespace-nowrap cursor-pointer pb-1 border-b-2 text-sm ${
                  activeSection === item.id
                    ? 'border-amber-400 text-white font-semibold'
                    : 'border-transparent text-stone-300 hover:text-white hover:border-stone-500'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1-2 Primary Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenEnrollment}
              className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-amber-300 bg-amber-950/60 border border-amber-600/40 rounded-lg hover:bg-amber-900/60 hover:text-amber-200 transition-colors whitespace-nowrap cursor-pointer"
            >
              Enrollment 2026–2027
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenPortal}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-900 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors whitespace-nowrap cursor-pointer shadow-sm"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Portal: {parentName?.split(' ')[1] || 'Parent'}</span>
                </button>
                <button
                  onClick={onLogout}
                  title="Logout from portal"
                  className="px-2.5 py-2 text-xs text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenPortal}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-900 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors whitespace-nowrap cursor-pointer shadow-sm"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Parent Portal Login</span>
              </button>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenPortal}
              className="px-2.5 py-1.5 text-xs font-medium text-stone-900 bg-amber-400 rounded-md"
            >
              Portal
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-300 hover:text-white rounded-lg hover:bg-stone-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-800 bg-stone-950 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? 'bg-amber-500/10 text-amber-300 font-semibold'
                  : 'text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-stone-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnrollment();
              }}
              className="w-full text-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-amber-300 bg-amber-950/60 border border-amber-600/40 rounded-lg"
            >
              Enrollment 2026–2027
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="w-full text-center px-4 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 rounded-lg"
            >
              {isLoggedIn ? `Go to Parent Portal (${parentName})` : 'Parent Portal Login'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
