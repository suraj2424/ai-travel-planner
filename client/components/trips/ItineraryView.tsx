"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  useGetItineraryQuery,
  useGetTripQuery,
  useGenerateItineraryMutation,
  useDeleteTripMutation,
} from "@/services/api";
import type { Activity, ItineraryDay, Trip } from "@/services/api";
import {
  AlertTriangle,
  ArrowLeft,
  Bed,
  Bus,
  Calendar,
  Car,
  ChevronDown,
  ChevronUp,
  Clock,
  Compass,
  Film,
  Footprints,
  Gem,
  HeartPulse,
  IndianRupee,
  Landmark,
  Loader2,
  MapPin,
  Moon,
  Mountain,
  Pencil,
  RefreshCw,
  ShoppingBag,
  Sparkles,
  Sun,
  Tag,
  Trash2,
  Users,
  Utensils,
  Wallet,
} from "lucide-react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type StyleConfig = {
  label: string;
  icon: ReactNode;
  chip: string;
  color: string;
};

type CategoryConfig = {
  label: string;
  icon: ReactNode;
  className: string;
};

const STYLE_CONFIG: Record<string, StyleConfig> = {
  ADVENTURE: {
    label: "Adventure",
    icon: <Mountain className="h-3.5 w-3.5" />,
    chip: "bg-red-500/10 text-red-600 dark:text-red-400",
    color: "text-red-500",
  },
  RELAXED: {
    label: "Relaxed",
    icon: <Sun className="h-3.5 w-3.5" />,
    chip: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    color: "text-amber-500",
  },
  CULTURAL: {
    label: "Cultural",
    icon: <Landmark className="h-3.5 w-3.5" />,
    chip: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    color: "text-blue-500",
  },
  LUXURY: {
    label: "Luxury",
    icon: <Gem className="h-3.5 w-3.5" />,
    chip: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    color: "text-purple-500",
  },
  BUDGET: {
    label: "Budget",
    icon: <Wallet className="h-3.5 w-3.5" />,
    chip: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    color: "text-emerald-500",
  },
};

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  FOOD: {
    label: "Food",
    icon: <Utensils className="h-3 w-3" />,
    className: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  SIGHTSEEING: {
    label: "Sightseeing",
    icon: <Landmark className="h-3 w-3" />,
    className: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  ACCOMMODATION: {
    label: "Stay",
    icon: <Bed className="h-3 w-3" />,
    className: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  TRANSPORT: {
    label: "Transport",
    icon: <Bus className="h-3 w-3" />,
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  SHOPPING: {
    label: "Shopping",
    icon: <ShoppingBag className="h-3 w-3" />,
    className: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  },
  ENTERTAINMENT: {
    label: "Entertainment",
    icon: <Film className="h-3 w-3" />,
    className: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  },
  ADVENTURE: {
    label: "Adventure",
    icon: <Mountain className="h-3 w-3" />,
    className: "bg-red-500/10 text-red-600 dark:text-red-400",
  },
  WELLNESS: {
    label: "Wellness",
    icon: <HeartPulse className="h-3 w-3" />,
    className: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  },
  NIGHTLIFE: {
    label: "Nightlife",
    icon: <Moon className="h-3 w-3" />,
    className: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  DEFAULT: {
    label: "Activity",
    icon: <Tag className="h-3 w-3" />,
    className:
      "bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[var(--color-brand-900)] dark:text-[var(--color-brand-300)]",
  },
};

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatShortDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getTripDateRange(trip: Trip) {
  if (!trip.startDate || !trip.endDate) return null;

  const start = formatShortDate(trip.startDate);
  const end = formatShortDate(trip.endDate);

  if (!start || !end) return null;

  return `${start} – ${end}`;
}

function getCategoryConfig(category?: string): CategoryConfig {
  if (!category) return CATEGORY_CONFIG.DEFAULT;

  return CATEGORY_CONFIG[category.toUpperCase()] ?? CATEGORY_CONFIG.DEFAULT;
}

function Chip({
  icon,
  className,
  children,
}: {
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}

function TripMetaChips({
  trip,
  showAiBadge = false,
}: {
  trip: Trip;
  showAiBadge?: boolean;
}) {
  const styleInfo = trip.travelStyle
    ? STYLE_CONFIG[trip.travelStyle.toUpperCase()]
    : undefined;
  const dateRange = getTripDateRange(trip);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {styleInfo && (
        <Chip icon={styleInfo.icon} className={styleInfo.chip}>
          {styleInfo.label}
        </Chip>
      )}

      {typeof trip.travellers === "number" && (
        <Chip
          icon={<Users className="h-3.5 w-3.5" />}
          className="border border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)]"
        >
          {trip.travellers} traveller{trip.travellers === 1 ? "" : "s"}
        </Chip>
      )}

      {typeof trip.budget === "number" && trip.budget > 0 && (
        <Chip
          icon={<IndianRupee className="h-3.5 w-3.5" />}
          className="border border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]"
        >
          {trip.budget.toLocaleString()}
        </Chip>
      )}

      {dateRange && (
        <Chip
          icon={<Calendar className="h-3.5 w-3.5" />}
          className="border border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)]"
        >
          {dateRange}
        </Chip>
      )}

      {showAiBadge && (
        <Chip
          icon={<Sparkles className="h-3.5 w-3.5" />}
          className="bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[var(--color-brand-900)] dark:text-[var(--color-brand-300)]"
        >
          AI-generated
        </Chip>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div
      className="mx-auto w-full max-w-5xl space-y-6"
      aria-busy="true"
      aria-label="Loading itinerary"
    >
      <div className="h-10 w-44 animate-pulse rounded-xl bg-[var(--color-border)]" />

      <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 animate-pulse rounded-3xl bg-[var(--color-border)]" />
              <div className="space-y-2">
                <div className="h-3 w-24 animate-pulse rounded bg-[var(--color-border)]" />
                <div className="h-7 w-56 animate-pulse rounded bg-[var(--color-border)]" />
                <div className="h-4 w-40 animate-pulse rounded bg-[var(--color-border)]" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-7 w-24 animate-pulse rounded-full bg-[var(--color-border)]"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="h-10 w-32 animate-pulse rounded-full bg-[var(--color-border)]" />
            <div className="h-10 w-28 animate-pulse rounded-full bg-[var(--color-border)]" />
            <div className="h-10 w-10 animate-pulse rounded-full bg-[var(--color-border)]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-3xl bg-[var(--color-border)]"
          />
        ))}
      </div>

      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="h-64 animate-pulse rounded-3xl bg-[var(--color-border)]"
          />
        ))}
      </div>
    </div>
  );
}

function EmptyState({
  trip,
  onGenerate,
  isGenerating,
}: {
  trip: Trip;
  onGenerate: () => void;
  isGenerating: boolean;
}) {
  return (
    <section className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-8 text-center shadow-sm sm:p-12">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[var(--color-brand-900)] dark:text-[var(--color-brand-400)]">
        <Compass className="h-8 w-8" />
      </div>

      <h2 className="text-xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-2xl">
        Ready to explore {trip.destination}?
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
        Let AI build a personalized day-by-day itinerary based on your dates,
        travel style, and interests.
      </p>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-600)] px-8 py-3.5 text-base font-medium tracking-tight text-white transition-all duration-200 hover:bg-[var(--color-brand-700)] hover:shadow-lg hover:shadow-[var(--color-brand-600)]/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Building your itinerary…
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Generate Itinerary
            </>
          )}
        </button>
      </div>
    </section>
  );
}

function ItinerarySummary({ days }: { days: ItineraryDay[] }) {
  const totalActivities = days.reduce(
    (sum, day) => sum + (day.activities?.length ?? 0),
    0
  );

  const totalTravelMinutes = days.reduce(
    (sum, day) =>
      sum +
      (day.activities ?? []).reduce(
        (innerSum, activity) => innerSum + (activity.travelMinutes ?? 0),
        0
      ),
    0
  );

  const stats = [
    {
      label: "Days",
      value: days.length,
      icon: <Calendar className="h-4 w-4" />,
      description: "Total trip duration",
    },
    {
      label: "Activities",
      value: totalActivities,
      icon: <MapPin className="h-4 w-4" />,
      description: "Planned stops",
    },
    {
      label: "Travel",
      value: totalTravelMinutes > 0 ? `${totalTravelMinutes}m` : "—",
      icon: <Car className="h-4 w-4" />,
      description: "Transit time",
    },
    {
      label: "Avg / day",
      value: days.length ? Math.round(totalActivities / days.length) : 0,
      icon: <Sparkles className="h-4 w-4" />,
      description: "Activities per day",
    },
  ];

  return (
    <section
      aria-label="Itinerary summary"
      className="grid grid-cols-2 gap-3 xl:grid-cols-4"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 shadow-sm transition-colors hover:border-[var(--color-brand-500)]/40"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)]">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[var(--color-brand-900)] dark:text-[var(--color-brand-400)]">
              {stat.icon}
            </span>
            {stat.label}
          </div>

          <div className="mt-3 text-2xl font-semibold tabular-nums text-[var(--color-text-primary)]">
            {stat.value}
          </div>

          <p className="mt-1 text-xs text-[var(--color-text-tertiary)]">
            {stat.description}
          </p>
        </div>
      ))}
    </section>
  );
}

function ActivityRow({
  activity,
  isLast,
}: {
  activity: Activity;
  isLast: boolean;
}) {
  const category = getCategoryConfig(activity.category);

  const showTravel = Boolean(
    activity.travelMode &&
      activity.travelMinutes != null &&
      Number(activity.travelMinutes) > 0
  );

  const travelDistanceKm = Number(activity.travelDistanceKm);

  return (
    <li className="relative">
      {showTravel && (
        <div className="flex gap-4 pb-4">
          <div className="w-20 shrink-0" aria-hidden="true" />

          <div className="min-w-0 flex-1">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-dashed border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)]">
              {activity.travelMode?.toLowerCase() === "walk" ? (
                <Footprints className="h-3.5 w-3.5 shrink-0" />
              ) : (
                <Car className="h-3.5 w-3.5 shrink-0" />
              )}

              <span className="truncate">{activity.travelMinutes} min</span>

              {Number.isFinite(travelDistanceKm) && travelDistanceKm > 0 && (
                <span className="shrink-0">· {travelDistanceKm} km</span>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <div className="flex w-20 shrink-0 flex-col items-center">
          <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-[var(--color-brand-500)]/30 bg-[var(--color-brand-50)] px-2.5 py-1.5 text-[11px] font-semibold tabular-nums leading-none text-[var(--color-brand-700)] dark:bg-[var(--color-brand-900)] dark:text-[var(--color-brand-300)]">
            <Clock className="h-3 w-3 shrink-0" />
            {formatTime(activity.time)}
          </span>

          {!isLast && (
            <div className="mt-2 w-px flex-1 rounded-full bg-[var(--color-border)]" />
          )}
        </div>

        <div className={cn("min-w-0 flex-1", !isLast && "pb-6")}>
          <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm transition-colors hover:border-[var(--color-brand-500)]/40 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
              <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">
                {activity.title}
              </h4>

              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide",
                  category.className
                )}
              >
                {category.icon}
                {category.label}
              </span>
            </div>

            {activity.description && (
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {activity.description}
              </p>
            )}
          </article>
        </div>
      </div>
    </li>
  );
}

function DayCard({ day }: { day: ItineraryDay }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const activities = day.activities ?? [];
  const contentId = `day-content-${day.id ?? day.dayNumber}`;

  return (
    <section className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-sm">
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[var(--color-surface-muted)] sm:px-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-elevated)]"
      >
        <div className="flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-2xl bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[var(--color-brand-900)] dark:text-[var(--color-brand-300)]">
            <span className="text-[9px] font-bold uppercase">Day</span>
            <span className="text-base font-semibold leading-none">
              {day.dayNumber}
            </span>
          </span>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-[var(--color-text-primary)]">
              {formatDate(day.date)}
            </h3>
            <p className="mt-1 text-xs text-[var(--color-text-tertiary)]">
              {activities.length} stop{activities.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-text-tertiary)]">
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </span>
      </button>

      {isExpanded && (
        <div
          id={contentId}
          className="border-t border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6"
        >
          {activities.length > 0 ? (
            <ol className="space-y-0">
              {activities.map((activity, index) => (
                <ActivityRow
                  key={
                    activity.id ??
                    `${day.id ?? day.dayNumber}-activity-${index}`
                  }
                  activity={activity}
                  isLast={index === activities.length - 1}
                />
              ))}
            </ol>
          ) : (
            <p className="text-sm text-[var(--color-text-secondary)]">
              No activities planned for this day.
            </p>
          )}
        </div>
      )}
    </section>
  );
}

function DeleteDialog({
  trip,
  onConfirm,
  onCancel,
  isDeleting,
}: {
  trip: Trip;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isDeleting) {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isDeleting, onCancel]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-trip-title"
        className="relative w-full max-w-md rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 shadow-2xl"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
            <AlertTriangle className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h3
              id="delete-trip-title"
              className="text-base font-semibold text-[var(--color-text-primary)]"
            >
              Delete trip?
            </h3>
            <p className="mt-1 text-xs text-[var(--color-text-tertiary)]">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          Are you sure you want to delete your trip to{" "}
          <span className="font-semibold text-[var(--color-text-primary)]">
            {trip.destination}
          </span>
          ? All itinerary data will be permanently removed.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            autoFocus
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-surface-muted)] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isDeleting ? "Deleting…" : "Delete trip"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ItineraryView({ tripId }: { tripId: string }) {
  const router = useRouter();

  const { data: tripData, isLoading: isLoadingTrip } =
    useGetTripQuery(tripId);
  const { data: itineraryData, isLoading: isLoadingItinerary } =
    useGetItineraryQuery(tripId);

  const [generateItinerary, { isLoading: isGenerating }] =
    useGenerateItineraryMutation();
  const [deleteTrip, { isLoading: isDeleting }] = useDeleteTripMutation();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const trip = tripData?.data;
  const itinerary = itineraryData?.data;
  const days = itinerary?.days ?? [];
  const dateRange = trip ? getTripDateRange(trip) : null;

  const handleGenerate = async () => {
    try {
      await generateItinerary(tripId).unwrap();
    } catch {
      // You can hook up a toast/error state here later.
    }
  };

  const handleDelete = async () => {
    if (!trip) return;

    try {
      await deleteTrip(trip.id).unwrap();
      router.push("/trips");
    } catch {
      // You can hook up a toast/error state here later.
    }
  };

  if (isLoadingTrip || (isLoadingItinerary && !itinerary)) {
    return <LoadingSkeleton />;
  }

  if (!trip) {
    return (
      <div className="mx-auto w-full max-w-lg rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-10 text-center shadow-sm">
        <p className="text-[var(--color-text-secondary)]">Trip not found.</p>
        <button
          type="button"
          onClick={() => router.push("/trips")}
          className="mt-4 text-sm font-medium text-[var(--color-brand-600)] hover:underline dark:text-[var(--color-brand-400)]"
        >
          Back to My Trips
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <button
        type="button"
        onClick={() => router.push("/trips")}
        className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-brand-600)] dark:hover:text-[var(--color-brand-400)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to My Trips
      </button>

      <header className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0 space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[var(--color-brand-900)] dark:text-[var(--color-brand-400)]">
                <MapPin className="h-6 w-6" />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-tertiary)]">
                  Destination
                </p>

                <h1 className="mt-1 break-words text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
                  {trip.destination}
                </h1>

                {dateRange && (
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
                    <Calendar className="h-4 w-4" />
                    {dateRange}
                  </p>
                )}
              </div>
            </div>

            <TripMetaChips trip={trip} showAiBadge={Boolean(itinerary)} />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {itinerary && (
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-2.5 text-sm font-medium text-[var(--color-text-primary)] transition-all duration-200 hover:border-[var(--color-brand-500)]/40 hover:bg-[var(--color-brand-50)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-2 dark:hover:bg-[var(--color-brand-900)]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Regenerating…
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    Regenerate
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={() => router.push(`/trips/${tripId}/edit`)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-all duration-200 hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-2"
            >
              <Pencil className="h-4 w-4" />
              <span className="hidden sm:inline">Edit Trip</span>
            </button>

            <button
              type="button"
              onClick={() => setShowDeleteDialog(true)}
              disabled={isDeleting}
              aria-label="Delete trip"
              title="Delete trip"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin text-red-500" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {!itinerary ? (
        <EmptyState
          trip={trip}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />
      ) : (
        <div className="space-y-6">
          <ItinerarySummary days={days} />

          {days.length > 0 ? (
            <div className="space-y-4">
              {days.map((day) => (
                <DayCard key={day.id ?? day.dayNumber} day={day} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-8 text-center shadow-sm">
              <p className="text-[var(--color-text-secondary)]">
                No itinerary items found yet. Try regenerating the itinerary.
              </p>
            </div>
          )}
        </div>
      )}

      {showDeleteDialog && (
        <DeleteDialog
          trip={trip}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteDialog(false)}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}