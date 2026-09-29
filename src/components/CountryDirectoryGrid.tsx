'use client';

import React from 'react';

interface CountryItem {
  id: string;
  name: string;
  code: string;
  flagUrl: string;
  projectId: string;
  projectName: string;
  category: string;
  assetCount: number;
}

const COUNTRIES: CountryItem[] = [
  {
    id: 'in',
    name: 'India',
    code: 'IN',
    flagUrl: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=120&h=120&q=80',
    projectId: 'proj-sundarbans',
    projectName: 'Sundarbans Mangrove',
    category: 'Reforestation',
    assetCount: 3
  },
  {
    id: 'cl',
    name: 'Chile',
    code: 'CL',
    flagUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=120&h=120&q=80',
    projectId: 'proj-atacama-solar',
    projectName: 'Atacama Solar Microgrid',
    category: 'Renewable Energy',
    assetCount: 2
  },
  {
    id: 'id',
    name: 'Indonesia',
    code: 'ID',
    flagUrl: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=120&h=120&q=80',
    projectId: 'proj-bali-coral',
    projectName: 'Bali Coral Reef Nursery',
    category: 'Ocean & Marine',
    assetCount: 2
  },
  {
    id: 'ke',
    name: 'Kenya',
    code: 'KE',
    flagUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=120&h=120&q=80',
    projectId: 'proj-nairobi-basin',
    projectName: 'Nairobi River Basin',
    category: 'Waste & Clean Water',
    assetCount: 1
  },
  {
    id: 'cr',
    name: 'Costa Rica',
    code: 'CR',
    flagUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=120&h=120&q=80',
    projectId: 'proj-monteverde',
    projectName: 'Monteverde Cloud Canopy',
    category: 'Reforestation',
    assetCount: 1
  }
];

interface CountryDirectoryGridProps {
  selectedCountry: string | null;
  onSelectCountry: (countryName: string | null, category?: string) => void;
}

export const CountryDirectoryGrid: React.FC<CountryDirectoryGridProps> = ({
  selectedCountry,
  onSelectCountry
}) => {
  return (
    <div className="w-full bg-white border border-[#e8ebe6] rounded-[10px] sm:rounded-[28px] p-6 sm:p-8 mb-10 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-[#e8ebe6] mb-6">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#e2f6d5] text-[#163300] inline-block mb-2">
            Global Ecosystem Network
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#0e0f0c] tracking-tight font-sans">
            Active Verified Project Jurisdictions
          </h2>
          <p className="text-xs sm:text-sm text-[#454745] mt-0.5">
            Select a country node to filter field evidence, GPS telemetry, and UN SDG milestone records.
          </p>
        </div>

        {selectedCountry && (
          <button
            onClick={() => onSelectCountry(null)}
            className="self-start sm:self-center px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#163300] bg-[#e8ebe6] hover:bg-[#dfe4dc] transition-colors cursor-pointer"
          >
            Show All Countries
          </button>
        )}
      </div>

      {/* Wise 5-Column Country Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
        {COUNTRIES.map((country) => {
          const isSelected = selectedCountry === country.name;
          return (
            <button
              key={country.id}
              onClick={() => onSelectCountry(isSelected ? null : country.name, country.category)}
              className={`flex flex-col items-center text-center group cursor-pointer p-3 rounded-[10px] transition-all ${
                isSelected 
                  ? 'bg-[#e2f6d5] shadow-xs' 
                  : 'hover:bg-[#e8ebe6]/50'
              }`}
            >
              {/* Circular Flag Thumbnail (56px diameter, 1000px radius) */}
              <div className={`w-14 h-14 rounded-full overflow-hidden mb-3 border-2 transition-transform group-hover:scale-105 shadow-xs ${
                isSelected ? 'border-[#163300] ring-2 ring-[#9fe870]' : 'border-[#e8ebe6]'
              }`}>
                <img
                  src={country.flagUrl}
                  alt={country.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Country Name in Inter 500 at 16px Forest Ink with hover underline */}
              <span className={`text-base font-medium text-[#163300] group-hover:underline transition-all ${
                isSelected ? 'font-bold underline' : ''
              }`}>
                {country.name}
              </span>

              <span className="text-[11px] text-[#868685] mt-1 font-medium">
                {country.projectName}
              </span>

              <span className={`mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isSelected 
                  ? 'bg-[#163300] text-[#9fe870]' 
                  : 'bg-[#e8ebe6] text-[#163300]'
              }`}>
                {country.assetCount} {country.assetCount === 1 ? 'Asset' : 'Assets'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
