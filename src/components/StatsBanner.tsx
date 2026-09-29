'use client';

import React from 'react';
import { 
  CheckCircle2, 
  TrendingUp, 
  Globe2, 
  ShieldCheck, 
  Sparkles,
  TreePine
} from 'lucide-react';

interface StatsBannerProps {
  totalAssets: number;
  totalProjects: number;
  totalComparisons: number;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({
  totalAssets,
  totalProjects,
  totalComparisons
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Stat 1 */}
      <div className="bg-[#e8ebe6] rounded-[10px] p-5 transition-all hover:bg-[#dfe4dc] relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6a6c6a]">
            Verified Media
          </span>
          <div className="w-8 h-8 rounded-full bg-white text-[#163300] flex items-center justify-center shadow-xs">
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-[#163300] tracking-tight font-sans">
            {totalAssets}
          </span>
          <span className="text-xs font-bold text-[#163300] bg-[#9fe870] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            100% EXIF
          </span>
        </div>
        <p className="text-xs text-[#454745] mt-2 font-medium leading-relaxed">
          Cryptographically signed field proof via SHA-256 & Cloudinary.
        </p>
      </div>

      {/* Stat 2 */}
      <div className="bg-[#e8ebe6] rounded-[10px] p-5 transition-all hover:bg-[#dfe4dc] relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6a6c6a]">
            Temporal Pairs
          </span>
          <div className="w-8 h-8 rounded-full bg-white text-[#163300] flex items-center justify-center shadow-xs">
            <TrendingUp className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-[#163300] tracking-tight font-sans">
            {totalComparisons}
          </span>
          <span className="text-xs font-bold text-[#163300] bg-[#e2f6d5] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            AI Calibrated
          </span>
        </div>
        <p className="text-xs text-[#454745] mt-2 font-medium leading-relaxed">
          Geolocated baseline & milestone environmental progress.
        </p>
      </div>

      {/* Stat 3 */}
      <div className="bg-[#e8ebe6] rounded-[10px] p-5 transition-all hover:bg-[#dfe4dc] relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6a6c6a]">
            Global Projects
          </span>
          <div className="w-8 h-8 rounded-full bg-white text-[#163300] flex items-center justify-center shadow-xs">
            <Globe2 className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-[#163300] tracking-tight font-sans">
            {totalProjects}
          </span>
          <span className="text-xs font-bold text-[#163300] bg-[#e2f6d5] px-2.5 py-0.5 rounded-full">
            4 Continents
          </span>
        </div>
        <p className="text-xs text-[#454745] mt-2 font-medium leading-relaxed">
          Mangrove restoration, ocean cleanup, solar grids & wetlands.
        </p>
      </div>

      {/* Stat 4 */}
      <div className="bg-[#e8ebe6] rounded-[10px] p-5 transition-all hover:bg-[#dfe4dc] relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6a6c6a]">
            Ecological Delta
          </span>
          <div className="w-8 h-8 rounded-full bg-white text-[#163300] flex items-center justify-center shadow-xs">
            <TreePine className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-[#163300] tracking-tight font-sans">
            +248%
          </span>
          <span className="text-xs font-bold text-[#163300] bg-[#9fe870] px-2.5 py-0.5 rounded-full">
            Biomass Δ
          </span>
        </div>
        <p className="text-xs text-[#454745] mt-2 font-medium leading-relaxed">
          Chlorophyll vitality recovery & clean megawatts energized.
        </p>
      </div>
    </div>
  );
};
