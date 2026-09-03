"use client";

import { useState } from "react";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import CheckInput from "@/components/ui/check-input";
import { useLoginMutation, useGoogleLoginMutation } from "@/services/api";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/lib/redux/features/auth/authSlice";
import type { AppDispatch } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const [login, { isLoading }] = useLoginMutation();
  const [googleLogin, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      setFormError("Please fill in all fields");
      return;
    }

    try {
      const response = await login({ email, password }).unwrap();

      dispatch(
        setCredentials({
          accessToken: response.data.accessToken,
          user: response.data.user,
        })
      );

      router.push("/trips");
    } catch (err) {
      console.error(err);
      setFormError("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    setFormError(null);

    if (!credentialResponse.credential) {
      setFormError("Google sign-in failed: no credential received.");
      return;
    }

    try {
      const response = await googleLogin({
        idToken: credentialResponse.credential,
      }).unwrap();

      dispatch(
        setCredentials({
          accessToken: response.data.accessToken,
          user: response.data.user,
        })
      );

      router.push("/trips");
    } catch (err) {
      console.error(err);
      setFormError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      {formError && (
        <div className="flex items-start gap-3 p-4 rounded-xl border border-red-500/20 bg-red-500/5">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-600 dark:text-red-400">{formError}</p>
        </div>
      )}

      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-full flex justify-center [&>div]:!w-full [&_iframe]:!w-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setFormError("Google sign-in failed. Please try again.")}
            theme="outline"
            size="large"
            width="100%"
            text="signin_with"
            shape="rectangular"
          />
        </div>
        {isGoogleLoading && (
          <p className="text-xs text-[var(--color-text-secondary)] mt-2 flex items-center gap-1.5">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Signing in with Google...
          </p>
        )}
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--color-border-subtle)]" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[var(--color-surface)] px-3 text-[var(--color-text-secondary)] font-medium">
            Or continue with email
          </span>
        </div>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-5">
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
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <CheckInput
            id="remember"
            name="remember"
            label="Remember me"
          />

          <Link
            href="/auth/forgot-password"
            className="text-[var(--color-brand-600)] hover:text-[var(--color-brand-500)] font-medium transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full !text-base !py-3"
          disabled={isLoading || isGoogleLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign in
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}