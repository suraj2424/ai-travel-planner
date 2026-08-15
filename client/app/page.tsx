import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Wayfare — AI Travel Planner landing page                          */
/*  Palette:                                                          */
/*   cream    #FBF6EC   ink    #141416   coral  #FF6B35               */
/*   teal     #0F4C4A   butter #F4C95D   rose   #F7D2C4               */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#141416] font-sans">
      <Grain />
      <Nav />
      <Hero />
      <Marquee />
      <HowItWorks />
      <ItineraryShowcase />
      <Destinations />
      <Features />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Subtle grain overlay                                              */
/* ------------------------------------------------------------------ */
function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.05] mix-blend-multiply"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.9'/></svg>\")",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  NAV                                                               */
/* ------------------------------------------------------------------ */
function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#FBF6EC]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium text-[#141416]/70 md:flex">
          <a href="#how" className="hover:text-[#141416]">How it works</a>
          <a href="#destinations" className="hover:text-[#141416]">Destinations</a>
          <a href="#features" className="hover:text-[#141416]">Features</a>
          <a href="#pricing" className="hover:text-[#141416]">Pricing</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="#"
            className="hidden text-sm font-medium text-[#141416]/70 hover:text-[#141416] sm:block"
          >
            Sign in
          </Link>
          <Link
            href="#cta"
            className="group relative inline-flex items-center gap-2 rounded-full bg-[#141416] px-4 py-2 text-sm font-semibold text-[#FBF6EC] transition hover:bg-[#FF6B35]"
          >
            Plan a trip
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#141416]">
        <span className="absolute inset-1 rounded-full border border-[#F4C95D]/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35]" />
      </span>
      <span className="text-lg font-black tracking-tight">
        Wayfare<span className="text-[#FF6B35]">.</span>
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                              */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* decorative arcs */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#F4C95D]/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 top-40 h-[380px] w-[380px] rounded-full bg-[#F7D2C4]/60 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-24 pt-16 md:pt-24 lg:grid-cols-12">
        {/* LEFT — copy */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#141416]/10 bg-white/60 px-3 py-1 text-xs font-medium tracking-wide text-[#141416]/70 backdrop-blur">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF6B35]" />
            Now planning trips in 40+ countries
          </div>

          <h1 className="mt-6 font-serif text-[54px] leading-[1.02] tracking-tight text-[#141416] sm:text-[72px] lg:text-[92px]">
            Wander<span className="text-[#FF6B35]">.</span>
            <br />
            <span className="italic text-[#0F4C4A]">Without</span> the
            <br />
            spreadsheet.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#141416]/70">
            Wayfare is your pocket travel concierge. Tell it{" "}
            <span className="bg-[#F4C95D]/60 px-1">“10 days in Japan, quiet towns, great ramen”</span>{" "}
            and get a hand-crafted itinerary with flights, stays, food and the tiny stuff — in 30 seconds.
          </p>

          {/* prompt input mockup */}
          <div className="mt-8 max-w-xl rounded-2xl border border-[#141416]/10 bg-white p-2 shadow-[0_20px_60px_-30px_rgba(20,20,22,0.25)]">
            <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-3 px-3">
                <SparkIcon />
                <input
                  defaultValue="A slow 7-day loop through northern Portugal"
                  className="w-full bg-transparent py-3 text-sm text-[#141416] placeholder:text-[#141416]/40 focus:outline-none"
                />
              </div>
              <button className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#141416]">
                Plan my trip
                <ArrowIcon />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 px-3 py-2">
              {["Solo · budget", "Family · kids", "Foodie", "Off-grid"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[#141416]/10 bg-[#FBF6EC] px-2.5 py-1 text-[11px] font-medium text-[#141416]/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* trust row */}
          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-[#141416]/60">
            <div className="flex -space-x-2">
              {["#FF6B35", "#0F4C4A", "#F4C95D", "#141416"].map((c) => (
                <span
                  key={c}
                  className="h-8 w-8 rounded-full border-2 border-[#FBF6EC]"
                  style={{ background: c }}
                />
              ))}
            </div>
            <div>
              <div className="font-semibold text-[#141416]">
                4.9 ★ · 12,400 trips planned
              </div>
              <div className="text-xs">Loved by hopeless romantics & tight schedulers alike</div>
            </div>
          </div>
        </div>

        {/* RIGHT — postcard stack */}
        <div className="relative lg:col-span-5">
          <PostcardStack />
        </div>
      </div>
    </section>
  );
}

function PostcardStack() {
  return (
    <div className="relative mx-auto h-[560px] w-full max-w-md">
      {/* back card — Kyoto */}
      <Postcard
        className="absolute left-2 top-0 rotate-[-6deg]"
        title="Kyoto"
        country="Japan · 桜"
        gradient="linear-gradient(140deg,#F7D2C4 0%,#F4C95D 60%,#FF6B35 100%)"
        stampColor="#0F4C4A"
        image="https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=600"
        day="Day 03 · Higashiyama"
        line1="Sunrise at Kiyomizu-dera"
        line2="Matcha in a 200-yr-old teahouse"
      />

      {/* middle card — Lisbon */}
      <Postcard
        className="absolute right-0 top-24 rotate-[4deg]"
        title="Lisbon"
        country="Portugal · Atlântico"
        gradient="linear-gradient(140deg,#0F4C4A 0%,#1B7A6D 55%,#F4C95D 100%)"
        stampColor="#FF6B35"
        image="https://images.pexels.com/photos/1831235/pexels-photo-1831235.jpeg?auto=compress&cs=tinysrgb&w=600"
        day="Day 02 · Alfama"
        line1="Tram 28 at golden hour"
        line2="Fado dinner at A Baiuca"
        dark
      />

      {/* front card — Marrakech */}
      <Postcard
        className="absolute left-6 top-56 rotate-[-2deg]"
        title="Marrakech"
        country="Morocco · مراكش"
        gradient="linear-gradient(140deg,#FF6B35 0%,#E94F1D 55%,#8B1E1E 100%)"
        stampColor="#F4C95D"
        image="https://images.pexels.com/photos/15260622/pexels-photo-15260622/free-photo-of-el-badi-palace-in-marrakesh.jpeg"
        day="Day 01 · Medina"
        line1="Riad check-in with mint tea"
        line2="Sunset over Jemaa el-Fnaa"
        dark
      />

      {/* floating tag */}
      <div className="absolute -right-2 top-4 rounded-full bg-[#141416] px-3 py-1.5 text-[11px] font-semibold text-[#FBF6EC] shadow-lg">
        ✦ AI-crafted · verified by locals
      </div>
      <div className="absolute -left-4 bottom-4 rotate-[-8deg] rounded-md bg-white px-3 py-1.5 text-[11px] font-semibold text-[#141416] shadow-md ring-1 ring-[#141416]/10">
        30-sec plan
      </div>
    </div>
  );
}

function Postcard({
  className = "",
  title,
  country,
  gradient,
  stampColor,
  art,
  image,
  day,
  line1,
  line2,
  dark = false,
}: {
  className?: string;
  title: string;
  country: string;
  gradient: string;
  stampColor: string;
  art?: React.ReactNode;
  image?: string;
  day: string;
  line1: string;
  line2: string;
  dark?: boolean;
}) {
  const text = dark ? "text-white" : "text-[#141416]";
  const sub = dark ? "text-white/80" : "text-[#141416]/70";
  return (
    <div
      className={`${className} w-[300px] overflow-hidden rounded-2xl shadow-[0_30px_60px_-20px_rgba(20,20,22,0.35)] ring-1 ring-black/5 transition-transform duration-500 hover:-translate-y-1`}
      style={{ background: gradient }}
    >
      <div className="relative h-40 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          art
        )}
        <div
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-sm text-[9px] font-black tracking-wider"
          style={{ background: stampColor, color: "#141416" }}
        >
          ✈
        </div>
      </div>
      <div className={`space-y-2 bg-white/95 p-4 ${text}`}>
        <div className="flex items-baseline justify-between">
          <h3 className="font-serif text-2xl font-bold text-[#141416]">{title}</h3>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#141416]/50">
            {country}
          </span>
        </div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#FF6B35]">
          {day}
        </div>
        <ul className="space-y-1 text-sm text-[#141416]/80">
          <li className="flex items-start gap-2">
            <Dot /> {line1}
          </li>
          <li className="flex items-start gap-2">
            <Dot /> {line2}
          </li>
        </ul>
      </div>
    </div>
  );
}

function Dot() {
  return <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-[#141416]/50" />;
}

/* Tiny SVG illustrations to give each postcard its own vibe */
function KyotoArt() {
  return (
    <svg viewBox="0 0 300 160" className="h-full w-full">
      <circle cx="230" cy="55" r="28" fill="#FBF6EC" opacity="0.9" />
      {/* pagoda */}
      <g fill="#141416" opacity="0.85">
        <path d="M40 130 L100 130 L92 118 L48 118 Z" />
        <path d="M50 118 L90 118 L84 106 L56 106 Z" />
        <path d="M58 106 L82 106 L77 94 L63 94 Z" />
        <path d="M65 94 L75 94 L72 84 L68 84 Z" />
      </g>
      {/* cherry blossoms */}
      {[
        [140, 40], [170, 70], [200, 95], [130, 90], [180, 45], [155, 110], [215, 130],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#FBF6EC" opacity="0.9" />
      ))}
      <path d="M0 140 Q150 120 300 145 L300 160 L0 160 Z" fill="#141416" opacity="0.15" />
    </svg>
  );
}

function LisbonArt() {
  return (
    <svg viewBox="0 0 300 160" className="h-full w-full">
      {/* tiled roofs */}
      <g fill="#F7D2C4">
        <rect x="20" y="80" width="60" height="50" />
        <rect x="90" y="60" width="80" height="70" />
        <rect x="180" y="90" width="50" height="40" />
        <rect x="240" y="70" width="45" height="60" />
      </g>
      <g fill="#141416" opacity="0.8">
        <polygon points="20,80 50,60 80,80" />
        <polygon points="90,60 130,35 170,60" />
        <polygon points="180,90 205,72 230,90" />
        <polygon points="240,70 262,52 285,70" />
      </g>
      {/* windows */}
      <g fill="#141416">
        {[
          [35, 95], [55, 95], [100, 80], [120, 80], [140, 80], [100, 105], [140, 105],
          [195, 105], [215, 105], [250, 90], [270, 90], [250, 110], [270, 110],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="6" height="8" opacity="0.7" />
        ))}
      </g>
      {/* sun */}
      <circle cx="60" cy="35" r="14" fill="#F4C95D" />
    </svg>
  );
}

function MarrakechArt() {
  return (
    <svg viewBox="0 0 300 160" className="h-full w-full">
      {/* dunes */}
      <path d="M0 120 Q80 90 160 110 T300 100 L300 160 L0 160 Z" fill="#F4C95D" opacity="0.55" />
      <path d="M0 140 Q100 115 200 130 T300 125 L300 160 L0 160 Z" fill="#141416" opacity="0.25" />
      {/* arch silhouette */}
      <g fill="#141416" opacity="0.85">
        <path d="M110 110 L110 70 Q150 30 190 70 L190 110 Z" />
        <rect x="100" y="108" width="100" height="8" />
      </g>
      {/* sun */}
      <circle cx="220" cy="50" r="20" fill="#F4C95D" />
      {/* palm */}
      <g stroke="#141416" strokeWidth="2" fill="none" opacity="0.8">
        <path d="M60 130 Q60 100 55 80" />
        <path d="M55 80 Q40 70 30 78" />
        <path d="M55 80 Q70 65 82 72" />
        <path d="M55 80 Q45 60 40 55" />
        <path d="M55 80 Q65 60 72 55" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  MARQUEE                                                           */
/* ------------------------------------------------------------------ */
function Marquee() {
  const items = [
    "Featured in Condé Nast",
    "★ 4.9 on the App Store",
    "Trusted by 200k travelers",
    "Powered by real locals",
    "Carbon-aware routing",
    "As seen in NYT Travel",
  ];
  return (
    <div className="border-y border-[#141416]/10 bg-[#141416] py-4 text-[#FBF6EC]">
      <div className="flex gap-12 overflow-hidden">
        <div className="flex shrink-0 animate-[scroll_30s_linear_infinite] gap-12 whitespace-nowrap px-6 text-sm font-medium tracking-wide">
          {[...items, ...items, ...items].map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              {t}
              <span className="text-[#FF6B35]">✦</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0);} to { transform: translateX(-33.33%);} }`}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HOW IT WORKS                                                      */
/* ------------------------------------------------------------------ */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Whisper your dream",
      body: "One sentence is enough. Dates, mood, budget, dietary quirks — Wayfare gets it.",
      accent: "#FF6B35",
    },
    {
      n: "02",
      title: "Watch it plan, live",
      body: "Our model chains flights, stays, transit and reservations in a single reasoning pass.",
      accent: "#0F4C4A",
    },
    {
      n: "03",
      title: "Tweak, book, go",
      body: "Drag days around, swap a hotel, then book everything in-app. No 47 tabs.",
      accent: "#F4C95D",
    },
  ];
  return (
    <section id="how" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <SectionLabel>How it works</SectionLabel>
          <h2 className="mt-3 max-w-2xl font-serif text-5xl leading-tight tracking-tight md:text-6xl">
            From a passing thought <br />
            to a <span className="italic text-[#0F4C4A]">packed bag</span>.
          </h2>
        </div>
        <p className="max-w-sm text-[#141416]/70">
          Three steps. No account required to try it. No affiliate-junk hotels shoved in your face.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.n}
            className="group relative overflow-hidden rounded-3xl border border-[#141416]/10 bg-white p-8 transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(20,20,22,0.3)]"
          >
            <div
              className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20 blur-2xl transition group-hover:opacity-40"
              style={{ background: s.accent }}
            />
            <div
              className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full font-mono text-sm font-bold text-white"
              style={{ background: s.accent, color: s.accent === "#F4C95D" ? "#141416" : "white" }}
            >
              {s.n}
            </div>
            <h3 className="font-serif text-2xl font-bold">{s.title}</h3>
            <p className="mt-3 text-[#141416]/70">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ITINERARY SHOWCASE                                                */
/* ------------------------------------------------------------------ */
function ItineraryShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#141416] py-24 text-[#FBF6EC]">
      {/* decorative lines */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-[0.06]"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0 L0 0 0 40" fill="none" stroke="#FBF6EC" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <SectionLabel dark>Sample itinerary</SectionLabel>
          <h2 className="mt-3 font-serif text-5xl leading-tight tracking-tight md:text-6xl">
            A trip that reads like a <span className="italic text-[#F4C95D]">love letter</span>, not a list.
          </h2>
          <p className="mt-6 text-white/70">
            Every itinerary is annotated with why. Why this cafe at 9am. Why walk instead of taxi.
            Why leave Tuesday morning, not Monday night.
          </p>
          <ul className="mt-8 space-y-4 text-sm text-white/80">
            {[
              "Realtime flight & hotel availability",
              "Reservations booked into your calendar",
              "Local sim, weather & currency baked in",
              "Offline maps auto-downloaded for each day",
            ].map((f) => (
              <li key={f} className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF6B35] text-[10px] font-bold">
                  ✓
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* fake itinerary card */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-[#FBF6EC] p-6 text-[#141416] shadow-2xl md:p-8">
            <div className="flex items-center justify-between border-b border-[#141416]/10 pb-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-[#FF6B35]">
                  Wayfare · Itinerary #2841
                </div>
                <div className="mt-1 font-serif text-2xl font-bold">
                  Slow Northern Portugal · 7 days
                </div>
              </div>
              <div className="hidden text-right text-xs text-[#141416]/60 sm:block">
                Apr 12 – Apr 19<br />2 travelers · €1,840 total
              </div>
            </div>

            <ol className="mt-6 space-y-5">
              {[
                {
                  d: "Mon",
                  n: "01",
                  city: "Porto",
                  time: "18:30",
                  title: "Arrive · Riverside dinner at Cantinho do Avillez",
                  tag: "Booked",
                  color: "#0F4C4A",
                },
                {
                  d: "Wed",
                  n: "03",
                  city: "Douro Valley",
                  time: "09:00",
                  title: "Vintage train + Quinta do Bomfim tasting",
                  tag: "Reserved",
                  color: "#FF6B35",
                },
                {
                  d: "Fri",
                  n: "05",
                  city: "Guimarães",
                  time: "11:00",
                  title: "Old town walking loop with local historian",
                  tag: "Optional",
                  color: "#F4C95D",
                },
                {
                  d: "Sun",
                  n: "07",
                  city: "Braga",
                  time: "07:15",
                  title: "Sunrise at Bom Jesus, then train back to airport",
                  tag: "Confirmed",
                  color: "#0F4C4A",
                },
              ].map((it) => (
                <li
                  key={it.n}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-xl border border-[#141416]/10 bg-white p-4 transition hover:border-[#FF6B35]/50"
                >
                  <div className="flex flex-col items-center rounded-lg bg-[#FBF6EC] px-3 py-2 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#141416]/50">
                      {it.d}
                    </span>
                    <span className="font-serif text-xl font-black leading-none">{it.n}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#141416]/60">
                      <span>{it.city}</span>
                      <span>·</span>
                      <span>{it.time}</span>
                    </div>
                    <div className="text-[15px] font-medium">{it.title}</div>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
                    style={{
                      background: it.color,
                      color: it.color === "#F4C95D" ? "#141416" : "white",
                    }}
                  >
                    {it.tag}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#141416]/10 pt-4 text-sm">
              <div className="text-[#141416]/60">
                🌱 Route optimized for <span className="font-semibold text-[#141416]">−38% CO₂</span>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full bg-[#141416] px-4 py-2 text-xs font-semibold text-[#FBF6EC] hover:bg-[#FF6B35]">
                Open full plan <ArrowIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  DESTINATIONS                                                      */
/* ------------------------------------------------------------------ */
function Destinations() {
  const cards = [
    { city: "Oaxaca", country: "Mexico", days: "6 days", price: "€1,120", gradient: "linear-gradient(160deg,#FF6B35,#8B1E1E)", note: "Mezcal & mole", image: "https://images.pexels.com/photos/2775597/pexels-photo-2775597.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { city: "Hokkaido", country: "Japan", days: "9 days", price: "€2,680", gradient: "linear-gradient(160deg,#0F4C4A,#141416)", note: "Powder & onsen", image: "https://images.pexels.com/photos/36053253/pexels-photo-36053253/free-photo-of-aerial-night-view-of-wintery-hakodate-japan.jpeg?h=1000&w=1500&fit=crop" },
    { city: "Lofoten", country: "Norway", days: "5 days", price: "€1,940", gradient: "linear-gradient(160deg,#F4C95D,#0F4C4A)", note: "Fjords & aurora", image: "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { city: "Sicily", country: "Italy", days: "7 days", price: "€1,510", gradient: "linear-gradient(160deg,#F7D2C4,#FF6B35)", note: "Coasts & cannoli", image: "https://images.pexels.com/photos/4198959/pexels-photo-4198959.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { city: "Kerala", country: "India", days: "10 days", price: "€1,290", gradient: "linear-gradient(160deg,#0F4C4A,#F4C95D)", note: "Backwaters & spice", image: "https://images.pexels.com/photos/2476321/pexels-photo-2476321.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { city: "Georgia", country: "Caucasus", days: "8 days", price: "€980", gradient: "linear-gradient(160deg,#141416,#FF6B35)", note: "Wine & mountains", image: "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=600" },
  ];
  return (
    <section id="destinations" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <SectionLabel>Handpicked</SectionLabel>
          <h2 className="mt-3 max-w-2xl font-serif text-5xl leading-tight tracking-tight md:text-6xl">
            Trips people are <span className="italic text-[#FF6B35]">actually taking</span> this month.
          </h2>
        </div>
        <a
          href="#"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-[#141416] hover:text-[#FF6B35]"
        >
          Browse all 240 <ArrowIcon />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => (
          <article
            key={c.city}
            className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-3xl ring-1 ring-black/5"
            style={{ background: c.gradient }}
          >
            {/* image background */}
            {c.image && (
              <img
                src={c.image}
                alt={c.city}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            )}
            {/* decorative texture */}
            <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 200 250" preserveAspectRatio="none">
              <circle cx={30 + i * 20} cy="40" r="60" fill="white" opacity="0.15" />
              <circle cx="180" cy={200 - i * 10} r="80" fill="white" opacity="0.08" />
            </svg>

            {/* index number */}
            <div className="absolute right-6 top-6 font-serif text-6xl font-black text-white/30">
              0{i + 1}
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <div className="text-[11px] font-semibold uppercase tracking-widest opacity-80">
                {c.country} · {c.note}
              </div>
              <h3 className="mt-1 font-serif text-4xl font-black leading-none">{c.city}</h3>
              <div className="mt-4 flex items-center justify-between border-t border-white/25 pt-4 text-sm">
                <span>{c.days}</span>
                <span className="font-semibold">from {c.price}</span>
              </div>
            </div>

            <div className="absolute inset-x-6 top-6 h-8 origin-left scale-x-0 rounded-full bg-white/95 text-center text-xs font-bold leading-8 text-[#141416] transition group-hover:scale-x-100">
              Plan this trip →
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FEATURES                                                          */
/* ------------------------------------------------------------------ */
function Features() {
  const feats = [
    { icon: "🗺️", title: "Day-by-day maps", body: "Every day comes with a walkable, transit-aware map you can open offline." },
    { icon: "🥐", title: "Reservations, done", body: "Wayfare books tables, tours and trains — you just show up hungry." },
    { icon: "💸", title: "Budget honesty", body: "Real prices in your currency, updated hourly. No hidden resort fees." },
    { icon: "🌦️", title: "Weather-aware", body: "Rainy Tuesday? Museums first. Sunny Sunday? Beach day auto-shuffled in." },
    { icon: "🧭", title: "Local voice", body: "Recommendations vetted by 3,000+ locals — not TripAdvisor tourist traps." },
    { icon: "🛬", title: "Change on the fly", body: "Missed a train? Chat with Wayfare and the whole day re-plans itself." },
  ];
  return (
    <section id="features" className="relative bg-[#0F4C4A] py-24 text-[#FBF6EC]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl">
          <SectionLabel dark>Built for real trips</SectionLabel>
          <h2 className="mt-3 font-serif text-5xl leading-tight tracking-tight md:text-6xl">
            The details that make a trip <span className="italic text-[#F4C95D]">unforgettable</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {feats.map((f) => (
            <div
              key={f.title}
              className="group relative bg-[#0F4C4A] p-8 transition hover:bg-[#0B3937]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl">
                {f.icon}
              </div>
              <h3 className="font-serif text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-white/70">{f.body}</p>
              <span className="absolute right-6 top-6 text-white/20 transition group-hover:text-[#FF6B35]">
                <ArrowIcon />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TESTIMONIALS                                                      */
/* ------------------------------------------------------------------ */
function Testimonials() {
  const quotes = [
    {
      q: "I told it ‘honeymoon in Vietnam, we hate crowds’ and it built the trip of our lives. I nearly cried at the guesthouse it picked.",
      name: "Amelia R.",
      role: "Copywriter, Berlin",
      color: "#FF6B35",
    },
    {
      q: "It rebooked our whole itinerary at 2am after our flight was cancelled. My last travel agent would’ve been asleep.",
      name: "Kenji T.",
      role: "Product Designer, Osaka",
      color: "#0F4C4A",
    },
    {
      q: "Finally, a travel app that doesn’t push me toward whichever hotel paid the most. The picks felt personal.",
      name: "Priya S.",
      role: "Doctor, Bangalore",
      color: "#F4C95D",
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <SectionLabel>Postcards from users</SectionLabel>
          <h2 className="mt-3 max-w-2xl font-serif text-5xl leading-tight tracking-tight md:text-6xl">
            No paid reviews.<br />
            Just <span className="italic text-[#FF6B35]">people who came back grinning</span>.
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {quotes.map((t, i) => (
          <blockquote
            key={i}
            className="relative flex flex-col justify-between rounded-3xl border border-[#141416]/10 bg-white p-8"
          >
            <div
              className="absolute -top-4 left-8 flex h-8 w-8 items-center justify-center rounded-full text-lg font-black text-white"
              style={{ background: t.color, color: t.color === "#F4C95D" ? "#141416" : "white" }}
            >
              “
            </div>
            <p className="font-serif text-xl leading-snug text-[#141416]">{t.q}</p>
            <footer className="mt-8 flex items-center gap-3 border-t border-[#141416]/10 pt-5">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-white"
                style={{ background: t.color, color: t.color === "#F4C95D" ? "#141416" : "white" }}
              >
                {t.name[0]}
              </div>
              <div className="text-sm">
                <div className="font-semibold">{t.name}</div>
                <div className="text-[#141416]/60">{t.role}</div>
              </div>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PRICING                                                           */
/* ------------------------------------------------------------------ */
function Pricing() {
  const plans = [
    {
      name: "Daydreamer",
      price: "€0",
      per: "forever",
      pitch: "For the itch. Get a taste of Wayfare with 3 trip plans a month.",
      features: ["3 AI itineraries / month", "Day-by-day maps", "Community picks"],
      cta: "Start free",
      accent: "#FBF6EC",
      dark: false,
    },
    {
      name: "Wanderer",
      price: "€9",
      per: "/ month",
      pitch: "For the real trip you’re about to book. Unlimited plans + reservations.",
      features: [
        "Unlimited itineraries",
        "Auto-booking of stays & tables",
        "Live re-plan on the go",
        "Offline maps & local sim tips",
      ],
      cta: "Go Wanderer",
      accent: "#FF6B35",
      dark: true,
      featured: true,
    },
    {
      name: "Nomad",
      price: "€24",
      per: "/ month",
      pitch: "For the people who live out of a carry-on. Concierge on tap.",
      features: [
        "Everything in Wanderer",
        "Human concierge, 24/7",
        "Multi-country itineraries",
        "Loyalty & miles optimization",
      ],
      cta: "Talk to us",
      accent: "#0F4C4A",
      dark: true,
    },
  ];
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-14 text-center">
        <SectionLabel center>Pricing</SectionLabel>
        <h2 className="mt-3 font-serif text-5xl leading-tight tracking-tight md:text-6xl">
          One plan per <span className="italic text-[#0F4C4A]">kind of traveler</span>.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[#141416]/70">
          No annual lock-in. Cancel between trips. Refund guarantee if we can’t plan yours.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative overflow-hidden rounded-3xl p-8 ring-1 ring-black/10 ${
              p.featured ? "lg:-translate-y-4 shadow-[0_40px_80px_-30px_rgba(255,107,53,0.5)]" : ""
            }`}
            style={{
              background: p.accent,
              color: p.dark ? "#FBF6EC" : "#141416",
            }}
          >
            {p.featured && (
              <div className="absolute right-6 top-6 rounded-full bg-[#141416] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#FBF6EC]">
                Most loved
              </div>
            )}
            <div className="text-xs font-bold uppercase tracking-widest opacity-70">{p.name}</div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-serif text-6xl font-black leading-none">{p.price}</span>
              <span className="text-sm opacity-70">{p.per}</span>
            </div>
            <p className={`mt-4 text-sm ${p.dark ? "text-white/80" : "text-[#141416]/70"}`}>
              {p.pitch}
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span
                    className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold"
                    style={{
                      background: p.dark ? "rgba(255,255,255,0.2)" : "#141416",
                      color: p.dark ? "white" : "#FBF6EC",
                    }}
                  >
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
                p.dark
                  ? "bg-white text-[#141416] hover:bg-[#F4C95D]"
                  : "bg-[#141416] text-[#FBF6EC] hover:bg-[#FF6B35]"
              }`}
            >
              {p.cta} <ArrowIcon />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FINAL CTA                                                         */
/* ------------------------------------------------------------------ */
function FinalCTA() {
  return (
    <section id="cta" className="mx-auto max-w-7xl px-6 pb-24">
      <div className="relative overflow-hidden rounded-[40px] bg-[#141416] p-10 text-[#FBF6EC] md:p-16">
        {/* decorative sun */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#FF6B35] blur-3xl opacity-60" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-60 w-60 rounded-full bg-[#F4C95D] blur-3xl opacity-30" />

        <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="text-xs font-bold uppercase tracking-widest text-[#F4C95D]">
              Your next trip is one sentence away
            </div>
            <h2 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
              Where should <br />
              Wayfare take you <span className="italic text-[#FF6B35]">next</span>?
            </h2>
          </div>
          <div className="lg:col-span-4">
            <div className="rounded-2xl bg-white/5 p-2 ring-1 ring-white/10 backdrop-blur">
              <input
                placeholder="e.g. 5 quiet days in the Scottish Highlands"
                className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-4 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#141416]">
                Plan it — free <ArrowIcon />
              </button>
            </div>
            <p className="mt-3 text-center text-xs text-white/50">
              No credit card. No spam. Ever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                            */
/* ------------------------------------------------------------------ */
function Footer() {
  const cols = [
    { title: "Product", links: ["How it works", "Destinations", "Pricing", "Changelog", "Status"] },
    { title: "Company", links: ["About", "Careers", "Press", "Contact", "Partners"] },
    { title: "Resources", links: ["Blog", "Travel guides", "Packing lists", "API", "For agencies"] },
  ];
  return (
    <footer className="border-t border-[#141416]/10 bg-[#FBF6EC]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-5">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-[#141416]/60">
            Wayfare is an AI travel concierge for people who want the trip, not the planning.
            Made with love in Lisbon & Tokyo.
          </p>
          <div className="mt-6 flex gap-3">
            {["𝕏", "IG", "TT", "IN"].map((s) => (
              <a
                key={s}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#141416]/15 text-xs font-bold text-[#141416]/70 hover:bg-[#141416] hover:text-[#FBF6EC]"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-xs font-bold uppercase tracking-widest text-[#141416]/50">
              {c.title}
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-[#141416]/80 hover:text-[#FF6B35]">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-[#141416]/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-[#141416]/60 md:flex-row">
          <div>© {new Date().getFullYear()} Wayfare Labs · All rights reserved</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#141416]">Privacy</a>
            <a href="#" className="hover:text-[#141416]">Terms</a>
            <a href="#" className="hover:text-[#141416]">Cookies</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#0F4C4A]" />
            All systems planning trips
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Small shared bits                                                 */
/* ------------------------------------------------------------------ */
function SectionLabel({
  children,
  dark = false,
  center = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] ${
        dark ? "text-[#F4C95D]" : "text-[#FF6B35]"
      } ${center ? "justify-center" : ""}`}
    >
      <span className="inline-block h-px w-6 bg-current" />
      {children}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="transition group-hover:translate-x-0.5">
      <path d="M4 10h12M12 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"
        stroke="#FF6B35"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
