import Reveal from "./Reveal";

/* --------------------------- how it works --------------------------- */

const STEPS = [
  {
    n: "01",
    title: "Tell it a feeling",
    body: "“Two weeks, somewhere warm, food-first, allergic to crowds.” Type it like you’d text a well-travelled friend — half a sentence is plenty.",
    tags: ["FREE TEXT", "MOODS OK", "190 COUNTRIES"],
  },
  {
    n: "02",
    title: "The engine wanders",
    body: "It charts roughly 12,000 route combinations, cross-checks opening hours, weather windows and festival calendars, then reads 300k local tips in their own languages.",
    tags: ["12,406 ROUTES", "312 SOURCES", "WEIGHTED BY LOCALS"],
  },
  {
    n: "03",
    title: "You steer",
    body: "Swap an afternoon, reroll a whole day, push dinner later. Every change re-balances logistics instantly — distances, reservations, daylight.",
    tags: ["REROLL ANY DAY", "DRAG TO SWAP", "LIVE RE-BALANCE"],
  },
  {
    n: "04",
    title: "Go, with a copilot",
    body: "Offline maps in your pocket, rain-check re-routing when the sky disagrees, and one genuinely local secret for every single day.",
    tags: ["OFFLINE PACKS", "RAIN-CHECK™", "SECRET / DAY"],
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative border-b border-ridge bg-ink py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        {/* sticky intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">
              Flight plan · how the engine thinks
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-bone md:text-5xl">
              From daydream to departure,{" "}
              <em className="font-serif font-medium italic text-lagoon">in four legs</em>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mist/75">
              Most travel tools hand you a list. Atlas &amp; Aire hands you a
              story with logistics underneath — paced to your energy, priced to
              your nerve, seasoned by people who actually live there.
            </p>
            <div className="mt-8 border-2 border-ridge bg-deep p-5 font-mono text-[11px] leading-loose tracking-[0.12em] text-mist/80">
              <p className="text-lagoon">ENGINE TELEMETRY</p>
              <p>ROUTES PER PLAN ........ 12,406</p>
              <p>SOURCES CROSS-CHECKED .. 312</p>
              <p>LANGUAGES READ ......... 41</p>
              <p>HUMAN OVERRIDES ........ UNLIMITED</p>
            </div>
          </Reveal>
        </div>

        {/* steps on a flight path */}
        <div className="relative">
          <div
            className="absolute bottom-6 left-[27px] top-6 w-0 border-l-2 border-dashed border-ridge"
            aria-hidden
          />
          <ol className="space-y-12">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <li className="group relative flex gap-6 sm:gap-8">
                  <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center border-2 border-amber bg-ink font-mono text-sm font-bold text-amber transition-colors duration-300 group-hover:bg-amber group-hover:text-ink">
                    {s.n}
                  </span>
                  <div className="border-2 border-ridge bg-deep p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-lagoon/60 group-hover:shadow-[8px_8px_0_rgba(4,14,18,0.5)] sm:p-7">
                    <h3 className="font-display text-2xl font-extrabold text-bone">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-mist/75">{s.body}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="border border-ridge2 px-2.5 py-1 font-mono text-[9.5px] tracking-[0.16em] text-lagoon"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- testimonials --------------------------- */

const QUOTES = [
  {
    quote:
      "It planned our honeymoon better than our wedding planner planned the wedding. The ‘local secrets’ were actually secret.",
    name: "Maya & Jonas",
    route: "SANTORINI · 7 DAYS · CLASS: HONEYMOON",
    initials: "M&J",
    rot: "-rotate-2",
  },
  {
    quote:
      "I typed “cheap, weird, food” and got Oaxaca with a mezcal palenque I’d never have found in any guidebook. Cried a little at Hierve el Agua.",
    name: "Priya R.",
    route: "OAXACA · SOLO · CLASS: SHOESTRING",
    initials: "PR",
    rot: "rotate-1",
  },
  {
    quote:
      "Four kids, ten days, zero meltdowns. When it rained in Kyoto, the plan quietly re-shuffled around a pottery workshop. Witchcraft.",
    name: "The Okafors",
    route: "KYOTO · FAMILY OF 6 · CLASS: CHAOS",
    initials: "OK",
    rot: "rotate-2",
  },
];

export function Testimonials() {
  return (
    <section className="relative bg-bone py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-tealine">
              Field reports · unedited, mostly grammatical
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Postmarked from{" "}
              <em className="font-serif font-medium italic text-coral">real trips</em>
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={q.name} delay={i * 110}>
              <figure
                className={`relative flex h-full flex-col border-2 border-inkline bg-parchment shadow-[8px_10px_0_rgba(8,26,32,0.14)] transition-all duration-300 hover:rotate-0 hover:shadow-[12px_14px_0_rgba(8,26,32,0.2)] ${q.rot}`}
              >
                <div className="airmail-stripe h-2.5 w-full" aria-hidden />
                <div className="flex items-start justify-between p-6 pb-0">
                  <svg viewBox="0 0 32 24" className="h-6 w-8 text-coral/70" fill="currentColor" aria-hidden>
                    <path d="M0 24V14C0 6 5 1 13 0l1 5c-4 1-6 3-6 7h6v12H0zm18 0V14C18 6 23 1 31 0l1 5c-4 1-6 3-6 7h6v12H18z" />
                  </svg>
                  <span className="grid h-12 w-12 rotate-6 place-items-center rounded-full border-2 border-inkline/50 font-mono text-[11px] font-bold text-inkline/70">
                    {q.initials}
                  </span>
                </div>
                <blockquote className="flex-1 px-6 pt-4 font-serif text-[17px] italic leading-relaxed text-ink">
                  “{q.quote}”
                </blockquote>
                <figcaption className="px-6 pb-6 pt-5">
                  <p className="font-display text-lg font-extrabold text-ink">{q.name}</p>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-tealine">{q.route}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- pricing ----------------------------- */

const CABINS = [
  {
    name: "Wayfarer",
    price: "$0",
    cadence: "forever",
    blurb: "For the occasional escape.",
    features: [
      "2 itinerary generations / month",
      "Trips up to 8 days",
      "Live trip board access",
      "Community route swaps",
    ],
    cta: "Board free",
    featured: false,
  },
  {
    name: "Voyager",
    price: "$12",
    cadence: "/ month",
    blurb: "For the regularly gone.",
    features: [
      "Unlimited itineraries",
      "Rain-check™ live re-routing",
      "Offline trip packs",
      "The local-secret vault (1,900+)",
      "Shareable trip links",
    ],
    cta: "Take the aisle",
    featured: true,
  },
  {
    name: "First Class",
    price: "$29",
    cadence: "/ month",
    blurb: "For trips that can’t go wrong.",
    features: [
      "Everything in Voyager",
      "Human fixer reviews every plan",
      "Restaurant bookings handled",
      "24/7 in-trip concierge chat",
      "Carbon-offset ledger",
    ],
    cta: "Lie flat",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="cabins" className="relative border-y border-ridge bg-ink py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">
                Choose your cabin
              </p>
              <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-bone md:text-5xl">
                Every flight has{" "}
                <em className="font-serif font-medium italic text-lagoon">three cabins</em>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-mist/70">
              Start free, upgrade when the wanderlust gets regular. Cancel from
              the settings gate anytime — no exit-row surcharges.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-3 lg:gap-6">
          {CABINS.map((c, i) => (
            <Reveal key={c.name} delay={i * 110} className="h-full">
              <div
                className={`relative flex h-full flex-col border-2 bg-parchment text-ink ${
                  c.featured
                    ? "border-amber shadow-[12px_14px_0_rgba(245,168,60,0.25)] lg:-translate-y-4 lg:scale-[1.02]"
                    : "border-inkline shadow-[10px_12px_0_rgba(4,14,18,0.5)]"
                }`}
              >
                {c.featured && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-ink shadow-[3px_3px_0_#d8442e]">
                    Most boarded
                  </span>
                )}
                <div className="flex items-center justify-between px-7 pt-7">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-tealine">
                    Boarding pass · {c.name}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-inkline/50">
                    AA-{String(i + 1).padStart(3, "0")}
                  </span>
                </div>
                <div className="px-7 pt-4">
                  <h3 className="font-display text-3xl font-extrabold">{c.name}</h3>
                  <p className="mt-1 text-sm text-inkline/75">{c.blurb}</p>
                  <p className="mt-5 flex items-baseline gap-2">
                    <span className="font-display text-5xl font-extrabold">{c.price}</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-inkline/60">
                      {c.cadence}
                    </span>
                  </p>
                </div>
                <div className="perf-line mx-7 my-6 h-1 text-inkline/40" aria-hidden />
                <ul className="flex-1 space-y-2.5 px-7">
                  {c.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-[14px] leading-snug text-ink">
                      <span className="font-mono text-[12px] font-bold text-coral">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="p-7 pt-6">
                  <a
                    href="#planner"
                    className={`btn-stamp block py-3.5 text-center text-[15px] font-bold ${
                      c.featured
                        ? "bg-amber text-ink shadow-[4px_4px_0_#d8442e]"
                        : "bg-ink text-amber shadow-[4px_4px_0_rgba(245,168,60,0.35)]"
                    }`}
                  >
                    {c.cta}
                  </a>
                </div>
                <div
                  className="mx-7 mb-6 h-8 opacity-80"
                  aria-hidden
                  style={{
                    background:
                      "repeating-linear-gradient(90deg, #081a20 0 2px, transparent 2px 4px, #081a20 4px 7px, transparent 7px 9px, #081a20 9px 10px, transparent 10px 14px)",
                  }}
                />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-12 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-faded">
            Student &amp; educator cabins at 40% off · show ID at the gate
          </p>
        </Reveal>
      </div>
    </section>
  );
}
