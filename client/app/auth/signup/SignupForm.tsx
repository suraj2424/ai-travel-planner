"use client";

import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import { useRegisterMutation } from "@/services/api";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [register, { isLoading, error }] = useRegisterMutation();
  const router = useRouter();

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

  return (
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
        disabled={isLoading}
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
  );
}