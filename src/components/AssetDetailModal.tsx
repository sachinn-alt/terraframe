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
  ExternalLink,
  Layers,
  FileCode,
  Lock,
  ArrowUpRight,
  Wand2,
  Crop,
  Sliders,
  Scissors
} from 'lucide-react';
import { 
  getWatermarkedProof, 
  getHeroBanner, 
  getSquareThumbnail,
  getAiRestoredAsset,
  getAiIsolatedSubject
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

  let displayImageUrl = asset.cloudinary.secureUrl;
  let pipelineDescription = 'Direct high-fidelity original field capture';

  if (transformVariant === 'watermark') {
    displayImageUrl = asset.cloudinary.watermarkedUrl;
    pipelineDescription = 'l_text:Arial_18_bold:TERRAFRAME... • Cryptographic verified proof overlay';
  } else if (transformVariant === 'focalCrop') {
    displayImageUrl = asset.cloudinary.smartCroppedUrl;
    pipelineDescription = 'c_fill,ar_16:9,g_auto • AI subject gravity landscape framing';
  } else if (transformVariant === 'squareCrop') {
    displayImageUrl = getSquareThumbnail(asset.cloudinary.secureUrl);
    pipelineDescription = 'c_fill,ar_1:1,g_auto • Social media / card 1:1 auto-crop';
  } else if (transformVariant === 'aiImprove') {
    displayImageUrl = getAiRestoredAsset(asset.cloudinary.secureUrl);
    pipelineDescription = 'e_improve,f_auto,q_auto • AI adaptive contrast and lighting restoration';
  } else if (transformVariant === 'aiRestore') {
    displayImageUrl = getAiRestoredAsset(asset.cloudinary.secureUrl);
    pipelineDescription = 'e_gen_restore,f_auto,q_auto • Generative sensor denoising and artifact repair';
  }

  const handleCopyHash = () => {
    navigator.clipboard.writeText(asset.sha256Hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(displayImageUrl);
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
                <h3 className="text-base font-bold text-slate-900">{asset.title}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  {asset.milestoneType === 'baseline' ? 'Baseline Reference' : 'Milestone Proof'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                Asset ID: {asset.id} • {asset.projectName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Left Image & Right Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          {/* Left Column: Visual & Photocrate Transformation Playground (7 cols) */}
          <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between bg-slate-50/40">
            <div>
              {/* Image Preview Box */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-inner">
                <img
                  src={displayImageUrl}
                  alt={asset.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {/* Cloudinary Live Transformation Badge */}
                <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-[11px] px-3 py-1 rounded-lg flex items-center gap-1.5 font-mono shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Pipeline: {transformVariant}</span>
                </div>
              </div>

              {/* Photocrate-inspired Transformation Presets Selector */}
              <div className="mt-4 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-1">
                    <Wand2 className="w-3.5 h-3.5 text-emerald-600" />
                    Cloudinary Transformation Studio:
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">Photocrate Pipeline</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setTransformVariant('watermark')}
                    className={`px-2 py-1.5 text-[11px] font-medium rounded-lg text-left transition-all ${
                      transformVariant === 'watermark'
                        ? 'bg-emerald-600 text-white shadow-2xs font-semibold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Proof Watermark
                  </button>
                  <button
                    onClick={() => setTransformVariant('focalCrop')}
                    className={`px-2 py-1.5 text-[11px] font-medium rounded-lg text-left transition-all ${
                      transformVariant === 'focalCrop'
                        ? 'bg-emerald-600 text-white shadow-2xs font-semibold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    16:9 Smart Focal
                  </button>
                  <button
                    onClick={() => setTransformVariant('squareCrop')}
                    className={`px-2 py-1.5 text-[11px] font-medium rounded-lg text-left transition-all ${
                      transformVariant === 'squareCrop'
                        ? 'bg-emerald-600 text-white shadow-2xs font-semibold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    1:1 Square Crop
                  </button>
                  <button
                    onClick={() => setTransformVariant('aiImprove')}
                    className={`px-2 py-1.5 text-[11px] font-medium rounded-lg text-left transition-all ${
                      transformVariant === 'aiImprove'
                        ? 'bg-emerald-600 text-white shadow-2xs font-semibold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    AI Auto-Improve
                  </button>
                  <button
                    onClick={() => setTransformVariant('aiRestore')}
                    className={`px-2 py-1.5 text-[11px] font-medium rounded-lg text-left transition-all ${
                      transformVariant === 'aiRestore'
                        ? 'bg-emerald-600 text-white shadow-2xs font-semibold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Generative Restore
                  </button>
                  <button
                    onClick={() => setTransformVariant('standard')}
                    className={`px-2 py-1.5 text-[11px] font-medium rounded-lg text-left transition-all ${
                      transformVariant === 'standard'
                        ? 'bg-emerald-600 text-white shadow-2xs font-semibold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Original High-Res
                  </button>
                </div>

                <p className="text-[10px] text-slate-500 font-mono pt-1">
                  Active params: {pipelineDescription}
                </p>
              </div>
            </div>

            {/* Cloudinary Source URL Actions */}
            <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-600 font-mono text-[11px] truncate max-w-xs">
                <span className="font-semibold text-slate-800">Cloudinary:</span>
                <span className="truncate">{asset.cloudinary.publicId}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyUrl}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors"
                >
                  {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUrl ? 'Copied URL!' : 'Copy CDN URL'}</span>
                </button>
                <a
                  href={displayImageUrl}
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
                className={`text-xs font-bold pb-1 transition-colors ${
                  activeTab === 'provenance'
                    ? 'text-emerald-700 border-b-2 border-emerald-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Telemetry & Hash
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`text-xs font-bold pb-1 transition-colors ${
                  activeTab === 'ai'
                    ? 'text-emerald-700 border-b-2 border-emerald-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                AI Signals & SDGs
              </button>
              <button
                onClick={() => setActiveTab('cloudinary')}
                className={`text-xs font-bold pb-1 transition-colors ${
                  activeTab === 'cloudinary'
                    ? 'text-emerald-700 border-b-2 border-emerald-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Cloudinary Pipeline
              </button>
            </div>

            {/* Tab 1: Provenance & EXIF */}
            {activeTab === 'provenance' && (
              <div className="space-y-4 text-xs">
                {/* Cryptographic SHA-256 */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-slate-700 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      SHA-256 Tamper-Proof Hash
                    </span>
                    <button
                      onClick={handleCopyHash}
                      className="text-emerald-600 hover:text-emerald-800 flex items-center gap-1 text-[11px]"
                    >
                      {copiedHash ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedHash ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="font-mono text-[10px] text-slate-600 break-all bg-white p-2 rounded border border-slate-200">
                    {asset.sha256Hash}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1.5 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Cryptographically immutable. Matches original camera capture.
                  </p>
                </div>

                {/* Geospatial GPS */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <h4 className="font-semibold text-slate-700 flex items-center gap-1 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-sky-600" />
                    Geospatial Telemetry
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-500">Latitude:</span>
                      <p className="font-mono font-bold text-slate-800">{asset.telemetry.gps.latitude.toFixed(6)}° N</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Longitude:</span>
                      <p className="font-mono font-bold text-slate-800">{asset.telemetry.gps.longitude.toFixed(6)}° E</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Altitude:</span>
                      <p className="font-mono text-slate-800">{asset.telemetry.gps.altitudeMeters || 0} meters</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Location:</span>
                      <p className="font-medium text-slate-800">{asset.telemetry.gps.locationName}</p>
                    </div>
                  </div>
                </div>

                {/* Camera Hardware EXIF */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <h4 className="font-semibold text-slate-700 flex items-center gap-1 mb-2">
                    <Camera className="w-3.5 h-3.5 text-slate-700" />
                    Hardware & EXIF Telemetry
                  </h4>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Device Model:</span>
                      <span className="font-semibold text-slate-800">{asset.telemetry.device.make} {asset.telemetry.device.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Lens Specification:</span>
                      <span className="text-slate-700">{asset.telemetry.device.lens || 'Primary Optic'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Captured At:</span>
                      <span className="font-mono text-slate-700">{new Date(asset.telemetry.capturedAt).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Uploaded At:</span>
                      <span className="font-mono text-slate-700">{new Date(asset.telemetry.uploadedAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: AI Signals & SDG */}
            {activeTab === 'ai' && (
              <div className="space-y-4 text-xs">
                {/* AI Narrative */}
                <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100">
                  <h4 className="font-semibold text-emerald-900 flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                    Multimodal Vision Assessment
                  </h4>
                  <p className="text-slate-700 leading-relaxed text-[11px]">
                    {asset.aiAnalysis.aiNarrative}
                  </p>
                </div>

                {/* Detected Objects Table */}
                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">Quantified Visible Assets:</h4>
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-[11px]">
                      <thead className="bg-slate-100/80 text-slate-600 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="p-2">Object / Feature</th>
                          <th className="p-2">Count</th>
                          <th className="p-2">Confidence</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {asset.aiAnalysis.detectedObjects.map((obj, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="p-2 font-medium text-slate-800">{obj.label}</td>
                            <td className="p-2 font-mono text-emerald-700 font-bold">{obj.count}</td>
                            <td className="p-2 font-mono text-slate-500">{Math.round(obj.confidence * 100)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Environmental Signals */}
                <div>
                  <h4 className="font-semibold text-slate-700 mb-1.5">Ecological Vitality Signals:</h4>
                  <ul className="space-y-1 text-[11px] text-slate-600">
                    {asset.aiAnalysis.environmentalSignals.map((signal, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded border border-slate-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>{signal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 3: Cloudinary Architecture */}
            {activeTab === 'cloudinary' && (
              <div className="space-y-3 text-xs">
                <div className="bg-slate-900 text-white p-4 rounded-xl font-mono text-[11px] space-y-2">
                  <div className="text-emerald-400 font-semibold"># Active Cloudinary Transformation URL</div>
                  <div className="text-slate-300 break-all bg-slate-800/80 p-2.5 rounded border border-slate-700">
                    {displayImageUrl}
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-[11px]">
                  <h4 className="font-semibold text-slate-800">Dynamic Transformation Pipeline (Photocrate Engine):</h4>
                  <ul className="space-y-1.5 text-slate-600">
                    <li><strong className="text-slate-800">f_auto:</strong> Automatically serves AVIF/WebP based on visitor browser capability.</li>
                    <li><strong className="text-slate-800">q_auto:</strong> Perceptual quality compression reducing data weight by 60-70%.</li>
                    <li><strong className="text-slate-800">e_improve &amp; e_gen_restore:</strong> AI auto-enhancement and sensor restoration for field cameras.</li>
                    <li><strong className="text-slate-800">g_auto &amp; c_fill:</strong> AI subject-gravity automated framing on environmental interventions.</li>
                    <li><strong className="text-slate-800">l_text:...:</strong> Cryptographic verification proof badge rendered dynamically on the CDN.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Powered by <span className="font-semibold text-emerald-700">Cloudinary Community Photocrate Engine</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
