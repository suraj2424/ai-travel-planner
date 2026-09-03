"use client";

import { Trip } from "@/services/api";
import {
  Users,
  Calendar,
  IndianRupee,
  Trash2,
  Loader2,
  MapPin,
  Mountain,
  Sun,
  Landmark,
  Gem,
  Wallet,
} from "lucide-react";

interface TripCardProps {
  trip: Trip;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

const STYLE_CONFIG: Record<string, { label: string; icon: React.ReactNode }> = {
  ADVENTURE: { label: "Adventure", icon: <Mountain className="w-3.5 h-3.5" /> },
  RELAXED: { label: "Relaxed", icon: <Sun className="w-3.5 h-3.5" /> },
  CULTURAL: { label: "Cultural", icon: <Landmark className="w-3.5 h-3.5" /> },
  LUXURY: { label: "Luxury", icon: <Gem className="w-3.5 h-3.5" /> },
  BUDGET: { label: "Budget", icon: <Wallet className="w-3.5 h-3.5" /> },
};

export default function TripCard({ trip, onDelete, isDeleting }: TripCardProps) {
  const startDate = new Date(trip.startDate).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  const endDate = new Date(trip.endDate).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  const styleInfo = trip.travelStyle ? STYLE_CONFIG[trip.travelStyle.toUpperCase()] : null;

  return (
    <article className="group relative bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--color-brand-500)]/40 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 min-w-0">
            <h3 className="font-bold text-lg text-[var(--color-text-primary)] truncate flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] shrink-0" />
              <span className="truncate">{trip.destination}</span>
            </h3>
            {styleInfo && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[var(--color-brand-900)]/40 dark:text-[var(--color-brand-300)] whitespace-nowrap">
                {styleInfo.icon}
                {styleInfo.label}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(trip.id);
            }}
            disabled={isDeleting}
            className="flex-shrink-0 p-2 text-[var(--color-text-tertiary)] hover:text-red-600 dark:hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            aria-label={`Delete trip to ${trip.destination}`}
            title="Delete trip"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin text-red-500" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Info Grid */}
        <div className="space-y-2 text-sm text-[var(--color-text-secondary)] border-t border-[var(--color-border)] pt-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[var(--color-text-tertiary)] shrink-0" />
            <span>
              {trip.travellers} traveller{trip.travellers !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[var(--color-text-tertiary)] shrink-0" />
            <span>
              {startDate} – {endDate}
            </span>
          </div>

          {trip.budget && (
            <div className="flex items-center gap-2 font-semibold text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]">
              <IndianRupee className="w-4 h-4 shrink-0" />
              <span>{trip.budget.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Interests */}
        {trip.interests && trip.interests.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {trip.interests.slice(0, 4).map((interest) => (
              <span
                key={interest}
                className="px-2 py-0.5 text-xs rounded-md bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
              >
                {interest.replace("_", " ")}
              </span>
            ))}
            {trip.interests.length > 4 && (
              <span className="px-2 py-0.5 text-xs rounded-md bg-[var(--color-surface-muted)] text-[var(--color-text-tertiary)] border border-[var(--color-border)]">
                +{trip.interests.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}