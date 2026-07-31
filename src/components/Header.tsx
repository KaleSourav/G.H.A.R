import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface HeaderProps {
  logoText?: string;
  ctaText?: string;
  activeNav?: string;
  onNavClick?: (nav: string) => void;
  variant?: 'embedded' | 'standalone';
}

export const Header: React.FC<HeaderProps> = ({
  logoText = 'G.H.A.R.',
  ctaText = 'Get Started',
  activeNav = 'Home',
  onNavClick,
  variant = 'embedded',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = ['Home', 'Projects', 'By Location', 'About', 'Certifications', 'Contact'];

  const handleNavClick = (item: string) => {
    onNavClick?.(item);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full z-20 font-sans" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Top Bar */}
      <div className="py-4 px-4 sm:px-6 md:px-10 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('Home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <img src="/Gem%20Homes%20Logo-01.png" alt="G.H.A.R. Logo" className="h-16 sm:h-20 w-auto object-contain transition-transform group-hover:scale-105" />
          <span className="text-white text-lg sm:text-xl font-bold tracking-tight">
            {logoText}
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                activeNav === item
                  ? 'text-white underline underline-offset-4 font-semibold'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Right: CTA + Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop CTA */}
          <button
            onClick={() => handleNavClick('Get Started')}
            className="hidden sm:flex bg-white text-black hover:bg-zinc-200 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-semibold items-center gap-1.5 transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            <span>{ctaText}</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Mobile CTA — icon only */}
          <a
            href="https://wa.me/919920448793"
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full bg-[#25D366] text-black shadow-lg active:scale-95"
            aria-label="WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all active:scale-95 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mx-4 mb-3 bg-zinc-950/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl overflow-hidden">
          <nav className="flex flex-col py-2">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`w-full text-left px-5 py-3.5 text-sm font-medium transition-colors cursor-pointer flex items-center justify-between ${
                  activeNav === item
                    ? 'text-white bg-white/10 font-bold'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{item}</span>
                {activeNav === item && <ArrowUpRight className="w-3.5 h-3.5 text-[#fbcfe8]" />}
              </button>
            ))}
            <div className="mx-4 my-2 border-t border-white/10" />
            <button
              onClick={() => handleNavClick('Get Started')}
              className="mx-4 mb-2 py-3 bg-white text-black font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all active:scale-95 cursor-pointer"
            >
              <span>{ctaText}</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
