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

    </div>
  );
}
