"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useGetItineraryQuery,
  useGetTripQuery,
  useGenerateItineraryMutation,
  useDeleteTripMutation,
  Activity,
  ItineraryDay,
  Trip,
} from "@/services/api";
import {
  ArrowLeft,
  Calendar,
  Car,
  Clock,
  Compass,
  Footprints,
  Loader2,
  MapPin,
  Pencil,
  RefreshCw,
  Sparkles,
  Tag,
  Trash2,
  Users,
  Mountain,
  Sun,
  Landmark,
  Gem,
  Wallet,
  IndianRupee,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ReactNode } from "react";

// Simple icon component for category icons
function Icon({ name, className }: { name: string; className?: string }) {
  const icons: Record<string, ReactNode> = {
    utensils: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Z"/><line x1="12" x2="12" y1="15" y2="12"/></svg>,
    landmark: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18.7 21a1 1 0 0 1-.3-.7V13.3a1 1 0 0 0-1.7-.7L8.7 17.7a1 1 0 0 1-1.4 0L4.3 12.6a1 1 0 0 0-1.7.7V20.3a1 1 0 0 1-.3.7C4 21.8 5.5 23 7 23h14c1.5 0 3-1.2 3-2.7Z"/><path d="M12 2v20"/></svg>,
    bed: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4"/><path d="M10 4v4"/><path d="M14 4v4"/></svg>,
    bus: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v10"/><path d="M4 16v5"/><path d="M20 16v5"/><path d="M8 16h8"/><circle cx="8" cy="21" r="2"/><circle cx="16" cy="21" r="2"/></svg>,
    "shopping-bag": <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1 0 8"/></svg>,
    film: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" x2="17" y1="2" y2="2"/><line x1="7" x2="17" y1="22" y2="22"/><line x1="2" x2="2" y1="7" y2="17"/><line x1="22" x2="22" y1="7" y2="17"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/></svg>,
    mountain: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3.4a.9.9 0 0 0-.6.2L2 8.6a.9.9 0 0 0 0 1.4l2.5 2.6a.9.9 0 0 1 0 1.4L2 17a.9.9 0 0 0 .6 1.4h18.8a.9.9 0 0 0 .6-1.4l-4-4a.9.9 0 0 1 0-1.4l4-4a.9.9 0 0 0-.6-1.4H8.2Z"/><path d="M12 8V3"/></svg>,
    "heart-pulse": <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 2 12a7 7 0 0 0 7 7c2.7 0 5.1-1.2 6.8-3.2"/><path d="M19 12H9"/><path d="M15 19v-7"/><path d="M11 12v7"/></svg>,
    "moon-star": <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M12 1v4"/><path d="M12 19v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M1 12h4"/><path d="M19 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>,
  };
  return icons[name] || <Tag className={className} />;
}

const STYLE_CONFIG: Record<
  string,
  { label: string; icon: ReactNode; chip: string; color: string }
> = {
  ADVENTURE: {
    label: "Adventure",
    icon: <Mountain className="w-3.5 h-3.5" />,
    chip: "bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[var(--color-brand-900)]/40 dark:text-[var(--color-brand-300)]",
    color: "text-red-500",
  },
  RELAXED: {
    label: "Relaxed",
    icon: <Sun className="w-3.5 h-3.5" />,
    chip: "bg-[var(--color-accent-500)]/10 text-[var(--color-accent-600)] dark:text-[var(--color-accent-400)]",
    color: "text-amber-500",
  },
  CULTURAL: {
    label: "Cultural",
    icon: <Landmark className="w-3.5 h-3.5" />,
    chip: "bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[var(--color-brand-900)]/40 dark:text-[var(--color-brand-300)]",
    color: "text-blue-500",
  },
  LUXURY: {
    label: "Luxury",
    icon: <Gem className="w-3.5 h-3.5" />,
    chip: "bg-[var(--color-accent-500)]/10 text-[var(--color-accent-600)] dark:text-[var(--color-accent-400)]",
    color: "text-purple-500",
  },
  BUDGET: {
    label: "Budget",
    icon: <Wallet className="w-3.5 h-3.5" />,
    chip: "bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[var(--color-brand-900)]/40 dark:text-[var(--color-brand-300)]",
    color: "text-emerald-500",
  },
};

const CATEGORY_CONFIG: Record<string, { color: string; icon: ReactNode; label: string }> = {
  FOOD: { color: "text-orange-500 bg-orange-500/10", icon: <Icon name="utensils" className="w-3 h-3" />, label: "Food" },
  SIGHTSEEING: { color: "text-blue-500 bg-blue-500/10", icon: <Icon name="landmark" className="w-3 h-3" />, label: "Sightseeing" },
  ACCOMMODATION: { color: "text-purple-500 bg-purple-500/10", icon: <Icon name="bed" className="w-3 h-3" />, label: "Stay" },
  TRANSPORT: { color: "text-emerald-500 bg-emerald-500/10", icon: <Icon name="bus" className="w-3 h-3" />, label: "Transport" },
  SHOPPING: { color: "text-pink-500 bg-pink-500/10", icon: <Icon name="shopping-bag" className="w-3 h-3" />, label: "Shopping" },
  ENTERTAINMENT: { color: "text-yellow-500 bg-yellow-500/10", icon: <Icon name="film" className="w-3 h-3" />, label: "Entertainment" },
  ADVENTURE: { color: "text-red-500 bg-red-500/10", icon: <Icon name="mountain" className="w-3 h-3" />, label: "Adventure" },
  WELLNESS: { color: "text-teal-500 bg-teal-500/10", icon: <Icon name="heart-pulse" className="w-3 h-3" />, label: "Wellness" },
  NIGHTLIFE: { color: "text-indigo-500 bg-indigo-500/10", icon: <Icon name="moon-star" className="w-3 h-3" />, label: "Nightlife" },
  DEFAULT: { color: "text-[var(--color-brand-500)] bg-[var(--color-brand-500)]/10", icon: <Tag className="w-3 h-3" />, label: "Activity" },
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatShortDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getCategoryConfig(category: string) {
  return CATEGORY_CONFIG[category.toUpperCase()] || CATEGORY_CONFIG.DEFAULT;
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8" aria-busy="true" aria-label="Loading itinerary">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-9 w-56 bg-[var(--color-border)] rounded-lg animate-pulse" />
          <div className="h-4 w-36 bg-[var(--color-border)] rounded animate-pulse" />
        </div>
        <div className="h-9 w-28 bg-[var(--color-border)] rounded-full animate-pulse" />
      </div>

      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-7 w-20 bg-[var(--color-border)] rounded-full animate-pulse" />
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 bg-[var(--color-border)] rounded-2xl animate-pulse" />
        ))}
      </div>

      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-5 animate-pulse space-y-4"
          >
            <div className="h-6 w-32 bg-[var(--color-border)] rounded" />
            <div className="space-y-3 pl-[5.25rem]">
              {Array.from({ length: 2 }).map((_, j) => (
                <div key={j} className="h-16 bg-[var(--color-border)] rounded-xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
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
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div className="relative bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-[var(--color-text-primary)]">
              Delete trip?
            </h3>
            <p className="text-xs text-[var(--color-text-tertiary)]">
              This action cannot be undone
            </p>
          </div>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          Are you sure you want to delete your trip to{" "}
          <span className="font-semibold text-[var(--color-text-primary)]">
            {trip.destination}
          </span>
          ? All itinerary data will be permanently removed.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 rounded-xl text-sm font-medium border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-muted)] transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isDeleting ? "Deleting…" : "Delete trip"}
          </button>
        </div>
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
  const dateRange =
    trip.startDate && trip.endDate
      ? `${formatShortDate(trip.startDate)} – ${formatShortDate(trip.endDate)}`
      : null;
  const styleInfo = trip.travelStyle
    ? STYLE_CONFIG[trip.travelStyle.toUpperCase()]
    : null;

  return (
    <div className="text-center py-10 sm:py-14 px-4">
      <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-[var(--color-brand-50)] dark:bg-[var(--color-brand-900)]/30 flex items-center justify-center text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]">
        <Compass className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
        Ready to explore {trip.destination}?
      </h2>
      <p className="text-[var(--color-text-secondary)] mb-6 max-w-sm mx-auto leading-relaxed">
        Let AI build a personalized day-by-day itinerary based on your dates,
        travel style, and interests.
      </p>

      <div className="flex flex-wrap justify-center gap-2 mb-8" role="list" aria-label="Trip details">
        {styleInfo && (
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${styleInfo.chip}`}
            role="listitem"
          >
            {styleInfo.icon}
            {styleInfo.label}
          </span>
        )}
        {typeof trip.travellers === "number" && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] border border-[var(--color-border)]" role="listitem">
            <Users className="w-3.5 h-3.5" />
            {trip.travellers} traveller{Number(trip.travellers) !== 1 ? "s" : ""}
          </span>
        )}
        {trip.budget && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-surface-muted)] text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] border border-[var(--color-border)]" role="listitem">
            <IndianRupee className="w-3.5 h-3.5" />
            {trip.budget.toLocaleString()}
          </span>
        )}
        {dateRange && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] border border-[var(--color-border)]" role="listitem">
            <Calendar className="w-3.5 h-3.5" />
            {dateRange}
          </span>
        )}
      </div>

      <button
        onClick={onGenerate}
        disabled={isGenerating}
        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium tracking-tight transition-all duration-200 active:scale-[0.98] bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-700)] hover:shadow-lg hover:shadow-[var(--color-brand-600)]/25 disabled:opacity-50 disabled:cursor-not-allowed text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-2"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Building your itinerary…
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate Itinerary
          </>
        )}
      </button>
    </div>
  );
}

function ItinerarySummary({ days }: { days: ItineraryDay[] }) {
  const totalActivities = days.reduce(
    (sum, d) => sum + d.activities.length,
    0
  );
  const totalTravelMinutes = days.reduce(
    (sum, d) =>
      sum + d.activities.reduce((s, a) => s + (a.travelMinutes ?? 0), 0),
    0
  );

  const stats = [
    {
      label: "Days",
      value: days.length,
      icon: <Calendar className="w-4 h-4" />,
      description: "Total trip duration",
    },
    {
      label: "Activities",
      value: totalActivities,
      icon: <MapPin className="w-4 h-4" />,
      description: "Planned stops",
    },
    {
      label: "Travel",
      value: totalTravelMinutes > 0 ? `${totalTravelMinutes}m` : "—",
      icon: <Car className="w-4 h-4" />,
      description: "Transit time",
    },
    {
      label: "Avg / day",
      value: days.length ? Math.round(totalActivities / days.length) : 0,
      icon: <Sparkles className="w-4 h-4" />,
      description: "Activities per day",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-4 hover:border-[var(--color-brand-500)]/40 transition-colors"
        >
          <div className="flex items-center gap-2 text-[var(--color-text-tertiary)] text-[10px] uppercase tracking-widest font-bold">
            <span className="text-[var(--color-brand-500)]">{s.icon}</span>
            <span>{s.label}</span>
          </div>
          <div className="mt-1.5 text-lg font-semibold tabular-nums text-[var(--color-text-primary)]">
            {s.value}
          </div>
          <p className="mt-1 text-[var(--color-text-tertiary)] text-xs">{s.description}</p>
        </div>
      ))}
    </div>
  );
}

function ActivityRow({
  activity,
  index,
  isLast,
}: {
  activity: Activity;
  index: number;
  isLast: boolean;
}) {
  const cat = getCategoryConfig(activity.category);

  return (
    <li className="group relative flex flex-col">
      {index > 0 &&
        activity.travelMode &&
        activity.travelMinutes !== null && (
          <div className="flex gap-4">
            <div className="flex flex-col items-center shrink-0 w-[4.25rem]">
              <div className="w-px h-full bg-[var(--color-border)]" />
            </div>
            <div className="flex-1 pb-4 pt-1">
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)] border-l-2 border-dashed border-[var(--color-border)] ml-1 pl-3">
                {activity.travelMode === "walk" ? (
                  <Footprints className="w-3.5 h-3.5" />
                ) : (
                  <Car className="w-3.5 h-3.5" />
                )}
                <span className="font-medium">
                  {activity.travelMinutes} min · {activity.travelDistanceKm} km
                </span>
              </div>
            </div>
          </div>
        )}

      <div className="flex gap-4">
        {/* Time pill + timeline rail */}
        <div className="flex flex-col items-center shrink-0 w-[4.25rem]">
          <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-[var(--color-brand-500)]/30 bg-[var(--color-brand-50)] dark:bg-[var(--color-brand-900)]/40 px-2 py-1 text-[11px] font-semibold tabular-nums leading-none text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)]">
            <Clock className="w-3 h-3 shrink-0 text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]" />
            {formatTime(activity.time)}
          </span>
          {!isLast && (
            <div className="relative flex-1 w-px bg-[var(--color-border)] mt-2">
              <span className="absolute left-1/2 -translate-x-1/2 top-1 h-1.5 w-1.5 rounded-full bg-[var(--color-brand-500)]" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 pb-5">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-sm font-medium text-[var(--color-text-primary)]">
              {activity.title}
            </span>
            <span
              className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${cat.color} border border-transparent`}
            >
              {cat.icon}
              {cat.label}
            </span>
          </div>
          <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
            {activity.description}
          </p>
        </div>
      </div>
    </li>
  );
}

function DayCard({ day }: { day: ItineraryDay }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]/30 text-left hover:bg-[var(--color-surface-muted)]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-elevated)]"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] whitespace-nowrap mb-0.5">
              Day {day.dayNumber}
            </span>
            <span className="text-sm font-medium text-[var(--color-text-primary)]">
              {formatDate(day.date)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs text-[var(--color-text-tertiary)] hidden sm:inline-flex items-center gap-1.5 bg-[var(--color-surface-muted)] border border-[var(--color-border)] px-2.5 py-1 rounded-full">
            <MapPin className="w-3 h-3" />
            {day.activities.length} stop{day.activities.length !== 1 ? "s" : ""}
          </span>
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--color-surface-muted)] border border-[var(--color-border)] text-[var(--color-text-tertiary)] transition-transform duration-200">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </span>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
        aria-hidden={!isExpanded}
      >
        <ul className="p-5 sm:p-6 animate-in fade-in slide-in-from-top-2 duration-200">
          {day.activities.map((activity, i) => (
            <ActivityRow
              key={activity.id}
              activity={activity}
              index={i}
              isLast={i === day.activities.length - 1}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function ItineraryView({ tripId }: { tripId: string }) {
  const router = useRouter();
  const { data: tripData, isLoading: isLoadingTrip } = useGetTripQuery(tripId);
  const { data, isLoading } = useGetItineraryQuery(tripId);
  const [generateItinerary, { isLoading: isGenerating }] =
    useGenerateItineraryMutation();
  const [deleteTrip, { isLoading: isDeleting }] = useDeleteTripMutation();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const trip = tripData?.data;
  const itinerary = data?.data;

  const handleDelete = async () => {
    if (!trip) return;
    await deleteTrip(trip.id).unwrap();
    router.push("/trips");
  };

  if ((isLoading && !itinerary) || isLoadingTrip) return <LoadingSkeleton />;

  if (!trip) {
    return (
      <div className="text-center py-16">
        <p className="text-[var(--color-text-secondary)]">Trip not found.</p>
        <button
          onClick={() => router.push("/trips")}
          className="mt-4 text-sm text-[var(--color-brand-600)] hover:underline"
        >
          Back to My Trips
        </button>
      </div>
    );
  }

  const dateRange =
    trip.startDate && trip.endDate
      ? `${formatShortDate(trip.startDate)} – ${formatShortDate(trip.endDate)}`
      : null;
  const styleInfo = trip.travelStyle
    ? STYLE_CONFIG[trip.travelStyle.toUpperCase()]
    : null;

  return (
    <div className="space-y-8">
      {/* Back + Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/trips")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-brand-600)] dark:hover:text-[var(--color-brand-400)] transition-colors w-fit px-3 py-2 rounded-xl hover:bg-[var(--color-surface-muted)]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to My Trips
          </button>

          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight flex items-center gap-2 text-[var(--color-text-primary)]">
              <MapPin className="w-5 h-5 text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]" />
              {trip.destination}
            </h1>
            {dateRange && (
              <p className="text-xs text-[var(--color-text-secondary)] mt-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {dateRange}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {itinerary && (
            <button
              onClick={() => generateItinerary(tripId)}
              disabled={isGenerating}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] hover:border-[var(--color-brand-500)]/40 hover:bg-[var(--color-brand-50)] dark:hover:bg-[var(--color-brand-900)]/20 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Regenerating…
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Regenerate
                </>
              )}
            </button>
          )}
          <button
            onClick={() => router.push(`/trips/${tripId}/edit`)}
            className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-full text-sm font-medium border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-brand-500)]/40 hover:bg-[var(--color-surface-muted)] transition-all duration-200 active:scale-[0.98]"
          >
            <Pencil className="w-4 h-4" />
            <span className="hidden sm:inline">Edit Trip</span>
          </button>
          <button
            onClick={() => setShowDeleteDialog(true)}
            disabled={isDeleting}
            className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-full text-sm font-medium border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] hover:text-red-500 hover:border-red-500/40 hover:bg-red-500/5 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin text-red-500" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Meta chips */}
      <div className="flex flex-wrap items-center gap-2" role="list" aria-label="Trip details">
        {styleInfo && (
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${styleInfo.chip}`}
            role="listitem"
          >
            {styleInfo.icon}
            {styleInfo.label}
          </span>
        )}
        {typeof trip.travellers === "number" && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] border border-[var(--color-border)]" role="listitem">
            <Users className="w-3.5 h-3.5" />
            {trip.travellers} traveller{Number(trip.travellers) !== 1 ? "s" : ""}
          </span>
        )}
        {trip.budget && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-surface-muted)] text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] border border-[var(--color-border)]" role="listitem">
            <IndianRupee className="w-3.5 h-3.5" />
            {trip.budget.toLocaleString()}
          </span>
        )}
        {itinerary && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[var(--color-brand-900)]/40 dark:text-[var(--color-brand-300)]" role="listitem">
            <Sparkles className="w-3.5 h-3.5" />
            AI-generated
          </span>
        )}
      </div>

      {/* Body */}
      {!itinerary ? (
        <EmptyState
          trip={trip}
          onGenerate={() => generateItinerary(tripId)}
          isGenerating={isGenerating}
        />
      ) : (
        <div className="space-y-6">
          <ItinerarySummary days={itinerary.days} />
          {itinerary.days.map((day) => (
            <DayCard key={day.id} day={day} />
          ))}
        </div>
      )}

      {/* Delete confirmation */}
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
