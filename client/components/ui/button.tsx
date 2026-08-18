import Link from "next/link";

const Button = ({
  children,
  variant = "primary",
  className = "",
  href,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  href?: string;
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-[15px] tracking-tight cursor-pointer transition-all duration-200 active:scale-[0.97]";

  const variants = {
    primary:
      "bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-700)] shadow-[var(--shadow-brand)] hover:shadow-[0_6px_20px_-3px_rgba(13,148,136,0.45)]",
    secondary:
      "bg-[var(--color-text-primary)] text-[var(--color-surface)] hover:opacity-90 shadow-[var(--shadow-card)]",
    outline:
      "border-2 border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:border-[var(--color-brand-500)] hover:text-[var(--color-brand-600)] shadow-sm hover:shadow-[var(--shadow-card)]",
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  return href ? (
    <Link href={href} className={cls}>
      {children}
    </Link>
  ) : (
    <button className={cls}>{children}</button>
  );
};

export default Button;