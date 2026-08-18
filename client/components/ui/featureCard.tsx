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
  <div className="group relative p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--color-brand-500)]/40 hover:-translate-y-1 transition-all duration-300">
    {/* Accent line at top — scales in on hover */}
    <div
      className="absolute top-0 left-8 right-8 h-[2px] bg-[var(--color-brand-500)] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left rounded-full"
      aria-hidden
    />

    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--color-brand-600)]/10 border border-[var(--color-brand-500)]/15 mb-6 group-hover:bg-[var(--color-brand-600)]/15 group-hover:border-[var(--color-brand-500)]/30 transition-all duration-300">
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