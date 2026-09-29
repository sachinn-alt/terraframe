'use client';

import React from 'react';
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
    <div className="bg-white border border-[#e8ebe6] rounded-[10px] p-5 shadow-xs mb-6">
      {/* Top Search Bar & Phase Selectors */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#868685] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="AI Semantic Search: 'mangrove roots in Gosaba' or '19.4 MW solar panels'..."
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#868685]/40 rounded-[10px] text-xs sm:text-sm text-[#0e0f0c] placeholder:text-[#868685] focus:outline-none focus:border-[#163300] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#868685] hover:text-[#0e0f0c] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Milestone & SDG Selectors */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <select
            value={selectedMilestone}
            onChange={(e) => setSelectedMilestone(e.target.value)}
            className="bg-white border border-[#868685]/40 text-xs text-[#163300] font-semibold rounded-[10px] px-3.5 py-2.5 focus:border-[#163300] outline-none cursor-pointer"
          >
            <option value="all">All Phases</option>
            <option value="baseline">Baseline (Before)</option>
            <option value="milestone_achieved">Milestone (After)</option>
          </select>

          <select
            value={selectedSdg}
            onChange={(e) => setSelectedSdg(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="bg-white border border-[#868685]/40 text-xs text-[#163300] font-semibold rounded-[10px] px-3.5 py-2.5 focus:border-[#163300] outline-none cursor-pointer"
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

      {/* Suggested Search Prompts (Linen Mist Pill Badges) */}
      <div className="flex items-center gap-2 mt-3.5 overflow-x-auto pb-1 text-xs">
        <span className="text-[#163300] font-bold flex items-center gap-1 shrink-0 text-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#163300]" />
          Prompts:
        </span>
        {SUGGESTED_QUERIES.map((prompt, i) => (
          <button
            key={i}
            onClick={() => setSearchQuery(prompt)}
            className="px-3 py-1 rounded-full text-xs font-medium bg-[#e8ebe6] hover:bg-[#e2f6d5] hover:text-[#163300] text-[#454745] whitespace-nowrap transition-colors cursor-pointer"
          >
            &quot;{prompt}&quot;
          </button>
        ))}
      </div>

      {/* Category Filter Pills (Wise Segmented Style) */}
      <div className="flex items-center gap-2 mt-3.5 pt-3.5 border-t border-[#e8ebe6] overflow-x-auto">
        <span className="text-xs text-[#6a6c6a] font-bold mr-1 flex items-center gap-1 uppercase tracking-wider">
          <Filter className="w-3 h-3 text-[#6a6c6a]" />
          Domains:
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.value
                ? 'bg-[#9fe870] text-[#163300] shadow-2xs'
                : 'bg-[#e8ebe6] text-[#454745] hover:bg-[#dfe4dc]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};
