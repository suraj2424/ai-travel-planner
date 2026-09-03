"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Gem,
  Globe,
  Landmark,
  Mountain,
  Plus,
  Search,
  Sun,
  Wallet,
  X,
} from "lucide-react";
import TripList from "@/components/trips/TripList";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const STYLE_FILTERS = [
  { value: "", label: "All Styles", icon: <Globe className="h-3.5 w-3.5" /> },
  {
    value: "ADVENTURE",
    label: "Adventure",
    icon: <Mountain className="h-3.5 w-3.5" />,
  },
  { value: "RELAXED", label: "Relaxed", icon: <Sun className="h-3.5 w-3.5" /> },
  {
    value: "CULTURAL",
    label: "Cultural",
    icon: <Landmark className="h-3.5 w-3.5" />,
  },
  { value: "LUXURY", label: "Luxury", icon: <Gem className="h-3.5 w-3.5" /> },
  {
    value: "BUDGET",
    label: "Budget",
    icon: <Wallet className="h-3.5 w-3.5" />,
  },
];

export default function TripPageContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [styleFilter, setStyleFilter] = useState("");

  const clearFilters = () => {
    setSearchQuery("");
    setStyleFilter("");
  };

  return (
    <div className="space-y-4">
      {/* page header */}
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="mt-1 text-xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-2xl">
            My Trips
          </h1>
          <p className="mt-0.5 text-xs text-[var(--color-text-tertiary)] sm:text-[13px]">
            Plan, track, and manage your travel itineraries.
          </p>
        </div>

        <Link
          href="/trips/new"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-600)] px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[var(--color-brand-700)] hover:shadow-lg hover:shadow-[var(--color-brand-600)]/25 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-2"
        >
          <Plus className="h-3.5 w-3.5" />
          Plan New Trip
        </Link>
      </header>

      {/* sticky glass toolbar */}
      <div className="sticky top-3 z-20 flex flex-col gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)]/80 p-2 shadow-lg shadow-black/5 backdrop-blur-xl md:flex-row md:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search destinations…"
            aria-label="Search destinations"
            className="h-9 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] pl-8 pr-8 text-[13px] font-medium text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] transition-colors focus:border-[var(--color-brand-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-500)]/20"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-[var(--color-text-tertiary)] transition-colors hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div
          aria-hidden="true"
          className="hidden h-6 w-px bg-[var(--color-border)] md:block"
        />

        <div
          className="flex gap-1.5 overflow-x-auto pb-0.5 md:pb-0"
          aria-label="Filter by travel style"
        >
          {STYLE_FILTERS.map((filter) => (
            <button
              key={filter.value || "all"}
              type="button"
              onClick={() => setStyleFilter(filter.value)}
              aria-pressed={styleFilter === filter.value}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200",
                styleFilter === filter.value
                  ? "bg-[var(--color-brand-600)] text-white shadow-md shadow-[var(--color-brand-600)]/25"
                  : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)]",
              )}
            >
              {filter.icon}
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <section aria-live="polite">
        <TripList
          searchQuery={searchQuery}
          styleFilter={styleFilter}
          onClearFilters={clearFilters}
        />
      </section>
    </div>
  );
}
