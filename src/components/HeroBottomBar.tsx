import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { INITIAL_PROPERTIES } from '../data/mockData';

interface HeroBottomBarProps {
  onSearch?: (term: string) => void;
  onCityTagClick?: (city: string) => void;
}

export const HeroBottomBar: React.FC<HeroBottomBarProps> = ({
  onSearch,
  onCityTagClick,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCity, setActiveCity] = useState('All');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const popularCities = ['Lower Parel', 'Prabhadevi', 'Mahalaxmi', 'Byculla', 'Mazgaon', 'Worli'];

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute suggestions based on search term
  const suggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase().trim();
    
    return INITIAL_PROPERTIES.filter(p => {
      return p.title.toLowerCase().includes(term) || 
             p.location.toLowerCase().includes(term) || 
             (p.developer && p.developer.toLowerCase().includes(term)) ||
             p.city.toLowerCase().includes(term) ||
             p.type.toLowerCase().includes(term);
    }).sort((a, b) => {
      // Sort by title starting with the term first, then alphabetical
      const aStarts = a.title.toLowerCase().startsWith(term) ? -1 : 1;
      const bStarts = b.title.toLowerCase().startsWith(term) ? -1 : 1;
      if (aStarts !== bStarts) return aStarts - bStarts;
      return a.title.localeCompare(b.title);
    });
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDropdown(false);
    if (onSearch) {
      onSearch(searchTerm || activeCity);
    }
  };

  const handleCitySelect = (city: string) => {
    setActiveCity(city);
    setSearchTerm(city);
    setShowDropdown(false);
    if (onCityTagClick) {
      onCityTagClick(city);
    } else if (onSearch) {
      onSearch(city);
    }
  };

  const handleSuggestionClick = (title: string) => {
    setSearchTerm(title);
    setShowDropdown(false);
    if (onSearch) {
      onSearch(title);
    }
  };

  return (
    <div 
      className="w-full bg-zinc-950/90 border border-white/15 p-4 sm:p-5 rounded-2xl md:rounded-3xl backdrop-blur-2xl shadow-2xl space-y-3 font-sans transition-all duration-300 hover:border-white/30" 
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Top row: Interactive search input & main action button */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Input Field with Dropdown */}
        <div ref={dropdownRef} className="relative flex-1 w-full">
          <div className="w-full flex items-center bg-zinc-900 border border-white/15 rounded-xl sm:rounded-2xl px-4 py-3 transition-all focus-within:border-white focus-within:ring-1 focus-within:ring-white">
            <Search className="w-4 h-4 text-white/60 shrink-0 mr-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search by city, address, or luxury property type..."
              className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none font-medium"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setActiveCity('All');
                  setShowDropdown(false);
                  if (onSearch) onSearch('All');
                }}
                className="text-[11px] text-white/60 hover:text-white px-2 py-0.5 rounded-full bg-white/10 transition-colors shrink-0"
              >
                Clear
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown / Mega Menu */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-4 bg-zinc-950/95 backdrop-blur-3xl border border-white/20 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden z-50 max-h-[65vh] overflow-y-auto custom-scrollbar p-5 sm:p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white/80 font-bold text-sm tracking-wide">Matching Luxury Residences</h3>
                <span className="text-xs font-mono text-white/40 bg-white/5 px-3 py-1 rounded-full">{suggestions.length} results</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {suggestions.map(prop => (
                  <div 
                    key={prop.id}
                    onClick={() => handleSuggestionClick(prop.title)}
                    className="group relative rounded-2xl bg-zinc-900/50 border border-white/10 overflow-hidden cursor-pointer hover:border-white/30 transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col"
                  >
                    <div className="relative h-36 w-full overflow-hidden shrink-0">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10" />
                      <img 
                        src={prop.image} 
                        alt={prop.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {prop.developer && (
                        <div className="absolute top-3 left-3 z-20">
                          <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/10">
                            {prop.developer}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-1 justify-between bg-zinc-900/80">
                      <div>
                        <h4 className="text-white font-bold text-base mb-1 group-hover:text-pink-200 transition-colors line-clamp-1">{prop.title}</h4>
                        <p className="text-white/50 text-xs flex items-center gap-1.5 mb-3 line-clamp-1">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {prop.location}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-auto">
                        <span className="text-white text-xs font-bold tracking-tight">{prop.priceDisplay}</span>
                        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 bg-white text-black font-bold text-sm rounded-xl sm:rounded-2xl hover:bg-zinc-200 transition-all shadow-lg flex items-center justify-center gap-2 shrink-0 active:scale-95 cursor-pointer h-[46px]"
        >
          <span>Search Properties</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </form>

      {/* Bottom row: Popular location tags & key volume metrics */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-3 border-t border-white/10">
        
        {/* Location Tags */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none mask-fade-edges-x">
          <span className="text-[11px] font-semibold text-white/50 uppercase tracking-widest shrink-0 flex items-center gap-1 mr-2">
            <MapPin className="w-3 h-3 text-white/80" />
            Popular:
          </span>
          {popularCities.map((city) => {
            const isSelected = activeCity === city || searchTerm.toLowerCase() === city.toLowerCase();
            return (
              <button
                key={city}
                type="button"
                onClick={() => handleCitySelect(city)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-black font-bold shadow-md scale-105'
                    : 'text-white/70 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20'
                }`}
              >
                {city}
              </button>
            );
          })}
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-5 text-xs text-white/60 shrink-0 font-medium pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
          <span className="flex items-center gap-1.5"><strong className="text-white font-bold tracking-wide">₹1,000 Cr+</strong> Advisory Volume</span>
          <span className="w-1 h-1 rounded-full bg-white/20"></span>
          <span className="flex items-center gap-1.5"><strong className="text-white font-bold tracking-wide">9+</strong> Luxury Developments</span>
        </div>

      </div>

    </div>
  );
};
