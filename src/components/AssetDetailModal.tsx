'use client';

import React, { useState } from 'react';
import { EvidenceAsset } from '@/types';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Camera, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowUpRight,
  Wand2,
  Crop,
  Layers,
  FileCode,
  Lock,
  Play,
  Volume2,
  Palette,
  AlertTriangle,
  Sliders,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { 
  getWatermarkedProof, 
  getHeroBanner, 
  getSquareThumbnail, 
  getAiRestoredAsset, 
  getAiRecoloredAsset, 
  getVideoSquareFade, 
  getVideoAnimatedPreview, 
  getAudioWaveformUrl 
} from '@/lib/cloudinary';

interface AssetDetailModalProps {
  asset: EvidenceAsset | null;
  onClose: () => void;
}

export type TransformVariant = 
  | 'watermark' 
  | 'focalCrop' 
  | 'squareCrop' 
  | 'aiImprove' 
  | 'aiRestore' 
  | 'aiRecolor'
  | 'videoSquareFade'
  | 'animatedPreview'
  | 'audioWaveform'
  | 'custom'
  | 'standard';

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  asset,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'provenance' | 'ai' | 'cloudinary' | 'playground'>('provenance');
  const [transformVariant, setTransformVariant] = useState<TransformVariant>('watermark');
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [simulateTamper, setSimulateTamper] = useState(false);

  // Live Transformation Playground State
  const [customRecolorPrompt, setCustomRecolorPrompt] = useState('canopy');
  const [customRecolorColor, setCustomRecolorColor] = useState('9fe870');
  const [customWatermarkText, setCustomWatermarkText] = useState('TERRAFRAME_VERIFIED');
  const [enableGenRestore, setEnableGenRestore] = useState(true);

  if (!asset) return null;

  const isVideo = asset.cloudinary.resourceType === 'video';

  // Compute live media URL based on variant or playground
  let displayMediaUrl = asset.cloudinary.secureUrl;
  let pipelineDescription = 'Direct high-fidelity original field capture';

  if (transformVariant === 'watermark') {
    displayMediaUrl = asset.cloudinary.watermarkedUrl;
    pipelineDescription = 'l_text:Arial_18_bold:TERRAFRAME... • Cryptographic verified proof overlay';
  } else if (transformVariant === 'focalCrop') {
    displayMediaUrl = asset.cloudinary.smartCroppedUrl;
    pipelineDescription = 'c_fill,ar_16:9,g_auto • AI subject gravity landscape framing';
  } else if (transformVariant === 'squareCrop') {
    displayMediaUrl = getSquareThumbnail(asset.cloudinary.secureUrl);
    pipelineDescription = 'c_fill,ar_1:1,g_auto • Social media / card 1:1 auto-crop';
  } else if (transformVariant === 'aiImprove') {
    displayMediaUrl = getAiRestoredAsset(asset.cloudinary.secureUrl);
    pipelineDescription = 'e_improve,f_auto,q_auto • AI adaptive contrast and lighting restoration';
  } else if (transformVariant === 'aiRestore') {
    displayMediaUrl = getAiRestoredAsset(asset.cloudinary.secureUrl);
    pipelineDescription = 'e_gen_restore,f_auto,q_auto • Generative sensor denoising and artifact repair';
  } else if (transformVariant === 'aiRecolor') {
    displayMediaUrl = getAiRecoloredAsset(asset.cloudinary.secureUrl, customRecolorPrompt, customRecolorColor);
    pipelineDescription = `e_gen_recolor:prompt_${customRecolorPrompt};to-color_${customRecolorColor} • Generative chlorophyll vibrancy recolor`;
  } else if (transformVariant === 'videoSquareFade') {
    displayMediaUrl = getVideoSquareFade(asset.cloudinary.videoStreamUrl || asset.cloudinary.secureUrl);
    pipelineDescription = 'ar_1:1,c_fill,g_auto,e_fade:1000 • Square video crop with subject auto-tracking & 1s fade-in';
  } else if (transformVariant === 'animatedPreview') {
    displayMediaUrl = asset.cloudinary.animatedPreviewUrl || getVideoAnimatedPreview(asset.cloudinary.secureUrl);
    pipelineDescription = 'f_webp,fl_awebp,so_1.0,du_3 • Lightweight animated WebP video scrubbing preview';
  } else if (transformVariant === 'audioWaveform') {
    displayMediaUrl = asset.cloudinary.audioWaveformUrl || getAudioWaveformUrl(asset.cloudinary.secureUrl);
    pipelineDescription = 'fl_waveform,co_rgb:163300,w_800,h_150 • Acoustic soundscape frequency waveform';
  } else if (transformVariant === 'custom') {
    const restorePart = enableGenRestore ? 'e_gen_restore/' : '';
    const recolorPart = `e_gen_recolor:prompt_${encodeURIComponent(customRecolorPrompt)};to-color_${customRecolorColor}/`;
    const wmPart = `l_text:Arial_16_bold:${encodeURIComponent(customWatermarkText)},g_south_east,x_16,y_16,co_rgb:ffffff,b_rgb:163300_90/`;
    displayMediaUrl = asset.cloudinary.secureUrl.replace('/upload/', `/upload/c_fill,ar_16:9,g_auto/${restorePart}${recolorPart}${wmPart}f_auto,q_auto/`);
    pipelineDescription = `Custom Playground Recipe: c_fill,ar_16:9,g_auto / ${restorePart}${recolorPart}${wmPart}`;
  }

  const handleCopyHash = () => {
    navigator.clipboard.writeText(asset.sha256Hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(displayMediaUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#163300]/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white border border-[#e8ebe6] rounded-[10px] sm:rounded-[28px] max-w-5xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[#e8ebe6] flex items-center justify-between bg-[#e8ebe6]/40">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#163300] text-[#9fe870] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#163300]">
                  Verified Field Asset
                </span>
                <span className="text-[11px] font-mono text-[#6a6c6a]">
                  ID: {asset.id}
                </span>
                {isVideo && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#9fe870] text-[#163300]">
                    Video Stream
                  </span>
                )}
              </div>
              <h2 className="text-sm font-bold text-[#0e0f0c] mt-0.5">{asset.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#e8ebe6] hover:bg-[#dfe4dc] text-[#163300] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Left Media & Right Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          {/* Left Column: Visual & Transformation Studio (7 cols) */}
          <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-[#e8ebe6] flex flex-col justify-between bg-white">
            <div>
              {/* Media Preview Box */}
              <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden border border-[#e8ebe6] bg-[#0e0f0c] shadow-inner flex items-center justify-center">
                {isVideo && (transformVariant === 'standard' || transformVariant === 'videoSquareFade') && asset.cloudinary.videoStreamUrl ? (
                  <video
                    src={asset.cloudinary.videoStreamUrl}
                    controls
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={displayMediaUrl}
                    alt={asset.title}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                )}

                {/* Cloudinary Live Transformation Badge */}
                <div className="absolute top-3 left-3 bg-[#163300]/90 backdrop-blur-md text-white text-[11px] px-3 py-1 rounded-full flex items-center gap-1.5 font-mono shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#9fe870] animate-pulse"></span>
                  <span>Pipeline: {transformVariant}</span>
                </div>
              </div>

              {/* Transformation Presets Selector (Pill treatments) */}
              <div className="mt-4 bg-[#e8ebe6] p-3.5 rounded-[10px] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#163300] flex items-center gap-1.5">
                    <Wand2 className="w-3.5 h-3.5 text-[#163300]" />
                    Cloudinary Transformation Studio:
                  </span>
                  <span className="text-[10px] font-mono text-[#163300] bg-[#9fe870] px-2 py-0.5 rounded-full font-bold">
                    URL-Based Pipeline
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setTransformVariant('watermark')}
                    className={`px-3 py-1.5 text-[11px] font-semibold rounded-full text-left transition-all cursor-pointer ${
                      transformVariant === 'watermark'
                        ? 'bg-[#163300] text-[#9fe870] shadow-xs'
                        : 'bg-white text-[#454745] hover:bg-[#dfe4dc]'
                    }`}
                  >
                    Proof Watermark
                  </button>
                  <button
                    onClick={() => setTransformVariant('focalCrop')}
                    className={`px-3 py-1.5 text-[11px] font-semibold rounded-full text-left transition-all cursor-pointer ${
                      transformVariant === 'focalCrop'
                        ? 'bg-[#163300] text-[#9fe870] shadow-xs'
                        : 'bg-white text-[#454745] hover:bg-[#dfe4dc]'
                    }`}
                  >
                    16:9 Smart Focal
                  </button>
                  <button
                    onClick={() => setTransformVariant('squareCrop')}
                    className={`px-3 py-1.5 text-[11px] font-semibold rounded-full text-left transition-all cursor-pointer ${
                      transformVariant === 'squareCrop'
                        ? 'bg-[#163300] text-[#9fe870] shadow-xs'
                        : 'bg-white text-[#454745] hover:bg-[#dfe4dc]'
                    }`}
                  >
                    1:1 Square Crop
                  </button>
                  <button
                    onClick={() => setTransformVariant('aiRecolor')}
                    className={`px-3 py-1.5 text-[11px] font-semibold rounded-full text-left transition-all cursor-pointer ${
                      transformVariant === 'aiRecolor'
                        ? 'bg-[#163300] text-[#9fe870] shadow-xs'
                        : 'bg-white text-[#454745] hover:bg-[#dfe4dc]'
                    }`}
                  >
                    AI Recolor (Canopy)
                  </button>
                  <button
                    onClick={() => setTransformVariant('aiRestore')}
                    className={`px-3 py-1.5 text-[11px] font-semibold rounded-full text-left transition-all cursor-pointer ${
                      transformVariant === 'aiRestore'
                        ? 'bg-[#163300] text-[#9fe870] shadow-xs'
                        : 'bg-white text-[#454745] hover:bg-[#dfe4dc]'
                    }`}
                  >
                    Generative Restore
                  </button>
                  <button
                    onClick={() => setTransformVariant('custom')}
                    className={`px-3 py-1.5 text-[11px] font-semibold rounded-full text-left transition-all cursor-pointer ${
                      transformVariant === 'custom'
                        ? 'bg-[#163300] text-[#9fe870] shadow-xs'
                        : 'bg-white text-[#454745] hover:bg-[#dfe4dc]'
                    }`}
                  >
                    ⚙️ Live Playground
                  </button>
                </div>

                <p className="text-[10px] text-[#6a6c6a] font-mono pt-1">
                  Active params: {pipelineDescription}
                </p>
              </div>
            </div>

            {/* Cloudinary Source URL Actions */}
            <div className="mt-4 pt-3 border-t border-[#e8ebe6] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#6a6c6a] font-mono text-[11px] truncate max-w-xs">
                <span className="font-semibold text-[#163300]">Public ID:</span>
                <span className="truncate">{asset.cloudinary.publicId}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyUrl}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#163300] bg-[#e8ebe6] hover:bg-[#dfe4dc] rounded-full transition-colors cursor-pointer"
                >
                  {copiedUrl ? <Check className="w-3.5 h-3.5 text-[#163300]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUrl ? 'Copied URL!' : 'Copy CDN URL'}</span>
                </button>
                <a
                  href={displayMediaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold text-[#163300] bg-[#9fe870] hover:bg-[#b4f18f] rounded-full transition-colors cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Open Full Asset</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Tabbed Inspector (5 cols) */}
          <div className="lg:col-span-5 p-6 flex flex-col bg-[#ffffff]">
            {/* Inspector Tabs (Wise segmented tab control) */}
            <div className="flex items-center p-1 rounded-full bg-[#e8ebe6] mb-4 gap-1 overflow-x-auto">
              <button
                onClick={() => setActiveTab('provenance')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'provenance'
                    ? 'bg-[#9fe870] text-[#163300] shadow-xs'
                    : 'text-[#454745] hover:text-[#163300]'
                }`}
              >
                Provenance & Tamper
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'ai'
                    ? 'bg-[#9fe870] text-[#163300] shadow-xs'
                    : 'text-[#454745] hover:text-[#163300]'
                }`}
              >
                AI Signals
              </button>
              <button
                onClick={() => setActiveTab('playground')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'playground'
                    ? 'bg-[#9fe870] text-[#163300] shadow-xs'
                    : 'text-[#454745] hover:text-[#163300]'
                }`}
              >
                Recipe Playground
              </button>
              <button
                onClick={() => setActiveTab('cloudinary')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'cloudinary'
                    ? 'bg-[#9fe870] text-[#163300] shadow-xs'
                    : 'text-[#454745] hover:text-[#163300]'
                }`}
              >
                Pipeline Spec
              </button>
            </div>

            {/* Tab 1: Provenance & Anti-Fraud Tamper Testing */}
            {activeTab === 'provenance' && (
              <div className="space-y-4 text-xs">
                {/* Cryptographic Non-repudiation Hash */}
                <div className={`p-3.5 rounded-[10px] border transition-colors ${
                  simulateTamper 
                    ? 'bg-red-50 border-red-300' 
                    : 'bg-[#e8ebe6] border-[#e8ebe6]'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`font-bold flex items-center gap-1 ${
                      simulateTamper ? 'text-red-800' : 'text-[#163300]'
                    }`}>
                      <Lock className="w-3.5 h-3.5" />
                      SHA-256 Fingerprint:
                    </span>
                    <button
                      onClick={handleCopyHash}
                      className="text-[11px] font-semibold text-[#163300] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedHash ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedHash ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <code className={`text-[11px] font-mono break-all p-2 rounded-[6px] border block select-all ${
                    simulateTamper 
                      ? 'bg-red-100/70 border-red-300 text-red-900 line-through' 
                      : 'bg-white border-[#e8ebe6] text-[#0e0f0c]'
                  }`}>
                    {simulateTamper 
                      ? `${asset.sha256Hash.substring(0, 16)}9999_TAMPERED_HASH_FAILURE`
                      : asset.sha256Hash}
                  </code>
                </div>

                {/* Tamper Resilience Simulator Trigger */}
                <div className="p-3 bg-white border border-[#e8ebe6] rounded-[10px] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#163300] flex items-center gap-1.5">
                      <AlertTriangle className={`w-3.5 h-3.5 ${simulateTamper ? 'text-red-600' : 'text-[#868685]'}`} />
                      Anti-Fraud Audit Verification Test:
                    </span>
                    <button
                      onClick={() => setSimulateTamper(!simulateTamper)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        simulateTamper
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-[#163300] text-[#9fe870]'
                      }`}
                    >
                      {simulateTamper ? 'Reset to Verified' : 'Simulate Metadata Tamper'}
                    </button>
                  </div>

                  {simulateTamper ? (
                    <div className="p-2.5 rounded-[8px] bg-red-100/80 border border-red-300 text-red-900 text-[11px] leading-relaxed animate-in fade-in">
                      <strong>🚨 FRAUD ALERT — Verification Mismatch:</strong>
                      <p className="mt-0.5">
                        EXIF coordinate altered by 0.002° or image bits modified post-capture. SHA-256 non-repudiation check failed. Submission rejected by <code>AuditVerificationAgent</code>.
                      </p>
                    </div>
                  ) : (
                    <div className="p-2 rounded-[8px] bg-[#e2f6d5] text-[#163300] text-[11px] font-medium flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#163300]" />
                      <span>Cryptographic verification active. Non-repudiation intact.</span>
                    </div>
                  )}
                </div>

                {/* Geospatial GPS Coordinates */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-[#e8ebe6] rounded-[10px]">
                    <span className="text-[11px] text-[#6a6c6a] block mb-0.5">Latitude:</span>
                    <span className="font-mono font-bold text-[#0e0f0c]">
                      {simulateTamper ? (asset.telemetry.gps.latitude + 0.0042).toFixed(6) : asset.telemetry.gps.latitude.toFixed(6)}° N
                    </span>
                  </div>
                  <div className="p-3 bg-[#e8ebe6] rounded-[10px]">
                    <span className="text-[11px] text-[#6a6c6a] block mb-0.5">Longitude:</span>
                    <span className="font-mono font-bold text-[#0e0f0c]">
                      {asset.telemetry.gps.longitude.toFixed(6)}° E
                    </span>
                  </div>
                </div>

                {/* Elevation & Capture Metadata */}
                <div className="p-3.5 bg-[#e8ebe6] rounded-[10px] space-y-2 text-[#454745]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6a6c6a]">Capture Device:</span>
                    <span className="font-bold text-[#0e0f0c]">
                      {asset.telemetry.device.make} {asset.telemetry.device.model}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6a6c6a]">Focal Length:</span>
                    <span className="font-mono font-semibold text-[#0e0f0c]">
                      {asset.telemetry.device.focalLength || '24mm'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6a6c6a]">Altitude:</span>
                    <span className="font-mono font-semibold text-[#0e0f0c]">
                      {asset.telemetry.gps.altitudeMeters || 12}m MSL
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6a6c6a]">Capture Timestamp:</span>
                    <span className="font-mono text-[#0e0f0c]">
                      {new Date(asset.telemetry.capturedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Multimodal AI Signals */}
            {activeTab === 'ai' && (
              <div className="space-y-4 text-xs">
                {/* UN SDG Alignment */}
                <div className="p-3.5 bg-[#e2f6d5] rounded-[10px]">
                  <span className="text-[11px] font-bold text-[#163300] block mb-1">
                    UN Sustainable Development Goals (SDG):
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {asset.aiAnalysis.sdgGoals.map((sdg) => (
                      <span
                        key={sdg}
                        className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#163300] text-white"
                      >
                        SDG {sdg}
                      </span>
                    ))}
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#9fe870] text-[#163300]">
                      Confidence: {(asset.aiAnalysis.confidenceScore * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* AI Detected Objects */}
                <div className="p-3.5 bg-[#e8ebe6] rounded-[10px] space-y-2">
                  <span className="font-bold text-[#163300] block">
                    Quantified Environmental Objects:
                  </span>
                  <div className="space-y-1.5">
                    {asset.aiAnalysis.detectedObjects.map((obj, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white p-2 rounded-[8px] border border-[#e8ebe6]">
                        <span className="font-semibold text-[#0e0f0c]">{obj.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#163300] bg-[#9fe870] px-2 py-0.5 rounded-full text-[11px]">
                            {obj.count} Units
                          </span>
                          <span className="text-[10px] text-[#6a6c6a] font-mono">
                            {(obj.confidence * 100).toFixed(0)}% conf
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Narrative Synthesis */}
                <div className="p-3.5 bg-[#e8ebe6] rounded-[10px]">
                  <span className="font-bold text-[#163300] block mb-1">
                    Autonomous Scientist Narrative:
                  </span>
                  <p className="text-[#454745] text-xs leading-relaxed italic">
                    "{asset.aiAnalysis.aiNarrative}"
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: Interactive Recipe Playground */}
            {activeTab === 'playground' && (
              <div className="space-y-4 text-xs animate-in fade-in">
                <div className="p-3.5 bg-[#163300] text-white rounded-[10px] space-y-3">
                  <div className="flex items-center justify-between text-[#9fe870] font-bold border-b border-[#054d28] pb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5" />
                      Live Cloudinary Parameter Tuner
                    </span>
                    <span className="text-[10px] bg-[#054d28] text-[#9fe870] px-2 py-0.5 rounded-full">Interactive</span>
                  </div>

                  {/* Recolor Prompt */}
                  <div>
                    <label className="text-[11px] text-[#e8ebe6] block mb-1 font-semibold">
                      AI Recolor Target Prompt (e.g. canopy, water, foliage):
                    </label>
                    <input
                      type="text"
                      value={customRecolorPrompt}
                      onChange={(e) => {
                        setCustomRecolorPrompt(e.target.value);
                        setTransformVariant('custom');
                      }}
                      className="w-full bg-[#054d28] text-white px-2.5 py-1.5 rounded-[8px] border border-[#054d28] focus:border-[#9fe870] outline-none font-mono"
                    />
                  </div>

                  {/* Recolor Hex Color */}
                  <div>
                    <label className="text-[11px] text-[#e8ebe6] block mb-1 font-semibold">
                      Recolor Hex (e.g. 9fe870 for Lime, 059669 for Green, 38bdf8 for Blue):
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full border border-white" style={{ backgroundColor: `#${customRecolorColor}` }} />
                      <input
                        type="text"
                        value={customRecolorColor}
                        onChange={(e) => {
                          setCustomRecolorColor(e.target.value.replace('#', ''));
                          setTransformVariant('custom');
                        }}
                        className="flex-1 bg-[#054d28] text-white px-2.5 py-1.5 rounded-[8px] border border-[#054d28] focus:border-[#9fe870] outline-none font-mono"
                      />
                    </div>
                  </div>

                  {/* Watermark Text */}
                  <div>
                    <label className="text-[11px] text-[#e8ebe6] block mb-1 font-semibold">
                      Custom Provenance Overlay Text:
                    </label>
                    <input
                      type="text"
                      value={customWatermarkText}
                      onChange={(e) => {
                        setCustomWatermarkText(e.target.value);
                        setTransformVariant('custom');
                      }}
                      className="w-full bg-[#054d28] text-white px-2.5 py-1.5 rounded-[8px] border border-[#054d28] focus:border-[#9fe870] outline-none font-mono"
                    />
                  </div>

                  {/* Restore Toggle */}
                  <label className="flex items-center gap-2 cursor-pointer pt-1 select-none">
                    <input
                      type="checkbox"
                      checked={enableGenRestore}
                      onChange={(e) => {
                        setEnableGenRestore(e.target.checked);
                        setTransformVariant('custom');
                      }}
                      className="accent-[#9fe870] cursor-pointer"
                    />
                    <span className="text-[11px] text-[#e8ebe6]">Inject <code>e_gen_restore</code> (AI Sensor Denoising)</span>
                  </label>
                </div>

                {/* Raw URL Preview */}
                <div className="p-3 bg-[#e8ebe6] rounded-[10px]">
                  <span className="font-bold text-[#163300] block mb-1">
                    Generated Dynamic URL:
                  </span>
                  <code className="text-[10px] text-[#163300] break-all bg-white p-2 rounded-[6px] border border-[#e8ebe6] block font-mono">
                    {displayMediaUrl}
                  </code>
                </div>
              </div>
            )}

            {/* Tab 4: Media Pipeline Spec */}
            {activeTab === 'cloudinary' && (
              <div className="space-y-4 text-xs font-mono">
                <div className="p-3.5 bg-[#163300] text-[#e8ebe6] rounded-[10px] space-y-2">
                  <div className="flex items-center justify-between text-[#9fe870] font-bold border-b border-[#054d28] pb-1.5">
                    <span>Cloudinary Pipeline Architecture:</span>
                    <span className="text-[10px] bg-[#054d28] text-[#9fe870] px-2 py-0.5 rounded-full">v2.11 API</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-[#e8ebe6]/90">
                    <p><span className="text-[#868685]">Cloud Name:</span> {asset.cloudinary.cloudName}</p>
                    <p><span className="text-[#868685]">Format Delivery:</span> f_auto (WebP / AVIF)</p>
                    <p><span className="text-[#868685]">Quality Mode:</span> q_auto:eco</p>
                    <p><span className="text-[#868685]">Original Dimensions:</span> {asset.cloudinary.width} × {asset.cloudinary.height}</p>
                    <p><span className="text-[#868685]">Binary Size:</span> {(asset.cloudinary.bytes / 1024 / 1024).toFixed(2)} MB</p>
                    <p><span className="text-[#868685]">Modality:</span> {asset.cloudinary.resourceType.toUpperCase()}</p>
                    {asset.cloudinary.audioTrackDetected && (
                      <p><span className="text-[#9fe870]">Audio Track:</span> Detected (fl_waveform enabled)</p>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-[#e8ebe6] rounded-[10px] space-y-1">
                  <span className="text-[11px] font-bold text-[#163300] block">
                    Active URL Transformation Recipe:
                  </span>
                  <code className="text-[10px] text-[#163300] break-all bg-white p-2 rounded-[6px] border border-[#e8ebe6] block">
                    {displayMediaUrl}
                  </code>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
