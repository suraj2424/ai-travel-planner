"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import {
  DESTINATIONS,
  STYLE_OPTIONS,
  THINKING_STEPS,
  generatePlan,
  type PlanInput,
  type PlanResult,
} from "@/lib/itinerary";

type Phase = "idle" | "thinking" | "done";

const PACES = ["relaxed", "balanced", "packed"] as const;
const BUDGETS = [
  { value: "shoestring", label: "Shoestring" },
  { value: "comfort", label: "Comfort" },
  { value: "luxe", label: "Splurge" },
] as const;

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  return (
    <div>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-inkline/70">
        {label}
      </span>
      <div className="mt-2 flex items-center border-2 border-inkline bg-parchment">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="px-4 py-2.5 text-lg font-bold text-ink transition-colors hover:bg-bone2"
        >
          −
        </button>
        <span className="min-w-[64px] flex-1 text-center font-display text-xl font-extrabold text-ink">
          {value}
          {suffix && <span className="ml-1 text-xs font-semibold text-tealine">{suffix}</span>}
        </span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="px-4 py-2.5 text-lg font-bold text-ink transition-colors hover:bg-bone2"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function Planner() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(5);
  const [travelers, setTravelers] = useState(2);
  const [pace, setPace] = useState<(typeof PACES)[number]>("balanced");
  const [budget, setBudget] = useState<(typeof BUDGETS)[number]["value"]>("comfort");
  const [styles, setStyles] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [stepIdx, setStepIdx] = useState(0);
  const [result, setResult] = useState<(PlanResult & { id: number | null }) | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* listen for postcard prefill */
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const name = (e as CustomEvent<string>).detail;
      if (!name) return;
      setDestination(name);
      setPhase("idle");
      setResult(null);
      setError(null);
      document.getElementById("planner")?.scrollIntoView({ behavior: "smooth" });
    };
    window.addEventListener("aire:prefill", onPrefill);
    return () => window.removeEventListener("aire:prefill", onPrefill);
  }, []);

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const toggleStyle = (s: string) =>
    setStyles((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const surpriseMe = () => {
    const d = DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)];
    setDestination(d.name);
    setError(null);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!destination.trim() || phase === "thinking") return;
    setError(null);
    setCopied(false);
    setPhase("thinking");
    setStepIdx(0);

    timerRef.current = setInterval(() => {
      setStepIdx((i) => Math.min(i + 1, THINKING_STEPS.length - 1));
    }, 440);

    const minDelay = new Promise((r) => setTimeout(r, 2700));
    try {
      const input: PlanInput = {
        destination: destination.trim(),
        days,
        travelers,
        pace,
        budget,
        styles,
        month: "",
      };
      const [plan] = await Promise.all([
        Promise.resolve(generatePlan(input)),
        minDelay,
      ]);
      setResult({ ...plan, id: null });
      setPhase("done");
      setTimeout(() => {
        document.getElementById("itinerary")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The engine stalled. Try again.");
      setPhase("idle");
    } finally {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const reset = () => {
    setPhase("idle");
    setResult(null);
    setCopied(false);
    setDestination("");
    document.getElementById("planner")?.scrollIntoView({ behavior: "smooth" });
  };

  const copyItinerary = async () => {
    if (!result) return;
    const lines: string[] = [
      `ATLAS & AIRE — ${result.title.toUpperCase()}`,
      result.tagline,
      "",
    ];
    for (const d of result.days) {
      lines.push(`DAY ${String(d.n).padStart(2, "0")} — ${d.theme}`);
      for (const s of d.slots) lines.push(`  ${s.time}  ${s.title} — ${s.detail}`);
      lines.push(`  LOCAL SECRET: ${d.secret}`);
      lines.push(`  EAT: ${d.dish}`, "");
    }
    lines.push(`BUDGET: ${result.budget.perDay} (${result.budget.total}). ${result.budget.note}`);
    lines.push(`BEST TIME: ${result.bestTime}`);
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable */
    }
  };

  const budgetLabel = BUDGETS.find((b) => b.value === budget)?.label ?? "Comfort";

  return (
    <section id="planner" className="relative bg-bone py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-tealine">
                The planning desk · try it right now
              </p>
              <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
                Chart a trip in{" "}
                <em className="font-serif font-medium italic text-coral">42 seconds</em>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-inkline/80">
              A real itinerary, generated live and stamped onto the trip board.
              Try “Kyoto”, “Patagonia” — or just a mood.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={onSubmit}
            className="relative mt-12 grid border-2 border-inkline bg-parchment shadow-[12px_12px_0_rgba(8,26,32,0.16)] lg:grid-cols-[1fr_330px]"
          >
            {/* left — fields */}
            <div className="p-6 sm:p-9">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <label htmlFor="dest" className="font-mono text-[10px] uppercase tracking-[0.22em] text-inkline/70">
                  Where does your heart go?
                </label>
                <button
                  type="button"
                  onClick={surpriseMe}
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-coral underline decoration-dashed underline-offset-4 transition-colors hover:text-ink"
                >
                  ⚄ Surprise me
                </button>
              </div>
              <input
                id="dest"
                list="dest-options"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Kyoto, somewhere warm, “cheap & weird & food”…"
                className="mt-2 w-full border-2 border-inkline bg-bone px-4 py-4 font-display text-2xl font-bold text-ink placeholder:font-body placeholder:text-base placeholder:font-normal placeholder:text-inkline/40 focus:border-coral focus:outline-none"
                disabled={phase === "thinking"}
              />
              <datalist id="dest-options">
                {DESTINATIONS.map((d) => (
                  <option key={d.code} value={d.name}>
                    {d.country}
                  </option>
                ))}
              </datalist>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <Stepper label="Days away" value={days} min={2} max={10} onChange={setDays} />
                <Stepper label="Travelers" value={travelers} min={1} max={8} onChange={setTravelers} suffix="pax" />
              </div>

              <div className="mt-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-inkline/70">Pace</span>
                <div className="mt-2 grid grid-cols-3 border-2 border-inkline">
                  {PACES.map((p, i) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPace(p)}
                      className={`px-2 py-3 text-sm font-bold capitalize transition-colors ${
                        i > 0 ? "border-l-2 border-inkline" : ""
                      } ${
                        pace === p
                          ? "bg-ink text-amber"
                          : "bg-parchment text-inkline/70 hover:bg-bone2"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-inkline/70">Budget</span>
                <div className="mt-2 grid grid-cols-3 border-2 border-inkline">
                  {BUDGETS.map((b, i) => (
                    <button
                      key={b.value}
                      type="button"
                      onClick={() => setBudget(b.value)}
                      className={`px-2 py-3 text-sm font-bold transition-colors ${
                        i > 0 ? "border-l-2 border-inkline" : ""
                      } ${
                        budget === b.value
                          ? "bg-coral text-parchment"
                          : "bg-parchment text-inkline/70 hover:bg-bone2"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-inkline/70">
                  Travel styles — pick a few
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {STYLE_OPTIONS.map((s) => {
                    const on = styles.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleStyle(s)}
                        aria-pressed={on}
                        className={`border-2 px-3.5 py-1.5 text-[13px] font-semibold transition-all ${
                          on
                            ? "-translate-y-0.5 border-ink bg-tealine text-parchment shadow-[3px_3px_0_rgba(8,26,32,0.5)]"
                            : "border-inkline/50 bg-parchment text-inkline/70 hover:border-inkline hover:text-ink"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* perforation + stub */}
            <div className="relative hidden lg:block" aria-hidden>
              <div className="absolute inset-y-6 left-0 w-0 border-l-2 border-dashed border-inkline/40" />
              <div className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-bone" />
              <div className="absolute -bottom-3 -left-3 h-6 w-6 rounded-full bg-bone" />
            </div>

            <div className="border-t-2 border-dashed border-inkline/40 bg-bone2/70 p-6 sm:p-8 lg:border-t-0">
              {phase === "thinking" ? (
                <div aria-live="polite">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-tealine">
                    Engine airborne…
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {THINKING_STEPS.map((s, i) => (
                      <li
                        key={s}
                        className={`flex items-start gap-2.5 font-mono text-[11.5px] leading-snug transition-opacity duration-300 ${
                          i <= stepIdx ? "opacity-100" : "opacity-25"
                        }`}
                      >
                        <span className={i < stepIdx ? "text-coral" : "animate-blink text-tealine"}>
                          {i < stepIdx ? "✓" : "✈"}
                        </span>
                        <span className="text-inkline">{s}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 h-2 w-full border border-inkline/40 bg-parchment">
                    <div
                      className="h-full bg-coral transition-all duration-500"
                      style={{ width: `${((stepIdx + 1) / THINKING_STEPS.length) * 100}%` }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-tealine">
                    Flight summary
                  </p>
                  <dl className="mt-4 space-y-2 font-mono text-[12px] text-inkline">
                    <div className="flex justify-between gap-4">
                      <dt className="text-inkline/60">DEST</dt>
                      <dd className="truncate font-semibold text-ink">{destination || "—"}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-inkline/60">DAYS</dt>
                      <dd className="font-semibold text-ink">{days}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-inkline/60">PAX</dt>
                      <dd className="font-semibold text-ink">{travelers}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-inkline/60">PACE</dt>
                      <dd className="font-semibold capitalize text-ink">{pace}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-inkline/60">CLASS</dt>
                      <dd className="font-semibold text-ink">{budgetLabel}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-inkline/60">STYLES</dt>
                      <dd className="truncate font-semibold text-ink">
                        {styles.length ? styles.join(", ") : "open to wonder"}
                      </dd>
                    </div>
                  </dl>
                  {error && (
                    <p className="mt-4 border-2 border-coral bg-coral/10 px-3 py-2 font-mono text-[11px] text-coral">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={!destination.trim()}
                    className="btn-stamp mt-6 w-full bg-ink px-5 py-4 font-display text-lg font-extrabold text-amber shadow-[5px_5px_0_#d8442e] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                  >
                    Generate my itinerary ✈
                  </button>
                  <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-inkline/60">
                    Free · saved to the live trip board
                  </p>
                </>
              )}
            </div>
          </form>
        </Reveal>

        {/* ------- result: the itinerary ticket ------- */}
        {phase === "done" && result && (
          <div id="itinerary" className="mt-16 scroll-mt-24">
            <Reveal>
              {/* ticket header */}
              <div className="grid gap-6 border-2 border-ink bg-ink p-6 text-bone sm:grid-cols-[1fr_auto] sm:p-9">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-lagoon">
                    Itinerary confirmed · {result.code}
                  </p>
                  <h3 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                    {result.name}
                    <span className="ml-3 align-middle font-mono text-sm font-medium tracking-[0.2em] text-faded">
                      {result.country.toUpperCase()}
                    </span>
                  </h3>
                  <p className="mt-3 font-serif text-lg italic text-amber">
                    {result.tagline}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-2 sm:items-end">
                  {result.id && (
                    <span className="rotate-2 border-2 border-coral px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-coral">
                      STAMPED TO BOARD · #{result.id}
                    </span>
                  )}
                  <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.15em]">
                    <span className="border border-ridge px-2.5 py-1 text-mist">{result.days.length} days</span>
                    <span className="border border-ridge px-2.5 py-1 text-mist capitalize">{pace} pace</span>
                    <span className="border border-ridge px-2.5 py-1 text-mist">{budgetLabel}</span>
                    <span className="border border-ridge px-2.5 py-1 text-mist">{travelers} pax</span>
                  </div>
                </div>
              </div>

              {/* days */}
              <div className="border-x-2 border-b-2 border-ink bg-parchment p-6 sm:p-9">
                <ol className="relative space-y-10 border-l-2 border-dashed border-inkline/40 pl-8 sm:pl-10">
                  {result.days.map((d) => (
                    <li key={d.n} className="relative">
                      <span className="absolute -left-[49px] grid h-6 w-6 place-items-center rounded-full border-2 border-ink bg-amber font-mono text-[10px] font-bold text-ink sm:-left-[57px]">
                        {d.n}
                      </span>
                      <h4 className="font-display text-2xl font-extrabold text-ink">
                        Day {String(d.n).padStart(2, "0")} — {d.theme}
                      </h4>
                      <ul className="mt-4 space-y-3">
                        {d.slots.map((s) => (
                          <li key={s.time + s.title} className="grid gap-1.5 sm:grid-cols-[64px_1fr_auto] sm:gap-4">
                            <span className="font-mono text-[12px] font-semibold text-coral">{s.time}</span>
                            <span className="text-[15px] leading-snug text-ink">
                              <strong className="font-bold">{s.title}.</strong>{" "}
                              <span className="text-inkline/85">{s.detail}</span>
                            </span>
                            <span className="hidden font-mono text-[10px] tracking-[0.2em] text-tealine sm:block" aria-label={`cost level ${s.cost} of 3`}>
                              {"●".repeat(s.cost)}
                              {"○".repeat(3 - s.cost)}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 grid gap-3 sm:grid-cols-[1.2fr_1fr]">
                        <p className="border-2 border-coral/70 bg-coral/5 px-4 py-3 text-[13px] leading-snug text-ink">
                          <span className="mr-2 inline-block -rotate-3 border border-coral px-1.5 py-0.5 align-middle font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-coral">
                            Local secret
                          </span>
                          {d.secret}
                        </p>
                        <p className="border-2 border-inkline/30 bg-bone2/60 px-4 py-3 font-mono text-[12px] leading-snug text-inkline">
                          <span className="font-bold text-tealine">EAT →</span> {d.dish}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                {/* footer strip */}
                <div className="mt-12 grid gap-px border-2 border-inkline/60 bg-inkline/60 sm:grid-cols-3">
                  <div className="bg-parchment p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-tealine">Budget, per person</p>
                    <p className="mt-2 font-display text-xl font-extrabold text-ink">{result.budget.perDay}</p>
                    <p className="font-mono text-[11px] text-inkline/70">{result.budget.total}</p>
                    <p className="mt-1 text-[11px] text-inkline/60">{result.budget.note}</p>
                  </div>
                  <div className="bg-parchment p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-tealine">Best window</p>
                    <p className="mt-2 text-sm leading-snug text-ink">{result.bestTime}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {result.vibes.map((v) => (
                        <span key={v} className="bg-tealine/15 px-2 py-0.5 font-mono text-[10px] text-tealine">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-parchment p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-tealine">Field notes</p>
                    <ul className="mt-2 space-y-1.5">
                      {result.tips.map((t) => (
                        <li key={t} className="flex gap-2 text-[12.5px] leading-snug text-ink">
                          <span className="text-coral">✈</span> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    onClick={copyItinerary}
                    className="btn-stamp bg-ink px-6 py-3 text-sm font-bold text-amber shadow-[4px_4px_0_#d8442e]"
                  >
                    {copied ? "Copied to clipboard ✓" : "Copy itinerary"}
                  </button>
                  <button
                    onClick={reset}
                    className="btn-stamp border-2 border-inkline px-6 py-3 text-sm font-bold text-ink shadow-[4px_4px_0_rgba(8,26,32,0.25)] hover:border-coral hover:text-coral"
                  >
                    Plan another trip
                  </button>
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-inkline/60">
                    Reroll any day · swap stops · make it yours
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
