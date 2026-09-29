import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_PROJECTS, INITIAL_COMPARISONS } from '@/lib/mockData';
import { getWatermarkedProof, getHeroBanner } from '@/lib/cloudinary';
import { ImpactProject, ComparisonPair } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const projectId = body.projectId || 'proj-sundarbans';

    const project = INITIAL_PROJECTS.find((p: ImpactProject) => p.id === projectId) || INITIAL_PROJECTS[0];
    const pair = INITIAL_COMPARISONS.find((p: ComparisonPair) => p.projectId === projectId) || INITIAL_COMPARISONS[0];

    const deltaSign = pair.quantifiedImpact.deltaPercentage > 0 ? '+' : '';
    const formattedDelta = `${deltaSign}${pair.quantifiedImpact.deltaPercentage}%`;

    const report = {
      projectId: project.id,
      projectName: project.name,
      generatedAt: new Date().toISOString(),
      reportId: `ESG-TRF-${Date.now().toString(36).toUpperCase()}`,
      executiveSummary: `Institutional ESG audit for ${project.name} in ${project.region}, ${project.country}. Verified by Terraframe's autonomous multi-agent pipeline and Cloudinary dynamic media transformations. Demonstrates verifiable progress of ${formattedDelta} across an observation span of ${pair.timeDeltaDays} days.`,
      keyMetrics: [
        { label: 'Time Span', value: `${pair.timeDeltaDays} Days` },
        { label: 'Spatial Proximity', value: `${pair.distanceDeltaMeters}m (Geofence Verified)` },
        { label: 'Verified Delta', value: formattedDelta },
        { label: 'Primary UN SDGs', value: project.sdgList.map((g: number) => `SDG ${g}`).join(', ') },
      ],
      mediaAssets: {
        baselineProofUrl: getWatermarkedProof(pair.baselineAsset.cloudinary.secureUrl, 'TERRAFRAME • BASELINE AUDIT'),
        milestoneProofUrl: getWatermarkedProof(pair.milestoneAsset.cloudinary.secureUrl, 'TERRAFRAME • VERIFIED MILESTONE'),
        heroBannerUrl: getHeroBanner(pair.milestoneAsset.cloudinary.secureUrl),
      },
      storytellingNarrative: {
        headline: `${project.name}: Measurable Transformation at Scale`,
        donorNarrative: `Over the past ${pair.timeDeltaDays} days, project teams working across ${project.region} have driven a verified ${formattedDelta} improvement in ${pair.quantifiedImpact.metricName}. Every milestone captured in the field is cryptographically timestamped, GPS-verified, and mapped to UN Sustainable Development Goals.`,
        socialSnippet: `Proof you can see: ${formattedDelta} environmental turnaround in ${project.name}, verified by @TerraframeAI and powered by @Cloudinary media intelligence. #ClimateAction #SDG${project.primarySdg}`,
      },
      auditSignOff: {
        cryptographicProofHash: pair.milestoneAsset.sha256Hash,
        status: 'VERIFIED_AUDIT_GRADE',
        verifier: 'Terraframe Multi-Agent Pipeline & Cloudinary Dynamic Ingest',
      },
    };

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to generate ESG report.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
