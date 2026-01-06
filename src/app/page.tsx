'use client';

import { useState, useCallback } from 'react';
import { LoadingProgress } from '@/components/ui/Progress';
import { Button } from '@/components/ui/Button';
import { AnalysisForm } from '@/components/AnalysisForm';
import { AnalysisResults } from '@/components/AnalysisResults';
import type { AnalysisResult } from '@/types';

type AppState = 'idle' | 'loading' | 'success' | 'error';

export default function Home() {
  const [state, setState] = useState<AppState>('idle');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState({ stage: '', value: 0 });

  const runAnalysis = useCallback(async (identifier: string, refresh = false) => {
    setState('loading');
    setError(null);
    setProgress({ stage: 'Establishing neural link...', value: 5 });

    try {
      const isNumeric = /^\d+$/.test(identifier);
      const queryParam = isNumeric ? `fid=${identifier}` : `username=${identifier}`;
      const refreshParam = refresh ? '&refresh=true' : '';

      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev.value >= 90) return prev;
          const stages = [
            { stage: 'Accessing Farcaster node...', value: 15 },
            { stage: 'Downloading history...', value: 30 },
            { stage: 'Calculating engagement...', value: 45 },
            { stage: 'Running NLP models...', value: 55 },
            { stage: 'Synthesizing themes...', value: 65 },
            { stage: 'Generating advice...', value: 80 },
            { stage: 'Finalizing briefing...', value: 90 },
          ];
          const nextStage = stages.find((s) => s.value > prev.value);
          return nextStage || prev;
        });
      }, 2000);

      const response = await fetch(`/api/analyze?${queryParam}${refreshParam}`);
      clearInterval(progressInterval);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Analysis failed');
      }

      setProgress({ stage: 'Complete.', value: 100 });
      setResult(data.data);
      setState('success');
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'System Error');
      setState('error');
    }
  }, []);

  const handleReset = useCallback(() => {
    setState('idle');
    setResult(null);
    setError(null);
    setProgress({ stage: '', value: 0 });
  }, []);

  const handleRefresh = useCallback(() => {
    if (result?.user?.username) {
      runAnalysis(result.user.username, true);
    }
  }, [result, runAnalysis]);

  return (
    <div className="min-h-screen bg-[#f2f5f3] text-[#1a1f2e] selection:bg-stone-200 font-sans">
      <main className="container mx-auto px-4 py-24 max-w-6xl">
        {state === 'idle' && (
          <div className="flex flex-col items-center justify-center py-32 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="text-center space-y-16 max-w-3xl mx-auto">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-stone-200 shadow-sm mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#4b5e54] animate-pulse"></span>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em]">Farcaster Intelligence Report</span>
                </div>
                <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-[#1a1f2e] serif-heading italic">
                  PostCoach
                </h1>
                <p className="text-2xl text-stone-400 font-medium leading-relaxed max-w-xl mx-auto">
                  AI analysis of your Farcaster casts
                </p>
              </div>

              <div className="w-full max-w-lg mx-auto pt-8">
                <AnalysisForm onSubmit={runAnalysis} isLoading={false} />
              </div>

              <div className="pt-32 flex items-center justify-center gap-16 text-[10px] font-bold text-stone-300 uppercase tracking-[0.4em]">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-[1.5rem] bg-white border border-stone-100 shadow-sm flex items-center justify-center text-[#1a1f2e]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  </div>
                  <span>Audit</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-[1.5rem] bg-white border border-stone-100 shadow-sm flex items-center justify-center text-[#1a1f2e]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                  </div>
                  <span>Themes</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-[1.5rem] bg-white border border-stone-100 shadow-sm flex items-center justify-center text-[#1a1f2e]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  </div>
                  <span>Brief</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {state === 'loading' && (
          <div className="flex-1 flex flex-col items-center justify-center py-64 animate-in fade-in duration-500">
            <LoadingProgress stage={progress.stage} progress={progress.value} />
          </div>
        )}

        {state === 'error' && (
          <div className="flex-1 flex flex-col items-center justify-center py-64">
             <div className="max-w-xl text-center bg-white p-20 rounded-[3.5rem] shadow-2xl">
              <div className="w-24 h-24 rounded-[2rem] bg-rose-50 flex items-center justify-center mx-auto mb-10">
                <svg className="w-10 h-10 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-4xl font-black text-[#1a1f2e] mb-4 serif-heading italic">Audit Interrupted</h2>
              <p className="text-stone-400 mb-12 text-lg font-medium leading-relaxed">{error}</p>
              <Button
                onClick={handleReset}
                variant="primary"
                size="lg"
                className="w-full py-6 rounded-3xl"
              >
                Return to Lab
              </Button>
            </div>
          </div>
        )}

        {state === 'success' && result && (
          <AnalysisResults result={result} onReset={handleReset} onRefresh={handleRefresh} />
        )}
      </main>
    </div>
  );
}