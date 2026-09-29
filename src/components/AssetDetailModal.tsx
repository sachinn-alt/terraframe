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
  Palette
} from 'lucide-react';
import { 
  getWatermarkedProof, 
  getHeroBanner, 
  getSquareThumbnail,
  getAiRestoredAsset,
  getAiRecoloredAsset,
  getAiIsolatedSubject,
  getVideoSquareFade,
  getVideoWatermarked,
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
  | 'standard';

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  asset,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'provenance' | 'ai' | 'cloudinary'>('provenance');
  const [transformVariant, setTransformVariant] = useState<TransformVariant>('watermark');
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!asset) return null;

  const isVideo = asset.cloudinary.resourceType === 'video';
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
    displayMediaUrl = getAiRecoloredAsset(asset.cloudinary.secureUrl, 'canopy', '059669');
    pipelineDescription = 'e_gen_recolor:prompt_canopy;to-color_059669 • Generative canopy chlorophyll vibrancy recolor';
  } else if (transformVariant === 'videoSquareFade') {
    displayMediaUrl = getVideoSquareFade(asset.cloudinary.videoStreamUrl || asset.cloudinary.secureUrl);
    pipelineDescription = 'ar_1:1,c_fill,g_auto,e_fade:1000 • Square video crop with subject auto-tracking & 1s fade-in';
  } else if (transformVariant === 'animatedPreview') {
    displayMediaUrl = asset.cloudinary.animatedPreviewUrl || getVideoAnimatedPreview(asset.cloudinary.secureUrl);
    pipelineDescription = 'f_webp,fl_awebp,so_1.0,du_3 • Lightweight animated WebP video scrubbing preview';
  } else if (transformVariant === 'audioWaveform') {
    displayMediaUrl = asset.cloudinary.audioWaveformUrl || getAudioWaveformUrl(asset.cloudinary.secureUrl);
    pipelineDescription = 'fl_waveform,co_rgb:059669,w_800,h_150 • Acoustic soundscape frequency waveform';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white border border-slate-200 rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">{asset.projectName}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                  {asset.status === 'verified' ? 'Cryptographically Verified Proof' : 'Under Review'}
                </span>
                {isVideo && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-emerald-300 font-semibold">
                    Video Stream
                  </span>
                )}
              </div>
              <h2 className="text-sm font-semibold text-slate-700 mt-0.5">{asset.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Left Media & Right Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          {/* Left Column: Visual & Transformation Studio (7 cols) */}
          <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between bg-slate-50/40">
            <div>
              {/* Media Preview Box */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-inner flex items-center justify-center">
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
                <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-[11px] px-3 py-1 rounded-lg flex items-center gap-1.5 font-mono shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Pipeline: {transformVariant}</span>
                </div>
              </div>

              {/* Transformation Presets Selector */}
              <div className="mt-4 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 flex items-center gap-1">
                    <Wand2 className="w-3.5 h-3.5 text-emerald-600" />
                    Cloudinary Transformation Studio:
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                    URL-Based Pipeline
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setTransformVariant('watermark')}
                    className={`px-2 py-1.5 text-[11px] font-medium rounded-lg text-left transition-all cursor-pointer ${
                      transformVariant === 'watermark'
                        ? 'bg-emerald-600 text-white shadow-2xs font-semibold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Proof Watermark
                  </button>
                  <button
                    onClick={() => setTransformVariant('focalCrop')}
                    className={`px-2 py-1.5 text-[11px] font-medium rounded-lg text-left transition-all cursor-pointer ${
                      transformVariant === 'focalCrop'
                        ? 'bg-emerald-600 text-white shadow-2xs font-semibold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    16:9 Smart Focal
                  </button>
                  <button
                    onClick={() => setTransformVariant('squareCrop')}
                    className={`px-2 py-1.5 text-[11px] font-medium rounded-lg text-left transition-all cursor-pointer ${
                      transformVariant === 'squareCrop'
                        ? 'bg-emerald-600 text-white shadow-2xs font-semibold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    1:1 Square Crop
                  </button>
                  <button
                    onClick={() => setTransformVariant('aiRecolor')}
                    className={`px-2 py-1.5 text-[11px] font-medium rounded-lg text-left transition-all cursor-pointer ${
                      transformVariant === 'aiRecolor'
                        ? 'bg-emerald-600 text-white shadow-2xs font-semibold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    AI Recolor (Canopy)
                  </button>
                  <button
                    onClick={() => setTransformVariant('aiRestore')}
                    className={`px-2 py-1.5 text-[11px] font-medium rounded-lg text-left transition-all cursor-pointer ${
                      transformVariant === 'aiRestore'
                        ? 'bg-emerald-600 text-white shadow-2xs font-semibold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Generative Restore
                  </button>
                  {isVideo ? (
                    <button
                      onClick={() => setTransformVariant('videoSquareFade')}
                      className={`px-2 py-1.5 text-[11px] font-medium rounded-lg text-left transition-all cursor-pointer ${
                        transformVariant === 'videoSquareFade'
                          ? 'bg-emerald-600 text-white shadow-2xs font-semibold'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Square Video Fade
                    </button>
                  ) : (
                    <button
                      onClick={() => setTransformVariant('aiImprove')}
                      className={`px-2 py-1.5 text-[11px] font-medium rounded-lg text-left transition-all cursor-pointer ${
                        transformVariant === 'aiImprove'
                          ? 'bg-emerald-600 text-white shadow-2xs font-semibold'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      AI Auto-Improve
                    </button>
                  )}
                  {asset.cloudinary.audioTrackDetected && (
                    <button
                      onClick={() => setTransformVariant('audioWaveform')}
                      className={`px-2 py-1.5 text-[11px] font-medium rounded-lg text-left transition-all cursor-pointer col-span-2 sm:col-span-1 ${
                        transformVariant === 'audioWaveform'
                          ? 'bg-emerald-600 text-white shadow-2xs font-semibold'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Bio-Acoustic Waveform
                    </button>
                  )}
                </div>

                <p className="text-[10px] text-slate-500 font-mono pt-1">
                  Active params: {pipelineDescription}
                </p>
              </div>
            </div>

            {/* Cloudinary Source URL Actions */}
            <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-600 font-mono text-[11px] truncate max-w-xs">
                <span className="font-semibold text-slate-800">Public ID:</span>
                <span className="truncate">{asset.cloudinary.publicId}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyUrl}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer"
                >
                  {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUrl ? 'Copied URL!' : 'Copy CDN URL'}</span>
                </button>
                <a
                  href={displayMediaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Open Full Asset</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Tabbed Inspector (5 cols) */}
          <div className="lg:col-span-5 p-6 flex flex-col">
            {/* Inspector Tabs */}
            <div className="flex items-center border-b border-slate-200 pb-2 mb-4 gap-2">
              <button
                onClick={() => setActiveTab('provenance')}
                className={`pb-2 text-xs font-semibold transition-colors relative cursor-pointer ${
                  activeTab === 'provenance'
                    ? 'text-emerald-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Provenance & EXIF
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`pb-2 text-xs font-semibold transition-colors relative cursor-pointer ${
                  activeTab === 'ai'
                    ? 'text-emerald-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Multimodal AI Signals
              </button>
              <button
                onClick={() => setActiveTab('cloudinary')}
                className={`pb-2 text-xs font-semibold transition-colors relative cursor-pointer ${
                  activeTab === 'cloudinary'
                    ? 'text-emerald-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Media Pipeline Spec
              </button>
            </div>

            {/* Tab 1: Provenance & EXIF */}
            {activeTab === 'provenance' && (
              <div className="space-y-4 text-xs">
                {/* Cryptographic Non-repudiation Hash */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-slate-700 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      SHA-256 Non-Repudiation Hash:
                    </span>
                    <button
                      onClick={handleCopyHash}
                      className="text-[11px] font-medium text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedHash ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedHash ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <code className="text-[11px] font-mono text-slate-800 break-all bg-white p-2 rounded-lg border border-slate-200 block select-all">
                    {asset.sha256Hash}
                  </code>
                </div>

                {/* Geospatial GPS Coordinates */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-[11px] text-slate-500 block mb-0.5">Latitude:</span>
                    <span className="font-mono font-semibold text-slate-800">
                      {asset.telemetry.gps.latitude.toFixed(6)}° N
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-[11px] text-slate-500 block mb-0.5">Longitude:</span>
                    <span className="font-mono font-semibold text-slate-800">
                      {asset.telemetry.gps.longitude.toFixed(6)}° E
                    </span>
                  </div>
                </div>

                {/* Elevation & Capture Metadata */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Capture Device:</span>
                    <span className="font-semibold text-slate-800">
                      {asset.telemetry.device.make} {asset.telemetry.device.model}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Optical Focal Length:</span>
                    <span className="font-mono font-semibold text-slate-800">
                      {asset.telemetry.device.focalLength || '24mm'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Field Altitude:</span>
                    <span className="font-mono font-semibold text-slate-800">
                      {asset.telemetry.gps.altitudeMeters || 12}m Above MSL
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Capture Timestamp:</span>
                    <span className="font-mono text-slate-700">
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
                <div className="p-3.5 bg-emerald-50/60 border border-emerald-100 rounded-xl">
                  <span className="text-[11px] font-bold text-emerald-900 block mb-1">
                    UN Sustainable Development Goals (SDG):
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {asset.aiAnalysis.sdgGoals.map((sdg) => (
                      <span
                        key={sdg}
                        className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white text-emerald-800 border border-emerald-200 shadow-2xs"
                      >
                        SDG {sdg}
                      </span>
                    ))}
                    <span className="px-2 py-1 rounded-md text-[11px] font-medium bg-emerald-600 text-white">
                      Confidence: {(asset.aiAnalysis.confidenceScore * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* AI Detected Objects */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <span className="font-semibold text-slate-800 block">
                    Quantified Environmental Objects:
                  </span>
                  <div className="space-y-1.5">
                    {asset.aiAnalysis.detectedObjects.map((obj, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200">
                        <span className="font-medium text-slate-700">{obj.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                            {obj.count} Units
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {(obj.confidence * 100).toFixed(0)}% conf
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Narrative Synthesis */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="font-semibold text-slate-800 block mb-1">
                    Autonomous Scientist Narrative:
                  </span>
                  <p className="text-slate-600 text-xs leading-relaxed italic">
                    "{asset.aiAnalysis.aiNarrative}"
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: Media Pipeline Spec */}
            {activeTab === 'cloudinary' && (
              <div className="space-y-4 text-xs font-mono">
                <div className="p-3.5 bg-slate-900 text-slate-100 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-emerald-400 font-semibold border-b border-slate-800 pb-1.5">
                    <span>Cloudinary Pipeline Config:</span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded">v2.11 API</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-300">
                    <p><span className="text-slate-500">Cloud Name:</span> {asset.cloudinary.cloudName}</p>
                    <p><span className="text-slate-500">Format Delivery:</span> f_auto (WebP / AVIF)</p>
                    <p><span className="text-slate-500">Quality Mode:</span> q_auto:eco</p>
                    <p><span className="text-slate-500">Original Dimensions:</span> {asset.cloudinary.width} × {asset.cloudinary.height}</p>
                    <p><span className="text-slate-500">Binary Size:</span> {(asset.cloudinary.bytes / 1024 / 1024).toFixed(2)} MB</p>
                    <p><span className="text-slate-500">Modality:</span> {asset.cloudinary.resourceType.toUpperCase()}</p>
                    {asset.cloudinary.audioTrackDetected && (
                      <p><span className="text-emerald-400">Audio Track:</span> Detected (fl_waveform enabled)</p>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="text-[11px] font-bold text-slate-700 block">
                    URL Transformation Schema:
                  </span>
                  <code className="text-[10px] text-emerald-800 break-all bg-white p-2 rounded border border-slate-200 block">
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
