import React, { useState } from 'react';
import { BannerConfig } from '../types';
import { Settings, Eye, Code, Copy, Check, Sliders, RefreshCw, LayoutTemplate } from 'lucide-react';

interface BannerToolbarProps {
  config: BannerConfig;
  onChangeConfig: (newConfig: BannerConfig) => void;
  viewMode: 'banner-only' | 'full-page';
  onToggleViewMode: (mode: 'banner-only' | 'full-page') => void;
  onOpenCodeModal: () => void;
  onResetDefaults: () => void;
}

export const BannerToolbar: React.FC<BannerToolbarProps> = ({
  config,
  onChangeConfig,
  viewMode,
  onToggleViewMode,
  onOpenCodeModal,
  onResetDefaults,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="w-full bg-zinc-950 border-b border-white/10 px-4 py-3 sticky top-0 z-50 backdrop-blur-xl bg-opacity-90 font-sans">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: App Title & Specs Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-sm text-white tracking-tight">NestHub Banner Studio</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-[11px] font-semibold text-white/90 border border-white/10">
            <span>Font: DM Sans</span>
            <span className="opacity-40">•</span>
            <span>Bg: Pure Black (#000)</span>
            <span className="opacity-40">•</span>
            <span>Text: Pure White (#FFF)</span>
          </div>
        </div>

        {/* Right: Controls & View Toggles */}
        <div className="flex items-center gap-2">
          {/* View Mode Switcher */}
          <div className="flex items-center bg-zinc-900 p-1 rounded-full border border-white/10 text-xs">
            <button
              onClick={() => onToggleViewMode('banner-only')}
              className={`px-3 py-1 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'banner-only' 
                  ? 'bg-white text-black shadow-md' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Banner Only</span>
            </button>
            <button
              onClick={() => onToggleViewMode('full-page')}
              className={`px-3 py-1 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'full-page' 
                  ? 'bg-white text-black shadow-md' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <LayoutTemplate className="w-3.5 h-3.5" />
              <span>Full Page</span>
            </button>
          </div>

          {/* Quick Settings Toggle */}
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`p-2 rounded-full border border-white/10 transition-colors flex items-center gap-1 text-xs font-semibold ${
              isSettingsOpen ? 'bg-white text-black' : 'bg-zinc-900 text-white hover:bg-zinc-800'
            }`}
            title="Banner Customizer"
          >
            <Sliders className="w-4 h-4" />
            <span className="hidden md:inline">Customize</span>
          </button>

          {/* Code Export Button */}
          <button
            onClick={onOpenCodeModal}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Export JSX / HTML Code"
          >
            <Code className="w-4 h-4" />
            <span className="hidden sm:inline">Export Code</span>
          </button>
        </div>
      </div>

      {/* Expanded Customizer Panel */}
      {isSettingsOpen && (
        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          <div>
            <label className="block text-white/60 mb-1 font-medium">Main Headline</label>
            <input 
              type="text" 
              value={config.headline}
              onChange={(e) => onChangeConfig({ ...config, headline: e.target.value })}
              className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="block text-white/60 mb-1 font-medium">Subheadline</label>
            <input 
              type="text" 
              value={config.subtitle}
              onChange={(e) => onChangeConfig({ ...config, subtitle: e.target.value })}
              className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="block text-white/60 mb-1 font-medium">Container Radius</label>
            <select 
              value={config.bannerRadius}
              onChange={(e) => onChangeConfig({ ...config, bannerRadius: e.target.value })}
              className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white"
            >
              <option value="rounded-[32px] sm:rounded-[40px]">Original (Rounded 40px)</option>
              <option value="rounded-2xl">Medium (Rounded 16px)</option>
              <option value="rounded-none">Sharp Corners (0px)</option>
            </select>
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={onResetDefaults}
              className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
