'use client';

interface StatProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}

export function Stat({ label, value, subValue, trend, icon }: StatProps) {
  const trendColors = {
    up: 'text-emerald-600',
    down: 'text-rose-600',
    neutral: 'text-slate-400',
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-3xl font-extrabold text-slate-800 tracking-tight">
        {value}
      </div>
      {subValue && (
        <div className={`text-sm mt-1 ${trend ? trendColors[trend] : 'text-zinc-500 dark:text-zinc-400'}`}>
          {trend === 'up' && '↑ '}
          {trend === 'down' && '↓ '}
          {subValue}
        </div>
      )}
    </div>
  );
}

export function StatGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {children}
    </div>
  );
}
