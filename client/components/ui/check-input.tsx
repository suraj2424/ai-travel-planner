"use client";

import { Check } from "lucide-react";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

export interface CheckInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  id: string;
  error?: string;
  hint?: string;
  labelTrailing?: ReactNode;
}

const CheckInput = forwardRef<HTMLInputElement, CheckInputProps>(
  (
    {
      label,
      id,
      error,
      hint,
      labelTrailing,
      className = "",
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-1.5">
        <div className="flex items-start justify-between">
          <label
            htmlFor={id}
            className="flex items-start gap-2 cursor-pointer"
          >
            <div className="relative flex items-center justify-center flex-shrink-0">
              <input
                ref={ref}
                type="checkbox"
                id={id}
                disabled={disabled}
                className={`peer h-4 w-4 rounded border-2 appearance-none cursor-pointer transition-all duration-200 ${
                  error
                    ? "border-red-400"
                    : "border-[var(--color-border)]"
                } checked:border-[var(--color-brand-600)] checked:bg-[var(--color-brand-600)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)]/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
                aria-invalid={!!error}
                {...props}
              />
              <Check
                className="absolute w-3 h-3 text-white opacity-0 scale-50 peer-checked:opacity-100 peer-checked:scale-100 transition-all duration-200 pointer-events-none"
                aria-hidden="true"
              />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] peer-disabled:opacity-50">
              {label}
            </span>
          </label>
          {labelTrailing}
        </div>

        {(error || hint) && (
          <div className="ml-6">
            {error ? (
              <p className="text-xs text-red-500">{error}</p>
            ) : hint ? (
              <p className="text-xs text-[var(--color-text-tertiary)]">{hint}</p>
            ) : null}
          </div>
        )}
      </div>
    );
  }
);

CheckInput.displayName = "CheckInput";

export default CheckInput;