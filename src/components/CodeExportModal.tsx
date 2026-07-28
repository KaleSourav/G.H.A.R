import React, { useState } from 'react';
import { BannerConfig } from '../types';
import { X, Copy, Check, Code2 } from 'lucide-react';

interface CodeExportModalProps {
  config: BannerConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({
  config,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'jsx' | 'html'>('jsx');

  if (!isOpen) return null;

  const jsxCode = `import React from 'react';
import { MapPin, Home, Tag, Search, ArrowUpRight } from 'lucide-react';

export const NestHubHeroBanner = () => {
  return (
    <section 
      className="relative w-full bg-black text-white p-6 sm:p-10 md:p-12"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="relative w-full bg-black border border-white/10 rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 md:p-12 flex flex-col justify-between min-h-[640px]">
        
        {/* Header */}
        <header className="w-full flex items-center justify-between pb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold text-lg">
              N
            </div>
            <span className="text-white text-xl font-bold tracking-tight">${config.logoText}</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 bg-white/5 px-6 py-2 rounded-full border border-white/10 text-sm">
            <a href="#" className="text-white underline underline-offset-4 font-semibold">Home</a>
            <a href="#" className="text-white/80 hover:text-white">Lists</a>
            <a href="#" className="text-white/80 hover:text-white">About</a>
            <a href="#" className="text-white/80 hover:text-white">Contact</a>
          </nav>

          <button className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-1.5">
            <span>${config.ctaText}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </header>

        {/* Hero Banner Text */}
        <div className="my-auto py-8 max-w-2xl">
          <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[1.08] mb-6">
            ${config.headline}
          </h1>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed">
            ${config.subtitle}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-2xl md:rounded-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 px-4 py-2 w-full md:w-1/3">
              <MapPin className="w-4 h-4 text-white/70" />
              <div>
                <span className="text-[11px] font-medium text-white/60 block uppercase">${config.locationLabel}</span>
                <span className="text-sm font-semibold text-white">${config.selectedLocation || 'New York, NY'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 w-full md:w-1/3">
              <Home className="w-4 h-4 text-white/70" />
              <div>
                <span className="text-[11px] font-medium text-white/60 block uppercase">${config.propertyTypeLabel}</span>
                <span className="text-sm font-semibold text-white">Property Type</span>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 w-full md:w-1/3">
              <Tag className="w-4 h-4 text-white/70" />
              <div>
                <span className="text-[11px] font-medium text-white/60 block uppercase">${config.priceRangeLabel}</span>
                <span className="text-sm font-semibold text-white">Price range</span>
              </div>
            </div>

            <button className="w-full md:w-auto px-6 h-11 bg-white text-black rounded-full flex items-center justify-center">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};`;

  const htmlCode = `<section style="background-color: #000000; color: #ffffff; font-family: 'DM Sans', sans-serif; padding: 2.5rem; width: 100%;">
  <div style="background-color: #000000; border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 40px; padding: 3rem; display: flex; flex-direction: column; justify-between; min-height: 640px;">
    
    <!-- Navbar -->
    <header style="display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="width: 32px; height: 32px; background: #ffffff; color: #000000; border-radius: 8px; font-weight: bold; display: flex; align-items: center; justify-content: center;">N</div>
        <span style="font-weight: bold; font-size: 1.25rem;">${config.logoText}</span>
      </div>
      <button style="background: #ffffff; color: #000000; padding: 10px 20px; border-radius: 9999px; font-weight: 600; border: none; cursor: pointer;">${config.ctaText} &#8599;</button>
    </header>

    <!-- Banner Content -->
    <div style="margin-top: 3rem; margin-bottom: 3rem; max-width: 650px;">
      <h1 style="font-size: 3.5rem; font-weight: 700; color: #ffffff; line-height: 1.1; margin-bottom: 1.5rem;">${config.headline}</h1>
      <p style="font-size: 1.125rem; color: rgba(255, 255, 255, 0.8); line-height: 1.6;">${config.subtitle}</p>
    </div>

    <!-- Search Bar -->
    <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.2); padding: 12px; border-radius: 9999px; max-width: 650px; display: flex; justify-content: space-between; align-items: center;">
      <div style="padding-left: 12px; color: #ffffff;">
        <div style="font-size: 10px; opacity: 0.6; text-transform: uppercase;">${config.locationLabel}</div>
        <div style="font-size: 14px; font-weight: 600;">${config.selectedLocation || 'New York, NY'}</div>
      </div>
      <div style="padding-left: 12px; color: #ffffff;">
        <div style="font-size: 10px; opacity: 0.6; text-transform: uppercase;">${config.propertyTypeLabel}</div>
        <div style="font-size: 14px; font-weight: 600;">Property Type</div>
      </div>
      <div style="padding-left: 12px; color: #ffffff;">
        <div style="font-size: 10px; opacity: 0.6; text-transform: uppercase;">${config.priceRangeLabel}</div>
        <div style="font-size: 14px; font-weight: 600;">Price range</div>
      </div>
      <button style="width: 44px; height: 44px; border-radius: 9999px; background: #ffffff; border: none; cursor: pointer;">&#128065;</button>
    </div>

  </div>
</section>`;

  const codeToDisplay = activeTab === 'jsx' ? jsxCode : htmlCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeToDisplay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-zinc-950 border border-white/20 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-white" />
            <h3 className="font-bold text-base text-white">Banner Component Code</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Code Tabs & Copy */}
        <div className="px-5 pt-3 pb-2 flex items-center justify-between border-b border-white/10 bg-zinc-900/50">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('jsx')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'jsx' ? 'bg-white text-black' : 'text-white/70 hover:text-white'
              }`}
            >
              React / JSX
            </button>
            <button
              onClick={() => setActiveTab('html')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'html' ? 'bg-white text-black' : 'text-white/70 hover:text-white'
              }`}
            >
              HTML + Inline Style
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors border border-white/20"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Code Block */}
        <div className="p-5 overflow-y-auto bg-black font-mono text-xs text-white/90 leading-relaxed selection:bg-white/20">
          <pre>{codeToDisplay}</pre>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-white/10 bg-zinc-950 text-xs text-white/60 flex items-center justify-between">
          <span>Uses DM Sans font & Pure Black styling</span>
          <button 
            onClick={onClose}
            className="px-4 py-1.5 bg-white text-black font-bold text-xs rounded-full"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
