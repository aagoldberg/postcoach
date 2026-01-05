'use client';

import { useState, useCallback } from 'react';
import type { AnalysisResult } from '@/types';
import { AnalysisForm } from '@/components/AnalysisForm';
import { AnalysisResults } from '@/components/AnalysisResults';
import { LoadingProgress } from '@/components/ui';

type AppState = 'idle' | 'loading' | 'success' | 'error';

export default function Home() {
  const [state, setState] = useState<AppState>('idle');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState({ stage: '', value: 0 });

  const runAnalysis = useCallback(async (identifier: string) => {
    setState('loading');
    setError(null);
    setProgress({ stage: 'Starting analysis...', value: 5 });

    try {
      // Determine if it's a FID (number) or username
      const isNumeric = /^\d+$/.test(identifier);
      const queryParam = isNumeric ? `fid=${identifier}` : `username=${identifier}`;

      // Simulate progress stages while waiting for the API
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev.value >= 90) return prev;

          const stages = [
            { stage: 'Fetching user profile...', value: 15 },
            { stage: 'Fetching recent casts...', value: 30 },
            { stage: 'Computing engagement metrics...', value: 45 },
            { stage: 'Analyzing content features...', value: 55 },
            { stage: 'Identifying themes...', value: 65 },
            { stage: 'Generating personalized feedback...', value: 80 },
            { stage: 'Creating weekly brief...', value: 90 },
          ];

          const nextStage = stages.find((s) => s.value > prev.value);
          return nextStage || prev;
        });
      }, 2000);

      const response = await fetch(`/api/analyze?${queryParam}`);
      clearInterval(progressInterval);

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Analysis failed');
      }

      setProgress({ stage: 'Done!', value: 100 });
      setResult(data.data);
      setState('success');
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setState('error');
    }
  }, []);

  const handleReset = useCallback(() => {
    setState('idle');
    setResult(null);
    setError(null);
    setProgress({ stage: '', value: 0 });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header - Always visible */}
        {state === 'idle' && (
          <div className="text-center py-16">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                PostCoach
              </h1>
              <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
                AI-powered feedback for your Farcaster posts. Understand what works and grow your influence.
              </p>
            </div>

            <AnalysisForm onSubmit={runAnalysis} isLoading={false} />

            {/* Features */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
                <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  Post-Level Feedback
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Understand why each post performed the way it did with specific, actionable insights.
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  Weekly Brief
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Get a shareable summary with your win, weakness, and a specific experiment to try.
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  Theme Analysis
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Discover which topics resonate most with your audience and double down.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {state === 'loading' && (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="mb-8">
              <div className="w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center animate-pulse">
                <svg className="w-8 h-8 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
              Analyzing your Farcaster presence...
            </h2>
            <LoadingProgress stage={progress.stage} progress={progress.value} />
          </div>
        )}

        {/* Error State */}
        {state === 'error' && (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="mb-8">
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Oops, something went wrong
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-center max-w-md">
              {error}
            </p>
            <button
              onClick={handleReset}
              className="text-violet-600 dark:text-violet-400 font-medium hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Success State - Results */}
        {state === 'success' && result && (
          <AnalysisResults result={result} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            PostCoach - Farcaster Influence Coach
          </p>
        </div>
      </footer>
    </div>
  );
}
