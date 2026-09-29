'use client';

import React, { useState } from 'react';
import { 
  Leaf, 
  UploadCloud, 
  FileCheck2,
  SlidersHorizontal,
  Layers,
  MapPin,
  CheckCircle2,
  Folder,
  Menu,
  X
} from 'lucide-react';

export type ActiveTab = 'overview' | 'before-after' | 'gallery' | 'map' | 'reports';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenIngestModal: () => void;
  onOpenReportModal: () => void;
  totalAssetsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenIngestModal,
  onOpenReportModal,
  totalAssetsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 sm:top-5 z-40 w-full pointer-events-none px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 3 Floating Islands Container (Zenwood Studio Architecture) */}
      <div className="flex items-center justify-between gap-3">
        {/* Left Island: Real Status Pill */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm pointer-events-auto transition-transform hover:scale-102">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-slate-800 tracking-tight select-none">
            available for verification
          </span>
          <span className="hidden lg:inline text-[11px] font-mono text-slate-400 border-l border-slate-200 pl-2">
            {totalAssetsCount} assets
          </span>
        </div>

        {/* Center Island: Main Terraframe Brandmark & Navigation Capsule */}
        <nav className="hidden md:flex items-center gap-5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md pointer-events-auto">
          {/* Circular Black Brand Badge with White Leaf & Brand Name */}
          <div 
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-2 cursor-pointer group"
            title="Terraframe AI Overview"
          >
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Leaf className="w-4 h-4 fill-white text-white" />
            </div>
            <span className="font-bold text-xs text-slate-900 tracking-tight pr-1">
              Terraframe
            </span>
          </div>

          <div className="h-4 w-px bg-slate-200"></div>

          {/* Genuine Platform Navigation Tabs */}
          <div className="flex items-center gap-4 text-[13px] font-medium text-slate-700">
            <button
              onClick={() => setActiveTab('overview')}
              className={`hover:text-black transition-colors cursor-pointer ${
                activeTab === 'overview' ? 'font-bold text-black' : 'text-slate-600'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('before-after')}
              className={`hover:text-black transition-colors cursor-pointer ${
                activeTab === 'before-after' ? 'font-bold text-black' : 'text-slate-600'
              }`}
            >
              Before / After
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`hover:text-black transition-colors cursor-pointer ${
                activeTab === 'gallery' ? 'font-bold text-black' : 'text-slate-600'
              }`}
            >
              Evidence Gallery
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`hover:text-black transition-colors cursor-pointer ${
                activeTab === 'map' ? 'font-bold text-black' : 'text-slate-600'
              }`}
            >
              Geo Radar
            </button>
            <button
              onClick={() => onOpenReportModal()}
              className="hover:text-black transition-colors cursor-pointer text-slate-600"
            >
              ESG Reports
            </button>
          </div>
        </nav>

        {/* Right Island: Real Action & Contact Capsule */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Real Contact Capsule */}
          <a
            href="mailto:contact@terraframe.org"
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm text-xs font-semibold text-slate-800 hover:text-black hover:border-slate-300 transition-all hover:shadow-md cursor-pointer"
          >
            <Folder className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
            <span>contact@terraframe.org</span>
          </a>

          {/* Real Field Media Ingest CTA Capsule */}
          <button
            onClick={onOpenIngestModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm text-xs font-semibold transition-all active:scale-98 cursor-pointer"
            title="Ingest New Field Asset"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ingest Media</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full bg-white border border-slate-200/90 shadow-sm flex items-center justify-center text-slate-700 hover:text-black cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (When Open) */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 rounded-3xl bg-white/98 backdrop-blur-lg border border-slate-200 shadow-xl pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-200 space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">
                <Leaf className="w-3.5 h-3.5 fill-white text-white" />
              </div>
              <span className="text-xs font-bold text-slate-900">Terraframe AI</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
              Live Registry ({totalAssetsCount})
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1 text-xs font-medium">
            <button
              onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-left ${activeTab === 'overview' ? 'bg-slate-900 text-white font-semibold' : 'bg-slate-50 text-slate-700'}`}
            >
              Overview
            </button>
            <button
              onClick={() => { setActiveTab('before-after'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-left ${activeTab === 'before-after' ? 'bg-slate-900 text-white font-semibold' : 'bg-slate-50 text-slate-700'}`}
            >
              Before / After Studio
            </button>
            <button
              onClick={() => { setActiveTab('gallery'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-left ${activeTab === 'gallery' ? 'bg-slate-900 text-white font-semibold' : 'bg-slate-50 text-slate-700'}`}
            >
              Evidence Gallery
            </button>
            <button
              onClick={() => { setActiveTab('map'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-left ${activeTab === 'map' ? 'bg-slate-900 text-white font-semibold' : 'bg-slate-50 text-slate-700'}`}
            >
              Geo Radar Map
            </button>
            <button
              onClick={() => { onOpenReportModal(); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl text-left bg-slate-50 text-slate-700"
            >
              ESG Reports
            </button>
            <button
              onClick={() => { onOpenIngestModal(); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl text-left bg-emerald-50 text-emerald-800 font-semibold"
            >
              + Ingest Media
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
