"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right" | "side" | "top";
  width?: string;
  className?: string;
}

export default function Dropdown({
  trigger,
  children,
  align = "right",
  width = "w-56",
  className = "relative inline-block",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const alignClasses =
    align === "top"
      ? "bottom-full mb-2 left-0"
      : align === "side"
      ? "left-full bottom-0 ml-3"
      : align === "right"
      ? "right-0 top-full mt-2"
      : "left-0 top-full mt-2";

  return (
    <div ref={dropdownRef} className={className}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer select-none w-full"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" aria-hidden="true" onClick={() => setIsOpen(false)} />
          <div
            className={`z-50 absolute ${alignClasses} ${width} rounded-2xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] shadow-[var(--shadow-card-hover)] py-1.5 animate-in fade-in-0 zoom-in-95 duration-150`}
            role="menu"
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
}

export function DropdownItem({
  children,
  onClick,
  className = "",
  disabled = false,
  destructive = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  destructive?: boolean;
}) {
  return (
    <button
      onClick={() => !disabled && onClick?.()}
      disabled={disabled}
      role="menuitem"
      className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-2.5 transition-colors ${
        destructive
          ? "text-red-600 dark:text-red-400 hover:bg-red-500/10"
          : "text-[var(--color-text-primary)] hover:bg-[var(--color-surface-muted)]"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

export function DropdownDivider() {
  return <hr className="my-1.5 border-[var(--color-border)]" role="separator" />;
}

export function DropdownLabel({ children }: { children: ReactNode }) {
  return (
    <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
      {children}
    </div>
  );
}