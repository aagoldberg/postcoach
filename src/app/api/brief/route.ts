import { NextRequest, NextResponse } from 'next/server';
import { getCachedAnalysis, checkRateLimit } from '@/lib/db';
import { runAnalysisPipeline } from '@/lib/analysis/pipeline';
import type { BriefResponse } from '@/types';

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const fid = searchParams.get('fid');
    const username = searchParams.get('username');

    if (!fid && !username) {
      return NextResponse.json<BriefResponse>(
        { success: false, error: 'Missing fid or username parameter' },
        { status: 400 }
      );
    }

    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const rateLimit = await checkRateLimit(clientIP, '/api/brief');

    if (!rateLimit.allowed) {
      return NextResponse.json<BriefResponse>(
        {
          success: false,
          error: `Rate limit exceeded. Try again at ${rateLimit.resetAt.toISOString()}`,
        },
        { status: 429 }
      );
    }

    const numericFid = fid ? parseInt(fid, 10) : null;

    // Try to get from cache first
    if (numericFid) {
      const cached = await getCachedAnalysis(numericFid);
      if (cached?.weeklyBrief) {
        return NextResponse.json<BriefResponse>({
          success: true,
          data: cached.weeklyBrief,
        });
      }
    }

    // Run full analysis to get the brief
    const identifier = fid ? parseInt(fid, 10) : username!;
    const result = await runAnalysisPipeline(identifier);

    return NextResponse.json<BriefResponse>({
      success: true,
      data: result.weeklyBrief,
    });
  } catch (error) {
    console.error('Brief generation error:', error);

    return NextResponse.json<BriefResponse>(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate brief',
      },
      { status: 500 }
    );
  }
}
