"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      className="relative flex items-center justify-center w-10 h-10 rounded-full 
                 border border-[var(--color-border)] bg-[var(--color-surface-elevated)] 
                 text-[var(--color-text-secondary)] hover:text-[var(--color-brand-600)] 
                 hover:border-[var(--color-brand-500)] transition-all duration-200 active:scale-95"
    >
      <Sun className={`w-5 h-5 absolute transition-all duration-300 ${resolvedTheme === "dark" ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"}`} />
      <Moon className={`w-5 h-5 absolute transition-all duration-300 ${resolvedTheme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"}`} />
    </button>
  );
}