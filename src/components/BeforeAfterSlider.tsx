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
  Info
} from 'lucide-react';

interface BeforeAfterSliderProps {
  comparisons: ComparisonPair[];
  selectedPairId?: string;
  onSelectPair?: (pairId: string) => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  comparisons,
  selectedPairId,
  onSelectPair
}) => {
  const [activeId, setActiveId] = useState<string>(selectedPairId || comparisons[0]?.id || '');
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const [isWatermarked, setIsWatermarked] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activePair = comparisons.find(c => c.id === activeId) || comparisons[0];

  const handleSelect = (id: string) => {
    setActiveId(id);
    if (onSelectPair) onSelectPair(id);
    setSliderPosition(50);
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
    return <div className="p-8 text-center text-slate-500">No comparison pairs available.</div>;
  }

  const baselineUrl = isWatermarked 
    ? activePair.baselineAsset.cloudinary.watermarkedUrl 
    : activePair.baselineAsset.cloudinary.secureUrl;

  const milestoneUrl = isWatermarked 
    ? activePair.milestoneAsset.cloudinary.watermarkedUrl 
    : activePair.milestoneAsset.cloudinary.secureUrl;

  return (
    <div className="bg-white border border-[#e8ebe6] rounded-[10px] sm:rounded-[28px] p-6 sm:p-8 shadow-xs mb-10">
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

      {/* Main Interactive Slider Box */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-2 font-medium">
            <span className="text-[#6a6c6a]">Comparing:</span>
            <span className="bg-[#e8ebe6] text-[#163300] px-2.5 py-0.5 rounded-full font-mono text-xs font-semibold">
              Baseline ({new Date(activePair.baselineAsset.telemetry.capturedAt).toLocaleDateString()})
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#868685]" />
            <span className="bg-[#9fe870] text-[#163300] px-2.5 py-0.5 rounded-full font-mono text-xs font-bold">
              Milestone ({new Date(activePair.milestoneAsset.telemetry.capturedAt).toLocaleDateString()})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer text-[#454745] select-none text-xs font-medium">
              <input
                type="checkbox"
                checked={isWatermarked}
                onChange={(e) => setIsWatermarked(e.target.checked)}
                className="rounded-[4px] accent-[#163300] cursor-pointer"
              />
              <span>Cryptographic Proof Overlay</span>
            </label>
            <button
              onClick={() => setSliderPosition(50)}
              className="text-[#6a6c6a] hover:text-[#163300] p-1 rounded-full hover:bg-[#e8ebe6] transition-colors cursor-pointer"
              title="Reset Slider to 50%"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Visual Slider Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] max-h-[520px] rounded-[10px] overflow-hidden border border-[#e8ebe6] bg-[#e8ebe6] select-none cursor-ew-resize shadow-inner group"
        >
          {/* Layer 1: "After" / Milestone Image (Full Width Underneath) */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${milestoneUrl})` }}
          >
            {/* Top Right "After" Badge */}
            <div className="absolute top-4 right-4 bg-[#163300]/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#9fe870]" />
              <span>Milestone Achieved</span>
              <span className="bg-[#9fe870] text-[#163300] px-2 py-0.5 rounded-full text-[10px] font-mono font-bold">
                {activePair.quantifiedImpact.milestoneValue} {activePair.quantifiedImpact.unit}
              </span>
            </div>
          </div>

          {/* Layer 2: "Before" / Baseline Image (Clipped by Slider Position) */}
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
              {/* Top Left "Before" Badge */}
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
            {/* Circular Handle Button */}
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

        {/* Range Input Slider Scrubber for Accessible / Keyboard Interaction */}
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
