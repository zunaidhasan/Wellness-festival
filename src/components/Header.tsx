import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId, targetSection?: string) => void;
  onOpenTicketsModal?: () => void;
  showAnnotations?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  showAnnotations = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageId, sectionId?: string) => {
    onNavigate(page, sectionId);
    setMobileMenuOpen(false);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'About', page: 'about' as PageId },
    { label: 'Lineup & Schedule', page: 'schedule' as PageId },
    { label: 'Tickets', page: 'tickets' as PageId },
    { label: 'Venue', page: 'faq-contact' as PageId, section: 'venue' },
    { label: 'FAQ', page: 'faq-contact' as PageId, section: 'faq' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-gray-300 shadow-sm'
          : 'bg-white border-gray-200'
      }`}
    >
      {showAnnotations && (
        <div className="bg-gray-100 border-b border-gray-300 px-4 py-1 text-center font-mono text-[10px] text-gray-600">
          [COMPONENT: STICKY_HEADER] • Desktop 1440px max-width container • Mobile Drawer at &lt; 1024px
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo Placeholder */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group cursor-pointer"
          aria-label="Wellness Festival Home"
        >
          <div className="w-10 h-10 bg-gray-900 text-white rounded flex items-center justify-center font-mono text-xs font-bold border border-gray-800 group-hover:bg-gray-700 transition-colors">
            WF
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold uppercase text-gray-500">
                [ Logo Placeholder ]
              </span>
            </div>
            <span className="font-bold tracking-tight text-lg sm:text-xl text-gray-950 block leading-tight font-sans">
              Wellness Festival
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
              currentPage === 'home'
                ? 'text-gray-950 font-bold bg-gray-100 border border-gray-300'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Home
          </button>

          {navLinks.map((link) => {
            const isActive =
              currentPage === link.page && (!link.section || currentPage === 'faq-contact');
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.page, link.section)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  isActive
                    ? 'text-gray-950 font-bold bg-gray-100 border border-gray-300'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="text-right font-mono text-[11px] text-gray-500 hidden xl:block">
            <span>Sep 18–20</span>
            <span className="mx-1">•</span>
            <span>Your City</span>
          </div>
          <button
            onClick={() => handleNavClick('tickets')}
            className="px-5 py-2.5 bg-gray-900 text-white hover:bg-gray-800 active:bg-black rounded text-sm font-semibold tracking-wide transition-all duration-150 flex items-center gap-2 shadow-xs cursor-pointer border border-gray-900"
          >
            <span>Get Tickets</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => handleNavClick('tickets')}
            className="px-3 py-1.5 bg-gray-900 text-white rounded text-xs font-semibold tracking-wide hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Get Tickets
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 text-gray-700 hover:text-gray-950 hover:bg-gray-100 rounded-md transition-colors cursor-pointer border border-gray-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="p-4 space-y-1 max-w-[1440px] mx-auto">
            <div className="p-2 bg-gray-50 rounded border border-gray-200 mb-3 flex items-center justify-between text-xs font-mono text-gray-600">
              <span>Festival Dates: Sep 18–20</span>
              <span>Your City</span>
            </div>

            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3 py-2.5 rounded-md text-base font-medium transition-colors cursor-pointer flex items-center justify-between ${
                currentPage === 'home'
                  ? 'bg-gray-900 text-white font-bold'
                  : 'text-gray-800 hover:bg-gray-100'
              }`}
            >
              <span>Home</span>
              <span className="font-mono text-xs opacity-60">[Page 01]</span>
            </button>

            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.page, link.section)}
                className={`w-full text-left px-3 py-2.5 rounded-md text-base font-medium transition-colors cursor-pointer flex items-center justify-between ${
                  currentPage === link.page && !link.section
                    ? 'bg-gray-900 text-white font-bold'
                    : 'text-gray-800 hover:bg-gray-100'
                }`}
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs opacity-60">[{link.page}]</span>
              </button>
            ))}

            <div className="pt-3 border-t border-gray-200 mt-2">
              <button
                onClick={() => handleNavClick('tickets')}
                className="w-full py-3 bg-gray-900 text-white rounded-md text-center font-bold tracking-wide hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Get Tickets</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
