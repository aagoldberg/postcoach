import { NextRequest, NextResponse } from 'next/server';
import { runAnalysisPipeline } from '@/lib/analysis/pipeline';
import { getCachedAnalysis, setCachedAnalysis, checkRateLimit } from '@/lib/db';
import type { AnalyzeResponse } from '@/types';

export const maxDuration = 60; // Allow up to 60 seconds for analysis

export async function GET(request: NextRequest) {
  try {
    // Get FID or username from query params
    const searchParams = request.nextUrl.searchParams;
    const fid = searchParams.get('fid');
    const username = searchParams.get('username');
    const forceRefresh = searchParams.get('refresh') === 'true';

    if (!fid && !username) {
      return NextResponse.json<AnalyzeResponse>(
        { success: false, error: 'Missing fid or username parameter' },
        { status: 400 }
      );
    }

    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const rateLimit = await checkRateLimit(clientIP, '/api/analyze');

    if (!rateLimit.allowed) {
      return NextResponse.json<AnalyzeResponse>(
        {
          success: false,
          error: `Rate limit exceeded. Try again at ${rateLimit.resetAt.toISOString()}`,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.resetAt.toISOString(),
          },
        }
      );
    }

    // Determine the identifier
    const identifier = fid ? parseInt(fid, 10) : username!;
    const numericFid = typeof identifier === 'number' ? identifier : null;

    // Check cache (only if we have a numeric FID)
    if (numericFid && !forceRefresh) {
      const cached = await getCachedAnalysis(numericFid);
      if (cached) {
        return NextResponse.json<AnalyzeResponse>({
          success: true,
          data: cached,
          cached: true,
        });
      }
    }

    // Run analysis pipeline
    const result = await runAnalysisPipeline(identifier);

    // Cache result
    await setCachedAnalysis(result.user.fid, result.user.username, result);

    return NextResponse.json<AnalyzeResponse>({
      success: true,
      data: result,
      cached: false,
    });
  } catch (error) {
    console.error('Analysis error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Analysis failed';

    return NextResponse.json<AnalyzeResponse>(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
