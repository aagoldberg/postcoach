'use client';

import { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, Badge } from '@/components/ui';
import type { UserMetrics, ThemeCluster } from '@/types';

interface ScoreboardProps {
  metrics: UserMetrics;
  topTheme: ThemeCluster | null;
}

function InfoTip({ text }: { text: string }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block ml-1.5">
      <button
        onClick={() => setShow(!show)}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="w-4 h-4 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-400 hover:text-stone-500 text-[10px] font-bold transition-colors flex items-center justify-center"
      >
        ?
      </button>
      {show && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-[#1a1f2e] text-white text-xs rounded-xl shadow-xl animate-in fade-in zoom-in-95 duration-200">
          <p className="leading-relaxed">{text}</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#1a1f2e]" />
        </div>
      )}
    </div>
  );
}

export function Scoreboard({ metrics, topTheme }: ScoreboardProps) {
  return (
    <Card className="h-full border-none shadow-[0_20px_40px_-12px_rgba(0,0,0,0.06)] bg-white overflow-hidden">
      <CardHeader className="pb-0 border-none px-6 md:px-8 pt-6 md:pt-8">
        <CardTitle className="text-xl md:text-2xl serif-heading italic">Performance</CardTitle>
      </CardHeader>
      <CardContent className="p-6 md:p-8 pt-4 md:pt-6 space-y-6">
        
        {/* Key Metrics List */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex justify-between items-baseline pb-4 border-b border-stone-100">
            <span className="text-stone-400 font-medium text-sm flex items-center">
              Reply rate
              <InfoTip text="Percentage of your posts that received at least one reply. Higher = your content sparks conversation." />
            </span>
            <div className="text-right">
              <span className="block text-2xl md:text-3xl font-black text-[#1a1f2e] tracking-tighter">
                {(metrics.replyRate * 100).toFixed(0)}%
              </span>
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">of posts</span>
            </div>
          </div>

          {metrics.reciprocityRate !== null && (
            <div className="flex justify-between items-baseline pb-4 border-b border-stone-100">
              <span className="text-stone-400 font-medium text-sm flex items-center">
                Reciprocity
                <InfoTip text="Of people you've replied to, what % replied back to you? Measures two-way relationships, not just broadcast reach." />
              </span>
              <div className="text-right">
                <span className="block text-2xl md:text-3xl font-black text-[#1a1f2e] tracking-tighter">
                  {(metrics.reciprocityRate * 100).toFixed(0)}%
                </span>
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">mutual convos</span>
              </div>
            </div>
          )}

          <div className="flex justify-between items-baseline pb-4 border-b border-stone-100">
            <span className="text-stone-400 font-medium text-sm flex items-center">
              Return rate
              <InfoTip text="What % of your repliers come back to reply again? High = you're building a loyal community, not just one-time visitors." />
            </span>
            <div className="text-right">
              <span className="block text-2xl md:text-3xl font-black text-[#1a1f2e] tracking-tighter">
                {(metrics.repeatReplierRate * 100).toFixed(0)}%
              </span>
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">loyalty</span>
            </div>
          </div>

          <div className="flex justify-between items-baseline pb-4 border-b border-stone-100">
            <span className="text-stone-400 font-medium text-sm flex items-center">
              Avg Score
              <InfoTip text="Median engagement per post. Calculated as: replies×3 + recasts×2 + likes×1. Replies weighted highest because they signal real interest." />
            </span>
            <div className="text-right">
              <span className="block text-2xl md:text-3xl font-black text-[#1a1f2e] tracking-tighter">
                {metrics.medianEngagementScore.toFixed(0)}
              </span>
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">per cast</span>
            </div>
          </div>

          {metrics.engagementTrend != null && (
            <div className="flex justify-between items-baseline pb-4 border-b border-stone-100">
              <span className="text-stone-400 font-medium text-sm flex items-center">
                Trend
                <InfoTip text="Is your engagement improving or declining over time? Based on linear regression of your recent posts." />
              </span>
              <div className="text-right">
                <span className={`block text-2xl md:text-3xl font-black tracking-tighter ${metrics.engagementTrend >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {metrics.engagementTrend >= 0 ? '↑' : '↓'} {Math.abs(metrics.engagementTrend * 100).toFixed(0)}%
                </span>
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                  {metrics.engagementTrend >= 0 ? 'improving' : 'declining'}
                </span>
              </div>
            </div>
          )}

          {metrics.bestPostingHour != null && (
            <div className="flex justify-between items-baseline pb-4 border-b border-stone-100">
              <span className="text-stone-400 font-medium text-sm flex items-center">
                Best Hour
                <InfoTip text="The hour (UTC) when your posts get the highest average engagement. Try posting more at this time." />
              </span>
              <div className="text-right">
                <span className="block text-2xl md:text-3xl font-black text-[#1a1f2e] tracking-tighter">
                  {String(metrics.bestPostingHour).padStart(2, '0')}:00
                </span>
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">UTC</span>
              </div>
            </div>
          )}
        </div>

        {/* Top Topic - Simplified */}
        {topTheme && (
          <div className="pt-2 md:pt-4">
            <span className="text-[10px] font-bold text-stone-300 uppercase tracking-[0.2em] block mb-4">
              Best Performing Topic
            </span>
            <div className="bg-surface-subtle rounded-2xl p-4 md:p-6 flex flex-col gap-3">
              <p className="text-base md:text-lg font-bold text-[#1a1f2e] leading-snug">
                {topTheme.label}
              </p>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-bold text-success-bold uppercase tracking-wider">
                  {topTheme.avgEngagement.toFixed(0)} Avg Score
                </span>
              </div>
            </div>
          </div>
        )}

      </CardContent>
    </Card>
  );
}
