'use client';

import React from 'react';
import { 
  CheckCircle, 
  TrendingUp, 
  Globe2, 
  ShieldCheck, 
  Sparkles,
  TreePine,
  SunMedium
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
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all relative overflow-hidden group">
        <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500 rounded-t-2xl"></div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Verified Field Media</span>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-slate-900">{totalAssets}</span>
          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-0.5">
            <ShieldCheck className="w-3 h-3" />
            100% Provenance
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-2 font-medium">
          EXIF camera metadata & SHA-256 tamper-proof hashed via Cloudinary.
        </p>
      </div>

      {/* Stat 2 */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all relative overflow-hidden group">
        <div className="absolute top-0 left-0 right-0 h-1 bg-sky-500 rounded-t-2xl"></div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Before / After Pairs</span>
          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-slate-900">{totalComparisons}</span>
          <span className="text-xs font-medium text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100 flex items-center gap-0.5">
            <Sparkles className="w-3 h-3" />
            AI Calibrated
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-2 font-medium">
          Temporally paired geolocated baseline & milestone visual progress.
        </p>
      </div>

      {/* Stat 3 */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all relative overflow-hidden group">
        <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500 rounded-t-2xl"></div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Field Projects</span>
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Globe2 className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-slate-900">{totalProjects}</span>
          <span className="text-xs font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
            4 Continents
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-2 font-medium">
          Reforestation, ocean reefs, solar microgrids, and river recovery.
        </p>
      </div>

      {/* Stat 4 */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all relative overflow-hidden group">
        <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600 rounded-t-2xl"></div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Verified Ecological Delta</span>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <TreePine className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-emerald-800">+248%</span>
          <span className="text-xs font-medium text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded-full">
            Avg Growth
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-2 font-medium">
          Segmented visual biomass recovery & clean megawatts energized.
        </p>
      </div>
    </div>
  );
};
