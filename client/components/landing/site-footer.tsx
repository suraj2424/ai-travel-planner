import Link from "next/link";
import { Plane } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--color-brand-600)] text-white">
            <Plane className="w-3.5 h-3.5" />
          </span>
          <span className="font-bold tracking-tight text-[var(--color-text-primary)]">
            AI Travel Planner
          </span>
        </div>

        <p className="text-sm text-[var(--color-text-tertiary)]">
          Built in India, for travellers from India.
        </p>

        <div className="flex items-center gap-6 text-sm text-[var(--color-text-secondary)]">
          <Link href="#demo" className="hover:text-[var(--color-text-primary)] transition-colors">
            See it work
          </Link>
          <Link href="/auth/signup" className="hover:text-[var(--color-text-primary)] transition-colors">
            Early access
          </Link>
          <Link href="#" className="hover:text-[var(--color-text-primary)] transition-colors">
            Privacy
          </Link>
        </div>

        <p className="text-sm text-[var(--color-text-tertiary)]">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}