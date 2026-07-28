import React from 'react';
import { ArrowUpRight } from 'lucide-react';

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
  const navItems = ['Home', 'Projects', 'By Location', 'About', 'Contact'];

  return (
    <header className="w-full py-4 px-6 md:px-10 flex items-center justify-between z-20 font-sans">
      {/* Brand Logo */}
      <div 
        onClick={() => onNavClick?.('Home')} 
        className="flex items-center gap-2.5 cursor-pointer group"
      >
        <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold text-lg tracking-tight shadow-md transition-transform group-hover:scale-105">
          G
        </div>
        <span className="text-white text-xl font-bold tracking-tight">
          {logoText}
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-8 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => onNavClick?.(item)}
            className={`text-sm font-medium transition-colors ${
              activeNav === item 
                ? 'text-white underline underline-offset-4 font-semibold' 
                : 'text-white/80 hover:text-white'
            }`}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* CTA Button */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => onNavClick?.('Get Started')}
          className="bg-white text-black hover:bg-zinc-200 px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-1.5 transition-all shadow-lg hover:shadow-white/10 active:scale-95"
        >
          <span>{ctaText}</span>
          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </header>
  );
};
