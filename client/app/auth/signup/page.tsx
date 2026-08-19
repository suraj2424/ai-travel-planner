import Link from "next/link";
import AuthLayout from "@/components/ui/auth-layout";
import SignupForm from "./SignupForm";

export const metadata = {
  title: "Create account · AI Travel Planner",
};

export default function SignupPage() {
  return (
    <AuthLayout
      quote={
        <>
          Every great trip starts with{" "}
          <span className="font-serif italic font-normal">
            one small form.
          </span>
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

      <SignupForm />

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