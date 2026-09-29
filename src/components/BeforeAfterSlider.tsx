'use client';

import React, { useState, useRef, useCallback } from 'react';
import { ComparisonPair } from '@/types';
import { 
  Sliders, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Maximize2,
  RefreshCw,
  Info,
  Columns,
  Layers,
  Activity
} from 'lucide-react';

interface BeforeAfterSliderProps {
  comparisons: ComparisonPair[];
  selectedPairId?: string;
  onSelectPair?: (pairId: string) => void;
}

export type ComparisonMode = 'slider' | 'sideBySide' | 'dissolve' | 'heatmap';

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  comparisons,
  selectedPairId,
  onSelectPair
}) => {
  const [activeId, setActiveId] = useState<string>(selectedPairId || comparisons[0]?.id || '');
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const [dissolveOpacity, setDissolveOpacity] = useState<number>(50); // 0 (100% baseline) to 100 (100% milestone)
  const [comparisonMode, setComparisonMode] = useState<ComparisonMode>('slider');
  const [isWatermarked, setIsWatermarked] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activePair = comparisons.find(c => c.id === activeId) || comparisons[0];

  const handleSelect = (id: string) => {
    setActiveId(id);
    if (onSelectPair) onSelectPair(id);
    setSliderPosition(50);
    setDissolveOpacity(50);
  };

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  if (!activePair) {
    return <div className="p-8 text-center text-[#868685]">No comparison pairs available.</div>;
  }

  const baselineUrl = isWatermarked 
    ? activePair.baselineAsset.cloudinary.watermarkedUrl 
    : activePair.baselineAsset.cloudinary.secureUrl;

  const milestoneUrl = isWatermarked 
    ? activePair.milestoneAsset.cloudinary.watermarkedUrl 
    : activePair.milestoneAsset.cloudinary.secureUrl;

  return (
    <div className="bg-white border border-[#e8ebe6] rounded-[10px] sm:rounded-[28px] p-6 sm:p-8 shadow-xs mb-10 text-[#454745]">
      {/* Header with Pair Selector Chips */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#e8ebe6]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#e2f6d5] text-[#163300] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#163300]" />
              Cloudinary AI Before/After Studio
            </span>
            <span className="text-xs text-[#6a6c6a] font-mono">
              Temporal Precision: ±{activePair.distanceDeltaMeters}m
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0e0f0c] tracking-tight font-sans">
            {activePair.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#454745] mt-0.5">
            {activePair.projectName} • {activePair.timeDeltaDays} days elapsed between baseline and milestone verification.
          </p>
        </div>

        {/* Project Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {comparisons.map((pair) => (
            <button
              key={pair.id}
              onClick={() => handleSelect(pair.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                activePair.id === pair.id
                  ? 'bg-[#163300] text-white font-bold shadow-xs'
                  : 'bg-[#e8ebe6] text-[#454745] hover:bg-[#dfe4dc] font-semibold'
              }`}
            >
              <span>{pair.projectName.split(' ')[0]}</span>
              <span className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                activePair.id === pair.id ? 'bg-[#9fe870] text-[#163300]' : 'bg-[#d8dcd5] text-[#163300]'
              }`}>
                +{pair.quantifiedImpact.deltaPercentage}%
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Multi-View Mode Switcher Bar (Wise Segmented Tab Control) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-5 pb-3">
        <div className="flex items-center p-1 rounded-full bg-[#e8ebe6] self-start">
          <button
            onClick={() => setComparisonMode('slider')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              comparisonMode === 'slider'
                ? 'bg-[#9fe870] text-[#163300] shadow-xs'
                : 'text-[#454745] hover:text-[#163300]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Split Slider</span>
          </button>

          <button
            onClick={() => setComparisonMode('sideBySide')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              comparisonMode === 'sideBySide'
                ? 'bg-[#9fe870] text-[#163300] shadow-xs'
                : 'text-[#454745] hover:text-[#163300]'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Side-by-Side</span>
          </button>

          <button
            onClick={() => setComparisonMode('dissolve')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              comparisonMode === 'dissolve'
                ? 'bg-[#9fe870] text-[#163300] shadow-xs'
                : 'text-[#454745] hover:text-[#163300]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Opacity Dissolve</span>
          </button>

          <button
            onClick={() => setComparisonMode('heatmap')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              comparisonMode === 'heatmap'
                ? 'bg-[#9fe870] text-[#163300] shadow-xs'
                : 'text-[#454745] hover:text-[#163300]'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Change Heatmap</span>
          </button>
        </div>

        {/* Proof Overlay Checkbox & Reset */}
        <div className="flex items-center gap-3 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer text-[#454745] select-none font-medium">
            <input
              type="checkbox"
              checked={isWatermarked}
              onChange={(e) => setIsWatermarked(e.target.checked)}
              className="rounded-[4px] accent-[#163300] cursor-pointer"
            />
            <span>Cryptographic Proof Overlay</span>
          </label>
          <button
            onClick={() => {
              setSliderPosition(50);
              setDissolveOpacity(50);
            }}
            className="text-[#6a6c6a] hover:text-[#163300] p-1.5 rounded-full hover:bg-[#e8ebe6] transition-colors cursor-pointer"
            title="Reset to 50%"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* VIEWPORT 1: Draggable Split Slider Mode */}
      {comparisonMode === 'slider' && (
        <div className="mt-2">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] max-h-[520px] rounded-[10px] overflow-hidden border border-[#e8ebe6] bg-[#e8ebe6] select-none cursor-ew-resize shadow-inner group"
          >
            {/* Layer 1: Milestone Image */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${milestoneUrl})` }}
            >
              <div className="absolute top-4 right-4 bg-[#163300]/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9fe870]" />
                <span>Milestone Achieved</span>
                <span className="bg-[#9fe870] text-[#163300] px-2 py-0.5 rounded-full text-[10px] font-mono font-bold">
                  {activePair.quantifiedImpact.milestoneValue} {activePair.quantifiedImpact.unit}
                </span>
              </div>
            </div>

            {/* Layer 2: Baseline Image (Clipped) */}
            <div
              className="absolute inset-0 h-full overflow-hidden border-r-2 border-white shadow-xl"
              style={{ width: `${sliderPosition}%` }}
            >
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${baselineUrl})`,
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                }}
              >
                <div className="absolute top-4 left-4 bg-[#0e0f0c]/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#e8ebe6]" />
                  <span>Baseline State</span>
                  <span className="bg-[#454745] text-white px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold">
                    {activePair.quantifiedImpact.baselineValue} {activePair.quantifiedImpact.unit}
                  </span>
                </div>
              </div>
            </div>

            {/* Draggable Divider Handle Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div
                onMouseDown={handleMouseDown}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#9fe870] text-[#163300] border-2 border-white shadow-lg flex items-center justify-center pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform"
              >
                <Sliders className="w-4 h-4 rotate-90" />
              </div>
            </div>

            {/* Bottom Floating Delta Pill */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-[#e8ebe6] shadow-md flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#163300]">
                <span className="w-2 h-2 rounded-full bg-[#163300] animate-ping"></span>
                <span>{activePair.quantifiedImpact.metricName}:</span>
                <span className="text-[#163300] bg-[#9fe870] px-2.5 py-0.5 rounded-full font-mono text-sm font-black">
                  +{activePair.quantifiedImpact.deltaPercentage}%
                </span>
              </div>
              <div className="h-4 w-px bg-[#e8ebe6] hidden sm:block"></div>
              <div className="text-[#6a6c6a] text-[11px] hidden sm:flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#163300]" />
                <span>{activePair.quantifiedImpact.verificationMethod}</span>
              </div>
            </div>
          </div>

          {/* Accessible Scrubber */}
          <div className="mt-3.5 px-1">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="w-full h-2 bg-[#e8ebe6] rounded-full appearance-none cursor-ew-resize accent-[#163300]"
              aria-label="Before and after split slider control"
            />
            <div className="flex justify-between text-[11px] text-[#6a6c6a] mt-1 font-mono font-medium">
              <span>← Slide left to reveal After ({100 - Math.round(sliderPosition)}%)</span>
              <span>Slide right to reveal Before ({Math.round(sliderPosition)}%) →</span>
            </div>
          </div>
        </div>
      )}

      {/* VIEWPORT 2: Side-by-Side Dual Card View */}
      {comparisonMode === 'sideBySide' && (
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
          {/* Baseline Card */}
          <div className="relative aspect-[16/10] rounded-[10px] overflow-hidden border border-[#e8ebe6] bg-[#e8ebe6]">
            <img src={baselineUrl} alt="Baseline State" className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 bg-[#0e0f0c]/90 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#e8ebe6]" />
              <span>Before (Baseline)</span>
            </div>
            <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-[8px] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#0e0f0c]">
                Baseline Metric: {activePair.quantifiedImpact.baselineValue} {activePair.quantifiedImpact.unit}
              </span>
              <span className="text-[11px] text-[#868685] font-mono">
                {new Date(activePair.baselineAsset.telemetry.capturedAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Milestone Card */}
          <div className="relative aspect-[16/10] rounded-[10px] overflow-hidden border border-[#163300]/20 bg-[#e8ebe6]">
            <img src={milestoneUrl} alt="Milestone Achieved" className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 bg-[#163300]/90 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#9fe870]" />
              <span>After (Milestone Achieved)</span>
            </div>
            <div className="absolute bottom-3 left-3 right-3 bg-[#163300] text-white p-2 rounded-[8px] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#9fe870]">
                Milestone Metric: {activePair.quantifiedImpact.milestoneValue} {activePair.quantifiedImpact.unit}
              </span>
              <span className="text-xs font-bold bg-[#9fe870] text-[#163300] px-2 py-0.5 rounded-full">
                +{activePair.quantifiedImpact.deltaPercentage}% Change
              </span>
            </div>
          </div>
        </div>
      )}

      {/* VIEWPORT 3: Opacity Dissolve Fader Mode */}
      {comparisonMode === 'dissolve' && (
        <div className="mt-2 space-y-3 animate-in fade-in duration-200">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] max-h-[520px] rounded-[10px] overflow-hidden border border-[#e8ebe6] bg-[#0e0f0c]">
            {/* Background Layer: Baseline Image */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${baselineUrl})` }}
            />
            {/* Overlay Layer: Milestone Image with Dynamic Opacity */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity"
              style={{ 
                backgroundImage: `url(${milestoneUrl})`,
                opacity: dissolveOpacity / 100 
              }}
            />

            {/* Badges Indicator */}
            <div className="absolute top-4 left-4 bg-[#0e0f0c]/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Morph Blend: {100 - dissolveOpacity}% Baseline · {dissolveOpacity}% Milestone
            </div>

            <div className="absolute bottom-4 right-4 bg-[#163300]/90 text-[#9fe870] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#054d28]">
              +{activePair.quantifiedImpact.deltaPercentage}% Net Delta
            </div>
          </div>

          {/* Dissolve Slider Control */}
          <div className="px-1">
            <input
              type="range"
              min="0"
              max="100"
              value={dissolveOpacity}
              onChange={(e) => setDissolveOpacity(Number(e.target.value))}
              className="w-full h-2 bg-[#e8ebe6] rounded-full appearance-none cursor-ew-resize accent-[#163300]"
            />
            <div className="flex justify-between text-xs text-[#454745] font-semibold mt-1">
              <span>← Baseline State (0%)</span>
              <span className="font-mono text-[#163300] bg-[#e2f6d5] px-2 py-0.5 rounded-full">{dissolveOpacity}% Milestone Blend</span>
              <span>Milestone Achieved (100%) →</span>
            </div>
          </div>
        </div>
      )}

      {/* VIEWPORT 4: Delta Heatmap Simulation */}
      {comparisonMode === 'heatmap' && (
        <div className="mt-2 space-y-3 animate-in fade-in duration-200">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] max-h-[520px] rounded-[10px] overflow-hidden border border-[#e8ebe6] bg-[#0e0f0c]">
            {/* Milestone background */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${milestoneUrl})` }}
            />
            {/* Simulated Edge / Chlorophyll Change Heatmap Overlay in Wise Lime */}
            <div className="absolute inset-0 bg-[#163300]/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-radial from-[#9fe870]/30 via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-4 left-4 bg-[#163300] text-white px-3 py-1.5 rounded-full text-xs font-bold border border-[#9fe870]/50 flex items-center gap-1.5 shadow-md">
              <Activity className="w-3.5 h-3.5 text-[#9fe870]" />
              <span>Cloudinary Delta Heatmap: New Ecological Features</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-[10px] border border-[#e8ebe6] flex flex-wrap items-center justify-between text-xs gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#9fe870] border border-[#163300]"></span>
                <span className="font-bold text-[#163300]">Detected New Canopy / Structural Area</span>
              </div>
              <div className="font-mono font-bold text-[#163300]">
                Calculated Delta: +{activePair.quantifiedImpact.deltaPercentage}% verified gain
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verified Interventions & Narrative Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6 pt-6 border-t border-[#e8ebe6]">
        {/* Story */}
        <div className="md:col-span-2">
          <h3 className="text-xs font-bold text-[#163300] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#163300]" />
            AI Verified Environmental Narrative
          </h3>
          <p className="text-sm text-[#454745] leading-relaxed bg-[#e8ebe6] p-4 rounded-[10px]">
            {activePair.summaryStory}
          </p>
        </div>

        {/* Interventions Checklist */}
        <div>
          <h3 className="text-xs font-bold text-[#163300] uppercase tracking-wider mb-2">
            Verified On-Site Actions
          </h3>
          <ul className="space-y-2 text-xs text-[#454745]">
            {activePair.interventions.map((action, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-[#e8ebe6] p-2.5 rounded-[10px]">
                <CheckCircle2 className="w-4 h-4 text-[#163300] shrink-0 mt-0.5" />
                <span className="font-semibold text-[#163300]">{action}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
