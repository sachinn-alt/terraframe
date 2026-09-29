'use client';

import React from 'react';
import { EvidenceAsset } from '@/types';
import { 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  SlidersHorizontal,
  FileSearch,
  Sparkles,
  Camera
} from 'lucide-react';

interface EvidenceCardProps {
  asset: EvidenceAsset;
  onInspect: (asset: EvidenceAsset) => void;
  onCompareWithPair?: (pairId: string) => void;
}

const SDG_COLORS: Record<number, { bg: string; text: string; label: string }> = {
  6: { bg: 'bg-cyan-50 border-cyan-200', text: 'text-cyan-800', label: 'SDG 6 Clean Water' },
  7: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800', label: 'SDG 7 Clean Energy' },
  9: { bg: 'bg-orange-50 border-orange-200', text: 'text-orange-800', label: 'SDG 9 Industry & Infra' },
  11: { bg: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-800', label: 'SDG 11 Sustainable Cities' },
  12: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-800', label: 'SDG 12 Responsible Consumption' },
  13: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-800', label: 'SDG 13 Climate Action' },
  14: { bg: 'bg-sky-50 border-sky-200', text: 'text-sky-800', label: 'SDG 14 Life Below Water' },
  15: { bg: 'bg-green-50 border-green-200', text: 'text-green-800', label: 'SDG 15 Life on Land' },
};

export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  asset,
  onInspect,
  onCompareWithPair
}) => {
  const primarySdg = asset.aiAnalysis.sdgGoals[0] || 13;
  const sdgConfig = SDG_COLORS[primarySdg] || { bg: 'bg-[#e2f6d5] border-[#163300]/20', text: 'text-[#163300]', label: `SDG ${primarySdg}` };

  return (
    <div className="bg-white border border-[#e8ebe6] rounded-[10px] overflow-hidden hover:border-[#163300]/40 transition-all flex flex-col group">
      {/* Thumbnail Container with Cloudinary Responsive Formatting */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e8ebe6]">
        <img
          src={asset.cloudinary.secureUrl}
          alt={asset.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {/* Milestone Tag */}
          <div className="flex items-center gap-1.5">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-tight uppercase pointer-events-auto ${
              asset.milestoneType === 'baseline'
                ? 'bg-[#163300] text-white'
                : 'bg-[#9fe870] text-[#163300]'
            }`}>
              {asset.milestoneType === 'baseline' ? 'Baseline' : 'Milestone'}
            </span>

            {asset.cloudinary.resourceType === 'video' && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#163300] text-[#9fe870] flex items-center gap-1 pointer-events-auto">
                <span>▶ Video</span>
                {asset.cloudinary.durationSeconds && <span>{asset.cloudinary.durationSeconds}s</span>}
              </span>
            )}
          </div>

          {/* SDG Badge */}
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border pointer-events-auto bg-[#e2f6d5] text-[#163300] border-[#163300]/20">
            {sdgConfig.label}
          </span>
        </div>

        {/* Bottom Integrity Bar */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white bg-[#163300]/90 px-2.5 py-1 rounded-[6px]">
          <div className="flex items-center gap-1 font-mono">
            <ShieldCheck className="w-3 h-3 text-[#9fe870]" />
            <span>SHA-256: {asset.sha256Hash.substring(0, 10)}...</span>
          </div>
          <div className="flex items-center gap-1 text-[#e8ebe6]">
            <Camera className="w-3 h-3" />
            <span>{asset.telemetry.device.make}</span>
            {asset.cloudinary.audioTrackDetected && (
              <span className="ml-1 text-[9px] px-1 py-0.2 bg-[#054d28] text-[#9fe870] rounded-full font-mono">
                Audio
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Project & Location */}
          <div className="flex items-center gap-1.5 text-xs text-[#6a6c6a] font-medium mb-1">
            <MapPin className="w-3 h-3 text-[#163300] shrink-0" />
            <span className="truncate">{asset.telemetry.gps.locationName}, {asset.telemetry.gps.country}</span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-[#0e0f0c] line-clamp-1 group-hover:text-[#163300] transition-colors">
            {asset.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-[#454745] mt-1 line-clamp-2 leading-relaxed">
            {asset.description}
          </p>

          {/* AI Detected Objects / Signals */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {asset.aiAnalysis.detectedObjects.slice(0, 2).map((obj, idx) => (
              <span 
                key={idx} 
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#e8ebe6] text-[#163300]"
              >
                <Sparkles className="w-2.5 h-2.5 text-[#163300]" />
                {obj.label} ({obj.count})
              </span>
            ))}
            {asset.aiAnalysis.environmentalSignals[0] && (
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#e2f6d5] text-[#163300] truncate max-w-[190px]">
                {asset.aiAnalysis.environmentalSignals[0]}
              </span>
            )}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-4 pt-3 border-t border-[#e8ebe6] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-[11px] text-[#868685]">
            <Calendar className="w-3 h-3 text-[#868685]" />
            <span>{new Date(asset.telemetry.capturedAt).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {asset.matchedPairId && onCompareWithPair && (
              <button
                onClick={() => onCompareWithPair(asset.projectId)}
                className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#163300] bg-[#9fe870] hover:bg-[#b4f18f] transition-colors flex items-center gap-1 cursor-pointer"
                title="View Before / After Comparison"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Compare</span>
              </button>
            )}

            <button
              onClick={() => onInspect(asset)}
              className="px-3 py-1 rounded-full text-[11px] font-semibold text-[#163300] bg-[#e8ebe6] hover:bg-[#dfe4dc] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <FileSearch className="w-3 h-3 text-[#163300]" />
              <span>Inspect</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
