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

function StatCard({ label, value, trend }: { label: string; value: number; trend?: string }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-stone-100">
      <div className="text-stone-400 text-xs font-medium uppercase tracking-wider mb-1">{label}</div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-[#1a1f2e] tabular-nums">{value.toLocaleString()}</span>
        {trend && <span className="text-xs text-stone-400">{trend}</span>}
      </div>
    </div>
  );
}

function MiniChart({ data, label }: { data: Array<{ date: string; count: number }>; label: string }) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl p-5 border border-stone-100">
        <div className="text-stone-700 text-sm font-semibold mb-3">{label}</div>
        <div className="text-stone-300 text-sm h-20 flex items-center">No data yet</div>
      </div>
    );
  }

  const max = Math.max(...data.map(d => d.count), 1);
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="bg-white rounded-xl p-5 border border-stone-100">
      <div className="flex items-baseline justify-between mb-4">
        <span className="text-stone-700 text-sm font-semibold">{label}</span>
        <span className="text-xs text-stone-400">{total} total</span>
      </div>
      <div className="flex items-end gap-[3px] h-16">
        {data.map((d, i) => (
          <div
            key={i}
            className="flex-1 bg-[#4b5e54] rounded-sm transition-all hover:bg-[#3d4d44] cursor-default"
            style={{
              height: `${Math.max((d.count / max) * 100, d.count > 0 ? 8 : 0)}%`,
            }}
            title={`${new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}: ${d.count}`}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-stone-300">
        <span>{data.length > 0 ? new Date(data[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}</span>
        <span>{data.length > 0 ? new Date(data[data.length - 1].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}</span>
      </div>
    </div>
  );
}

function TableCard({ title, children, emptyText }: { title: string; children: React.ReactNode; emptyText: string }) {
  return (
    <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-stone-50">
        <h3 className="text-sm font-semibold text-stone-700">{title}</h3>
      </div>
      <div className="p-5">
        {children || <div className="text-stone-300 text-sm">{emptyText}</div>}
      </div>
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
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-stone-400">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="font-medium">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-rose-500 font-medium mb-2">Failed to load dashboard</div>
          <div className="text-stone-400 text-sm">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1f2e]">Dashboard</h1>
            <p className="text-stone-400 text-sm mt-1">PostCoach analytics overview</p>
          </div>
          <a
            href="/"
            className="text-sm text-stone-400 hover:text-stone-600 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to app
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <StatCard label="Total Users" value={stats.users.total} />
          <StatCard label="Users Today" value={stats.users.today} />
          <StatCard label="This Week" value={stats.users.thisWeek} />
          <StatCard label="Total Analyses" value={stats.analyses.total} />
          <StatCard label="Today" value={stats.analyses.today} />
          <StatCard label="This Week" value={stats.analyses.thisWeek} />
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <MiniChart data={stats.charts.signupsByDay} label="User Signups" />
          <MiniChart data={stats.charts.analysesByDay} label="Analyses Run" />
        </div>

        {/* Tables */}
        <div className="grid md:grid-cols-3 gap-4">
          <TableCard title="Recent Signups" emptyText="No signups yet">
            {stats.recentSignups.length > 0 && (
              <div className="space-y-3">
                {stats.recentSignups.slice(0, 8).map((user, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {user.pfpUrl ? (
                      <img src={user.pfpUrl} alt="" className="w-8 h-8 rounded-full bg-stone-100" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 text-xs font-medium">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-[#1a1f2e] truncate">@{user.username}</div>
                      <div className="text-xs text-stone-400">
                        {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TableCard>

          <TableCard title="Most Analyzed" emptyText="No analyses yet">
            {stats.topAnalyzedAccounts.length > 0 && (
              <div className="space-y-2">
                {stats.topAnalyzedAccounts.slice(0, 8).map((account, i) => (
                  <div key={i} className="flex items-center justify-between py-1">
                    <span className="text-sm text-[#1a1f2e] truncate">
                      @{account.username || account.fid}
                    </span>
                    <span className="text-xs font-medium text-stone-400 bg-stone-50 px-2 py-0.5 rounded">
                      {account.count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </TableCard>

          <TableCard title="Most Active Users" emptyText="No activity yet">
            {stats.topActiveUsers.filter(u => u.analysisCount > 0).length > 0 ? (
              <div className="space-y-3">
                {stats.topActiveUsers.filter(u => u.analysisCount > 0).slice(0, 8).map((user, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {user.pfpUrl ? (
                      <img src={user.pfpUrl} alt="" className="w-8 h-8 rounded-full bg-stone-100" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 text-xs font-medium">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-[#1a1f2e] truncate">@{user.username}</div>
                    </div>
                    <span className="text-xs font-medium text-stone-400 bg-stone-50 px-2 py-0.5 rounded">
                      {user.analysisCount}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-stone-300 text-sm">No activity yet</div>
            )}
          </TableCard>
        </div>
      </div>
    </div>
  );
}
