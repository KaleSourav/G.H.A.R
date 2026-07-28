import React from 'react';
import { motion } from 'motion/react';
import { Header } from './Header';
import { HeroBottomBar } from './HeroBottomBar';
import { BannerConfig } from '../types';

interface HeroBannerProps {
  config: BannerConfig;
  onSearch?: (filters: { location: string; type: string; price: string }) => void;
  onNavClick?: (nav: string) => void;
  className?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  config,
  onSearch,
  onNavClick,
  className = '',
}) => {
  const handleSearchTerm = (term: string) => {
    if (onSearch) {
      onSearch({
        location: term,
        type: 'All Types',
        price: 'All Prices',
      });
    }
  };

  return (
    <section 
      id="hero-banner"
      className={`relative w-full text-white font-sans transition-all duration-300 ${className}`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Container */}
      <div className={`relative w-full border border-white/10 ${config.bannerRadius || 'rounded-[32px] sm:rounded-[40px]'} p-6 sm:p-10 md:p-12 flex flex-col justify-between min-h-screen shadow-2xl bg-transparent`}>
        
        {/* Dark gradient overlay for text legibility over animation frames */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 pointer-events-none" style={{ borderRadius: 'inherit' }} />
        
        {/* Navigation Bar inside the hero banner */}
        {config.showNavbar && (
          <div className="relative z-10">
            <Header 
              logoText={config.logoText} 
              ctaText={config.ctaText}
              onNavClick={onNavClick}
              variant="embedded"
            />
          </div>
        )}

        {/* Hero Content Area */}
        <div className="my-auto pt-8 pb-12 max-w-2xl px-2 sm:px-6 z-10">
          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-6"
          >
            {config.headline}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl font-normal text-white/80 leading-relaxed max-w-xl"
          >
            {config.subtitle}
          </motion.p>
        </div>

        {/* Replacement Bottom Feature Bar */}
        {config.showFilterBar && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="z-20 pt-4 px-2 sm:px-6"
          >
            <HeroBottomBar
              onSearch={handleSearchTerm}
              onCityTagClick={handleSearchTerm}
            />
          </motion.div>
        )}

      </div>
    </section>
  );
};
