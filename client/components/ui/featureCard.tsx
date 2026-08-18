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
  <div className="group p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] hover:border-[var(--color-brand-500)]/30 hover:shadow-xl hover:shadow-[var(--color-brand-500)]/5 transition-all duration-300">
    <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-50)] flex items-center justify-center mb-4 group-hover:bg-[var(--color-brand-100)] transition-colors">
      <Icon className="w-6 h-6 text-[var(--color-brand-600)]" />
    </div>
    <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-primary)]">
      {title}
    </h3>
    <p className="text-[var(--color-text-secondary)] leading-relaxed">
      {description}
    </p>
  </div>
);

export default FeatureCard;