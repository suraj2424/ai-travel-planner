import Link from "next/link";
import {
  Sparkles,
  MapPin,
  ArrowRight,
  Plane,
  Stamp,
  IndianRupee,
  Users,
  Rocket,
  Gift,
  MessageSquare,
  Check,
  Send,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import FeatureCard from "@/components/ui/featureCard";
import Button from "@/components/ui/button";
import IndiaMap from "@/components/ui/india-map";
import { Barcode } from "@/components/ui/barcode";

const destinations = [
  "Bali",
  "Goa",
  "Thailand",
  "Ladakh",
  "Vietnam",
  "Dubai",
  "Sri Lanka",
  "Kerala",
  "Singapore",
  "Meghalaya",
  "Japan",
  "Rishikesh",
];

const roadmap = [
  "Veg & Jain food filters",
  "Festival & long-weekend planner",
  "Forex rate alerts",
  "Group split payments",
  "Domestic hidden gems",
  "Family-friendly pacing",
];

/* Postcards — drop AI-generated images into /public/postcards/ */
const postcards = [
  {
    src: "/postcards/goa.jpg",
    place: "Goa",
    note: "6:42 pm, beach shack",
    tilt: "-rotate-3",
  },
  {
    src: "/postcards/ladakh.jpg",
    place: "Ladakh",
    note: "Pangong, -2°C",
    tilt: "rotate-2 md:translate-y-6",
  },
  {
    src: "/postcards/jaipur.jpg",
    place: "Jaipur",
    note: "pigeons at dusk",
    tilt: "-rotate-1 md:-translate-y-2",
  },
  {
    src: "/postcards/kerala.jpg",
    place: "Kerala",
    note: "backwater slow morning",
    tilt: "rotate-3 md:translate-y-4",
  },
  {
    src: "/postcards/meghalaya.jpg",
    place: "Meghalaya",
    note: "root bridge, mist",
    tilt: "-rotate-2",
  },
];

const steps = [
  {
    num: "01",
    code: "TELL",
    title: "Batao the vibe",
    description:
      "Type like you'd text a friend — “Bali, 6 days, ₹60k, veg food, 5 people.”",
    note: "basically texting a friend",
  },
  {
    num: "02",
    code: "PLAN",
    title: "Get the plan",
    description:
      "A day-by-day itinerary with visa status, flights, stays and real costs in ₹.",
    note: "watch it appear",
  },
  {
    num: "03",
    code: "FLY",
    title: "Confirm & fly",
    description:
      "Share it in the group chat, lock dates, and book once everyone's in.",
    note: "chalo!",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-brand-600)] mb-5">
      <span className="w-8 h-px bg-[var(--color-accent-500)]" aria-hidden />
      {children}
      <span className="w-8 h-px bg-[var(--color-accent-500)]" aria-hidden />
    </p>
  );
}

/* Boarding-pass style step card */
function BoardingStep({ step }: { step: (typeof steps)[number] }) {
  return (
    <div className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="p-7 pb-6">
        <div className="flex items-center justify-between mb-7">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
            Step {step.num}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-brand-600)]">
            {step.code}
          </span>
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-[var(--color-text-primary)] mb-3">
          {step.title}
        </h3>
        <p className="text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
          {step.description}
        </p>
      </div>

      {/* perforation with punch notches */}
      <div className="relative border-t border-dashed border-[var(--color-border)]">
        <span
          className="absolute -left-2.5 -top-2.5 w-5 h-5 rounded-full bg-[var(--color-surface-muted)]"
          aria-hidden
        />
        <span
          className="absolute -right-2.5 -top-2.5 w-5 h-5 rounded-full bg-[var(--color-surface-muted)]"
          aria-hidden
        />
      </div>

      <div className="px-7 py-4 flex items-center justify-between">
        <Barcode />
        <span className="font-serif italic text-sm text-[var(--color-text-tertiary)]">
          {step.note}
        </span>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-clip">
      {/* ───────────────────────── NAV ───────────────────────── */}
      <header className="fixed top-4 inset-x-0 z-50 px-4">
        <nav className="max-w-5xl mx-auto flex items-center justify-between gap-4 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/85 backdrop-blur-xl pl-5 pr-2 py-2 shadow-sm">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[var(--color-text-primary)]"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-brand-600)] text-white">
              <Plane className="w-4 h-4" />
            </span>
            <span className="font-bold tracking-tight">
              AI Travel{" "}
              <span className="text-[var(--color-brand-600)]">Planner</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--color-text-secondary)]">
            <Link
              href="#features"
              className="hover:text-[var(--color-text-primary)] transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="hover:text-[var(--color-text-primary)] transition-colors"
            >
              How it works
            </Link>
            <Link
              href="/auth/signin"
              className="hover:text-[var(--color-text-primary)] transition-colors"
            >
              Sign in
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              href="/auth/signup"
              variant="primary"
              className="!px-5 !py-2 !text-sm !rounded-full"
            >
              Early access
            </Button>
          </div>
        </nav>
      </header>

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        {/* ambient layers */}
        <div
          className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none"
          aria-hidden
        />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_0.85fr] gap-16 items-center">
          {/* ── Left: copy ── */}
          <div>
            <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)]/80 backdrop-blur text-xs font-medium text-[var(--color-text-secondary)] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-500)] animate-pulse" />
              Early access · Built for Indian travellers
            </p>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-[-0.04em] leading-[1.05] text-[var(--color-text-primary)] mb-6">
              From group chat to{" "}
              <span className="relative inline-block font-serif italic font-normal">
                boarding pass.
                <svg
                  className="absolute left-0 -bottom-1.5 w-full"
                  viewBox="0 0 300 14"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M3 9 C 55 3, 110 13, 165 7 S 270 5, 297 8"
                    stroke="var(--color-accent-500)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed text-[var(--color-text-secondary)] max-w-lg mb-10">
              AI trip plans made for the way Indians travel — visa-free picks
              for Indian passports, budgets in ₹, veg-friendly stops, and
              itineraries your whole group will actually agree on.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                href="/auth/signup"
                variant="primary"
                className="w-full sm:w-auto !text-base !px-7"
              >
                Start planning — free <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                href="#how-it-works"
                variant="outline"
                className="w-full sm:w-auto !text-base !px-7"
              >
                See how it works
              </Button>
            </div>

            <p className="mt-8 text-sm text-[var(--color-text-tertiary)]">
              Free during beta · No credit card required
            </p>
          </div>

          {/* ── Right: the map gets its own stage ── */}
          <div className="hidden lg:block relative">
            <div
              className="absolute -inset-8 bg-[var(--color-brand-500)]/10 blur-3xl rounded-full pointer-events-none"
              aria-hidden
            />
            <IndiaMap className="relative h-[620px] xl:h-[680px] w-full" />
          </div>
        </div>

        {/* ── Chat preview below, centered ── */}
        <div className="relative max-w-4xl mx-auto px-6 mt-24">
          <div
            className="absolute -inset-x-8 -top-8 bottom-0 bg-[var(--color-brand-500)]/10 blur-3xl rounded-full pointer-events-none"
            aria-hidden
          />

          <div className="relative mx-auto max-w-xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-2xl shadow-black/10 overflow-hidden text-left">
            {/* chat header */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[var(--color-border)]">
              <div className="relative">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--color-text-primary)]">
                  <Sparkles className="w-4 h-4 text-[var(--color-accent-400)]" />
                </span>
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[var(--color-accent-500)] border-2 border-[var(--color-surface-elevated)]"
                  aria-hidden
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--color-text-primary)] leading-tight">
                  Trip AI
                </p>
                <p className="text-[11px] text-[var(--color-text-tertiary)]">
                  online · replies instantly
                </p>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] border border-[var(--color-border)] rounded-full px-2.5 py-1">
                Preview
              </span>
            </div>

            {/* messages */}
            <div className="p-5 space-y-4 bg-[var(--color-surface-muted)]">
              {/* date divider */}
              <div className="flex justify-center message-in">
                <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-tertiary)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full px-3 py-1">
                  Today, 10:42 am
                </span>
              </div>

              {/* user message */}
              <div className="flex flex-col items-end message-in message-in-1">
                <div className="max-w-[85%] rounded-2xl rounded-br-md bg-[var(--color-bubble)] text-white text-sm leading-relaxed px-4 py-3">
                  Bali in May — 6 of us, around ₹60k each. Beaches, temples, one
                  adventure day. Veg options please
                </div>
                <span className="text-[10px] text-[var(--color-text-tertiary)] mt-1">
                  10:42 am
                </span>
              </div>

              {/* AI message group */}
              <div className="flex gap-2.5 message-in message-in-2">
                <span className="shrink-0 w-7 h-7 rounded-full bg-[var(--color-text-primary)] flex items-center justify-center mt-1">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent-400)]" />
                </span>

                <div className="flex-1 min-w-0 space-y-2">
                  {/* rich bubble: intro + itinerary card */}
                  <div className="rounded-2xl rounded-tl-md border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-3">
                    <p className="text-sm text-[var(--color-text-primary)] leading-relaxed mb-3">
                      Done! Bali works — visa on arrival is free for Indians.
                      Here&apos;s 6 days under budget:
                    </p>

                    <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
                      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-brand-600)]">
                          Bali · 6 days
                        </span>
                        <span className="text-[11px] tabular-nums font-semibold text-[var(--color-text-primary)]">
                          ₹58,400
                          <span className="text-[var(--color-text-tertiary)] font-normal">
                            /person
                          </span>
                        </span>
                      </div>

                      <div className="divide-y divide-[var(--color-border)] bg-[var(--color-surface)]">
                        {[
                          {
                            day: "Day 1",
                            plan: "Uluwatu sunset · Jimbaran dinner (veg menu)",
                          },
                          {
                            day: "Day 2",
                            plan: "Nusa Penida · Kelingking Beach · snorkelling",
                          },
                          {
                            day: "Day 3",
                            plan: "Ubud · Tegallalang terraces · Monkey Forest",
                          },
                        ].map((item) => (
                          <div
                            key={item.day}
                            className="flex items-center gap-3 px-3.5 py-2.5"
                          >
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-brand-600)] whitespace-nowrap">
                              {item.day}
                            </span>
                            <span className="text-[13px] text-[var(--color-text-secondary)] truncate">
                              {item.plan}
                            </span>
                            <Check className="w-3.5 h-3.5 text-[var(--color-accent-500)] ml-auto shrink-0" />
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 px-3.5 py-2.5 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
                        {[
                          "🛂 VoA · free",
                          "🥦 14 veg spots",
                          "✈️ 6 direct flights",
                        ].map((chip) => (
                          <span
                            key={chip}
                            className="text-[10px] font-medium text-[var(--color-text-secondary)] border border-[var(--color-border)] rounded-full px-2 py-0.5"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* grouped follow-up (no avatar = same sender) */}
                  <div className="rounded-2xl rounded-tl-md border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-3 message-in message-in-3">
                    <p className="text-sm text-[var(--color-text-primary)]">
                      Swap Day 3 for a waterfall trek, or make it cheaper?
                    </p>
                  </div>

                  {/* quick replies */}
                  <div className="flex flex-wrap gap-2 pt-1 message-in message-in-3">
                    {["Keep it", "Swap Day 3", "Make it cheaper"].map((q) => (
                      <span
                        key={q}
                        className="text-xs font-medium text-[var(--color-brand-600)] border border-[var(--color-brand-500)]/40 rounded-full px-3 py-1.5 bg-[var(--color-surface-elevated)] cursor-default hover:bg-[var(--color-brand-50)] transition-colors"
                      >
                        {q}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* composer */}
            <div className="flex items-center gap-2.5 px-4 py-3 border-t border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
              <div className="flex-1 text-sm text-[var(--color-text-tertiary)] px-4 py-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]">
                Ask for changes…
              </div>
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--color-brand-600)] text-white shrink-0">
                <Send className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* floating cards */}
          <div className="hidden lg:block absolute -left-16 top-28 animate-float rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-3 shadow-lg shadow-black/5">
            <p className="text-xs text-[var(--color-text-tertiary)] mb-1.5">
              Group poll
            </p>
            <p className="text-sm font-semibold text-[var(--color-text-primary)] tabular-nums mb-1.5">
              4 of 6 confirmed
            </p>
            <div className="w-28 h-1 rounded-full bg-[var(--color-border)] overflow-hidden">
              <div className="h-full w-2/3 rounded-full bg-[var(--color-brand-500)]" />
            </div>
          </div>
          <div className="hidden lg:block absolute -right-12 bottom-24 animate-float-delayed rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-3 shadow-lg shadow-black/5">
            <p className="text-xs text-[var(--color-text-tertiary)] mb-0.5">
              Budget check
            </p>
            <p className="text-sm font-semibold text-[var(--color-accent-600)] tabular-nums">
              Under ₹60k ✓
            </p>
            <p className="text-[11px] text-[var(--color-text-tertiary)] tabular-nums mt-0.5">
              ₹1,600 left for shopping
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────────── MARQUEE ───────────────────────── */}
      <section className="py-7 border-y border-[var(--color-border)] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee">
          {[...destinations, ...destinations].map((city, i) => (
            <span
              key={`${city}-${i}`}
              className="flex items-center gap-3 px-7 text-sm font-medium tracking-[0.18em] uppercase text-[var(--color-text-tertiary)]"
            >
              <span
                className="w-1 h-1 rounded-full bg-[var(--color-accent-500)]"
                aria-hidden
              />
              {city}
            </span>
          ))}
        </div>
      </section>

      {/* ───────────────────────── POSTCARDS (new image section) ───────────────────────── */}
      <section className="py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Eyebrow>Field notes</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-balance text-[var(--color-text-primary)] mb-5">
              Postcards from the{" "}
              <span className="font-serif italic font-normal">test trips</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
              Dry runs our team made before opening the beta. Yours go here
              next.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
            {postcards.map((card) => (
              <figure
                key={card.place}
                className={`w-60 md:w-72 bg-white p-3 pb-4 rounded-sm shadow-xl shadow-black/20 border border-black/5 transition-all duration-300 hover:rotate-0 hover:scale-[1.04] hover:z-10 ${card.tilt}`}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={card.src}
                    alt={card.place}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  {/* stamp + postmark */}
                  <span
                    className="absolute top-2 right-2 w-8 h-10 border border-dashed border-white/70 bg-white/20 backdrop-blur-[2px] flex items-center justify-center"
                    aria-hidden
                  >
                    <Plane className="w-3.5 h-3.5 text-white/90" />
                  </span>
                  <span
                    className="absolute top-4 right-11 w-7 h-7 rounded-full border border-dashed border-white/50"
                    aria-hidden
                  />
                </div>
                <figcaption className="pt-3 flex items-baseline justify-between gap-2">
                  <span className="font-serif italic text-lg text-stone-700">
                    {card.place}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 text-right">
                    {card.note}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── HONEST STRIP (fixed corners) ───────────────────────── */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 rounded-2xl border border-[var(--color-border)] overflow-hidden bg-[var(--color-surface)]">
            {[
              {
                icon: Rocket,
                title: "Early access",
                note: "Building in public",
              },
              { icon: Gift, title: "Free in beta", note: "No paywall yet" },
              {
                icon: Sparkles,
                title: "Made in India",
                note: "For Indian travellers",
              },
              {
                icon: MessageSquare,
                title: "Feedback-driven",
                note: "You shape the roadmap",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`group p-8 border-[var(--color-border)] ${i % 2 === 1 ? "border-l" : ""} ${i >= 2 ? "border-t md:border-t-0" : ""} ${i > 0 ? "md:border-l" : ""}`}
              >
                <item.icon className="w-5 h-5 mb-4 text-[var(--color-brand-600)] group-hover:text-[var(--color-accent-600)] transition-colors" />
                <p className="font-semibold text-[var(--color-text-primary)]">
                  {item.title}
                </p>
                <p className="text-sm text-[var(--color-text-tertiary)] mt-1">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── FEATURES ───────────────────────── */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Eyebrow>What we&apos;re building</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-balance text-[var(--color-text-primary)] mb-5">
              Travel planning, the{" "}
              <span className="font-serif italic font-normal">desi</span> way
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
              Most planners are built for Western travellers. Ours starts with
              the questions Indians actually ask.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Stamp}
              title="Visa-first suggestions"
              description="Visa-free, VoA, and e-Visa destinations first — every pick respects what an Indian passport can actually enter."
            />
            <FeatureCard
              icon={IndianRupee}
              title="Real ₹ budgets"
              description="Forex-aware cost estimates in rupees, with group splits and per-person breakdowns before you commit."
            />
            <FeatureCard
              icon={Users}
              title="Built for groups"
              description="Polls, votes and shared plans — so the Goa plan finally survives the group chat."
            />
          </div>

          <div className="mt-6 rounded-2xl border border-[var(--color-border)] p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-8">
            <div className="shrink-0 md:w-52">
              <p className="font-semibold text-[var(--color-text-primary)]">
                On the roadmap
              </p>
              <p className="text-sm text-[var(--color-text-tertiary)] mt-1">
                Coming through the beta.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {roadmap.map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full text-sm border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-brand-500)] hover:text-[var(--color-brand-600)] transition-colors cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── HOW IT WORKS (boarding passes) ───────────────────────── */}
      <section
        id="how-it-works"
        className="py-24 border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-balance text-[var(--color-text-primary)]">
              Idea to itinerary in{" "}
              <span className="font-serif italic font-normal">three stops</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <BoardingStep key={step.num} step={step} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── CTA (darkened) ───────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto relative rounded-[2rem] bg-[var(--color-cta)] overflow-hidden shadow-2xl shadow-black/20">
          {/* punch notches on the perforation */}
          <span className="hidden md:block absolute -top-3 right-[228px] w-6 h-6 rounded-full bg-[var(--color-surface)]" aria-hidden />
          <span className="hidden md:block absolute -bottom-3 right-[228px] w-6 h-6 rounded-full bg-[var(--color-surface)]" aria-hidden />
      
          <div className="grid md:grid-cols-[1fr_240px]">
            {/* ── main: the ask ── */}
            <div className="relative px-8 py-16 md:px-14 md:py-20 text-center md:text-left">
              <div className="absolute inset-0 bg-noise opacity-[0.06] pointer-events-none" aria-hidden />
      
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-balance text-white mb-5">
                  <span className="font-serif italic font-normal">Chalo,</span> plan karte hain.
                </h2>
                <p className="text-white/75 text-lg leading-relaxed mb-9 max-w-md mx-auto md:mx-0">
                  Join the early access and take your first AI-planned trip this
                  season. Free while we're in beta.
                </p>
                <Button
                  href="/auth/signup"
                  className="!bg-white !text-[#0e7490] hover:!bg-[var(--color-brand-50)] !shadow-none !text-base !px-8 !rounded-full"
                >
                  Get early access <ArrowRight className="w-4 h-4" />
                </Button>
                <p className="mt-5 text-white/55 text-sm">No credit card required</p>
              </div>
            </div>
      
            {/* ── perforation ── */}
            <div className="hidden md:block absolute inset-y-0 right-[240px] border-l-2 border-dashed border-white/20" aria-hidden />
      
            {/* ── stub: the ticket details ── */}
            <div className="hidden md:flex flex-col justify-between gap-8 p-7">
              <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
                <span>Boarding pass</span>
                <span>AI-TP · 2026</span>
              </div>
      
              <div>
                <p className="text-white font-bold tracking-tight text-xl mb-1 flex items-center">
                  <span>HOME</span>
                   <ArrowRight size={16} /> 
                  <span>ANYWHERE</span>
                </p>
                <p className="text-white/60 text-xs">Passenger: you · Seat 1A · Gate: now</p>
              </div>
      
              {/* one small looping plane — the only motion, kept quiet */}
              <svg viewBox="0 0 200 60" fill="none" className="w-full" aria-hidden>
                <path
                  id="stub-loop"
                  d="M4 46 C 60 10, 140 10, 196 46"
                  stroke="white"
                  strokeOpacity="0.35"
                  strokeWidth="1.5"
                  strokeDasharray="4 8"
                  strokeLinecap="round"
                />
                <g>
                  <path d="M0 -5 L13 0 L0 5 L4 0 Z" fill="var(--color-accent-400)" />
                  <animateMotion dur="5s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#stub-loop" />
                  </animateMotion>
                </g>
              </svg>
      
              <div className="flex items-end justify-between gap-4">
                <Barcode className="text-white/70" />
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Fare</p>
                  <p className="text-white font-bold text-sm flex items-center">FREE · BETA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── FOOTER ───────────────────────── */}
      <footer className="border-t border-[var(--color-border)] pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-14">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-brand-600)] text-white">
                  <Plane className="w-4 h-4" />
                </span>
                <span className="font-bold tracking-tight text-[var(--color-text-primary)]">
                  AI Travel Planner
                </span>
              </div>
              <p className="text-[var(--color-text-tertiary)] text-sm leading-relaxed max-w-sm">
                From &quot;where should we go?&quot; to &quot;when do we
                leave?&quot; — AI trip planning built for Indian travellers.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
                Product
              </p>
              <ul className="space-y-3 text-sm text-[var(--color-text-secondary)]">
                <li>
                  <Link
                    href="#features"
                    className="hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#how-it-works"
                    className="hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    How it works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/signup"
                    className="hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    Early access
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
                Legal
              </p>
              <ul className="space-y-3 text-sm text-[var(--color-text-secondary)]">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[var(--color-border)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[var(--color-text-tertiary)] text-sm">
              © {new Date().getFullYear()} AI Travel Planner
            </p>
            <p className="text-[var(--color-text-tertiary)] text-sm">
              Built in India 🇮🇳 for travellers from India
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
