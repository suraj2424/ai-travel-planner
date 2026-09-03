"use client";

import { useGetTripsQuery, useDeleteTripMutation, Trip } from "@/services/api";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Calendar,
  Gem,
  IndianRupee,
  Landmark,
  Loader2,
  MapPin,
  Mountain,
  Sun,
  Trash2,
  Users,
  Wallet,
} from "lucide-react";
import type { ReactNode } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ------------------------------ style theming ------------------------------ */

type StyleMeta = {
  label: string;
  icon: ReactNode;
  bar: string;
  tile: string;
  chip: string;
};

const STYLE_META: Record<string, StyleMeta> = {
  ADVENTURE: {
    label: "Adventure",
    icon: <Mountain className="h-3 w-3" />,
    bar: "from-red-500 to-orange-400",
    tile: "bg-red-500/10 text-red-500",
    chip: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  },
  RELAXED: {
    label: "Relaxed",
    icon: <Sun className="h-3 w-3" />,
    bar: "from-amber-400 to-yellow-300",
    tile: "bg-amber-500/10 text-amber-500",
    chip: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  CULTURAL: {
    label: "Cultural",
    icon: <Landmark className="h-3 w-3" />,
    bar: "from-blue-500 to-cyan-400",
    tile: "bg-blue-500/10 text-blue-500",
    chip: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  LUXURY: {
    label: "Luxury",
    icon: <Gem className="h-3 w-3" />,
    bar: "from-purple-500 to-fuchsia-400",
    tile: "bg-purple-500/10 text-purple-500",
    chip: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
  BUDGET: {
    label: "Budget",
    icon: <Wallet className="h-3 w-3" />,
    bar: "from-emerald-500 to-teal-400",
    tile: "bg-emerald-500/10 text-emerald-500",
    chip: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  DEFAULT: {
    label: "Custom",
    icon: <MapPin className="h-3 w-3" />,
    bar: "from-[var(--color-brand-500)] to-[var(--color-accent-500)]",
    tile: "bg-[var(--color-brand-500)]/10 text-[var(--color-brand-500)]",
    chip: "bg-[var(--color-brand-500)]/10 text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] border-[var(--color-brand-500)]/20",
  },
};

function getStyleMeta(style?: string | null): StyleMeta {
  if (!style) return STYLE_META.DEFAULT;
  return STYLE_META[style.toUpperCase()] ?? STYLE_META.DEFAULT;
}

function formatShortDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/* -------------------------------- trip card -------------------------------- */

function TripCard({
  trip,
  onDelete,
  isDeleting,
}: {
  trip: Trip;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}) {
  const meta = getStyleMeta(trip.travelStyle);
  const interests = trip.interests ?? [];
  const dateRange =
    trip.startDate && trip.endDate
      ? `${formatShortDate(trip.startDate)} – ${formatShortDate(trip.endDate)}`
      : null;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-brand-500)]/40 hover:shadow-xl hover:shadow-[var(--color-brand-500)]/10">
      
      <div className="flex flex-1 flex-col p-4">
        {/* header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                meta.tile
              )}
            >
              <MapPin className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <h3 className="truncate text-sm font-bold text-[var(--color-text-primary)]">
                {trip.destination}
              </h3>
              {dateRange && (
                <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[var(--color-text-tertiary)]">
                  <Calendar className="h-3 w-3" />
                  {dateRange}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            aria-label={`Delete trip to ${trip.destination}`}
            onClick={(event) => {
              event.stopPropagation();
              onDelete(trip.id);
            }}
            disabled={isDeleting}
            className="rounded-lg p-1.5 text-[var(--color-text-tertiary)] opacity-0 transition-all hover:bg-red-500/10 hover:text-red-500 focus-visible:opacity-100 group-hover:opacity-100 disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        {/* meta chips */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold",
              meta.chip
            )}
          >
            {meta.icon}
            {meta.label}
          </span>
          {typeof trip.travellers === "number" && (
            <span className="inline-flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-text-secondary)]">
              <Users className="h-3 w-3" />
              {trip.travellers}
            </span>
          )}
          {typeof trip.budget === "number" && trip.budget > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]">
              <IndianRupee className="h-3 w-3" />
              {trip.budget.toLocaleString()}
            </span>
          )}
        </div>

        {/* interests */}
        {interests.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1">
            {interests.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]"
              >
                {tag}
              </span>
            ))}
            {interests.length > 4 && (
              <span className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-1.5 py-0.5 text-[9px] font-semibold text-[var(--color-text-tertiary)]">
                +{interests.length - 4}
              </span>
            )}
          </div>
        )}

        {/* footer */}
        <div className="mt-auto flex items-center justify-between border-t border-dashed border-[var(--color-border)] pt-3 [margin-top:auto]">
          <span className="pt-0 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
            {meta.label} trip
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-brand-600)] opacity-0 transition-opacity group-hover:opacity-100 dark:text-[var(--color-brand-400)]">
            View itinerary
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </article>
  );
}

/* --------------------------------- trip list ------------------------------- */

interface TripListProps {
  searchQuery?: string;
  styleFilter?: string;
  onClearFilters?: () => void;
}

export default function TripList({
  searchQuery = "",
  styleFilter = "",
  onClearFilters,
}: TripListProps) {
  const { data, isLoading, error } = useGetTripsQuery({ page: 1, limit: 50 });
  const [deleteTrip, { isLoading: isDeleting }] = useDeleteTripMutation();
  const router = useRouter();

  if (isLoading) return <LoadingState count={6} />;

  if (error) {
    return (
      <EmptyState
        title="Unable to load trips"
        description="Something went wrong while fetching your trips. Please try again."
        actionLabel="Retry"
        onAction={() => window.location.reload()}
      />
    );
  }

  const allTrips: Trip[] = data?.data || [];

  const filteredTrips = allTrips.filter((trip) => {
    const matchesSearch = searchQuery
      ? trip.destination.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesStyle = styleFilter
      ? trip.travelStyle?.toUpperCase() === styleFilter.toUpperCase()
      : true;
    return matchesSearch && matchesStyle;
  });

  if (allTrips.length === 0) {
    return (
      <EmptyState
        title="No trips yet"
        description="Start planning your next adventure by creating your first trip."
        actionLabel="Create Trip"
        onAction={() => router.push("/trips/new")}
      />
    );
  }

  if (filteredTrips.length === 0) {
    return (
      <EmptyState
        title="No matching trips found"
        description="Try adjusting your search query or travel style filter."
        {...(onClearFilters ? { actionLabel: "Clear Filters", onAction: onClearFilters } : {})}
      />
    );
  }

  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      role="list"
      aria-label="Your trips"
    >
      {filteredTrips.map((trip, index) => (
        <div
          key={trip.id}
          role="link"
          tabIndex={0}
          onClick={() => router.push(`/trips/${trip.id}`)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              router.push(`/trips/${trip.id}`);
            }
          }}
          style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
          className="h-full cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-backwards rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)]/40"
        >
          <TripCard
            trip={trip}
            onDelete={(id) => deleteTrip(id)}
            isDeleting={isDeleting}
          />
        </div>
      ))}
    </div>
  );
}