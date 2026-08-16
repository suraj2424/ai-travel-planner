"use client";

import { useState, type FormEvent } from "react";

/* ------------------------------ ticker ------------------------------ */

const TICKER_ITEMS = [
  "NOW BOARDING · KYOTO 6D — GATE A7",
  "SANTORINI SUNSET AUDIT: PASSED",
  "4,120 ROUTES CHARTED TODAY",
  "DELAYED: NOTHING — RAIN CHECKS AUTO-FILED",
  "GATE B3 · OAXACA 5D · MEZCAL CLASS",
  "PATAGONIA WIND ADVISORY: HIKES STARTED EARLIER",
  "ON TIME: EVERYONE, SOMEHOW",
];

export function Ticker() {
  const row = TICKER_ITEMS.map((t, i) => (
    <span key={i} className="mx-6 inline-flex items-center gap-6">
      <span>{t}</span>
      <span aria-hidden className="text-ink/50">✈</span>
    </span>
  ));
  return (
    <div className="overflow-hidden border-b border-ink/20 bg-amber py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        <div className="flex shrink-0 items-center">{row}</div>
        <div className="flex shrink-0 items-center" aria-hidden>{row}</div>
      </div>
    </div>
  );
}

/* ------------------------------- logo ------------------------------- */

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle cx="32" cy="32" r="30" fill="currentColor" opacity="0.12" />
      <circle
        cx="32"
        cy="32"
        r="24.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeDasharray="5 6"
        strokeLinecap="round"
      />
      <path d="M14 38 L50 20 L38 48 L32 38 Z" fill="currentColor" />
      <path d="M32 38 L38 48 L34.5 40.5 Z" fill="#d8442e" />
    </svg>
  );
}

/* -------------------------------- nav ------------------------------- */

const NAV_LINKS = [
  { href: "#how", label: "The engine" },
  { href: "#destinations", label: "Postcards" },
  { href: "#board", label: "Trip board" },
  { href: "#cabins", label: "Cabins" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-ridge bg-ink/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3 text-bone">
          <LogoMark className="h-9 w-9 text-amber transition-transform duration-500 group-hover:rotate-[24deg]" />
          <span className="font-display text-lg font-bold tracking-tight">
            Atlas <span className="text-amber">&amp;</span> Aire
          </span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist/70 transition-colors hover:text-amber"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#planner"
          className="btn-stamp bg-amber px-4 py-2 text-sm font-bold text-ink shadow-[3px_3px_0_#d8442e]"
        >
          Start planning
        </a>
      </div>
    </nav>
  );
}

/* ------------------------------ footer ------------------------------ */

const FOOTER_COLS = [
  {
    title: "Product",
    links: ["Itinerary engine", "Trip board", "Rain-check re-routing", "Offline packs", "Changelog"],
  },
  {
    title: "Company",
    links: ["Manifesto", "Field notes", "Careers", "Press kit", "Contact"],
  },
  {
    title: "Elsewhere",
    links: ["Instagram", "The Sunday Postcard", "Pinterest walls", "RSS (yes, still)"],
  },
];

export function Footer() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSent(true);
  };

  return (
    <footer className="relative bg-ink">
      <div className="airmail-stripe h-2.5 w-full" aria-hidden />

      {/* Last call */}
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-20 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-lagoon">
            Last call · gate closing soon
          </p>
          <h2 className="mt-4 font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-bone md:text-7xl">
            Where to{" "}
            <em className="font-serif font-medium italic text-amber">next?</em>
          </h2>
        </div>
        <a
          href="#planner"
          aria-label="Start planning"
          className="btn-stamp group grid h-24 w-24 shrink-0 place-items-center rounded-full border-2 border-amber text-amber shadow-[5px_5px_0_#d8442e]"
        >
          <svg viewBox="0 0 24 24" className="h-9 w-9 transition-transform duration-300 group-hover:rotate-45" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </a>
      </div>

      {/* Columns */}
      <div className="mx-auto grid max-w-7xl gap-12 border-t border-ridge px-5 py-14 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 text-bone">
            <LogoMark className="h-9 w-9 text-amber" />
            <span className="font-display text-lg font-bold tracking-tight">
              Atlas <span className="text-amber">&amp;</span> Aire
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist/70">
            An AI travel planner that treats your trip like a story, not a
            spreadsheet. Plotted by machine, felt like poetry.
          </p>
          <p className="mt-5 font-mono text-[11px] tracking-[0.15em] text-faded">
            48.8566° N, 2.3522° E — CURRENTLY EVERYWHERE
          </p>
        </div>

        {FOOTER_COLS.map((col) => (
          <div key={col.title}>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-lagoon">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a
                    href="#top"
                    className="text-sm text-mist/75 transition-colors hover:text-amber"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <div className="mx-auto max-w-7xl px-5 pb-14 sm:px-8">
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 border-2 border-ridge bg-deep p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div>
            <h3 className="font-display text-xl font-bold text-bone">
              The Sunday Postcard
            </h3>
            <p className="mt-1 text-sm text-mist/70">
              One destination a week. Three secrets. Zero spam.
            </p>
          </div>
          {sent ? (
            <p className="font-mono text-sm tracking-[0.12em] text-lagoon">
              ✓ BOARDING PASS SENT — CHECK YOUR INBOX
            </p>
          ) : (
            <div className="flex w-full max-w-md gap-0">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@somewhere.earth"
                className="w-full border-2 border-ridge bg-ink px-4 py-3 font-mono text-sm text-bone placeholder:text-faded/60 focus:border-amber focus:outline-none"
              />
              <button
                type="submit"
                className="btn-stamp shrink-0 bg-amber px-5 py-3 text-sm font-bold text-ink shadow-[3px_3px_0_#d8442e]"
              >
                Stamp it
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Legal strip */}
      <div className="border-t border-ridge">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 font-mono text-[11px] uppercase tracking-[0.15em] text-faded sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 Atlas &amp; Aire · No templates were harmed in these trips</p>
          <div className="flex gap-6">
            <a href="#top" className="hover:text-amber">Terms</a>
            <a href="#top" className="hover:text-amber">Privacy</a>
            <a href="#top" className="hover:text-amber">Cookies (the airport kind)</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
