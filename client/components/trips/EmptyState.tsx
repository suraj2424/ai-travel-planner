"use client";

import Button from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title = "No trips yet",
  description = "Start planning your next adventure by creating your first trip.",
  actionLabel = "Create Trip",
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12 sm:py-16 px-4">
      <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-[var(--color-brand-50)] dark:bg-[var(--color-brand-900)]/30 flex items-center justify-center text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]">
        {icon || (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        )}
      </div>
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">{title}</h3>
      <p className="text-[var(--color-text-secondary)] mb-6 max-w-sm mx-auto">{description}</p>
      {onAction && (
        <Button variant="primary" onClick={onAction} className="px-6 py-3 text-base">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}