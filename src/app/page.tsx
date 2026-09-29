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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
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
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Hero Banner (Strict Light Theme) */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
              <div className="max-w-3xl relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-4">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Environmental Media Intelligence</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Turning Field Photos & Videos into Verifiable Impact Evidence.
                </h1>
                <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                  Terraframe AI empowers NGOs, governments, and sustainability trusts to organize, verify, and transform unindexed field media into cryptographically signed proof, measurable before-and-after timelines, and institutional ESG audit reports powered by <strong className="text-slate-900">Cloudinary</strong>.
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-6">
                  <button
                    onClick={() => setActiveTab('before-after')}
                    className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm transition-all"
                  >
                    <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                    <span>Launch Before / After Studio</span>
                  </button>

                  <button
                    onClick={() => setIsIngestModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all"
                  >
                    <Plus className="w-4 h-4 text-emerald-700" />
                    <span>Upload Field Media</span>
                  </button>
                </div>
              </div>

              {/* Decorative Subtle Grid Accent */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-emerald-50/60 to-transparent pointer-events-none hidden md:block"></div>
            </div>

            {/* KPI Stat Cards */}
            <StatsBanner
              totalAssets={evidence.length}
              totalProjects={projects.length}
              totalComparisons={comparisons.length}
            />

            {/* Featured Before/After Interactive Studio */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-lg font-bold text-slate-900">Featured Before / After Verification</h2>
                </div>
                <button
                  onClick={() => setActiveTab('before-after')}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <span>Explore all 4 projects</span>
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
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-lg font-bold text-slate-900">Recent Verified Field Media</h2>
                </div>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <span>View full gallery ({evidence.length})</span>
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
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  Problem Statement 02 Core Capability
                </span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Temporal Before & After Verification Studio
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
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
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs">
              <h3 className="text-sm font-bold text-slate-900 mb-4">
                Project Milestone & Quantified Change Summary
              </h3>
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/90 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Project</th>
                      <th className="p-3">Metric Name</th>
                      <th className="p-3">Baseline</th>
                      <th className="p-3">Milestone</th>
                      <th className="p-3">Net Delta</th>
                      <th className="p-3">Verification Method</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparisons.map((c) => (
                      <tr 
                        key={c.id} 
                        onClick={() => setSelectedComparisonPairId(c.id)}
                        className={`cursor-pointer transition-colors ${
                          selectedComparisonPairId === c.id ? 'bg-emerald-50/60 font-semibold' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="p-3 text-slate-900">{c.projectName}</td>
                        <td className="p-3 text-slate-600">{c.quantifiedImpact.metricName}</td>
                        <td className="p-3 font-mono text-slate-500">{c.quantifiedImpact.baselineValue} {c.quantifiedImpact.unit}</td>
                        <td className="p-3 font-mono text-slate-900 font-bold">{c.quantifiedImpact.milestoneValue} {c.quantifiedImpact.unit}</td>
                        <td className="p-3 font-mono text-emerald-700 font-bold">+{c.quantifiedImpact.deltaPercentage}%</td>
                        <td className="p-3 text-slate-500">{c.quantifiedImpact.verificationMethod}</td>
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
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Verified Field Evidence Repository
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
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
            <div className="flex items-center justify-between text-xs text-slate-600 px-1">
              <span>Showing <strong>{filteredEvidence.length}</strong> verified assets</span>
              {(searchQuery || selectedCategory !== 'all' || selectedMilestone !== 'all' || selectedSdg !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedMilestone('all');
                    setSelectedSdg('all');
                  }}
                  className="text-emerald-700 font-semibold hover:underline"
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
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-500">
                <p className="text-sm font-semibold text-slate-700">No evidence assets match your current filters.</p>
                <p className="text-xs text-slate-500 mt-1">Try resetting your search query or selecting &quot;All Domains&quot;.</p>
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
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                ESG Audit & Impact Story Reports
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Download audit-grade compliance reports with embedded cryptographic provenance hashes and donor campaign assets.
              </p>
            </div>

            {/* Featured Report Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900">
                    Audit Certified
                  </span>
                  <span className="text-xs font-mono text-slate-500">Record ID: {report.id}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {report.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {report.executiveSummary}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-4 text-xs">
                  <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                    {report.quantifiedDeltaSummary}
                  </span>
                  <span className="text-slate-500">
                    Generated: {new Date(report.generatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
                <button
                  onClick={() => setIsReportModalOpen(true)}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm transition-all"
                >
                  <FileCheck2 className="w-4 h-4 text-emerald-400" />
                  <span>Open Full Audit Report</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Terraframe AI</span>
            <span>•</span>
            <span>Code Cubicle 6 Hackathon — Problem Statement 02 (Cloudinary Track)</span>
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <span>Clean Light Design System</span>
            <span>•</span>
            <span className="font-mono text-[11px] text-emerald-700 font-semibold">100% Provenance Traceability</span>
          </div>
        </div>
      </footer>

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
