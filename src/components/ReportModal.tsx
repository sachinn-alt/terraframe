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
  ExternalLink,
  Award,
  QrCode
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
**Provenance Engine:** Terraframe AI (Cloudinary Dynamic Media Intelligence)

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
    navigator.clipboard.writeText(`https://terraframe-kappa.vercel.app/audit/${report.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#163300]/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white border border-[#e8ebe6] rounded-[10px] sm:rounded-[28px] max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col font-sans text-[#454745]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Controls */}
        <div className="px-6 py-4 border-b border-[#e8ebe6] flex items-center justify-between bg-[#e8ebe6]/40">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#163300] text-[#9fe870] flex items-center justify-center font-bold">
              <FileCheck2 className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-[#0e0f0c]">ESG Audit & Impact Story Report</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#9fe870] text-[#163300]">
                  Audit Grade
                </span>
              </div>
              <p className="text-xs text-[#6a6c6a] font-mono">
                Verification Ledger ID: {report.id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-[#163300] hover:bg-[#e8ebe6] rounded-full transition-colors cursor-pointer"
              title="Print / Save PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#e8ebe6] hover:bg-[#dfe4dc] text-[#163300] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Report Document Printable Content */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-xs sm:text-sm bg-white print:p-0">
          {/* Institutional Report Header */}
          <div className="border-b-2 border-[#163300] pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#163300] text-[#9fe870] flex items-center justify-center text-xs font-black">
                  TF
                </span>
                <span className="font-bold text-[#163300] tracking-wider uppercase text-xs">
                  Terraframe AI • Independent Environmental Audit
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#6a6c6a]">
                Issued: {new Date(report.generatedAt).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#0e0f0c] mt-4 tracking-tight font-sans">
              {report.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#454745] mt-1">
              Project Sponsor: <strong className="text-[#163300]">{project.organization}</strong> • Jurisdiction: {project.region}, {project.country}
            </p>
          </div>

          {/* Executive Certification Summary (Wise Linen Mist container) */}
          <div className="bg-[#e2f6d5] border border-[#163300]/20 rounded-[10px] p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-2 font-bold text-[#163300] text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>Institutional Compliance Certification</span>
            </div>
            <p className="text-[#163300] leading-relaxed text-xs sm:text-sm">
              {report.executiveSummary}
            </p>
            <div className="mt-4 pt-3 border-t border-[#163300]/20 flex flex-wrap items-center justify-between text-xs text-[#163300] font-bold gap-2">
              <span className="bg-[#163300] text-[#9fe870] px-3 py-1 rounded-full font-mono">
                {report.quantifiedDeltaSummary}
              </span>
              <span className="bg-white px-3 py-1 rounded-full border border-[#163300]/30 font-mono text-[11px]">
                {report.verifiedAssetsCount} Cloudinary Field Assets Authenticated
              </span>
            </div>
          </div>

          {/* UN SDG Alignment Grid */}
          <div>
            <h3 className="font-bold text-[#0e0f0c] text-sm mb-3">
              United Nations Sustainable Development Goals (SDG) Audit:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {report.sdgContributions.map((s) => (
                <div key={s.sdg} className="bg-[#e8ebe6] p-4 rounded-[10px]">
                  <div className="flex items-center gap-2 font-bold text-[#163300] text-xs mb-1.5">
                    <span className="w-6 h-6 rounded-full bg-[#163300] text-[#9fe870] flex items-center justify-center text-[10px] font-bold">
                      {s.sdg}
                    </span>
                    <span>{s.title}</span>
                  </div>
                  <p className="text-[11px] text-[#454745] leading-relaxed">
                    {s.verifiedMetric}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Cryptographic Provenance Ledger */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-[#0e0f0c] text-sm flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#163300]" />
                Cryptographic Traceability Ledger (SHA-256)
              </h3>
              <span className="text-[11px] font-mono text-[#163300] font-semibold">Cloudinary Authenticated</span>
            </div>
            <div className="border border-[#e8ebe6] rounded-[10px] overflow-hidden">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-[#e8ebe6] text-[#163300] font-bold border-b border-[#e8ebe6]">
                  <tr>
                    <th className="p-3">Asset ID</th>
                    <th className="p-3">SHA-256 Fingerprint</th>
                    <th className="p-3">GPS Coordinates</th>
                    <th className="p-3">Capture Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e8ebe6]">
                  {report.auditTrail.map((entry, idx) => (
                    <tr key={idx} className="hover:bg-[#e8ebe6]/40">
                      <td className="p-3 font-mono text-[#0e0f0c] font-semibold">{entry.assetId}</td>
                      <td className="p-3 font-mono text-[#6a6c6a] break-all">{entry.sha256Hash}</td>
                      <td className="p-3 text-[#454745]">{entry.gpsCoordinates}</td>
                      <td className="p-3 text-[#6a6c6a]">{new Date(entry.timestamp).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Official Seal Block for Print & Verification */}
          <div className="p-5 bg-[#e8ebe6] rounded-[10px] flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#d8dcd5]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#163300] text-[#9fe870] flex items-center justify-center font-black text-xs shadow-xs">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0e0f0c]">Cryptographic Non-Repudiation Guarantee</h4>
                <p className="text-[11px] text-[#6a6c6a]">
                  All media signed on ingestion via SHA-256 and served through Cloudinary transformation pipeline.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-right">
              <div className="text-[10px] font-mono text-[#454745]">
                <span>Status: VERIFIED</span><br/>
                <span>Node: TF-GLOBAL-ORCHESTRATOR</span>
              </div>
            </div>
          </div>

          {/* Public Campaign Story Bundle */}
          <div className="bg-[#e8ebe6] p-4 rounded-[10px] space-y-2">
            <h4 className="font-bold text-[#163300] text-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#163300]" />
              Campaign Story & Social Broadcast Asset
            </h4>
            <div className="bg-white p-3 rounded-[8px] border border-[#e8ebe6] text-xs">
              <p className="font-bold text-[#0e0f0c] mb-1">&quot;{report.campaignHeadline}&quot;</p>
              <p className="text-[#454745] text-[11px] leading-relaxed italic">{report.socialSnippet}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions (Wise pill buttons) */}
        <div className="px-6 py-4 bg-[#e8ebe6]/40 border-t border-[#e8ebe6] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#163300] bg-white border border-[#163300] rounded-full hover:bg-[#e8ebe6] transition-colors cursor-pointer"
            >
              {copiedMd ? <Check className="w-3.5 h-3.5 text-[#163300]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedMd ? 'Copied Markdown!' : 'Copy Markdown Report'}</span>
            </button>

            <button
              onClick={handleCopyPublicLink}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#163300] bg-white border border-[#163300] rounded-full hover:bg-[#e8ebe6] transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#163300]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Public Share Link'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="wise-btn-primary"
            >
              <Download className="w-4 h-4 text-[#163300]" />
              <span>Export PDF / Print</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
