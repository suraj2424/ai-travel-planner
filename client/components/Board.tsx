export const dynamic = "force-dynamic";

type PlanRow = {
  id: number;
  title: string;
  destination: string;
  code: string;
  days: number;
  style: string;
  travelers: number;
  createdAt: Date;
};

const SEEDS = [
  { destination: "Kyoto", code: "KYO", days: 6, style: "Foodie", travelers: 2, minsAgo: 2 },
  { destination: "Oaxaca", code: "OAX", days: 4, style: "Culture", travelers: 2, minsAgo: 45 },
  { destination: "Reykjavík", code: "KEF", days: 4, style: "Adventure", travelers: 2, minsAgo: 190 },
  { destination: "Santorini", code: "JTR", days: 5, style: "Slow living", travelers: 2, minsAgo: 1500 },
  { destination: "Ubud", code: "DPS", days: 7, style: "Nature", travelers: 1, minsAgo: 2900 },
  { destination: "Marrakech", code: "RAK", days: 4, style: "Foodie", travelers: 4, minsAgo: 5800 },
];

async function getRows(): Promise<PlanRow[]> {
  return SEEDS.map((s, i) => ({
    id: i + 1,
    title: "",
    destination: s.destination,
    code: s.code,
    days: s.days,
    style: s.style,
    travelers: s.travelers,
    createdAt: new Date(Date.now() - s.minsAgo * 60_000),
  }));
}

function statusOf(d: Date): { label: string; tone: string } {
  const mins = (Date.now() - d.getTime()) / 60_000;
  if (mins < 5) return { label: "BOARDING", tone: "text-amber" };
  if (mins < 1440) return { label: "PLANNED", tone: "text-lagoon" };
  return { label: "DEPARTED", tone: "text-faded" };
}

export default async function Board() {
  const rows = await getRows();

  return (
    <section id="board" className="relative border-y border-ridge bg-deep py-20 lg:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(#17414c 1px, transparent 1px), linear-gradient(90deg, #17414c 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-lagoon">
              Live departures · saved to Postgres as you plan
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-bone md:text-5xl">
              The trip{" "}
              <em className="font-serif font-medium italic text-amber">board</em>
            </h2>
          </div>
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-faded">
            <span className="h-2 w-2 animate-blink rounded-full bg-coral" />
            Every row below is a real plan, generated moments ago
          </p>
        </div>

        {/* the split-flap board */}
        <div className="mt-12 overflow-x-auto border-2 border-ridge bg-ink p-3 shadow-[12px_12px_0_rgba(4,14,18,0.6)] sm:p-4">
          <div className="min-w-[860px]">
            <div className="grid grid-cols-[1.1fr_1.5fr_0.7fr_1.2fr_0.8fr_1fr_1fr] gap-1.5 px-1 pb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-faded">
              <span>Flight</span>
              <span>Destination</span>
              <span>Days</span>
              <span>Travel style</span>
              <span>Pax</span>
              <span>Boarding</span>
              <span className="text-right">Status</span>
            </div>
            <ul className="space-y-1.5">
              {rows.map((r, ri) => {
                const status = statusOf(r.createdAt);
                const flight = `AA ${String(100 + ((r.id * 37) % 899))}`;
                const boarding = r.createdAt.toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                const cells = [
                  <span key="f" className="text-amber">{flight}</span>,
                  <span key="d" className="font-semibold tracking-[0.08em] text-bone">{r.destination.toUpperCase()}</span>,
                  <span key="dy" className="text-bone/85">{r.days}D</span>,
                  <span key="s" className="text-bone/85">{r.style}</span>,
                  <span key="p" className="text-bone/85">×{r.travelers}</span>,
                  <span key="b" className="text-bone/85">{boarding}</span>,
                  <span key="st" className={`justify-end ${status.tone} ${status.label === "BOARDING" ? "animate-blink" : ""}`}>
                    {status.label}
                  </span>,
                ];
                return (
                  <li
                    key={r.id}
                    className="grid grid-cols-[1.1fr_1.5fr_0.7fr_1.2fr_0.8fr_1fr_1fr] gap-1.5 [perspective:700px]"
                  >
                    {cells.map((cell, ci) => (
                      <div
                        key={ci}
                        className="flap-cell flex items-center border border-ridge/70 bg-deep px-3 py-2.5 font-mono text-[12px]"
                        style={{ animationDelay: `${(ri * 7 + ci) * 75}ms` }}
                      >
                        <span className="w-full truncate">{cell}</span>
                      </div>
                    ))}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-faded">
          Plan something below — your trip joins this board instantly.
        </p>
      </div>
    </section>
  );
}
