"use client";

import { useState } from "react";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import { useRegisterMutation, useGoogleLoginMutation } from "@/services/api";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/lib/redux/features/auth/authSlice";
import type { AppDispatch } from "@/lib/redux/store";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [register, { isLoading, error }] = useRegisterMutation();
  const [googleLogin, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [googleError, setGoogleError] = useState<string | null>(null);

  const handleRegister = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");

    if (
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return;
    }

    try {
      await register({
        firstName,
        lastName,
        email,
        password,
      }).unwrap();

      router.push("/auth/signin");

      console.log("Registration successful:");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    setGoogleError(null);

    if (!credentialResponse.credential) {
      setGoogleError("Google sign-in failed: no credential received.");
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
      setGoogleError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      {googleError && (
        <div className="flex items-start gap-3 p-4 rounded-xl border border-red-500/20 bg-red-500/5">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-600 dark:text-red-400">{googleError}</p>
        </div>
      )}

      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-full flex justify-center [&>div]:!w-full [&_iframe]:!w-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setGoogleError("Google sign-in failed. Please try again.")}
            theme="outline"
            size="large"
            width="100%"
            text="signup_with"
            shape="rectangular"
          />
        </div>
        {isGoogleLoading && (
          <p className="text-xs text-[var(--color-text-secondary)] mt-2 flex items-center gap-1.5">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Creating account with Google...
          </p>
        )}
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--color-border-subtle)]" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[var(--color-surface)] px-3 text-[var(--color-text-secondary)] font-medium">
            Or sign up with email
          </span>
        </div>
      </div>

      <form onSubmit={handleRegister} className="space-y-5">
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

        <Button
          type="submit"
          variant="primary"
          className="w-full !text-base"
          disabled={isLoading || isGoogleLoading}
        >
          {isLoading ? "Creating account..." : "Create account"}
          {!isLoading && <ArrowRight className="w-4 h-4" />}
        </Button>

        {error && (
          <p className="text-sm text-red-500">
            Unable to create your account. Please check your information and try
            again.
          </p>
        )}
      </form>
    </div>
  );
}