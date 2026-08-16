"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const QA = [
  {
    q: "Is this another chatbot that hallucinates restaurants?",
    a: "No phantom kitchens, promise. Every stop is grounded in checked data — opening hours, closure days, seasonal windows — and each plan ships with its sources. If a place has quietly become a tourist trap, the engine hears about it from locals first and quietly drops it.",
  },
  {
    q: "Can I change a plan after it’s generated?",
    a: "Endlessly. Reroll any single day, swap morning and evening, drag dinner later, or type “make day 4 cheaper”. Every edit re-balances distances, daylight and reservations instantly, so the plan stays physically possible — not just pretty.",
  },
  {
    q: "What about places it’s never “been”?",
    a: "The engine has hand-tuned route books for its favourite cities, and an improvisation engine for everything else — it reads local forums, transit data and seasonal calendars in 41 languages. Type “somewhere warm and weird” and it will find you exactly that.",
  },
  {
    q: "How is this different from a travel blog?",
    a: "A blog is one person’s week. Atlas & Aire is your week: your pace (sleep-in-friendly), your budget (honestly priced), your diet, your knees. Lists tell you what exists; a plan tells you what to do at 3pm on a rainy Thursday.",
  },
  {
    q: "What does it actually cost?",
    a: "Nothing to start — two full itineraries a month on the Wayfarer cabin. Voyager ($12/mo) unlocks unlimited plans and live re-routing; First Class ($29/mo) adds a human fixer and booking handling. Cancel anytime, keep every plan you’ve made.",
  },
  {
    q: "Do you sell my trip data?",
    a: "No. Your daydreams are yours. Plans are stored so you can return to them, shared only when you send a trip link, and never sold, rented or bartered for airport lounge access — tempting as that would be.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-bone py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-tealine">
              Before you board
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Fair{" "}
              <em className="font-serif font-medium italic text-coral">questions</em>
            </h2>
            <div className="mt-8 border-2 border-inkline bg-parchment p-6 shadow-[8px_8px_0_rgba(8,26,32,0.12)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-tealine">
                Still curious?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-inkline">
                Write to{" "}
                <a href="#top" className="font-semibold text-coral underline decoration-dashed underline-offset-4 hover:text-ink">
                  gate@atlasaire.travel
                </a>{" "}
                — a human answers within a day, usually from an airport.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div>
            {QA.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q} className="border-b-2 border-inkline/20">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[11px] font-semibold text-tealine">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-lg font-bold text-ink transition-colors group-hover:text-coral sm:text-xl">
                        {item.q}
                      </span>
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center border-2 border-inkline font-mono text-lg text-ink transition-all duration-300 ${
                        isOpen ? "rotate-45 bg-coral text-parchment border-coral" : "group-hover:border-coral group-hover:text-coral"
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-6 pl-9 text-[14.5px] leading-relaxed text-inkline">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
