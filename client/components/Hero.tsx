/* Hero — night-flight departure with an animated route map */

function RouteMap() {
  return (
    <svg
      viewBox="0 0 900 640"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
      aria-hidden
    >
      <defs>
        <radialGradient id="heroGlow" cx="62%" cy="38%" r="60%">
          <stop offset="0%" stopColor="#17414c" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#081a20" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="900" height="640" fill="url(#heroGlow)" />
      {/* graticule */}
      {Array.from({ length: 12 }, (_, i) => (
        <line key={`v${i}`} x1={i * 82} y1="0" x2={i * 82} y2="640" stroke="#17414c" strokeWidth="0.6" opacity="0.5" />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 82} x2="900" y2={i * 82} stroke="#17414c" strokeWidth="0.6" opacity="0.5" />
      ))}

      {/* routes */}
      <path id="arc1" d="M120 150 Q 380 -60 640 120" fill="none" stroke="#2aa6a0" strokeWidth="1.4" className="route-dash" opacity="0.65" />
      <path id="arc2" d="M230 330 Q 400 190 565 335" fill="none" stroke="#f5a83c" strokeWidth="1.4" className="route-dash" opacity="0.55" />
      <path id="arc3" d="M520 255 Q 660 330 770 430" fill="none" stroke="#2aa6a0" strokeWidth="1.4" className="route-dash" opacity="0.5" />
      <path id="arc4" d="M330 480 Q 380 300 445 215" fill="none" stroke="#d8442e" strokeWidth="1.4" className="route-dash" opacity="0.45" />

      {/* travelling planes */}
      <g>
        <path d="M-9 0 L9 -2.5 L-2 0 L9 2.5 Z" fill="#f5a83c">
          <animateMotion dur="15s" repeatCount="indefinite" rotate="auto">
            <mpath href="#arc1" />
          </animateMotion>
        </path>
      </g>
      <g>
        <path d="M-8 0 L8 -2.2 L-2 0 L8 2.2 Z" fill="#f1ede3" opacity="0.85">
          <animateMotion dur="12s" begin="2s" repeatCount="indefinite" rotate="auto">
            <mpath href="#arc2" />
          </animateMotion>
        </path>
      </g>
      <g>
        <path d="M-8 0 L8 -2.2 L-2 0 L8 2.2 Z" fill="#2aa6a0" opacity="0.9">
          <animateMotion dur="13s" begin="5s" repeatCount="indefinite" rotate="auto">
            <mpath href="#arc3" />
          </animateMotion>
        </path>
      </g>

      {/* city nodes */}
      {[
        { x: 120, y: 150, label: "KEF", dx: -8, dy: -14 },
        { x: 230, y: 330, label: "OAX", dx: -10, dy: 22 },
        { x: 330, y: 480, label: "FTE", dx: -8, dy: 24 },
        { x: 445, y: 215, label: "RAK", dx: 12, dy: -10 },
        { x: 520, y: 255, label: "JTR", dx: -38, dy: 22 },
        { x: 565, y: 335, label: "NAP", dx: 12, dy: 6 },
        { x: 640, y: 120, label: "KYO", dx: 12, dy: -10 },
        { x: 770, y: 430, label: "DPS", dx: 12, dy: 6 },
      ].map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r="7" fill="none" stroke="#2aa6a0" strokeWidth="1" className="node-ring" />
          <circle cx={n.x} cy={n.y} r="3.4" fill="#f5a83c" />
          <text
            x={n.x + n.dx}
            y={n.y + n.dy}
            fill="#8fb0ab"
            fontSize="12"
            fontFamily="var(--font-plex), monospace"
            letterSpacing="2"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* boarding-pass stub artifact */
function TicketStub() {
  return (
    <div
      className="animate-drift w-full max-w-sm rotate-2 border-2 border-inkline bg-parchment text-ink shadow-[10px_12px_0_rgba(4,14,18,0.55)]"
      style={{ "--drift-rot": "2deg" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between border-b-2 border-dashed border-inkline/40 px-5 py-3">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em]">
          Atlas &amp; Aire · Itinerary stub
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-coral">AA-2026</span>
      </div>
      <div className="flex items-baseline justify-between px-5 pt-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-inkline/70">Origin</p>
          <p className="font-display text-3xl font-extrabold">You, dreaming</p>
        </div>
        <span className="font-mono text-inkline/60">——✈——</span>
        <div className="text-right">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-inkline/70">Gate</p>
          <p className="font-display text-3xl font-extrabold text-coral">KYO</p>
        </div>
      </div>
      <div className="px-5 pb-2 pt-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-tealine">
          Day 03 · Ten thousand gates
        </p>
        <ul className="mt-2 space-y-1.5 text-[13px] leading-snug">
          <li className="flex gap-3">
            <span className="font-mono text-[11px] text-inkline/70">06:30</span>
            <span>Fushimi Inari before 8am — the higher, the fewer phones</span>
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-[11px] text-inkline/70">14:00</span>
            <span>Sake district hopping among cedar vats</span>
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-[11px] text-inkline/70">18:30</span>
            <span>Nishiki Market dusk graze</span>
          </li>
        </ul>
      </div>
      <div className="perf-line h-1 text-inkline/50" aria-hidden />
      <div className="flex items-center justify-between px-5 py-3">
        <span className="font-mono text-[10px] tracking-[0.18em] text-inkline/70">
          SEAT 12A · LOCAL SECRET STOWED
        </span>
        <div
          className="h-7 w-24"
          aria-hidden
          style={{
            background:
              "repeating-linear-gradient(90deg, #081a20 0 2px, transparent 2px 4px, #081a20 4px 7px, transparent 7px 9px)",
          }}
        />
      </div>
    </div>
  );
}

/* mini live board artifact */
function MiniBoard() {
  const rows = [
    { dest: "SANTORINI", code: "JTR", days: "5D", status: "BOARDING", tone: "text-amber" },
    { dest: "EL CHALTÉN", code: "FTE", days: "5D", status: "PLANNED", tone: "text-lagoon" },
    { dest: "OAXACA", code: "OAX", days: "4D", status: "DEPARTED", tone: "text-faded" },
  ];
  return (
    <div className="animate-drift-late w-full max-w-sm -rotate-1 border border-ridge bg-deep/90 shadow-[10px_12px_0_rgba(4,14,18,0.55)]" style={{ "--drift-rot": "-1deg" } as React.CSSProperties}>
      <div className="flex items-center justify-between border-b border-ridge px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-lagoon">
          Live from the trip board
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-amber">
          <span className="h-1.5 w-1.5 animate-blink rounded-full bg-amber" /> LIVE
        </span>
      </div>
      <ul>
        {rows.map((r) => (
          <li
            key={r.code}
            className="flex items-center justify-between border-b border-ridge/60 px-4 py-2.5 font-mono text-[11px] tracking-[0.12em] last:border-0"
          >
            <span className="text-bone">{r.dest}</span>
            <span className="text-faded">{r.code} · {r.days}</span>
            <span className={r.tone}>{r.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------- hero ------------------------------- */

const STATS = [
  { value: "48,213", label: "trips charted" },
  { value: "190", label: "countries plotted" },
  { value: "42s", label: "median plan time" },
  { value: "4.9", label: "traveler score" },
];

export default function Hero() {
  return (
    <header id="top" className="relative overflow-hidden border-b border-ridge bg-ink">
      <RouteMap />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-28 lg:pt-24">
        {/* left — the pitch */}
        <div>
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-lagoon">
            <span className="h-2 w-2 animate-blink rounded-full bg-coral" />
            Atlas &amp; Aire — AI Travel Planner · est. 2026
          </p>
          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-bone sm:text-6xl xl:text-7xl">
            Tell it a feeling,
            <br />
            <em className="font-serif font-medium italic text-amber">
              get back a flight plan.
            </em>
          </h1>
          <p className="mt-7 max-w-xl text-[15.5px] leading-relaxed text-mist/80">
            “Two weeks, somewhere warm, food-first, allergic to crowds” — type
            it like you’d text a well-travelled friend. Atlas &amp; Aire turns
            half-sentences into day-by-day itineraries with local secrets baked
            in, then re-plans around your life as it happens.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#planner"
              className="btn-stamp bg-amber px-7 py-4 text-[15px] font-bold text-ink shadow-[5px_5px_0_#d8442e]"
            >
              Plan a trip — it’s free
            </a>
            <a
              href="#how"
              className="btn-stamp border border-ridge px-7 py-4 text-[15px] font-semibold text-bone shadow-[5px_5px_0_rgba(23,65,76,0.9)] hover:border-lagoon hover:text-lagoon"
            >
              Watch the engine think ↓
            </a>
          </div>
          <dl className="mt-14 grid grid-cols-2 gap-px border border-ridge bg-ridge sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-ink px-5 py-4">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-extrabold text-bone">{s.value}</dd>
                <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-faded">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* right — the artifacts */}
        <div className="relative mx-auto flex w-full max-w-md flex-col gap-8 lg:max-w-none">
          <div className="relative">
            <TicketStub />
            {/* rotating stamp */}
            <div className="absolute -right-3 -top-6 hidden rotate-[-14deg] sm:block">
              <div className="grid h-24 w-24 place-items-center rounded-full border-[3px] border-coral/80 text-center">
                <div className="animate-spin-slow rounded-full">
                  <svg viewBox="0 0 100 100" className="h-20 w-20">
                    <defs>
                      <path id="stampCircle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
                    </defs>
                    <text fill="#d8442e" fontSize="11.5" fontFamily="var(--font-plex), monospace" letterSpacing="2.5">
                      <textPath href="#stampCircle">HUMAN-APPROVED ★ ENGINE-PLOTTED ★</textPath>
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <MiniBoard />
        </div>
      </div>
    </header>
  );
}
