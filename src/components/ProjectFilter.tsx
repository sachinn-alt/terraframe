'use client';

import React from 'react';
import { ProjectCategory, MilestoneType } from '@/types';
import { Search, Filter, Sparkles, X } from 'lucide-react';

interface ProjectFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedMilestone: string;
  setSelectedMilestone: (milestone: string) => void;
  selectedSdg: number | 'all';
  setSelectedSdg: (sdg: number | 'all') => void;
}

const CATEGORIES: { label: string; value: string }[] = [
  { label: 'All Domains', value: 'all' },
  { label: 'Reforestation', value: 'Reforestation' },
  { label: 'Ocean & Marine', value: 'Ocean & Marine' },
  { label: 'Renewable Energy', value: 'Renewable Energy' },
  { label: 'Waste & Water', value: 'Waste & Clean Water' },
];

const SUGGESTED_QUERIES = [
  'Mangrove canopy restoration',
  'Bifacial solar tracking',
  'Acropora coral nursery',
  'River plastic interceptor'
];

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedMilestone,
  setSelectedMilestone,
  selectedSdg,
  setSelectedSdg
}) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs mb-6">
      {/* Top Search Bar & Suggestions */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="AI Semantic Search: 'mangrove roots in Gosaba' or '19.4 MW solar panels'..."
            className="w-full pl-10 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Milestone Selector */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <span className="text-xs text-slate-500 font-medium hidden md:inline">Phase:</span>
          <select
            value={selectedMilestone}
            onChange={(e) => setSelectedMilestone(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="all">All Phases</option>
            <option value="baseline">Baseline (Before)</option>
            <option value="milestone_achieved">Milestone (After)</option>
          </select>

          {/* SDG Selector */}
          <select
            value={selectedSdg}
            onChange={(e) => setSelectedSdg(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="all">All SDGs</option>
            <option value="6">SDG 6: Clean Water</option>
            <option value="7">SDG 7: Clean Energy</option>
            <option value="13">SDG 13: Climate Action</option>
            <option value="14">SDG 14: Life Below Water</option>
            <option value="15">SDG 15: Life on Land</option>
          </select>
        </div>
      </div>

      {/* Suggested Search Prompts */}
      <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-600 font-medium flex items-center gap-1 shrink-0 text-[11px]">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          AI Prompts:
        </span>
        {SUGGESTED_QUERIES.map((prompt, i) => (
          <button
            key={i}
            onClick={() => setSearchQuery(prompt)}
            className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100/80 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 whitespace-nowrap transition-colors"
          >
            &quot;{prompt}&quot;
          </button>
        ))}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 overflow-x-auto">
        <span className="text-xs text-slate-500 font-semibold mr-1 flex items-center gap-1">
          <Filter className="w-3 h-3 text-slate-400" />
          Domains:
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.value
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};
