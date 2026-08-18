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
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 active:scale-95";
  const variants = {
    primary:
      "bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-700)] shadow-lg shadow-[var(--color-brand-500)]/25",
    secondary:
      "bg-[var(--color-accent-600)] text-white hover:bg-[var(--color-accent-500)] shadow-lg shadow-[var(--color-accent-500)]/25",
    outline:
      "border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-muted)]",
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