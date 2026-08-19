import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, Plane } from "lucide-react";
import { Barcode } from "@/components/ui/barcode";

export default function AuthLayout({
  children,
  quote,
  stubNote,
}: {
  children: React.ReactNode;
  quote: React.ReactNode;
  stubNote: string;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-[1.05fr_1fr] bg-[var(--color-surface)]">
      {/* ── Brand panel ── */}
      <aside className="relative hidden lg:flex flex-col justify-between gap-16 overflow-hidden bg-[var(--color-cta)] p-12 xl:p-16">
        {/* arcs + flight path */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 900" preserveAspectRatio="none" aria-hidden>
          {[...Array(6)].map((_, i) => (
            <circle key={i} cx="120" cy="880" r={140 + i * 130} fill="none" stroke="white" strokeOpacity={0.07 - i * 0.01} />
          ))}
          <path
            d="M -40 620 C 200 520, 380 640, 560 420 S 820 260, 860 220"
            fill="none"
            stroke="var(--color-accent-400)"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeDasharray="5 9"
            className="animate-dash"
          />
        </svg>
        <div className="absolute inset-0 bg-noise opacity-[0.06] pointer-events-none" aria-hidden />

        {/* passport stamp */}
        <div
          className="absolute right-12 top-24 w-28 h-28 -rotate-12 rounded-full border-2 border-dashed border-white/25 flex flex-col items-center justify-center gap-1 text-white/40"
          aria-hidden
        >
          <Plane className="w-4 h-4" />
          <span className="text-[9px] font-semibold uppercase tracking-[0.22em]">Early access</span>
          <span className="text-[9px] uppercase tracking-[0.22em]">IN · 2026</span>
        </div>

        <Link href="/" className="relative z-10 inline-flex items-center gap-2.5 text-white w-fit">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 border border-white/20">
            <Plane className="w-4 h-4" />
          </span>
          <span className="font-bold tracking-tight">AI Travel Planner</span>
        </Link>

        <h2 className="relative z-10 text-4xl xl:text-5xl font-bold tracking-[-0.03em] leading-[1.15] text-balance text-white max-w-md">
          {quote}
        </h2>

        {/* boarding stub */}
        <div className="relative z-10 rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm px-6 py-5 max-w-md">
          <div className="flex justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50 mb-4">
            <span>Boarding pass</span>
            <span>AI-TP · 2026</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Passenger</p>
              <p className="text-sm font-semibold text-white">You</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Seat</p>
              <p className="text-sm font-semibold text-white">1A</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Status</p>
              <p className="text-sm font-semibold text-[var(--color-accent-400)]">Early access</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-dashed border-white/20 flex items-center justify-between">
            <Barcode className="text-white/60" />
            <span className="font-serif italic text-sm text-white/60">{stubNote}</span>
          </div>
        </div>
      </aside>

      {/* ── Form panel ── */}
      <main className="flex flex-col px-6 py-8 sm:px-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2.5 text-[var(--color-text-primary)] lg:hidden">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-brand-600)] text-white">
              <Plane className="w-4 h-4" />
            </span>
            <span className="font-bold tracking-tight">AI Travel Planner</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 ml-auto text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <ArrowLeft size={16}/> Back home
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center py-14">
          <div className="w-full max-w-sm">{children}</div>
        </div>

        <p className="text-center text-xs text-[var(--color-text-tertiary)]">
          Free during beta · No credit card required · Made in India 🇮
        </p>
      </main>
    </div>
  );
}