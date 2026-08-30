"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

export interface SelectProps {
  label?: string;
  id?: string;
  name?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (e: { target: { value: string; name?: string } }) => void;
  error?: string;
  hint?: string;
  placeholder?: string;
  labelTrailing?: ReactNode;
  className?: string;
  buttonClassName?: string;
  disabled?: boolean;
  size?: "sm" | "md";
}

export default function Select({
  label,
  id,
  name,
  options,
  value = "",
  onChange,
  error,
  hint,
  placeholder = "Select an option...",
  labelTrailing,
  className = "",
  buttonClassName = "",
  disabled = false,
  size = "md",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (val: string) => {
    if (disabled) return;
    onChange?.({ target: { value: val, name } });
    setIsOpen(false);
  };

  const sizeClasses =
    size === "sm"
      ? "h-11 px-3.5 text-sm"
      : "h-12 px-4 text-[15px]";

  return (
    <div className={`space-y-1.5 ${className}`} ref={selectRef}>
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={id}
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] cursor-pointer"
            onClick={() => !disabled && setIsOpen(!isOpen)}
          >
            {label}
          </label>
          {labelTrailing}
        </div>
      )}

      <div className="relative">
        {/* Trigger Box */}
        <button
          type="button"
          id={id}
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between rounded-xl border bg-[var(--color-surface)] ${sizeClasses} text-[var(--color-text-primary)] transition-all duration-150 focus:outline-none focus:ring-2 cursor-pointer ${
            error
              ? "border-red-400 focus:ring-red-400/20"
              : "border-[var(--color-border)] hover:border-[var(--color-brand-500)]/40 focus:border-[var(--color-brand-500)] focus:ring-[var(--color-brand-500)]/20"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${buttonClassName}`}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <div className="flex items-center gap-2 min-w-0 truncate">
            {selectedOption?.icon && (
              <span className="shrink-0 text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]">
                {selectedOption.icon}
              </span>
            )}
            <span className={`truncate ${!selectedOption ? "text-[var(--color-text-tertiary)]/70" : ""}`}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-[var(--color-text-tertiary)] transition-transform duration-200 shrink-0 ml-2 ${
              isOpen ? "rotate-180 text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]" : ""
            }`}
          />
        </button>

        {/* Custom Popover Dropdown Menu */}
        {isOpen && (
          <div
            role="listbox"
            className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] shadow-[var(--shadow-card-hover)] py-1.5 max-h-60 overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-150 space-y-0.5"
          >
            {placeholder && (
              <button
                type="button"
                role="option"
                aria-selected={value === ""}
                onClick={() => handleSelect("")}
                className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors cursor-pointer ${
                  value === ""
                    ? "bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[var(--color-brand-900)]/40 dark:text-[var(--color-brand-300)] font-semibold"
                    : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                <span>{placeholder}</span>
                {value === "" && (
                  <Check className="w-4 h-4 text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] shrink-0 ml-2" />
                )}
              </button>
            )}

            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[var(--color-brand-900)]/40 dark:text-[var(--color-brand-300)] font-semibold"
                      : "text-[var(--color-text-primary)] hover:bg-[var(--color-surface-muted)]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 truncate">
                    {opt.icon && (
                      <span className={`shrink-0 ${isSelected ? "text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]" : "text-[var(--color-text-tertiary)]"}`}>
                        {opt.icon}
                      </span>
                    )}
                    <span className="truncate">{opt.label}</span>
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
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
