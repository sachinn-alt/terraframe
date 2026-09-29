'use client';

import React, { useState, useMemo } from 'react';
import { 
  INITIAL_PROJECTS, 
  INITIAL_EVIDENCE, 
  INITIAL_COMPARISONS, 
  INITIAL_AUDIT_REPORT 
} from '@/lib/mockData';
import { EvidenceAsset, ComparisonPair, ImpactProject, ESGAuditReport } from '@/types';
import { Header, ActiveTab } from '@/components/Header';
import { StatsBanner } from '@/components/StatsBanner';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { EvidenceCard } from '@/components/EvidenceCard';
import { ProjectFilter } from '@/components/ProjectFilter';
import { AssetDetailModal } from '@/components/AssetDetailModal';
import { IngestModal } from '@/components/IngestModal';
import { ReportModal } from '@/components/ReportModal';
import { MapView } from '@/components/MapView';
import { Footer } from '@/components/Footer';
import { 
  Sparkles, 
  Cloud, 
  CheckCircle, 
  SlidersHorizontal, 
  FileCheck2, 
  MapPin, 
  ShieldCheck, 
  ArrowRight,
  Plus
} from 'lucide-react';

export default function Home() {
  const [projects, setProjects] = useState<ImpactProject[]>(INITIAL_PROJECTS);
  const [evidence, setEvidence] = useState<EvidenceAsset[]>(INITIAL_EVIDENCE);
  const [comparisons, setComparisons] = useState<ComparisonPair[]>(INITIAL_COMPARISONS);
  const [report, setReport] = useState<ESGAuditReport>(INITIAL_AUDIT_REPORT);

  // Navigation & Filtering State
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMilestone, setSelectedMilestone] = useState<string>('all');
  const [selectedSdg, setSelectedSdg] = useState<number | 'all'>('all');

  // Modals State
  const [selectedAsset, setSelectedAsset] = useState<EvidenceAsset | null>(null);
  const [isIngestModalOpen, setIsIngestModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [selectedComparisonPairId, setSelectedComparisonPairId] = useState<string>(comparisons[0]?.id || '');

  // Filtered Evidence Assets
  const filteredEvidence = useMemo(() => {
    return evidence.filter((asset) => {
      // Search matching across title, description, tags, narrative, location
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = asset.title.toLowerCase().includes(q);
        const matchDesc = asset.description.toLowerCase().includes(q);
        const matchProject = asset.projectName.toLowerCase().includes(q);
        const matchLocation = asset.telemetry.gps.locationName.toLowerCase().includes(q);
        const matchTags = asset.aiAnalysis.tags.some(t => t.toLowerCase().includes(q));
        const matchObjects = asset.aiAnalysis.detectedObjects.some(o => o.label.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchProject && !matchLocation && !matchTags && !matchObjects) {
          return false;
        }
      }

      // Domain Category
      if (selectedCategory !== 'all') {
        const project = projects.find(p => p.id === asset.projectId);
        if (project?.category !== selectedCategory) {
          return false;
        }
      }

      // Milestone Type
      if (selectedMilestone !== 'all') {
        if (asset.milestoneType !== selectedMilestone) {
          return false;
        }
      }

      // SDG Filter
      if (selectedSdg !== 'all') {
        if (!asset.aiAnalysis.sdgGoals.includes(Number(selectedSdg))) {
          return false;
        }
      }

      return true;
    });
  }, [evidence, searchQuery, selectedCategory, selectedMilestone, selectedSdg, projects]);

  const handleAssetIngested = (newAsset: EvidenceAsset) => {
    setEvidence(prev => [newAsset, ...prev]);
    // Also update project asset counts
    setProjects(prev => prev.map(p => {
      if (p.id === newAsset.projectId) {
        return {
          ...p,
          totalAssetsCount: p.totalAssetsCount + 1,
          verifiedAssetsCount: p.verifiedAssetsCount + 1
        };
      }
      return p;
    }));
  };

  const handleCompareWithPair = (projectId: string) => {
    const pair = comparisons.find(c => c.projectId === projectId);
    if (pair) {
      setSelectedComparisonPairId(pair.id);
    }
    setActiveTab('before-after');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-[#454745] font-sans selection:bg-[#9fe870] selection:text-[#163300]">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenIngestModal={() => setIsIngestModalOpen(true)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        totalAssetsCount={evidence.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab 1: Overview Dashboard */}
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            {/* Wise Signature Display Hero */}
            <div className="pt-4 pb-6 sm:py-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#e2f6d5] text-[#163300] mb-6">
                <ShieldCheck className="w-3.5 h-3.5 text-[#163300]" />
                <span className="tracking-wide">VERIFIED ENVIRONMENTAL MEDIA INTELLIGENCE</span>
              </div>

              <h1 className="wise-display text-[#0e0f0c] uppercase text-4xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[0.88] tracking-[-0.035em] font-black max-w-5xl mb-6">
                TURNING FIELD MEDIA INTO VERIFIABLE PROOF.
              </h1>

              <p className="text-base sm:text-lg text-[#454745] max-w-3xl leading-relaxed mb-8">
                Terraframe AI empowers NGOs, governments, and sustainability trusts to organize, verify, and transform unindexed field media into cryptographically signed proof, measurable before-and-after timelines, and institutional ESG audit reports powered by Cloudinary.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setActiveTab('before-after')}
                  className="wise-btn-primary"
                >
                  <SlidersHorizontal className="w-4 h-4 text-[#163300]" />
                  <span>Launch Before / After Studio</span>
                </button>

                <button
                  onClick={() => setIsIngestModalOpen(true)}
                  className="wise-btn-outlined"
                >
                  <Plus className="w-4 h-4 text-[#163300]" />
                  <span>Upload Field Media</span>
                </button>
              </div>
            </div>

            {/* Wise 3-Column Feature Trust Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-[#e8ebe6]">
              <div className="flex flex-col">
                <div className="w-6 h-6 text-[#454745] mb-6">
                  <ShieldCheck className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-bold text-[18px] text-[#0e0f0c] mb-2 font-sans">
                  SHA-256 Non-Repudiation
                </h3>
                <p className="text-[16px] text-[#868685] leading-relaxed">
                  Every field photo and drone sensor capture receives an immutable SHA-256 hash and binary EXIF coordinate signature.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="w-6 h-6 text-[#454745] mb-6">
                  <SlidersHorizontal className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-bold text-[18px] text-[#0e0f0c] mb-2 font-sans">
                  Spatial-Temporal Alignment
                </h3>
                <p className="text-[16px] text-[#868685] leading-relaxed">
                  Automated Haversine coordinate proximity matches baseline assets with subsequent progress milestones.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="w-6 h-6 text-[#454745] mb-6">
                  <Cloud className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-bold text-[18px] text-[#0e0f0c] mb-2 font-sans">
                  Cloudinary Dynamic Proof
                </h3>
                <p className="text-[16px] text-[#868685] leading-relaxed">
                  On-the-fly transformations, watermarked audit overlays, and auto-tagged responsive delivery for institutional ESG decks.
                </p>
              </div>
            </div>

            {/* KPI Stat Cards (10px radius Fog cards) */}
            <StatsBanner
              totalAssets={evidence.length}
              totalProjects={projects.length}
              totalComparisons={comparisons.length}
            />

            {/* Featured Before/After Studio wrapped in Wise Dark Section Card (28px radius Forest Ink) */}
            <div className="bg-[#163300] text-white rounded-[28px] p-6 sm:p-10 mb-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#9fe870] text-[#163300]">
                      Featured Milestone
                    </span>
                    <span className="text-xs text-[#e8ebe6]/70 font-mono">
                      Problem Statement 02
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-bold text-[#9fe870] tracking-tight font-sans">
                    Interactive Before & After Verification
                  </h2>
                  <p className="text-sm sm:text-base text-white/90 mt-1 max-w-2xl">
                    Inspect ecological progress across verified projects. Slide horizontally to view quantified deltas and cryptographic tamper-proof overlays.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('before-after')}
                  className="self-start sm:self-center px-4 py-2 rounded-full border border-white text-white hover:bg-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Explore All Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <BeforeAfterSlider
                comparisons={comparisons}
                selectedPairId={selectedComparisonPairId}
                onSelectPair={setSelectedComparisonPairId}
              />
            </div>

            {/* Quick Evidence Gallery Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#163300]" />
                  <h2 className="text-xl font-bold text-[#0e0f0c] font-sans">Recent Verified Field Media</h2>
                </div>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className="text-xs font-semibold text-[#163300] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View full repository ({evidence.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {evidence.slice(0, 4).map((asset) => (
                  <EvidenceCard
                    key={asset.id}
                    asset={asset}
                    onInspect={setSelectedAsset}
                    onCompareWithPair={handleCompareWithPair}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Before & After Studio */}
        {activeTab === 'before-after' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#e2f6d5] text-[#163300]">
                  Problem Statement 02 Core Capability
                </span>
              </div>
              <h1 className="wise-display text-3xl sm:text-5xl font-black text-[#0e0f0c] tracking-tight uppercase">
                Temporal Before & After Verification Studio
              </h1>
              <p className="text-sm text-[#454745] mt-2 max-w-3xl leading-relaxed">
                Compare baseline and subsequent milestone evidence captured at identical coordinates. Slide horizontally to inspect ecological change, view quantified deltas, and preview Cloudinary dynamic cryptographic overlays.
              </p>
            </div>

            {/* Main Interactive Slider */}
            <BeforeAfterSlider
              comparisons={comparisons}
              selectedPairId={selectedComparisonPairId}
              onSelectPair={setSelectedComparisonPairId}
            />

            {/* Quantified Deltas Comparison Matrix Table */}
            <div className="bg-white border border-[#e8ebe6] rounded-[10px] sm:rounded-[28px] p-6 shadow-xs">
              <h3 className="text-base font-bold text-[#0e0f0c] mb-4 font-sans">
                Project Milestone & Quantified Change Summary
              </h3>
              <div className="border border-[#e8ebe6] rounded-[10px] overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#e8ebe6] text-[#163300] font-bold border-b border-[#e8ebe6]">
                    <tr>
                      <th className="p-3">Project</th>
                      <th className="p-3">Metric Name</th>
                      <th className="p-3">Baseline</th>
                      <th className="p-3">Milestone</th>
                      <th className="p-3">Net Delta</th>
                      <th className="p-3">Verification Method</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8ebe6]">
                    {comparisons.map((c) => (
                      <tr 
                        key={c.id} 
                        onClick={() => setSelectedComparisonPairId(c.id)}
                        className={`cursor-pointer transition-colors ${
                          selectedComparisonPairId === c.id ? 'bg-[#e2f6d5]/70 font-semibold' : 'hover:bg-[#e8ebe6]/40'
                        }`}
                      >
                        <td className="p-3 text-[#0e0f0c] font-semibold">{c.projectName}</td>
                        <td className="p-3 text-[#454745]">{c.quantifiedImpact.metricName}</td>
                        <td className="p-3 font-mono text-[#868685]">{c.quantifiedImpact.baselineValue} {c.quantifiedImpact.unit}</td>
                        <td className="p-3 font-mono text-[#0e0f0c] font-bold">{c.quantifiedImpact.milestoneValue} {c.quantifiedImpact.unit}</td>
                        <td className="p-3 font-mono font-bold">
                          <span className="bg-[#9fe870] text-[#163300] px-2 py-0.5 rounded-full inline-block">
                            +{c.quantifiedImpact.deltaPercentage}%
                          </span>
                        </td>
                        <td className="p-3 text-[#6a6c6a]">{c.quantifiedImpact.verificationMethod}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Evidence Gallery */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h1 className="wise-display text-3xl sm:text-5xl font-black text-[#0e0f0c] tracking-tight uppercase">
                Verified Field Evidence Repository
              </h1>
              <p className="text-sm text-[#454745] mt-2 leading-relaxed">
                Browse, search, and inspect field photos and videos organized by project, location, and UN SDG alignment.
              </p>
            </div>

            {/* Filter & Search Bar */}
            <ProjectFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedMilestone={selectedMilestone}
              setSelectedMilestone={setSelectedMilestone}
              selectedSdg={selectedSdg}
              setSelectedSdg={setSelectedSdg}
            />

            {/* Results Count & Clear */}
            <div className="flex items-center justify-between text-xs text-[#6a6c6a] px-1">
              <span>Showing <strong className="text-[#0e0f0c]">{filteredEvidence.length}</strong> verified assets</span>
              {(searchQuery || selectedCategory !== 'all' || selectedMilestone !== 'all' || selectedSdg !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedMilestone('all');
                    setSelectedSdg('all');
                  }}
                  className="text-[#163300] font-semibold underline cursor-pointer"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {/* Asset Grid */}
            {filteredEvidence.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredEvidence.map((asset) => (
                  <EvidenceCard
                    key={asset.id}
                    asset={asset}
                    onInspect={setSelectedAsset}
                    onCompareWithPair={handleCompareWithPair}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-[#e8ebe6] rounded-[10px] p-12 text-center text-[#868685]">
                <p className="text-sm font-semibold text-[#0e0f0c]">No evidence assets match your current filters.</p>
                <p className="text-xs text-[#868685] mt-1">Try resetting your search query or selecting &quot;All Domains&quot;.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Geospatial Map */}
        {activeTab === 'map' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <MapView
              projects={projects}
              evidence={evidence}
              onSelectProject={(projectId) => {
                const proj = projects.find(p => p.id === projectId);
                if (proj) {
                  setSelectedCategory(proj.category);
                  setActiveTab('gallery');
                }
              }}
              onInspectAsset={setSelectedAsset}
            />
          </div>
        )}

        {/* Tab 5: ESG Audit Reports */}
        {activeTab === 'reports' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h1 className="wise-display text-3xl sm:text-5xl font-black text-[#0e0f0c] tracking-tight uppercase">
                ESG Audit & Impact Story Reports
              </h1>
              <p className="text-sm text-[#454745] mt-2">
                Download audit-grade compliance reports with embedded cryptographic provenance hashes and donor campaign assets.
              </p>
            </div>

            {/* Featured Report Card in Wise Dark Section Card (28px radius Forest Ink) */}
            <div className="bg-[#163300] text-white rounded-[28px] p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#9fe870] text-[#163300]">
                    Audit Certified
                  </span>
                  <span className="text-xs font-mono text-[#e8ebe6]/80">Record ID: {report.id}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#9fe870] font-sans">
                  {report.title}
                </h2>
                <p className="text-sm text-white/90 mt-2 leading-relaxed">
                  {report.executiveSummary}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-4 text-xs">
                  <span className="font-semibold text-[#163300] bg-[#e2f6d5] px-3 py-1 rounded-full">
                    {report.quantifiedDeltaSummary}
                  </span>
                  <span className="text-[#e8ebe6]/70">
                    Generated: {new Date(report.generatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
                <button
                  onClick={() => setIsReportModalOpen(true)}
                  className="wise-btn-primary"
                >
                  <FileCheck2 className="w-4 h-4 text-[#163300]" />
                  <span>Open Full Audit Report</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating QR Badge (Wise persistent badge in bottom-right corner) */}
      <aside aria-label="Field app download badge" className="fixed bottom-6 right-6 z-30 bg-[#163300] text-white p-3 rounded-[16px] shadow-lg flex flex-col items-center gap-1.5 w-[124px] border border-[#054d28] group transition-transform hover:scale-105 select-none">
        <div className="bg-white p-1.5 rounded-[8px] flex items-center justify-center">
          <svg className="w-16 h-16" viewBox="0 0 24 24" fill="#163300">
            <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v2h-4v-2zm-4 0h2v4h-2v-4zm4 4h4v2h-4v-2zm-2 2h2v-2h-2v2zm-2-6h2v2h-2v-2zM5 5h2v2H5V5zm12 0h2v2h-2V5zM5 17h2v2H5v-2z"/>
          </svg>
        </div>
        <span className="text-[11px] font-semibold text-[#9fe870] text-center leading-tight">
          Verify Field Proof
        </span>
      </aside>

      {/* Footer */}
      <Footer
        onNavigateTab={setActiveTab}
        onOpenIngestModal={() => setIsIngestModalOpen(true)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
      />

      {/* Modals */}
      <AssetDetailModal
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
      />

      <IngestModal
        isOpen={isIngestModalOpen}
        onClose={() => setIsIngestModalOpen(false)}
        projects={projects}
        onAssetIngested={handleAssetIngested}
      />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        report={report}
        project={projects[0]}
      />
    </div>
  );
}
