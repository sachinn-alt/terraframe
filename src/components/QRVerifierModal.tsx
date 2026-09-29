'use client';

import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  QrCode, 
  Camera, 
  MapPin, 
  CheckCircle2, 
  Lock, 
  Sparkles,
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { EvidenceAsset } from '@/types';

interface QRVerifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  sampleAsset?: EvidenceAsset;
}

export const QRVerifierModal: React.FC<QRVerifierModalProps> = ({
  isOpen,
  onClose,
  sampleAsset
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(true);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#163300]/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white border border-[#e8ebe6] rounded-[10px] sm:rounded-[28px] max-w-md w-full overflow-hidden shadow-2xl flex flex-col font-sans text-[#454745]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-[#e8ebe6] flex items-center justify-between bg-[#e8ebe6]/40">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[#163300] text-[#9fe870] flex items-center justify-center font-bold">
              <QrCode className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-[#0e0f0c]">Mobile Field Proof Scanner</h3>
              <p className="text-[11px] text-[#6a6c6a]">Terraframe Field Verification Node</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#e8ebe6] hover:bg-[#dfe4dc] text-[#163300] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Viewfinder Graphic / Simulation */}
        <div className="p-6 flex flex-col items-center text-center">
          <div className="relative w-64 h-64 rounded-[16px] bg-[#163300] p-4 flex flex-col items-center justify-center text-white overflow-hidden shadow-inner border border-[#054d28]">
            {/* Viewfinder Corner Brackets */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#9fe870] rounded-tl-sm"></div>
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#9fe870] rounded-tr-sm"></div>
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#9fe870] rounded-bl-sm"></div>
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#9fe870] rounded-br-sm"></div>

            {/* QR Center Graphic */}
            <div className="bg-white p-3 rounded-[10px] flex items-center justify-center shadow-lg">
              <svg className="w-24 h-24" viewBox="0 0 24 24" fill="#163300">
                <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v2h-4v-2zm-4 0h2v4h-2v-4zm4 4h4v2h-4v-2zm-2 2h2v-2h-2v2zm-2-6h2v2h-2v-2zM5 5h2v2H5V5zm12 0h2v2h-2V5zM5 17h2v2H5v-2z"/>
              </svg>
            </div>

            {/* Animated Laser Scanning Line */}
            {isScanning && (
              <div className="absolute left-4 right-4 h-0.5 bg-[#9fe870] shadow-[0_0_8px_#9fe870] animate-bounce top-1/2"></div>
            )}

            <span className="text-[11px] font-mono text-[#9fe870] mt-3 font-semibold">
              {isScanning ? 'Decoding Provenance Token...' : 'Scan Complete: Verified Hash Match'}
            </span>
          </div>

          {/* Verification Result Card */}
          {scanComplete && (
            <div className="w-full mt-4 p-4 rounded-[10px] bg-[#e2f6d5] border border-[#163300]/20 text-left text-xs space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between font-bold text-[#163300]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#163300]" />
                  EXIF & Cloudinary Verified
                </span>
                <span className="bg-[#163300] text-[#9fe870] px-2 py-0.5 rounded-full text-[10px] font-mono">
                  100% MATCH
                </span>
              </div>

              <div className="font-mono text-[11px] text-[#163300] space-y-1 pt-1">
                <p><strong>GPS:</strong> 21.9510° N, 88.9012° E (±0.8m MSL)</p>
                <p><strong>SHA-256:</strong> e7b8...4a91 (Signed on Capture)</p>
                <p><strong>Device:</strong> DJI Mavic 3 Enterprise / Hasselblad</p>
                <p><strong>CDN Overlay:</strong> Dynamic Proof Watermark Active</p>
              </div>
            </div>
          )}

          <div className="w-full mt-4 flex items-center justify-between gap-3">
            <button
              onClick={handleSimulateScan}
              className="flex-1 wise-btn-primary text-xs"
            >
              <span>Scan Next Field Asset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
