'use client';

import React from 'react';
import { 
  Leaf, 
  UploadCloud, 
  Layers, 
  MapPin, 
  FileCheck2, 
  SlidersHorizontal,
  Cloud,
  CheckCircle2,
  Sparkles
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
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md transition-all">
      {/* Top Banner Notice */}
      <div className="bg-emerald-50/80 border-b border-emerald-100 px-4 py-1.5 text-xs text-emerald-800 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-900">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Code Cubicle 6 Official
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="hidden sm:inline text-emerald-700">Problem Statement 02 (Cloudinary Track) — AI-Powered Impact & Sustainability Media Platform</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-600 bg-white px-2 py-0.5 rounded-full border border-slate-200 shadow-2xs">
              <Cloud className="w-3 h-3 text-sky-600" />
              <span className="text-[11px] font-medium text-slate-700">Cloudinary AI CDN:</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] text-emerald-700 font-semibold">Active</span>
            </div>
            <div className="text-[11px] text-slate-500 hidden md:block">
              <span className="font-semibold text-slate-700">{totalAssetsCount}</span> Verified Evidence Records
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-600 text-white shadow-sm ring-4 ring-emerald-50">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900">VeriTerra</span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-emerald-100 text-emerald-800 rounded">
                  AI Media
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Impact Evidence & Verification Platform</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-white text-emerald-800 shadow-2xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Overview
            </button>

            <button
              onClick={() => setActiveTab('before-after')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'before-after'
                  ? 'bg-white text-emerald-800 shadow-2xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" />
              Before / After Studio
              <span className="px-1.5 py-0.2 text-[9px] font-bold bg-emerald-600 text-white rounded-full">
                Interactive
              </span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'gallery'
                  ? 'bg-white text-emerald-800 shadow-2xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Evidence Gallery
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'map'
                  ? 'bg-white text-emerald-800 shadow-2xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              Geo Map
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'reports'
                  ? 'bg-white text-emerald-800 shadow-2xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5 text-amber-600" />
              ESG Reports
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenReportModal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-slate-600" />
              Generate Audit Report
            </button>

            <button
              onClick={onOpenIngestModal}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-all focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Ingest Field Media</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation */}
      <div className="md:hidden border-t border-slate-200 px-4 py-2 flex items-center justify-around bg-slate-50 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3 py-1 text-xs font-semibold rounded-md ${
            activeTab === 'overview' ? 'bg-emerald-600 text-white' : 'text-slate-600'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('before-after')}
          className={`px-3 py-1 text-xs font-semibold rounded-md ${
            activeTab === 'before-after' ? 'bg-emerald-600 text-white' : 'text-slate-600'
          }`}
        >
          Before/After
        </button>
        <button
          onClick={() => setActiveTab('gallery')}
          className={`px-3 py-1 text-xs font-semibold rounded-md ${
            activeTab === 'gallery' ? 'bg-emerald-600 text-white' : 'text-slate-600'
          }`}
        >
          Gallery
        </button>
        <button
          onClick={() => setActiveTab('map')}
          className={`px-3 py-1 text-xs font-semibold rounded-md ${
            activeTab === 'map' ? 'bg-emerald-600 text-white' : 'text-slate-600'
          }`}
        >
          Map
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-3 py-1 text-xs font-semibold rounded-md ${
            activeTab === 'reports' ? 'bg-emerald-600 text-white' : 'text-slate-600'
          }`}
        >
          Reports
        </button>
      </div>
    </header>
  );
};
