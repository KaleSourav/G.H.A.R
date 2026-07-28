import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Property } from '../types';
import { 
  X, MapPin, Bed, Maximize2, CheckCircle2, 
  Building2, IndianRupee, LayoutGrid, Image as ImageIcon, 
  Navigation, HelpCircle, Calendar, ShieldCheck, ChevronDown, ChevronUp, ArrowUpRight,
  Activity, GraduationCap, Stethoscope, ShoppingBag
} from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  initialTab?: 'Overview' | 'Price' | 'Configs' | 'Gallery' | 'Location' | 'FAQs';
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  initialTab = 'Overview',
}) => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Price' | 'Configs' | 'Gallery' | 'Location' | 'FAQs'>(initialTab);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [booked, setBooked] = useState(false);

  if (!property) return null;

  const tabs: Array<'Overview' | 'Price' | 'Configs' | 'Gallery' | 'Location' | 'FAQs'> = [
    'Overview',
    'Price',
    'Configs',
    'Gallery',
    'Location',
    'FAQs',
  ];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-5 h-5 text-[#fbcfe8]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#fbcfe8]" />;
      case 'LayoutGrid': return <LayoutGrid className="w-5 h-5 text-[#fbcfe8]" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-[#fbcfe8]" />;
      case 'Stethoscope': return <Stethoscope className="w-5 h-5 text-[#fbcfe8]" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-[#fbcfe8]" />;
      case 'Navigation': return <Navigation className="w-5 h-5 text-[#fbcfe8]" />;
      default: return <CheckCircle2 className="w-5 h-5 text-[#fbcfe8]" />;
    }
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
    }, 3000);
  };

  const galleryImages = property.gallery && property.gallery.length > 0 
    ? property.gallery 
    : [
        { url: property.image, caption: property.title + ' Primary Residence' },
        { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80', caption: 'Luxury Interior Space' },
        { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80', caption: 'Amenity Deck & Pool' },
      ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-3 sm:p-6 font-sans overflow-y-auto" 
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-zinc-950 border border-white/20 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[92vh]"
      >
        
        {/* Top Header Banner */}
        <div className="relative h-56 sm:h-72 shrink-0 overflow-hidden bg-zinc-900">
          <img 
            src={galleryImages[selectedImageIndex]?.url || property.image} 
            alt={property.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer z-10 shadow-lg"
            title="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Badges & Title */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="bg-[#fbcfe8] text-black text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  {property.developer || 'G.H.A.R. Exclusive'}
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-0.5 rounded-full border border-white/20">
                  {property.completionStatus || property.status}
                </span>
                {property.reraId && (
                  <span className="bg-black/60 text-white/80 text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-white/10">
                    RERA: {property.reraId}
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{property.title}</h2>
              <p className="text-xs sm:text-sm text-white/80 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#fbcfe8] shrink-0" />
                <span>{property.location}</span>
              </p>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="text-xl sm:text-3xl font-extrabold text-white tracking-tight block">
                {property.priceDisplay || `₹${property.price}`}
              </span>
              {property.pricePerSqft && (
                <span className="text-[11px] text-white/60 block">{property.pricePerSqft}</span>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-zinc-900 border-b border-white/10 px-4 sm:px-6 py-2 overflow-x-auto no-scrollbar shrink-0">
          <div className="flex items-center gap-2 min-w-max">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive 
                      ? 'bg-white text-black shadow-md scale-105' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab === 'Overview' && <Building2 className="w-3.5 h-3.5" />}
                  {tab === 'Price' && <IndianRupee className="w-3.5 h-3.5" />}
                  {tab === 'Configs' && <LayoutGrid className="w-3.5 h-3.5" />}
                  {tab === 'Gallery' && <ImageIcon className="w-3.5 h-3.5" />}
                  {tab === 'Location' && <Navigation className="w-3.5 h-3.5" />}
                  {tab === 'FAQs' && <HelpCircle className="w-3.5 h-3.5" />}
                  <span>{tab}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Tab Content Container */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1">

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'Overview' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-zinc-900/90 rounded-2xl border border-white/10 text-xs text-white">
                <div>
                  <span className="text-[10px] text-white/50 uppercase tracking-wider block mb-1">Developer</span>
                  <span className="font-bold text-sm block truncate">{property.developer || 'Gem Homes'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/50 uppercase tracking-wider block mb-1">Carpet Area</span>
                  <span className="font-bold text-sm block">{property.sqft}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/50 uppercase tracking-wider block mb-1">Configs</span>
                  <span className="font-bold text-sm block">{property.beds}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/50 uppercase tracking-wider block mb-1">Possession</span>
                  <span className="font-bold text-sm block text-[#fbcfe8]">{property.possessionDate || 'Ready to Move'}</span>
                </div>
                {property.projectArea && (
                  <div>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider block mb-1">Project Area</span>
                    <span className="font-bold text-sm block">{property.projectArea}</span>
                  </div>
                )}
                {property.totalUnitsStructure && (
                  <div>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider block mb-1">Total Units</span>
                    <span className="font-bold text-sm block">{property.totalUnitsStructure}</span>
                  </div>
                )}
                {property.launchDate && (
                  <div>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider block mb-1">Launch Date</span>
                    <span className="font-bold text-sm block">{property.launchDate}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#fbcfe8]" />
                  <span>Project Summary</span>
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed bg-zinc-900/40 p-4 rounded-2xl border border-white/10">
                  {property.description}
                </p>
              </div>

              {/* Design Legends */}
              {property.designLegends && property.designLegends.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Design & Architecture Legends</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {property.designLegends.map((legend, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-zinc-900/60 border border-white/10 flex flex-col items-center text-center justify-center gap-1">
                        <span className="text-[10px] text-white/50 uppercase tracking-wider">{legend.role}</span>
                        <span className="font-bold text-xs text-white">{legend.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Overview Highlights */}
              {property.overviewHighlights && property.overviewHighlights.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#fbcfe8]" />
                    <span>Key Highlights</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.overviewHighlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-white/10 text-xs text-white/90">
                        <CheckCircle2 className="w-4 h-4 text-[#fbcfe8] shrink-0 mt-0.5" />
                        <span className="leading-snug">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Amenities */}
              {(property.amenities || (property.amenitiesCategories && property.amenitiesCategories.length > 0)) && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">World-Class Amenities</h3>
                  
                  {property.amenities && (
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed bg-zinc-900/60 p-4 rounded-2xl border border-white/10 mb-3">
                      {property.amenities}
                    </p>
                  )}
                  
                  {property.amenitiesCategories && property.amenitiesCategories.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {property.amenitiesCategories.map((ac, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            {renderIcon(ac.icon)}
                            <span className="text-xs font-bold text-white">{ac.category}</span>
                          </div>
                          <p className="text-xs text-white/70 leading-relaxed">{ac.items}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PRICE */}
          {activeTab === 'Price' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 p-6 rounded-2xl border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/60">Estimated Starting Price</span>
                  <div className="text-3xl font-extrabold text-white mt-1">{property.priceDisplay}</div>
                  {property.pricePerSqft && (
                    <p className="text-xs text-[#fbcfe8] mt-1 font-medium">Average Rate: {property.pricePerSqft}</p>
                  )}
                </div>
                <button 
                  onClick={() => setActiveTab('Overview')} 
                  className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors"
                >
                  Request Official Price Sheet
                </button>
              </div>

              {/* Configurations Price Table */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Estimated Price Breakdown by Configuration</h3>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-zinc-900 text-white/60 border-b border-white/10 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-3.5">Unit Type</th>
                        <th className="p-3.5">Carpet Area</th>
                        <th className="p-3.5 text-right">Price Range</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-white/90 font-medium">
                      {property.configsList && property.configsList.length > 0 ? (
                        property.configsList.map((cfg, idx) => (
                          <tr key={idx} className="hover:bg-white/5 transition-colors">
                            <td className="p-3.5 font-bold text-white">{cfg.type}</td>
                            <td className="p-3.5">{cfg.carpetArea}</td>
                            <td className="p-3.5 text-right font-bold text-[#fbcfe8]">{cfg.priceRange}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="p-3.5 font-bold text-white">{property.beds}</td>
                          <td className="p-3.5">{property.sqft}</td>
                          <td className="p-3.5 text-right font-bold text-[#fbcfe8]">{property.priceDisplay}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Statutory & Banking Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#fbcfe8]" />
                    <span>Statutory Charges & Tax Info</span>
                  </span>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Prices are indicative agreement values. Stamp duty (6%), Registration fees (₹30,000), GST (5% for under-construction), and society maintenance deposit apply extra as per government norms.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#fbcfe8]" />
                    <span>Home Loan Approvals</span>
                  </span>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Pre-approved for quick processing by major financial partners including State Bank of India, HDFC Bank, ICICI Bank, Axis Bank, and Kotak Mahindra Bank.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONFIGS */}
          {activeTab === 'Configs' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Available Floor Plan Configurations</h3>
                  <p className="text-xs text-white/60">Select configurations for {property.title}</p>
                </div>
                <span className="text-xs font-mono px-3 py-1 bg-white/10 rounded-full border border-white/10 text-white">
                  {property.beds}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {property.configsList && property.configsList.length > 0 ? (
                  property.configsList.map((cfg, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-zinc-900 border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between space-y-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#fbcfe8] tracking-wider block">Option {idx + 1}</span>
                        <h4 className="text-base font-bold text-white mt-0.5">{cfg.type}</h4>
                        <p className="text-xs text-white/70 mt-1 flex items-center gap-1">
                          <Maximize2 className="w-3.5 h-3.5 text-white/50" />
                          <span>Carpet: {cfg.carpetArea}</span>
                        </p>
                      </div>
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{cfg.priceRange}</span>
                        <ArrowUpRight className="w-4 h-4 text-[#fbcfe8]" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 p-6 bg-zinc-900 rounded-2xl border border-white/10 text-center">
                    <h4 className="text-base font-bold text-white">{property.configuration}</h4>
                    <p className="text-xs text-white/70 mt-1">Carpet Area: {property.sqft}</p>
                  </div>
                )}
              </div>

              <div className="p-5 bg-zinc-900/80 rounded-2xl border border-white/10 text-xs text-white/80 space-y-2">
                <span className="font-bold text-white block">Custom Layouts & Duplex Combinations</span>
                <p className="leading-relaxed">
                  Bespoke floor plan modifications and contiguous apartment combinations (combining two adjacent 3 BHK or 4 BHK units into grand sky mansions) are available upon request through Gem Homes Advisory.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: GALLERY */}
          {activeTab === 'Gallery' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Primary Active Image Display */}
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 group bg-zinc-900">
                <img 
                  src={galleryImages[selectedImageIndex]?.url} 
                  alt={galleryImages[selectedImageIndex]?.caption || property.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-xl border border-white/20 font-medium">
                  {galleryImages[selectedImageIndex]?.caption || `${property.title} View ${selectedImageIndex + 1}`}
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative h-20 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                      selectedImageIndex === idx 
                        ? 'border-white ring-2 ring-white/50 scale-105' 
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: LOCATION */}
          {activeTab === 'Location' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#fbcfe8] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">{property.title}</h4>
                  <p className="text-xs text-white/70">{property.location}</p>
                </div>
              </div>

              {/* Landmark Distances */}
              {property.locationLandmarks && property.locationLandmarks.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Key Landmark Proximity & Connectivity</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.locationLandmarks.map((lm, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/10 flex items-center justify-between text-xs">
                        <span className="font-semibold text-white/90">{lm.name}</span>
                        <span className="font-bold text-[#fbcfe8] bg-black/50 px-2.5 py-1 rounded-full border border-white/10">{lm.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Neighborhood Map Graphic Representation */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 text-center space-y-2">
                <Navigation className="w-8 h-8 text-[#fbcfe8] mx-auto opacity-80" />
                <h4 className="text-sm font-bold text-white">South Mumbai Prime Address</h4>
                <p className="text-xs text-white/60 max-w-md mx-auto leading-relaxed">
                  Located in the heart of South Mumbai with seamless connectivity to the Coastal Road, Bandra-Worli Sea Link, and prime luxury retail destinations.
                </p>
              </div>

              {/* Locality Highlights */}
              {property.localityHighlights && property.localityHighlights.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Locality & Neighborhood Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.localityHighlights.map((lh, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          {renderIcon(lh.icon)}
                          <span className="text-xs font-bold text-white">{lh.category}</span>
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed">{lh.items}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: FAQS */}
          {activeTab === 'FAQs' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
              
              <div className="space-y-3">
                {property.faqs && property.faqs.length > 0 ? (
                  property.faqs.map((faq, idx) => {
                    const isExpanded = expandedFaqIndex === idx;
                    return (
                      <div 
                        key={idx} 
                        className="rounded-2xl border border-white/10 bg-zinc-900/70 overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                          className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-white hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-[#fbcfe8] shrink-0" /> : <ChevronDown className="w-4 h-4 text-white/50 shrink-0" />}
                        </button>
                        {isExpanded && (
                          <div className="p-4 pt-0 text-xs text-white/80 leading-relaxed border-t border-white/5 bg-zinc-950/40">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 text-xs text-white/70">
                    <p className="font-bold text-white mb-1">What is the RERA registration number?</p>
                    <p>This project is registered under Maharashtra RERA ({property.reraId || 'Approved'}). Details are verified on the official MahaRERA website.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bottom Private Viewing Request Form */}
          <div className="pt-5 border-t border-white/10">
            {booked ? (
              <div className="bg-[#fbcfe8]/10 border border-[#fbcfe8]/40 text-[#fbcfe8] p-4 rounded-2xl text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-xs sm:text-sm font-bold">Private Tour Request Received! Our South Mumbai advisor will contact you shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  required 
                  placeholder="Enter your email to request private site visit & brochure" 
                  className="flex-1 bg-zinc-900 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white"
                />
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-white text-black text-xs font-bold rounded-xl hover:bg-zinc-200 transition-all cursor-pointer shrink-0 shadow-lg hover:scale-105 active:scale-95"
                >
                  Book Private Viewing
                </button>
              </form>
            )}
          </div>

        </div>

      </motion.div>
    </motion.div>
  );
};
