import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_EVIDENCE, INITIAL_PROJECTS } from '@/lib/mockData';
import { EvidenceAsset, ImpactProject } from '@/types';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');
    const sdg = searchParams.get('sdg');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search')?.toLowerCase();

    let assets: EvidenceAsset[] = [...INITIAL_EVIDENCE];

    if (projectId && projectId !== 'all') {
      assets = assets.filter((a: EvidenceAsset) => a.projectId === projectId);
    }

    if (sdg && sdg !== 'all') {
      const sdgNum = parseInt(sdg, 10);
      assets = assets.filter((a: EvidenceAsset) => a.aiAnalysis.sdgGoals.includes(sdgNum));
    }

    if (category && category !== 'all') {
      const projectIdsWithCategory = INITIAL_PROJECTS.filter((p: ImpactProject) => p.category === category).map((p: ImpactProject) => p.id);
      assets = assets.filter((a: EvidenceAsset) => projectIdsWithCategory.includes(a.projectId));
    }

    if (status && status !== 'all') {
      assets = assets.filter((a: EvidenceAsset) => a.status === status);
    }

    if (search) {
      assets = assets.filter(
        (a: EvidenceAsset) =>
          a.title.toLowerCase().includes(search) ||
          a.description.toLowerCase().includes(search) ||
          a.projectName.toLowerCase().includes(search) ||
          a.aiAnalysis.tags.some((t: string) => t.toLowerCase().includes(search)) ||
          a.aiAnalysis.detectedObjects.some((o: { label: string }) => o.label.toLowerCase().includes(search))
      );
    }

    return NextResponse.json({
      success: true,
      count: assets.length,
      assets,
      projects: INITIAL_PROJECTS,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to retrieve evidence.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
