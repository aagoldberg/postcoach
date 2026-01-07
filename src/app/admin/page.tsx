'use client';

import { useState, useEffect } from 'react';

interface AdminStats {
  users: {
    total: number;
    today: number;
    thisWeek: number;
  };
  analyses: {
    total: number;
    today: number;
    thisWeek: number;
  };
  topAnalyzedAccounts: Array<{
    username: string | null;
    fid: number;
    count: number;
  }>;
  topActiveUsers: Array<{
    username: string;
    fid: number;
    pfpUrl: string | null;
    analysisCount: number;
  }>;
  recentSignups: Array<{
    username: string;
    fid: number;
    pfpUrl: string | null;
    createdAt: string;
  }>;
  charts: {
    signupsByDay: Array<{ date: string; count: number }>;
    analysesByDay: Array<{ date: string; count: number }>;
  };
}

function StatCard({ label, value, subValue }: { label: string; value: number; subValue?: string }) {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
      <div className="text-stone-400 text-sm font-medium uppercase tracking-wider mb-2">{label}</div>
      <div className="text-4xl font-black text-[#1a1f2e] tracking-tight">{value.toLocaleString()}</div>
      {subValue && <div className="text-stone-400 text-sm mt-1">{subValue}</div>}
    </div>
  );
}

function MiniChart({ data, color }: { data: Array<{ date: string; count: number }>; color: string }) {
  if (data.length === 0) return <div className="text-stone-300 text-sm">No data yet</div>;

  const max = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((d, i) => (
        <div
          key={i}
          className="flex-1 rounded-t transition-all hover:opacity-80"
          style={{
            backgroundColor: color,
            height: `${(d.count / max) * 100}%`,
            minHeight: d.count > 0 ? '4px' : '0',
          }}
          title={`${d.date}: ${d.count}`}
        />
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/admin/stats');
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch stats');
        }

        setStats(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f2f5f3] flex items-center justify-center">
        <div className="text-stone-400 font-medium">Loading stats...</div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen bg-[#f2f5f3] flex items-center justify-center">
        <div className="text-rose-500 font-medium">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f5f3]">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border bg-white border-stone-200 text-stone-400 shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Admin Dashboard</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-[#1a1f2e] italic serif-heading">
            PostCoach Stats
          </h1>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          <StatCard label="Total Users" value={stats.users.total} />
          <StatCard label="Users Today" value={stats.users.today} />
          <StatCard label="Users This Week" value={stats.users.thisWeek} />
          <StatCard label="Total Analyses" value={stats.analyses.total} />
          <StatCard label="Analyses Today" value={stats.analyses.today} />
          <StatCard label="This Week" value={stats.analyses.thisWeek} />
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#1a1f2e] mb-4">Signups (Last 30 Days)</h3>
            <MiniChart data={stats.charts.signupsByDay} color="#4b5e54" />
          </div>
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#1a1f2e] mb-4">Analyses (Last 30 Days)</h3>
            <MiniChart data={stats.charts.analysesByDay} color="#00f0ff" />
          </div>
        </div>

        {/* Tables */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Recent Signups */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#1a1f2e] mb-4">Recent Signups</h3>
            <div className="space-y-3">
              {stats.recentSignups.length === 0 ? (
                <div className="text-stone-300 text-sm">No signups yet</div>
              ) : (
                stats.recentSignups.map((user, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {user.pfpUrl ? (
                      <img src={user.pfpUrl} alt="" className="w-8 h-8 rounded-full" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-stone-200" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-[#1a1f2e] truncate">@{user.username}</div>
                      <div className="text-xs text-stone-400">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Top Analyzed Accounts */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#1a1f2e] mb-4">Most Analyzed</h3>
            <div className="space-y-3">
              {stats.topAnalyzedAccounts.length === 0 ? (
                <div className="text-stone-300 text-sm">No analyses yet</div>
              ) : (
                stats.topAnalyzedAccounts.map((account, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="font-medium text-[#1a1f2e]">
                      @{account.username || account.fid}
                    </span>
                    <span className="text-sm font-bold text-stone-400">{account.count}x</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Most Active Users */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#1a1f2e] mb-4">Most Active Users</h3>
            <div className="space-y-3">
              {stats.topActiveUsers.length === 0 ? (
                <div className="text-stone-300 text-sm">No users yet</div>
              ) : (
                stats.topActiveUsers.map((user, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {user.pfpUrl ? (
                      <img src={user.pfpUrl} alt="" className="w-8 h-8 rounded-full" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-stone-200" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-[#1a1f2e] truncate">@{user.username}</div>
                    </div>
                    <span className="text-sm font-bold text-stone-400">
                      {user.analysisCount} analyses
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-stone-300 text-sm">
          <a href="/" className="hover:text-stone-500 transition-colors">
            ← Back to PostCoach
          </a>
        </div>
      </div>
    </div>
  );
}
