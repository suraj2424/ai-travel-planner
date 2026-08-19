import { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  hint?: string;
  labelTrailing?: ReactNode;
  trailing?: ReactNode;
}

export default function Input({
  label,
  id,
  error,
  hint,
  labelTrailing,
  trailing,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]"
        >
          {label}
        </label>
        {labelTrailing}
      </div>

      <div className="relative">
        <input
          id={id}
          className={`w-full rounded-xl border bg-[var(--color-surface)] px-4 py-3 text-[15px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]/60 transition-colors focus:outline-none focus:ring-2 ${
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
              : "border-[var(--color-border)] focus:border-[var(--color-brand-500)] focus:ring-[var(--color-brand-500)]/20"
          } ${trailing ? "pr-12" : ""} ${className}`}
          aria-invalid={!!error}
          {...props}
        />
        {trailing && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            {trailing}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs text-red-500">{error}</p>
      ) : hint ? (
        <p className="text-xs text-[var(--color-text-tertiary)]">{hint}</p>
      ) : null}
    </div>
  );
}