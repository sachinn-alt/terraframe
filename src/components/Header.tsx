'use client';

import React, { useState } from 'react';
import { 
  Leaf, 
  UploadCloud, 
  FileText,
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
    <header className="sticky top-0 z-40 w-full bg-[#ffffff] border-b border-[#e8ebe6] transition-colors">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Brand Identity & Status Pill */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-[#163300] text-[#9fe870] flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <Leaf className="w-4.5 h-4.5 fill-[#9fe870]" />
            </div>
            <span className="font-extrabold text-xl text-[#163300] tracking-tight font-sans">
              Terraframe
            </span>
          </button>

          {/* Linen Mist Status Tag */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2f6d5] text-[#163300] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#163300] inline-block animate-pulse"></span>
            <span>Registry Live ({totalAssetsCount})</span>
          </div>
        </div>

        {/* Center: Wise Segmented Tab Control (9999px pill container) */}
        <nav className="hidden md:flex items-center p-1 rounded-full bg-[#e8ebe6]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#9fe870] text-[#163300] shadow-xs'
                : 'text-[#454745] hover:text-[#163300]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('before-after')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'before-after'
                ? 'bg-[#9fe870] text-[#163300] shadow-xs'
                : 'text-[#454745] hover:text-[#163300]'
            }`}
          >
            Before / After
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-[#9fe870] text-[#163300] shadow-xs'
                : 'text-[#454745] hover:text-[#163300]'
            }`}
          >
            Evidence Gallery
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'map'
                ? 'bg-[#9fe870] text-[#163300] shadow-xs'
                : 'text-[#454745] hover:text-[#163300]'
            }`}
          >
            Geo Radar
          </button>
          <button
            onClick={() => onOpenReportModal()}
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-[#454745] hover:text-[#163300] transition-colors cursor-pointer"
          >
            ESG Reports
          </button>
        </nav>

        {/* Right: Wise Pill Actions */}
        <div className="flex items-center gap-2.5">
          {/* Secondary Action: Outlined Pill Button */}
          <button
            onClick={() => onOpenReportModal()}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#163300] bg-white text-[#163300] text-xs font-semibold hover:bg-[#e8ebe6] transition-all cursor-pointer active:scale-98"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Audit Deck</span>
          </button>

          {/* Primary Action: Signature Lime Voltage Pill Button */}
          <button
            onClick={onOpenIngestModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#9fe870] hover:bg-[#b4f18f] text-[#163300] text-xs font-bold transition-all shadow-xs active:scale-98 cursor-pointer"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>+ Ingest Media</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full bg-[#e8ebe6] flex items-center justify-center text-[#163300] hover:bg-[#d8dcd5] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden p-4 bg-[#ffffff] border-t border-[#e8ebe6] animate-in fade-in slide-in-from-top-2 duration-150 space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-[#e8ebe6]">
            <span className="text-xs font-bold text-[#163300]">Navigation</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#e2f6d5] text-[#163300] font-semibold">
              Live Assets: {totalAssetsCount}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1 text-xs font-medium">
            <button
              onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-left ${activeTab === 'overview' ? 'bg-[#9fe870] text-[#163300] font-bold' : 'bg-[#e8ebe6] text-[#454745]'}`}
            >
              Overview
            </button>
            <button
              onClick={() => { setActiveTab('before-after'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-left ${activeTab === 'before-after' ? 'bg-[#9fe870] text-[#163300] font-bold' : 'bg-[#e8ebe6] text-[#454745]'}`}
            >
              Before / After
            </button>
            <button
              onClick={() => { setActiveTab('gallery'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-left ${activeTab === 'gallery' ? 'bg-[#9fe870] text-[#163300] font-bold' : 'bg-[#e8ebe6] text-[#454745]'}`}
            >
              Evidence Gallery
            </button>
            <button
              onClick={() => { setActiveTab('map'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-left ${activeTab === 'map' ? 'bg-[#9fe870] text-[#163300] font-bold' : 'bg-[#e8ebe6] text-[#454745]'}`}
            >
              Geo Radar
            </button>
            <button
              onClick={() => { onOpenReportModal(); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl text-left bg-[#e8ebe6] text-[#163300]"
            >
              ESG Reports
            </button>
            <button
              onClick={() => { onOpenIngestModal(); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl text-left bg-[#9fe870] text-[#163300] font-bold"
            >
              + Ingest Media
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
