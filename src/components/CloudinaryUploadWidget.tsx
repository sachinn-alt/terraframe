'use client';

import React, { useState } from 'react';
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { UploadCloud, Settings2, Sparkles } from 'lucide-react';

interface CloudinaryUploadWidgetProps {
  onSuccess: (result: CloudinaryUploadWidgetResults) => void;
  folder?: string;
  tags?: string[];
  buttonText?: string;
}

export const CloudinaryUploadWidget: React.FC<CloudinaryUploadWidgetProps> = ({
  onSuccess,
  folder = 'terraframe/field-evidence',
  tags = ['terraframe', 'environmental-evidence'],
  buttonText = 'Launch Cloudinary Upload Widget'
}) => {
  const [preset, setPreset] = useState('ml_default');
  const [showConfig, setShowConfig] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl bg-emerald-50/40 hover:bg-emerald-50/70 transition-all text-center">
      <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-2 shadow-2xs">
        <UploadCloud className="w-5 h-5" />
      </div>
      <div className="flex items-center gap-1.5 mb-1">
        <h4 className="text-xs font-bold text-slate-900">
          Official Next-Cloudinary Dynamic Widget
        </h4>
        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
          next-cloudinary v6
        </span>
      </div>
      <p className="text-[11px] text-slate-500 mb-3 max-w-sm">
        Direct unsigned/signed field photo upload powered by <code className="bg-white px-1.5 py-0.5 rounded text-emerald-800 font-mono">CldUploadButton</code> with auto-tagging and dynamic folder routing.
      </p>

      {/* Preset Customizer Toggle */}
      <div className="w-full max-w-xs mb-3">
        <button
          type="button"
          onClick={() => setShowConfig(!showConfig)}
          className="text-[11px] text-slate-500 hover:text-emerald-700 flex items-center justify-center gap-1 mx-auto transition-colors"
        >
          <Settings2 className="w-3.5 h-3.5" />
          <span>{showConfig ? 'Hide Preset Options' : 'Configure Upload Preset'}</span>
        </button>

        {showConfig && (
          <div className="mt-2 p-2.5 rounded-xl bg-white border border-slate-200 text-left shadow-2xs animate-in fade-in duration-150">
            <label className="text-[10px] font-semibold text-slate-600 block mb-1">
              Cloudinary Upload Preset (Unsigned):
            </label>
            <input
              type="text"
              value={preset}
              onChange={(e) => setPreset(e.target.value)}
              placeholder="e.g. ml_default, terraframe_uploads"
              className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500 font-mono"
            />
            <p className="text-[9px] text-slate-400 mt-1 leading-tight">
              Default is <code className="font-mono text-slate-600">ml_default</code>. Enter your Cloudinary unsigned preset name if configured.
            </p>
          </div>
        )}
      </div>

      <CldUploadButton
        uploadPreset={preset.trim() || 'ml_default'}
        options={{
          sources: ['local', 'camera', 'url'],
          folder,
          tags,
          resourceType: 'auto',
          maxFiles: 5,
        }}
        onSuccess={onSuccess}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-98 transition-all shadow-sm cursor-pointer"
      >
        <Sparkles className="w-4 h-4" />
        <span>{buttonText}</span>
      </CldUploadButton>
    </div>
  );
};
