import AuthLayout from "@/components/ui/auth-layout";
import LoginForm from "./LoginForm";
import Link from "next/link";

export const metadata = {
  title: "Sign in · AI Travel Planner",
};

export default function SigninPage() {
  return (
    <AuthLayout
      quote={
        <>
          Welcome back,{" "}
          <span className="font-serif italic font-normal">yaatri.</span> The
          plan&apos;s where you left it.
        </>
      }
      stubNote="gate's still open"
    >
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] mb-2">
          Welcome back,{" "}
          <span className="font-serif italic font-normal">yaatri.</span>
        </h1>

        <p className="text-[var(--color-text-secondary)] leading-relaxed">
          Sign in to pick up where the planning left off.
        </p>
      </div>

      <LoginForm />

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
