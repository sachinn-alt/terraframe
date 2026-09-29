'use client';

import React, { useState } from 'react';
import { ImpactProject, EvidenceAsset } from '@/types';
import { MapPin, Globe2, Compass, Layers, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

interface MapViewProps {
  projects: ImpactProject[];
  evidence: EvidenceAsset[];
  onSelectProject: (projectId: string) => void;
  onInspectAsset: (asset: EvidenceAsset) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  projects,
  evidence,
  onSelectProject,
  onInspectAsset
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const activeProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const projectAssets = evidence.filter(e => e.projectId === activeProject?.id);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm mb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-sky-600" />
              Global Geospatial Evidence Radar
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Geolocated Project Sites & Field Nodes
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time GPS pinpoints verified by camera EXIF and Cloudinary media hashes.
          </p>
        </div>

        {/* Project Quick Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {projects.map((proj) => (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeProject?.id === proj.id
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <MapPin className="w-3 h-3" />
              <span>{proj.country}: {proj.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map Visualizer Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Map Canvas (8 cols) */}
        <div className="lg:col-span-8 bg-slate-50 rounded-2xl border border-slate-200 p-6 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
          {/* Subtle World Map Silhouette SVG */}
          <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
            <svg viewBox="0 0 1000 500" className="w-full h-full fill-slate-500">
              <path d="M150,150 Q200,80 350,120 T600,100 T850,180 T900,320 T600,420 T300,380 T150,150 Z" />
              <path d="M400,200 Q450,150 550,180 T650,280 T500,320 T400,200 Z" />
            </svg>
          </div>

          {/* Interactive Project Pins Plotted */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {projects.map((proj) => {
              const isSelected = proj.id === activeProject?.id;
              const count = evidence.filter(e => e.projectId === proj.id).length;
              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProjectId(proj.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-100'
                      : 'bg-white/90 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-emerald-600 animate-ping' : 'bg-slate-400'}`}></span>
                      {proj.country}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                      {count} Evidence Assets
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800 line-clamp-1">{proj.name}</h4>
                  <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500 font-mono">
                    <span>{proj.coordinates[0].toFixed(4)}°, {proj.coordinates[1].toFixed(4)}°</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-medium">{proj.category}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Overlay Stats */}
          <div className="relative z-10 mt-6 pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-600 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>All GPS telemetry mathematically validated against official site bounds.</span>
            </div>
            <button
              onClick={() => onSelectProject(activeProject.id)}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Filter Gallery to {activeProject.name.split(' ')[0]}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Selected Project Evidence Mini-Feed (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900">Active Site Telemetry</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                SDG {activeProject.primarySdg}
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">{activeProject.name}</h3>
            <p className="text-xs text-slate-600 mt-1 line-clamp-3 leading-relaxed">
              {activeProject.description}
            </p>

            <div className="mt-3 pt-3 border-t border-slate-200/80 flex justify-between text-xs">
              <span className="text-slate-500">{activeProject.targetMetric.label}:</span>
              <span className="font-bold text-emerald-800">
                {activeProject.targetMetric.current} / {activeProject.targetMetric.target} {activeProject.targetMetric.unit}
              </span>
            </div>
          </div>

          {/* Recent Visual Proofs from this Location */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Recent Verified Visual Assets:
            </h4>
            <div className="space-y-2">
              {projectAssets.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onInspectAsset(item)}
                  className="flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-2xs cursor-pointer transition-all"
                >
                  <img
                    src={item.cloudinary.thumbnailUrl}
                    alt={item.title}
                    className="w-14 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-semibold text-slate-900 truncate">{item.title}</h5>
                    <p className="text-[11px] text-slate-500 truncate">{item.telemetry.gps.locationName}</p>
                    <span className="text-[10px] font-mono text-emerald-700 font-medium">
                      {item.milestoneType === 'baseline' ? 'Baseline' : 'Milestone'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
