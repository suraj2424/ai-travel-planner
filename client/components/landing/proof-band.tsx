import { Stamp, IndianRupee, Users } from "lucide-react";

const POINTS = [
  {
    icon: Stamp,
    title: "Visa-aware",
    line: "Picks your passport can actually enter — visa-free, VoA, e-visa.",
  },
  {
    icon: IndianRupee,
    title: "Real ₹ budgets",
    line: "Per-person math before you commit, not after.",
  },
  {
    icon: Users,
    title: "Group-ready",
    line: "One shared plan everyone votes on. The Goa plan survives.",
  },
];

export default function ProofBand() {
  return (
    <section className="py-20 border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 md:gap-0 md:divide-x md:divide-[var(--color-border)]">
        {POINTS.map((point) => (
          <div key={point.title} className="md:px-10">
            <point.icon className="w-5 h-5 mb-4 text-[var(--color-brand-600)]" />
            <p className="font-semibold text-[var(--color-text-primary)] mb-1.5">
              {point.title}
            </p>
            <p className="text-sm leading-relaxed text-[var(--color-text-tertiary)]">
              {point.line}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}