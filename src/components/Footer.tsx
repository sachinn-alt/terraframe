'use client';

import React, { useState } from 'react';
import { ActiveTab } from './Header';
import { Leaf, Check, ArrowRight } from 'lucide-react';

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
    <footer className="relative bg-[#0C0D0F] text-slate-300 py-8 sm:py-10 border-t border-slate-800 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Status Column (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-sm">
                <Leaf className="w-4 h-4 fill-black text-black" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Terraframe AI
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-medium">
                ● Live
              </span>
            </div>
            
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Decentralized impact & sustainability media registry. Cryptographic SHA-256 field provenance, dynamic Cloudinary optimization, and automated ESG auditing.
            </p>

            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              <span className="text-slate-400">Cloudinary Pipeline Active</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Gemini Vision 2.0</span>
            </div>
          </div>

          {/* Navigation Links Column (3 cols) */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
              Platform
            </h4>
            <div className="grid grid-cols-1 gap-1.5 text-xs text-slate-400">
              <button
                onClick={() => onNavigateTab?.('overview')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Overview
              </button>
              <button
                onClick={() => onNavigateTab?.('before-after')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Before / After Studio
              </button>
              <button
                onClick={() => onNavigateTab?.('gallery')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Evidence Gallery
              </button>
              <button
                onClick={() => onNavigateTab?.('map')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Geospatial Radar
              </button>
              <button
                onClick={() => onOpenReportModal?.()}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                ESG Impact Audit
              </button>
            </div>
          </div>

          {/* Quick Newsletter Subscribe (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
              Field Intelligence
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive verified project telemetry and audit summaries directly to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 rounded-lg bg-[#181A1F] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-600 transition-colors"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-lg bg-white hover:bg-slate-100 text-black text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Joined</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-3 h-3" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Standards */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div className="flex items-center gap-2">
            <span>© 2026 Terraframe Foundation.</span>
            <span>·</span>
            <span>Verified visual proof standards.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#legal" className="hover:text-white transition-colors">Legal Terms</a>
            <a 
              href="mailto:contact@terraframe.org" 
              className="hover:text-white transition-colors font-mono text-[11px]"
            >
              contact@terraframe.org
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
