"use client";

export default function LoadingState({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      aria-busy="true"
      aria-label="Loading trips"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-5 sm:p-6 animate-pulse space-y-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2 flex-1">
              <div className="h-6 w-3/4 bg-[var(--color-border)] rounded-md"></div>
              <div className="h-4 w-1/3 bg-[var(--color-border)] rounded-full"></div>
            </div>
            <div className="h-8 w-8 bg-[var(--color-border)] rounded-xl"></div>
          </div>

          <div className="space-y-2.5 border-t border-[var(--color-border)] pt-3">
            <div className="h-4 w-1/2 bg-[var(--color-border)] rounded"></div>
            <div className="h-4 w-3/4 bg-[var(--color-border)] rounded"></div>
            <div className="h-4 w-1/3 bg-[var(--color-border)] rounded"></div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2">
            <div className="h-5 w-16 bg-[var(--color-border)] rounded-md"></div>
            <div className="h-5 w-20 bg-[var(--color-border)] rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
}