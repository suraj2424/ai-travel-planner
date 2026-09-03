"use client";

import { useState, useMemo, type FormEvent } from "react";
import {
  Sparkles,
  MapPin,
  Users,
  IndianRupee,
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
  Wand2,
  Compass,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import DateInput from "@/components/ui/date-input";
import Button from "@/components/ui/button";
import {
  useCreateTripMutation,
  useParseTripPromptMutation,
  type Trip,
  type ParsedTripPrompt,
} from "@/services/api";

const PROMPT_SUGGESTIONS = [
  {
    label: "Bali · 6 friends",
    prompt: "Bali in May — 6 of us, around ₹60k each. Beaches, temples, one adventure day. Veg options.",
  },
  {
    label: "Goa · weekend",
    prompt: "Goa this weekend — 4 friends, ₹15k each. Beach shacks, cafés, cheap stays.",
  },
  {
    label: "Ladakh · bike trip",
    prompt: "Ladakh in June — 6 riders, Pangong + Nubra, safe pacing, budget stays.",
  },
  {
    label: "Vietnam · backpacking",
    prompt: "Vietnam in October for 2 travellers, 7 days, ₹45k each. Street food, culture, nature.",
  },
];

const TRAVEL_STYLES = [
  { value: "ADVENTURE", label: "Adventure", icon: <Mountain className="w-3.5 h-3.5" /> },
  { value: "RELAXED", label: "Relaxed", icon: <Sun className="w-3.5 h-3.5" /> },
  { value: "CULTURAL", label: "Cultural", icon: <Landmark className="w-3.5 h-3.5" /> },
  { value: "LUXURY", label: "Luxury", icon: <Gem className="w-3.5 h-3.5" /> },
  { value: "BUDGET", label: "Budget", icon: <Wallet className="w-3.5 h-3.5" /> },
];

const POPULAR_INTERESTS = [
  { id: "BEACHES", label: "Beaches", icon: <Palmtree className="w-3.5 h-3.5" /> },
  { id: "FOOD", label: "Food & Cafes", icon: <Utensils className="w-3.5 h-3.5" /> },
  { id: "NIGHTLIFE", label: "Nightlife", icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: "MOUNTAINS", label: "Mountains", icon: <Mountain className="w-3.5 h-3.5" /> },
  { id: "CULTURE", label: "Culture", icon: <Compass className="w-3.5 h-3.5" /> },
  { id: "NATURE", label: "Nature", icon: <Trees className="w-3.5 h-3.5" /> },
  { id: "HISTORY", label: "History", icon: <Landmark className="w-3.5 h-3.5" /> },
  { id: "SHOPPING", label: "Shopping", icon: <ShoppingBag className="w-3.5 h-3.5" /> },
  { id: "TREKKING", label: "Trekking", icon: <Footprints className="w-3.5 h-3.5" /> },
  { id: "WELLNESS", label: "Wellness", icon: <Heart className="w-3.5 h-3.5" /> },
  { id: "PHOTOGRAPHY", label: "Photography", icon: <Camera className="w-3.5 h-3.5" /> },
  { id: "ADVENTURE_SPORTS", label: "Adventure", icon: <Flame className="w-3.5 h-3.5" /> },
];

interface CreateTripFormProps {
  onSuccess?: (trip?: Trip) => void;
}

export default function CreateTripForm({ onSuccess }: CreateTripFormProps) {
  const [createTrip, { isLoading: isCreating }] = useCreateTripMutation();
  const [parseTripPrompt, { isLoading: isParsing }] = useParseTripPromptMutation();

  // Mode: "prompt" vs "manual"
  const [mode, setMode] = useState<"prompt" | "manual">("prompt");
  const [promptText, setPromptText] = useState("");
  const [parsedData, setParsedData] = useState<ParsedTripPrompt | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Format date helper: returns YYYY-MM-DD
  const formatYYYYMMDD = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  // Default start to today, end to today + 3 days (4 days total)
  const defaultDates = useMemo(() => {
    const today = new Date();
    const fourDaysLater = new Date();
    fourDaysLater.setDate(today.getDate() + 3);
    return {
      start: formatYYYYMMDD(today),
      end: formatYYYYMMDD(fourDaysLater),
    };
  }, []);

  // Form State
  const [destination, setDestination] = useState("");
  const [travellers, setTravellers] = useState<number>(2);
  const [startDate, setStartDate] = useState(defaultDates.start);
  const [endDate, setEndDate] = useState(defaultDates.end);
  const [budget, setBudget] = useState("");
  const [travelStyle, setTravelStyle] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [highlights, setHighlights] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Normalize date string helper (takes YYYY-MM-DD or ISO string and returns YYYY-MM-DD)
  const toDateInputValue = (dStr: string) => {
    if (!dStr) return "";
    const clean = dStr.split("T")[0];
    return /^\d{4}-\d{2}-\d{2}$/.test(clean) ? clean : "";
  };

  // Validation
  const dateError = useMemo(() => {
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      return "End date must be on or after start date";
    }
    return null;
  }, [startDate, endDate]);

  const tripDays = useMemo(() => {
    if (startDate && endDate && !dateError) {
      const start = new Date(startDate + "T00:00:00");
      const end = new Date(endDate + "T00:00:00");
      const diffTime = end.getTime() - start.getTime();
      return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1);
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

  // AI Prompt Parsing Handler
  const handleParsePrompt = async (customPrompt?: string) => {
    const textToParse = customPrompt !== undefined ? customPrompt : promptText;
    if (!textToParse.trim()) return;

    setSubmitError(null);
    try {
      const res = await parseTripPrompt({ prompt: textToParse }).unwrap();
      const data = res.data;
      setParsedData(data);

      // Clean & set state
      setDestination(data.destination || "");
      setTravellers(data.travellers || 2);
      setStartDate(toDateInputValue(data.startDate));
      setEndDate(toDateInputValue(data.endDate));
      setBudget(data.budget ? String(data.budget) : "");
      setTravelStyle(data.travelStyle || "");
      setInterests(data.interests || []);
      setHighlights(data.highlights || []);
    } catch (err: unknown) {
      console.error("Failed to parse prompt:", err);
      setSubmitError("Could not parse prompt with AI. Please tweak your prompt or use the form below.");
    }
  };

  const handleSuggestionClick = (suggestion: (typeof PROMPT_SUGGESTIONS)[number]) => {
    setPromptText(suggestion.prompt);
    handleParsePrompt(suggestion.prompt);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (dateError) return;
    if (!destination.trim()) {
      setSubmitError("Please provide a destination.");
      return;
    }
    if (!startDate || !endDate) {
      setSubmitError("Please select both start and end dates.");
      return;
    }

    const payload = {
      destination: destination.trim(),
      travellers,
      startDate: new Date(startDate + "T00:00:00Z").toISOString(),
      endDate: new Date(endDate + "T00:00:00Z").toISOString(),
      ...(budget && { budget: parseInt(budget, 10) }),
      ...(travelStyle && { travelStyle }),
      ...(interests.length > 0 && { interests }),
    };

    try {
      const result = await createTrip(payload).unwrap();
      if (result?.data) {
        onSuccess?.(result.data);
      } else {
        onSuccess?.();
      }
    } catch (err: unknown) {
      console.error("Failed to create trip:", err);
      setSubmitError("Failed to create trip. Please check details and try again.");
    }
  };

  const parsedBudget = budget ? parseInt(budget, 10) : null;
  const perPersonBudget = parsedBudget ? Math.round(parsedBudget / Math.max(1, travellers)) : null;

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Mode Switch Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--color-brand-500)]/15 text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
              {mode === "prompt" ? "AI Prompt Planning" : "Standard Trip Form"}
            </h2>
            <p className="text-[11px] text-[var(--color-text-tertiary)]">
              {mode === "prompt"
                ? "Describe your idea in one line · AI configures dates, budget & group"
                : "Fill out destination, group size, and dates manually"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMode(mode === "prompt" ? "manual" : "prompt")}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-brand-500)]/40 transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="w-3 h-3 text-[var(--color-brand-600)]" />
          {mode === "prompt" ? "Manual mode" : "Prompt mode"}
        </button>
      </div>

      {submitError && (
        <div className="flex items-start gap-2.5 p-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{submitError}</span>
        </div>
      )}

      {/* COMPACT AI PROMPT CARD */}
      {mode === "prompt" && (
        <div className="rounded-2xl border border-[var(--color-brand-500)]/30 bg-[var(--color-surface-elevated)] p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <label
              htmlFor="travel-prompt"
              className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] flex items-center gap-1.5"
            >
              <Wand2 className="w-3.5 h-3.5" />
              Describe your trip
            </label>
            <span className="text-[11px] text-[var(--color-text-tertiary)]">
              Press Enter or click Parse
            </span>
          </div>

          <div className="relative">
            <textarea
              id="travel-prompt"
              rows={2}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="e.g. Bali in May — 6 of us, around ₹60k each. Beaches, temples, veg options."
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-500)]/30 focus:border-[var(--color-brand-500)] transition-all resize-none leading-relaxed"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleParsePrompt();
                }
              }}
            />
          </div>

          {/* Prompt chips & submit row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-0.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-medium text-[var(--color-text-tertiary)]">
                Try:
              </span>
              {PROMPT_SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => handleSuggestionClick(s)}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-brand-500)] hover:text-[var(--color-brand-600)] transition-colors cursor-pointer"
                >
                  {s.label}
                </button>
              ))}
            </div>

            <Button
              type="button"
              onClick={() => handleParsePrompt()}
              disabled={isParsing || !promptText.trim()}
              variant="primary"
              className="!px-4 !py-1.5 !text-xs !rounded-lg shrink-0 self-end sm:self-auto"
            >
              {isParsing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Parsing...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Parse Prompt
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* MAIN FORM: COMPACT, HIGH-CLARITY UI */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4 sm:p-5 shadow-xs space-y-4"
        id="create-trip-form"
      >
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2.5">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-tertiary)]">
              {parsedData ? "Review & Adjust Details" : "Trip Details"}
            </h3>
            {tripDays && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[var(--color-brand-500)]/10 text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]">
                {tripDays} Days
              </span>
            )}
          </div>

          {parsedData && (
            <button
              type="button"
              onClick={() => {
                setParsedData(null);
                setPromptText("");
                setHighlights([]);
              }}
              className="text-[11px] text-[var(--color-text-tertiary)] hover:text-red-500 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset fields
            </button>
          )}
        </div>

        {/* AI Badges row (if any) */}
        {highlights.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 p-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <span className="text-[11px] font-semibold text-[var(--color-text-tertiary)] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[var(--color-brand-600)]" />
              Highlights:
            </span>
            {highlights.map((h, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text-secondary)]"
              >
                <Check className="w-3 h-3 text-emerald-500" />
                {h}
              </span>
            ))}
          </div>
        )}

        {/* Row 1: Destination & Travellers */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8">
            <Input
              id="destination"
              label="Destination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g., Bali, Indonesia or Goa, India"
              required
              trailing={<MapPin className="w-3.5 h-3.5 text-[var(--color-text-tertiary)]" />}
            />
          </div>

          {/* Compact Travellers Stepper */}
          <div className="sm:col-span-4 space-y-1.5">
            <label
              htmlFor="travellers"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]"
            >
              Travellers
            </label>
            <div className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus-within:ring-2 focus-within:ring-[var(--color-brand-500)]/20 focus-within:border-[var(--color-brand-500)]">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Users className="w-3.5 h-3.5 text-[var(--color-text-tertiary)] shrink-0" />
                <span className="font-semibold text-xs truncate">
                  {travellers} {travellers === 1 ? "person" : "people"}
                </span>
              </div>
              <div className="flex items-center gap-1 border-l border-[var(--color-border)] pl-2">
                <button
                  type="button"
                  onClick={() => setTravellers((prev) => Math.max(1, prev - 1))}
                  disabled={travellers <= 1}
                  className="p-1 rounded hover:bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] disabled:opacity-30 cursor-pointer"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => setTravellers((prev) => Math.min(50, prev + 1))}
                  disabled={travellers >= 50}
                  className="p-1 rounded hover:bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] disabled:opacity-30 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Dates (Start & End) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <DateInput
            id="startDate"
            label="Start Date"
            value={startDate}
            onChange={(val) => setStartDate(toDateInputValue(val))}
            placeholder="Select start date"
            required
            error={dateError || undefined}
          />

          <DateInput
            id="endDate"
            label="End Date"
            value={endDate}
            onChange={(val) => setEndDate(toDateInputValue(val))}
            min={startDate}
            placeholder="Select end date"
            required
            error={dateError || undefined}
          />
        </div>

        {/* Row 3: Budget & Travel Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Input
              id="budget"
              label={
                perPersonBudget && travellers > 1
                  ? `Total Budget (₹${perPersonBudget.toLocaleString("en-IN")} / head)`
                  : "Total Budget (INR ₹)"
              }
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g., 60000"
              min="0"
              step="1000"
              trailing={<IndianRupee className="w-3.5 h-3.5 text-[var(--color-text-tertiary)]" />}
            />
          </div>

          <Select
            id="travelStyle"
            label="Travel Style"
            value={travelStyle}
            onChange={(e) => setTravelStyle(e.target.value)}
            options={[
              { value: "", label: "Select style (Optional)" },
              ...TRAVEL_STYLES.map((s) => ({ value: s.value, label: s.label })),
            ]}
          />
        </div>

        {/* Advanced Options Toggle: Interests */}
        <div className="pt-1 border-t border-[var(--color-border)]">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full py-1 text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[var(--color-brand-600)]" />
              Interests & Vibes {interests.length > 0 && `(${interests.length} selected)`}
            </span>
            {showAdvanced ? (
              <ChevronUp className="w-3.5 h-3.5 text-[var(--color-text-tertiary)]" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-[var(--color-text-tertiary)]" />
            )}
          </button>

          {showAdvanced && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-2.5 animate-in fade-in duration-200">
              {POPULAR_INTERESTS.map((interest) => {
                const isSelected = interests.includes(interest.id);
                return (
                  <button
                    key={interest.id}
                    type="button"
                    onClick={() => toggleInterest(interest.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-left text-xs transition-colors cursor-pointer ${isSelected
                      ? "border-[var(--color-brand-500)] bg-[var(--color-brand-500)]/10 text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] font-medium"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-brand-500)]/30"
                      }`}
                  >
                    <span className="shrink-0">{interest.icon}</span>
                    <span className="truncate flex-1 text-[11px]">{interest.label}</span>
                    {isSelected && <Check className="w-3 h-3 shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            disabled={isCreating || !destination || !startDate || !endDate}
            className="w-full !py-2.5 !text-sm !font-semibold !rounded-xl flex items-center justify-center gap-2 shadow-xs"
          >
            {isCreating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating Trip...
              </>
            ) : (
              <>
                <span>Confirm & Generate Itinerary</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}