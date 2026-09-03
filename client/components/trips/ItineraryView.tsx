"use client";

import { useState } from "react";
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
  BedDouble,
  Bus,
  Calendar,
  Car,
  ChevronLeft,
  ChevronRight,
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
  MoonStar,
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
  X,
} from "lucide-react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ---------------------------------- config --------------------------------- */

type StyleConfig = { label: string; icon: ReactNode; chip: string };

type CategoryConfig = {
  label: string;
  icon: ReactNode;
  badge: string;
  node: string;
};

const STYLE_CONFIG: Record<string, StyleConfig> = {
  ADVENTURE: {
    label: "Adventure",
    icon: <Mountain className="h-3 w-3" />,
    chip: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  },
  RELAXED: {
    label: "Relaxed",
    icon: <Sun className="h-3 w-3" />,
    chip: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  CULTURAL: {
    label: "Cultural",
    icon: <Landmark className="h-3 w-3" />,
    chip: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  LUXURY: {
    label: "Luxury",
    icon: <Gem className="h-3 w-3" />,
    chip: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
  BUDGET: {
    label: "Budget",
    icon: <Wallet className="h-3 w-3" />,
    chip: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
};

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  FOOD: {
    label: "Food",
    icon: <Utensils className="h-3 w-3" />,
    badge:
      "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
    node: "border-orange-500/40 bg-orange-500/10 text-orange-500 dark:text-orange-400",
  },
  SIGHTSEEING: {
    label: "Sightseeing",
    icon: <Landmark className="h-3 w-3" />,
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    node: "border-blue-500/40 bg-blue-500/10 text-blue-500 dark:text-blue-400",
  },
  ACCOMMODATION: {
    label: "Stay",
    icon: <BedDouble className="h-3 w-3" />,
    badge:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    node: "border-purple-500/40 bg-purple-500/10 text-purple-500 dark:text-purple-400",
  },
  TRANSPORT: {
    label: "Transport",
    icon: <Bus className="h-3 w-3" />,
    badge:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    node: "border-emerald-500/40 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400",
  },
  SHOPPING: {
    label: "Shopping",
    icon: <ShoppingBag className="h-3 w-3" />,
    badge: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
    node: "border-pink-500/40 bg-pink-500/10 text-pink-500 dark:text-pink-400",
  },
  ENTERTAINMENT: {
    label: "Entertainment",
    icon: <Film className="h-3 w-3" />,
    badge:
      "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
    node: "border-yellow-500/40 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  },
  ADVENTURE: {
    label: "Adventure",
    icon: <Mountain className="h-3 w-3" />,
    badge: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    node: "border-red-500/40 bg-red-500/10 text-red-500 dark:text-red-400",
  },
  WELLNESS: {
    label: "Wellness",
    icon: <HeartPulse className="h-3 w-3" />,
    badge: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
    node: "border-teal-500/40 bg-teal-500/10 text-teal-500 dark:text-teal-400",
  },
  NIGHTLIFE: {
    label: "Nightlife",
    icon: <MoonStar className="h-3 w-3" />,
    badge:
      "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    node: "border-indigo-500/40 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400",
  },
  DEFAULT: {
    label: "Activity",
    icon: <Tag className="h-3 w-3" />,
    badge:
      "bg-[var(--color-brand-500)]/10 text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] border-[var(--color-brand-500)]/20",
    node: "border-[var(--color-brand-500)]/40 bg-[var(--color-brand-500)]/10 text-[var(--color-brand-500)]",
  },
};

function getCategoryConfig(category?: string): CategoryConfig {
  if (!category) return CATEGORY_CONFIG.DEFAULT;
  return CATEGORY_CONFIG[category.toUpperCase()] ?? CATEGORY_CONFIG.DEFAULT;
}

/* -------------------------------- formatting ------------------------------- */

// NOTE: Activity/day `time` values are wall-clock times stored as UTC
// (server builds them with setUTCHours). Render in UTC so a browser in
// IST (+5:30) doesn't shift 08:00 -> 13:30.
function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatTabDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/* ------------------------------- small pieces ------------------------------ */

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
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}

function TripMetaChips({ trip }: { trip: Trip }) {
  const styleInfo = trip.travelStyle
    ? STYLE_CONFIG[trip.travelStyle.toUpperCase()]
    : undefined;
  const neutral =
    "border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)]";

  const dateRange =
    trip.startDate && trip.endDate
      ? `${formatTabDate(trip.startDate)} – ${formatTabDate(trip.endDate)}`
      : null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {styleInfo && (
        <Chip icon={styleInfo.icon} className={styleInfo.chip}>
          {styleInfo.label}
        </Chip>
      )}
      {dateRange && (
        <Chip icon={<Calendar className="h-3 w-3" />} className={neutral}>
          {dateRange}
        </Chip>
      )}
      {typeof trip.travellers === "number" && (
        <Chip icon={<Users className="h-3 w-3" />} className={neutral}>
          {trip.travellers} traveller{trip.travellers === 1 ? "" : "s"}
        </Chip>
      )}
      {typeof trip.budget === "number" && trip.budget > 0 && (
        <Chip
          icon={<IndianRupee className="h-3 w-3" />}
          className="border-[var(--color-brand-500)]/20 bg-[var(--color-brand-500)]/10 text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]"
        >
          {trip.budget.toLocaleString()}
        </Chip>
      )}
    </div>
  );
}

function Barcode() {
  const bars = [10, 16, 8, 13, 18, 9, 12, 16, 8, 13, 10, 18, 9, 13];
  return (
    <div
      aria-hidden="true"
      className="hidden items-end gap-[3px] opacity-40 sm:flex"
    >
      {bars.map((height, index) => (
        <span
          key={index}
          className="w-[2px] rounded-full bg-[var(--color-text-secondary)]"
          style={{ height }}
        />
      ))}
    </div>
  );
}

/* --------------------------------- skeleton -------------------------------- */

function LoadingSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading itinerary">
      <div className="flex items-center justify-between">
        <div className="h-8 w-32 animate-pulse rounded-full bg-[var(--color-border)]" />
        <div className="h-9 w-56 animate-pulse rounded-full bg-[var(--color-border)]" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
        <div className="space-y-3 p-5 sm:p-6">
          <div className="h-3 w-24 animate-pulse rounded bg-[var(--color-border)]" />
          <div className="h-8 w-64 max-w-full animate-pulse rounded-lg bg-[var(--color-border)]" />
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-6 w-20 animate-pulse rounded-full bg-[var(--color-border)]"
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 border-t border-dashed border-[var(--color-border)] p-4 sm:px-6 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-12 animate-pulse rounded-xl bg-[var(--color-border)]"
            />
          ))}
        </div>
      </div>

      <div className="h-11 w-full max-w-sm animate-pulse rounded-xl bg-[var(--color-border)]" />
      <div className="h-80 animate-pulse rounded-2xl bg-[var(--color-border)]" />
    </div>
  );
}

/* -------------------------------- empty state ------------------------------ */

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
    <section className="relative overflow-hidden rounded-2xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-surface-elevated)]/50 px-5 py-10 text-center sm:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-[var(--color-brand-500)]/10 blur-3xl"
      />

      <div className="relative mx-auto mb-6 h-16 w-16">
        <span className="absolute inset-0 animate-ping rounded-2xl bg-[var(--color-brand-500)]/20 [animation-duration:2.5s]" />
        <span className="relative flex h-full w-full items-center justify-center rounded-2xl border border-[var(--color-brand-500)]/30 bg-[var(--color-brand-500)]/10 text-[var(--color-brand-500)]">
          <Compass className="h-7 w-7" />
        </span>
      </div>

      <h2 className="relative text-xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-2xl">
        Ready to explore {trip.destination}?
      </h2>
      <p className="relative mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[var(--color-text-secondary)]">
        Let AI craft a personalized day-by-day journey around your dates, travel
        style and interests.
      </p>

      <div className="relative mt-4 flex justify-center">
        <TripMetaChips trip={trip} />
      </div>

      <button
        type="button"
        onClick={onGenerate}
        disabled={isGenerating}
        className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-600)] px-7 py-3 text-sm font-semibold tracking-tight text-white transition-all duration-200 hover:bg-[var(--color-brand-700)] hover:shadow-xl hover:shadow-[var(--color-brand-600)]/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Charting your journey…
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Generate Itinerary
          </>
        )}
      </button>
    </section>
  );
}

/* ---------------------------------- timeline ------------------------------- */

function TravelConnector({ activity }: { activity: Activity }) {
  const minutes = Number(activity.travelMinutes);
  const distance = Number(activity.travelDistanceKm);

  if (!activity.travelMode || !Number.isFinite(minutes) || minutes <= 0)
    return null;

  return (
    <div className="mb-2">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-0.5 text-[10px] font-medium text-[var(--color-text-secondary)]">
        {activity.travelMode.toLowerCase() === "walk" ? (
          <Footprints className="h-3 w-3" />
        ) : (
          <Car className="h-3 w-3" />
        )}
        {minutes} min
        {Number.isFinite(distance) && distance > 0 && (
          <span className="text-[var(--color-text-tertiary)]">
            · {distance} km
          </span>
        )}
      </span>
    </div>
  );
}

function ActivityRow({
  activity,
  isFirst,
  isLast,
}: {
  activity: Activity;
  isFirst: boolean;
  isLast: boolean;
}) {
  const category = getCategoryConfig(activity.category);

  return (
    <li className={cn("relative flex gap-3 sm:gap-4", !isLast && "pb-5")}>
      <span
        className={cn(
          "relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border backdrop-blur-sm",
          category.node,
        )}
      >
        {category.icon}
      </span>

      <div className="min-w-0 flex-1">
        {!isFirst && <TravelConnector activity={activity} />}

        <article className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)]/40 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-brand-500)]/40 hover:shadow-lg hover:shadow-[var(--color-brand-500)]/5 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold tabular-nums text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]">
              <Clock className="h-3 w-3" />
              {formatTime(activity.time)}
            </span>

            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide",
                category.badge,
              )}
            >
              {category.icon}
              {category.label}
            </span>
          </div>

          <h4 className="mt-1.5 text-sm font-semibold text-[var(--color-text-primary)]">
            {activity.title}
          </h4>

          {activity.description && (
            <p className="mt-1 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
              {activity.description}
            </p>
          )}
        </article>
      </div>
    </li>
  );
}

function DayTimeline({
  day,
  dayIndex,
  totalDays,
  onSelectDay,
}: {
  day: ItineraryDay;
  dayIndex: number;
  totalDays: number;
  onSelectDay: (index: number) => void;
}) {
  const activities = day.activities ?? [];
  const travelMinutes = activities.reduce(
    (sum, activity) => sum + (Number(activity.travelMinutes) || 0),
    0,
  );

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 sm:p-7">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-5 right-1 select-none text-[7rem] font-black leading-none tracking-tighter text-[var(--color-text-primary)] opacity-[0.04] sm:text-[9rem]"
      >
        {day.dayNumber}
      </span>

      <div className="relative flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]">
            Day {day.dayNumber}
          </p>
          <h2 className="mt-0.5 text-lg font-bold tracking-tight text-[var(--color-text-primary)] sm:text-xl">
            {formatDate(day.date)}
          </h2>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Chip
            icon={<MapPin className="h-3 w-3" />}
            className="border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)]"
          >
            {activities.length} stop{activities.length === 1 ? "" : "s"}
          </Chip>
          {travelMinutes > 0 && (
            <Chip
              icon={<Car className="h-3 w-3" />}
              className="border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)]"
            >
              {travelMinutes} min transit
            </Chip>
          )}
        </div>
      </div>

      {activities.length > 0 ? (
        <ol className="relative mt-6">
          <span
            aria-hidden="true"
            className="absolute bottom-4 left-4 top-2 w-px bg-gradient-to-b from-[var(--color-brand-500)]/60 via-[var(--color-border)] to-transparent"
          />
          {activities.map((activity, index) => (
            <ActivityRow
              key={activity.id ?? `${day.id ?? day.dayNumber}-${index}`}
              activity={activity}
              isFirst={index === 0}
              isLast={index === activities.length - 1}
            />
          ))}
        </ol>
      ) : (
        <p className="mt-6 text-sm text-[var(--color-text-secondary)]">
          No activities planned for this day.
        </p>
      )}

      <div className="relative mt-6 flex items-center justify-between border-t border-dashed border-[var(--color-border)] pt-4">
        <button
          type="button"
          onClick={() => onSelectDay(dayIndex - 1)}
          disabled={dayIndex === 0}
          className="inline-flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Previous
        </button>

        <span className="text-[11px] font-medium tabular-nums text-[var(--color-text-tertiary)]">
          Day {dayIndex + 1} of {totalDays}
        </span>

        <button
          type="button"
          onClick={() => onSelectDay(dayIndex + 1)}
          disabled={dayIndex >= totalDays - 1}
          className="inline-flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </section>
  );
}

/* -------------------------------- delete dialog ---------------------------- */

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
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-trip-title"
        className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 shadow-2xl"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-red-500/10 blur-2xl"
        />

        <button
          type="button"
          onClick={onCancel}
          disabled={isDeleting}
          aria-label="Close dialog"
          className="absolute right-3.5 top-3.5 rounded-full p-1.5 text-[var(--color-text-tertiary)] transition-colors hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)] disabled:opacity-50"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
            <AlertTriangle className="h-5 w-5" />
          </div>

          <h3
            id="delete-trip-title"
            className="text-base font-bold text-[var(--color-text-primary)]"
          >
            Delete this trip?
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
            Your trip to{" "}
            <span className="font-semibold text-[var(--color-text-primary)]">
              {trip.destination}
            </span>{" "}
            and its entire itinerary will be permanently removed. This cannot be
            undone.
          </p>

          <div className="mt-5 flex gap-2.5">
            <button
              type="button"
              onClick={onCancel}
              disabled={isDeleting}
              autoFocus
              className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-[13px] font-medium text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-surface-muted)] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)]"
            >
              Keep trip
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              {isDeleting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {isDeleting ? "Deleting…" : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- main view ------------------------------ */

export default function ItineraryView({ tripId }: { tripId: string }) {
  const router = useRouter();

  const { data: tripData, isLoading: isLoadingTrip } = useGetTripQuery(tripId);
  const { data: itineraryData, isLoading: isLoadingItinerary } =
    useGetItineraryQuery(tripId);

  const [generateItinerary, { isLoading: isGenerating }] =
    useGenerateItineraryMutation();
  const [deleteTrip, { isLoading: isDeleting }] = useDeleteTripMutation();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);

  const trip = tripData?.data;
  const itinerary = itineraryData?.data;
  const days = itinerary?.days ?? [];

  const activeIndex = days.length
    ? Math.min(Math.max(selectedDay, 0), days.length - 1)
    : 0;
  const activeDay = days[activeIndex];

  const totalActivities = days.reduce(
    (sum, day) => sum + (day.activities?.length ?? 0),
    0,
  );
  const totalTravelMinutes = days.reduce(
    (sum, day) =>
      sum +
      (day.activities ?? []).reduce(
        (inner, activity) => inner + (Number(activity.travelMinutes) || 0),
        0,
      ),
    0,
  );

  const handleGenerate = async () => {
    try {
      await generateItinerary(tripId).unwrap();
    } catch {
      // hook up toast/error UI later
    }
  };

  const handleDelete = async () => {
    if (!trip) return;
    try {
      await deleteTrip(trip.id).unwrap();
      router.push("/trips");
    } catch {
      // hook up toast/error UI later
    }
  };

  if (isLoadingTrip || (isLoadingItinerary && !itinerary)) {
    return <LoadingSkeleton />;
  }

  if (!trip) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-8 text-center">
        <p className="text-[var(--color-text-secondary)]">Trip not found.</p>
        <button
          type="button"
          onClick={() => router.push("/trips")}
          className="mt-3 text-sm font-medium text-[var(--color-brand-600)] hover:underline dark:text-[var(--color-brand-400)]"
        >
          Back to My Trips
        </button>
      </div>
    );
  }

  const styleInfo = trip.travelStyle
    ? STYLE_CONFIG[trip.travelStyle.toUpperCase()]
    : undefined;

  const stats = [
    {
      label: "Days",
      value: days.length,
      icon: <Calendar className="h-3.5 w-3.5" />,
    },
    {
      label: "Stops",
      value: totalActivities,
      icon: <MapPin className="h-3.5 w-3.5" />,
    },
    {
      label: "Transit",
      value: totalTravelMinutes > 0 ? `${totalTravelMinutes}m` : "—",
      icon: <Car className="h-3.5 w-3.5" />,
    },
    {
      label: "Per day",
      value: days.length ? Math.round(totalActivities / days.length) : 0,
      icon: <Sparkles className="h-3.5 w-3.5" />,
    },
  ];

  return (
    <div className="space-y-4">
      {/* toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => router.push("/trips")}
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[13px] font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-brand-600)] dark:hover:text-[var(--color-brand-400)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Trips
        </button>

        <div className="flex items-center divide-x divide-[var(--color-border)] rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-sm">
          {itinerary && (
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="inline-flex items-center gap-1.5 rounded-l-full px-3.5 py-2 text-[13px] font-medium text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-brand-500)]/10 hover:text-[var(--color-brand-600)] disabled:cursor-not-allowed disabled:opacity-50 dark:hover:text-[var(--color-brand-400)]"
            >
              {isGenerating ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <RefreshCw className="h-3.5 w-3.5" />
              )}
              <span className="hidden sm:inline">
                {isGenerating ? "Regenerating…" : "Regenerate"}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={() => router.push(`/trips/${tripId}/edit`)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)]",
              !itinerary && "rounded-l-full",
            )}
          >
            <Pencil className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Edit Trip</span>
          </button>

          <button
            type="button"
            onClick={() => setShowDeleteDialog(true)}
            disabled={isDeleting}
            aria-label="Delete trip"
            title="Delete trip"
            className="inline-flex items-center rounded-r-full px-3 py-2 text-[var(--color-text-secondary)] transition-colors hover:bg-red-500/10 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* boarding-pass hero */}
      <section className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-sm">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--color-brand-500)]/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-[var(--color-accent-500)]/10 blur-3xl"
        />

        <div className="relative flex items-start justify-between gap-4 p-5 sm:p-6">
          <div className="min-w-0 space-y-2.5">
            <h1 className="break-words text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
              {trip.destination}
            </h1>

            <div className="flex flex-wrap items-center gap-1.5">
              {itinerary && (
                <Chip
                  icon={<Sparkles className="h-3 w-3" />}
                  className="border-[var(--color-brand-500)]/30 bg-[var(--color-brand-500)]/10 text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]"
                >
                  AI-generated
                </Chip>
              )}
              {styleInfo && (
                <Chip icon={styleInfo.icon} className={styleInfo.chip}>
                  {styleInfo.label}
                </Chip>
              )}
              {typeof trip.travellers === "number" && (
                <Chip
                  icon={<Users className="h-3 w-3" />}
                  className="border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)]"
                >
                  {trip.travellers} traveller{trip.travellers === 1 ? "" : "s"}
                </Chip>
              )}
              {typeof trip.budget === "number" && trip.budget > 0 && (
                <Chip
                  icon={<IndianRupee className="h-3 w-3" />}
                  className="border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)]"
                >
                  {trip.budget.toLocaleString()}
                </Chip>
              )}
            </div>
          </div>
        </div>

        {/* perforation */}
        <div className="relative border-t border-dashed border-[var(--color-border)]" />

        {/* stats stub */}
        <div className="relative flex items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
          {itinerary ? (
            <div className="grid flex-1 grid-cols-2 gap-4 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-500)]/10 text-[var(--color-brand-500)]">
                    {stat.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
                      {stat.label}
                    </p>
                    <p className="text-base font-bold leading-tight tabular-nums text-[var(--color-text-primary)]">
                      {stat.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="flex-1 text-[13px] text-[var(--color-text-tertiary)]">
              Generate your itinerary to see the trip at a glance.
            </p>
          )}
        </div>
      </section>

      {/* body */}
      {!itinerary || days.length === 0 ? (
        days.length === 0 && itinerary ? (
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-8 text-center">
            <p className="text-[var(--color-text-secondary)]">
              No itinerary items found yet. Try regenerating the itinerary.
            </p>
          </div>
        ) : (
          <EmptyState
            trip={trip}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        )
      ) : (
        <>
          {/* sticky day switcher */}
          <div className="sticky top-3 z-20">
            <div
              role="tablist"
              aria-label="Trip days"
              className="flex w-fit max-w-full gap-1.5 overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)]/80 p-1.5 shadow-lg shadow-black/10 backdrop-blur-xl"
            >
              {days.map((day, index) => (
                <button
                  key={day.id ?? day.dayNumber}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  onClick={() => setSelectedDay(index)}
                  className={cn(
                    "flex min-w-fit flex-col items-start rounded-lg px-3 py-1.5 text-left transition-all duration-200",
                    index === activeIndex
                      ? "bg-[var(--color-brand-600)] text-white shadow-md shadow-[var(--color-brand-600)]/25"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)]",
                  )}
                >
                  <span className="text-[11px] font-bold uppercase tracking-wide">
                    Day {day.dayNumber}
                  </span>
                  <span
                    className={cn(
                      "text-[10px]",
                      index === activeIndex ? "text-white/80" : "opacity-70",
                    )}
                  >
                    {formatTabDate(day.date)} · {day.activities?.length ?? 0}{" "}
                    stops
                  </span>
                </button>
              ))}
            </div>
          </div>

          {activeDay && (
            <DayTimeline
              day={activeDay}
              dayIndex={activeIndex}
              totalDays={days.length}
              onSelectDay={setSelectedDay}
            />
          )}
        </>
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
