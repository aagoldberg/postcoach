'use client';

interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
}

export function Progress({
  value,
  max = 100,
  label,
  showPercentage = false,
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between mb-2">
          {label && (
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#4f46e5] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function LoadingProgress({ stage, progress }: { stage: string; progress: number }) {
  return (
    <div className="w-full max-w-lg mx-auto space-y-8">
      <Progress value={progress} />
      <div className="text-center space-y-2">
        <p className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.3em]">
          Current Phase: {Math.round(progress)}% Complete
        </p>
        <p className="text-2xl text-[#1a1f2e] serif-heading animate-pulse">
          {stage}
        </p>
      </div>
    </div>
  );
}
