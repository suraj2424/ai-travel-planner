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
  Heart,
  Palmtree,
  Umbrella,
  Landmark,
  Mountain,
  Soup,
  Building,
  Waves,
  Sailboat,
  Building2,
  CloudRain,
  Map,
  Flower2,
  Flag,
  Wrench,
  Castle,
  Tent,
  Coffee,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import FeatureCard from "@/components/ui/featureCard";
import Button from "@/components/ui/button";

/* Destinations */
const destinations = [
  { name: "Goa", icon: Umbrella },
  { name: "Ladakh", icon: Mountain },
  { name: "Kerala", icon: Sailboat },
  { name: "Meghalaya", icon: CloudRain },
  { name: "Rishikesh", icon: Flower2 },
  { name: "Jaipur", icon: Castle },
  { name: "Varanasi", icon: MapPin },
  { name: "Manali", icon: Tent },
  { name: "Andaman", icon: Palmtree },
  { name: "Udaipur", icon: Building },
  { name: "Darjeeling", icon: Coffee },
  { name: "Hampi", icon: Landmark },
];

const roadmap = [
  "Veg & Jain food filters",
  "Festival & long-weekend planner",
  "Forex rate alerts",
  "Group split payments",
  "Domestic hidden gems",
  "Family-friendly pacing",
];

const steps = [
  {
    num: "01",
    icon: Sparkles,
    title: "Batao kya scene hai",
    description:
      "Type karo jaise dost ko bata rahe ho — \"Bali jaana hai, 6 din, ₹60k budget, veg khana, 5 log hain.\"",
  },
  {
    num: "02",
    icon: MapPin,
    title: "Plan ready, boss",
    description:
      "Day-by-day itinerary milega with visa status, flights, stays aur real costs — sab ₹ mein.",
  },
  {
    num: "03",
    icon: Plane,
    title: "Group mein share, done",
    description:
      "Group chat mein bhejo, dates lock karo, aur jab sab ready ho toh book karo.",
  },
];

/* Eyebrow label */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-brand-600)] mb-5">
      <span className="w-8 h-px bg-[var(--color-brand-500)]" aria-hidden />
      {children}
      <span className="w-8 h-px bg-[var(--color-brand-500)]" aria-hidden />
    </p>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-clip">
      {/* ───────────────────────── NAV ───────────────────────── */}
      <header className="fixed top-4 inset-x-0 z-50 px-4">
        <nav className="max-w-5xl mx-auto flex items-center justify-between gap-4 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] backdrop-blur-xl pl-5 pr-2 py-2 shadow-[var(--shadow-card)]">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[var(--color-text-primary)] hover:opacity-80 transition-opacity"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-brand-600)] text-white shadow-sm">
              <Plane className="w-4 h-4" />
            </span>
            <span className="font-bold tracking-tight text-[15px]">
              SafarAI
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--color-text-secondary)]">
            <a
              href="#features"
              className="hover:text-[var(--color-brand-600)] transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-[var(--color-brand-600)] transition-colors"
            >
              How it works
            </a>
            <Link
              href="/auth/signin"
              className="hover:text-[var(--color-brand-600)] transition-colors"
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
              Get early access
            </Button>
          </div>
        </nav>
      </header>

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative pt-40 pb-24">
        {/* Ambient glow — teal, single color, soft breathing */}
        <div
          className="absolute top-20 left-1/3 w-[500px] h-[500px] rounded-full bg-[var(--color-brand-500)] opacity-[0.10] blur-[130px] pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute top-48 right-1/4 w-[350px] h-[350px] rounded-full bg-[var(--color-accent-400)] opacity-[0.08] blur-[110px] pointer-events-none"
          aria-hidden
        />

        <div
          className="absolute inset-0 bg-grid-pattern opacity-[0.12] pointer-events-none"
          aria-hidden
        />

        {/* flight path arc */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1440 640"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M -60 500 C 260 380, 480 560, 760 340 S 1240 140, 1520 220"
            fill="none"
            stroke="var(--color-brand-500)"
            strokeOpacity="0.2"
            strokeWidth="1.5"
            strokeDasharray="6 9"
            className="animate-dash"
          />
          <circle
            cx="760"
            cy="340"
            r="3"
            fill="var(--color-brand-500)"
            fillOpacity="0.5"
          />
        </svg>

        {/* Decorative Devanagari — सफ़र (journey) */}
        <div
          className="absolute top-24 left-1/2 -translate-x-1/2 font-serif text-[12rem] md:text-[18rem] leading-none text-[var(--color-text-primary)] opacity-[0.02] select-none pointer-events-none whitespace-nowrap"
          aria-hidden
        >
          सफ़र
        </div>

        <div
          className="absolute inset-0 bg-noise opacity-[0.10] pointer-events-none"
          aria-hidden
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          {/* badge */}
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-brand-500)]/25 bg-[var(--color-brand-50)] text-xs font-medium text-[var(--color-brand-600)] mb-9 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-500)] animate-pulse" />
            Early access · Built for Indian travellers <Flag className="w-3.5 h-3.5 inline ml-1" />
          </p>

          <h1 className="text-5xl md:text-7xl font-bold tracking-[-0.04em] leading-[1.08] text-balance text-[var(--color-text-primary)] mb-7">
            Ghumne chalein?{" "}
            <br className="hidden sm:block" />
            <span className="relative inline-block font-serif italic font-normal text-[var(--color-brand-600)]">
              Bas bol do.
              <svg
                className="absolute left-0 -bottom-1 w-full"
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3 9 C 55 3, 110 13, 165 7 S 270 5, 297 8"
                  stroke="var(--color-accent-500)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-11">
            Yaar, trip plan banana kitna mushkil hai? Group chat mein 50
            messages, phir bhi kuch decide nahi hota. Hum sab sort kar dete
            hain — visa, budget, veg food, sab kuch.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              href="/auth/signup"
              variant="primary"
              className="w-full sm:w-auto !text-base !px-8"
            >
              Plan banao — free hai <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              href="#how-it-works"
              variant="outline"
              className="w-full sm:w-auto !text-base !px-8"
            >
              Dekho kaise kaam karta hai
            </Button>
          </div>

          <p className="mt-8 text-sm text-[var(--color-text-tertiary)]">
            Beta mein bilkul free · No credit card required
          </p>

          {/* ── Product preview ── */}
          <div className="relative mt-24">
            <div
              className="absolute -inset-x-8 -top-8 bottom-0 bg-[var(--color-brand-500)] opacity-[0.06] blur-3xl rounded-full pointer-events-none"
              aria-hidden
            />

            <div className="relative mx-auto max-w-2xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-[var(--shadow-card-hover)] overflow-hidden text-left">
              {/* window chrome */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-xs font-medium text-[var(--color-text-tertiary)]">
                    SafarAI
                  </span>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-brand-600)]">
                  <Stamp className="w-3 h-3" />
                  e-Visa friendly
                </span>
              </div>

              <div className="p-6 space-y-5">
                {/* user prompt */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-md bg-[var(--color-brand-600)] text-white text-sm leading-relaxed px-4 py-3 shadow-[var(--shadow-brand)]">
                    Bhai Bali ka plan bana de, 5 log hain, ₹60k per head,
                    beaches aur temples chahiye. Veg khana milna chahiye
                  </div>
                </div>

                {/* ai response */}
                <div className="flex gap-3.5">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-[var(--color-brand-600)] flex items-center justify-center shadow-sm">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 space-y-2.5 min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
                      Bali, Indonesia · 6 days ·{" "}
                      <span className="tabular-nums text-[var(--color-brand-600)] font-bold">
                        ₹58,400
                      </span>
                      /person
                    </p>

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
                        className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3.5 py-2.5 hover:border-[var(--color-brand-500)]/40 transition-colors"
                      >
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-brand-600)] whitespace-nowrap">
                          {item.day}
                        </span>
                        <span className="text-sm text-[var(--color-text-secondary)] truncate">
                          {item.plan}
                        </span>
                        <Check className="w-4 h-4 text-[var(--color-brand-500)] ml-auto shrink-0" />
                      </div>
                    ))}

                    {/* group poll */}
                    <div className="pt-2">
                      <div className="flex justify-between text-[11px] text-[var(--color-text-tertiary)] mb-1.5">
                        <span>Group poll</span>
                        <span className="font-semibold text-[var(--color-text-primary)] tabular-nums">
                          4 of 6 confirmed
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[var(--color-border)] overflow-hidden">
                        <div className="h-full w-2/3 rounded-full bg-[var(--color-brand-500)]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* floating chips */}
            <div className="hidden lg:block absolute -left-16 top-24 animate-float rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-3 shadow-[var(--shadow-card)]">
              <p className="text-xs text-[var(--color-text-tertiary)] mb-0.5">
                Indian passport
              </p>
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                <MapPin className="w-4 h-4 inline mr-1 text-[var(--color-brand-600)]" />
                Visa on arrival — free!
              </p>
            </div>
            <div className="hidden lg:block absolute -right-12 bottom-20 animate-float-delayed rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-3 shadow-[var(--shadow-card)]">
              <p className="text-xs text-[var(--color-text-tertiary)] mb-0.5">
                Budget status
              </p>
              <p className="text-sm font-semibold text-[var(--color-brand-600)] tabular-nums">
                ₹1,600 under budget ✓
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── MARQUEE ───────────────────────── */}
      <section className="py-7 border-y border-[var(--color-border)] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee">
          {[...destinations, ...destinations].map((dest, i) => (
            <span
              key={`${dest.name}-${i}`}
              className="flex items-center gap-2 px-7 text-sm font-medium tracking-[0.14em] uppercase text-[var(--color-text-tertiary)]"
            >
              <dest.icon className="w-5 h-5" aria-hidden />
              {dest.name}
            </span>
          ))}
        </div>
      </section>

      {/* ───────────────────────── HONEST STRIP ───────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--color-border)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-[var(--shadow-card)]">
          {[
            {
              icon: Rocket,
              title: "Early access live",
              note: "Building in public 🔧",
            },
            {
              icon: Gift,
              title: "Abhi free hai",
              note: "No paywall, no catch",
            },
            {
              icon: Heart,
              title: "India ke liye banaya",
              note: "Desi travellers, desi needs",
            },
            {
              icon: MessageSquare,
              title: "Feedback = roadmap",
              note: "Tum bolo, hum banayein",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-[var(--color-surface)] p-8 hover:bg-[var(--color-surface-muted)] transition-colors duration-300 group"
            >
              <item.icon className="w-5 h-5 mb-4 text-[var(--color-brand-600)] group-hover:text-[var(--color-brand-500)] transition-colors" />
              <p className="font-semibold text-[var(--color-text-primary)]">
                {item.title}
              </p>
              <p className="text-sm text-[var(--color-text-tertiary)] mt-1">
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────────── FEATURES ───────────────────────── */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Eyebrow>Features</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-balance text-[var(--color-text-primary)] mb-5">
              Apne style ka{" "}
              <span className="font-serif italic font-normal text-[var(--color-brand-600)]">
                travel planner
              </span>
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
              Baaki planners goro ke liye bane hain. Humara woh sawaal
              solve karta hai jo Indian travellers actually poochte hain.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Stamp}
              title="Visa-first suggestions"
              description="Pehle visa-free, VoA, aur e-Visa destinations dikhate hain — Indian passport ke hisaab se. Koi last-minute rejection nahi."
            />
            <FeatureCard
              icon={IndianRupee}
              title="Real ₹ mein budget"
              description="Forex-aware cost estimates rupees mein, group split ke saath. Commit karne se pehle per-person breakdown milega."
            />
            <FeatureCard
              icon={Users}
              title="Group trips sorted"
              description="Polls, votes aur shared plans — taaki Goa ka plan finally group chat se bahar aaye aur actually ho jaaye."
            />
          </div>

          {/* roadmap */}
          <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-8 shadow-[var(--shadow-card)]">
            <div className="shrink-0 md:w-52">
              <p className="font-semibold text-[var(--color-text-primary)]">
                On the roadmap <Wrench className="w-4 h-4 inline ml-1" />
              </p>
              <p className="text-sm text-[var(--color-text-tertiary)] mt-1">
                Beta mein aur features aayenge
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {roadmap.map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full text-sm border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-brand-500)] hover:text-[var(--color-brand-600)] hover:shadow-sm transition-all cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── HOW IT WORKS ───────────────────────── */}
      <section
        id="how-it-works"
        className="py-24 border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-balance text-[var(--color-text-primary)]">
              Idea se itinerary,{" "}
              <span className="font-serif italic font-normal text-[var(--color-brand-600)]">
                teen steps mein
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="group p-7 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--color-brand-600)]/10 border border-[var(--color-brand-500)]/20">
                    <step.icon className="w-4 h-4 text-[var(--color-brand-600)]" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-600)]">
                    Step {step.num}
                  </span>
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-[var(--color-text-primary)] mb-2">
                  {step.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed text-[15px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── CTA ───────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl bg-[var(--color-brand-700)] px-8 py-24 text-center shadow-[0_20px_60px_-10px_rgba(13,148,136,0.35)]">
          {/* ambient warm glow in center */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[var(--color-accent-400)] opacity-[0.08] blur-[120px] pointer-events-none"
            aria-hidden
          />

          {/* concentric arcs */}
          <svg
            className="absolute inset-0 w-full h-full animate-spin-slow"
            viewBox="0 0 1200 600"
            preserveAspectRatio="none"
            aria-hidden
          >
            {[...Array(6)].map((_, i) => (
              <circle
                key={i}
                cx="600"
                cy="300"
                r={80 + i * 85}
                fill="none"
                stroke="white"
                strokeOpacity={0.06 - i * 0.007}
                strokeDasharray={i % 2 === 0 ? "4 8" : "none"}
              />
            ))}
          </svg>
          {/* flight arc */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 600"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M -40 420 C 300 300, 600 460, 900 240 S 1300 160, 1360 120"
              fill="none"
              stroke="white"
              strokeOpacity="0.15"
              strokeWidth="1.5"
              strokeDasharray="5 9"
              className="animate-dash"
            />
          </svg>
          <div
            className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"
            aria-hidden
          />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] text-balance text-white mb-6">
              <span className="font-serif italic font-normal text-white/90">
                Toh phir,
              </span>{" "}
              kab nikalna hai?
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Early access join karo aur is season ka pehla AI-planned trip le
              jao. Beta mein sab kuch free hai — koi catch nahi.
            </p>
            <a
              href="/auth/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-[var(--color-brand-700)] font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]"
            >
              Chalo shuru karein <ArrowRight className="w-4 h-4" />
            </a>
            <p className="mt-6 text-white/50 text-sm">
              No credit card · No spam · Bilkul free
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────────── FOOTER ───────────────────────── */}
      <footer className="border-t border-[var(--color-border)] pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-14">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-brand-600)] text-white shadow-sm">
                  <Plane className="w-4 h-4" />
                </span>
                <span className="font-bold tracking-tight text-[var(--color-text-primary)]">
                  SafarAI
                </span>
              </div>
              <p className="text-[var(--color-text-tertiary)] text-sm leading-relaxed max-w-sm">
                &quot;Kahan jaayein?&quot; se &quot;kab nikalein?&quot; tak — AI
                trip planning jo samjhe Indian travellers ko.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
                Product
              </p>
              <ul className="space-y-3 text-sm text-[var(--color-text-secondary)]">
                <li>
                  <a
                    href="#features"
                    className="hover:text-[var(--color-brand-600)] transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-[var(--color-brand-600)] transition-colors"
                  >
                    How it works
                  </a>
                </li>
                <li>
                  <Link
                    href="/auth/signup"
                    className="hover:text-[var(--color-brand-600)] transition-colors"
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
                    className="hover:text-[var(--color-brand-600)] transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[var(--color-brand-600)] transition-colors"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[var(--color-border)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p
              suppressHydrationWarning
              className="text-[var(--color-text-tertiary)] text-sm"
            >
              © {new Date().getFullYear()} SafarAI
            </p>
            <p className="text-[var(--color-text-tertiary)] text-sm">
              Dil se banaya, India ke liye <Heart className="w-4 h-4 inline mx-1 text-red-500 fill-current" /> <Flag className="w-4 h-4 inline" />
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
