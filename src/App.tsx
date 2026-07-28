import React, { useState, useMemo } from 'react';
import { BannerConfig, Property } from './types';
import { INITIAL_PROPERTIES, TEAM_MEMBERS, TESTIMONIALS } from './data/mockData';
import { HeroBanner } from './components/HeroBanner';
import { LandingPageSections } from './components/LandingPageSections';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { ScrollAnimationBackground } from './components/ScrollAnimationBackground';
import { AnimatePresence } from 'motion/react';

const DEFAULT_CONFIG: BannerConfig = {
  logoText: 'G.H.A.R.',
  headline: 'Redefining Luxury Real Estate Advisory in South Mumbai',
  subtitle: 'Exclusive luxury & ultra-luxury residences curated with trust, transparency, and personalized advisory.',
  ctaText: 'Get Started',
  locationLabel: 'Location',
  propertyTypeLabel: 'Property Type',
  priceRangeLabel: 'Price range',
  selectedLocation: 'Lower Parel',
  selectedPropertyType: 'All Types',
  selectedPriceRange: 'All Prices',
  bannerRadius: 'rounded-none border-l-0 border-r-0',
  showFilterBar: true,
  showNavbar: true,
};

export default function App() {
  const [config, setConfig] = useState<BannerConfig>(DEFAULT_CONFIG);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  // Search Filter state
  const [activeFilters, setActiveFilters] = useState<{
    location: string;
    type: string;
    price: string;
  }>({
    location: 'All Locations',
    type: 'All Types',
    price: 'All Prices',
  });

  const handleSearch = (filters: { location: string; type: string; price: string }) => {
    setActiveFilters(filters);
    setConfig((prev) => ({
      ...prev,
      selectedLocation: filters.location,
      selectedPropertyType: filters.type,
      selectedPriceRange: filters.price,
    }));
  };

  const handleNavClick = (nav: string) => {
    setTimeout(() => {
      if (nav === 'Projects' || nav === 'Lists') {
        const el = document.getElementById('projects-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (nav === 'By Location') {
        const el = document.getElementById('by-location-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (nav === 'About') {
        const el = document.getElementById('about-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (nav === 'Contact' || nav === 'Get Started') {
        const el = document.getElementById('contact-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (nav === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  // Filtered properties computation
  const filteredProperties = useMemo(() => {
    return INITIAL_PROPERTIES.filter((p) => {
      // General Search Term
      if (activeFilters.location && !['All Cities', 'All Locations', 'All', ''].includes(activeFilters.location)) {
        const searchTerm = activeFilters.location.toLowerCase().trim();
        const matchesLocation = p.location.toLowerCase().includes(searchTerm) || p.city.toLowerCase().includes(searchTerm);
        const matchesTitle = p.title.toLowerCase().includes(searchTerm);
        const matchesDeveloper = p.developer?.toLowerCase().includes(searchTerm);
        const matchesType = p.type.toLowerCase().includes(searchTerm);
        
        if (!matchesLocation && !matchesTitle && !matchesDeveloper && !matchesType) {
          return false;
        }
      }
      
      // Filter by type
      if (activeFilters.type && activeFilters.type !== 'All Types') {
        if (p.type.toLowerCase() !== activeFilters.type.toLowerCase()) return false;
      }
      
      return true;
    });
  }, [activeFilters]);

  return (
    <div className="min-h-screen text-white selection:bg-white selection:text-black font-sans antialiased" style={{ fontFamily: "'DM Sans', sans-serif", background: 'transparent' }}>
      
      {/* Scroll-driven frame animation fixed behind all content */}
      <ScrollAnimationBackground />

      {/* Main Container — sits above the canvas */}
      <main className="w-full relative" style={{ zIndex: 1 }}>
        <div className="w-full space-y-12">
          <div className="w-full">
            <HeroBanner
              config={config}
              onSearch={handleSearch}
              onNavClick={handleNavClick}
            />
          </div>

          {/* Remaining Landing Page Sections */}
          <LandingPageSections
            properties={filteredProperties}
            teamMembers={TEAM_MEMBERS}
            testimonials={TESTIMONIALS}
            onPropertySelect={(p) => setSelectedProperty(p)}
          />
        </div>
      </main>

      {/* Property Details Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <PropertyDetailModal
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
          />
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button — always visible for quick contact */}
      <a
        href="https://wa.me/919920448793"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 z-50 flex items-center gap-2.5 bg-[#25D366] text-black font-bold text-xs sm:text-sm px-3 sm:px-4 py-3 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.5)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.7)] hover:scale-105 active:scale-95 transition-all duration-300"
        style={{ zIndex: 9999 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="hidden sm:inline">Chat with Us</span>
      </a>

    </div>
  );
}
