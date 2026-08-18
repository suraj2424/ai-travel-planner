import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
}) => (
  <div className="group relative p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-brand-500)]/40 transition-colors duration-300">
    {/* Subtle accent line at top that scales in on hover */}
    <div
      className="absolute top-0 left-8 right-8 h-px bg-[var(--color-accent-500)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
      aria-hidden
    />

    <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] mb-6 group-hover:border-[var(--color-brand-500)]/30 transition-colors">
      <Icon className="w-5 h-5 text-[var(--color-brand-600)]" />
    </div>

    <h3 className="text-lg font-semibold tracking-tight mb-3 text-[var(--color-text-primary)]">
      {title}
    </h3>

    <p className="text-[var(--color-text-secondary)] leading-relaxed text-[15px]">
      {description}
    </p>
  </div>
);

export default FeatureCard;