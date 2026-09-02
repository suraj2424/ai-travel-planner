"use client";

import { useState } from "react";
import { Search, Mountain, Sun, Landmark, Gem, Wallet } from "lucide-react";
import TripList from "@/components/trips/TripList";
import Select from "@/components/ui/select";

const FILTER_STYLES = [
  { value: "ADVENTURE", label: "Adventure", icon: <Mountain className="w-4 h-4" /> },
  { value: "RELAXED", label: "Relaxed", icon: <Sun className="w-4 h-4" /> },
  { value: "CULTURAL", label: "Cultural", icon: <Landmark className="w-4 h-4" /> },
  { value: "LUXURY", label: "Luxury", icon: <Gem className="w-4 h-4" /> },
  { value: "BUDGET", label: "Budget", icon: <Wallet className="w-4 h-4" /> },
];

export default function TripPageContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [styleFilter, setStyleFilter] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[var(--color-border)] pb-4 sm:pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
            My Trips
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-tertiary)] mt-0.5">
            Plan, track, and manage your travel itineraries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destinations..."
              className="w-full h-10 pl-9 pr-4 text-sm rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-500)]/20 focus:border-[var(--color-brand-500)] transition-colors"
            />
            <Search className="w-4 h-4 absolute left-3 top-3 text-[var(--color-text-tertiary)] pointer-events-none" />
          </div>

          <div className="w-40">
            <Select
              value={styleFilter}
              onChange={(e) => setStyleFilter(e.target.value)}
              options={FILTER_STYLES}
              placeholder="All Styles"
              size="sm"
            />
          </div>
        </div>
      </div>

      <section aria-live="polite">
        <TripList
          searchQuery={searchQuery}
          styleFilter={styleFilter}
        />
      </section>
    </div>
  );
}
