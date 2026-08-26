import Link from "next/link";
import { Plane } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Button from "@/components/ui/button";

export default function SiteHeader() {
  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4">
      <nav className="max-w-5xl mx-auto flex items-center justify-between gap-4 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/85 backdrop-blur-xl pl-5 pr-2 py-2 shadow-sm">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[var(--color-text-primary)]"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-brand-600)] text-white">
            <Plane className="w-4 h-4" />
          </span>
          <span className="font-bold tracking-tight">
            AI Travel{" "}
            <span className="text-[var(--color-brand-600)]">Planner</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/auth/signin"
            className="hidden md:block px-3 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            Sign in
          </Link>
          <ThemeToggle />
          <Button
            href="/auth/signup"
            variant="primary"
            className="!px-5 !py-2 !text-sm !rounded-full"
          >
            Early access
          </Button>
        </div>
      </nav>
    </header>
  );
}