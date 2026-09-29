'use client';

import React from 'react';
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { UploadCloud, CheckCircle2 } from 'lucide-react';

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
  buttonText = 'Upload via Cloudinary Widget'
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl bg-emerald-50/40 hover:bg-emerald-50/80 transition-all text-center">
      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-2 shadow-2xs">
        <UploadCloud className="w-5 h-5" />
      </div>
      <h4 className="text-xs font-bold text-slate-900 mb-1">
        Official Next-Cloudinary Drop-in Widget
      </h4>
      <p className="text-[11px] text-slate-500 mb-3 max-w-sm">
        Direct unsigned/signed field photo upload powered by <code className="bg-white px-1.5 py-0.5 rounded text-emerald-800 font-mono">next-cloudinary</code>.
      </p>

      <CldUploadButton
        uploadPreset="ml_default"
        options={{
          sources: ['local', 'camera', 'url'],
          folder,
          tags,
          resourceType: 'auto',
          maxFiles: 5,
        }}
        onSuccess={onSuccess}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-98 transition-all shadow-sm"
      >
        <UploadCloud className="w-4 h-4" />
        <span>{buttonText}</span>
      </CldUploadButton>
    </div>
  );
};
