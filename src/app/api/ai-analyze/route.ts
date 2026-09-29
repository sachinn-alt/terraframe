import { NextRequest, NextResponse } from 'next/server';
import { analyzeEnvironmentalMedia } from '@/lib/gemini';
import { ProjectCategory } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageUrl, category = 'Reforestation', context = '' } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Field `imageUrl` is required for AI environmental analysis.' },
        { status: 400 }
      );
    }

    const analysis = await analyzeEnvironmentalMedia(imageUrl, category as ProjectCategory, context);

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'AI analysis failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
