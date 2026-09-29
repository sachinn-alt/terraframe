'use client';

import React, { useState } from 'react';
import { ActiveTab } from './Header';
import { Leaf, ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigateTab?: (tab: ActiveTab) => void;
  onOpenIngestModal?: () => void;
  onOpenReportModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onOpenIngestModal,
  onOpenReportModal
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="w-full bg-[#163300] text-white py-12 sm:py-16 selection:bg-[#9fe870] selection:text-[#163300]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Mission Column (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#9fe870] text-[#163300] flex items-center justify-center shadow-xs">
                <Leaf className="w-4.5 h-4.5 fill-[#163300]" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight font-sans">
                Terraframe
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#e2f6d5] text-[#163300]">
                Verified
              </span>
            </div>
            
            <p className="text-sm text-[#e8ebe6]/80 max-w-sm leading-relaxed">
              Decentralized impact & sustainability media registry. Cryptographic SHA-256 field provenance, dynamic Cloudinary optimization, and automated ESG auditing.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#9fe870]">
              <span className="w-2 h-2 rounded-full bg-[#9fe870] inline-block animate-pulse"></span>
              <span>Cloudinary Pipeline Active</span>
              <span className="text-[#e8ebe6]/40">·</span>
              <span className="text-[#e8ebe6]/80">Gemini Vision 2.0</span>
            </div>
          </div>

          {/* Navigation Links Column (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#9fe870]">
              Platform
            </h4>
            <div className="grid grid-cols-1 gap-2 text-sm text-[#e8ebe6]/90">
              <button
                onClick={() => onNavigateTab?.('overview')}
                className="text-left hover:text-[#9fe870] transition-colors cursor-pointer"
              >
                Overview
              </button>
              <button
                onClick={() => onNavigateTab?.('before-after')}
                className="text-left hover:text-[#9fe870] transition-colors cursor-pointer"
              >
                Before / After Studio
              </button>
              <button
                onClick={() => onNavigateTab?.('gallery')}
                className="text-left hover:text-[#9fe870] transition-colors cursor-pointer"
              >
                Evidence Gallery
              </button>
              <button
                onClick={() => onNavigateTab?.('map')}
                className="text-left hover:text-[#9fe870] transition-colors cursor-pointer"
              >
                Geospatial Radar
              </button>
              <button
                onClick={() => onOpenReportModal?.()}
                className="text-left hover:text-[#9fe870] transition-colors cursor-pointer"
              >
                ESG Impact Audit
              </button>
            </div>
          </div>

          {/* Field Intelligence Subscribe (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#9fe870]">
              Field Intelligence
            </h4>
            <p className="text-xs text-[#e8ebe6]/80 leading-relaxed">
              Receive verified project telemetry and audit summaries directly to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-3.5 py-2.5 rounded-[10px] bg-white text-[#163300] placeholder-[#868685] text-xs font-medium focus:outline-none transition-colors border border-transparent focus:border-[#9fe870]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-full bg-[#9fe870] hover:bg-[#b4f18f] text-[#163300] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#163300]" />
                    <span>Joined</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Standards */}
        <div className="mt-12 pt-6 border-t border-[#054d28] flex flex-col sm:flex-row items-center justify-between text-xs text-[#e8ebe6]/70 gap-3">
          <div className="flex items-center gap-2">
            <span>© 2026 Terraframe Foundation.</span>
            <span>·</span>
            <span>Verified visual proof standards.</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#legal" className="hover:text-white transition-colors">Legal Terms</a>
            <a 
              href="mailto:contact@terraframe.org" 
              className="text-[#9fe870] hover:underline"
            >
              contact@terraframe.org
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
