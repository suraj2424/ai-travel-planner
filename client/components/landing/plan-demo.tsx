"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import Button from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as const;

const EXAMPLES = [
  {
    id: "bali",
    label: "Bali · group",
    prompt:
      "Bali in May — 6 of us, around ₹60k each. Beaches, temples, one adventure day. Veg options.",
    destination: "Bali",
    days: "6 days",
    cost: 58400,
    rows: [
      ["Day 1", "Uluwatu sunset · Jimbaran veg dinner"],
      ["Day 2", "Nusa Penida · Kelingking Beach"],
      ["Day 3", "Ubud · Tegallalang terraces"],
    ],
    chips: ["VoA · free for Indians", "Veg-friendly", "Under budget"],
  },
  {
    id: "goa",
    label: "Goa · weekend",
    prompt:
      "Goa this weekend — 4 friends, ₹15k each. Beach, cafés, cheap stays.",
    destination: "Goa",
    days: "3 days",
    cost: 14500,
    rows: [
      ["Day 1", "Arrive · South Goa beach shack"],
      ["Day 2", "Café morning · water sports · sunset point"],
      ["Day 3", "Old Goa · market · leave"],
    ],
    chips: ["Domestic · no visa", "Veg-friendly", "Budget stays"],
  },
  {
    id: "ladakh",
    label: "Ladakh · bikes",
    prompt: "Ladakh in June — 6 riders, Pangong + Nubra, safe pacing.",
    destination: "Ladakh",
    days: "6 days",
    cost: 28000,
    rows: [
      ["Day 1", "Leh · acclimatise · rest"],
      ["Day 2", "Shanti Stupa · local markets"],
      ["Day 3", "Khardung La · Nubra Valley"],
    ],
    chips: ["Permits included", "Acclimatisation day", "Bike-friendly"],
  },
];

function useCountUp(target: number, duration = 600) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(() => (reduce ? target : 0));
  const current = useRef(value);

  useEffect(() => {
    if (reduce) {
      current.current = target;
      return;
    }
    const from = current.current;
    if (from === target) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = Math.round(from + (target - from) * eased);
      current.current = next;
      setValue(next);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, reduce]);

  return value;
}

export default function PlanDemo() {
  const [activeId, setActiveId] = useState("bali");
  const reduce = useReducedMotion();
  const active = EXAMPLES.find((e) => e.id === activeId) ?? EXAMPLES[0]!;
  const cost = useCountUp(active.cost);

  return (
    <section id="demo" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* heading */}
        <div className="text-center mb-12">
          <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-brand-600)] mb-5">
            <span className="w-8 h-px bg-[var(--color-accent-500)]" aria-hidden />
            See it work
            <span className="w-8 h-px bg-[var(--color-accent-500)]" aria-hidden />
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] text-[var(--color-text-primary)]">
            One prompt.{" "}
            <span className="font-serif italic font-normal">One plan.</span>
          </h2>
        </div>

        {/* tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {EXAMPLES.map((example) => (
            <button
              key={example.id}
              type="button"
              onClick={() => setActiveId(example.id)}
              aria-pressed={active.id === example.id}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active.id === example.id
                  ? "border-[var(--color-brand-500)] bg-[var(--color-surface-elevated)] text-[var(--color-brand-600)]"
                  : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              {example.label}
            </button>
          ))}
        </div>

        {/* prompt → plan */}
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-stretch">
          {/* prompt */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8 flex flex-col">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-tertiary)] mb-4">
              You type
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={active.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="text-base md:text-lg leading-relaxed text-[var(--color-text-primary)]"
              >
                “{active.prompt}”
              </motion.p>
            </AnimatePresence>
            <p className="mt-auto pt-8 text-sm text-[var(--color-text-tertiary)]">
              That&apos;s it. No forms, no filters, no 20 fields.
            </p>
          </div>

          {/* plan */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 md:p-8 shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-[var(--color-border)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
                    You get · {active.destination} · {active.days}
                  </p>
                  <p className="text-lg font-semibold tabular-nums text-[var(--color-text-primary)]">
                    ₹{cost.toLocaleString("en-IN")}
                    <span className="text-[var(--color-text-tertiary)] font-normal text-sm">
                      {" "}
                      /person
                    </span>
                  </p>
                </div>

                <div className="divide-y divide-[var(--color-border)]">
                  {active.rows.map(([day, plan], i) => (
                    <motion.div
                      key={day}
                      initial={reduce ? false : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.09, duration: 0.4, ease: EASE }}
                      className="flex items-center gap-3 py-3"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-brand-600)] whitespace-nowrap">
                        {day}
                      </span>
                      <span className="text-sm text-[var(--color-text-secondary)] truncate">
                        {plan}
                      </span>
                      <Check className="w-3.5 h-3.5 text-[var(--color-accent-500)] ml-auto shrink-0" />
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  {active.chips.map((chip) => (
                    <span
                      key={chip}
                      className="text-[11px] font-medium text-[var(--color-text-secondary)] border border-[var(--color-border)] rounded-full px-2.5 py-1"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* cta */}
        <div className="mt-10 text-center">
          <Button
            href="/auth/signup"
            variant="primary"
            className="!text-base !px-7 !rounded-full"
          >
            Try your own <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}