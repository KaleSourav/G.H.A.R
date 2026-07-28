import React, { useState } from 'react';
import { MapPin, Home, Tag, Search, ChevronDown } from 'lucide-react';
import { CITIES, PROPERTY_TYPES, PRICE_RANGES } from '../data/mockData';

interface FilterBarProps {
  onSearch?: (filters: { location: string; type: string; price: string }) => void;
  locationLabel?: string;
  propertyTypeLabel?: string;
  priceRangeLabel?: string;
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  onSearch,
  locationLabel = 'Location',
  propertyTypeLabel = 'Property Type',
  priceRangeLabel = 'Price range',
  className = '',
}) => {
  const [selectedLocation, setSelectedLocation] = useState('New York, NY');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedPrice, setSelectedPrice] = useState('All Prices');

  const [openDropdown, setOpenDropdown] = useState<'location' | 'type' | 'price' | null>(null);

  const handleSearchClick = () => {
    onSearch?.({
      location: selectedLocation,
      type: selectedType,
      price: selectedPrice,
    });
  };

  return (
    <div className={`w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-2 sm:p-3 rounded-2xl md:rounded-full shadow-2xl ${className}`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-3">
        
        {/* Location Selector */}
        <div className="relative w-full md:w-1/3">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'location' ? null : 'location')}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl md:rounded-full hover:bg-white/10 transition-colors text-left"
          >
            <MapPin className="w-4 h-4 text-white/70 shrink-0" />
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-[11px] font-medium text-white/60 tracking-wider uppercase">{locationLabel}</span>
              <span className="text-sm font-semibold text-white truncate flex items-center justify-between gap-1">
                {selectedLocation}
                <ChevronDown className="w-3.5 h-3.5 text-white/50 shrink-0" />
              </span>
            </div>
          </button>

          {openDropdown === 'location' && (
            <div className="absolute top-full left-0 mt-2 w-full bg-zinc-950 border border-white/20 rounded-xl shadow-2xl py-2 z-50 max-h-56 overflow-y-auto">
              {CITIES.filter(c => c !== 'All Cities').map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setSelectedLocation(city);
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-white/10 transition-colors ${
                    selectedLocation === city ? 'text-white bg-white/20 font-bold' : 'text-white/80'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-white/15" />

        {/* Property Type Selector */}
        <div className="relative w-full md:w-1/3">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl md:rounded-full hover:bg-white/10 transition-colors text-left"
          >
            <Home className="w-4 h-4 text-white/70 shrink-0" />
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-[11px] font-medium text-white/60 tracking-wider uppercase">{propertyTypeLabel}</span>
              <span className="text-sm font-semibold text-white truncate flex items-center justify-between gap-1">
                {selectedType}
                <ChevronDown className="w-3.5 h-3.5 text-white/50 shrink-0" />
              </span>
            </div>
          </button>

          {openDropdown === 'type' && (
            <div className="absolute top-full left-0 mt-2 w-full bg-zinc-950 border border-white/20 rounded-xl shadow-2xl py-2 z-50 max-h-56 overflow-y-auto">
              {PROPERTY_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type);
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-white/10 transition-colors ${
                    selectedType === type ? 'text-white bg-white/20 font-bold' : 'text-white/80'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-white/15" />

        {/* Price Range Selector */}
        <div className="relative w-full md:w-1/3">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'price' ? null : 'price')}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl md:rounded-full hover:bg-white/10 transition-colors text-left"
          >
            <Tag className="w-4 h-4 text-white/70 shrink-0" />
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-[11px] font-medium text-white/60 tracking-wider uppercase">{priceRangeLabel}</span>
              <span className="text-sm font-semibold text-white truncate flex items-center justify-between gap-1">
                {selectedPrice}
                <ChevronDown className="w-3.5 h-3.5 text-white/50 shrink-0" />
              </span>
            </div>
          </button>

          {openDropdown === 'price' && (
            <div className="absolute top-full left-0 mt-2 w-full bg-zinc-950 border border-white/20 rounded-xl shadow-2xl py-2 z-50 max-h-56 overflow-y-auto">
              {PRICE_RANGES.map((price) => (
                <button
                  key={price}
                  onClick={() => {
                    setSelectedPrice(price);
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-white/10 transition-colors ${
                    selectedPrice === price ? 'text-white bg-white/20 font-bold' : 'text-white/80'
                  }`}
                >
                  {price}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Action Button */}
        <button
          onClick={handleSearchClick}
          aria-label="Search properties"
          className="w-full md:w-auto h-11 px-6 bg-white text-black hover:bg-zinc-200 rounded-xl md:rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-105 active:scale-95 shrink-0"
        >
          <Search className="w-4 h-4 stroke-[2.5]" />
          <span className="md:hidden ml-2 text-sm font-bold">Search</span>
        </button>

      </div>
    </div>
  );
};
