import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AuthLayout from "@/components/ui/auth-layout";
import Input from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import Button from "@/components/ui/button";

export const metadata = { title: "Create account · AI Travel Planner" };

export default function SignupPage() {
  return (
    <AuthLayout
      quote={
        <>
          Every great trip starts with{" "}
          <span className="font-serif italic font-normal">one small form.</span>
        </>
      }
      stubNote="boarding soon"
    >
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] mb-2">
          Create your account
        </h1>
        <p className="text-[var(--color-text-secondary)] leading-relaxed">
          Your first AI itinerary is{" "}
          <span className="font-serif italic">two minutes</span> away.
        </p>
      </div>

      {/* TODO: wire your auth action here (e.g. NextAuth credentials register) */}
      <form action="#" className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="firstName"
            name="firstName"
            label="First name"
            placeholder="Aarav"
            autoComplete="given-name"
            required
          />
          <Input
            id="lastName"
            name="lastName"
            label="Last name"
            placeholder="Sharma"
            autoComplete="family-name"
            required
          />
        </div>

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
          hint="At least 8 characters"
          autoComplete="new-password"
          minLength={8}
          required
        />

        <Button type="submit" variant="primary" className="w-full !text-base">
          Create account <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-[var(--color-text-secondary)]">
        Already have an account?{" "}
        <Link
          href="/auth/signin"
          className="font-semibold text-[var(--color-brand-600)] hover:underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}