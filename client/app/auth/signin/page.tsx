import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AuthLayout from "@/components/ui/auth-layout";
import Input from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import Button from "@/components/ui/button";

export const metadata = { title: "Sign in · AI Travel Planner" };

export default function SigninPage() {
  return (
    <AuthLayout
      quote={
        <>
          Welcome back,{" "}
          <span className="font-serif italic font-normal">yaatri.</span> The
          plan`&apos;s where you left it.
        </>
      }
      stubNote="gate's still open"
    >
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] mb-2">
          Welcome back, <span className="font-serif italic font-normal">yaatri.</span>
        </h1>
        <p className="text-[var(--color-text-secondary)] leading-relaxed">
          Sign in to pick up where the planning left off.
        </p>
      </div>

      {/* TODO: wire your auth action here (e.g. signIn("credentials")) */}
      <form action="#" className="space-y-5">
        <Input
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <PasswordInput
          id="password"
          name="password"
          label="Password"
          placeholder="••••••••"
          autoComplete="current-password"
          labelTrailing={
            <Link
              href="#"
              className="text-xs font-medium text-[var(--color-brand-600)] hover:underline underline-offset-4"
            >
              Forgot?
            </Link>
          }
          required
        />

        <Button type="submit" variant="primary" className="w-full !text-base">
          Sign in <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-[var(--color-text-secondary)]">
        New here?{" "}
        <Link
          href="/auth/signup"
          className="font-semibold text-[var(--color-brand-600)] hover:underline underline-offset-4"
        >
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}