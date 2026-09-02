"use client";

import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "theme";

/* ────────────────────────────────────────────────────────────────
   External store #1: the user's preference, persisted to localStorage.
   Module-level state + subscribe/getSnapshot is exactly what
   useSyncExternalStore is designed for — no useEffect, no setState.
   ──────────────────────────────────────────────────────────────── */

let preference: Theme = "system";
const preferenceListeners = new Set<() => void>();

function readStoredPreference(): Theme {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" || stored === "system"
      ? stored
      : "system";
  } catch {
    return "system";
  }
}

// Initialise once, on the client only (module evaluates before hydration).
if (typeof window !== "undefined") {
  preference = readStoredPreference();
}

function subscribePreference(onStoreChange: () => void) {
  preferenceListeners.add(onStoreChange);

  // Sync across tabs/windows.
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      preference = readStoredPreference();
      onStoreChange();
    }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    preferenceListeners.delete(onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getPreferenceSnapshot(): Theme {
  return preference;
}

function getPreferenceServerSnapshot(): Theme {
  return "system"; // SSR + first hydration pass
}

function setPreference(next: Theme) {
  preference = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* storage unavailable (private mode, etc.) — state still works */
  }
  preferenceListeners.forEach((listener) => listener());
}

/* ────────────────────────────────────────────────────────────────
   External store #2: the OS color-scheme preference.
   ──────────────────────────────────────────────────────────────── */

function subscribeSystemTheme(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getSystemThemeSnapshot(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getSystemThemeServerSnapshot(): ResolvedTheme {
  return "light"; // SSR + first hydration pass
}

/* ──────────────────────────────────────────────────────────────── */

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribePreference,
    getPreferenceSnapshot,
    getPreferenceServerSnapshot
  );
  const systemTheme = useSyncExternalStore(
    subscribeSystemTheme,
    getSystemThemeSnapshot,
    getSystemThemeServerSnapshot
  );

  // Derived during render — no state, no effect, always consistent.
  const resolvedTheme: ResolvedTheme =
    theme === "system" ? systemTheme : theme;

  // Pure external-system sync: push the resolved theme onto <html>.
  // No setState here, so no cascading renders. Re-runs whenever
  // resolvedTheme changes — including OS changes while in "system".
  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, [resolvedTheme]);

  const setTheme = useCallback((t: Theme) => setPreference(t), []);

  const toggleTheme = useCallback(() => {
    // Toggle against what the user actually sees, and pin an explicit choice.
    setPreference(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
