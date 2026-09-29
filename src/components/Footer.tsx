'use client';

import React, { useState } from 'react';
import { ActiveTab } from './Header';
import { ArrowUpRight, Check, Plus, ShieldCheck, Sparkles } from 'lucide-react';

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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setName('');
      setEmail('');
    }, 2500);
  };

  return (
    <footer className="relative bg-[#0C0D0F] text-slate-300 pt-16 pb-8 overflow-hidden border-t border-slate-800 selection:bg-emerald-500 selection:text-black">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-950/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-amber-950/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top 3-Column Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-16">
          {/* Column 1: Newsletter & Live Status (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-sm font-semibold tracking-tight text-white">
              Don't miss out on verified field updates.
            </h3>

            <form onSubmit={handleSubscribe} className="space-y-2 max-w-sm">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#181A1F] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-600 transition-colors"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#181A1F] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-600 transition-colors"
              />

              <div className="flex items-center gap-1.5 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-lg bg-[#EAEAEA] hover:bg-white text-black text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Subscribed</span>
                    </>
                  ) : (
                    <span>Subscribe</span>
                  )}
                </button>
                <button
                  type="submit"
                  aria-label="Submit subscription"
                  className="w-10 h-9.5 rounded-lg bg-[#EAEAEA] hover:bg-white text-black flex items-center justify-center transition-all cursor-pointer active:scale-98"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[10px] text-slate-500 pt-0.5">
                Unsubscribe anytime.
              </p>
            </form>

            {/* Monospace Status Indicators (Good Fella style) */}
            <div className="pt-4 space-y-1.5 font-mono text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#E07A5F] rounded-2xs inline-block animate-pulse"></span>
                <span className="tracking-wider uppercase text-slate-300">
                  ACCEPTING PROJECTS. JOIN THE REGISTRY.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#E07A5F] rounded-2xs inline-block"></span>
                <span className="tracking-wider uppercase text-slate-400">
                  ONLY 3 SITE AUDIT SLOTS LEFT
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-2xs inline-block"></span>
                <span className="tracking-wider uppercase text-emerald-400/90">
                  CLOUDINARY PIPELINE ACTIVE (F_AUTO, Q_AUTO)
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Minimalist Navigation (3 cols) */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs uppercase tracking-widest">
            <button
              onClick={() => onNavigateTab?.('overview')}
              className="block text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Overview
            </button>
            <button
              onClick={() => onNavigateTab?.('gallery')}
              className="block text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Evidence Gallery
            </button>
            <button
              onClick={() => onNavigateTab?.('before-after')}
              className="block text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Before / After Studio
            </button>
            <button
              onClick={() => onNavigateTab?.('map')}
              className="block text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Geospatial Radar
            </button>
            <button
              onClick={() => onOpenIngestModal?.()}
              className="block text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Ingest Field Media
            </button>
            <button
              onClick={() => onOpenReportModal?.()}
              className="block text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              ESG Impact Audit
            </button>
          </div>

          {/* Column 3: Contact & Legal (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            {/* Direct Contact Links */}
            <div className="space-y-1.5 text-xs">
              <a
                href="mailto:contact@terraframe.org"
                className="block text-slate-300 hover:text-white underline underline-offset-4 decoration-slate-700 hover:decoration-white transition-colors"
              >
                contact@terraframe.org
              </a>
              <a
                href="mailto:audit@terraframe.org"
                className="block text-slate-300 hover:text-white underline underline-offset-4 decoration-slate-700 hover:decoration-white transition-colors"
              >
                audit@terraframe.org
              </a>
              <a
                href="mailto:cloudinary@terraframe.org"
                className="block text-slate-300 hover:text-white underline underline-offset-4 decoration-slate-700 hover:decoration-white transition-colors"
              >
                cloudinary@terraframe.org
              </a>
            </div>

            {/* Legal */}
            <div className="pt-2 space-y-1 text-xs text-slate-400">
              <a href="#privacy" className="block hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#legal" className="block hover:text-white transition-colors">
                Legal Notice & Verification Standard
              </a>
            </div>

            {/* Micro Keyboard Control Hints */}
            <div className="pt-3 font-mono text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">⌘K</span>
                <span>search registry</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">⌘I</span>
                <span>ingest media</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">⌘E</span>
                <span>export esg deck</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Graphic: Michelangelo "Creation of Adam" Hands in ASCII Matrix Art */}
        <div className="relative py-12 border-t border-slate-900 flex flex-col items-center justify-center select-none overflow-hidden">
          {/* ASCII Hands Matrix Graphic */}
          <div className="w-full flex justify-between items-center opacity-40 hover:opacity-60 transition-opacity duration-500 text-[8px] sm:text-[9.5px] md:text-[11px] font-mono leading-[1.05] text-[#D06A53] max-w-5xl mx-auto px-2 pointer-events-none">
            {/* Left Hand Reaching */}
            <pre className="text-left font-mono whitespace-pre overflow-hidden">
{`           .\`{)|~-
          /|:t}|?~~-?i
        ;uxv3zv#]   - -   [}+-
       c]00mLU@cx}[  ]+)}]]_||
     t$fl#0mDCUen}{[$[]+}}|\\_I
  !vzkXYveuf;r=\\XUYzZ{f\\rm]{[{uvxZ@{]I'{}i\\il<i~
 }xvYvKUwtts}i<-.XUY[}{()[-!xvzn$t/\\xXwZmYvt}\\f-~
]ncXXYUx[({{{<i;         ^}:|rxemQv}\\fu#ZOQJ\\xmx\\t[I-
Iuum{/|[||{1-             -}Y0zDz\\tf#mwQQXnuU0Xft{t-
5rf(){)1-T~                 (rXC#mDOXttr#QZOU{fxQeCw]I?
!{i~=>;:                     \\6UZD0ut\\CUU}{frnLne@]!
[i{=;>                       (f*#Q00Ju[fx/}>-i3mlLu)~
[[?~-)                        j1YQQeLv|j}{,    -txrXnve/]|l:
?-I:                         ()}[{]j_cQ#Ov{?   (n,1ZzntYevu2,;
I]!                          {}|I|{=c0C#n\\?     ,  _rm)\\Yfc\\z]/{i
I!                           })t}\\-nC#ZQ0_             IvwzjV-
                             x||ttt/-I-                   fi+~
                                     \\I`}
            </pre>

            {/* Right Hand Reaching */}
            <pre className="text-right font-mono whitespace-pre overflow-hidden">
{`                             {YQQQzzxzxnze~
                        i { z w O Z # # c Y z z e v v v e
                   ? / # i . / z * X Q w Z D L l C C C 0 J u v u c x v t x
            - q s d w Z Y z X s n v z Q Q j J z Z j C c u s f j f j m n e x c
        ] B L U Z e q Z 0 Q Y Y / r r Y z U Y n \\ } ? { n j f } { I { r t x n u u
     m p D Q C Y L n Z O L C X q ] f { + I                        } } e e x v v
   ! n j / t { | } r e n n Y L 0 L J U Y X U Q Q Q Z x v x P / ] u I I i T !
 i > c I Z e t r c c c v } j m Z o x r u Z X X z t v C Q Q Z Z Z Y u ? I u [      - < i
 a z 0 z C c U u \\ > I Y Y Z X j U b w w 0 0 { s t f / - t x Z Z x V u z z x j \\ -    - - !
L q 0 0 / ' : ' ' +           $ j p Q Q X I        - - ( v { ] ] u Z J u X v ~
                              / s w r z O i            x ] 0 C z C x v j l
                              ! 5 0 - L u            } Q w w 0 { [ n j j t n } *
                              !   .   I               \\ C z Q U w L . ! ) u } ? <
                                     '                 + L Q U x } ]
                                                        1 X x Q { 1
                                                        I j n z t
                                                        } f v !
                                                        [ x ?
                                                        ) !`}
            </pre>
          </div>

          {/* Floating Center Attribution */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="font-mono text-xs text-slate-400">© 2026</span>
            <span className="text-xs font-semibold text-slate-200 mt-0.5">
              Terraframe Foundation GmbH.
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 font-mono">
              Verified impact you can see.
            </span>
          </div>
        </div>

        {/* Bottom Colossal Watermark Typography (Good Fella style) */}
        <div className="pt-4 border-t border-slate-900/80 text-center overflow-hidden">
          <span className="text-[14vw] font-black tracking-tighter text-[#1C1E24]/90 select-none block leading-[0.8] uppercase font-sans">
            Terraframe
          </span>
        </div>
      </div>
    </footer>
  );
};
