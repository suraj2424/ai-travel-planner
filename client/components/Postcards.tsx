"use client";

import Reveal from "./Reveal";
import { DESTINATIONS } from "@/lib/itinerary";

const ROTATIONS = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3", "rotate-1", "-rotate-1", "rotate-2", "-rotate-3"];

export default function Postcards() {
  const sendToPlanner = (name: string) => {
    window.dispatchEvent(new CustomEvent("aire:prefill", { detail: name }));
  };

  return (
    <section id="destinations" className="relative overflow-hidden bg-bone py-20 lg:py-28">
      {/* faint postmark circles */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border-[10px] border-tealine/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full border-[8px] border-coral/10"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-tealine">
                From the engine’s postcard pile
              </p>
              <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
                Places it{" "}
                <em className="font-serif font-medium italic text-coral">knows by heart</em>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-inkline/80">
              Eight routes written stop-by-stop by hand, then tuned by the
              engine. Click any postcard — it lands on the planning desk.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {DESTINATIONS.map((d, i) => (
            <Reveal key={d.code} delay={(i % 4) * 90}>
              <button
                type="button"
                onClick={() => sendToPlanner(d.name)}
                className={`group block w-full border-2 border-inkline bg-parchment p-3 pb-4 text-left shadow-[8px_10px_0_rgba(8,26,32,0.14)] transition-all duration-300 hover:z-10 hover:-translate-y-2 hover:rotate-0 hover:scale-[1.03] hover:shadow-[14px_18px_0_rgba(8,26,32,0.2)] ${ROTATIONS[i % ROTATIONS.length]}`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={d.image}
                    alt={`${d.name}, ${d.country} — illustrated travel poster`}
                    width={400}
                    height={500}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-2 top-2 rotate-6 border border-inkline/60 bg-parchment/90 px-1.5 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-inkline">
                    Par avion
                  </span>
                </div>
                <div className="mt-3 flex items-start justify-between gap-2 px-1">
                  <div>
                    <h3 className="font-display text-xl font-extrabold leading-none text-ink">
                      {d.name}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-inkline/70">
                      {d.country} · {d.code}
                    </p>
                  </div>
                  <span className="mt-0.5 font-mono text-[10px] font-semibold text-coral">
                    from {d.from}
                  </span>
                </div>
                <p className="mt-2 px-1 text-[12.5px] leading-snug text-inkline/80">
                  {d.tagline}
                </p>
                <p className="mt-3 px-1 font-mono text-[10px] uppercase tracking-[0.18em] text-tealine opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  ↗ Drop on the planning desk
                </p>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
