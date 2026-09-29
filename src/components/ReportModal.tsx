'use client';

import React, { useState } from 'react';
import { ESGAuditReport, ImpactProject } from '@/types';
import { 
  X, 
  FileCheck2, 
  Download, 
  Copy, 
  Check, 
  Printer, 
  ShieldCheck, 
  Share2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ESGAuditReport;
  project: ImpactProject;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  report,
  project
}) => {
  const [copiedMd, setCopiedMd] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleCopyMarkdown = () => {
    const mdContent = `
# ${report.title}
**Project:** ${project.name} (${project.region}, ${project.country})  
**Organization:** ${project.organization}  
**Audit ID:** \`${report.id}\` | **Generated:** ${new Date(report.generatedAt).toLocaleString()}  
**Provenance Engine:** VeriTerra AI (Cloudinary Dynamic Media Intelligence)

---

## Executive Summary
${report.executiveSummary}

## Quantified Ecological Delta
${report.quantifiedDeltaSummary}

## UN Sustainable Development Goals (SDG) Alignment
${report.sdgContributions.map(s => `* **SDG ${s.sdg} (${s.title}):** ${s.verifiedMetric}`).join('\n')}

## Cryptographic Provenance Ledger
| Asset ID | SHA-256 Cryptographic Hash | GPS Coordinates | Verified Node |
| :--- | :--- | :--- | :--- |
${report.auditTrail.map(a => `| \`${a.assetId}\` | \`${a.sha256Hash.substring(0, 16)}...\` | ${a.gpsCoordinates} | ${a.verifier} |`).join('\n')}

---
**Campaign Headline:** "${report.campaignHeadline}"  
**Verified Social Copy:** "${report.socialSnippet}"
    `.trim();

    navigator.clipboard.writeText(mdContent);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleCopyPublicLink = () => {
    navigator.clipboard.writeText(`https://veriterra.earth/audit/${report.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Controls */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">ESG Visual Verification Report</h3>
              <p className="text-xs text-slate-500 font-mono">
                Audit Record ID: {report.id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors"
              title="Print / Save PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Report Content Document Body */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-800 text-xs sm:text-sm bg-white print:p-0">
          {/* Institutional Report Header */}
          <div className="border-b-2 border-slate-900 pb-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                  VT
                </span>
                <span className="font-bold text-slate-900 tracking-wider uppercase text-xs">
                  VeriTerra AI • Independent Environmental Audit
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Issued: {new Date(report.generatedAt).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-4 tracking-tight">
              {report.title}
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Project Sponsor: <span className="font-semibold text-slate-800">{project.organization}</span> • Location: {project.region}, {project.country}
            </p>
          </div>

          {/* Executive Certification Summary */}
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2 font-bold text-emerald-950 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Verified Outcome Certification
            </div>
            <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
              {report.executiveSummary}
            </p>
            <div className="mt-3 pt-3 border-t border-emerald-100 flex flex-wrap items-center justify-between text-xs text-emerald-900 font-semibold gap-2">
              <span>{report.quantifiedDeltaSummary}</span>
              <span className="bg-white px-2.5 py-1 rounded-md border border-emerald-200 shadow-2xs font-mono text-[11px]">
                {report.verifiedAssetsCount} Field Assets Verified
              </span>
            </div>
          </div>

          {/* UN SDG Alignment Table */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-2.5">
              UN Sustainable Development Goals (SDG) Contribution:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {report.sdgContributions.map((s) => (
                <div key={s.sdg} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs mb-1">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                      {s.sdg}
                    </span>
                    <span>{s.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {s.verifiedMetric}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Cryptographic Provenance Ledger */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Cryptographic Traceability Ledger (SHA-256)
              </h3>
              <span className="text-[11px] font-mono text-slate-500">Cloudinary Authenticated</span>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Asset ID</th>
                    <th className="p-2.5">SHA-256 Hash</th>
                    <th className="p-2.5">GPS Pin</th>
                    <th className="p-2.5">Capture Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {report.auditTrail.map((entry, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-2.5 font-mono text-slate-800 font-semibold">{entry.assetId}</td>
                      <td className="p-2.5 font-mono text-slate-500 break-all">{entry.sha256Hash}</td>
                      <td className="p-2.5 text-slate-600">{entry.gpsCoordinates}</td>
                      <td className="p-2.5 text-slate-600">{new Date(entry.timestamp).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Public Campaign Story Bundle */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Campaign Story & Social Broadcast Asset
            </h4>
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
              <p className="font-bold text-slate-800 mb-1">&quot;{report.campaignHeadline}&quot;</p>
              <p className="text-slate-600 text-[11px] leading-relaxed italic">{report.socialSnippet}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors shadow-2xs"
            >
              {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedMd ? 'Copied Markdown!' : 'Copy Markdown Report'}</span>
            </button>

            <button
              onClick={handleCopyPublicLink}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors shadow-2xs"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Public Share Link'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF / Print</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
