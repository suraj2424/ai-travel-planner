"use client";

import { useRef, ReactNode } from "react";
import { Calendar as CalendarIcon } from "lucide-react";

export interface DateInputProps {
  label: string;
  id: string;
  name?: string;
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  min?: string;
  max?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  labelTrailing?: ReactNode;
  className?: string;
}

export default function DateInput({
  label,
  id,
  name,
  value,
  onChange,
  error,
  hint,
  min,
  max,
  placeholder = "Select date",
  required = false,
  disabled = false,
  labelTrailing,
  className = "",
}: DateInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Format YYYY-MM-DD into readable date (e.g. "28 Aug 2026")
  const formattedDisplay = value
    ? new Date(value + "T00:00:00").toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  const handleContainerClick = () => {
    if (disabled) return;
    if (inputRef.current) {
      inputRef.current.focus();
      try {
        inputRef.current.showPicker();
      } catch {
        // Fallback for browsers that don't support showPicker
      }
    }
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] cursor-pointer"
          onClick={handleContainerClick}
        >
          {label}
        </label>
        {labelTrailing}
      </div>

      <div
        onClick={handleContainerClick}
        className={`relative flex items-center justify-between rounded-xl border bg-[var(--color-surface)] px-4 py-3 text-[15px] text-[var(--color-text-primary)] transition-all duration-150 cursor-pointer focus-within:ring-2 ${
          error
            ? "border-red-400 focus-within:ring-red-400/20"
            : "border-[var(--color-border)] hover:border-[var(--color-brand-500)]/40 focus-within:border-[var(--color-brand-500)] focus-within:ring-[var(--color-brand-500)]/20"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {/* Visual formatted date text */}
        <span
          className={`truncate ${
            !formattedDisplay ? "text-[var(--color-text-tertiary)]/70" : "font-medium"
          }`}
        >
          {formattedDisplay || placeholder}
        </span>

        <CalendarIcon className="w-4 h-4 text-[var(--color-text-tertiary)] shrink-0 ml-2 pointer-events-none" />

        {/* Invisible native date input overlaid for native picker accessibility */}
        <input
          ref={inputRef}
          type="date"
          id={id}
          name={name}
          value={value}
          min={min}
          max={max}
          required={required}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
        />
      </div>

      {error ? (
        <p className="text-xs text-red-500">{error}</p>
      ) : hint ? (
        <p className="text-xs text-[var(--color-text-tertiary)]">{hint}</p>
      ) : null}
    </div>
  );
}
