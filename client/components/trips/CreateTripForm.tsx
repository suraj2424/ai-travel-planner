"use client";

import { useState, useMemo, type FormEvent } from "react";
import {
  Sparkles,
  MapPin,
  Users,
  IndianRupee,
  Compass,
  Check,
  AlertCircle,
  Loader2,
  Minus,
  Plus,
  Mountain,
  Sun,
  Landmark,
  Gem,
  Wallet,
  ArrowRight,
  Utensils,
  Palmtree,
  Trees,
  ShoppingBag,
  Camera,
  Footprints,
  Heart,
  Flame,
} from "lucide-react";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import DateInput from "@/components/ui/date-input";
import Button from "@/components/ui/button";
import { useCreateTripMutation } from "@/services/api";

const QUICK_DESTINATIONS = ["Goa, India", "Manali, Himachal", "Vietnam", "Tokyo, Japan", "Bali, Indonesia"];

const TRAVEL_STYLES = [
  { value: "ADVENTURE", label: "Adventure", icon: <Mountain className="w-3.5 h-3.5" /> },
  { value: "RELAXED", label: "Relaxed", icon: <Sun className="w-3.5 h-3.5" /> },
  { value: "CULTURAL", label: "Cultural", icon: <Landmark className="w-3.5 h-3.5" /> },
  { value: "LUXURY", label: "Luxury", icon: <Gem className="w-3.5 h-3.5" /> },
  { value: "BUDGET", label: "Budget", icon: <Wallet className="w-3.5 h-3.5" /> },
];

const INTERESTS_WITH_ICONS = [
  { id: "FOOD", label: "Food & Cafes", icon: <Utensils className="w-3.5 h-3.5" /> },
  { id: "BEACHES", label: "Beaches", icon: <Palmtree className="w-3.5 h-3.5" /> },
  { id: "MOUNTAINS", label: "Mountains", icon: <Mountain className="w-3.5 h-3.5" /> },
  { id: "NIGHTLIFE", label: "Nightlife", icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: "HISTORY", label: "History", icon: <Landmark className="w-3.5 h-3.5" /> },
  { id: "NATURE", label: "Nature", icon: <Trees className="w-3.5 h-3.5" /> },
  { id: "SHOPPING", label: "Shopping", icon: <ShoppingBag className="w-3.5 h-3.5" /> },
  { id: "CULTURE", label: "Culture", icon: <Compass className="w-3.5 h-3.5" /> },
  { id: "WILDLIFE", label: "Wildlife", icon: <Footprints className="w-3.5 h-3.5" /> },
  { id: "PHOTOGRAPHY", label: "Photography", icon: <Camera className="w-3.5 h-3.5" /> },
  { id: "TREKKING", label: "Trekking", icon: <Footprints className="w-3.5 h-3.5" /> },
  { id: "WELLNESS", label: "Wellness", icon: <Heart className="w-3.5 h-3.5" /> },
  { id: "SPIRITUAL", label: "Spiritual", icon: <Sun className="w-3.5 h-3.5" /> },
  { id: "ADVENTURE_SPORTS", label: "Adventure", icon: <Flame className="w-3.5 h-3.5" /> },
];

interface CreateTripFormProps {
  onSuccess?: () => void;
}

export default function CreateTripForm({ onSuccess }: CreateTripFormProps) {
  const [createTrip, { isLoading }] = useCreateTripMutation();

  // Form State
  const [destination, setDestination] = useState("");
  const [travellers, setTravellers] = useState<number>(2);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [travelStyle, setTravelStyle] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Validation
  const dateError = useMemo(() => {
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      return "End date cannot be earlier than start date";
    }
    return null;
  }, [startDate, endDate]);

  // Calculate trip duration in days
  const tripDays = useMemo(() => {
    if (startDate && endDate && !dateError) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return null;
  }, [startDate, endDate, dateError]);

  const toggleInterest = (interestId: string) => {
    setInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((i) => i !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (dateError) return;

    const payload = {
      destination,
      travellers,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      ...(budget && { budget: parseInt(budget, 10) }),
      ...(travelStyle && { travelStyle }),
      ...(interests.length > 0 && { interests }),
    };

    try {
      await createTrip(payload).unwrap();

      // Reset form on success
      setDestination("");
      setTravellers(2);
      setStartDate("");
      setEndDate("");
      setBudget("");
      setTravelStyle("");
      setInterests([]);

      onSuccess?.();
    } catch (err: unknown) {
      console.error("Failed to create trip:", err);
      setSubmitError("Failed to create trip. Please try again.");
    }
  };

  const formattedStartDate = startDate
    ? new Date(startDate + "T00:00:00").toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      })
    : null;

  const formattedEndDate = endDate
    ? new Date(endDate + "T00:00:00").toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const selectedStyleObj = TRAVEL_STYLES.find((s) => s.value === travelStyle);
  const parsedBudget = budget ? parseInt(budget, 10) : null;
  const perPersonBudget = parsedBudget ? Math.round(parsedBudget / travellers) : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
      {/* Main Form (7 cols) */}
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-7 space-y-4 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-4 sm:p-5 shadow-sm"
        id="create-trip-form"
      >
        {submitError && (
          <div className="flex items-start gap-3 p-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Destination Field & Quick Chips */}
        <div className="space-y-1.5">
          <Input
            id="destination"
            label="Destination"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g., Goa, India or Tokyo, Japan"
            required
            trailing={<MapPin className="w-4 h-4 text-[var(--color-text-tertiary)]" />}
          />

          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <span className="text-[11px] font-medium text-[var(--color-text-tertiary)]">Popular:</span>
            {QUICK_DESTINATIONS.map((dest) => (
              <button
                key={dest}
                type="button"
                onClick={() => setDestination(dest)}
                className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-brand-500)]/40 hover:text-[var(--color-brand-600)] dark:hover:text-[var(--color-brand-400)] transition-colors cursor-pointer"
              >
                {dest}
              </button>
            ))}
          </div>
        </div>

        {/* Dates & Group Size Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <DateInput
            id="startDate"
            label="Start Date"
            value={startDate}
            onChange={setStartDate}
            placeholder="Select date"
            required
            error={dateError || undefined}
          />

          <DateInput
            id="endDate"
            label="End Date"
            value={endDate}
            onChange={setEndDate}
            min={startDate}
            placeholder="Select date"
            required
            error={dateError || undefined}
          />

          {/* Travellers Stepper */}
          <div className="space-y-1.5">
            <label
              htmlFor="travellers"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]"
            >
              Travellers
            </label>
            <div className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[14px] text-[var(--color-text-primary)] transition-colors focus-within:ring-2 focus-within:ring-[var(--color-brand-500)]/20 focus-within:border-[var(--color-brand-500)]">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Users className="w-4 h-4 text-[var(--color-text-tertiary)] shrink-0" />
                <input
                  id="travellers"
                  type="number"
                  value={travellers}
                  min={1}
                  max={50}
                  onChange={(e) => {
                    const val = e.target.value;
                    const parsed = val === "" ? 1 : parseInt(val, 10);
                    if (!isNaN(parsed)) setTravellers(Math.min(Math.max(parsed, 1), 50));
                  }}
                  className="w-full bg-transparent border-none outline-none text-[14px] text-[var(--color-text-primary)] font-semibold p-0 focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center gap-1 shrink-0 pl-2 border-l border-[var(--color-border)]">
                <button
                  type="button"
                  onClick={() => setTravellers((prev) => Math.max(1, prev - 1))}
                  disabled={travellers <= 1}
                  className="w-5.5 h-5.5 rounded-md bg-[var(--color-surface-muted)] hover:bg-[var(--color-border)] flex items-center justify-center text-[var(--color-text-primary)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Decrease travellers"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => setTravellers((prev) => Math.min(50, prev + 1))}
                  disabled={travellers >= 50}
                  className="w-5.5 h-5.5 rounded-md bg-[var(--color-surface-muted)] hover:bg-[var(--color-border)] flex items-center justify-center text-[var(--color-text-primary)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Increase travellers"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Budget & Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            id="budget"
            label="Budget (INR, Optional)"
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="e.g., 50000"
            trailing={
              <IndianRupee className="w-4 h-4 text-[var(--color-text-tertiary)]" />
            }
          />

          <Select
            id="travelStyle"
            label="Travel Style (Optional)"
            value={travelStyle}
            onChange={(e) => setTravelStyle(e.target.value)}
            options={TRAVEL_STYLES}
            placeholder="Select a style..."
          />
        </div>

        {/* Interests Selection */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
              Interests (Optional)
            </label>
            {interests.length > 0 && (
              <span className="text-xs font-semibold text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]">
                {interests.length} selected
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {INTERESTS_WITH_ICONS.map((item) => {
              const isSelected = interests.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleInterest(item.id)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "bg-[var(--color-brand-600)] text-white shadow-2xs font-semibold"
                      : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-brand-500)]/40 hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  <span className={isSelected ? "text-white" : "text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]"}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {isSelected && <Check className="w-3 h-3 ml-0.5 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-1">
          <Button
            type="submit"
            variant="primary"
            className="w-full !py-2.5 text-sm font-bold flex items-center justify-center gap-2 shadow-xs"
            disabled={
              isLoading || !destination || !startDate || !endDate || !!dateError
            }
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating AI Itinerary...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Create AI Trip</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Compact Live Preview Card (5 cols) */}
      <div className="lg:col-span-5 space-y-4">
        <div className="p-4 rounded-2xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] space-y-3.5 shadow-sm">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-tertiary)] flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] animate-pulse" />
              Live Itinerary Draft
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
              AI Ready
            </span>
          </div>

          {/* Hero Live Banner */}
          <div className="rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] space-y-3 p-3.5">
            <div className="rounded-lg bg-gradient-to-r from-[var(--color-brand-600)] to-[var(--color-brand-500)] p-3.5 text-white space-y-1 shadow-xs">
              <div className="flex items-center justify-between text-[10px] font-semibold opacity-90">
                <span>DESTINATION</span>
                {tripDays && <span>{tripDays} DAYS</span>}
              </div>
              <h3 className="font-bold text-lg tracking-tight truncate">
                {destination || "Your Destination"}
              </h3>
              {selectedStyleObj && (
                <div className="pt-0.5 flex items-center gap-1.5 text-xs text-white/90">
                  {selectedStyleObj.icon}
                  <span className="font-medium">{selectedStyleObj.label} Style</span>
                </div>
              )}
            </div>

            {/* Combined Stats Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-[var(--color-surface-muted)] border border-[var(--color-border)] space-y-0.5">
                <span className="text-[10px] font-semibold uppercase text-[var(--color-text-tertiary)] block">
                  Dates
                </span>
                <span className="font-semibold text-[var(--color-text-primary)] block truncate text-[11px]">
                  {formattedStartDate && formattedEndDate
                    ? `${formattedStartDate} – ${formattedEndDate}`
                    : "Pending"}
                </span>
              </div>

              <div className="p-2 rounded-lg bg-[var(--color-surface-muted)] border border-[var(--color-border)] space-y-0.5">
                <span className="text-[10px] font-semibold uppercase text-[var(--color-text-tertiary)] block">
                  Group Size
                </span>
                <span className="font-semibold text-[var(--color-text-primary)] block truncate text-[11px]">
                  {travellers} Traveller{travellers !== 1 ? "s" : ""}
                </span>
              </div>

              {parsedBudget && (
                <div className="p-2 rounded-lg bg-[var(--color-surface-muted)] border border-[var(--color-border)] space-y-0.5">
                  <span className="text-[10px] font-semibold uppercase text-[var(--color-text-tertiary)] block">
                    Total Budget
                  </span>
                  <span className="font-semibold text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] block truncate text-[11px]">
                    ₹{parsedBudget.toLocaleString()}
                  </span>
                </div>
              )}

              {perPersonBudget && (
                <div className="p-2 rounded-lg bg-[var(--color-surface-muted)] border border-[var(--color-border)] space-y-0.5">
                  <span className="text-[10px] font-semibold uppercase text-[var(--color-text-tertiary)] block">
                    Per Head
                  </span>
                  <span className="font-semibold text-[var(--color-text-primary)] block truncate text-[11px]">
                    ₹{perPersonBudget.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Selected Interests */}
            <div className="space-y-1 pt-0.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
                Selected Vibe ({interests.length})
              </span>
              {interests.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {interests.map((id) => {
                    const found = INTERESTS_WITH_ICONS.find((i) => i.id === id);
                    return (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] rounded-full bg-[var(--color-brand-50)] dark:bg-[var(--color-brand-950)]/60 text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)] border border-[var(--color-brand-200)] dark:border-[var(--color-brand-800)]/60 font-medium"
                      >
                        <span className="text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]">
                          {found?.icon}
                        </span>
                        <span>{found?.label || id}</span>
                      </span>
                    );
                  })}
                </div>
              ) : (
                <p className="text-[11px] text-[var(--color-text-tertiary)] italic">
                  Select interests to customize AI recommendations
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}