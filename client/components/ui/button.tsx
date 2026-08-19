import Link from "next/link";

const Button = ({
  children,
  variant = "primary",
  className = "",
  href,
  type = "button",
  disabled = false,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium tracking-tight transition-all duration-200 active:scale-[0.98]";

  const variants = {
    primary: "bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-700)] shadow-sm",
    secondary: "bg-[var(--color-accent-600)] text-white hover:bg-[var(--color-accent-500)]",
    outline:
      "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:border-[var(--color-brand-500)]/40",
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  return href ? (
    <Link href={href} className={cls} aria-disabled={disabled}>
      {children}
    </Link>
  ) : (
    <button type={type} className={cls} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;