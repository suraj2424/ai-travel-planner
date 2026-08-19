"use client";

import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import { useLoginMutation } from "@/services/api";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/lib/redux/features/auth/authSlice";
import type { AppDispatch } from "@/lib/redux/store";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      return;
    }

    try {
      const response = await login({
        email,
        password,
      }).unwrap();

      dispatch(
        setCredentials({
          accessToken: response.data.accessToken,
          user: response.data.user,
        }),
      );
      
      router.push("/");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-5">
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

      <Button
        type="submit"
        variant="primary"
        className="w-full !text-base"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign in"}
        {!isLoading && <ArrowRight className="w-4 h-4" />}
      </Button>

      {error && (
        <p className="text-sm text-red-500">
          Unable to sign in. Please check your credentials.
        </p>
      )}
    </form>
  );
}