import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Property, TeamMember } from '../types';
import { INITIAL_PROPERTIES } from '../data/mockData';
import { MapPin, ArrowUpRight, Bed, Maximize2, ChevronLeft, ChevronRight, CheckCircle2, Facebook, Instagram, Twitter, Linkedin, Building2, Phone, Mail } from 'lucide-react';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const AnimatedSection: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className={className}>
    {children}
  </motion.div>
);

const AnimatedGrid: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className={className}>
    {children}
  </motion.div>
);

const AnimatedCard: React.FC<{ children: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className = "", onClick }) => (
  <motion.div variants={fadeUpVariant} className={className} onClick={onClick}>
    {children}
  </motion.div>
);

// Auto-sliding image sub-component (images only, design unchanged)
const AutoSlideImages: React.FC<{ images: string[], alt: string, interval?: number }> = ({ images, alt, interval = 3000 }) => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, interval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images.length, interval]);

  return (
    <div className="rounded-2xl overflow-hidden h-64 sm:h-72 relative mb-4">
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`${alt} ${idx + 1}`}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
          style={{
            opacity: idx === current ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out, transform 0.7s ease-out',
          }}
        />
      ))}
      {/* Slide dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              background: idx === current ? '#fbcfe8' : 'rgba(255,255,255,0.4)',
              transform: idx === current ? 'scale(1.4)' : 'scale(1)',
            }}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

interface LandingPageSectionsProps {
  properties: Property[];
  teamMembers: TeamMember[];
  onPropertySelect: (property: Property) => void;
}

export const LandingPageSections: React.FC<LandingPageSectionsProps> = ({
  properties = [],
  teamMembers = [],
  onPropertySelect,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [hoveredDev, setHoveredDev] = useState<{ name: string; query: string } | null>(null);
  const [selectedLocationTab, setSelectedLocationTab] = useState<string>('All Locations');

  const locationCategories = [
    'All Locations',
    'Lower Parel',
    'Prabhadevi',
    'Mazgaon',
    'Byculla',
    'Mahalaxmi'
  ];

  const locationMetaMap: Record<string, { desc: string; highlights: string[]; avgPrice: string }> = {
    'Lower Parel': {
      desc: 'The corporate and luxury high-rise epicenter of South Mumbai, featuring iconic sky villas and fine dining precincts.',
      highlights: ['Palladium & High Street Phoenix', 'BKC & Sea Link Connectivity', 'Ready OC Sky Villas'],
      avgPrice: '₹9.0 Cr – ₹100.0 Cr+'
    },
    'Prabhadevi': {
      desc: 'Prestigious oceanfront residential enclave known for seaside living, cultural landmarks, and serene privacy.',
      highlights: ['Siddhivinayak Temple Precinct', 'Bandra-Worli Sea Link Entrance', 'Unobstructed Sea Vistas'],
      avgPrice: '₹8.0 Cr – ₹28.0 Cr+'
    },
    'Mazgaon': {
      desc: 'Historic heritage estate district blending tranquil tree-lined sanctuaries with ultra-modern low-density living.',
      highlights: ['Heritage Estate Grounds', 'Eastern Freeway Access', 'Bespoke Medical Concierge'],
      avgPrice: '₹9.0 Cr – ₹30.0 Cr+'
    },
    'Byculla': {
      desc: 'Lush botanical sanctuary precinct overlooking protected zoo gardens, historic parks, and the Eastern Harbour.',
      highlights: ['60-Acre Botanical Gardens', 'Elevated Sand Beach Podium', 'Twin Skyscraper Landmarks'],
      avgPrice: '₹4.0 Cr – ₹22.0 Cr+'
    },
    'Mahalaxmi': {
      desc: 'Front-row luxury towers overlooking the world-famous 225-acre Mahalaxmi Racecourse and Arabian Sea skyline.',
      highlights: ['Mahalaxmi Racecourse Turf Views', 'Willingdon Sports Club Proximity', 'Coastal Road Interchange'],
      avgPrice: '₹4.5 Cr – ₹25.0 Cr+'
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || '';
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value || '';
    const phone = (form.elements.namedItem('phone') as HTMLInputElement)?.value || '';
    const property = (form.elements.namedItem('property') as HTMLSelectElement)?.value || '';
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value || '';
    const waMessage = encodeURIComponent(
      `*New Inquiry – G.H.A.R.*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Interested In:* ${property}%0A*Message:* ${message}`
    );
    window.open(`https://wa.me/919920448793?text=${waMessage}`, '_blank');
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  // Safe property pool for search results
  const safeProps = properties;

  // Explicitly select Lodha, Indiabulls Sky Forest, and Aga Hall Estate for Featured Properties
  // We use INITIAL_PROPERTIES as a fallback if the search results are too narrow.
  const featuredPool = properties.length > 2 ? properties : INITIAL_PROPERTIES;
  const lodhaProp = featuredPool.find(p => p.title?.toLowerCase().includes('lodha')) || featuredPool[1] || INITIAL_PROPERTIES[1] || INITIAL_PROPERTIES[0];
  const indiabullsProp = featuredPool.find(p => p.title?.toLowerCase().includes('indiabulls')) || featuredPool[0] || INITIAL_PROPERTIES[0];
  const agaHallProp = featuredPool.find(p => p.title?.toLowerCase().includes('aga hall')) || featuredPool[4] || INITIAL_PROPERTIES[4] || INITIAL_PROPERTIES[0];

  const featuredListings = [lodhaProp, indiabullsProp, agaHallProp].filter((p): p is Property => Boolean(p && p.image));

  const developerItems = [
    { name: 'LODHA', query: 'lodha' },
    { name: 'INDIABULLS', query: 'indiabulls' },
    { name: 'AGA HALL', query: 'aga hall' },
    { name: 'PIRAMAL', query: 'piramal' },
    { name: 'RUNWAL', query: 'runwal' },
    { name: 'RUSTOMJEE', query: 'rustomjee' },
    { name: 'MONTE SOUTH', query: 'monte' },
    { name: 'G.H.A.R.', query: 'indiabulls' },
  ];

  return (
    <div className="w-full text-white font-sans space-y-24 py-16" style={{ fontFamily: "'DM Sans', sans-serif", background: 'transparent' }}>
      
      {/* ---------------- SECTION 2: Featured Properties (Regenerated from Reference Image) ---------------- */}
      <section className="max-w-7xl mx-auto px-6 font-sans" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        
        {/* Header Layout */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-start justify-between mb-12 gap-6">
          {/* Main Headline */}
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Featured
            </h2>
            <p className="font-serif-italic text-5xl sm:text-6xl md:text-7xl text-white font-normal leading-none mt-1">
              Properties
            </p>
          </div>

          {/* Subtext & Action Button */}
          <div className="flex flex-col items-start md:items-end gap-4 max-w-md pt-2">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed text-left md:text-right">
              We blend deep industry experience, trust, and personalized service to connect clients with South Mumbai's finest addresses.
            </p>
            <button 
              onClick={() => {
                const el = document.getElementById('contact-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-2.5 rounded-full bg-[#fbcfe8] hover:bg-[#f472b6] text-black font-semibold text-sm flex items-center gap-2 transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>View All Projects</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </AnimatedSection>

        {/* 3 Featured Cards Grid */}
        <AnimatedGrid className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {featuredListings.map((prop) => (
            <AnimatedCard
              key={prop.id}
              onClick={() => onPropertySelect(prop)}
              className="group relative rounded-3xl overflow-hidden h-[460px] sm:h-[500px] border border-white/10 shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-zinc-950 flex flex-col justify-end"
            >
              {/* Background Image */}
              <img
                src={prop.image}
                alt={prop.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
              />

              {/* Status Badge */}
              <div className="absolute top-4 right-4 z-20">
                <span className="bg-black/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                  {prop.completionStatus}
                </span>
              </div>

              {/* Gradient Glass Overlay at Bottom */}
              <div className="relative z-10 p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-16">
                {/* Title & Price */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white tracking-tight">{prop.title}</h3>
                  <span className="text-lg font-bold text-white">{prop.priceDisplay}</span>
                </div>

                {/* Specs */}
                <p className="text-xs text-white/80 font-medium mb-2 flex items-center gap-1.5 flex-wrap">
                  <span>{prop.beds}</span>
                  <span className="opacity-40">|</span>
                  <span>{prop.sqft}</span>
                </p>

                {/* Location */}
                <p className="text-xs text-white/70 flex items-center gap-1 font-normal">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-white/80" />
                  <span>{prop.location}</span>
                </p>
              </div>
            </AnimatedCard>
          ))}
        </AnimatedGrid>

        {/* Brand Logos Infinite Marquee Row with Hover Popup */}
        <div className="pt-8 border-t border-white/10 text-center" onMouseLeave={() => setHoveredDev(null)}>
          <p className="text-xs font-semibold text-white/50 uppercase tracking-widest text-center mb-6">
            Partnered & Associated With Premier Developers
          </p>
          
          <div className="relative overflow-hidden w-full py-4 group">
            {/* Fade overlays at edges */}
            <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            {/* Continuous Marquee Track */}
            <div className="animate-marquee-continuous flex items-center gap-6 sm:gap-10">
              {[...developerItems, ...developerItems, ...developerItems].map((dev, i) => {
                const isHovered = hoveredDev?.name === dev.name;
                return (
                  <button
                    key={`${dev.name}-${i}`}
                    onMouseEnter={() => setHoveredDev(dev)}
                    onClick={() => {
                      const matched = safeProps.find(p => p.title?.toLowerCase().includes(dev.query) || p.developer?.toLowerCase().includes(dev.query)) || safeProps[0];
                      if (matched) onPropertySelect(matched);
                    }}
                    className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 whitespace-nowrap cursor-pointer ${
                      isHovered 
                        ? 'bg-white text-black shadow-xl scale-110 ring-2 ring-[#fbcfe8]' 
                        : 'text-white/70 hover:text-white hover:bg-white/10 hover:scale-105'
                    }`}
                  >
                    {dev.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Pop-up Property Preview Card on Hover */}
          {hoveredDev && (() => {
            const matchedProp = safeProps.find(p => p.title?.toLowerCase().includes(hoveredDev.query) || p.developer?.toLowerCase().includes(hoveredDev.query)) || safeProps[0];
            if (!matchedProp) return null;
            return (
              <div 
                className="mt-6 p-4 sm:p-6 bg-zinc-900/95 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl max-w-xl mx-auto flex flex-col sm:flex-row gap-5 items-center transition-all duration-300 animate-in fade-in slide-in-from-top-4"
              >
                <img 
                  src={matchedProp.image} 
                  alt={matchedProp.title} 
                  className="w-full sm:w-44 h-28 object-cover rounded-2xl border border-white/10 shrink-0" 
                />
                <div className="flex-1 text-left space-y-1.5 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#fbcfe8] text-black">
                      {hoveredDev.name} Portfolio
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white">{matchedProp.priceDisplay}</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white leading-snug">{matchedProp.title}</h4>
                  <p className="text-xs text-white/70 flex items-center gap-1 font-normal">
                    <MapPin className="w-3.5 h-3.5 text-[#fbcfe8] shrink-0" />
                    <span>{matchedProp.location}</span>
                  </p>
                  <button 
                    onClick={() => onPropertySelect(matchedProp)}
                    className="mt-2 text-xs font-bold px-4 py-1.5 rounded-full bg-white text-black hover:bg-zinc-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Property Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })()}

        </div>

      </section>


      {/* ---------------- SECTION 3: Projects Section (All Property Portfolio in 3-Column Grid) ---------------- */}
      <section id="projects-section" className="max-w-7xl mx-auto px-6 font-sans scroll-mt-24" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        
        {/* Section Header */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#fbcfe8] text-black inline-block mb-3">
              G.H.A.R. Portfolio
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Our Luxury <span className="font-serif-italic font-normal">Projects</span>
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-xl mt-3 leading-relaxed">
              Discover curated luxury residences across South Mumbai. Select any project to explore full details including Overview, Pricing, Configs, Gallery, Location landmarks, and FAQs.
            </p>
          </div>

          <div className="shrink-0">
            <span className="text-xs font-mono text-white/50 bg-zinc-900 border border-white/10 px-4 py-2 rounded-full">
              Showing {safeProps.length} Exclusive Residences
            </span>
          </div>
        </AnimatedSection>

        {/* 3 Properties Per Row Grid */}
        {safeProps.length === 0 ? (
          <div className="p-10 rounded-3xl bg-zinc-950 border border-white/10 text-center text-white/60 text-sm">
            No properties found matching your search criteria. Please try a different search.
          </div>
        ) : (
          <AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safeProps.map((property) => (
              <AnimatedCard 
              key={property.id} 
              className="bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 transition-all duration-300 shadow-2xl group flex flex-col justify-between hover:-translate-y-1.5"
            >
              <div>
                {/* Image Header with Status Tag & Developer Pill */}
                <div className="relative h-64 overflow-hidden bg-zinc-900 cursor-pointer" onClick={() => onPropertySelect(property)}>
                  <img 
                    src={property.image} 
                    alt={property.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95" 
                  />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                    <span className="bg-black/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
                      {property.developer || 'G.H.A.R.'}
                    </span>
                    <span className="bg-[#fbcfe8] text-black text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                      {property.completionStatus || property.status}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                </div>

                {/* Property Content */}
                <div className="p-6">
                  {/* Title & Location */}
                  <h3 
                    onClick={() => onPropertySelect(property)}
                    className="text-xl font-bold text-white mb-1 group-hover:text-[#fbcfe8] transition-colors cursor-pointer"
                  >
                    {property.title}
                  </h3>
                  <p className="text-xs text-white/70 flex items-center gap-1.5 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-[#fbcfe8] shrink-0" />
                    <span>{property.location}</span>
                  </p>

                  {/* Specs Summary Row */}
                  <div className="grid grid-cols-2 gap-2 p-3 bg-zinc-900/80 rounded-2xl border border-white/10 text-xs text-white/80 mb-4">
                    <div>
                      <span className="text-[10px] text-white/50 uppercase block">Config</span>
                      <span className="font-bold text-white block truncate">{property.beds}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/50 uppercase block">Carpet Area</span>
                      <span className="font-bold text-white block truncate">{property.sqft}</span>
                    </div>
                  </div>

                  {/* Included Property Information Highlights */}
                  <div className="space-y-1.5 mb-4 pt-2 border-t border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-1">
                      Included Information
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10">Overview</span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10">Price</span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10">Configs</span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10">Gallery</span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10">Location</span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10">FAQs</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Primary CTA */}
              <div className="p-6 pt-0 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-white/50 block">Price Range</span>
                  <span className="text-lg sm:text-xl font-extrabold text-white">{property.priceDisplay}</span>
                </div>
                <button 
                  onClick={() => onPropertySelect(property)}
                  className="px-4 py-2.5 bg-white text-black text-xs font-bold rounded-full hover:bg-zinc-200 transition-all flex items-center gap-1 cursor-pointer shadow-lg hover:scale-105 active:scale-95 shrink-0"
                >
                  <span>Explore Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </AnimatedCard>
          ))}
          </AnimatedGrid>
        )}
      </section>


      {/* ---------------- SECTION 3.5: Projects By Location Section ---------------- */}
      <section id="by-location-section" className="max-w-7xl mx-auto px-6 font-sans scroll-mt-24" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        
        {/* Section Header */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#fbcfe8] text-black inline-block mb-3">
              Location Breakdown
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Projects By <span className="font-serif-italic font-normal">Location</span>
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-xl mt-3 leading-relaxed">
              Explore South Mumbai’s finest residential micro-markets. Filter by prime neighborhood to discover exclusive high-rise towers, heritage estates, and racecourse residences.
            </p>
          </div>
        </AnimatedSection>

        {/* Location Filter Pills Row */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-8">
          {locationCategories.map((loc) => {
            const isSelected = selectedLocationTab === loc;
            const count = loc === 'All Locations' 
              ? safeProps.length 
              : safeProps.filter(p => p.location.toLowerCase().includes(loc.toLowerCase()) || p.city.toLowerCase().includes(loc.toLowerCase())).length;

            return (
              <button
                key={loc}
                onClick={() => setSelectedLocationTab(loc)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-2 border ${
                  isSelected 
                    ? 'bg-white text-black border-white shadow-xl scale-105' 
                    : 'bg-zinc-950 text-white/80 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-[#fbcfe8]'}`} />
                <span>{loc}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-black/10 text-black font-extrabold' : 'bg-white/10 text-white/60'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Location Information Banner */}
        {selectedLocationTab !== 'All Locations' && locationMetaMap[selectedLocationTab] && (
          <div className="p-6 rounded-3xl bg-zinc-950 border border-white/15 mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl animate-in fade-in duration-300">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#fbcfe8]" />
                <h3 className="text-xl font-bold text-white">{selectedLocationTab} Micro-Market Overview</h3>
              </div>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                {locationMetaMap[selectedLocationTab].desc}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {locationMetaMap[selectedLocationTab].highlights.map((hl, idx) => (
                  <span key={idx} className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/90">
                    ✓ {hl}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 text-left md:text-right shrink-0 min-w-[200px]">
              <span className="text-[10px] text-white/50 uppercase tracking-wider block">Estimated Price Span</span>
              <span className="text-lg font-extrabold text-[#fbcfe8] block mt-0.5">{locationMetaMap[selectedLocationTab].avgPrice}</span>
              <span className="text-[10px] text-white/60 block mt-1">Prime South Mumbai Real Estate</span>
            </div>
          </div>
        )}

        {/* 3 Properties Per Row Grid Sorted by Location */}
        {(() => {
          const locProps = selectedLocationTab === 'All Locations'
            ? [...safeProps].sort((a, b) => a.location.localeCompare(b.location))
            : safeProps.filter(p => p.location.toLowerCase().includes(selectedLocationTab.toLowerCase()) || p.city.toLowerCase().includes(selectedLocationTab.toLowerCase()));

          if (locProps.length === 0) {
            return (
              <div className="p-10 rounded-3xl bg-zinc-950 border border-white/10 text-center text-white/60 text-sm">
                No residences currently listed in {selectedLocationTab}. Try selecting 'All Locations'.
              </div>
            );
          }

          return (
            <AnimatedGrid key={selectedLocationTab} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {locProps.map((property) => (
                <AnimatedCard 
                  key={`loc-${property.id}`} 
                  className="bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 transition-all duration-300 shadow-2xl group flex flex-col justify-between hover:-translate-y-1.5"
                >
                  <div>
                    {/* Image Header */}
                    <div className="relative h-64 overflow-hidden bg-zinc-900 cursor-pointer" onClick={() => onPropertySelect(property)}>
                      <img 
                        src={property.image} 
                        alt={property.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95" 
                      />
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                        <span className="bg-black/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
                          {property.developer || 'G.H.A.R.'}
                        </span>
                        <span className="bg-[#fbcfe8] text-black text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                          {property.completionStatus || property.status}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                    </div>

                    {/* Property Body */}
                    <div className="p-6">
                      <h3 
                        onClick={() => onPropertySelect(property)}
                        className="text-xl font-bold text-white mb-1 group-hover:text-[#fbcfe8] transition-colors cursor-pointer"
                      >
                        {property.title}
                      </h3>
                      <p className="text-xs text-white/70 flex items-center gap-1.5 mb-4">
                        <MapPin className="w-3.5 h-3.5 text-[#fbcfe8] shrink-0" />
                        <span className="font-semibold text-white">{property.location}</span>
                      </p>

                      {/* Specs */}
                      <div className="grid grid-cols-2 gap-2 p-3 bg-zinc-900/80 rounded-2xl border border-white/10 text-xs text-white/80 mb-4">
                        <div>
                          <span className="text-[10px] text-white/50 uppercase block">Configuration</span>
                          <span className="font-bold text-white block truncate">{property.beds}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-white/50 uppercase block">Carpet Area</span>
                          <span className="font-bold text-white block truncate">{property.sqft}</span>
                        </div>
                      </div>

                      {/* Info Included Tags */}
                      <div className="space-y-1.5 mb-4 pt-2 border-t border-white/10">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-1">
                          Property Details Included
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10">Overview</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10">Price</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10">Configs</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10">Gallery</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10">Location</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10">FAQs</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="p-6 pt-0 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-xs text-white/50 block">Price Span</span>
                      <span className="text-lg sm:text-xl font-extrabold text-white">{property.priceDisplay}</span>
                    </div>
                    <button 
                      onClick={() => onPropertySelect(property)}
                      className="px-4 py-2.5 bg-white text-black text-xs font-bold rounded-full hover:bg-zinc-200 transition-all flex items-center gap-1 cursor-pointer shadow-lg hover:scale-105 active:scale-95 shrink-0"
                    >
                      <span>Explore Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </AnimatedCard>
              ))}
            </AnimatedGrid>
          );
        })()}
      </section>
      <section className="max-w-7xl mx-auto px-6 font-sans" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {/* Top Header Row */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-start justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Why <span className="font-serif-italic font-normal">Clients</span>
            </h2>
            <p className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight mt-1">
              Trust Us
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4 max-w-md pt-2">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed text-left md:text-right">
              Our mission is simple: make your property journey transparent, efficient, and tailored to your high-end aspirations.
            </p>
            <button 
              onClick={() => {
                const el = document.getElementById('contact-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-2.5 rounded-full bg-[#fbcfe8] hover:bg-[#f472b6] text-black font-semibold text-sm flex items-center gap-2 transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Contact Our Advisors</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </AnimatedSection>

        {/* 3 Trust Cards Grid — each card auto-slides through 10+ images */}
        <AnimatedGrid className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

          {/* Card 1: Expert Guidance */}
          <AnimatedCard className="group flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 cursor-pointer bg-zinc-950/80 backdrop-blur-md p-5 rounded-[32px] border border-white/10 shadow-xl hover:border-white/30 hover:shadow-2xl">
            <div>
              <AutoSlideImages
                alt="Expert Guidance"
                interval={2800}
                images={[
                  'https://lh3.googleusercontent.com/d/15XqzCDWxZFMi6eaGpdgPsoqhdLW7rgQm=w1000',
                  'https://lh3.googleusercontent.com/d/1IoALzbUn6_bAvlc1Qz9RMxeki82mDuSQ=w1000',
                  'https://lh3.googleusercontent.com/d/1RHxZvruaJYcUma32yrOM0uH7aIQrkuhd=w1000',
                  'https://lh3.googleusercontent.com/d/1qJc_-bMsU3sVzlHm-j8v6TgeWWgG9ggA=w1000',
                  'https://lh3.googleusercontent.com/d/1xd1KeYgpIE0AB-DJkVxtFknowjyfqOzy=w1000',
                ]}
              />
              <div className="flex items-start justify-between gap-4 mt-2">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#fbcfe8] transition-colors">Expert Guidance</h3>
                  <p className="text-xs text-white/70 leading-relaxed max-w-xs">10+ years of dedicated leadership in South Mumbai's luxury residential market.</p>
                </div>
                <span className="text-xl font-bold text-white/40 group-hover:text-white/80 font-mono">/01</span>
              </div>
            </div>
          </AnimatedCard>

          {/* Card 2: Iconic Developments */}
          <AnimatedCard className="group flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 cursor-pointer bg-zinc-950/80 backdrop-blur-md p-5 rounded-[32px] border border-white/10 shadow-xl hover:border-white/30 hover:shadow-2xl">
            <div>
              <AutoSlideImages
                alt="Iconic Developments"
                interval={3200}
                images={[
                  'https://lh3.googleusercontent.com/d/15XqzCDWxZFMi6eaGpdgPsoqhdLW7rgQm=w1000',
                  'https://lh3.googleusercontent.com/d/1IoALzbUn6_bAvlc1Qz9RMxeki82mDuSQ=w1000',
                  'https://lh3.googleusercontent.com/d/1RHxZvruaJYcUma32yrOM0uH7aIQrkuhd=w1000',
                  'https://lh3.googleusercontent.com/d/1qJc_-bMsU3sVzlHm-j8v6TgeWWgG9ggA=w1000',
                  'https://lh3.googleusercontent.com/d/1xd1KeYgpIE0AB-DJkVxtFknowjyfqOzy=w1000',
                ]}
              />
              <div className="flex items-start justify-between gap-4 mt-2">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#fbcfe8] transition-colors">Iconic Developments</h3>
                  <p className="text-xs text-white/70 leading-relaxed max-w-xs">Direct relationships with developers behind Lodha World Towers, Indiabulls Sky Forest, and Piramal Aranya.</p>
                </div>
                <span className="text-xl font-bold text-white/40 group-hover:text-white/80 font-mono">/02</span>
              </div>
            </div>
          </AnimatedCard>

          {/* Card 3: Absolute Transparency */}
          <AnimatedCard className="group flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 cursor-pointer bg-zinc-950/80 backdrop-blur-md p-5 rounded-[32px] border border-white/10 shadow-xl hover:border-white/30 hover:shadow-2xl">
            <div>
              <AutoSlideImages
                alt="Absolute Transparency"
                interval={3600}
                images={[
                  'https://lh3.googleusercontent.com/d/15XqzCDWxZFMi6eaGpdgPsoqhdLW7rgQm=w1000',
                  'https://lh3.googleusercontent.com/d/1IoALzbUn6_bAvlc1Qz9RMxeki82mDuSQ=w1000',
                  'https://lh3.googleusercontent.com/d/1RHxZvruaJYcUma32yrOM0uH7aIQrkuhd=w1000',
                  'https://lh3.googleusercontent.com/d/1qJc_-bMsU3sVzlHm-j8v6TgeWWgG9ggA=w1000',
                  'https://lh3.googleusercontent.com/d/1xd1KeYgpIE0AB-DJkVxtFknowjyfqOzy=w1000',
                ]}
              />
              <div className="flex items-start justify-between gap-4 mt-2">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#fbcfe8] transition-colors">Absolute Transparency</h3>
                  <p className="text-xs text-white/70 leading-relaxed max-w-xs">End-to-end advisory ensuring every transaction is handled with integrity and care.</p>
                </div>
                <span className="text-xl font-bold text-white/40 group-hover:text-white/80 font-mono">/03</span>
              </div>
            </div>
          </AnimatedCard>

        </AnimatedGrid>
      </section>


      {/* ---------------- SECTION 5: Exclusive properties, sorted by category ---------------- */}
      <section className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
            Exclusive residences,<br />sorted by category
          </h2>
        </AnimatedSection>

        <AnimatedGrid className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: 'Sky Villas & Duplexes',
              status: 'Ready to Move',
              image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
            },
            {
              title: 'Iconic Skyscraper Towers',
              status: 'Ready to Move',
              image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
            },
            {
              title: 'Parkside & Heritage Estates',
              status: 'Under Construction',
              image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
            }
          ].map((cat, i) => (
            <AnimatedCard key={i} className="group rounded-3xl bg-zinc-950 border border-white/10 overflow-hidden shadow-xl">
              <div className="relative h-64 overflow-hidden">
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 right-4 bg-black/80 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                  {cat.status}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-white">{cat.title}</h3>
              </div>
            </AnimatedCard>
          ))}
        </AnimatedGrid>

        <p className="text-xs text-white/60 max-w-xl">
          Explore a handpicked selection of ultra-luxury residences across Lower Parel, Worli, Prabhadevi, Mahalaxmi, Byculla, and Mazgaon matching your high standards.
        </p>
      </section>


      {/* ---------------- SECTION 8: ABOUT US / MEET OUR EXPERT TEAM ---------------- */}
      <section id="about-section" className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-widest mb-3">
            Gem Homes Advisory & Realtors (G.H.A.R.)
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Meet Our Leadership Team
          </h2>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            Founded with a vision to redefine luxury real estate advisory through trust, transparency, and deep market expertise across South Mumbai.
          </p>
        </AnimatedSection>

        <AnimatedGrid className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {teamMembers.map((member) => (
            <AnimatedCard 
              key={member.id} 
              className="bg-zinc-950 border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row gap-6 items-start hover:border-white/30 transition-all duration-300"
            >
              <div className="w-full md:w-48 h-64 md:h-full rounded-2xl overflow-hidden shrink-0 bg-zinc-900 border border-white/10">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="space-y-3 flex-1">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{member.name}</h3>
                  <p className="text-xs font-semibold text-[#fbcfe8] uppercase tracking-wider mt-0.5">{member.role}</p>
                </div>
                <p className="text-xs text-white/80 leading-relaxed pt-2 border-t border-white/10">
                  {member.bio}
                </p>
              </div>
            </AnimatedCard>
          ))}
        </AnimatedGrid>
      </section>


      {/* ---------------- SECTION 9: CERTIFICATIONS ---------------- */}
      <section id="certifications-section" className="max-w-7xl mx-auto px-6 mb-24">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-widest mb-3">
            Industry Recognition
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Our Certifications
          </h2>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            Our commitment to excellence and professional standards in the real estate industry.
          </p>
        </AnimatedSection>

        <AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <AnimatedCard className="group relative rounded-[32px] overflow-hidden shadow-2xl border border-white/10 hover:border-white/30 transition-all duration-500 bg-zinc-950/80 backdrop-blur-md p-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/5 rounded-2xl flex items-center justify-center p-2">
              <img 
                src="https://lh3.googleusercontent.com/d/1HbUDPwbC0nE5fFgQ59yrDL2TKl9Urb0X=w1000" 
                alt="Certification 1" 
                className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.15]" 
              />
            </div>
          </AnimatedCard>
          
          <AnimatedCard className="group relative rounded-[32px] overflow-hidden shadow-2xl border border-white/10 hover:border-white/30 transition-all duration-500 bg-zinc-950/80 backdrop-blur-md p-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/5 rounded-2xl flex items-center justify-center p-2">
              <img 
                src="https://lh3.googleusercontent.com/d/1MuqWdcL3r54Np7dgiQiJnUnJYOTEuKQU=w1000" 
                alt="Certification 2" 
                className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.15]" 
              />
            </div>
          </AnimatedCard>
        </AnimatedGrid>
      </section>


      {/* ---------------- SECTION 10: Form Section ---------------- */}
      <section id="contact-section" className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="bg-zinc-950 border border-white/15 rounded-[36px] p-8 sm:p-12 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center shadow-2xl">
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider">
              Gem Homes Advisory & Realtors
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
              Connect With Our<br />Luxury Advisors
            </h2>
            <p className="text-white/70 text-sm leading-relaxed">
              Schedule a private consultation for buying, selling, or investing in South Mumbai's finest real estate.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-start gap-3 text-xs text-white/80">
                <MapPin className="w-4 h-4 shrink-0 text-white mt-0.5" />
                <span>
                  <strong>Office Address:</strong><br />
                  Vaswani Chambers, 2nd Floor, 264-265, Dr. Annie Besant Road, Municipal Colony, Worli Shivaji Nagar, Worli, Mumbai, Maharashtra, 400025/30.
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-white/80">
                <Phone className="w-4 h-4 shrink-0 text-white" />
                <a href="tel:+919920448793" className="hover:text-white transition-colors font-medium">+91 99204 48793</a>
              </div>
              <div className="flex items-center gap-3 text-xs text-white/80">
                <Mail className="w-4 h-4 shrink-0 text-white" />
                <a href="mailto:Info@gemhomesadvisoryandrealtors.com" className="hover:text-white transition-colors font-medium break-all">Info@gemhomesadvisoryandrealtors.com</a>
              </div>
              <a
                href="https://wa.me/919920448793"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-black font-bold text-xs hover:bg-[#1ebe5d] transition-all shadow-lg hover:scale-105 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4 bg-zinc-900/80 p-6 sm:p-8 rounded-3xl border border-white/10">
            {formSubmitted ? (
              <div className="bg-white/10 border border-white/30 text-white p-6 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 mx-auto text-white" />
                <h3 className="font-bold text-lg">Inquiry Received!</h3>
                <p className="text-xs text-white/80">Thank you for contacting Gem Homes Advisory & Realtors (G.H.A.R.). Our senior advisors will get back to you shortly.</p>
              </div>
            ) : (
              <>
                <input 
                  type="text"
                  name="name"
                  required 
                  placeholder="Full Name" 
                  className="w-full bg-zinc-800/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white"
                />
                <input 
                  type="email"
                  name="email"
                  required 
                  placeholder="Your email address" 
                  className="w-full bg-zinc-800/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white"
                />
                <input 
                  type="tel"
                  name="phone"
                  placeholder="Phone number" 
                  className="w-full bg-zinc-800/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white"
                />
                <select
                  name="property"
                  className="w-full bg-zinc-800/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white"
                >
                  <option value="">Interested Property / Service</option>
                  <option value="sky-forest">Indiabulls Sky Forest</option>
                  <option value="world-towers">Lodha World Towers</option>
                  <option value="lodha-park">Lodha Park</option>
                  <option value="rustomjee-crown">Rustomjee Crown</option>
                  <option value="aga-hall">Aga Hall Estate</option>
                  <option value="monte-south">Monte South</option>
                  <option value="piramal-aranya">Piramal Aranya</option>
                  <option value="piramal-mahalaxmi">Piramal Mahalaxmi</option>
                  <option value="runwal-7">Runwal 7 Mahalaxmi</option>
                  <option value="general">General Advisory</option>
                </select>
                <textarea 
                  name="message"
                  rows={3} 
                  placeholder="Your requirement or message..." 
                  className="w-full bg-zinc-800/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white resize-none"
                />
                <button 
                  type="submit" 
                  className="w-full py-3.5 bg-[#25D366] text-black font-bold text-sm rounded-xl hover:bg-[#1ebe5d] transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Send via WhatsApp
                </button>
              </>
            )}
          </form>
        </AnimatedSection>
      </section>


      {/* ---------------- FOOTER ---------------- */}
      <footer className="border-t border-white/10 pt-16 pb-12 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold text-lg">
                G
              </div>
              <span className="text-xl font-bold text-white">Gem Homes Advisory & Realtors (G.H.A.R.)</span>
            </div>
            <p className="text-xs text-white/60 max-w-md leading-relaxed">
              Redefining luxury real estate advisory through trust, transparency, and personalized service across South Mumbai.
            </p>
            <p className="text-xs text-white/50 leading-relaxed pt-2">
              <strong>Address:</strong> Vaswani Chambers, 2nd Floor, 264-265, Dr. Annie Besant Road, Municipal Colony, Worli Shivaji Nagar, Worli, Mumbai, Maharashtra, 400025/30.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#about-section" className="hover:text-white">Developments</a></li>
              <li><a href="#about-section" className="hover:text-white">Leadership Team</a></li>
              <li><a href="#contact-section" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-white mb-4">Socials</h4>
            <div className="flex gap-4 text-white/70">
              <a
                href="https://www.instagram.com/gem_homes_advisoryandrealtors?igsh=eG55bDV5aG1mbXU%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/gem-homes-advisory-realtors"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/919920448793"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm text-white mb-4">Contact</h4>
            <div className="space-y-2 text-xs text-white/70">
              <a href="tel:+919920448793" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                +91 99204 48793
              </a>
              <a href="mailto:Info@gemhomesadvisoryandrealtors.com" className="flex items-center gap-2 hover:text-white transition-colors break-all">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                Info@gemhomesadvisoryandrealtors.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50">
          <p>© 2026 Gem Homes Advisory & Realtors (G.H.A.R.). All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0">DM Sans & Pure Black Minimal Luxury Theme</p>
        </div>
      </footer>

    </div>
  );
};
